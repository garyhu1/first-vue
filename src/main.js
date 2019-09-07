import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import bus from "./utils/eventBus";
// 引入自定义指令
import time from "../custom/directive/time";
// 使用自定义指令
Vue.use(time);
// 引入通过prototype自定义的组件
import MyPrototype from "../custom/prototype";
// 使用
Vue.use(MyPrototype);
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

// 引入mapbox
import mapBoxGl from 'mapbox-gl';
Vue.prototype.mbgl = mapBoxGl;

// 获取Vue的当前版本
console.log('garyhu', 'vue version :: '+Vue.version);

// set ElementUI lang to EN
Vue.use(ElementUI, { locale });

Vue.prototype.$bus = bus; // 设置全局的EventBus
Vue.config.productionTip = false;
Vue.prototype.app2 = new Vue(); // 设置全局的vue实例相当于EventBus
Vue.config.devtools = false;
Vue.config.silent = true; // 取消所有的日志和警告
// 自定义全局的键位别名
Vue.config.keyCodes = {
  v: 86,
  f1: 112,
  // camelCase 不可用
  // mediaPlayPause: 179,
  // 取而代之的是 kebab-case 且用双引号括起来
  "media-play-pause": 179,
  c: [38, 87],
  enter: 333
};

// 引入自定义组件，index.js是组件的默认入口
import Loading from "./components/loading";
Vue.use(Loading);

// 引入自定义的组件HwButton
import HwButton from "./components/MyButton";
Vue.use(HwButton);

// 引入自定义的text
import HwText from "../packages";
Vue.use(HwText);

// 引入混合并使用
import { mixin } from "./mixin";
Vue.mixin(mixin);

// Vue DOM更新时的方法，最后执行的方法
Vue.nextTick(function() {
  // DOM 更新了
  // console.log('garyhu', 'DOM更新了');
});

// 注册全局的通用的组件
const requireComponent = require.context(
  // 其组件目录的相对路径
  './components/base',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  console.log('TAG', 'fileName = '+fileName);
  const componentConfig = requireComponent(fileName);
  console.log('TAG', 'componentConfig name = '+componentConfig.default.name);

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 剥去文件名开头的 `./` 和结尾的扩展名
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
    )
  );

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  );
});

//动态设置页面标题
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next();
  } else {
    if (window.localStorage.getItem("token")) {
      if (to.meta.title) {
        window.document.title = to.meta.title;
      }
      next();
    } else {
      let path = to.path;
      console.log("tag", "currentPath ==> " + path);
      store.commit("setRouterPath", path);
      next("/login");
    }
  }
  // next() 入参，如果是 false，会不导航；如果为路径，则会导航到指定路径下的页面。
  // window.document.title = to.meta.title;
  // next();
});

// 长页面跳转自动返回顶端
router.afterEach((to, from) => {
  console.log('tag', '跳转');
  let bodySrcollTop = document.body.scrollTop
  if (bodySrcollTop !== 0) {
    document.body.scrollTop = 0;
    return
  }
  let docSrcollTop = document.documentElement.scrollTop
  if (docSrcollTop !== 0) {
    document.documentElement.scrollTop = 0;
  }
});

let logger = function() {return 10;};

let d = [logger()];

console.log('TAG', 'd ==> '+d);

// 组合使用 beforeEach 与 afterEach，还可以实现：从一个页面跳转到另一个页面时，出现 Loading 动画，
// 当新页面加载后，再结束动画。

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

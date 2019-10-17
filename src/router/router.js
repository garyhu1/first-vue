import Vue from "vue";
import Router from "vue-router";
// import mainConfig from "./main";
// import loginConfig from "./login";
// import stickyConfig from "./sticky";
// 测试

Vue.use(Router);

// 手动配置
// const routes = [...mainConfig,...loginConfig,...stickyConfig];

// 也可以采用自动扫描配置
let routes = [];
const routerContext = require.context("./", true, /index\.js$/);
routerContext.keys().forEach(router => {
  if (router.startsWith("./index")) {
    return;
  }
  let routerConfig = routerContext(router);
  routes = [...routes, ...(routerConfig.default || routerConfig)];
});

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes
});

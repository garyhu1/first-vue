import MyLoading from "./src/Loading.vue";
// 这里是重点
const Loading = {
  install(Vue) {
    Vue.component(MyLoading.name, MyLoading);
  }
};

// 导出组件
export default Loading;

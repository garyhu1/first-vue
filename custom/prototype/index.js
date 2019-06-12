// 通过prototype方式开发插件，是在vue的原型上添加属性或者方法
import Message from "./message";

export default {
  install(Vue,options = {}){
    Vue.prototype.$message = Message;
  }
};

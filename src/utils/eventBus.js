/** 
*  定义一个全局的EventBus用于事件的传递
*/
import Vue from "vue";

const bus = new Vue({
  data() {
    return {
      userInfo: {}
    };
  },
  created() {
    this.$on("getUserInfo",val => {
      this.userInfo = val;
    });
  }
});

export default bus;

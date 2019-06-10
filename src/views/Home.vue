<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.jpg" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  // beforeRouteEnter (to, from, next) {
  //   // 通过路由跳转之前的变化改变页面的title，
  //   window.document.title = "Home"
  //   next();
  // }
};
</script>

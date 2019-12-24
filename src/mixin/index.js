//在项目中我们经常会遇到多个组件调用同一个方法的问题，为了避免每次都在.vue文件中定义并调用，我们可采用vue的mixin的用法

const mixin = {
  created() {
    // console.log("garyhu", "每个组件创建都会打印");
  },
  methods: {
    success() {
      // console.log("garyhu", "success");
    }
  }
};

export { mixin };
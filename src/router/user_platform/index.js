export default [
  {
    path: "/user",
    name: "name",
    component: resolve => require(["../../views/user/User.vue"], resolve),
    meta: {
      title: "用户管理"
    }
  }
];

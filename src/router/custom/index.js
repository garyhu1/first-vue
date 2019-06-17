export default [
  {
    path: "/custom",
    name: "custom",
    component: resolve => require(["../../views/custom-component/Custom.vue"], resolve),
    meta: {
      title: "自定义模式"
    },
    children: [
      {
        path: "my-directive",
        name: "my-directive",
        component: () => import("../../views/custom-component/MyDirective.vue"),
        meta: {
          title: "自定义指令"
        }
      },
      {
        path: "my-message",
        name: "my-message",
        component: () => import("../../views/custom-component/MyMessage.vue"),
        meta: {
          title: "自定义message"
        }
      }
    ]
  }
];

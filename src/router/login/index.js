export default [
    {
        path: "/login",
        name: "login",
        component: () => import("../../views/Login.vue"),
        meta: {
          title: "登录"
        }
    }
]
import Home from "../../views/Home.vue";
export default [
    {
        path: "/",
        name: "main",
        component: resolve => require(["../../views/MainPage.vue"], resolve),
        meta: {
          title: "garyhu"
        },
        children: [
        {
            path: "",
            name: "study",
            component: () => import("../../views/Study.vue"),
            meta: {
              title: "学习"
            }
        },
        {
            path: "profiles",
            name: "profiles",
            components: {
              default: () => import("../../views/Books.vue"),
              personal: resolve => require(["../../views/Personal.vue"], resolve)
            },
            meta: {
              title: "个人中心"
            }
          }
        ]
    },
    {
        path: "/home",
        name: "home",
        component: Home,
        meta: {
          title: "首页"
        }
    },
    {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../../views/About.vue"),
        meta: {
          title: "关于"
        }
    }
]
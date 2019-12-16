import Home from "../../views/Home.vue";
export default [
  {
    path: "/",
    name: "main",
    // component: r => require.ensure([], () => r(require('../../views/MainPage.vue')), 'index'),
    component: () => import("@/views/MainPage"),
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
        },
        props: false // 不使用props传参
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
    path: "/map",
    name: "map",
    component: () => import("../../views/MyMap.vue"),
    meta: {
      title: "地图"
    }
  },
  {
    path: '/leaflet',
    name: 'leaflet',
    component: () => import("../../views/leaflet/LMap.vue"),
    meta: {
      title: 'Leaflet Map'
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
  },
  {
    path: "/promise",
    name: "promise",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../../views/MyPromise.vue"),
    meta: {
      title: "Promise"
    }
  },
  // 匹配不到时默认返回404页面
  {
    path: "*",
    component: resolve => require(["../../views/NotFoundPage.vue"], resolve)
  }
];

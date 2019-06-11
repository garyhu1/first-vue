export default [
    {
        path: "/stick",
        name: "stick",
        component: () => import("../../views/StickView.vue"),
        meta: {
          title: "粘滞"
        }
    }
]
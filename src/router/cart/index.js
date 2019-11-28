export default [
    {
      path: "/cart",
      name: "cart",
      component: resolve =>
        require(["../../views/cart/Cart.vue"], resolve),
      meta: {
        title: "购物车"
      },
    }
  ];
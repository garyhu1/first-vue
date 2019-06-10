<template>
     <div class="tab_3">
        <div>tab3</div>
        <slot></slot>
        <my-tab-three-sub @hook:mounted="doSomething"></my-tab-three-sub>
        <p>{{msg}}</p>
    </div>
</template>

<<script>
import MyTabThreeSub from "./MyTabThreeSub.vue";
export default {
    data() {
        return {
            msg: "子组件加载前的状态"
        }
    },
    components: {
        MyTabThreeSub
    },
    methods: {
        doSomething() {
            this.msg = "子组件挂载成功了"
        }
    }
}
</script>

<style>
    .tab_3 {
        width: 100%;
        height: 200px;
        background-color: bisque;
        color: #C1C1C1
    }
</style>

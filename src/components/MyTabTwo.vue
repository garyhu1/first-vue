<template>
     <div class="tab_2">
        <div>tab2</div>
        <slot></slot>
        <my-tab-two-sub></my-tab-two-sub>
        <p>{{myTab}}</p>
    </div>
</template>

<script>
import MyTabTwoSub from "./MyTabTwoSub.vue"
export default {
    name: "MyTabTwo",
    inheritAttrs: false,
    components: {
        MyTabTwoSub
    },
    provide() {
        return {
            onTwoTabClick: this.onTwoTabClick,
            app1: this
        };
    },
    data() {
        return {
            myTab: "我是第二个tab",
            twoTitle: "第二个tab的名称"
        }
    },
    methods: {
        onTwoTabClick() {
            this.myTab = "点击改变值"
        }
    }
}
</script>

<style>
    .tab_2 {
        width: 100%;
        height: 200px;
        background-color: brown;
        color:cornsilk
    }
</style>


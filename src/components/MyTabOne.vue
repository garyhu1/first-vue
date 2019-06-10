<template>
    <div class="tab_1">
        <div>tab1</div>
        <slot></slot>
        <my-tab-one-sub @click="clickP" v-bind="dataProps"/>
        <p>{{dataProps.title}}</p>
    </div>
</template>

<script>
import MyTabOneSub from "./MyTabOneSub.vue"
export default {
    name : 'MyTabOne',
    inheritAttrs: false,
    data() {
        return {
            dataProps: {
                title: "我是TabOne的值"
            }
        }
    },
    components: {
        MyTabOneSub
    },
    methods: {
        clickP() {
            this.dataProps.title = "我是点击孙子组件后的值"
        }
    }
}
</script>

<style>
    .tab_1 {
        background-color: blueviolet;
        width: 100%;
        height: 200px;
        color: rgb(223, 207, 207)
    }
</style>

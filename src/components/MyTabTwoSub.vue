/** 
* 测试provide和inject的使用
*/
<template>
     <div>
        <button @click="onTwoTabClick">点击显示父类属性值</button>
        <button @click="showVal">显示父组件值</button>
        <p>{{title}}</p>
    </div>
</template>

<script>
export default {
    name: "MyTabTwoSub",
    inheritAttrs: false,
    inject: ['onTwoTabClick','app1'],
    data() {
        return {
            title: ""
        }
    },
    computed: {
        msg() {
            return this.app1.twoTitle;
        }
    },
    methods: {
        showVal() {
            console.log('garyhu', 'title = '+this.app1.twoTitle)
            this.title = this.app1.twoTitle;
        }
    }
}
</script>
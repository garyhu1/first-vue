<template>
    <div>
        <p style="color: #27AE60">{{introduce}}</p>
        <p style="color: #27AE60">没有变化</p>
        <p style="color: #27AE60">Mustache using : {{rawHtml}}</p>
        <p style="color: #27AE60">Using v-html directive: <span v-html="rawHtml"></span></p>
        <p style="color: #27AE60" @click="getE($event)">点击获取元素</p>
        <slot style="color: #27AE60" name="my" :person="user">{{user.name}}</slot>
    </div>
</template>

<script>
export default {
    name: "Introduce",
    props: {
        introduce: String
    },
    data() {
        return {
            rawHtml: "<span style='color: red'>This should be Red!</span>",
            user: {
                name: "juddy",
                age: 20,
                ID: 121111234
            }
        }
    },
    methods: {
        getE(e) {
            console.log('garyhu', 'target : '+e.target);
            // e.target 是你当前点击的元素
            // e.currentTarget 是你绑定事件的元素
            //    #获得点击元素的前一个元素
            //    e.currentTarget.previousElementSibling.innerHTML
            //    #获得点击元素的第一个子元素
            //    e.currentTarget.firstElementChild
            //    # 获得点击元素的下一个元素
            //    e.currentTarget.nextElementSibling
            //    # 获得点击元素中id为string的元素
            //    e.currentTarget.getElementById("string")
            //    # 获得点击元素的string属性
            //    e.currentTarget.getAttributeNode('string')
            //    # 获得点击元素的父级元素
            //    e.currentTarget.parentElement
            //    # 获得点击元素的前一个元素的第一个子元素的HTML值
            //    e.currentTarget.previousElementSibling.firstElementChild.innerHTML
        }
    }
}
</script>


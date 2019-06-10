/**
* 该控制用来测试组件的通信
* v-bind="$attrs"加上inheritAttrs: false： 把除了style和class外的属性都通过父组件传递下来，但是原组件如果定义了还是用原组件的
* 
*/
<template>
    <div>
        <input :value="editor" @input="onContentChange($event.target.value)" v-bind="$attrs"/>
    </div>
</template>

<script>
export default {
    name: "MyInput",
    inheritAttrs: false,
    model: {
        prop: "editor",
        event: "contentChange"
    },
    props: {
        editor: String
    },
    data() {
        return {}
    },
    methods: {
        onContentChange(val) {
            this.$emit('contentChange',val)
        }
    }
}
</script>


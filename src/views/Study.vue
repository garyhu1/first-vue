<template>
    <div>
        <h1>学习介绍</h1>
        <MyTest></MyTest>
    </div>
</template>

<script>
import MyTest from "./MyTest"
export default {
    components: { MyTest },
    data() {
        return {}
    },
    // template覆盖此处,此出不执行，删除template后执行此处
    render() {
        console.log("hellooooooo")
        return (
            <div>Hello Study</div>
        );
    },
    beforeMount() {
        console.log("父beforeMount")
    },
    mounted() {
        console.log("父mounted")
    },
    beforeCreate() {
        console.log("父beforeCreate")
    },
    created() {
        console.log("父created")
    },
}
</script>
<template>
    <div>我只是一个测试</div>
</template>

<script>
export default {
    beforeMount() {
        console.log("子beforeMount")
    },
    mounted() {
        console.log("子mounted")
    },
    beforeCreate() {
        console.log("子beforeCreate")
    },
    created() {
        console.log("子created")
    },
}
</script>
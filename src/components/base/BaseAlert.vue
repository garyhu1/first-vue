<template>
    <div id="alert_container">
        <span style="color: #FFFFFF">{{title}}</span>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "BaseAlert",
    props: {
        title: String
    },
    mounted() {
        console.log('garyhu', '创建了Alert')
    }
}
</script>


<style scoped lang="less">
    #alert_container {
        width: 80%;
        height: 60px;
        background-color: rgb(241, 95, 95);
        border-radius: 5px;
        box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.4);
        position: absolute;
        top: 80px;
        left: 10%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>


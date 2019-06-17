<template>
    <div style="width: 100%">
        <div id="custom-title">
            <p>自定义模式</p>
            <div class="custom-tab">
                <div :class="tab1Class" @click="tabClick(1)">自定义指令</div>
                <div class="tab-line"></div>
                <div :class="tab2Class" @click="tabClick(2)">prototype实现自定义组件</div>
            </div>
        </div>
    
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tab1Class: "tab-sub tab-sub-1",
            tab2Class: "tab-sub tab-sub-2"
        }
    },
    mounted() {
        this.$router.push({name: "my-directive"});
        this.tab1Class = "tab-sub-active tab-sub-1";
    },
    methods: {
        tabClick(index) {
            this.resetStyle();
            if(index == 1){
                this.tab1Class = "tab-sub-active tab-sub-1";
                this.$router.replace({name: "my-directive"});
            }else if(index == 2){
                this.tab2Class = "tab-sub-active tab-sub-2";
                this.$router.replace({name: "my-message"});
            }
        },
        resetStyle() {
            this.tab1Class = "tab-sub tab-sub-1";
            this.tab2Class = "tab-sub tab-sub-2";
        }
    }
}
</script>
<style scoped>
    html,body,div,p,template {
        padding: 0px;
        margin: 0px;
    }
    #custom-title {
        height: 120px;
        background-color: cadetblue;
        box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.4);
        margin-top: 10px;
        margin-right: 10px;
        margin-left: 10px;
        padding: 0px;
        border-radius: 5px;
    }

    #custom-title p {
        width: 100%;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: #FFF;
    }

    .custom-tab {
        width: 100%;
        height: 80px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center
    }

    .tab-sub:hover {
        background-color: rgba(255, 228, 196,0.5);
        color: #FFF;
    }

    .tab-sub-active {
        flex: 1;
        height: 80px;
        line-height: 80px;
        background-color: rgba(44, 43, 41, 1);
        color: #FFF;
    }

    .tab-sub {
        flex: 1;
        height: 80px;
        line-height: 80px;
        background-color: rgb(255, 228, 196);
    }

    .tab-line {
        background-color: #fff;
        height: 80px;
        width: 1px;
    }

    .tab-sub-1 {
        border-bottom-left-radius: 5px;
    }

    .tab-sub-2 {
        border-bottom-right-radius: 5px;
    }
</style>

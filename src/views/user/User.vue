<template>
    <div style="height: 100%;">
        <!-- 左侧用户状态栏 -->
        <div id="left-user">
            <!-- 用户头像和名称 -->
            <div class="user-profile">
                <img src="../../assets/logo.jpg" style="width: 40px;height: 40px;border-radius: 50%"/>
                <p class="user-name">{{username}}</p>
            </div>
        </div>
        <!-- 右侧动态组件栏 -->
        <div id="right-intro">
            <!-- 导航栏 -->
            <div class="right-nav">
                <el-breadcrumb separator="/" style="margin-left: 10px">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: ""
        }
    },
    mounted() {
        this.username = window.localStorage.getItem("username");
    }
}
</script>

<style scoped>
#left-user {
    width: 150px;
    height: 100%;
    background-color: #606266;
    position: fixed;
    top: 0px;
    left: 0px;
}

#right-intro {
    width: calc(100% - 150px);
    height: 1000px;
    position: absolute;
    top: 0px;
    left: 150px;
}

.user-profile {
    width: calc(100% - 10px);
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px;

}

.user-name {
    color: #fff;
    font-size: 18px;
    margin-left: 10px;
}

.right-nav {
    background-color: #DCDFE6;
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: fixed;
}
</style>

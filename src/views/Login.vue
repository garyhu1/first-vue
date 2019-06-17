<template>
    <div>
        <p>登录</p>
        <label for="username">姓名 : <input id="username" v-model="username"></label><br/><br/>
        <label for="password">密码 : <input id="password" v-model="password"></label><br/><br/>
        <input type="submit" value="登录" id="login_btn" @click="login">

        <transition name="fade">
            <BaseAlert v-show="alertStatus" style="color: #FFFFFF" title="登录失败">{{errorMsg}}</BaseAlert>
        </transition>
    </div>
</template>

<script>
import { setTimeout } from 'timers';
    export default {
        name: "login",
        data() {
            return {
                username: "",
                password: "",
                errorMsg: "",
                alertStatus: false,
                hide: null
            }
        },
        computed: {
            token() {
                return this.username + this.password;
            }
        },
        methods: {
            login() {
                if(this.username && this.username === "garyhu" 
                && this.password && this.password === "123456"){
                    window.localStorage.setItem("token",this.token);
                    window.localStorage.setItem("username",this.username);
                    console.log('garyhu', 'path = '+this.$store.state.routerPath);
                    this.$router.replace(this.$store.state.routerPath)
                }else {
                    this.errorMsg = "您输入的用户或者密码有误！";
                    this.alertStatus = true;
                    this.hideAlert();
                }
            },
            hideAlert() {
                this.hide = setTimeout(() => {
                    this.alertStatus = false;
                },2000);
            }
        },
        destroyed() {

        }
    }
</script>

<style lang="less" scoped>
    #login_btn {
        width: 100px;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 1s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>

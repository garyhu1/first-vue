<template>
    <div class="main_page">
        <div style="z-index: 2; position: absolute;left: 0;top: 0">
            <div style="display: flex;flex-direction: row;align-items: center;">
                <div
                    @click="goMap"
                    class="first-btn"
                >
                    地图
                </div>
                <div 
                    class="first-btn"
                    @click="fullScreen"
                >
                    全屏
                </div>
                <div 
                    class="first-btn"
                    @click="exitFullScreen"
                >
                    退出全屏
                </div>
                <div 
                    class="first-btn"
                    @click="myPromise"
                >
                    MyPromise
                </div>
            </div>
            <hw-text></hw-text>
            <div id="hw-button">按钮</div>
            <my-input :editor="personal" @contentChange="changePersonal" type="text" placeholder="请输入内容"></my-input>
            <p>{{personal}}</p>
            <button @click="showAlert">弹出框</button>
            <transition name="fade">
                <BaseAlert v-show="alertStatus" style="color: #FFFFFF">点我干嘛啊，没事关了</BaseAlert>
            </transition>
    
            <p style="color: #27AE60">{{msg}}</p>
            <p style="color: #27AE60">{{luck}}</p>
            <button :value="txt" @click="changeTxt">ok</button>

            <Introduce introduce="下面开始你的表演">
                <!-- v-slot的缩写为#，例如#my -->
                <template v-slot:my="myCus">
                    <span>{{myCus.person.ID}}</span>
                </template>
                
            </Introduce>

            <input v-model="codes" type="text" @keyup.v="showV">
            <p>{{price|myFilter}}</p>
            <p>{{items.msg}}</p>
            <Loading/>
            <br/>
            <button :value="txt" @click="displayResult">使用mixin混合的方法</button><br/><br/>

            <button @click="showCal">{{btnMsg}}</button><br/><br/>

            <div id="main_cula" v-show="isShowCal">
                <h1>学科计分器</h1>
                <div v-for="subject in results" class="subject" :key="subject.name">
                    <input v-model="subject.marks" />
                    <span>{{ subject.name }}得分: {{ subject.marks }}</span>
                </div>
                <div class="total">学科总分: {{ totalMarks }}</div>
            </div>

            <div class="tab_container">
                <span class="tab1" ref="tab1" @click="tabClick(1)">tab1</span>
                <span class="tab2" ref="tab2" @click="tabClick(2)">tab2</span>
                <span class="tab3" ref="tab3" @click="tabClick(3)">tab3</span>
            </div>

            <component :is="currentTab">{{tabMsg}}</component><br/>

            <button @click="changeRoute">切换子路由</button><br/>

            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>

            <!-- 定义一个命名的路由视图 -->
            <router-view name="personal"></router-view>
        </div>

    </div>
</template>

<script>
    import Introduce from "../components/Introduce.vue";
    import MyTabOne from "../components/MyTabOne.vue";
    import MyTabTwo from "../components/MyTabTwo.vue";
    import MyTabThree from "../components/MyTabThree.vue";
    import MyInput from "./MyInput.vue";
    import { getJson } from "../api/index";
    export default {
        data() {
            return {
                msg: "测试数据",
                luck: 333,
                txt: "切换",
                codes: 0,
                price: 12.92,
                params: {
                    luck: 112
                },
                items: {
                    msg: "hello"
                },
                results: [
                    {
                        name: '英语',
                        marks: 70
                    },
                    {
                        name: '数学',
                        marks: 80
                    },
                    {
                        name: '历史',
                        marks: 90
                    }
                ],
                currentTab: MyTabOne,
                alertStatus: false,
                defaultRoute: true,
                isShowCal: false,
                btnMsg: "展示布局",
                personal: ""
            }
        },
        // 自定义一个属性
        customO: 'foo',
        components: {
            Introduce,
            MyTabOne,
            MyTabTwo,
            MyTabThree,
            MyInput
        },
        // beforeRouteEnter (to, from, next) {
        //   // 这种设置维护起来比较麻烦
        //   window.document.title = "garyhu";
        //   next();  
        // },
        // 路由更新时的钩子函数
        beforeRouteUpdate(to,from,next) {
            // console.log('garyhu', 'route to :: '+to.params.username);
            // console.log('garyhu', 'route from :: '+from.params.username);
            next();

        },
        beforeRouteEnter (to, from, next) {
            // ...
            // window.localStorage.removeItem("token");
            next();
        },
        render(h) { // 因为有template，所以该函数不会执行
            console.log("渲染")
            return (
                <div>
                    <span>fuck</span>
                </div>
            )
        },
        mounted() {
            // 测试打印自定义的属性
            // console.log('garyhu', 'vue option :: '+this.$options.customO);
            // console.log('garyhu', 'vue parent :: '+this.$parent);
            // console.log('garyhu', 'vue child :: '+this.$children);
            // console.log('garyhu', 'vue version :: '+Vue.version);

            this.app2.$on("change",(mm) => {
                this.luck = mm.luck
            })
            console.group('------mounted 挂载结束状态------');
            console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化

            this.$nextTick(function() {
                // DOM 更新了
                console.log('garyhu', 'main page更新了');
            });

            this.$refs.tab1.style.backgroundColor = "rgb(125, 129, 127)";

            getJson().then((data) => {
                console.log("TAG（mock测试）：：",data.personal.name);
            });

            // 监听全屏改变事件
            addEventListener('resize',this.handleScreenChange);

        },
        filters: {
            myFilter() {
                return 15.00;
            }
        },
        computed: {
            count(){
                console.group('------computed函数------');
            },
            totalMarks: function () {
                let total = 0
                let me = this
                for (let i = 0; i < me.results.length; i++) {
                    total += parseInt(me.results[i].marks)
                }
                return total
            },
            tabMsg() {
                if(this.currentTab === MyTabOne){
                    return "tab1这个只是默认显示";
                }else if(this.currentTab === MyTabTwo){
                    return "你是想看到中间这个嘛";
                }else {
                    return "这是最后一个tab了，切回去吧";
                }
            }
        },
        methods: {
            // 打开全屏
            fullScreen() {
                let el = document.documentElement;
                let fs = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;     
                if(fs) {
                    fs.call(el)
                }
            },
            // 退出全屏
            exitFullScreen() {
                if (document.exitFullscreen) {  
                    document.exitFullscreen();  
                }  
                else if (document.mozCancelFullScreen) {  
                    document.mozCancelFullScreen();  
                }  
                else if (document.webkitCancelFullScreen) {  
                    document.webkitCancelFullScreen();  
                }  
                else if (document.msExitFullscreen) {  
                    document.msExitFullscreen();  
                } 
            },
            // 测试自定Promise
            myPromise() {
                this.$router.push('./promise')
            },
            // 处理屏幕改变事件
            handleScreenChange(e) {
                console.log(e);
            },
            // 判断当前屏幕是否为全屏
            checkFull() {
                var isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
                //to fix : false || undefined == undefined
                if (isFull === undefined) {
                    isFull = false;
                }
                return isFull;
            },
            changeTxt() {
                this.app2.$emit("change",this.params);

                // 向已经初始化好的对象中设置新的属性
                this.$set(this.items,"lastMsg","word!");

                console.log('garyhu', 'items = '+this.items["lastMsg"]);
            },
            showV(s) {
                console.log('garyhu', s)
                this.codes = s.keyCode;
                // console.log('garyhu', s)
            },
            displayResult(){
                this.success();
            },
            tabClick(index) {
                this.resetStyle();
                if(index == 1){
                    this.$refs.tab1.style.backgroundColor = "rgb(125, 129, 127)";
                    this.currentTab = MyTabOne;
                }else if(index == 2){
                    this.$refs.tab2.style.backgroundColor = "rgb(125, 129, 127)";
                    this.currentTab = MyTabTwo;
                }else {
                    this.$refs.tab3.style.backgroundColor = "rgb(125, 129, 127)";
                    this.currentTab = MyTabThree;
                }
            
            },
            showAlert() {
                this.alertStatus = !this.alertStatus;
            },
            resetStyle() {
                this.$refs.tab1.style.backgroundColor = "#27AE60";
                this.$refs.tab2.style.backgroundColor = "#27AE60";
                this.$refs.tab3.style.backgroundColor = "#27AE60";
            },
            changeRoute(){
                console.log('garyhu', 'defaultRoute == '+this.defaultRoute);
                if(this.defaultRoute){
                    this.$router.replace({name: "profiles",params : {username : "garyhu"}})
                }else {
                    this.$router.replace({name: "study",params : {username : "Juddy"}})
                }
                this.defaultRoute = !this.defaultRoute;
            },
            showCal() {
                this.isShowCal = !this.isShowCal;
                if(this.isShowCal) {
                    this.btnMsg = "隐藏布局";
                }else {
                    this.btnMsg = "展示布局";
                }
            },
            changePersonal(val) {
                this.personal = val;
            },

            goMap() {
                this.$router.push('map');
            }
        },
        beforeCreate() {
            // 初始化 inject
            // 初始化 props、methods、data、computed 和 watch
            // 初始化 provide
            // console.group('------beforeCreate创建前状态------');
            // console.log("%c%s", "color:red","data   : " + this.$data); //undefined 
        },
        created() {
            // 挂载实例 vm.$mount(vm.$options.el)
            // console.group('------created创建完毕状态------');
            // console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化 
        },
        beforeMount() {
            // console.group('------beforeMount挂载前状态------');
            // console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化  
        },
        beforeUpdate() {
            // console.group('beforeUpdate 更新前状态===============》');
            // console.log("%c%s", "color:red","data   : " + this.$data); 
        },
        updated() {
            // console.group('updated 更新完成状态===============》');
            // console.log("%c%s", "color:red","data   : " + this.$data); 
        },
        beforeDestroy() {
            // console.group('beforeDestroy 销毁前状态===============》');
            // console.log("%c%s", "color:red","data   : " + this.$data); 
        },
        destroyed() {
            // console.group('destroyed 销毁完成状态===============》');
            // console.log("%c%s", "color:red","data   : " + this.$data); 
        },
        watch: {
            price(val, oldVal) {
                console.log('garyhu', 'new value : '+val+", oldValue : "+oldVal);
            },
            results: {
                handler: function(val,oldVal) {

                },
                deep: true // 对象的深层监听
            },
            currentTab: {
                handler: function(val,oldVal) {

                },
                immediate: true // 组件创建时就立刻调用 
            }
        }
    }
</script>

<style scoped lang="less">
    div {
        width: 100%;
    }

    body {
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: montserrat;
        background: 
            linear-gradient(rgba(196, 102, 0, 0.6), rgba(155, 89, 182, 0.6));
    }

    #main_cula {
        background: white;
        border: 0 none;
        border-radius: 3px;
        box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.4);
        padding: 20px 30px;
        box-sizing: border-box;
    }
    h1 {
        text-align: center;
        color: #666;
        margin: 0 0 20px;
    }
    .subject {
        margin-bottom: 10px;
        padding: 5px;
    }

    input {
        padding: 15px;
        border: 1px solid #ccc;
        border-radius: 3px;
        box-sizing: border-box;
        font-family: montserrat;
        color: #2C3E50;
        font-size: 13px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
    }

    #main_page {
        position: relative;
    }

    #main_bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    span {
        display: inline-block;
        vertical-align: middle;
    }

    .total {
        border-top: 3px double #ccc;
        margin-top: 20px;
        padding-top: 20px;
        text-align: center;
        color: #27AE60;
        font-size: 16px;
        font-weight: bold;
    }

    .tab_container {
        width: 240px;
        height: 40px;
        display: flex;
        // background-color: #27AE60;
        margin: 30px auto;
        border-radius: 5px;
        box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.4);
        justify-content: center;
        align-items: center;
    }

    .tab1 {
        color: #FFFFFF;
        width: 80px;
        height: 40px;
        text-align: center;
        background-color: #27AE60;
        line-height: 40px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        cursor: pointer;
    }

    .tab2 {
        color: #FFFFFF;
        width: 80px;
        height: 40px;
        text-align: center;
        background-color: #27AE60;
        line-height: 40px;
        border-right: 1px solid #FFFFFF;
        border-left: 1px solid #FFFFFF;
        cursor: pointer;
    }

    .tab3 {
        color: #FFFFFF;
        width: 80px;
        height: 40px;
        text-align: center;
        background-color: #27AE60;
        line-height: 40px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        cursor: pointer;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 1s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    #hw-button{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80px;
        height: 30px;
        box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.4);
        background-color: #27AE60;
        margin-left: 60px;
        margin-top: 20px;
        color: #FFFFFF;
        border-radius: 3px;
        cursor: pointer;
    }

    .first-btn {
        background: #3299ea;
        width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 3px;
        margin-right: 10px;
        cursor: pointer;
        color: #FFFFFF;
    }
</style>

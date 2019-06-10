<template>
    <div style="height: 600px">
        <h1>个人中心</h1>
        <div><button @click="showImg">{{btnMsg}}</button></div><br/>
        <img :class="imgC" src="../assets/girl.jpg"/>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isShowImg: false,
                imgC: "personal_bg_no",
                btnMsg: "展示图片"
            }
        },
        methods: {
            showImg() {
                this.isShowImg = !this.isShowImg;
                if(this.isShowImg){
                    this.imgC = "personal_bg";
                    this.btnMsg = "隐藏图片";
                }else  {
                    this.imgC = "personal_bg_no";
                    this.btnMsg = "展示图片";
                }
            }
        }
    }
</script>


<style scoped lang="less">
    .personal_bg {
        width: 100%;
        height: 600px;
        transition: width 2s;
        -webkit-transition: width 2s;
    }
    .personal_bg_no {
        width: 0;
        height: 600px;
        animation: hideImg 2s;
        -webkit-animation: hideImg 2s;
    }

    @keyframes hideImg {
        0% {width: 100%;}
        100% {width: 0px;}
    }
</style>


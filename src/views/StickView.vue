// 吸顶效果的展示
<template>
    <div>
        <div id="space"></div>
        <div id="head-text" ref="header" :class="headerFixed?'isFixed':''">
            我是可以粘滞在顶部的导航条
        </div>
        <div class="content-part">
            我是内容部分
        </div>
        <div id="middle-text" ref="middle" :class="middleFixed?'isFixed':''">
            中间导航栏
        </div>
        <div class="content-part">
            底部内容
        </div>
    </div>
</template>

<script>
export default {
    name: "StickView",
    data() {
        return {
            headerFixed: false,
            middleFixed: false
        }
    },
    mounted() {
        window.addEventListener("scroll",this.handleScroll);
        // 监听dom渲染完成
        this.$nextTick(function(){
            // 这里fixedHeaderRoot是吸顶元素的ID
            let header = document.getElementById("head-text");
            // 这里要得到top的距离和元素自身的高度
            this.offsetHeaderTop = header.offsetTop;
            this.offsetHeight = header.offsetHeight;
            this.offsetMiddleTop = this.$refs.middle.offsetTop;
            console.log("offsetTop:" + this.offsetMiddleTop + "," + this.offsetHeight);
        });
    },
    destroyed() {
        window.removeEventListener("scroll",this.handleScroll);
    },
    methods: {
        handleScroll() {
            // 得到页面滚动的距离
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            this.middleFixed = scrollTop >= this.offsetMiddleTop - this.offsetHeight;
            // 判断页面滚动的距离是否大于吸顶元素的位置
            this.headerFixed = !this.middleFixed && scrollTop >= this.offsetHeaderTop;

            if((this.offsetMiddleTop - scrollTop) <= this.offsetHeight * 2 && 
                (this.offsetMiddleTop - scrollTop) >= this.offsetHeight) {
                this.headerFixed = true;
                console.log("offsetTop:" + (this.offsetMiddleTop - scrollTop));
                console.log("offsetHeaderTop:" + (scrollTop + 2*this.offsetHeight - this.offsetMiddleTop));
                document.getElementById("head-text").style.top = -(scrollTop + 2*this.offsetHeight - this.offsetMiddleTop)+"px";
            }else {
                document.getElementById("head-text").style.top = 0+"px";
            }

        },
        // 有问题
        handleScroll1() {
            // 获取元素距离页面顶部距离
            // getBoundingClientRect()获取元素的矩形框，返回对象object，包含top,bottom,left.right,width,height
            // 用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置。不包含文档卷起来的部分。
            let headerTop = this.$refs.header.getBoundingClientRect().top;
            let middleTop = this.$refs.middle.getBoundingClientRect().top;

            console.log('garyhu', 'headerTop = '+headerTop);
            console.log('garyhu', 'middleTop = '+middleTop);

            this.middleFixed = middleTop <= 0;

            this.headerFixed = !this.middleFixed && headerTop <= 0;

            if(middleTop <= this.offsetHeight && middleTop >= 0){
                this.headerFixed = true;
                this.$refs.header.style.top = (middleTop - this.offsetHeight) + "px";
            }else {
                this.$refs.header.style.top = 0;
            }
        }
    }
}
</script>

<style lang="less" scoped>
    html,body,div {
        padding: 0px;
        margin: 0px;
    }
    #head-text {
        width: 100%;
        height: 50px;
        background-color: burlywood;
        line-height: 50px;
        color: #FFFFFF;
    }
    #middle-text{
        width: 100%;
        height: 50px;
        background-color: burlywood;
        line-height: 50px;
        color: #FFFFFF;
    }
    .content-part {
        width: 100%;
        height: 1000px;
        background-color: aquamarine;
        color: rgb(238, 10, 10);
        line-height: 1000px;
    }

    #space {
        height: 200px;
        background-color: chocolate
    }

    .isFixed{
        position: fixed;
        top: 0;
        left: 0;
    }
</style>


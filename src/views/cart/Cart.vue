//  购物车demo(商品飞入购物车动画和商品瀑布流布局)
<template>
    <div class="cart_layout">
        <!-- 商品布局 -->
        <div class="goods_layout">
            <div class="goods_item_layout" v-for="item in goods" :key="item.name">
                <img :src="item.img" class="goods_img"/>
                <div style="display: flex;flex-direction: row;align-items: center;justify-content: space-around;width: 100%;height: 30px;">
                    <span style="font-size: 8px">{{item.name}}</span>
                    <span style="font-size: 8px">${{item.price}}</span>
                    <img src="../../assets/cart.png" class="goods_add_icon" @click="addCart(item)"/>
                </div>
            </div>
        </div>
        <!-- 中间瀑布流布局 -->
        <div class="container">
            <div class="item" v-for="item in menus" :key="item.name">
                <div class="itemContent" :style="getStyle(item)">{{item.name}}</div>
            </div>
        </div>
        <!-- 购物车布局 -->
        <div class="bottom_layout">
            <img id="buycar" class="bottom_cart" src="../../assets/cart.png"/>
        </div>
        <!-- 圆形商品小球 -->
        <transition 
            appear 
            @after-enter="afterEnter"
            @before-enter="beforeEnter"
        >
            <div ref="ball" v-if="isShow" class="ball">
            <img :src="cirPic" class="circle_pic"/>
            </div>
        </transition>
    </div>
</template>

<script>
import { goods } from "../../const/enum.js"
export default {
    data() {
        return {
            pic: require("../../assets/book.jpeg"),
            goods,
            cirPic: null,
            elLeft: 0,
            elTop: 0,
            isShow: false,
            menus: []
        }
    },
    mounted() {
        const colors = ["red","blue","aqua","aquamarine","burlywood"]
        const heights = ["50px","90px","63px","82px","75px","66px","100px"]
        for(let i = 0; i < 20;i++) {
            this.menus.push({
                name: "goods"+i,
                color: colors[Math.floor(Math.random()*(colors.length))],
                height: heights[Math.floor(Math.random()*(heights.length))] ,
            })
        }
    },
    methods: {
        addCart(item) {
            this.cirPic = item.img;
            this.elLeft = event.target.getBoundingClientRect().left;
            this.elTop = event.target.getBoundingClientRect().top;

            this.isShow = true;
        },
        afterEnter(el) {
            // 获取底部购物车徽标
            const badgePosition = document
                .getElementById("buycar")
                .getBoundingClientRect();
            // 设置小球移动的位移
            el.style.transform = `translate3d(${badgePosition.left}px,${badgePosition.top + 30}px,0)`
            // 增加贝塞尔曲线  
            el.style.transition = 'transform .88s cubic-bezier(0.3, -0.25, 0.7, -0.15)';
            el.style.transition = 'transform .88s linear';
            // this.showMoveDot = this.showMoveDot.map(item => false);
            this.isShow = false;
            // 设置透明度
            el.style.opacity = 1;

            // 监听小球动画结束方法
            el.addEventListener('transitionend', () => {
                console.log("动画结束1")
                el.style.display = 'none';
                this.listenInCart();
            })
            
            // 监听小球动画结束方法
            el.addEventListener('webkitAnimationEnd', () => {
                // console.log("动画结束2")
                el.style.display = 'none';
                this.listenInCart();
            })

        },
        beforeEnter(el) {
            // 设置transform值
            el.style.transform = `translate3d(${this.elLeft - 30}px,${this.elTop - 100}px , 0)`;
            // el.style.left = `${this.elLeft}px`;
            // el.style.top = `${this.elTop}px`
            // 设置透明度
            el.style.opacity = 0;
        },

        listenInCart() {
            // 拿到底部Tabbar购物车的DOM元素添加class
            document.getElementById("buycar").classList.add('moveToCart');
            setTimeout(() => {
                // 500毫秒后移除底部Tabbar购物车的DOM元素class
                document.getElementById("buycar").classList.remove('moveToCart');
            }, 500);

        },

        getStyle(item) {
            // console.log(item)
            return {
                background: item.color,
                height: item.height
            }
        }
    },
}
</script>

<style scoped>
.cart_layout {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

.goods_layout {
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow-x:auto;
}

.goods_item_layout {
    width: 100px;
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    background: #98cad1;
    margin: 0 5px;
}

.goods_img {
    width: 100px;
    height: 120px;
    border-radius: 5px;
}

.goods_add_icon {
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.bottom_layout {
    width: 100vw;
    height: 60px;
    position: fixed;
    bottom: 0px;
    left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.bottom_cart {
    width: 30px;
    height: 30px;
    cursor: pointer;
}
 
.ball {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
}

.circle_pic {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    animation: myscale .88s ease-in-out;
}

@keyframes myscale {
    0% {
        transform: scale(1)
    }
    25% {
        transform: scale(0.8)
    }
    50% {
        transform: scale(0.6)
    }
    75% {
        transform: scale(0.4)
    }
    100% {
        transform: scale(0.2)
    }
}
.moveToCart {
    animation: carmove .5s ease-in-out;
}

@keyframes carmove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

.container{
	width: 100%;
	column-count: 5; /* 分成5列*/
}
.item{
	break-inside: avoid; /*为了控制文本块分解成单独的列，以免项目列表的内容跨列，破坏整体的布局*/
	margin-bottom:10px;
}

</style>

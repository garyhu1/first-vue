<template>
    <div>
        <canvas width="400" height="400" id="my_canvas"></canvas>

        <div class="cell_layout">
            <img src="../assets/b6-cell-icon.png"/>
            <canvas class="anim_canvas" width="200" height="100"  id="music_canvas"></canvas>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            musicCanvs: null,
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.handleMusic();
            this.handlePrimaryCanvas();
            
        });

        // 
        window.requestAnimFrame = (function(){
            return  window.requestAnimationFrame       || 
                    window.webkitRequestAnimationFrame || 
                    window.mozRequestAnimationFrame    || 
                    window.oRequestAnimationFrame      || 
                    window.msRequestAnimationFrame     || 
                    function(callback,element){
                        window.setTimeout(callback, 1000 / 60);
                    };
        })();
    },
    methods: {
        handleMusic() {
            this.musicCanvs = document.getElementById("music_canvas");
            this.musicCtx = this.musicCanvs.getContext("2d");
            this.animate();
        },
        animate() {
            this.jump();
            // window.requestAnimationFrame(this.animate)
            setInterval(() => {
                this.jump();
            },100);
        },
        jump() {
            this.musicCtx.clearRect(0,0,200,100)
            // 创建渐变
            let grd=this.musicCtx.createLinearGradient(0,0,0,100);
            grd.addColorStop(0,"red");
            grd.addColorStop(1,"white");
            this.musicCtx.fillStyle = grd;
            for(let i = 0;i < 21;i++) {
                this.musicCtx.fillRect((i-1)*10,0,5,Math.ceil(Math.random()*40+50));
            }
            // this.musicCtx.fillRect(0,10,5,Math.ceil(Math.random()*40+60));
            // this.musicCtx.fillRect(10,10,5,Math.ceil(Math.random()*40+60));
            // this.musicCtx.fillRect(20,10,5,Math.ceil(Math.random()*40+60));
            // this.musicCtx.fillRect(30,10,5,Math.ceil(Math.random()*40+60));
            // this.musicCtx.fillRect(40,10,5,Math.ceil(Math.random()*40+60));
            // this.musicCtx.fillRect(50,10,5,Math.ceil(Math.random()*40+60));
            // this.musicCtx.fillRect(60,10,5,Math.ceil(Math.random()*40+60));
            // this.musicCtx.fillRect(70,10,5,Math.ceil(Math.random()*40+60));
        },
        handlePrimaryCanvas() {
            let canvas = document.getElementById("my_canvas");
            let ctx = canvas.getContext("2d");
            ctx.fillRect(10,10,40,40);
            ctx.beginPath();
            ctx.arc(40,85,30,0,2*Math.PI);
            ctx.stroke();
        },
    },
}
</script>

<style scoped>
#my_canvas {
    border:1px solid #000000;
}

.cell_layout {
    width: 380px;
    height: 694px;
    position: relative;
    margin: 0 auto;
}

.cell_layout>img {
    width: 380px;
    height: 694px;
}
.anim_canvas {
    position: absolute;
    left: 90px;
    bottom: 70px;
    background: #FFFFFF;
}
</style>

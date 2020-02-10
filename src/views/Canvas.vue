<template>
    <div>
        <canvas width="400" height="400" id="my_canvas"></canvas>

        <div class="cell_layout">
            <img src="../assets/b6-cell-icon.png"/>
            <canvas class="anim_canvas" width="200" height="100"  id="music_canvas"></canvas>
        </div>

        <canvas id="star_canvas" width="800" height="500"></canvas>
    </div>
</template>

<script>
export default {
    data() {
        return {
            musicCanvs: null,
            timer: null,
            musicCtx: null,
            starCanvas: null,
            starCtx: null,
            taiyang_R: 40,//太阳半径
            diqiu_R: 20,//地球半径
            circle_dq: 120,//地球绕太阳转轨道半径
            yueliang_R: 10,//月亮半径
            circle_yl: 40,//月亮绕地球转轨道半径
            diqiu_gz: 3600,//地球绕太阳转的角度的比值
            yueliang_gz: 240,//月亮绕地球转的角度的比值
            diqiu_zz: 100,//地球自转的角度的比值
            time: 0
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.handleMusic();
            this.handlePrimaryCanvas();
            this.handleStarMove();
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
            this.musicCtx.rotate(180*Math.PI/180);
            this.musicCtx.translate(-200,-100)
            this.animate();
        },
        animate() {
            this.jump();
            // window.requestAnimationFrame(this.animate)
            this.timer = setInterval(() => {
                this.jump();
            },100);
        },
        jump() {
            this.musicCtx.clearRect(0,0,200,100)
            // 创建渐变
            let grd=this.musicCtx.createLinearGradient(0,0,0,100);
            grd.addColorStop(0,"#1dd253");
            grd.addColorStop(0.5,"#df6d0a")
            grd.addColorStop(1,"#ee2819");
            this.musicCtx.fillStyle = grd;
            for(let i = 0;i < 21;i++) {
                this.musicCtx.fillRect((i-1)*10+2,0,5,Math.ceil(Math.random()*50+40));
            }
        },
        handlePrimaryCanvas() {
            let canvas = document.getElementById("my_canvas");
            let ctx = canvas.getContext("2d");
            let w = 400,h = 400;
            let scale = window.devicePixelRatio || 1;
            canvas.width = w*scale;
            canvas.height = h*scale;
            ctx.scale(scale,scale);
            let mt = ctx.measureText("hello");
            // console.log(mt)
            ctx.fillRect(10,10,40,40);
            ctx.beginPath();
            ctx.arc(40,85,30,0,2*Math.PI);
            ctx.stroke();

        },
        /**
         * @description 行星旋转
         */
        handleStarMove() {
            this.starCanvas = document.getElementById("star_canvas");
            this.starCtx = this.starCanvas.getContext("2d");
            let that = this;
            let iWidth = this.starCanvas.width,
                iHeight = this.starCanvas.height;

            // canvas.width = 800;
            // canvas.height = 500;
            this.starCtx.translate((iWidth/2),(iHeight/2));
            
            this.animate1();
        },

        animate1(){
            window.requestAnimFrame( this.animate1 );
            this.draw();
        },

        draw(){
            // console.log(this.starCtx)
            this.starCtx.clearRect(-this.starCanvas.width/2,-this.starCanvas.height/2,this.starCanvas.width,this.starCanvas.height);

            //太阳
            this.starCtx.beginPath();
            this.starCtx.fillStyle='#f05f12';
            this.starCtx.arc(0,0,this.taiyang_R,0,2*Math.PI,true);
            this.starCtx.fill();
            this.starCtx.closePath();

            //地球轨道
            this.starCtx.beginPath();
            this.starCtx.strokeStyle="#8669f0";
            this.starCtx.arc(0,0,this.circle_dq,0,2*Math.PI,true);
            this.starCtx.stroke();
            this.starCtx.closePath();


            // 2--地球+月亮绕（不旋转） + 地球自转（旋转）
            // 月亮轨道
            this.starCtx.beginPath();
            this.starCtx.strokeStyle="#8669f0";
            this.starCtx.arc(this.circle_dq*Math.cos(this.time*2*Math.PI/this.diqiu_gz),this.circle_dq*Math.sin(this.time*2*Math.PI/this.diqiu_gz),this.circle_yl,0,2*Math.PI,true);
            this.starCtx.stroke();
            this.starCtx.closePath();

            // 月亮
            this.starCtx.beginPath();
            this.starCtx.fillStyle = '#f0e912';
            this.starCtx.arc(this.circle_dq*Math.cos(this.time*2*Math.PI/this.diqiu_gz) + this.circle_yl*Math.cos(this.time*2*Math.PI/this.yueliang_gz) , this.circle_dq*Math.sin(this.time*2*Math.PI/this.diqiu_gz) + this.circle_yl*Math.sin(this.time*2*Math.PI/this.yueliang_gz) ,this.yueliang_R,0,2*Math.PI,true);
            this.starCtx.fill();
            this.starCtx.closePath();

            // 自转的地球
            this.starCtx.translate(Number(this.circle_dq*Math.cos(this.time*2*Math.PI/this.diqiu_gz)),Number(this.circle_dq*Math.sin(this.time*2*Math.PI/this.diqiu_gz)));
            this.starCtx.save();
            this.starCtx.beginPath();
            this.starCtx.rotate(this.time*2*Math.PI/this.diqiu_zz);//旋转角度
            this.starCtx.fillStyle='#24d5f0';
            this.starCtx.arc(0,0,this.diqiu_R,0,2*Math.PI,true);
            this.starCtx.fill();

            this.starCtx.textAlign = 'center';
            this.starCtx.textBaseline = 'middle';
            this.starCtx.strokeStyle = '#fff';
            this.starCtx.strokeText('地',0,0);
            this.starCtx.stroke();

            this.starCtx.closePath();
            this.starCtx.restore();
            this.starCtx.translate(-Number(this.circle_dq*Math.cos(this.time*2*Math.PI/this.diqiu_gz)),-Number(this.circle_dq*Math.sin(this.time*2*Math.PI/this.diqiu_gz)));
            
            this.time += 1;
        }
    },

    beforeDestroy() {
        if(this.timer) {
            clearInterval(this.timer)
        }
    }
}
</script>

<style scoped>
#my_canvas {
    border:1px solid #8669f0;
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
}
#star_canvas {
    border: 1px solid #18d15f;
}
</style>

<template>
    <div>
        <div @click="handleGen">测试生成器</div>
        <div @click="testCall">测试自定义call函数</div>
    </div>
</template>

<script>
import MyPromise from '../utils/MyPromise'
import "../utils/cusCall";

export default {
    data() {
        return {}
    },

    mounted() {
        this.testPromise1();
    },
    methods: {
        // 测试一个值多次打印
        testPromise() {
            let p = new MyPromise((resolve,rejected) => {
                setTimeout(() => {
                    resolve(10)
                },1000);
            });

            p.then((value) => {
                console.log(value)
            }).then((value) => {
                console.log(value)
            })
        },
        // 测试两个Promise链式调用
        testPromise1() {
            let p = new MyPromise((resolve,rejected) => {
                setTimeout(() => {
                    resolve("打印p")
                },1000);
            });

            let p1 = new MyPromise((resolve,rejected) => {
                setTimeout(() => {
                    resolve("打印p1")
                },1000);
            });

            // p.then();

            p.then((value) => {
                console.log(value);
                return p1;
            }).then((value) => {
                console.log(value)
            })
        },

        handleGen() {
            let gen = this.testGen();
            gen.next();
            gen.next();
        },

        testGen: function* name(params) {
            console.log("协程A");
            yield this.testB();
            console.log("over")
        },

        testB() {
            console.log("协程B")
        },

        testCall() {
            this.getName.myCall(null,"juddy",20);
        },

        getName(name,age) {
            console.log("name: "+name+", age: "+age)
        }
    },
}
</script>
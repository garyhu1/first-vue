<template>
    <div>
        <div id="mycharts"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    mounted() {
        this.handleMyCharts();
    },
    methods: {
        handleMyCharts() {
            let myCharts = this.$echarts.init(document.getElementById("mycharts"))
            // 绘制图表
            myCharts.setOption({
                title: { text: '在Vue中使用echarts' },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ["销量"]
                },
                xAxis: {
                    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
        },
    },
}
</script>

<style scoped>
#mycharts {
    width: 800px;
    height: 800px;
}
</style>
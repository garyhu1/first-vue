<template>
    <div id="map"></div>
</template>

<script>
export default {
    data() {
        return {
            map: null
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.map = L.map('map',{
                center: [40, 100],
                zoom: 4
            });
            L.tileLayer("http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=2e877828cc2071eef8b0d84d3684db81")
              .addTo(this.map);
        },
    },
}
</script>

<style lang="less" scoped>
#map {
  width: 100%;
  height: calc(100vh);
}
</style>
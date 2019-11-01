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
            this.map = L.map('map');
            L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                minZoom: 5, maxZoom: 18
            }).addTo(this.map);
            // 地名标注
            // L.tileLayer("http://t{s}.tianditu.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles", {
            //     subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"]
            // }).addTo(this.map);
            // // 边界
            // L.tileLayer("http://t{s}.tianditu.cn/ibo_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=ibo&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles", {
            //     subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"]
            // }).addTo(this.map);
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
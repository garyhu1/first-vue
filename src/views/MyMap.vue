<template>
    <div id="map"></div>
</template>

<script>
export default {
    data() {
        return {
            map: null,        // 地图实例
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init(){
            this.map = new this.mbgl.Map({
                container: 'map',
                style: 'https://testriab.luokuang.com/view/map/lk_map_online.json',
                center: [116.39074, 39.91672],
                // center: [-87.61694, 41.86625],
                zoom: 16,
                // pitch: 40,
                bearing: 1
            })
            this.showCompassAndZoom();
            this.showUserLocation();
            this.showScaleControl();
            // this.map.on('load', () => {
            //     // this.load3D();
            //     this.showCompassAndZoom();
            // })

            // this.listenResize();
        },

        /**
         * 加载3D模型
         */
        load3D() {
            this.map.setCenter([-87.61694, 41.86625])
            this.map.addLayer({
                'id': 'room-extrusion',
                'type': 'fill-extrusion',
                'source': {
                    'type': 'geojson',
                    'data': 'https://docs.mapbox.com/mapbox-gl-js/assets/indoor-3d-map.geojson'
                },
                'paint': {
                    'fill-extrusion-color': ['get', 'color'],
                    'fill-extrusion-height': ['get', 'height'],
                    'fill-extrusion-base': ['get', 'base_height'],
                    'fill-extrusion-opacity': 0.6
                }
            })
        },

        /**
         * 监听地图zoom的变化
         */
        listenResize() {
            this.map.on("drag", (e) => {
                console.log(e);
            })
        },

        /**
         * 显示缩放按钮和罗盘
         */
        showCompassAndZoom() {
            let nav = new this.mbgl.NavigationControl();
            this.map.addControl(nav,'top-left');
        },

        /**
         * 显示用户定位图标
         */
        showUserLocation() {
            // Add geolocate control to the map.
            this.map.addControl(new this.mbgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true
            }));
        },

        /**
         * 显示比例尺
         */
        showScaleControl() {
            let scale = new this.mbgl.ScaleControl({
                maxWidth: 80,
                unit: 'imperial'
            });
            this.map.addControl(scale);

            scale.setUnit('metric');
        }
    }
}
</script>

<style scoped>
@import url('https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css');
#map {
  position: absolute;
  left: 0;
  top: 0;
  text-align: left;
  width: 100%;
  height: 100%;
}
</style>
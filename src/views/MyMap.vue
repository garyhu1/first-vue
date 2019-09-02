<template>
    <div id="map"></div>
</template>

<script>
export default {
    data() {
        return {}
    },
    mounted() {
        this.init();
    },
    methods: {
        init(){
            let map = new this.mbgl.Map({
                container: 'map',
                style: 'https://testriab.luokuang.com/view/map/lk_map_online.json',
                // center: [116.39074, 39.91672],
                center: [-87.61694, 41.86625],
                zoom: 16,
                pitch: 40,
                bearing: 1
            })
            map.on('load', function() {
                map.addLayer({
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
            })
        }
    }
}
</script>

<style scoped>
#map {
  position: absolute;
  left: 0;
  top: 0;
  text-align: left;
  width: 100%;
  height: 100%;
}
</style>
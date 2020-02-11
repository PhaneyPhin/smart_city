<template>
  <vl-map :tabindex='-1' :load-tiles-while-animating="true" :load-tiles-while-interacting="true" data-projection="EPSG:4326" style="height: 400px">
    <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

    <vl-layer-tile>
      <vl-source-sputnik></vl-source-sputnik>
    </vl-layer-tile>

    <vl-layer-tile id="wms">
      <vl-source-wms :extParams="params" :url="url" 
                      :style-name="styleName" :matrix-set="matrixSet" :format="format" :layers="LAYERS"></vl-source-wms>
    </vl-layer-tile>
  </vl-map>
</template>

<script>
import OlTileWMS from "ol/source/TileWMS";

  export default {
    data () {
      return { 
        zoom: 2,
        center: [-90, 50],
        rotation: 0,
        url: 'https://www.deemap.com/DeeMap/gwc/service/wms',
        layerName: '0',
        matrixSet: 'EPSG:900913',
        format: 'image/png8',
        styleName: 'default',
        LAYERS: localStorage.getItem("lang") == 'EN' ? "DeeMap2_THA_Map_EN" : "DeeMap2_THA_Map",
        attribution: 'Tiles © <a href="https://services.arcgisonline.com/arcgis/rest/' +
                                'services/Demographics/USA_Population_Density/MapServer/">ArcGIS</a>',
         activeItem:"", 
        params: {
         
          "FORMAT": "image/png8",
          "VERSION": "1.1.1",
          "SRS": "EPSG:900913",
          "TILES": true,
        }
      }
    },
  }
</script>
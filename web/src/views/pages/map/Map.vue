<template>
  <div class="w-full" >
    <ul class="mb-5">
      <li
       
        class="flex justify-between py-3 px-6 border d-theme-border-grey-light border-solid"
      >
        <span class="flex items-center">
          <span class="inline-block h-3 w-3 rounded-full mr-2" :class="`bg-green`"></span>
          <span class="font-semibold">AAAAA</span>
        </span>
        <span> 30</span>
      </li>
    </ul>
    <div  style="position:relative;margin:0;padding:0;">
      <vl-map
        :load-tiles-while-animating="true"
        ref="map"
        :load-tiles-while-interacting="true"
        @click="onClick"
        data-projection="EPSG:4326"
        :style="fullscreen?'height: 100vh;':'height: 50vh;'"
        @postcompose="onMapPostCompose"
        @pointermove="onMapPointerMove"
      >
        <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

        <vl-layer-tile id="osm">
          <vl-source-osm></vl-source-osm>
        </vl-layer-tile>
        <vl-layer-tile id="osm">
          <vl-source-osm></vl-source-osm>
        </vl-layer-tile>
        <vl-layer-tile id="wms">
          <vl-source-wms
            :extParams="params"
            :url="url"
            :style-name="styleName"
            :matrix-set="matrixSet"
            :format="format"
            :layers="LAYERS"
          ></vl-source-wms>
        </vl-layer-tile>

        <vl-feature v-for="(item,index) of devices" :key="index" :properties="item.properties">
          <template slot-scope="feature">
            <vl-geom-point :coordinates="[item.lon,item.lat]"></vl-geom-point>
            <vl-style-box>
              <vl-style-icon
                :src="item.device_icon"
                :scale="item.size"
                :anchor="[item.anchor_x,item.anchor_y]"
                :size="[128, 128]"
              ></vl-style-icon>
            </vl-style-box>
            <vl-overlay v-if="item.properties.show" :position="[item.lon,item.lat]">
              <template slot-scope="scope">
                <div class="overlay-content">
                  <vx-card title="Event Alert">Your device is online currently {{index}}</vx-card>
                </div>
              </template>
            </vl-overlay>
          </template>
        </vl-feature>
        
      </vl-map>
    
    </div>
    <div class="w-full" v-if="isFuhocctv">
      <div class="vx-row mt-10">
        <div class="vx-card vx-col w-full md:w-3/4">
         <div class="  w-full todo-content-scroll-area" :settings="settings" ref="data_list" v-if='data.status==1'>
           <div :style="[{width:(300*channels.length)+'px'}]">
             <div class="vx-row pl-4 pt-5">
            <div v-for="(item,index) of channels" :key="index">
              <iframe
                class="embed"
                id="embed"
               allowfullscreen
                :src="(fuhoConfig.host.indexOf('http')>-1?fuhoConfig.host:('http://'+fuhoConfig.host))+'/live/'+fuhoConfig.device_id+'@'+item+'/'+fuhoConfig.username+'/'+fuhoConfig.password"
              ></iframe>
            </div>
           
            <br><br><br>
          </div>
           </div>
         </div>
        </div>
        <div class="vx-col w-full md:w-1/4" >
          <div class="vx-card" style="height:210px">
            <table style="width:100%">
              <tr v-for="(tr, index) in infos" :key="index">
                  <td style="width:40%;padding:20px">{{tr.name}}</td>
                  <td style="padding:20px">{{tr.value}}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import {
  createProj,
  addProj,
  findPointOnSurface,
  createStyle,
  createMultiPointGeom,
  loadingBBox
} from "vuelayers/lib/ol-ext";
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
const easeInOut = t => 1 - Math.pow(1 - t, 3);
import service from "@/service/service";
export default {
  components:{
     VuePerfectScrollbar
  },
  data() {

    return {
      infos:[],
      show: true,
      fullscreen:false,
      isFuhocctv: false,
      fuhoConfig: {},
      data:{},
      zoom: 12,
      center: service.center,
      marker_post: service.center,
      rotation: 0,
      devices: [],
      geolocPosition: undefined,
      channels:[],
      activeitem: 0,
      
      settings: {
                height:200,
                maxScrollbarLength: 3,
                wheelSpeed: 0.30,
            },
      url:
        "http://10.255.246.34:8080/DeeMap2_2020/wms?customer_key=1xwg5CAuhFz8z2Rw",
      layerName: "0",
      matrixSet: "EPSG:900913",
      format: "image/png",
      styleName: "default",
      LAYERS:
        localStorage.getItem("lang") == "EN"
          ? "DeeMap2_THA_Map_EN"
          : "DeeMap2_THA_Map_Night",
      attribution:
        'Tiles © <a href="https://services.arcgisonline.com/arcgis/rest/' +
        'services/Demographics/USA_Population_Density/MapServer/">ArcGIS</a>',
      activeItem: "",
      params: {
        FORMAT: "image/png8",
        VERSION: "1.1.1",
        SRS: "EPSG:900913",
        TILES: true
      }
    };
  },
  created() {
    this.getDevice();
  },
  methods: {
    
    viewVideo(channel){
      var url=(this.fuhoConfig.host.indexOf('http')>-1?this.fuhoConfig.host:('http://'+this.fuhoConfig.host))+'/live/'+this.fuhoConfig.device_id+'@'+Math.pow(2,channel-1)+'/'+this.fuhoConfig.username+'/'+this.fuhoConfig.password;
      console.log(url);
    },
    onClick:async function(evt) {
      var { pixel } = evt;
      let hit = this.$refs.map.forEachFeatureAtPixel(pixel, x => {
        let temp = x.getProperties();
        return temp.index;
      });
      this.devices = this.devices.map(x => {
        x.properties.show = false;
        return x;
      });
      if (hit) {
        // console.log(hit);
        let filter = this.devices.map(x => x.properties.index).indexOf(hit);
        var device = this.devices[filter];
        console.log(device);
        this.devices[filter].properties.show = true;
        switch (device.device_type_id) {
          case "DT00001":
            console.log("cctv");
            this.isFuhocctv = true;
            try {
              this.fuhoConfig = JSON.parse(device.device_config);
              var deviceInforResult=await this.$service.postData('device/getDeviceGkInfo',this.fuhoConfig);

              if(deviceInforResult.code==1){
                this.channels=[...Array.from(Array(deviceInforResult.data.channel).keys())].map(x=>Math.pow(2,x));
                this.fuhoConfig.data=deviceInforResult.data;
                var data={...deviceInforResult.data};
                this.data={...data}
                console.log(data);
                this.infos=[
                  {
                    name:"Device ID",
                    value:data.deviceid
                  },{
                    name:"Status",
                    value:data.status==1?'online':'offline'
                  },{
                    name:"Number of Channel",
                    value:data.channel
                  }
                ]
              }
            } catch (e) {
              this.fuhoConfig = {};
            }
            break;
          default:
            this.isFuhocctv = false;
        }
      }
    },
    toggle () {
       this.$refs['fullscreen'].toggle() ;
    },
    fullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
    },
    onMapPointerMove: function({ pixel }) {
      let hit = this.$refs.map.forEachFeatureAtPixel(pixel, x => {
        let temp = x.getProperties();
        return temp.index;
      });

      this.devices = this.devices.map(x => {
        x.properties.show = false;
        return x;
      });
      if (hit) {
        console.log(hit);
        let filter = this.devices.map(x => x.properties.index).indexOf(hit);
        this.devices[filter].properties.show = true;
      }
    },
    onMarkerClick() {
      this.$swal("clicked", "", "success");
    },
    async getDevice() {
      var deviceResponse = await this.$service.postData("device/getDevice", {});

      this.devices = deviceResponse.data.map((item, index) => {
        item.show = false;
        item.properties = { index: index + 1 };
        return item;
      });
      // this.devices=[{...this.devices[0]},...this.devices]
    },
    pointOnSurface: findPointOnSurface,
    onMapPostCompose({ vectorContext, frameState }) {
      // document.querySelector('canvas').style.filter="invert(90%)"
      if (!this.$refs.marker || !this.$refs.marker.$feature) return;

      const feature = this.$refs.marker.$feature;
      if (!feature.getGeometry() || !feature.getStyle()) return;

      const flashGeom = feature.getGeometry().clone();
      const duration = feature.get("duration");
      const elapsed = frameState.time - feature.get("start");
      const elapsedRatio = elapsed / duration;
      const radius = easeInOut(elapsedRatio) * 35 + 5;
      const opacity = easeInOut(1 - elapsedRatio);
      const fillOpacity = easeInOut(0.5 - elapsedRatio);

      vectorContext.setStyle(
        createStyle({
          imageRadius: radius,
          fillColor: [119, 170, 203, fillOpacity],
          strokeColor: [119, 170, 203, opacity],
          strokeWidth: 2 + opacity
        })
      );

      vectorContext.drawGeometry(flashGeom);
      vectorContext.setStyle(feature.getStyle()(feature)[0]);
      vectorContext.drawGeometry(feature.getGeometry());

      if (elapsed > duration) {
        feature.set("start", Date.now());
      }

      this.$refs.map.render();
    }
  },
  watch: {
    "$store.state.reduce"(val) {
      console.log(val);
      setTimeout(() => {
        this.$refs.map.refresh();
      }, 1000);
    },
    "$store.state.windowWidth"(val) {
      console.log(val);
      this.$refs.map.refresh();
    },
    // fullscreen(val){
    //   setTimeout(()=>{
    //     // alert(11);
    //     this.$ref.map.refresh();
    //   },5000)
    // }
  }
};
</script>
<style lang="scss">
.map-panel {
  position: absolute;
  top: 0;
  right: 0;
  width: 22em;
}
.panel-content {
  background: #fff;
  border-radius: 6px;
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.1);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  color: #4a4a4a;
  display: block;
  height: 500px;
  padding: 1.25rem;
}
.fix-nav {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 20px;
  width: 100%;
}
.overlay-content {
  background: black;
}

div.frame-contain {
  z-index: -1;
  height: 200px;
  width: 300px;
  overflow-x: hidden;
  overflow: hidden;
}

iframe.embed {
  width: 300px;
  height: 200px;
  // pointer-events: none;
  // margin-left: -24%;
  // margin-top: -41px;
  /* margin-bottom: 10vh; */
}
iframe,
video {
  cursor: pointer;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.todo-content-scroll-area{
  overflow-x:scroll;

}
 ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0); 
    -webkit-border-radius: 10px;
    border-radius: 10px;
}
 /*add a shadow to the scrollbar here*/
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 0px rgba(0,0,0,0); 
    -webkit-border-radius: 10px;
    border-radius: 10px;
}
/*this is the little scrolly dealio in the bar*/ 
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #4353ff;
    height: 3px;
}
/*nobody needs this little scrollbar corner, I mean really, get rid of it haha*/  
  ::-webkit-scrollbar-corner       { display: none; height: 0px; width: 0px; }
</style>
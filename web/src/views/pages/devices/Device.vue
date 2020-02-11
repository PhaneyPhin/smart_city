<template>
  <vx-card>
    <vs-button color="primary" @click="addDevice()">Add Device</vs-button>
    <vs-table max-items="10" search pagination :data="devices">
      <template slot="thead">
        <vs-th sort-key="device_id">device id</vs-th>
        <vs-th sort-key="device_name">device name</vs-th>
        <vs-th>lat</vs-th>
        <vs-th>lon</vs-th>
        <vs-th>add config</vs-th>
        <vs-th>edit</vs-th>
        <vs-th>delete</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="tr.device_id">{{ tr.device_id }}</vs-td>

          <vs-td :data="tr.device_name">{{ tr.device_name }}</vs-td>
          <vs-td :data="tr.lat">{{ tr.lat}}</vs-td>

          <vs-td :data="tr.lon">{{ tr.lon }}</vs-td>
          <vs-td > 
            <feather-icon
              icon="EditIcon"
              class="cursor-pointer w-6 h-6 text-warning"
              size="small"
              @click="
                        addConfig(tr)
                      "
            ></feather-icon>
          </vs-td>
          <vs-td > 
            <feather-icon
              icon="EditIcon"
              class="cursor-pointer w-6 h-6 text-warning"
              size="small"
              @click="
                        edit(tr)
                      "
            ></feather-icon>
          </vs-td>
          <vs-td>
            <feather-icon
              icon="Trash2Icon"
              class="cursor-pointer w-6 h-6 text-danger"
              size="small"
              @click="delete_device(tr)"
            ></feather-icon>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
    <vs-popup class="holamundo" title="View Config" :active.sync="viewConfig">
          <div class="w-full" v-if="configs.length>0">
            <vs-input v-for="(item,index) in configs" :key="index"
                :label-placeholder="item.name"
                val-icon-warning="warning"
                :name="item.name"
                v-model="item.value"
                class="w-full mt-10"
                icon-pack="feather"
                icon="icon-user"
                icon-no-border
                />
              <div class="mt-10">
                 <vs-button
                        ref="loadableButton"
                        id="button-with-loading"
                        class="vs-con-loading__container mr-5 ml-5"
                        vslor="primary"
                        @click="save_config()"
                    >{{ $t("save") }}</vs-button>
                     <vs-button
                       
                        color="danger"
                        type="border"
                        @click="viewConfig = false"
                    >{{ $t("cancel") }}</vs-button>
                   
                </div>
          </div>
          <div class="w-full" v-if="configs.length==0">
            <div class="align-center center">No config field in this device type</div>
          </div>
    </vs-popup>
    <vs-popup class="holamundo"  fullscreen :title="title" :active.sync="popupActive">
        
        <div class="vx-row">
        <div class='w-full md:w-1/2 mt-10 pl-5'>
             <vs-input
                :warning="errors.has('device_name')"
                :warning-text="$t('device name is required')"
                :label-placeholder="$t('device name')"
                val-icon-warning="warning"
                v-validate="'required'"
                name="device_name"
                v-model="editObj.device_name"
                class="w-full"
                icon-pack="feather"
                icon="icon-user"
                icon-no-border
                />
        </div>

        <div class="w-1/2 md:w-1/4 mt-10 pl-5 pr-5">
            <vs-input
                :warning="errors.has('lat')"
                :warning-text="$t('please select location in map')"
                :label-placeholder="$t('lat')"
                val-icon-warning="warning"
                v-validate="'required'"
                name="lat"
                v-model="editObj.lat"
                class="w-full"
                icon-pack="feather"
                icon="icon-user"
                icon-no-border
                />
        </div>
        
        <div class="w-1/2 md:w-1/4 mt-10 pl-5 pr-5">
             <vs-input
                :warning="errors.has('lon')"
                :warning-text="$t('please select location in map')"
                :label-placeholder="$t('lon')"
                val-icon-warning="warning"
                v-validate="'required'"
                name="lon"
                v-model="editObj.lon"
                class="w-full"
                icon-pack="feather"
                icon="icon-user"
                icon-no-border
                />
                
        </div>
        </div>
        <div class="vx-row">
            <div class="vx-col w-full md:w-1/3 mt-10 mb-10">
            <div class="w-full pb-5">
                
                
                        <label class="mt-10">device type</label>
                       <vs-select 
                            :warning="errors.has('device_type')"
                            :warning-text="$t('device type id is required')"
                            val-icon-warning="warning"
                            v-validate="'required'"
                            name="device_type"
                            class="w-full" v-model="editObj.device_type_id"
                            >
                          <vs-select-item
                            :value="item.device_type_id"
                            :text="item.device_type_name"
                            :key="index"
                            v-for="(item,index) of device_types"
                          />
                      </vs-select>
            </div>
            <label class="mt-10" for>{{ $t("device_icon") }}</label>
            <div class="con-upload" v-if="editObj.device_icon == '' || editObj.device_icon == null">
              <!---->
              <div class="con-img-upload">
                <div class="con-input-upload">
                  <input type="file" @change="previewFiles" ref="myFiles" />
                  <span class="text-input">upload device icon</span>
                  <span class="input-progress" style="width: 0%;"></span>
                  <button
                    disabled="disabled"
                    type="button"
                    title="Upload"
                    class="btn-upload-all vs-upload--button-upload"
                  >
                    <i translate="translate" class="material-icons notranslate">cloud_upload</i>
                  </button>
                </div>
              </div>
            </div>
            <div class="con-upload" v-if="editObj.device_icon != '' && editObj.device_icon != null">
              <div class="con-img-upload">
                <div class="img-upload">
                  <button class="btn-x-file" @click="editObj.device_icon=''">
                    <i translate="translate" class="material-icons notranslate">clear</i>
                  </button>
                  <button class="btn-upload-file">
                    <i translate="translate" class="material-icons notranslate">cloud_upload</i>
                    <span>%</span>
                  </button>
                  <img :src="editObj.device_icon" style="max-width: none; max-height: 100%;" />
                  <!---->
                </div>
                <div class="con-input-upload disabled-upload">
                  <input type="file" accept="image/*" disabled="disabled" />
                  <span class="text-input">upload profile picture</span>
                  <span class="input-progress" style="width: 0%;"></span>
                  <button
                    type="button"
                    title="Upload"
                    class="btn-upload-all vs-upload--button-upload"
                  >
                    <i translate="translate" class="material-icons notranslate">cloud_upload</i>
                  </button>
                </div>
              </div>
            </div>
            <div class="mt-10">
                <h5>Anchor (value 0-1)</h5>
                <div class="vx-row">
                  <div class="w-1/2 pl-5 pr-5">
                     <vs-input
                        :warning="errors.has('anchor_x')"
                        :warning-text="$t(errors.first('anchor_x'))"
                        :label-placeholder="$t('anchor x')"
                        val-icon-warning="warning"
                        v-validate="'required|between:0,1'"
                        name="anchor_x"
                        v-model="editObj.anchor_x"
                        class="w-full"
                        />
                  </div>
                  <div class="w-1/2 pl-5 pr-5">
                     <vs-input
                        :warning="errors.has('anchor_y')"
                        :warning-text="$t(errors.first('anchor_y'))"
                        :label-placeholder="$t('anchor y')"
                        val-icon-warning="warning"
                        v-validate="'required|between:0,1'"
                        name="anchor_y"
                        v-model="editObj.anchor_y"
                        class="w-full"
                        />
                  </div>
                  <div class="w-1/2 pl-5 pr-5">
                        <label class="mt-10">size</label>
                       <vs-select 
                            :warning="errors.has('size')"
                            :warning-text="$t('size is required')"
                            val-icon-warning="warning"
                            v-validate="'required'"
                            name="size"
                            class="w-full" v-model="editObj.size"
                            >
                          <vs-select-item
                            :value="item"
                            :text="item"
                            :key="index"
                            v-for="(item,index) of sizes"
                          />
                      </vs-select>
                  </div>
                 
                
               
                </div>
            </div>
            <div class="mt-10">
                 <vs-button
                        ref="loadableButton"
                        id="button-with-loading"
                        class="vs-con-loading__container mr-5 ml-5"
                        vslor="primary"
                        @click="save()"
                    >{{ $t("save") }}</vs-button>
                     <vs-button
                       
                        color="danger"
                        type="border"
                        @click="popupActive = false"
                    >{{ $t("cancel") }}</vs-button>
                   
                </div>
          </div>
          <div class="vx-col w-full md:w-2/3 p-5 ">
            <vl-map v-if="rendermap" :load-tiles-while-animating="true"  ref="map" :load-tiles-while-interacting="true"
             data-projection="EPSG:4326" style="height: 700px"  @postcompose="onMapPostCompose" @click="choose_position">
                <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>



                <vl-layer-tile id="osm">
                    <vl-source-osm></vl-source-osm>
                </vl-layer-tile>
                <vl-layer-tile id="osm">
                    <vl-source-osm></vl-source-osm>
                </vl-layer-tile>

                <vl-feature id="marker" ref="marker" :properties="{ start: Date.now(), duration: 1000 }">
                    <template slot-scope="feature">
                    <vl-geom-point :coordinates="editObj.lat==''||editObj.lon==''?[0,0]:[parseFloat(editObj.lon),parseFloat(editObj.lat)]"></vl-geom-point>
                    <vl-style-box>
                        <vl-style-icon :src="editObj.device_icon==''?require('@/assets/flag.png'):editObj.device_icon" :scale="editObj.size?editObj.size:1" :anchor="editObj.anchor_x==''||editObj.anchor_y==''?[0.1, 0.95]:[editObj.anchor_x,editObj.anchor_y]" :size="[128, 128]"></vl-style-icon>
                    </vl-style-box>
                    <!-- overlay binded to feature -->
                    <vl-overlay v-if="feature.geometry" :position="pointOnSurface(feature.geometry)" :offset="[10, 10]">
                        
                    </vl-overlay>
                    </template>
                </vl-feature>

                    
                </vl-map>
          </div>
        </div>
        
      </vs-popup>
  </vx-card>
</template>

<script>
import EditUser from '../users/EditUser';
import service from '@/service/service';
import AddUser from '../users/AddUser';
import ChangePassword from '../users/ChangePassword';
import { createProj, addProj, findPointOnSurface, createStyle, createMultiPointGeom, loadingBBox } from 'vuelayers/lib/ol-ext'
const easeInOut = t => 1 - Math.pow(1 - t, 3)
export default {
  components:{
      EditUser,
      ChangePassword,
      AddUser
  },
  data() {
    return {
      submitted:false,
      popupActive:false,
      viewConfig:false,
      editObj:{
           lon:service.center[0],
            lat:service.center[1],
            size:1
      },
      showing_device:{},
      sizes:[],
      configs:[],
      rendermap:false,
      devices:[],
      src_img:"",
      device_types:[],
     
      change_password:false,
      roles:[],
      devices:[],
      addUserPopUp:false,
      title:"Add Device",
       zoom: 8,
        center: service.center ,
        marker_post:service.center,
        rotation: 0,
        geolocPosition: undefined,
      popupConfig:false,
    };
  },
  computed:{
    
   
  },
  async created(){
     this.getData();
     for(var i=1;i<=40;i++){
       this.sizes.push(i/10);
     }
  },
  methods:{
    edit(tr){
      this.editObj = {...tr};
      this.editObj.password='';
      this.title='Edit Device'
      this.popupActive = true;
      this.$nextTick(()=>{
        this.rendermap=true;
      })
    },
    async delete_device(tr){
      this.$swal({
                title: this.$t("Delete this device?"),
                type: "warning",
                showCancelButton: true,
                icon:'question',
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: this.$t("cancel"),
                confirmButtonText: this.$t("delete"),
                showLoaderOnConfirm: true,
                preConfirm: () => {
                return service
                    .postData("device/deleteDevice", { device_id: tr.device_id })
                    .then(result => {
                    return result;
                    });
                }
            }).then(result => {
                if (result.value) {
                if (result.value.code) {
                    this.$swal(this.$t("data was deleted"), "", "success").then(result => {
                    this.getData();
                    });
                } else {
                    this.$swal(result.value.message, "", "error");
                }
                }
            });
    },
    async save_config(){
      var obj={};
      this.configs.forEach((item)=>{
          obj[item.name]=item.value;
      })
      obj=JSON.stringify(obj);

      try{
        var configRespnse=await this.$service.postData('device/updateDeviceConfig',{device_id:this.showing_device.device_id,config:obj});
        if(configRespnse.code==1){
          
          this.viewConfig=false;
          await this.$swal('data was saved!','','success');

        }else{
          this.viewConfig=false;
          await this.$swal('',configRespnse.message,'error');
        }
      }catch(e){
        console.log(e);
      }
    },
    async getData(){
         try{
            var deviceResponse=await service.postData("device/getDevice",{});
            this.devices=deviceResponse.data;
            var device_typeResponse=await this.$service.postData('device-type/getDeviceType',{});
            this.device_types=device_typeResponse.data;
           
      }catch(e){
          console.log(e);
      }
    },
    async previewFiles(event) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.editObj.device_icon = reader.result;
      };
    },
    closepopup(){
        this.popupActive=false;
        this.addUserPopUp=false;
        this.getData();
    }
    ,
    addDevice(){
        this.title="Add Device";
        this.editObj={
           device_id:"",
           device_name:"",
           device_icon:"",
           device_type_id:"",
            lon:service.center[0],
            lat:service.center[1],
            anchor_x:0.1,
            anchor_y:0.95,
            size:1
        }
        this.$nextTick(()=>{
            this.rendermap=true;
        })
        this.popupActive=true;

    },
    choose_position(e){
        this.editObj.lon=e.coordinate[0];
        this.editObj.lat=e.coordinate[1];
    },
    save(){
        this.$validator.validateAll().then(async result => {
            if(result){
                var url="";
                if(this.editObj.device_id==""){
                    var result=await this.$service.postData('device/addDevice',this.editObj);
                }else{
                    var result=await this.$service.postData('device/updateDevice',this.editObj);
                }
                
                if(result.code==1){
                        this.$swal(this.$t('data was saved!!'),'','success');
                    }  else{
                        this.$vs.notify({
                            title:'Danger',
                            text:result.message,
                            color:'success'
                        })
                    }   
                this.popupActive=false;
                this.getData();
            }
        });
        
        },
        async addConfig(tr){
          this.viewConfig=true;
          this.showing_device=tr;
          try{
             var configResponse=await this.$service.postData('device/getDeviceConfig',{device_id:tr.device_id});
             if(configResponse.code==1){
               this.configs=configResponse.data;
               console.log(this.configs);
             }else{
               this.viewConfig=false;
               this.$swal('',configResponse.message,'error');
             }
          }catch(e){
            console.log(e);
          }
        },
        parseFloat:parseFloat,
        pointOnSurface: findPointOnSurface,
        onMapPostCompose ({ vectorContext, frameState }) {
            // document.querySelector('canvas').style.filter="invert(90%)"
            if (!this.$refs.marker || !this.$refs.marker.$feature) return

            const feature = this.$refs.marker.$feature
            if (!feature.getGeometry() || !feature.getStyle()) return

            const flashGeom = feature.getGeometry().clone()
            const duration = feature.get('duration')
            const elapsed = frameState.time - feature.get('start')
            const elapsedRatio = elapsed / duration
            const radius = easeInOut(elapsedRatio) * 35 + 5
            const opacity = easeInOut(1 - elapsedRatio)
            const fillOpacity = easeInOut(0.5 - elapsedRatio)

            vectorContext.setStyle(createStyle({
                imageRadius: radius,
                fillColor: [119, 170, 203, fillOpacity],
                strokeColor: [119, 170, 203, opacity],
                strokeWidth: 2 + opacity,
            }))

            vectorContext.drawGeometry(flashGeom)
            vectorContext.setStyle(feature.getStyle()(feature)[0])
            vectorContext.drawGeometry(feature.getGeometry())

            if (elapsed > duration) {
                feature.set('start', Date.now())
            }

       this.$refs.map.render()
    },
    }
}
</script>

<style>
</style>
<template>
    <div>
       <vx-card v-if="!show_field">
          <vs-button color="primary" @click="addDevicetype()">Add Device type</vs-button>
          <vs-table max-items="10" search pagination :data="device_types">
            <template slot="thead">
              <vs-th colspan="2">device type id</vs-th>
              <vs-th>device type name</vs-th>
              <vs-th>config field</vs-th>
              <vs-th>edit</vs-th>
              <vs-th>delete</vs-th>
            </template>

            <template slot-scope="{data}">
              <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                <vs-td colspan="2" :data="tr.device_type_id">{{ tr.device_type_id }}</vs-td>

                <vs-td :data="tr.device_type_name">{{ tr.device_type_name }}</vs-td>
              
                <vs-td > 
                  <feather-icon
                    icon="EditIcon"
                    class="cursor-pointer w-6 h-6 text-warning"
                    size="small"
                    @click="show(tr)"
                  ></feather-icon>
                </vs-td>
                <vs-td > 
                  <feather-icon
                    icon="EditIcon"
                    class="cursor-pointer w-6 h-6 text-warning"
                    size="small"
                    @click="edit(tr)"
                  ></feather-icon>
                </vs-td>
                <vs-td>
                  <feather-icon
                    icon="Trash2Icon"
                    class="cursor-pointer w-6 h-6 text-danger"
                    size="small"
                    @click="delete_device_type(tr.device_type_id)"
                  ></feather-icon>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
          <vs-popup class="holamundo" :title="title" :active.sync="popupActive">
              
              <vs-input
                      :warning="errors.has('device_type_name')"
                      :warning-text="$t('device type name is required')"
                      :label-placeholder="$t('device type name')"
                      val-icon-warning="warning"
                      v-validate="'required'"
                      name="device_type_name"
                      v-model="editObj.device_type_name"
                      class="w-full mt-10"
                      icon-pack="feather"
                      icon="icon-user"
                      icon-no-border
                      />
              
              <div class="vx-col md:w-full mt-5">
                <vs-button
                  ref="loadableButton"
                  id="button-with-loading"
                  class="vs-con-loading__container mr-5"
                  vslor="primary"
                  @click="save()"
                >{{ $t("save") }}</vs-button>
                <vs-button
                  color="danger"
                  type="border"
                  @click="popupActive = false"
                >{{ $t("cancel") }}</vs-button>
              
              </div>
            </vs-popup>
        </vx-card>
        <vx-card v-if="show_field">
            <config-field :field_editing='field_editing'/>
        </vx-card>
    </div>
</template>

<script>
import EditUser from '../users/EditUser';
import service from '@/service/service';
import AddUser from '../users/AddUser';
import ChangePassword from '../users/ChangePassword';
import vSelect from 'vue-select';
import DeviceTypeConfigField from './DeviceTypeConfigField'

export default {
  components:{
      'v-select':vSelect,
      'config-field':DeviceTypeConfigField
  },
  data() {
    return {
      submitted:false,
      popupActive:false,
      editObj:{},
      device_types:[],
      src_img:"",
      show_field:false,
      change_password:false,
      roles:[],
      field_editing:{},
      addUserPopUp:false,
      title:"Add Device type",
      field_edting_row:{},
    };
  },
  computed:{
     
  },
  async created(){
     this.getData();
      
  },
  methods:{
    async getData(){
         try{
            var device_typeResponse=await service.postData("device-type/getDeviceType",{});
            this.device_types=device_typeResponse.data;
           
      }catch(e){
          console.log(e);
      }
    },
    async edit(tr){
           this.editObj = {...tr};
           this.title='Edit Device type';
           
           this.popupActive = true;
    },
    async previewFiles(event) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.editObj.device_type_icon = reader.result;
      };
    },
    closepopup(){
        this.popupActive=false;
        this.addUserPopUp=false;
        this.getData();
    }
    ,
    delete_device_type(device_type_id){
        this.$swal({
                title: this.$t("Delete this device type?"),
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
                    .postData("device-type/deleteDeviceType", { device_type_id: device_type_id })
                    .then(result => {
                    return result;
                    });
                }
            }).then(result => {
                if (result.value) {
                if (result.value.code==1) {
                    this.$swal(this.$t("data was deleted"), "", "success").then(result => {
                    this.getData();
                    });
                } else {
                    this.$swal(result.value.message, "", "error");
                }
                }
            });
    },
    show(tr){
      this.show_field=true;
      this.field_editing=tr;
    },
    addDevicetype(){
        this.title="Add Devicetype";
        this.editObj={
            device_type_id:"",
           device_type_name:"",
           
        };
        this.selected=[];
        this.popupActive=true;
    },

    save(){
        console.log(111111);
        this.$validator.validateAll().then(async result => {
            if(result){
                var url="";
                if(this.editObj.device_type_id==""){
                    var result=await this.$service.postData('device-type/addDeviceType',this.editObj);
                }else{
                    var result=await this.$service.postData('device-type/updateDeviceType',this.editObj);
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
}
}
</script>

<style lang="scss">
    .select input{
           padding:0.5rem 1rem 0.5rem 3rem;
           background:#10163a;
       }
</style>
<template>
    <div class="w-full">
        <vs-button color="primary" @click="addDeviceConfig()">Add Device Type Config</vs-button>
          <vs-table max-items="10" search pagination :data="device_type_configs">
            <template slot="thead">
              <vs-th colspan="2">field ID</vs-th>
              <vs-th>field name</vs-th>
              <vs-th>edit</vs-th>
              <vs-th>delete</vs-th>
            </template>

            <template slot-scope="{data}">
              <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                <vs-td colspan="2" :data="tr.config_id">{{ tr.config_id }}</vs-td>

                <vs-td :data="tr.field_name">{{ tr.field_name }}</vs-td>
              
               
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
          <vs-popup class="holamundo" :title="title" :active.sync="configPopUp">
              
              <div class="w-full">
                <vs-input
                  :warning="errors.has('field_name')"
                  :warning-text="$t('field name is required')"
                  :label-placeholder="$t('field name')"
                  val-icon-warning="warning"
                  v-validate="'required'"
                  name="field_name"
                  v-model="editObj.field_name"
                  class="w-full mt-10"
                  icon-pack="feather"
                  icon="icon-user"
                  icon-no-border
                />
              </div>
              
              <div class="vx-col md:w-full mt-5">
                <vs-button
                  class="mr-5"
                  color="primary"
                  @click.stop="save"
                >{{ $t("save") }}</vs-button>
                <vs-button
                  color="danger"
                  type="border"
                  @click.stop="configPopUp = false"
                >{{ $t("cancel") }}</vs-button>
              
              </div>
            </vs-popup>
    </div>
</template>

<script>
export default {
  props:{
    field_editing:{
      type:Object,
      required:true
    }
  },
  data(){
    return {
      configPopUp:false,
      title:'Add Field',
      device_type_configs:[],
      editObj:{},
    }
  },
  created(){
    this.initVal();
    this.getData();
  },
  methods:{
    initVal(){
      this.editObj={
        config_id:"",
        field_name:"",
        device_type_id:this.field_editing.device_type_id
      }
    },
    addDeviceConfig(){
      this.configPopUp=true;
    },
    do_save(){
       console.log('saved clicked')

    },
    async save(){
      var result=await this.$validator.validateAll();
      console.log(result);
       if(result){
               console.log(111);
                var url="";
                if(this.editObj.config_id==""){
                    var result=await this.$service.postData('device-type-config/addDeviceTypeConfig',this.editObj);
                }else{
                    var result=await this.$service.postData('device-type-config/updateDeviceTypeConfig',this.editObj);
                }
                this.configPopUp=false;
                
                if(result.code==1){
                        
                        this.$swal(this.$t('data was saved!!'),'','success');
                    }  else{
                        this.$vs.notify({
                            title:'Danger',
                            text:result.message,
                            color:'success'
                        })
                    }   
                  this.initVal();

                this.getData();
            }
    },
    async save_field(){
     
      this.$validator.validateAll().then(async result => {
          if(result){
             this.configPopUp=false;
            var url="";
            if(this.editObj.config_id==''){
              url="addDeviceTypeConfig";
            }else{
              url="updateDeviceTypeConfig";
            }
            console.log(this.editObj);
            var response = await this.$service.postData(`device-type-config/${url}`,this.editObj);
            if(response.code==1){
              this.$swal('data was saved','','success').then((result)=>{
                 this.getData();
                 this.initVal();
              });
             
            }else{
              this.$swal(response.message,'','error');
            }
          }else{
            console.log('invlid')
          }
      });
    
    },
    edit(tr){
      this.editObj={...tr};
      this.configPopUp=true;
    },
    async getData(){
      try{
        var configFieldResponse=await this.$service.postData("device-type-config/getDeviceTypeConfig",{device_type_id:this.field_editing.device_type_id});
        this.device_type_configs=configFieldResponse.data;
      }catch(e){
        console.log(e);
      }
    }
  },
  watch:{

  }
}
</script>

<style>

</style>
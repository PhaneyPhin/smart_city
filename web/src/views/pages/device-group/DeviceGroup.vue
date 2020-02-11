<template>
  <vx-card>
    <vs-button color="primary" @click="addDeviceGroup()">Add Device Group</vs-button>
    <vs-table max-items="10" search pagination :data="device_groups">
      <template slot="thead">
        <vs-th colspan="2">device group id</vs-th>
        <vs-th>device group name</vs-th>
       
        <vs-th>edit</vs-th>
        <vs-th>delete</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
          <vs-td colspan="2" :data="tr.device_group_id">{{ tr.device_group_id }}</vs-td>

          <vs-td :data="tr.device_group_name">{{ tr.device_group_name }}</vs-td>
        
         
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
              @click="delete_device_group(tr.device_group_id)"
            ></feather-icon>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
    <vs-popup class="holamundo" :title="title" :active.sync="popupActive">
        
        <vs-input
                :warning="errors.has('device_group_name')"
                :warning-text="$t('device group name is required')"
                :label-placeholder="$t('device group name')"
                val-icon-warning="warning"
                v-validate="'required'"
                name="device_group_name"
                v-model="editObj.device_group_name"
                class="w-full mt-10"
                icon-pack="feather"
                icon="icon-user"
                icon-no-border
                />
        <p class="mt-5">select device id </p>
           <p class="mt-2"> ** click in left box to inject device group</p>
           <p class="mt-2"> ** click in right box to remove item in group</p>
        <div class="vx-row">
          
        <div class="vx-col w-1/2">
           
          <div  class="border border-solid d-theme-border-grey-light " style="height:300px">
                    <div class="flex items-center app-search-container border border-l-0 border-r-0 border-t-0 border-solid d-theme-border-grey-light">
                        <vs-input size="large" icon-pack="feather" icon="icon-search" placeholder="Search..." v-model="searchQuery1" class="vs-input-no-border vs-input-no-shdow-focus no-icon-border w-full" />
                    </div>
                    <VuePerfectScrollbar class="todo-content-scroll-area" :settings="settings" ref="data_list">
                        <transition-group class="todo-list" name="list-enter-up" tag="ul" appear>
                            <li class="flex justify-between border d-theme-border-grey-light border-solid" v-for="(item,index) of show_options" @click="add_device(index)" :key="index" :style="[{transitionDelay: (index * 0.1) + 's'},{cursor:'pointer'}]">
                               <div @click="displayPrompt" class="px-4 py-4 list-item-component">
                                <div class="vx-row">
                                    <div class="vx-col w-full sm:w-5/6 flex sm:items-center sm:flex-row flex-col">
                                        <div class="flex items-center">
                                            <h6 class="todo-title" :class="{'line-through': isDone}">{{item}}</h6>
                                        </div>
                                       
                                    </div>

                                </div>
                              
                            </div>
                            </li>
                        </transition-group>
                    </VuePerfectScrollbar>
            </div>
           
          
        </div>
         <div class="vx-col w-1/2">
              <div  class="border border-solid d-theme-border-grey-light " style="height:300px">
                    <div class="flex items-center app-search-container border border-l-0 border-r-0 border-t-0 border-solid d-theme-border-grey-light">

                        <vs-input size="large" icon-pack="feather" icon="icon-search" placeholder="Search..." v-model="searchQuery2" class="vs-input-no-border vs-input-no-shdow-focus no-icon-border w-full" />
                    </div>

                   
                    <VuePerfectScrollbar class="todo-content-scroll-area" :settings="settings" ref="data_list">
                        <transition-group class="todo-list" name="list-enter-up" tag="ul" appear>
                            <li class="flex justify-between border d-theme-border-grey-light border-solid" v-for="(item,index) of show_selected"  @click="remove(index)" :key="index" :style="[{transitionDelay: (index * 0.1) + 's'},{cursor:'pointer'}]">
                               <div @click="displayPrompt" class="px-4 py-4 list-item-component">
                                <div class="vx-row">
                                    <div class="vx-col w-full sm:w-5/6 flex sm:items-center sm:flex-row flex-col">
                                        <div class="flex items-center">
                                            <h6 class="todo-title" :class="{'line-through': isDone}">{{item}}</h6>
                                        </div>
                                       
                                    </div>

                                </div>
                              
                            </div>
                            </li>
                        </transition-group>
                    </VuePerfectScrollbar>
            </div>
            </div>
        </div>
        <div class="vx-col md:w-full mt-5">
         
          <vs-button
            class="right"
            color="danger"
            type="border"
            @click="popupActive = false"
          >{{ $t("cancel") }}</vs-button>
          <vs-button
            ref="loadableButton"
            id="button-with-loading"
            class="vs-con-loading__container right"
            vslor="primary"
            @click="save()"
          >{{ $t("save") }}</vs-button>
        </div>
      </vs-popup>
  </vx-card>
</template>

<script>
import EditUser from '../users/EditUser';
import service from '@/service/service';
import AddUser from '../users/AddUser';
import ChangePassword from '../users/ChangePassword';
import vSelect from 'vue-select';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';

export default {
  components:{
      'v-select':vSelect,
      VuePerfectScrollbar
  },
  
  data() {
    return {
      isDone:false,
      submitted:false,
      popupActive:false,
      searchQuery1:"",
      searchQuery2:"",
      editObj:{},
      device_groups:[],
      src_img:"",
      change_password:false,
      roles:[],
      addUserPopUp:false,
      title:"Add Device Group",
      
      options: [],
      selected:[],
      settings: {
                height:200,
                maxScrollbarLength: 3,
                wheelSpeed: 0.30,
            },
    };
  },
  computed:{
     show_selected(){
       return this.selected.filter((item)=>item.indexOf(this.searchQuery2)>-1);
     },
     show_options(){
       return this.options.filter((item)=>item.indexOf(this.searchQuery1)>-1);
     },
     b() {
      var require = type => this.submitted && this.editObj[type] == "";
      return {
        first_name: require("first_name"),
        last_name: require("last_name"),
        email: require("email"),
        username: require("username"),
        role:require("role_id"),
        password:
          (!this.popupActive || this.change_password) && require("password"),
        confirm_password:
          this.submitted &&
          this.editObj.password != this.editObj.confirm_password,
        role: require("role"),
        old_password: this.change_password && require("old_password")
      }
    }
  },
  async created(){
     this.getData();
      
  },
  methods:{
    add_device(index){
    this.selected.push(this.options.splice(index,1)[0]);
  },
  remove(index){
    this.options.push(this.selected.splice(index,1)[0]);

  },
    displayPrompt(){

    },
    async getData(){
         try{
            var device_groupResponse=await service.postData("device-group/getDeviceGroup",{});
            this.device_groups=device_groupResponse.data;
            var deviceResponse=await this.$service.postData("device/getDeviceNoGroup",{});
            this.options=deviceResponse.data.map((item)=>item.device_id);
           
      }catch(e){
          console.log(e);
      }
    },
    async edit(tr){
           this.editObj = {...tr};
           this.title='Edit Device Group';
           var device=await this.$service.postData('device/getDeviceOfGroup',{device_group_id:tr.device_group_id});
            if(device.code==1){
                var selected=device.data.map((item)=>item.device_id)
                //  this.options=[...this.options,...selected];
                this.selected=[...selected];
                // this.editObj.selected= ['foo','bar']
               
            }
           this.popupActive = true;
    },
    async previewFiles(event) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.editObj.device_group_icon = reader.result;
      };
    },
    closepopup(){
        this.popupActive=false;
        this.addUserPopUp=false;
        this.getData();
    }
    ,
    delete_device_group(device_group_id){
        this.$swal({
                title: this.$t("Delete this device group?"),
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
                    .postData("device-group/deleteDeviceGroup", { device_group_id: device_group_id })
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
    addDeviceGroup(){
        this.title="Add DeviceGroup";
        this.editObj={
            device_group_id:"",
           device_group_name:"",
           
        };
        this.selected=[];
        this.popupActive=true;
    },

    save(){
        this.$validator.validateAll().then(async result => {
            if(result){
                var url="";
                if(this.editObj.device_group_id==""){
                    var result=await this.$service.postData('device-group/addDeviceGroup',{...this.editObj,selected:this.selected});
                }else{
                    var result=await this.$service.postData('device-group/updateDeviceGroup',{...this.editObj,selected:this.selected});
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
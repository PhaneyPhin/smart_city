<template>
  <vx-card>
    <vs-button color="primary" @click="addUser()">Add User</vs-button>
    <vs-table max-items="10" search pagination :data="users">
      <template slot="thead">
        <vs-th>username</vs-th>
        <vs-th>email</vs-th>
        <vs-th>name-surname</vs-th>
        <vs-th>tel</vs-th>
        <vs-th>edit</vs-th>
        <vs-th>delete</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="tr.username">{{ tr.username }}</vs-td>

          <vs-td :data="tr.email">{{ tr.email }}</vs-td>
          <vs-td :data="tr.first_name+' '+tr.last_name">{{ tr.first_name+' '+tr.last_name }}</vs-td>

          <vs-td :data="tr.tel">{{ tr.tel }}</vs-td>

          <vs-td>
            <feather-icon
              icon="EditIcon"
              class="cursor-pointer w-6 h-6 text-warning"
              size="small"
              @click="
                        editObj = {...tr};
                        editObj.password='';
                        title='Edit User'
                        popupActive = true;
                      "
            ></feather-icon>
          </vs-td>
          <vs-td>
            <feather-icon
              icon="Trash2Icon"
              class="cursor-pointer w-6 h-6 text-danger"
              size="small"
              @click="delete_user(tr)"
            ></feather-icon>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
    <vs-popup class="holamundo" :title="title" :active.sync="popupActive">
      <EditUser v-if="!change_password" @closepopup='closepopup' ref="editUserComponent" :editObj="editObj" :roles="roles"/>
    
       <ChangePassword :editObj='editObj' @closepopup='closepopup' ref="changepassword" v-if="change_password"/>
        <div class="vx-col md:w-full mt-5">
          <vs-button color="primary" @click="change_password = !change_password">
            {{
            change_password ? $t("edit user") : $t("change password")
            }}
          </vs-button>
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
      <vs-popup class="holamundo" :title="title" :active.sync="addUserPopUp">
        
        <AddUser ref="addUerComponent" @closepopup='closepopup' :editObj="editObj" :roles="roles"/>
        <div class="vx-col md:w-full mt-5">
         
          <vs-button
            class="right"
            color="danger"
            type="border"
            @click="addUserPopUp = false"
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
import EditUser from './EditUser';
import service from '@/service/service';
import AddUser from './AddUser';
import ChangePassword from './ChangePassword';
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
      editObj:{},
      users: [],
      src_img:"",
      change_password:false,
      roles:[],
      addUserPopUp:false,
      title:"Add User",
      invalid:{

      }
    };
  },
  computed:{
      a(){
          return 1;
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
    async getData(){
         try{
            var userResponse=await service.postData("users/getUser",{});
            this.users=userResponse.data;
            var roleResonse=await service.postData("users/getRole",{});
            this.roles=roleResonse.data;
      }catch(e){
          console.log(e);
      }
    },
    async previewFiles(event) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.editObj.icon_image = reader.result;
      };
    },
    closepopup(){
        this.popupActive=false;
        this.addUserPopUp=false;
        this.getData();
    }
    ,
    addUser(){
        this.title="Add User";
        this.editObj={
            username:"",
            email:"",
            first_name:"",
            last_name:"",
            role_id:"",
            icon_image:"",
            tel:"",
            admin:"",
            password:"",


        }
        this.addUserPopUp=true;
    },
    save(){
       if(this.popupActive){
           if(this.change_password){
               this.$refs.changepassword.save();
           }else{
               this.$refs.editUserComponent.save();
           }
       }else{
           this.$refs.addUerComponent.save();

       }
  },
}
}
</script>

<style>
</style>
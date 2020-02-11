<template>
  <div>
      <vs-input
                :warning="errors.has('first_name')"
                :warning-text="$t('first name is required')"
                :label-placeholder="$t('first name')"
                val-icon-warning="warning"
                v-validate="'required'"
                name="first_name"
                v-model="editObj.first_name"
                class="w-full mt-10"
                icon-pack="feather"
                icon="icon-user"
                icon-no-border
                />
            <vs-input
                :warning="errors.has('last_name')"
                :warning-text="$t('last name is required')"
                :label-placeholder="$t('last name')"
                val-icon-warning="warning"
                v-validate="'required'"
                name="last_name"
                v-model="editObj.last_name"
                class="w-full mt-10"
                icon-pack="feather"
                icon="icon-user"
                icon-no-border
                />
         <vs-input
                :warning="errors.has('email')"
                :warning-text="$t('email is required')"
                :label-placeholder="$t('email')"
                val-icon-warning="warning"
                v-validate="'required'"
                name="email"
                v-model="editObj.email"
                class="w-full mt-10"
                icon-pack="feather"
                icon="icon-user"
                icon-no-border
                />
        <vs-input
                :warning="errors.has('tel')"
                :warning-text="$t(errors.first('tel'))"
                :label-placeholder="$t('tel')"
                val-icon-warning="warning"
                v-validate="'required|numeric'"
                name="tel"
                v-model="editObj.tel"
                class="w-full mt-10"
                icon-pack="feather"
                icon="icon-user"
                icon-no-border
                />
        <vs-input
                :warning="errors.has('username')"
                :warning-text="$t('username is required')"
                :label-placeholder="$t('username')"
                val-icon-warning="warning"
                v-validate="'required'"
                name="username"
                v-model="editObj.username"
                class="w-full mt-5"
                icon-pack="feather"
                icon="icon-user"
                disabled="true"
                icon-no-border
                />
            <label class="mt-10">{{$t('role')}}</label>
            <vs-select 
                :warning="errors.has('role_id')"
                :warning-text="$t('role is required')"
                val-icon-warning="warning"
                v-validate="'required'"
                name="role_id"
                class="w-full" v-model="editObj.role_id"
                >
              <vs-select-item
                :key="index"
                :value="item.role_id+''"
                :text="$t(item.role_name)"
                v-for="(item, index) in roles"
              />
            </vs-select>
    
          <div class="vx-col md:w-full">
            <label for>{{ $t("profile picture") }}</label>
            <div class="con-upload" v-if="editObj.icon_image == '' || editObj.icon_image == null">
              <!---->
              <div class="con-img-upload">
                <div class="con-input-upload">
                  <input type="file" @change="previewFiles" ref="myFiles" />
                  <span class="text-input">Upload Profile Picture</span>
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
            <div class="con-upload" v-if="editObj.icon_image != '' && editObj.icon_image != null">
              <div class="con-img-upload">
                <div class="img-upload">
                  <button class="btn-x-file" @click="editObj.icon_image=''">
                    <i translate="translate" class="material-icons notranslate">clear</i>
                  </button>
                  <button class="btn-upload-file">
                    <i translate="translate" class="material-icons notranslate">cloud_upload</i>
                    <span>%</span>
                  </button>
                  <img :src="editObj.icon_image" style="max-width: none; max-height: 100%;" />
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
          </div>
  </div>
</template>

<script>
export default {
    props:{
        editObj:{
            type:Object,
            required:true
        },
        roles:{
            require:true
        },
        popupActive:{

        }
    },
    methods:{
        async previewFiles(event) {
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = () => {
                this.editObj.icon_image = reader.result;
            };
            },
        async save(){
            this.$validator.validateAll().then(async result => {
                console.log(result);
                if (result) {
                    var result=await this.$service.postData('users/updateUser',this.editObj);
                    console.log(result)
                    if(result.code==1){
                        this.$swal(this.$t('data was saved!!'),'','success');
                    }else{
                        this.$vs.notify({
                            title:'Success',
                            text:result.message,
                            color:'success'
                        })
                    }
                    this.$emit('closepopup');
                } else {
                // form have errors
                }
            });
        }
    },
    mounted(){
              
    }
}
</script>

<style>

</style>
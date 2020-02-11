<template>
  <div>
      <vs-input
                :warning="errors.has('password')"
                :warning-text="$t(errors.first('password'))"
                :label-placeholder="$t('password')"
                val-icon-warning="warning"
                v-validate="'required|min:6|max:10'"
                name="password"
                v-model="editObj.password"
                class="w-full mt-10"
                icon-pack="feather"
                icon="icon-user"
                icon-no-border
                type="password"
                />
            <vs-input
                :warning="errors.has('confirm_password')"
                :warning-text="$t(errors.first('confirm_password'))"
                :label-placeholder="$t('confirm password')"
                val-icon-warning="warning"
                v-validate="'required|min:6|max:10|confirmed:password'"
                name="confirm_password"
                v-model="editObj.confirm_password"
                class="w-full mt-10"
                icon-pack="feather"
                icon="icon-user"
                icon-no-border
                type="password"
                />
  </div>
</template>

<script>
export default {
    props:{
        editObj:{
            required:true
        },
        popupActive:{

        }
    },
    methods:{
        save(){
            this.$validator.validateAll().then(async result => {
                console.log(result);
                if (result) {
                    const {username,password}=this.editObj;
                    var result=await this.$service.postData('users/changePassword',{username,password});
                    if(result.code==1){
                        this.$swal(this.$t('data was saved!!'),'','success');
                    }  else{
                        this.$vs.notify({
                            title:'Danger',
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
    }
}
</script>

<style>

</style>
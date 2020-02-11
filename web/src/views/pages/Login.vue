<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login">
        <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
            <vx-card>
                <div slot="no-body" class="full-page-bg-color">
                    <div class="vx-row no-gutter justify-center items-center">
                        <div class="vx-col hidden lg:block lg:w-1/2">
                            <img src="@/assets/images/pages/login.png" alt="login" class="mx-auto">
                        </div>
                        <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
                            <div class="p-8">
                                <div class="vx-card__title mb-8">
                                    <h4 class="mb-4">Login</h4>
                                    <p>Welcome back, please login to your account.</p>
                                </div>
                                <vs-input
                                    v-validate="'required'"
                                    data-vv-validate-on="blur"
                                    name="email"
                                    icon="icon icon-user"
                                    icon-pack="feather"
                                    label-placeholder="username"
                                    v-model="username"
                                    class="w-full no-icon-border"/>
                                <span class="text-danger text-sm">{{ errors.first('username') }}</span>

                                <vs-input
                                    data-vv-validate-on="blur"
                                    v-validate="'required|min:6|max:10'"
                                    type="password"
                                    name="password"
                                    icon="icon icon-lock"
                                    icon-pack="feather"
                                    label-placeholder="Password"
                                    v-model="password"
                                    class="w-full mt-6 no-icon-border" />
                                <span class="text-danger text-sm">{{ errors.first('password') }}</span>

                               
                                <vs-button class="float-right mb-20 mt-5" id='button-with-loading' :disabled="!validateForm" @click="login">Login</vs-button>


                               
                            </div>
                        </div>
                    </div>
                </div>
            </vx-card>
        </div>
    </div>
</template>

<script>

import service from '@/service/service';

export default {
    data() {
        return {
            username: 'demo@demo.com',
            password: 'demodemo',
            checkbox_remember_me: false
        }
    },
    computed: {
        validateForm() {
            return !this.errors.any() && this.username != '' && this.password != '';
        },
    },
    methods: {
        async login() {
            this.$vs.loading({
                background: this.backgroundLoading,
                color: this.colorLoading,
                container: "#button-with-loading",
                scale: 0.45
            });
            try {
                console.log(result);
                var result = await service.postData("auth/login", {
                username: this.username,
                password: this.password
                });
                service.setToken(result.token);

               if(result.code==1){
                    var { role_name, first_name, last_name } = service.getUser().user;
                    this.$store.dispatch("updateUserRole", role_name);
                    this.$acl.change(role_name);
                    // this.$store.dispatch("setProfile", result.img_profile);
                    // this.$store.dispatch(
                    // "setDisplayUsername",
                    // first_name + " " + last_name
                    // );
                    this.$router.push("/dashboard/analytics");

                    this.$vs.loading.close("#button-with-loading > .con-vs-loading");
               }else{
                    await this.$swal(this.$t("Login failed"), this.$t(result.message), "error");
               }
            } catch (e) {
                await this.$swal(this.$t("Login failed"), this.$t(e.message), "error");
            }
            this.$vs.loading.close("#button-with-loading > .con-vs-loading");
        },

        loginAuth0() {
            if (this.$store.state.auth.isUserLoggedIn()) {
                this.notifyAlreadyLogedIn();
                return false
            }
            this.$auth.login({ target: this.$route.query.to });
        },

        // Google login
        loginWithGoogle() {
            this.$store.dispatch('auth/loginWithGoogle', {notify: this.$vs.notify})
        },

        // Facebook login
        loginWithFacebook() {
            this.$store.dispatch('auth/loginWithFacebook', {notify: this.$vs.notify})
        },

        // Twitter login
        loginWithTwitter() {
            this.$store.dispatch('auth/loginWithTwitter', {notify: this.$vs.notify})
        },

        // Github login
        loginWithGithub() {
            this.$store.dispatch('auth/loginWithGithub', {notify: this.$vs.notify})
        },

        notifyAlreadyLogedIn() {
            this.$vs.notify({
                title: 'Login Attempt',
                text: 'You are already logged in!',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'warning'
            });
        },
        registerUser() {
            if(this.$store.state.auth.isUserLoggedIn()) {
                this.notifyAlreadyLogedIn();
                return false;
            }
            this.$router.push('/pages/register');
        }
    }
}
</script>

<style lang="scss">
#page-login {
    .social-login {
        .bg-facebook {
          background-color: #1551b1;
        }
        .bg-twitter {
          background-color: #00aaff;
        }
        .bg-google {
          background-color: #4285F4;
        }
        .bg-github {
          background-color: #333;
        }
    }
}
</style>

import Vue from 'vue'
import { AclInstaller, AclCreate, AclRule } from 'vue-acl'
import router from '@/router'

Vue.use(AclInstaller)

let initialRole = 'admin'
if(localStorage.getItem('userRole')) initialRole = localStorage.getItem('userRole')

export default new AclCreate({
  initial: initialRole,
  notfound: '/pages/not-authorized',
  router,
  acceptLocalRules: true,
  globalRules: {
    superAdmin:new AclRule('super admin').generate(),
    admin: new AclRule('admin').or('super admin').generate(),
    editor: new AclRule('editor').or('admin').or('super admin').generate(),

    // public: new AclRule('public').or('admin').or('editor').generate(),
  }
})

import Vue from 'vue'
import router from '../router'
import msal from 'vue-msal'
import VueRouterUserRoles from 'vue-router-user-roles'

debugger
// export default ({ router, Vue }) => {
// const { tenantId, clientId, redirectUri, postLogoutRedirectUri } = process.env
//Local
const tenantId ='f24b9999-9a5b-4788-a901-f9a2c0a56b0e'            
const clientId = '4f25c782-518c-4884-842d-9b970f94efd6'          

//Production
// const tenantId ='f24b9999-9a5b-4788-a901-f9a2c0a56b0e'             //'f24b9999-9a5b-4788-a901-f9a2c0a56b0e'
// const clientId = '587b7f98-ed39-4b4e-aaf1-5b3754913f0a'            //'587b7f98-ed39-4b4e-aaf1-5b3754913f0a'

//Local
const redirectUri = 'http://localhost:8082/'
const postLogoutRedirectUri = 'http://localhost:8082/login'

//Production
// const redirectUri = 'https://speedhrm.com/'
// const postLogoutRedirectUri = 'https://speedhrm.com/login'
Vue.use(VueRouterUserRoles, { router })
Vue.prototype.$user.set({ role: 'guest' })
Vue.use(msal, {
  auth: {
    clientId,
    tenantId,
    redirectUri,
    postLogoutRedirectUri,
    autoRefreshToken: true
  },
  request: {
    scope: ['api.read']
  },
  framework: {
    globalMixin: true
  }

  // acquireToken: {scopes: ["user.read"]}
})
// }

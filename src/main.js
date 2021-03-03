import Vue from "vue";
import "./plugins/axios";
// import App from '../src/modules/shared/components/layout.vue'
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import store from "./store/store";
import router from "./router";
import VueCryptojs from "vue-cryptojs";
import VuetifyConfirm from "vuetify-confirm";
import DatetimePicker from "vuetify-datetime-picker";
import Permissions from "./constants/Permissions";
import "@/plugins/msal";
import moment from "moment";
import vuescroll from "vue-scroll";
// vue toggle Button
import ToggleButton from "vue-js-toggle-button";
Vue.use(ToggleButton);

// Bootstrap

// Material Icons
import "material-design-icons-iconfont/dist/material-design-icons.css";
// Vue-Toastification
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
// import CustomFilters from "@/mixins/Filters";

const options = {
  // pauseOnHover: true,
  timeout: 4000,
  hideCloseButton: false,
};
Vue.use(Toast, options);
Vue.use(vuescroll, { debounce: 600 });
/*======================== Common components ======================== */
// Breadcrumb
import Breadcrumbs from "@/components/base/Breadcrumbs";

Vue.component("Breadcrumbs", Breadcrumbs);
// Page title
import PageTitle from "@/components/shared/PageTitle";

Vue.component("PageTitle", PageTitle);
// Table header filter
import TableHeaderFilter from "@/components/base/Table/TableHeaderFilter";

Vue.component("TableHeaderFilter", TableHeaderFilter);
//LOADING
import LoadingComponent from "@/components/base/LoadingComponent";

Vue.component("LoadingComponent", LoadingComponent);
import ListMenu from "./modules/shared/components/ListMenu";

Vue.component("ListMenu", ListMenu);
//Permission
import PermissionControl from "@/components/base/PermissionControl";

Vue.component("permission-control", PermissionControl);
/*======================== Common components ======================== */
import VueClipboard from "vue-clipboard2";

Vue.use(VueClipboard);

import CopyTableCell from "@/components/base/CopyTableCell";

Vue.component("CopyTableCell", CopyTableCell);

import LinerLoadingBar from "@/components/shared/LinerLoadingBar";

Vue.component("LinerLoadingBar", LinerLoadingBar);

import Barcode from "./modules/shared/components/Barcode";

Vue.component("Barcode", Barcode);

import ImportExportMenu from "./components/shared/ImportExportMenu";

Vue.component("ImportExportMenu", ImportExportMenu);

import Cancelbutton from "./components/shared/CancelButton";

Vue.component("btn-cancel", Cancelbutton);

import VueMask from "v-mask";
Vue.use(VueMask);

import money from "v-money";

Vue.use(money, { precision: 4 });

import VueBarcodeScanner from "vue-barcode-scanner";

Vue.use(VueBarcodeScanner);

import CustomModal from "@/components/base/CustomModal";

Vue.component("custom-modal", CustomModal);
// import VueBarcode from 'vue-barcode';

import Toasted from "vue-toasted";
import "./utils/filters";
Vue.use(Toasted);
Vue.use(DatetimePicker);
Vue.use(VueCryptojs);
Vue.config.productionTip = false;
import Vuelidate from "vuelidate";
import Print from "vue-print-nb";
Vue.use(Print);

import WebCam from "vue-web-cam";
Vue.use(WebCam);

Vue.use(Vuelidate);

Vue.use(VuetifyConfirm, {
  vuetify,
  buttonTrueText: "Accept",
  buttonFalseText: "Discard",
  width: 350,
  property: "$confirm",
  color: "black",
});
Vue.prototype.$permissions = Permissions;
Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY");
  }
});
import "@/utils/filters";
import "@/plugins/vuelidate";

// Vue.mixin(CustomFilters)
const app = new Vue({
  data: {
    loading: false,
  },
  vuetify,
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");

router.beforeEach((to, from, next) => {
  app.loading = true;
  next();
});

router.afterEach(() => {
  // setTimeout(() => (app.loading = false), 1000); // timeout for demo purposes
  app.loading = false;
});

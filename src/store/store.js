/*=========================================================================================
  File Name: store.js
  Description: Vuex store
----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
// Persister state
import createPersistedState from "vuex-persistedstate";

import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

// Modules
import auth from "./modules/auth/moduleAuth";
import customer from "./modules/customer/moduleCustomer.js";
import product from "./modules/products/moduleProduct.js";
import stock from "./modules/stock/moduleStock.js";
import purchase from "./modules/purchase/modulePurchase.js";
import purchaseOrder from "./modules/purchase-order/modulePurchaseOrder.js";
import purchaseReturn from "./modules/purchase-return/modulePurchaseReturn.js";
import supplier from "./modules/supplier/moduleSupplier.js";
import user from "./modules/user/moduleUser.js";
import warehouse from "./modules/warehouse/moduleWarehouse.js";
import brand from "./modules/brand/moduleBrand";
import Category from "../existing_store/shared/settings/pagination/store/productCategoryStore";
import Unit from './modules/unit/moduleUnitStore';
import discount from './modules/Discount/moduleDiscount';
import sales from "./modules/Sales/moduleSales.js";
import shop from "./modules/shop/moduleShop.js"
import chequeManagement from "./modules/cheque-management/moduleChequeManagement.js"
import report from "./modules/reports/moduleReport.js"
import common from "./modules/common/moduleCommon.js"
import sitesetting from "./modules/site-setting/moduleSiteseting";

export default new Vuex.Store({
  plugins: [createPersistedState()],
  getters,
  mutations,
  state,
  actions,
  modules: {
    auth, brand,
    customer,
    product,
    stock,common,
    purchase,
    purchaseOrder,
    purchaseReturn,
    supplier,
    user,
    warehouse,
    Category,
    Unit,
    discount,
    sitesetting,shop,
    sales,
    chequeManagement,
    report

  },
  // strict: process.env.NODE_ENV !== "production"
});

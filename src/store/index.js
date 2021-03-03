


import Vue from "vue";
import Vuex from "vuex";
import UserStore from "../modules/user/store/UserStore";
import LoginStore from "../modules/login/store/LoginStore";
import RoleStore from "../modules/role/store/RoleStore";
import PaginationStore from "../modules/shared/settings/pagination/store/paginationStroe";
import SupplierStore from "../modules/supplier/store/SupplierStore";
import ProductCategoryStore from "../modules/shared/settings/pagination/store/productCategoryStore";
import ProductBrandStore from "../modules/shared/settings/pagination/store/productBrandStore";
import ProductStore from "../modules/Product/store/productStore";
import CountryStore from "../modules/shared/settings/pagination/store/CountryStore";
import PurchaseOrder from "../modules/Purchase-Order/store/PurchaseOrderStore";
import WarehouseStore from "../modules/shared/settings/Warehouse/store/WarehouseStore";
import PurchaseStore from "../modules/Purchases/store/PurchaseStore";
import PurchaseReturnStore from '../modules/purchase_return/store/PurchaseReturnStore'
import Customerstore from '../modules/Customer/store/CustomerStore';
import AutocompleteStore from './modules/Shared/AutocompleteStore';
import POSSetting from '../modules/shared/settings/posSetting/store/possettingStore'


Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    // Master Data

    // for Purchase List
    invoiceStatusOptions: ["All", "paid"],
  },
  getters: {
    getInvoiceStatusOptions(state) {
      return state.invoiceStatusOptions;
    },
  },
  mutations: {},
  actions: {},
  modules: {
    UserStore,
    LoginStore,
    WarehouseStore,
    RoleStore,
    PaginationStore,
    PurchaseStore,
    SupplierStore,
    POSSetting,
    ProductCategoryStore,
    ProductBrandStore,
    ProductStore,
    CountryStore,
    PurchaseOrder,
    PurchaseReturnStore,

    AutocompleteStore,Customerstore
  },
});

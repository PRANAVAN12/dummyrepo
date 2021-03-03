/*=========================================================================================
  File Name: store.js
  Description: Vuex store
----------------------------------------------------------------------------------------
  Item Name: SPEED HRM
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
import staff from "./modules/staff/moduleStaff.js";
import user from "./modules/user/moduleUser.js";
import sitesetting from "./modules/site-setting/moduleSiteseting";
import common from "./modules/common/moduleCommon";
import event from "./modules/event/moduleEvent.js";
import system from "./modules/systemmanager/moduleSystemManager.js";

export default new Vuex.Store({
  plugins: [createPersistedState()],
  getters,
  mutations,
  state,
  actions,
  modules: {
    staff,
    user,
    sitesetting,
    common,
    event,system

  },
  // strict: process.env.NODE_ENV !== "production"
});

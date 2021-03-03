/*=========================================================================================
  File Name: moduleStock.js
  Description: Supplier Module
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

import state from "./moduleSupplierState.js";
import mutations from "./moduleSupplierMutations.js";
import actions from "./moduleSupplierActions.js";
import getters from "./moduleSupplierGetters.js";

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

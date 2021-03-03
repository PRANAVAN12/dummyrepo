/*=========================================================================================
  File Name: moduleWarehouse.js
  Description: Warehouse Module
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

import state from "./moduleWarehouseState.js";
import mutations from "./moduleWarehouseMutations.js";
import actions from "./moduleWarehouseActions.js";
import getters from "./moduleWarehouseGetters.js";

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

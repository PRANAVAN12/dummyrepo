/*=========================================================================================
  File Name: modulePurchaseOrder.js
  Description: Purchase Order Module
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

import state from "./modulePurchaseOrderState.js";
import mutations from "./modulePurchaseOrderMutations.js";
import actions from "./modulePurchaseOrderActions.js";
import getters from "./modulePurchaseOrderGetters.js";

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

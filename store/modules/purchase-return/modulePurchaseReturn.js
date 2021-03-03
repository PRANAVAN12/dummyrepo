/*=========================================================================================
  File Name: modulePurchaseReturn.js
  Description: Purchase Return Module
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

import state from "./modulePurchaseReturnState.js";
import mutations from "./modulePurchaseReturnMutations.js";
import actions from "./modulePurchaseReturnActions.js";
import getters from "./modulePurchaseReturnGetters.js";

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

/*=========================================================================================
  File Name: moduleChequeManagement.js
  Description: Purchase Order Module
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

import state from "./moduleChequeManagementState.js";
import mutations from "./moduleChequeManagementMutations.js";
import actions from "./moduleChequeManagementActions.js";
import getters from "./moduleChequeManagementGetters.js";

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

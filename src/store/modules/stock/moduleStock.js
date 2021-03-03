/*=========================================================================================
  File Name: moduleStock.js
  Description: Supplier Module
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

import state from "./moduleStockState.js";
import mutations from "./moduleStockMutations.js";
import actions from "./moduleStockActions.js";
import getters from "./moduleStockGetters.js";

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

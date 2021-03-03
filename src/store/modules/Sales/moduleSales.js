/*=========================================================================================
  File Name: moduleSales.js
  Description: Supplier Module
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

import state from "./moduleSalesState.js";
import mutations from "./moduleSalesMutations.js";
import actions from "./moduleSalesActions.js";
import getters from "./moduleSalesGetters.js";

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

/*=========================================================================================
  File Name: moduleUnit.js
  Description: Units Module
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

import state from "./moduleUnitState.js";
import mutations from "./moduleUnitMutations.js";
import actions from "./modyleUnitActions.js";
import getters from "./moduleUnitsGetters.js";

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

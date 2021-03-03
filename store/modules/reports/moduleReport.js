/*=========================================================================================
  File Name: moduleReport.js
  Description: Report Module
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

import state from "./moduleReportState.js";
import mutations from "./moduleReportMutations.js";
import actions from "./moduleReportActions.js";
import getters from "./moduleReportGetters.js";

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

/*=========================================================================================
  File Name: moduleStaff.js
  Description: Staff Module
  ----------------------------------------------------------------------------------------
  Item Name: Speed HRM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

import state from './moduleStaffState'
import mutations from './moduleStaffMutations.js'
import actions from './moduleStaffActions.js'
import getters from './moduleStaffGetters.js'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
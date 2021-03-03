/*=========================================================================================
  File Name: moduleStaff.js
  Description: Staff Module
  ----------------------------------------------------------------------------------------
  Item Name: Speed HRM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

import state from './moduleSystemManagerState'
import mutations from './moduleSystemManagerMutations.js'
import actions from './moduleSystemManagerActions.js'
import getters from './moduleSystemManagerGetters.js'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
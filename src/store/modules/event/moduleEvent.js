/*=========================================================================================
  File Name: moduleEvent.js
  Description: Event Module
  ----------------------------------------------------------------------------------------
  Item Name: Speed HRM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

import state from './moduleEventState'
import mutations from './moduleEventMutations.js'
import actions from './moduleEventActions.js'
import getters from './moduleEventGetters.js'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
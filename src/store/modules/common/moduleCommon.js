/*=========================================================================================
  File Name: moduleCommon.js
  Description: Brand Module
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

import state from './moduleCommonState.js'
import mutations from './moduleCommonMutations.js'
import actions from './moduleCommonActions.js'
import getters from './moduleCommonGetters.js'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
/*=========================================================================================
  File Name: moduleBrand.js
  Description: Brand Module
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

import state from './moduleBrandState.js'
import mutations from './moduleBrandMutations.js'
import actions from './moduleBrandActions.js'
import getters from './moduleBrandGetters.js'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
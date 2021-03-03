/*=========================================================================================
  File Name: moduleAuth.js
  Description: Auth Module
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

import state from './moduleAuthState.js'
import mutations from './moduleAuthMutations.js'
import actions from './moduleAuthActions.js'
import getters from './moduleAuthGetters.js'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
} 
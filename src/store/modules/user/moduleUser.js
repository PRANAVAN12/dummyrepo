/*=========================================================================================
  File Name: moduleUser.js
  Description: User Module
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Useror: SpeedCodeLabs
  Useror URL: http://www.speedcodelabs.com
==========================================================================================*/

import state from './moduleUserState.js'
import mutations from './moduleUserMutations.js'
import actions from './moduleUserActions.js'
import getters from './moduleUserGetters.js'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
} 
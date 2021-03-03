/*=========================================================================================
  File Name: modulePurchase.js
  Description: Purchase Module
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

import state from './modulePurchaseState.js'
import mutations from './modulePurchaseMutations.js'
import actions from './modulePurchaseActions.js'
import getters from './modulePurchaseGetters.js'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

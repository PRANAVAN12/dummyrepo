/*=========================================================================================
  File Name: moduleShop.js
  Description: Shop
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

import state from './moduleShopState'
import mutations from './moduleShopMutations'
import actions from './moduleShopActions'
import getters from './moduleShopGetters'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
} 
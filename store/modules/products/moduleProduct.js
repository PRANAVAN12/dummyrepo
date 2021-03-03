/*=========================================================================================
  File Name: moduleProduct.js
  Description: Product Module
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

import state from './moduleProductState.js'
import mutations from './moduleProductMutations.js'
import actions from './moduleProductActions.js'
import getters from './moduleProductGetters.js'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

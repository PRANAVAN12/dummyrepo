/*=========================================================================================
  File Name: moduleCustomer.js
  Description: Customer Module
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

import state from './moduleCustomerState.js'
import mutations from './moduleCustomerMutations.js'
import actions from './moduleCustomerActions.js'
import getters from './moduleCustomerGetters.js'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
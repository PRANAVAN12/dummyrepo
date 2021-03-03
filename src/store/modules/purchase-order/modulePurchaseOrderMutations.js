/*=========================================================================================
  File Name: modulePurchaseOrderMutations.js
  Description: Purchase Order Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

export default {
  SET_TOKEN: (state, value) => {
    state.token = value;
  },
  SET_USER: (state, value) => {
    state.user = value;
  },
  SET_USERROLE: (state, value) => {
    state.role = value;
  },
};

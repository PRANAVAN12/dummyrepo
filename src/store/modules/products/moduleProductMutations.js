/*=========================================================================================
  File Name: moduleProductMutations.js
  Description: Product Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

export default {
  SET_PRODUCTS(state, payload) {
    state.products = payload;
  },
  SET_CATEGORIES(state, payload) {
    state.categories = payload;
  },
  SET_BRANDS(state, payload) {
    state.brands = payload;
  },
};

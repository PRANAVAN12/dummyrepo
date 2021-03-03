/*=========================================================================================
  File Name: moduleProductGetters.js
  Description: Product Module Getters
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

export default {
  GetAllProducts(state) {
    // ;
    // if (state.products.data.length != 0) {
    //   let products = state.products.data.map((u, i, arr) => {
    //     u.index = i + 1;
    //     return new Product().toViewModel(u);
    //   });
    //   return products;
    // }
    // return [];
    return state.products.data;
  },
};

/*=========================================================================================
  File Name: moduleSitesettingMutations.js
  Description: Site Setting Mutations
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

export default {
  SET_SITELOGO(state, payload) {
    state.name = payload.name;
  },
  SET_DATEFORMET(state, payload) {
    state.date_format = payload.dateFormat.format;
  },
  SET_SITE_SETTINGS(state, payload) {
    state.siteSettings = payload;
    state.defaultPurchase =payload.default_purchase
    state.productSettings = { category: payload.category,
    profitMargin:payload.profit_margin_percentage }
  }
};
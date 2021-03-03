/*=========================================================================================
  File Name: mutations.js
  Description: Vuex Store - mutations
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

const mutations = {
  SET_COUNTRIES(state, payload) {
    state.countries = payload;
  },
  SET_SERVER_MESSAGES(state, payload) {
    state.server_messages = payload;
  },
  SET_POS_URL(state, payload) {
    state.pos_url = payload;
  },
  

  SET_TIME_FORMATS(state, payload) {
    state.dateformat = payload.dateformat;
    state.timeformat = payload.timeformat;
    state.monthyearformat = payload.monthyearformat;
    state.yearonlyformat = payload.yearonlyformat;
  },
  SET_PAGINATION_SETTING(state, payload) {
    state.pagination_settings = payload;
  },
  SET_BREADCRUMB(state, payload) {
    debugger;
    state.breadcrumb = payload;
  },
  SET_COLOR_MODE(state, payload) {
    state.theme = payload ? "light" : "dark";
  },
};
export default mutations;

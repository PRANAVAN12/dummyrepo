/*=========================================================================================
  File Name: getters.js
  Description: Vuex Store - getters
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

const getters = {
  getCountries(state) {
    return state.countries;
  },
  getServerMessages(state) {
    var messages = [];
    var key;
    var value;
    if (state.server_messages.length != 0) {
      for (let x = 0; x < state.server_messages.length; x++) {
        key = Object.keys(state.server_messages[x]);
        value = state.server_messages[x][key[0]];
        messages.push({ key: key[0], value: value });
      }
      return messages;
    } else {
      return [];
    }
  },
};

export default getters;

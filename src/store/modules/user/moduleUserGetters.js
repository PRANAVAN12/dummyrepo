/*=========================================================================================
  File Name: moduleUserGetters.js
  Description: User Module Getters
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Useror: SpeedCodeLabs
  Useror URL: http://www.speedcodelabs.com
==========================================================================================*/

export default {
  GetUser(state){
    return state.user
  },
  GetPolicies(state){
    return state.policies
  }
};

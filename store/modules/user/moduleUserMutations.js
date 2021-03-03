/*=========================================================================================
  File Name: moduleUserMutations.js
  Description: User Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Useror: SpeedCodeLabs
  Useror URL: http://www.speedcodelabs.com
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
  SET_POLICIES:(state,value)=>{
    state.policies = value;
  }
};

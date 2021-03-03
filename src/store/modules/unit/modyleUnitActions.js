/*=========================================================================================
  File Name: moduleUnitActions.js
  Description: Unit Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

import axios from "@/plugins/axios";

export default {
  
  //reset the password by get token from api
  async CreateUnit({}, Credentials) {
    delete Credentials.id;
    delete Credentials.is_active;
    return new Promise((resolve, reject) => {
      axios
        .post("units", Credentials)
        .then((resp) => {
          console.log("Request succeeded");
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },


  GetUnitSearch({}, payload) {
    
    let url = "units/search?";
    if (payload != null && payload != undefined) {
      if (payload.query != "" && payload.query != null) {
        url += `query=${payload.query}&`;
      }

      if (
        payload.except != undefined &&
        payload.except != null &&
        payload.except.length > 0
      ) {
        url += `except=[${payload.except}]`;
      }
    }
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((resp) => {
          
          console.log("resp.data", resp.data);
          resolve(resp.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },



  async GetUnits({}) {
    return new Promise((resolve, reject) => {
      axios
        .get(`units`)
        .then((resp) => {
          console.log("Request succeeded");
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },

  async EditUnit({}, Credentials) {
     
    return new Promise((resolve, reject) => {
      let ID = Credentials.id;
      //delete Credentials.is_active;
      delete Credentials.created_at;
      delete Credentials.id;
      delete Credentials.updated_at;
      delete Credentials.deleted_at;
      axios
        .patch(`units/${ID}`, Credentials)
        .then((resp) => {
          console.log("Request succeeded");
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  ActiveOrArchiveUnits({}, Id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`units/${Id}/soft-delete`)
        .then((resp) => {
          console.log("Request succeeded", resp);
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },

  async Getunit({}, Id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`units/${Id}`)
        .then((resp) => {
          console.log("Request succeeded");
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
};

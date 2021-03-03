/*=========================================================================================
  File Name: moduleBrandActions.js
  Description: Brand Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

import axios from "@/plugins/axios";

export default {
  //reset the password by get token from api
  async CreateBrand({}, Credentials) {
    delete Credentials.id;
    delete Credentials.is_active;

    return new Promise((resolve, reject) => {
      axios
        .post("brands", Credentials)
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
  GetBrandSearch({}, payload) {
    let url = "brands/search?";
    if (payload != null && payload != undefined) {
      if (payload.query != "" && payload.query != null) {
        url += `query=${payload.query}&`;
      }
      if (payload.status != "" && payload.status != null) {
        url += `status=${payload.status}`;
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
  async GetBrand({}) {
    return new Promise((resolve, reject) => {
      axios
        .get(`brands`)
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

  async EditBrand({}, Credentials) {
    return new Promise((resolve, reject) => {
      let ID = Credentials.id;

      delete Credentials.created_at;
      delete Credentials.id;
      delete Credentials.updated_at;
      delete Credentials.deleted_at;
      axios
        .patch(`brands/${ID}`, Credentials)
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
  ActiveOrArchiveBrand({}, Id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`brands/${Id}/soft-delete`)
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

  async GetBrand({}, Id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`brand/${Id}`)
        .then((resp) => {
          // console.log("Request succeeded");
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
};

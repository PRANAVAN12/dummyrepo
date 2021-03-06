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
  SoftDelete({}, payload) {

    return new Promise((resolve, reject) => {
      let url = "";
      switch (payload.feature) {
        case "user":
          url = "users";
          break;
        case "staff":
          url = "staffs";
          break;
        case "role":
          url = "roles";
          break;
        default:
          break;
      }
      axios
        .get(`${url}/${payload.id}/soft-delete`)
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
  getModuleUrl: (feature) => {
    let url = "";
    switch (feature) {
      case "user":
        url = "users";
        break;
        case "staff":
          url = "staff";
          break;
      case "product":
        url = "products";
        break;
      case "purchase-order":
        url = "purchases-orders";
        break;
      case "purchases":
        url = "purchases";
        break;
      case "purchase-return":
        url = "purchase-return";
        break;
      case "supplier":
        url = "supplier";
        break;
      default:
        break;
    }
  },
};

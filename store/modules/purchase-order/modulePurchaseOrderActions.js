/*=========================================================================================
  File Name: modulePurchaseOrderActions.js
  Description: Purchase Order Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

import axios from "@/plugins/axios";
import { PurchaseOrderEntityModel } from "@/models/EntityModels/PurchaseOrderEntityModel";

export default {
  //reset the password by get token from api
  async createPurchaseOrder({}, Credentials) {
    return new Promise((resolve, reject) => {
      axios
        .post("purchases-orders", Credentials)
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
  ArchiveOrActicePurchaseOrder({}, Id) {
    return new Promise((resolve, reject) => {
      axios

        .get(`purchases-orders/${Id}/soft-delete`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },

  //reset the password by get token from api
  async EditPurchaseOrder({}, Credentials) {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `purchases-orders/${Credentials.id}`,
          new PurchaseOrderEntityModel(Credentials)
        )
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
  async GetPurchaseOder({ commit }, Id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`purchases-orders/${Id}`)
        .then((resp) => {
          // console.log("Request succeeded");
          commit("SET_BREADCRUMB", resp.data.reference_number, {
            root: true,
          });
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  async GetPurchaseOders({}) {
    return new Promise((resolve, reject) => {
      axios
        .get(`purchases-orders`)
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
  ChangePurchaseOrderStatus({}, purchaseOrder) {
    console.log("66666666666666666666666666666666666666666666666");
    console.log(purchaseOrder);
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `purchases-orders/${purchaseOrder.id}/change-status`,
          purchaseOrder.selectedStatus
        )
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
  GetPurchaseOdersSearch({}, payload) {
    console.log(payload);
    let url = "purchases-orders/search?";
    if (payload != null && payload != undefined) {
      if (payload.query != "" && payload.query != null) {
        url += `query=${payload.query}&`;
      }
      if (payload.status != "" && payload.status != null) {
        url += `status=${payload.status}&`;
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
          console.log("resp.data", resp.data.data);
          resolve(resp.data.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  GetPurchaseReturnSearch({}, payload) {
    console.log(payload);
    let url = "purchase-return/search?";
    if (payload != null && payload != undefined) {
      if (payload.query != "" && payload.query != null) {
        url += `query=${payload.query}&`;
      }
      if (payload.status != "" && payload.status != null) {
        url += `status=${payload.status}&`;
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
          console.log("resp.data", resp.data.data);
          resolve(resp.data.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
};

/*=========================================================================================
  File Name: modulePurchaseReturnActions.js
  Description: Purchase Return Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

import axios from "@/plugins/axios";

export default {
  //reset the password by get token from api
  async CreatePurchaseReturn({}, Credentials) {
    return new Promise((resolve, reject) => {
      axios
        .post("purchase-return", Credentials)
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
  ArchiveOrActicePurchaseReturn({}, Id) {
    return new Promise((resolve, reject) => {
      axios

        .get(`purchase-return/${Id}/soft-delete`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  async UpdatePurchaseReturn({}, Credentials) {
    let url = `purchase-return/${Credentials.id}`;
    delete Credentials.id;
    return new Promise((resolve, reject) => {
      axios
        .patch(url, Credentials)
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

  async GetPurchaseReturn({commit}, Id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`purchase-return/${Id}`)
        .then((resp) => {
          debugger
          // console.log("Request succeeded");
          commit("SET_BREADCRUMB", resp.data.reference_number, {
            root: true,
          });
          resolve(resp);
        })
        .catch((err) => {
          debugger
          console.log("Error");
          reject(err.response);
        });
    });
  },

  async GetDamagedProducts({}) {
    return new Promise((resolve, reject) => {
      axios
        .get(`stocks/damage-product-list`)
        .then((resp) => {
          console.log("Request succeeded");
          resolve(resp.data.data);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },

  async GetReturnReason({}, payload) {
    let url = "return-reason/search?";
    if (payload != null && payload != undefined) {
      if (payload.query != "" && payload.query != null) {
        url += `query=${payload.query}&`;
      }
    }
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((resp) => {
          resolve(resp.data.data);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },

  async GetProductsFromStocks({}, payload) {
    let url = `stocks/ware-houses/${payload.warehouse}/products?`;
    if (payload != null && payload != undefined) {
      if (payload.query != "" && payload.query != null) {
        url += `query=${payload.query}&`;
      }
    }

    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((resp) => {
          resolve(resp.data.data);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  GetProductBatches({}, payload) {
    let url = `stocks/ware-houses/${payload.warehouse}/products/${payload.id}/batches?`;
    url += `except=[${payload.selectedBatches}]&`;
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },

  getProductReturnStock({}, payload) {
    let url = `stocks/product-qut?product=${payload.productId}&batch=${payload.batchId}&unit=${payload.unitId}&warehouse=${payload.warehouseId}&reason=${payload.reasonId}`;
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },

  getProductTransferQuantity({}, payload) {

    let url = `stocks/product-transfer-quantity?`;
    let credential=new Object();
    credential.product_id=payload.productId;
    credential.batch_id=payload.batchId;
    credential.unit_id=payload.unitId;
    credential.warehouse_id=payload.warehouseId;
    return new Promise((resolve, reject) => {
      axios
          .post(url,credential)
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err.response);
          });
    });
  },
  getProductBatchDetailsFromStock({}, payload) {
    let url = `stocks/ware-houses/${payload.warehouseId}/products/${payload.productId}/batches/${payload.batchId}`;
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
};

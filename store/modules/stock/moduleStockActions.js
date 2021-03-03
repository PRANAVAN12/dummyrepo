/*=========================================================================================
  File Name: moduleStockActions.js
  Description: Supplier Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

import axios from "@/plugins/axios";
import { SupplierEntityModel } from "@/models/EntityModels/SupplierEntityModel";
import { BankDetailsEntityModel } from "@/models/EntityModels/BankDetailsEntityModel";

export default {
  async GetStocks({}) {
    return new Promise((resolve, reject) => {
      axios
        .get(`stocks`)
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
  async ChangeStatus({ }, payload) {
    let id = payload.id;
    delete payload.id;
    //delete payload.note;
    return new Promise((resolve, reject) => {
      axios.patch(
        `transfers/${id}/change-status`,
        payload
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
  async UpdateTransferStatus({ }, Credentials) {
    return new Promise((resolve, reject) => {
      axios.patch(`transfers/${Credentials.stockId}/change-status
`,Credentials.data)
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
  GetBatchForStocksinExpandTable({}, payload) {
    let url = `stocks/batches/ware-house/${payload.warehouse_id}/product/${payload.product_id}/unit/${payload.unit_id}`;

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

  GetShopBatchStocksOnExpand({}, payload) {
    let url = `shop-stocks/batches/shops/${payload.shop_id}/products/${payload.product_id}/units/${payload.unit_id}`;

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

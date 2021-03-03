/*=========================================================================================
  File Name: moduleWarehouseActions.js
  Description: Warehouse Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

import axios from "@/plugins/axios";
import {
  WarehouseEntity,
  WareHouseEntityModel,
} from "../../../models/EntityModels/WareHouseEntityModel";
export default {
  async AddWarehouse({}, Credentials) {
    return new Promise((resolve, reject) => {
      axios
        .post("ware-houses", Credentials)
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

  GetWarehouseSingleId({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`ware-houses/${id}`)
        .then((resp) => {
          // console.log("Request succeeded");
          commit("SET_BREADCRUMB", resp.data.name, {
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
  async GetWarehouses({}) {
    return new Promise((resolve, reject) => {
      axios
        .get(`ware-houses`)
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
  /*=====================INCOMES===================================*/
  async createIncome({},credentials) {
    return new Promise((resolve, reject) => {
        debugger
        if(credentials.income_for=='Warehouse')
        {
            delete  credentials.shop_id;
        }else {
            delete  credentials.warehouse_id;
        }
        axios
            .post(`incomes`,credentials)
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
async EditIncome({},credentials) {
    return new Promise((resolve, reject) => {
        debugger
        if(credentials.income_for=='Warehouse')
        {
            delete  credentials.shop_id;
        }else {
            delete  credentials.warehouse_id;
        }
        debugger
        let Id=credentials.id;
        delete credentials.id;
        axios
            .patch(`incomes/${Id}`,credentials)
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
async GetIncomes({},id) {
    return new Promise((resolve, reject) => {
        axios
            .get(`incomes/${id}`)
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
  /*==========================Expense==================================*/
    async createExpense({},credentials) {
        return new Promise((resolve, reject) => {
            debugger
            if(credentials.expense_for=='Warehouse')
            {
                delete  credentials.shop_id;
            }else {
                delete  credentials.warehouse_id;
            }
            axios
                .post(`expenses`,credentials)
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
    async EditExpense({},credentials) {
        return new Promise((resolve, reject) => {
            debugger
            if(credentials.expense_for=='Warehouse')
            {
                delete  credentials.shop_id;
            }else {
                delete  credentials.warehouse_id;
            }
            debugger
            let Id=credentials.id;
            delete credentials.id;
            axios
                .patch(`expenses/${Id}`,credentials)
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
    async GetExpense({},id) {
        return new Promise((resolve, reject) => {
            axios
                .get(`expenses/${id}`)
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
  ArchiveOrActive({}, Id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`ware-houses/${Id}/soft-delete`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  async EditWarehouse({}, Credentials) {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `ware-houses/${Credentials.id}`,
          new WareHouseEntityModel(Credentials)
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
  GetWarehouse({}, payload) {
    let url = "ware-houses/search?";
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
          console.log("resp.data", resp.data.data);
          resolve(resp.data.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
    GetShops({ }, payload) {
        let url = "shops/search?";
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

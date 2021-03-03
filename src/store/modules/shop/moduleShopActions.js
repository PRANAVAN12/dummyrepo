/*=========================================================================================
  File Name: moduleShopActions.js
  Description: Shop Actions
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

import axios from "@/plugins/axios";


export default {
  /* ========================= Shop========================= */
  ArchiveOrActiceShop({}, Id) {
    return new Promise((resolve, reject) => {
      axios

        .get(`shops/${Id}/soft-delete`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },

  async AddShop({}, Credentials) {
debugger
    delete Credentials.address.country_name;
    
    return new Promise((resolve, reject) => {
      axios
        .post("shops", Credentials)
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
  // async EditShop({}, Credentials) {
  //   return new Promise((resolve, reject) => {
  //     axios
  //       .patch(`shops/${Credentials.id}`, Credentials)
  //       .then((resp) => {
  //         console.log("Request succeeded");
  //         resolve(resp);
  //       })
  //       .catch((err) => {
  //         console.log("Error");
  //         reject(err.response);
  //       });
  //   });
  // },
  GetShopSingleId({}, id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`shops/${id}`)
        .then((resp) => {
          console.log("Request succeeded shop");
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  EditShop({}, Credentials) {
    debugger
    let id = Credentials.id;
    delete Credentials.id;
    delete Credentials.created_at;
    delete Credentials.deleted_at;
    delete Credentials.is_active;
    delete Credentials.updated_at;
    delete Credentials.account;
    delete Credentials.address.country_name;
    delete Credentials.address.state;
    delete Credentials.contact.full_name;
    return new Promise((resolve, reject) => {
      axios
        .patch(`shops/${id}`, Credentials)
        .then((resp) => {
          console.log("Request succeeded shop");
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  GetShop({ }, payload) {
    let url = "shops/search?";
    if (payload != null && payload != undefined) {
      if (payload.query != "" && payload.query != null) {
        url += `query=${payload.query}&`;
      }
        if (
            payload.status != undefined &&
            payload.status != null
        ) {
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
  AssignShopToWarehouse({},credentials) {
    debugger
         
    const WarehouseId=credentials.WarehouseId;
    delete credentials.WarehouseId
    return new Promise((resolve, reject) => {
        axios
            .post(`ware-houses/${WarehouseId}/shops`,credentials)
            .then((resp) => {
                console.log("Request succeeded to Assaigned Shops-------------------------", resp);
                resolve(resp);
            })
            .catch((err) => {
                console.log("Error");
                reject(err.response);
            });
    });
},
GetStocksinShop({commit}, payload) {
  let url = `shops/${payload}/stocks`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((resp) => {
        
        commit("SET_BREADCRUMB", resp.data.data[0].id, {
          root: true,
        });
        console.log("resp.data", resp.data.data);
        resolve(resp.data.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
},

GetSalesinShop({commit}, payload) {
  let url = `shops/${payload}/sales`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((resp) => {
        
        debugger
        console.log("resp.data", resp.data.data);
        resolve(resp.data.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
},
RemoveShopFromWarehouse({},credentials) {
  const WarehouseId=credentials.WarehouseId;
  delete credentials.WarehouseId;
  return new Promise((resolve, reject) => {
      axios
          .delete(`ware-houses/${WarehouseId}/shops`,{data:credentials})
          .then((resp) => {
              console.log("Request succeeded-------------------------", resp);
              resolve(resp);
          })
          .catch((err) => {
              console.log("Error");
              reject(err.response);
          });
  });
},
}
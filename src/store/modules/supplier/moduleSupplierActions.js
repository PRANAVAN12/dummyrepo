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
  async AddSupplier({}, Credentials) {
    return new Promise((resolve, reject) => {
      axios
        .post("supplier", Credentials)
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
  ArchiveOrActiceSupplier({}, Id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`supplier/${Id}/soft-delete`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },

  GetSupplier({ }, id) {
    debugger;
    return new Promise((resolve, reject) => {
      axios
        .get(`supplier/${id}`)
        .then((resp) => {
          console.log("Request succeeded");

          resolve(resp);
        })
        .catch((err) => {
          debugger
          console.log("Error");
          reject(err.response);
        });
    });
  },
  // Fetch all suppliers
  FetchAllSuppliers({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`supplier/search`)
        .then((resp) => {
          commit("SET_SUPPLIERS", resp.data.data);
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  async GetSuppliers({}) {
    return new Promise((resolve, reject) => {
      axios
        .get(`supplier`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },

  async GetSupplierProduct({}, id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`supplier/${id}/products`)
        .then((resp) => {
          console.log("Request succeeded");
          resolve(resp.data);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  async GetSupplier({commit}, id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`supplier/${id}`)
        .then((resp) => {
          console.log("Request succeeded");
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
  // With Pagination
  // async GetSuppliers({}) {
  //   return new Promise((resolve, reject) => {
  //     axios
  //       .get(`supplier`)
  //       .then((resp) => {
  //         // commit("SET_SUPPLIERS", resp.data);
  //         resolve(resp);
  //       })
  //       .catch((err) => {
  //         console.log("Error");
  //         reject(err.response);
  //       });
  //   });
  // },
  // Without Pagination
  async GetAllSuppliers({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`supplier/search`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  async EditSupplier({}, Credentials) {
    let id = Credentials.id;
    delete Credentials.id;

    return new Promise((resolve, reject) => {
      axios
        .patch(`supplier/${id}`, new SupplierEntityModel(Credentials))
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  ArchiveOrActiceProduct({}, Id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`supplier/${Id}/soft-delete`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  GetSupplierProducts({}, Id) {
  
    return new Promise((resolve, reject) => {
      axios
        .get(`supplier/${Id}/products`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  GetSupplierSearch({}, payload) {
    let url = "supplier/search?";
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
  async BankDetails({}, Credentials) {
    
    let id = Credentials.id;
    delete Credentials.id;
    return new Promise((resolve, reject) => {
    
      var bankDetails = Credentials.credential;
      axios
        .post(`supplier/${id}/bank-details`, bankDetails)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  GetSupplierBankDetails({}, Id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`supplier/${Id}/bank-details`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },

  EditBankDetail({}, Credentials) {
    let id = Credentials.bankdetailId;
    let bankdetail = Credentials.bankdetails;
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `supplier/${id}/bank-details/${Credentials.bankdetails.id}`,
          new BankDetailsEntityModel(bankdetail)
        )
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  ArchiveOrActice({}, Credentials) {
    let Id = Credentials.id;
    return new Promise((resolve, reject) => {
      axios
        .delete(`supplier/${Id}/bank-details/${Credentials.bankdetails}`)
        .then((resp) => {
          console.log("resp.data", resp.data.data);
          resolve(resp.data.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },

  RemoveProduct({}, Credentials) {
    let Id = Credentials.id;
    return new Promise((resolve, reject) => {
      axios
        .delete(`supplier/${Id}/products/${Credentials}`)
        .then((resp) => {
          debugger;
          resolve(resp.data.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
};

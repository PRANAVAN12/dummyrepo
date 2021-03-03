/*=========================================================================================
  File Name: moduleCustomerActions.js
  Description: Customer Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

import axios from "@/plugins/axios";
import { CustomerEntityModel } from "@/models/EntityModels/CustomerEntityModel";
import { identity } from "lodash";

export default {
  //reset the password by get token from api


  async CreateCustomer({}, Credentials) {
    delete Credentials.addresses[0].country_name;
    debugger
    return new Promise((resolve, reject) => {
      axios
        .post("customers", Credentials)
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
  async GetCustomers({}) {
    return new Promise((resolve, reject) => {
      axios
        .get(`customers`)
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
  async GetCustomerType({}) {
    return new Promise((resolve, reject) => {
      axios
        .get(`customer-types`)
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
  async GetCustomerCategory({}) {
    return new Promise((resolve, reject) => {
      axios
        .get(`customer-group`)
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
  async EditCustomer({}, Credentials) {
    let customer_id = Credentials.id;
    delete Credentials.id;
    delete Credentials.addresses[0].country_name;
    //delete Credentials.CreditDetails
    Credentials.contacts.map((data) => {
      delete data.full_name;
    });
    Credentials.addresses.map((data) => {
      delete data.state;
    });
    return new Promise((resolve, reject) => {
      axios
        .patch(`customers/${customer_id}`, Credentials)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },

  async GetCustomer({ commit }, Id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`customers/${Id}`)
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
  ArchiveOrActice({}, Credentials) {
    return new Promise((resolve, reject) => {
      axios
        .get(`customers/${Credentials.id}/soft-delete`)
        .then((resp) => {
          console.log("resp.data", resp.data.data);
          resolve(resp.data.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },

  async CreateHistoryDetails({}, Credentials) {
    let id = Credentials.id;
    delete Credentials.id;
    return new Promise((resolve, reject) => {
      var historyDetails = Credentials.historydetails;
      axios
        .post(`customers/${id}/histoy-details`, historyDetails)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  UploadCustomerImage({}, credentials) {
    return new Promise((resolve, reject) => {
      axios
        .post(`customers/${credentials.get("id")}/image-upload`, credentials)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  GetcustomerHistoryDetails({}, Id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`customers/${Id}/histoy-details`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },

  EditHistoryDetail({}, Credentials) {
    let id = Credentials.historydetailId;
    let historyid = Credentials.history.id;
    let historydetail = Credentials.history;
    delete Credentials.history.created_at;
    delete Credentials.history.customer_id;
    delete Credentials.history.updated_at;
    delete Credentials.history.id;
    return new Promise((resolve, reject) => {
      axios
        .patch(`customers/${id}/histoy-details/${historyid}`, historydetail)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },

  GetCustomerSearch({}, payload) {
    let url = "customers/search?";
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
          resolve(resp.data.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },

  async GetCustomerGroups({}) {
    return new Promise((resolve, reject) => {
      axios
        .get(`customer-group`)
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

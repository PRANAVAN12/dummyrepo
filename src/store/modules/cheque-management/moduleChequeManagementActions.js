import axios from "@/plugins/axios";
import {Cheque} from "@/models/Cheque";

export default {
  //reset the password by get token from api
  async createPurchaseOrder({ }, Credentials) {
    return new Promise((resolve, reject) => {
      axios
        .post("cheque", Credentials)
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
  ChequeSearch({ }, payload) {
    console.log(payload);
    let url = "purchase-return/search?";
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
          resolve(resp.data.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },

  async GetCheque({ commit }, Id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`cheques/${Id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  async GetCheques({ }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`cheques`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  async changeChequeStatus({ }, payload) {
    let id = payload.id;
    delete payload.id;
    return new Promise((resolve, reject) => {
      axios
        .patch(`cheques/${id}/change-status`, payload)
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
  async GetPendingCheques({ commit }, Id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`cheques/pending-cheques`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  async CreateCheque({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`cheques`,payload)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  async EditCheque({ commit }, payload) {
    return new Promise((resolve, reject) => {

      axios
          .patch(`cheques/${payload.id}`,new Cheque().toRequestModel(payload.data))
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err.response);
          });
    });
  },
};

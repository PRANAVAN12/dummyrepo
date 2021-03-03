import axios from "../../../plugins/axios";
import { PurchaseOrderEntityModel } from "../../../models/EntityModels/PurchaseOrderEntityModel";

export default {
  state: () => ({}),
  mutations: {
    SET_TOKEN: (state, value) => {
      state.token = value;
    },
    SET_USER: (state, value) => {
      state.user = value;
    },
    SET_USERROLE: (state, value) => {
      state.role = value;
    },
  },
  getters: {},
  actions: {
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
    async GetPurchaseOder({}, Id) {
      return new Promise((resolve, reject) => {
        axios
          .get(`purchases-orders/${Id}`)
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
  },
};

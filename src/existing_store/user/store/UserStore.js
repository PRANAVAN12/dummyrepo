import axios from "../../../plugins/axios";
import { UserEntityModel } from "../../../models/EntityModels/UserEntityModel";
import { reject } from "core-js/fn/promise";

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
    
   
   
   

    async Login({}, Credentials) {
      return new Promise((resolve, reject) => {
        axios
          .post("auth/login", Credentials)
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
    // Register() {},
    refreshToken() {},
    //reset the password by get token from api
    async ResetPassword({}, Credentials) {
      return new Promise((resolve, reject) => {
        axios
          .post("users/reset-password", Credentials)
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
    async RegisterUser({}, Credentials) {
      return new Promise((resolve, reject) => {
        axios
          .post("user/signup", Credentials)
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
    async ForgetPassword({}, Credentials) {
      return new Promise((resolve, reject) => {
        axios
          .post("auth/forget-password", Credentials)
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
    async EditUser({}, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`user/${payload.id}`, new UserEntityModel(payload))
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
    async GetSingleUser({}, id) {
      return new Promise((resolve, reject) => {
        axios
          .get(`user/${id}`)
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
    ChangePassword({}, Credentials) {
      return new Promise((resolve, reject) => {
        axios
          .post("user/change-password", Credentials)
          .then((resp) => {
            console.log("Request succeeded");
            resolve(resp);
          })
          .catch((err) => {
            reject(err.response);
          });
      });
    },
    GetUsers({}, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get("user/", payload)
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
    ActiveOrArchiveUser({}, Id) {
      return new Promise((resolve, reject) => {
        axios
          .get(`user/${Id}/soft-delete`)
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

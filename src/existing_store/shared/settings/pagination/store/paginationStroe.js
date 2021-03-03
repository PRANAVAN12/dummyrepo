import axios from "../../../../../plugins/axios";

export default {
  state: {},
  mutations: {},
  actions: {
    GetPaginationSettings({}, payload) {
      console.log("Calling pagination settings");
      return new Promise((resolve, reject) => {
        axios
          .get("settings/pagination/")
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
    GetPaginationData({}, payload) {
      console.log("Requesting table data - pagination");
      return new Promise((resolve, reject) => {
        axios
          .get(payload.url, { params: payload.params })
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
  },
  modules: {},
};

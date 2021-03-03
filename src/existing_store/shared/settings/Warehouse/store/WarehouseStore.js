import axios from "../../../../../plugins/axios";
export default {
  state: () => ({}),
  mutations: {},
  getters: {},
  actions: {
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
    async GetWarehouse({}, id) {
      return new Promise((resolve, reject) => {
        axios
          .get(`ware-houses/${id}`)
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
    ArchiveOrActice({}, Id) {
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
  },
  async EditWarehouse({}, Credentials) {
    return new Promise((resolve, reject) => {
      axios
        .patch(`ware-houses/${Credentials.id}`, Credentials)
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

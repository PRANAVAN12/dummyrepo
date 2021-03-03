import axios from "../../../plugins/axios";
import { SupplierEntityModel } from "../../../models/EntityModels/SupplierEntityModel";

export default {
  state: () => ({
    suppliers: [],
  }),
  mutations: {
    SET_SUPPLIERS(state, payload) {
      state.suppliers = payload;
    },
  },
  getters: {
    GetAllSuppliers(state) {
      return state.suppliers.data;
    },
  },
  actions: {
    async AddSupplier({ }, Credentials) {
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
     ArchiveOrActiceSupplier({ }, Id) {
      
      return new Promise((resolve, reject) => {
        axios.get(`supplier/${Id}/soft-delete`)
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err.response);
          });
      });
    },
    async GetSupplier({ }, id) {
      return new Promise((resolve, reject) => {
        axios
          .get(`supplier/${id}`)
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
    async GetSuppliers({ }) {

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
    async EditSupplier({ }, Credentials) {
      let id = Credentials.id;
      delete Credentials.id;
      return new Promise((resolve, reject) => {
        axios
          .patch(`supplier/${id}`, Credentials)
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            console.log("Error");
            reject(err.response);
          });
      });
    },

    async GetSupplierProduct({ }, id) {
      ;
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
    async GetSupplier({ }, id) {
      return new Promise((resolve, reject) => {
        axios
          .get(`supplier/${id}`)
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
    // With Pagination
    async GetSuppliers({ }) {

      return new Promise((resolve, reject) => {
        axios
          .get(`supplier`)
          .then((resp) => {
            // commit("SET_SUPPLIERS", resp.data);
            resolve(resp);
          })
          .catch((err) => {
            console.log("Error");
            reject(err.response);
          });
      });
    },
    // Without Pagination
    async GetAllSuppliers({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`supplier/search`)
          .then((resp) => {
            commit("SET_SUPPLIERS", resp.data);
            resolve(resp);
          })
          .catch((err) => {
            console.log("Error");
            reject(err.response);
          });
      });
    },
    async EditSupplier({ }, Credentials) {
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
    ArchiveOrActiceProduct({ }, Id) {
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
    GetSupplierProducts({ }, Id) {
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
  },
};

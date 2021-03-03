import axios from "../../../plugins/axios";
import { Product } from "@/models/Product";
import { ProductEntity } from "../../../models/EntityModels/ProductEntity";

export default {
  state: {
    products: [], //Total Products List
  },
  mutations: {
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
  },
  getters: {
    GetAllProducts(state) {
      // ;
      // if (state.products.data.length != 0) {
      //   let products = state.products.data.map((u, i, arr) => {
      //     u.index = i + 1;
      //     return new Product().toViewModel(u);
      //   });
      //   return products;
      // }
      // return [];
      return state.products.data;
    },
  },
  actions: {
    AddProduct({}, credentials) {
      return new Promise((resolve, reject) => {
        axios
          .post("products", credentials)
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err.response);
          });
      });
    },
    EditProduct({}, credentials) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`products/${credentials.Id}`, new ProductEntity(credentials))
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err.response);
          });
      });
    },
    GetAllProducts({commit},payload){
      return new Promise((resolve, reject) => {
        axios
          .get('/products')
          .then((res) => {
            commit('SET_PRODUCTS',res.data)
            resolve(resp.data.data);
          })
          .catch((err) => {
            reject(err.response);
          });
      });
    },
    GetProduct({}, payload) {
      let url = "products/search?";
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
            console.log("resp.data", resp.data.data);
            resolve(resp.data.data);
          })
          .catch((err) => {
            reject(err.response);
          });
      });
    },
    GetProductById({}, Id) {
      return new Promise((resolve, reject) => {
        axios
          .get(`products/${Id}`)
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err.response);
          });
      });
    },
    GetProductBatches({}, payload) {
      let url = `products/${payload.id}/batches/search?`;
      // if (payload.selectedBatches) {
      url += `except=[${payload.selectedBatches}]`;
      // }
      return new Promise((resolve, reject) => {
        axios
          .get(url)
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err.response);
          });
      });
    },
    // Batch
    AddBatch({}, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post("batch", payload)
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err.response);
          });
      });
    },
    ArchiveOrActiceBatches({}, Id) {
      return new Promise((resolve, reject) => {
        axios
          .get(`batches/${Id}/soft-delete`)
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err.response);
          });
      });
    }, 
    AddProductBatch({}, payload) {
      
      return new Promise((resolve, reject) => {
        var product_id = payload.productId;
        delete payload.productId;
        delete payload.isAdd;
        delete payload.isEdit;
        payload.batch=payload.name;
        delete payload.name;
        axios
          .post("products/" + product_id + "/batches", payload)
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err.response);
          });
      });
    },
    ArchiveOrActiceProduct({}, Id) {
      return new Promise((resolve, reject) => {
        axios

          .get(`products/${Id}/soft-delete`)
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err.response);
          });
      });
    },
  },
  modules: {},
};

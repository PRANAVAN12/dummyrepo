import axios from "@/plugins/axios";

export default {
  async GetDiscount({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`discounts/${id}`)
        .then((resp) => {
          console.log("Request succeeded");
          commit("SET_BREADCRUMB", resp.data.reference_number, {
            root: true,
          });
          resolve(resp.data);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },

  async CreateDiscount({}, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post("discounts", payload)

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
  async UpdateDiscount({}, payload) {
    return new Promise((resolve, reject) => {
      axios
        .patch(`discounts/${payload.id}`, payload.body)
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
  async SoftDeleteDiscount({}, Id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`discounts/${Id}/soft-delete`)
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
};

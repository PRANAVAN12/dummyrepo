/*=========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

import axios from "@/plugins/axios";

const actions = {
  // Fetch the all country list
  GetCountries({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("countries/search")
        .then((res) => {
          if (res.status == 200) {
            commit("SET_COUNTRIES", res.data.data);
            console.log("Request succeeded-------------------------", res);
            resolve(res);
          }
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  GetDesignations() {
    return new Promise((resolve, reject) => {
      axios
        .get("designations")
        .then((res) => {
          
          resolve(res);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },

  GetEmployeeTypes() {
    return new Promise((resolve, reject) => {
      axios
        .get("employment-types")
        .then((res) => {
          
          resolve(res);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  GetLeaveTypes() {
    return new Promise((resolve, reject) => {
      axios
        .get("leave-types")
        .then((res) => {
          
          resolve(res);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  GetSaluations() {
    return new Promise((resolve, reject) => {
      axios
        .get("salutations")
        .then((res) => {
          
          resolve(res);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },

  GetOffices() {
    return new Promise((resolve, reject) => {
      axios
        .get("offices")
        .then((res) => {
          
          resolve(res);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  // Pagination Settings
  GetPaginationSettings({ commit }, payload) {
    console.log("Calling pagination settings");
    return new Promise((resolve, reject) => {
      axios
        .get("settings/pagination/")
        .then((resp) => {
          commit("SET_PAGINATION_SETTING", resp.data.data[0]);
          // console.log("Request succeeded-------------------------", resp);
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  // Fetch Pagination Data
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
  // Fetch Auto Completion Data
  GetAutoCompleteData({}, payload) {
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
  // POS Settings
  async UpdatePosSetting({}, Credentials) {
    delete Credentials.category;
    delete Credentials.shop;
    delete Credentials.customerGroup;
    delete Credentials.customerType;
    delete Credentials.id;

    return new Promise((resolve, reject) => {
      axios
        .patch("settings/pos-configuration/1", Credentials)
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
  async GetPOSSettings({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`settings/pos-configuration/1`)

        .then((resp) => {

          commit("SET_POS_URL", resp.data.pos_url);
          console.log("Request succeeded");
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },

  /* ========================= Roles ========================= */
  GetRoles() {
    return new Promise((resolve, reject) => {
      axios
        .get("roles/search")
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },

  /* =========================  File Uploads ========================= */
  async DocumentUploads({}, fd) {
    var formData = new FormData();
    for (var i = 0; i < fd.files.length; i++) {
      formData.append("image", fd.files[i]);
    }
    return new Promise((resolve, reject) => {
      axios
        .post(`document/upload/${fd.documentType}/${fd.fileId}`, formData)
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
  /* =========================  Files View ========================= */
  async DocumentView({}, fd) {
    return new Promise((resolve, reject) => {
      axios
        .get(`document/${fd.documentType}/${fd.fileId}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  /* =========================  Files View ========================= */
  setErrorMessages({ commit }, payload) {
    commit("SET_SERVER_MESSAGES", payload.error);
  },
  GetProductBatches({}, payload) {
    let url = `stocks/${payload.id}/batches/search?`;
    url += `except=[${payload.selectedBatches}]`;
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
  GetTimeFormat({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get("timeformat")
        .then((resp) => {
          commit("SET_TIME_FORMATS", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },

  /* =========================  Get Emails ========================= */
  async fetchmsuser({ commit }, payload = {}) {
    return new Promise((resolve, reject) => {
      axios
        .get("auth/getFromAd")
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default actions;

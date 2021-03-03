/* eslint-disable */

import axios from "axios";
import env from "../config/env";
import store from "../store/store";
const BASE_URL = env.apiUrl;

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: false,
  params: {}, // do not remove this, its added to add params later in the config
});

// Add a request interceptor
instance.interceptors.request.use(
  function(config) {
    /* token retrived from - global window Store */
    // const { token } = Store.state
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.common["Authorization"] = "Bearer " + token;
      config.headers.common["Access-Control-Allow-Origin"] = "*";
      config.headers.common["Accept"] = "application/json";
    } else {
      // Use application/x-www-form-urlencoded for login
      config.headers.common["Content-Type"] =
        "application/x-www-form-urlencoded";
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Redirects to login page when the token expires
    if (error.response.status == 401) {
      window.location.href = "/login";
    } else if (error.response.status == 422) {
      console.log("this.$store---------------------");
      console.log(store);
      store.dispatch("setErrorMessages", error.response.data);
    }
    return Promise.reject(error);
  }
);

export default {
  get(action, params = {}) {
    let url = `${BASE_URL}`;
    url += action;
    return instance.get(url, params);
  },
  post(action, data) {
    let url = `${BASE_URL}`;
    url += action;
    return instance.post(url, data);
  },
  put(action, data) {
    let url = `${BASE_URL}`;
    url += action;
    return instance.put(url, data);
  },
  patch(action, data) {
    let url = `${BASE_URL}`;
    url += action;
    return instance.patch(url, data);
  },
  delete(action, data) {
    let url = `${BASE_URL}`;
    url += action;
    return instance.delete(url,data);
  },
};

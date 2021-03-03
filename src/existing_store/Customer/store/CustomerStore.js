import axios from "../../../plugins/axios";
export default {
  state: () => ({}),
  mutations: {},
  getters: {},
  actions: {
    //reset the password by get token from api
    async CreateCustomer({}, Credentials) {
      return new Promise((resolve, reject) => {
        axios
          .post("customers", Credentials)
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
    async GetCustomers({}) {
      return new Promise((resolve, reject) => {
        axios
          .get(`customers`)
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
    async GetCustomerType({}) {
      return new Promise((resolve, reject) => {
        axios
          .get(`customer-types`)
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
    async EditCustomer({}, Credentials) {
      console.log(Credentials);

      let customer_id = Credentials.Id;
      delete Credentials.Id;

      return new Promise((resolve, reject) => {
        axios
          .patch(`customers/${customer_id}`, Credentials)
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            console.log("Error");
            reject(err.response);
          });
      });
    },
    async GetCustomer({}, Id) {
      return new Promise((resolve, reject) => {
        axios
          .get(`customers/${Id}`)
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
    async GetCustomerGroups({}) {
      return new Promise((resolve, reject) => {
        axios
          .get(`customer-group`)
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
  },
};

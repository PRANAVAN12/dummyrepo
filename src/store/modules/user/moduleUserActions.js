/*=========================================================================================
  File Name: moduleUserActions.js
  Description: User Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Useror: SpeedCodeLabs
  Useror URL: http://www.speedcodelabs.com
==========================================================================================*/

import axios from "@/plugins/axios";
import { UserEntityModel } from "@/models/EntityModels/UserEnitityModel";
import { RoleEntityModel } from "@/models/EntityModels/RoleEntityModel";

export default {
  async LoginUsers({ commit }) {
    
    return new Promise((resolve, reject) => {

      axios
        .get("auth/user")
        .then((resp) => {
          commit("SET_POLICIES", resp.data.permissions);
          commit("SET_USER", resp.data);
          setTimeout(function () {
            commit("SET_LOGIN_STATUS", true);
          },200)
          resolve(resp);
        })
        .catch((err) => {
          commit("SET_LOGIN_STATUS", false);
          console.log("Error");
          reject(err.response);
        });
    });
  },

  async Logins ({ commit }, user) { 
    let email = user.email
    let token = user.token
    
    return new Promise((resolve, reject) => {
      axios
        .post('auth/login', { email: email,
          token: token})
        .then((resp) => {
          if (resp.data && resp.data.accessToken) {
            
            localStorage.setItem('token', resp.data.accessToken)
            localStorage.setItem("user", JSON.stringify(resp.data));
          }
          resolve(resp)
        })
        .catch((err) => {
          console.log('Error')
          reject(err.response)
        })
    })
  },
  async LogOut({ commit }) {
    return new Promise((resolve, reject) => {
      commit("SET_POLICIES", []);
      commit("SET_USER", null);
      resolve(true);
    });
  },
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
  Register() {},
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
        .post("users", Credentials)

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


  async AdminResetPassword({}, Credentials) {
    return new Promise((resolve, reject) => {
      axios
        .post(`users/${Credentials}/reset-password`)
     
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
  
    let userid = payload.id;
    delete payload.id;
    return new Promise((resolve, reject) => {
      axios
        .patch(`users/${userid}`, payload)
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

  async GetSingleUser({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`users/${id}`)
        .then((resp) => {
          // console.log("Request succeeded");
          commit("SET_BREADCRUMB", resp.data.username, {
            root: true,
          });
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  ChangeTempPassword({}, Credentials) {
    return new Promise((resolve, reject) => {
      axios
        .post("auth/changes-temp-password", Credentials)
        .then((resp) => {
          console.log("Request succeeded");
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  ChangePassword({}, Credentials) {
    return new Promise((resolve, reject) => {
      axios
        .post("auth/changes-password", Credentials)
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
        .get("users", payload)
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
        .get(`users/${Id}/soft-delete`)
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
  /*------------------------Uploading Image--------------*/
  UploadUserImage({}, credentials) {
    return new Promise((resolve, reject) => {
      axios
        .post(`users/${credentials.get("id")}/image-upload`, credentials)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },

  createRole({}, Credentials) {
    return new Promise((resolve, reject) => {
      axios
        .post("roles", new RoleEntityModel(Credentials))
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
  /*====================== ROLES OF USERS ======================*/
  GetRoles() {
    return new Promise((resolve, reject) => {
      axios
        .get("roles/search")
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },

  /*=====================POLICIES OF USERS ====================*/
  GetPolicies() {
    return new Promise((resolve, reject) => {
      axios
        .get("policies")
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },

  /*=====================GET ROLE BYID ====================*/
  async getroleById({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`roles/${id}`)
        .then((resp) => {
          // console.log("Request succeeded");
          commit("SET_BREADCRUMB", resp.data.name, {
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

  /*=====================ACTIVATE OR ARCHIVE ROLE ====================*/
  ActiveOrArchiveRole({}, Id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`roles/${Id}/soft-delete`)
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

  GetUserSearch({}, payload) {
    let url = "users/search?";
    if (payload != null && payload != undefined) {
      if (payload.query != "" && payload.query != null) {
        url += `query=${payload.query}&`;
      }
      if (payload.status != "" && payload.status != null) {
        url += `status=${payload.status}&`;
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
          resolve(resp.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },  

  async EditRole({}, payload) {
    return new Promise((resolve, reject) => {
      axios
        .patch(`roles/${payload.id}`, new RoleEntityModel(payload))
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


/*=========================================================================================
  File Name: moduleSitesettingActions.js
  Description: Site Setting Actions
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

import axios from "@/plugins/axios";


export default {
    /* =========================  Site Setting View ========================= */
  async SiteSettingView({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(`settings/site-settings/${payload}`)
        .then((resp) => {           
          commit("SET_SITELOGO", resp.data);
          commit("SET_DATEFORMET", resp.data);
          commit("SET_SITE_SETTINGS", resp.data);
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  /* =========================  Site Image Upload ========================= */
  UploadSiteImage({}, credentials) {
   
    return new Promise((resolve, reject) => {
      axios
        .post(
          `settings/site-settings/1/image-upload`,
          credentials
        )
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  /* ========================Incoming Category=========================*/
  async GetIncomeCategory({}, Id) {
    
      return new Promise((resolve, reject) => {
          axios
              .get(`income-categories/${Id}`)
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
  async GetIncomeCategories({}) {
    
    return new Promise((resolve, reject) => {
        axios
            .get(`income-categories`)
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

async AddIncomeCategory({}, Credentials) {
  return new Promise((resolve, reject) => {
      delete Credentials.isAdd;
      delete Credentials.id;
      delete  Credentials.is_active
      axios
          .post("income-categories", Credentials)
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
async EditIncomeCategory({}, credentials) {
  return new Promise((resolve, reject) => {
      axios
          .patch(`income-categories/${credentials.Id}`,credentials.data)
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
/* ==========================Expense Category ==============================*/
    async AddExpenseCategory({}, Credentials) {
        return new Promise((resolve, reject) => {
            delete Credentials.isAdd;
            delete Credentials.id;
            delete  Credentials.is_active
            axios
                .post("expense-categories", Credentials)
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
    async GetExpenseCategory({}, Id) {
      
        return new Promise((resolve, reject) => {
            axios
                .get(`expense-categories/${Id}`)
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
    async GetExpenseCategories({}) {
        
        return new Promise((resolve, reject) => {
            axios
                .get(`expense-categories`)
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
    async EditExpenseCategory({}, credentials) {
        return new Promise((resolve, reject) => {
            axios
                .patch(`expense-categories/${credentials.Id}`,credentials.data)
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
 /* =========================  Date formats ========================= */

   async GetDateFormats({}) {
    return new Promise((resolve, reject) => {
      axios
        .get(`settings/date-formats`)
        .then((res) => {
         
          resolve(res);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  async GetPurchaseReturnReasons({}) {
    return new Promise((resolve, reject) => {
      axios
        .get(`return-reason/search`)
        .then((res) => {
         
          resolve(res);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  /* =========================  Site Image Upload ========================= */
  async EditSiteSetting({}, Credentials) {
    let id = Credentials.id;
    delete Credentials.id;
    delete Credentials.dateFormat;
    delete Credentials.category;
    delete Credentials.image;
    
    return new Promise((resolve, reject) => {
      axios
        .patch(`settings/site-settings/1`, Credentials)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },

     /* =========================  Organizations View ========================= */
     async OrganizationView({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`organizations/${payload}`)
          .then((resp) => {           
            resolve(resp);
          })
          .catch((err) => {
            reject(err.response);
          });
      });
    },
  
     /* =========================  Organizations Edit ========================= */
     async EditOrganization({}, Credentials) {
      let id = Credentials.id;
      delete Credentials.id;
      return new Promise((resolve, reject) => {
        axios
          .patch(`organizations/1`, Credentials)
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            console.log("Error");
            reject(err.response);
          });
      });
    },
    UploadOrganizationImage({}, credentials) {
      return new Promise((resolve, reject) => {
        axios
          .post(`organizations/${credentials.get("id")}/image-upload`, credentials)
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err.response);
          });
      });
    },
}
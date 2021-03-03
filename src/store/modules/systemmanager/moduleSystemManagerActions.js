/*=========================================================================================
  File Name: moduleStaffActions.js
  Description: Staff Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Speed HRM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

import axios from "@/plugins/axios";


export default {
  


  async AddEmplyeeType({}, Credentials) {
   
    debugger
    return new Promise((resolve, reject) => {
      axios
        .post("employment-types", Credentials)
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
  async GetSinleEmployeeType({},Credentials) {
    debugger
    return new Promise((resolve, reject) => {
      axios
        .get(`employment-types/${Credentials}`)
        .then((resp) => {
        
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  async UpdateEmplyeeType({}, Credentials) {
    debugger
    let empid = Credentials.data.id;
    delete Credentials.id;
    return new Promise((resolve, reject) => {
      axios
        .patch(`employment-types/${empid}`, Credentials.data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  

  /*================Desigination=====================*/
  async AddDesigination({}, Credentials) {
   
    debugger
    return new Promise((resolve, reject) => {
      axios
        .post("designations", Credentials)
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
  async GetSinleDesigination({},Credentials) {
    debugger
    return new Promise((resolve, reject) => {
      axios
        .get(`designations/${Credentials}`)
        .then((resp) => {
        
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  async UpdateDesigination({}, Credentials) {
    debugger
    let empid = Credentials.data.id;
    delete Credentials.id;
    return new Promise((resolve, reject) => {
      axios
        .patch(`designations/${empid}`, Credentials.data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },

  /*=================================Saluation ======================================*/
 
  async AddSaluation({}, Credentials) {
   
    debugger
    return new Promise((resolve, reject) => {
      axios
        .post("salutations", Credentials)
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
  async GetSinleSaluatation({},Credentials) {
    debugger
    return new Promise((resolve, reject) => {
      axios
        .get(`salutations/${Credentials}`)
        .then((resp) => {
        
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  async UpdateSaluation({}, Credentials) {
    debugger
    let empid = Credentials.data.id;
    delete Credentials.id;
    return new Promise((resolve, reject) => {
      axios
        .patch(`salutations/${empid}`, Credentials.data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },


  /*=============================Offices ==========================================*/
  
  async AddOffice({}, Credentials) {
   
    debugger
    return new Promise((resolve, reject) => {
      axios
        .post("offices", Credentials)
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
  async GetSinleOffice({},Credentials) {
    debugger
    return new Promise((resolve, reject) => {
      axios
        .get(`offices/${Credentials}`)
        .then((resp) => {
        
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  async UpdateOffice({}, Credentials) {
    debugger
    let empid = Credentials.data.id;
    delete Credentials.id;
    return new Promise((resolve, reject) => {
      axios
        .patch(`offices/${empid}`, Credentials.data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },

    /*=============================Event Types ==========================================*/
  
    async AddEventType({}, Credentials) {
   
      debugger
      return new Promise((resolve, reject) => {
        axios
          .post("event-types", Credentials)
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
    async GetSingleEventType({},Credentials) {
      
      return new Promise((resolve, reject) => {
        axios
          .get(`event-types/${Credentials}`)
          .then((resp) => {
          
            resolve(resp);
          })
          .catch((err) => {
            console.log("Error");
            reject(err.response);
          });
      });
    },
    async UpdateEventType({}, Credentials) {
      debugger
      let empid = Credentials.data.id;
      delete Credentials.id;
      return new Promise((resolve, reject) => {
        axios
          .patch(`event-types/${empid}`, Credentials.data)
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            console.log("Error");
            reject(err.response);
          });
      });
    },
};

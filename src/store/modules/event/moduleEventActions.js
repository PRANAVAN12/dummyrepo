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
  //reset the password by get token from api


  async CreateEvent({}, Credentials) {
   
    
    return new Promise((resolve, reject) => {
      axios
        .post("events", Credentials)
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
  
  async GetSingleEvent({},Id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`events/${Id}`)
        .then((resp) => {
        
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  async GetEventType({}) {
    return new Promise((resolve, reject) => {
      axios
        .get("event-types")
        .then((resp) => {
          resolve(resp.data.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },

  GetEvents({}) {
    
    return new Promise((resolve, reject) => {
      axios
        .get("events")
        .then((resp) => {
          
          resolve(resp.data.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },


  async EditEvent({}, Credentials) {
    let Event_id = Credentials.id;
    delete Credentials.id;
    return new Promise((resolve, reject) => {
      axios
        .patch(`events/${Event_id}`, Credentials)
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

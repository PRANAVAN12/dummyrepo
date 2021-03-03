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


  async CreateStaff({}, Credentials) {
    return new Promise((resolve, reject) => {
      axios
        .post("staffs", Credentials)
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
  async GetAllRequests({}, Credentials) {
   
    
    return new Promise((resolve, reject) => {
      axios
        .post("leaves", Credentials)
        .then((resp) => {
        
          resolve(resp);
        })
        .catch((err) => {
          console.log("Leaveeeeeeeee",err);
          reject(err.response);
        });
    });
  },
  async GetLeaveRequestSingle({}, Id) {
    let url='leaves/'+Id
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((resp) => {
        
          resolve(resp.data.data);
        })
        .catch((err) => {
          console.log("Leaveeeeeeeee",err);
          reject(err.response);
        });
    });
  },
  async UserLeaveAllocation({}) {
    let url='auth/leave-balance';
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((resp) => {
          resolve(resp.data.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  async GetLeaveRequested({}, Id) {
    let url='leave-approval/'+Id
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((resp) => {
        
          resolve(resp.data.data);
        })
        .catch((err) => {
          console.log("Leaveeeeeeeee",err);
          reject(err.response);
        });
    });
  },
  async CreateLeaveRequst({}, Credentials) {
    return new Promise((resolve, reject) => {
      axios
        .post("leaves", Credentials)
        .then((resp) => {
        
          resolve(resp);
        })
        .catch((err) => {
          console.log("Leaveeeeeeeee",err);
          reject(err.response);
        });
    });
  },
  async cancelLeaveRequest({}, payload) {
    
    let url='leaves/'+payload.id+'/cancel';
    delete payload.id;
    return new Promise((resolve, reject) => {
      axios
        .post(url, payload)
        .then((resp) => {
        
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  async ApproveLeaveRequest({}, payload) {
    
    let url='leave-approval/'+payload.id+'/approve';
    delete payload.id;
    return new Promise((resolve, reject) => {
      axios
        .post(url, payload)
        .then((resp) => {
        
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  async EditLeaveRequest({}, Credentials) {
    let url='leaves/'+Credentials.id
    return new Promise((resolve, reject) => {
      axios
        .patch(url, Credentials.data)
        .then((resp) => {
        
          resolve(resp);
        })
        .catch((err) => {
          console.log("Leaveeeeeeeee",err);
          reject(err.response);
        });
    });
  },
  

  async LeaveBalance({}, Credentials) {
    let url='staffs/'+Credentials.id+'/leave-balances'
    return new Promise((resolve, reject) => {
      axios
        .post(url, Credentials.data)
        .then((resp) => {
        
          resolve(resp);
        })
        .catch((err) => {
          console.log("Leaveeeeeeeee",err);
          reject(err.response);
        });
    });
  },
  async GetLeaveRequestInformation({}, Credentials) {
   
    
    return new Promise((resolve, reject) => {
      axios
        .post("leaves/get-leave-dates", Credentials)
        .then((resp) => {
          resolve(resp.data.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  async GetLeaveType({}) {
   
    
    return new Promise((resolve, reject) => {
      axios
        .get("leave-types/search")
        .then((resp) => {
          console.log("Request succeeded");
          resolve(resp.data.data);
        })
        .catch((err) => {
          console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrr",err);
          reject(err.response);
        });
    });
  },
  async GetAllocatedLeaveTypes({},Id) {
    let url='staffs/'+Id+'/leave-balances'
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((resp) => {
          
          console.log("Request succeeded");
          resolve(resp.data);
        })
        .catch((err) => {
          console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrr",err);
          reject(err.response);
        });
    });
  },
  async GetStaffs({}) {
    return new Promise((resolve, reject) => {
      axios
        .get(`staffs`)
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


  async EditStaff({}, Credentials) {
    let Staff_id = Credentials.id;
    delete Credentials.id;
   
 
    return new Promise((resolve, reject) => {
      axios
        .patch(`staffs/${Staff_id}`, Credentials)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },

  async GetStaff({ commit }, Id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`staffs/${Id}`)
        .then((resp) => {
          // console.log("Request succeeded");
          commit("SET_BREADCRUMB", resp.data.reference_number, {
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
  ArchiveOrActice({}, Credentials) {
    return new Promise((resolve, reject) => {
      axios
        .get(`staffs/${Credentials.id}/soft-delete`)
        .then((resp) => {
          console.log("resp.data", resp.data.data);
          resolve(resp.data.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },


  UploadStaffImage({}, credentials) {
    return new Promise((resolve, reject) => {
      axios
        .post(`staffs/${credentials.get("id")}/image-upload`, credentials)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },




  GetStaffSearch({}, payload) {
    let url = "staffs/search?";
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
          resolve(resp.data.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },

  async GetMovements({}) {
    return new Promise((resolve, reject) => {
      axios
        .get("movements")
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },

  async CreateAttendance({}, Credentials) {
    return new Promise((resolve, reject) => {
      axios
        .post("attendances/register", Credentials)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },

  async TodayAttendances({}) {
    debugger
    return new Promise((resolve, reject) => {
      axios
        .get("attendances/today-attendances")
        .then((resp) => {
          resolve(resp.data.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },

  async GetAttendance({}) {
    return new Promise((resolve, reject) => {
      axios
        .get("attendances")
        .then((resp) => {
          resolve(resp.data.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  
};

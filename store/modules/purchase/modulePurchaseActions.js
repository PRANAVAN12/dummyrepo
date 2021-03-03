/*=========================================================================================
  File Name: modulePurchaseActions.js
  Description: Purchase Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

import axios from "@/plugins/axios";
import {PaymentEntityModel} from "../../../models/EntityModels/PaymentEntityModel";
import {PurchaseEntityModel} from "../../../models/EntityModels/Purchases/PurchaseEntityModel";


export default {
  async CreatePurchase({ }, Credentials) {
    return new Promise((resolve, reject) => {
      axios
        .post("purchases", Credentials)
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
  async ChangeStatus({ }, payload) {
    let id = payload.id;
    delete payload.id;
    //delete payload.note;
    return new Promise((resolve, reject) => {
      axios.patch(
        `purchases/${id}/change-status`,
        payload
      )
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
  async GetPurchase({ }, Id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`purchases/${Id}`)
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
  async GetPurchasePaymentById({ }, credential) {
    return new Promise((resolve, reject) => {
      axios
          .get(`purchases/${credential.Id}/payment/${credential.paymentId}`)
          .then((resp) => {
            console.log("Request succeeded");
            resolve(resp.data);
          })
          .catch((err) => {
            console.log("Error");
            reject(err.response);
          });
    });
  },
    async GetPaymentById({ }, credential) {
        return new Promise((resolve, reject) => {
            axios
                .get(`payments/${credential.paymentId}`)
                .then((resp) => {
                    console.log("Request succeeded");
                    resolve(resp.data);
                })
                .catch((err) => {
                    console.log("Error");
                    reject(err.response);
                });
        });
    },
  async EditPurchase({ }, Credential) {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `purchases/${Credential.Id}`,
          new PurchaseEntityModel(Credential)
        )
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
  async GetDebitAccounts({},payload) {
    return new Promise((resolve, reject) => {
      axios

        .get(
          `accounts/search?field=account_type&data=${payload.accountType}`
        )
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
  async GetDebitAccountsSearch({ }) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          'accounts/search?field=account_type&data=purchase Expenses&query='
        )
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
  async AddPayment({ }, Credentials) {
    return new Promise((resolve, reject) => {
      axios.post(`purchases/${Credentials.purchaseId}/payment`, new PaymentEntityModel(Credentials))
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
  async AdditionalAmount({ }, Credentials) {
    return new Promise((resolve, reject) => {
      delete Credentials.data.isEdit;
      delete Credentials.data.id;
      axios.post(`purchases/${Credentials.Id}/additional-amounts`,Credentials.data)
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
  async EditAdditionalAmount({ }, Credentials) {
    return new Promise((resolve, reject) => {
      delete Credentials.data.isEdit;
      let id=Credentials.data.id;
      delete Credentials.data.id;
      axios.patch(`purchases/${Credentials.Id}/additional-amounts/${id}`,Credentials.data)
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
  async DeleteAdditionalAmount({ }, Credentials) {
    return new Promise((resolve, reject) => {
      axios.delete(`purchases/${Credentials.purchaseId}/additional-amounts/${Credentials.id}`)
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
  async UpdatePurchaseStatus({ }, Credentials) {
        return new Promise((resolve, reject) => {
      axios.patch(`purchases/${Credentials.purchaseId}/change-status
`,Credentials.data)
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
  async EditPayment({ }, Credentials) {
    debugger
    return new Promise((resolve, reject) => {
      let PId= Credentials.purchaseId
      let paymentId=Credentials.data.id;
      delete Credentials.supplierName
      delete Credentials.purchase_id
      delete Credentials.data.id
      debugger
      let data=new Object()
      data.reference_number = Credentials.data.reference_number,
          data.date_time =Credentials.data.date_time,
          data.payment_type = Credentials.data.payment_type
      if(Credentials.data.payment_type=="Cheque")
      {
            data.cheque_bank=Credentials.data.cheque_bank,
            data.cheque_type=Credentials.data.cheque_type,
            data.cheque_date=Credentials.data.cheque_date,
            data.cheque_no=Credentials.data.cheque_no
      }
      if(Credentials.data.payment_type=="Card")
      {
        data.card_bank=Credentials.data.card_bank
      }
      data.amount=Credentials.data.amount,
          data.remarks=Credentials.data.remarks,

      axios.patch(`purchases/${PId}/payment/${paymentId}`,data)
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


  async GetPaymentSingle({ }, credential) {
    return new Promise((resolve, reject) => {
      axios
          .get(`payments/${credential.paymentId}`)
          .then((resp) => {
            console.log("Request succeeded");
            resolve(resp.data);
          })
          .catch((err) => {
            console.log("Error");
            reject(err.response);
          });
    });
  },
  ArchiveOrActicePurchase({ }, Id) {
   
    return new Promise((resolve, reject) => {
      axios

        .get(`purchases/${Id}/soft-delete`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  async GetPayment({ }, purchaseId) {
    return new Promise((resolve, reject) => {
      axios.get(`purchases/${purchaseId}/payment`)
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

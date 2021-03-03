/*=========================================================================================
  File Name: moduleSalesActions.js
  Description: Supplier Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

import axios from "@/plugins/axios";
import moment from "moment";
import { PaymentEntityModel } from "../../../models/EntityModels/PaymentEntityModel";
export default {
  async GetSaless({ }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`sales`)
        .then((resp) => {
          console.log("Request succeeded");
          resolve(resp.data.data);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  async AddSalesPayment({ }, Credentials) {
    return new Promise((resolve, reject) => {
      axios.post(`sales/${Credentials.salesId}/payments`, new PaymentEntityModel(Credentials))
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
  async EditSalesPayment({ }, Credentials) {
    debugger
    return new Promise((resolve, reject) => {
      let SId = Credentials.salesId
      let paymentId = Credentials.data.id;
      delete Credentials.supplierName
      delete Credentials.salesId
      delete Credentials.data.id
      debugger
      let data = new Object()
      data.reference_number = Credentials.data.reference_number,

        data.date_time = moment(String(Credentials.data.date_time)).format('YYYY/MM/DD'),
        data.payment_type = Credentials.data.payment_type
      if (Credentials.data.payment_type == "Cheque") {
        data.cheque_bank = Credentials.data.cheque_bank,
          data.cheque_type = Credentials.data.cheque_type,
          data.cheque_date = Credentials.data.cheque_date,
          data.cheque_no = Credentials.data.cheque_no
      }
      if (Credentials.data.payment_type == "Card") {
        data.card_bank = Credentials.data.card_bank
      }
      data.amount = Credentials.data.amount,
        data.remarks = Credentials.data.remarks,

        axios.patch(`sales/${SId}/payments/${paymentId}`, data)
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
  async GetSale({ }, id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`sales/${id}`)
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
  async ChangeStatus({ }, payload) {
    let id = payload.id;
    delete payload.id;
    return new Promise((resolve, reject) => {
      axios.patch(
        `sales/${id}/change-status`,
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
};

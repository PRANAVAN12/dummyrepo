
import * as moment from "moment/moment";
import { PaymentViewModel } from '../models/View Models/PaymentViewModel';
export class Cheque {
    constructor() {
        this.bank = '';
        this.date = moment(new Date()).format("YYYY-MM-DD");
        this.number = '';
        this.type = 'Cash';
        this.chequeDate = moment(new Date()).format("YYYY-MM-DD");
        this.amount = 0;
        this.remarks = '';
        return this;
    }
    toViewModel(cheque) {
        debugger
        this.id = cheque.id;
        this.bank = cheque.cheque_bank;
        this.date = cheque.cheque_date;
        this.number = cheque.cheque_no;
        this.type = cheque.cheque_type;
        this.status = cheque.status;
        this.chequeFor = cheque.paymentable_type;
        this.amount = cheque.amount;
        debugger
        if (cheque) {
            if (cheque.paymentable_type == 'purchase' && cheque && cheque.purchase && cheque.purchase.supplier) {
                this.supplier = cheque.purchase.supplier.name;
            } else if (cheque.paymentable_type == 'sale') {
                this.customer = cheque.sale.customer;

            }
        }
        return this;
    }

    toRequestModel(cheque) {
        let tempCheque = {}
        tempCheque.date_time = cheque.date;
        tempCheque.payment_type = 'Cheque'
        tempCheque.amount = cheque.amount;
        tempCheque.cheque_bank = cheque.bank;
        tempCheque.cheque_date = cheque.chequeDate;
        tempCheque.cheque_no = cheque.number;
        tempCheque.cheque_type = cheque.type;
        tempCheque.remarks = cheque.remarks;

        return tempCheque;
    }
}



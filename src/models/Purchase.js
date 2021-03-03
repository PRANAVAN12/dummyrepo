import * as moment from "moment/moment";
import store from "../store/store"



export class Purchase {
    constructor() {
        debugger
        this.type,
            this.date = moment().format("YYYY-MM-DD"),
            this.Id,
            this.remark,
            this.total = 0,
            this.referenceNumber,
            this.paid,
            this.batch,
            this.wareHouse_id,
            this.supplier_id,
            this.purchase_order_id,
            this.purchase_return_id,
            this.products = [],
            this.product = null,
            this.additional_amount = 0,
            this.debit_account,
            this.tax = 0,
            this.discountPercentage=0;
        this.discountAmount=0;
            this.totalDiscountAmount=0;
            this.isWithoutPurchaseOrder = false,
            this.type = store.state.sitesetting.defaultPurchase

    }
}

        
import moment from "moment";
export class PaymentEntityModel {
    constructor(u) {
        debugger
        this.reference_number = u.referenceNumber,
        this.date_time = moment(String(u.date)).format('YYYY/MM/DD'),
        this.payment_type = u.PaymentMethod
        if(this.payment_type=="Cheque")
        {
            this.cheque_no=u.checkqNumber,
            this.cheque_bank=u.checkqBank,
                this.cheque_type=u.chequeType,
            this.cheque_date=u.checkqDate
        }
        if(this.payment_type=="Card")
        {
            this.card_bank=u.cardBank
        }
        this.amount=u.amount,
        this.remarks=u.remarks,
        this.supplier_id=u.supplierId,
        this.debit_account_id=u.account_id
        if(u.purchase_id)
        {
            this.purchase_id=u.purchase_id
        }
    }

}


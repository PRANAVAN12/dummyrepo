        
export class PaymentViewModel {
    constructor(u) {
        debugger
        this.reference_number = u.reference_number,
        this.date_time =u.date_time,
        this.payment_type = u.payment_type
        if(this.payment_type=="Cheque")
        {
            this.cheque_no=u.cheque_no,
            this.cheque_bank=u.cheque_bank,
            this.cheque_date=u.cheque_date
        }
        if(this.payment_type=="Cheque")
        {
            this.card_bank=u.card_bank
        }
        this.amount=u.amount,
        this.remarks=u.remarks
        if(u.supplier_id)
        {
            this.supplier_id=u.supplier_id

        }
        if(u.purchase && u.purchase.supplier_id)
        {
            this.supplier_id=u.purchase.supplier_id
            
        }
        if(u.purchase && u.purchase.supplier&& u.purchase.supplier.name)
        {
            this.supplierName=u.purchase.supplier.name
        }
        this.debit_account_id=u.debit_account_id
        if(u.purchase_id)
        {
    this.purchase_id=u.purchase_id
        }
        if(u.id)
        {
            this.paymentId=u.id
        }
    } 
}

// import { PaymentViewModel } from './PaymentViewModel';
// export class ChequeViewModel {
//     constructor(cheque) {
//         debugger
//         this.id = cheque.id;
//         this.bank = cheque.cheque_bank;
//         this.date = cheque.cheque_date;
//         this.no = cheque.cheque_no;
//         this.type = cheque.cheque_type;
//         this.status = cheque.status;
//         if (cheque.payment) {
//             this.payment = new PaymentViewModel(cheque.payment);
//             this.amount = cheque.payment.amount;
//             this.chequeFor = cheque.payment.purchase ? 'purchase' : 'sales';
//             this.supplier = cheque.payment.purchase.supplier.name;
//         }
//     }
// }



import { PaymentViewModel } from './PaymentViewModel';
export class ChequeViewModel {
    constructor(cheque) {
        debugger
        this.id = cheque.id;
        this.bank = cheque.cheque_bank;
        this.date = cheque.cheque_date;
        this.no = cheque.cheque_no;
        this.type = cheque.cheque_type;
        this.status = cheque.status;
        if (cheque) {
            // this.payment = new PaymentViewModel(cheque.payment);
            this.amount = cheque.amount;
            debugger
            this.chequeFor = cheque.paymentable_type;
            if (cheque.paymentable_type == 'purchase' && cheque &&  cheque.purchase && cheque.purchase.supplier) {
                this.supplier = cheque.purchase.supplier.name;
            } else {
                // this.supplier = cheque?.payment?.purchase?.supplier?.name;
            }
        }
    }
}



import * as moment from "moment/moment";

export class Payment {
        constructor() {
                this.date=moment().format("YYYY-MM-DD"),
                this.PaymentMethod,
                this.amount,
                this.cardNumber,
                this.holderName,
                this.cardType,
                this.month,
                this.year,
                this.cvv2,
                this.supplierId,
                this.checkqNumber,
                this.referenceNumber,
                this.date,
                this.attachment,
                this.remarks,
                this.purchaseId,
                this.cardBank,
                this.checkqBank,
                this.checkqDate,
                this.creditAccount

            }
}

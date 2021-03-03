import { PurchasedProductViewModel } from './PurchaseProductViewModel';
import { Payment } from '../Payment';
import * as moment from "moment/moment";
import _ from "lodash";
export class PurchaseViewModel {
        constructor(purchase) {
            debugger
                this.referenceNumber = purchase.reference_number ? purchase.reference_number : ''
                this.type=purchase.purchase_from?purchase.purchase_from:'', this.purchaseReturnReferenceNumber = purchase.purchaseOrder && purchase.purchaseOrder.reference_number ? purchase.purchaseOrder.reference_number : ''
                this.date = purchase.date ? moment(purchase.date).format("YYYY-MM-DD") : '', this.remark = purchase.remark ? purchase.remark : ''
                this.account_id=purchase.account_id;
            this.status=purchase.status
            this.statusChange=purchase.status
            this.statusNote=purchase.status_note
            this.statusNoteChange=purchase.status_note
                this.total = purchase.sub_total_amount ? purchase.sub_total_amount : 0
                this.paid = purchase.paid_amount>0 ? purchase.paid_amount : 0
                this.balance = this.total-this.paid;
                this.additional_amount=purchase.additional_amount?purchase.additional_amount:0
                this.debit_account=purchase.account_id?purchase.account_id:null
                this.reason=purchase.reason?purchase.reason:''
                this.tax=purchase.tax?purchase.tax:0,
                    this.isUpdate=false;
            this.totalDiscountAmount=0,
                this.payments=purchase.payments?purchase.payments.filter(p=>p.payment_type!="System Transaction"):new Payment();
                this.additionalAmounts=purchase.additionalAmounts?purchase.additionalAmounts:[];
                this.discountAmount=purchase.discount_amount.toFixed(2);
                this.discountPercentage=(this.discountAmount/this.total)*100;
                this.wareHouse_id = purchase.wareHouse_id ? purchase.wareHouse_id : '',
                    this.supplier_id = purchase.supplier_id ? purchase.supplier_id : ''
            
                    if(purchase.purchase_order_id)
                    {
                            this.isWithoutPurchaseOrder=false;
                            this.purchase_order_id = purchase.purchase_order_id
                    }
                    else{
                            this.isWithoutPurchaseOrder=true;
                    }
                        this.products = purchase.products.map((u, i, arr) => {
                                return new PurchasedProductViewModel(u);
                        })
                this.suppliers = purchase.supplier ? purchase.supplier : "----"
                this.warehouses = purchase.wareHouse ? purchase.wareHouse : "----";


                this.supplier = purchase.supplier ? purchase.supplier : null
                this.warehouse = purchase.wareHouse ? purchase.wareHouse : null

                // this.products = purchase.products.map((u, i, arr) => {
                //         let tempselctedProduct = new PurchasedProductViewModel(u.product);
                //         tempselctedProduct.quantity = u.quantity;
                //         return tempselctedProduct;
                // })
           
            }

}

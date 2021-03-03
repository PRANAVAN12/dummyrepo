import { PurchasedProductEntityModel } from './PurchasedProductEntityModel';

export class PurchaseEntityModel {
        constructor(purchase) {
                
                this.date=purchase.date?purchase.date:'',
                    this.purchase_from=purchase.type?purchase.type:''
                this.remark=purchase.remark?purchase.remark:''
                this.wareHouse_id=purchase.wareHouse_id?purchase.wareHouse_id:'',
                    this.discount_amount=purchase.discountAmount?purchase.discountAmount:0,
                this.supplier_id=purchase.supplier_id?purchase.supplier_id:''
            if(purchase.type=="Purchase Order")
            {
                this.purchase_order_id  = purchase.purchase_order_id;
            }
            if(purchase.type=="Purchase Return")
            {
                this.purchase_return_id  = purchase.purchase_return_id;
            }


                this.products=purchase.products.map((u, i, arr) => {
                        return new PurchasedProductEntityModel(u);
                      })


            }
}

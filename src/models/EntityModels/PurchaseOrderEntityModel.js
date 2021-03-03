import { PurchaseOrderProductEntityModel } from './PurchaseOrderProductEntityModel';

export class PurchaseOrderEntityModel {
        constructor(purchaseOrder) {
          
                this.date=purchaseOrder.date?purchaseOrder.date:'',
                this.wareHouse_id=purchaseOrder.wareHouse_id?purchaseOrder.wareHouse_id:'',
                this.supplier_id=purchaseOrder.supplier_id?purchaseOrder.supplier_id:'',
                this.products=purchaseOrder.products.map((u, i, arr) => {
                    return  new PurchaseOrderProductEntityModel(u);
                  }),
                
                this.remarks=purchaseOrder.remarks?purchaseOrder.remarks:''    
                if(purchaseOrder.status)    {
                  this.status=purchaseOrder.status
                }       
            }
}

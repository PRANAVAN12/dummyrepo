import * as moment from "moment/moment";
import _ from "lodash";
import { PurchaseOrderViewModel } from "./PurchaseOrderViewModel";
import { ProductBatchViewModel } from "./ProductBatchViewModel";

import {ProductViewModel} from "./ProductViewModel";

export class PurchaseReturnViewModel {
    constructor() {
        this.date = moment().format("YYYY-MM-DD");
        this.warehouseId;
        this.warehouses = [];
        this.supplierId;
        this.suppliers = [];
        this.isExchange=true;
        this.document;
        this.selectedProduct = { batches: [] };
        this.selectedProductUnits=[],
            this.selectedProductUnit='',
        this.products = [];
        this.selectedProducts = [];
        this.remarks = ""
        this.referencenumber = ""
        this.returnsurcharge ="", this.additional_amount=0,
        this.reason="",
            this.returnReason='',
        this.debit_account='',
        this.amount = "",
            this.otherReason=''
    }

    set(purchaseReturnResponse) {
        const purchaseReturn = new PurchaseReturnViewModel();
        purchaseReturn.id = purchaseReturnResponse.id;
        purchaseReturn.returnsurcharge = purchaseReturnResponse.return_surcharge?purchaseReturnResponse.return_surcharge:"----";
        purchaseReturn.referencenumber = purchaseReturnResponse.reference_number?purchaseReturnResponse.reference_number:"----";
        purchaseReturn.amount = purchaseReturnResponse.sub_total_amount ?(purchaseReturnResponse.additional_amount+purchaseReturnResponse.sub_total_amount):"----";
        purchaseReturn.date = moment(purchaseReturnResponse.date).format("YYYY-MM-DD");
        purchaseReturn.warehouseId = purchaseReturnResponse.wareHouse_id;
        purchaseReturn.warehouses = purchaseReturnResponse.wareHouse;
        purchaseReturn.supplierId = purchaseReturnResponse.supplier_id;
        purchaseReturn.suppliers = purchaseReturnResponse.supplier;
        purchaseReturn.isExchange = purchaseReturnResponse.is_exchange;
        purchaseReturn.reason=purchaseReturnResponse.reason;
        purchaseReturn.debit_account=purchaseReturnResponse.debit_account;
        purchaseReturn.additional_amount=purchaseReturnResponse.additional_amount;
        purchaseReturn.selectedProduct = { batches: [] };
        purchaseReturn.selectedProducts = [];
        purchaseReturn.total=0;
        purchaseReturnResponse.purchaseReturnItem.forEach(purchaseReturnItem => {
            let product = new ProductViewModel(purchaseReturnItem.product);
    
            if(purchaseReturnItem.return_reason_id>4)
            {
                product.returnReason=4
                product.reason=purchaseReturnItem.returnReason.name;
            }
            else{
                product.returnReason=purchaseReturnItem.returnReason.id
            }
          
            product.id = purchaseReturnItem.product.id;
            product.code = purchaseReturnItem.product.code;
           
            product.quantity = purchaseReturnItem.quantity;
            product.unit=purchaseReturnItem.product.batch.unit.id;
            product.units=purchaseReturnItem.product.batch.units
            product.unitPrice=purchaseReturnItem.product.batch.unit.batch_units.purchase_price;
            product.total= product.unitPrice*product.quantity;
            product.selectedBatch=new ProductBatchViewModel(purchaseReturnItem.batch)
            product.batch=product.selectedBatch;
            purchaseReturn.total=( product.unitPrice*product.quantity)+purchaseReturn.total
            purchaseReturn.selectedProducts.push(_.cloneDeep(product))
         if(purchaseReturnItem.units)
         {
            product.units=purchaseReturnItem.units;
         }
            if(purchaseReturnItem.defaultUnit && purchaseReturnItem.units)
            {
                // product.units.push(product.defaultUnit)
            product.unit=purchaseReturnItem.defaultUnit.id;

            }
            if(purchaseReturnItem.product && purchaseReturnItem.product.batches)
            {
                let selecteBatch = purchaseReturnItem.product.batches.find(b => b.id == purchaseReturnItem.batch_id)
                product.selectedBatch = selecteBatch;

            }
            // purchaseReturn.selectedProducts.push(product);
        });
        purchaseReturn.remarks = purchaseReturnResponse.remarks;
        return purchaseReturn;
    }


}


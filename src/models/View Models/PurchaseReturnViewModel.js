import { ProductViewModel } from './ProductViewModel';

import * as moment from "moment/moment";
export class PurchaseReturnViewModel {
    constructor(purchaseRetun) {

        this.id = purchaseRetun.id ? purchaseRetun.id : '----'
        this.name = purchaseRetun.reference_number ? purchaseRetun.reference_number : '----'
        this.date = purchaseRetun.date ? moment(purchaseRetun.date).format("YYYY-MM-DD") : '----',
            this.reference_number = purchaseRetun.reference_number ? purchaseRetun.reference_number : '----',
            this.wareHouse_id = purchaseRetun.wareHouse_id ? purchaseRetun.wareHouse_id : '----',
            this.is_active = purchaseRetun.is_active ? purchaseRetun.is_active : '----',
            this.supplier_id = purchaseRetun.supplier_id ? purchaseRetun.supplier_id : '----',
            this.document = purchaseRetun.document ? purchaseRetun.document : '----',
            this.warehouses = purchaseRetun.wareHouse?purchaseRetun.wareHouse:"----";
        this.suppliers = purchaseRetun.supplier? purchaseRetun.supplier:"----"
        this.products = purchaseRetun.purchaseReturnItem.map((u, i, arr) => {
            let tempselctedProduct = new ProductViewModel(u.product);
            tempselctedProduct.quantity = u.quantity;

            if(u.unit)
            {
                tempselctedProduct.unitName=u.unit.name
                tempselctedProduct.unit=u.unit;

            }
            debugger
            let sameProducts=purchaseRetun.purchaseReturnItem.filter(p=>p.product.id==u.product.id);
            let units=[]
            if(sameProducts)
            {

                sameProducts.map(p=>{
                    units.push(p.unit)

                })
            }
            tempselctedProduct.selectedProductUnits=units
            tempselctedProduct.units=units
            return tempselctedProduct;
        }),

            this.remarks = purchaseRetun.remarks ? purchaseRetun.remarks : '',
            this.code = purchaseRetun.code ? purchaseRetun.code : ''
        this.status = purchaseRetun.status ? purchaseRetun.status : ''
    }


}

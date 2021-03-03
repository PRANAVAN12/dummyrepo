        
export class BatchUnitPriceDetails {
    constructor(u) {
        debugger
        if(u.isPurchasingUnit){
            this.purchase_price=u.purchasePrice;
        }
        this.selling_price=u.sellingPrice;
        if(u.isPurchasingUnit) {
            this.profit_margin_percentage = u.profit_margin_percentage;
        }
        this.barcode=u.barcode
        if(u.id)
        {
            this.unit_id=u.id

        }
        if(u.unit)
        {
            this.unit_id=u.unit
        }
    }


}


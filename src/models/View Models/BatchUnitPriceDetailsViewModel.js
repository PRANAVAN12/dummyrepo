        
export class BatchUnitPriceDetaiilsViewModel{
    constructor(u) {
         
        this.purchasePrice =u.batch_units.purchase_price?u.batch_units.purchase_price:0;
        this.sellingPrice =u.batch_units.selling_price?u.batch_units.selling_price:0;
        this.profit_margin_percentage =u.batch_units.profit_margin_percentage?u.batch_units.profit_margin_percentage:0;
        this.barcode=u.batch_units.barcode?u.batch_units.barcode:'';
        this.unit=u.id;
        this.isPurchasingUnit=u.is_purchasing_unit?u.is_purchasing_unit:false
        if(u.batch_units.is_purchasing_unit){
            this.isPurchasingUnit=u.batch_units.is_purchasing_unit?u.batch_units.is_purchasing_unit:false

        }
        this.name=u.name;
        this.isNew=u.batch_units.isNew?u.batch_units.isNew:false
    }
}


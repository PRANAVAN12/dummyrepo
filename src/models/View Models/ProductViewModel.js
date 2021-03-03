import { ProductBatchViewModel } from './ProductBatchViewModel';

export class ProductViewModel {
  constructor(product) {
    this.product_id = product.id ? product.id : '',
    this.name = product.name ? product.name : '',
        this.receivedError=[];
    this.damageError=[]
    this.quantityError="";
    this.productCategory = product.category ? product.category : ''
    this.quantity = product.quantity ? product.quantity : ''
    this.unit={id:0}
    if(product.unit)
    {
      this.unit = product.unit ? product.unit : null

    }
    else{
      this.unit=product.defaultUnit?product.defaultUnit:null
    }
    this.id = product.id ? product.id : '',
    this.code = product.code ? product.code : '',
    this.brand_Id = product.brand_id ? product.brand_id : '',
    this.reorder_level = product.reorder_level ? product.reorder_level : ''
    this.description = product.description ? product.description : ''
    this.remarks = product.remarks ? product.remarks : ''
    this.image = product.image ? product.image : ''
    debugger
    if (product.batches) {
      this.batches = product.batches.map((u, i, arr) => {
        if(product.units)
        {
          u.productUnits=product.units;
        }
        else if(u.batch && u.units)
        {
          u.productUnits=u.units
        }
       
        return new ProductBatchViewModel(u);
      })
    }
    if (product.suppliers) {
      this.suppliers = product.suppliers;
    }
    this.units = []
    this.selectedProductUnits = []
    console.log('RESRR',product)
    if (product.units) {
      product.units.forEach(unit => {
        let newUnit = new Object();
        newUnit.id = unit.product_units.unit_id;
        newUnit.name = unit.name;
        newUnit.reorderLevel = unit.product_units.reorder_level;
        newUnit.conversionOperator = unit.product_units.conversion_operator_id;
        newUnit.conversionValue = unit.product_units.conversion_value;
        newUnit.reverseConversionOperator = unit.product_units.reverse_conversion_operator_id;
        newUnit.reverseConversionValue = unit.product_units.reverse_conversion_value;
        newUnit.unitError = "";
        newUnit.conversionValueError = "";
        newUnit.conversionOperatorError = "";
        newUnit.reverseConversionOperatorError = "";
        newUnit.reverseConversionValueError = "";
        newUnit.index = this.units.length;
        newUnit.existing = true;
         
        newUnit.isPurchasingUnit=unit.product_units.is_purchasing_unit
        newUnit.purchasePrice = 0;
        newUnit.sellingPrice = 0;
        newUnit.profit_margin_percentage=0;
        newUnit.barcode = unit.product_units.barcode

        // newUnit.conversionOperator = unit.product_units.is_purchasing_unit
        // newUnit.reverseConversionOperator = unit.product_units.is_purchasing_unit

        if (unit.id == product.defaultUnit.id) {
          let tempDefaultUnit=product.units.find(u => u.id == product.defaultUnit.id);
          this.selectedDefaultUnit = { id: product.defaultUnit.id, name: product.defaultUnit.name,isPurchasingUnit:tempDefaultUnit.product_units.is_purchasing_unit, reorderLevel: tempDefaultUnit.product_units.reorder_level }
          this.units.push(newUnit);
        } else {
          this.units.push(newUnit);
          this.selectedProductUnits.push(newUnit);
        }
      });
      this.selectedProductUnits.forEach((element,i) => {
        element.index=i;
     });



      // if(product.defaultUnit)
      // {
      //   let newUnit = new Object();
      //   newUnit.name=product.defaultUnit.name;
      //   newUnit.unit=product.id;
      //   this.units.push(newUnit)
      // }
    
    }
  }
}
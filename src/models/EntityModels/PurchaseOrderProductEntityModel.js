export class PurchaseOrderProductEntityModel {
    constructor(product) {
        this.product_id=product.id?product.id:'',
        this.quantity=product.quantity?product.quantity:''
        this.unit_id=product.unit?product.unit.id:null
    }
  }
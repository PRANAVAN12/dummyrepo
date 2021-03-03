import { ProductBatchViewModel } from './ProductBatchViewModel'

export class PurchasedProductViewModel {
    constructor(product) {
            this.name=product.product && product.product.name?product.product.name:''
            this.batch= new ProductBatchViewModel(product.batch), this.amount=product.amount;
            this.product_id=product.product_id?product.product_id:'',
                this.receivedError=[];
            this.damageError=[];
        this.discountAmount=0;
            this.quantity=product.quantity?product.quantity:''
            this.received=product.quantity?product.quantity:''
            this.damage=product.damage?product.damage:0,
            this.batch_id=product.batch?product.batch:'',
            this.units=product.product.units?product.product.units:[],
            this.unit=product.unit,
        this.discountPercentage=product.discount_percentage,
        this.discount=product.discount_quantity,
            this.unit.id=product.unit_id?product.unit_id:null;
            
        }
}

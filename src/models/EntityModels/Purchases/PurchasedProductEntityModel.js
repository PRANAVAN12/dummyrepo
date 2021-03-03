
export class PurchasedProductEntityModel {
        constructor(product) {
                this.product_id=product.product_id?product.product_id:'',
                this.quantity=product.received?product.received:''
                this.damage=product.damage>=0?product.damage:''
                this.batch_id=product.batch&& product.batch.id?product.batch.id:''
                this.amount=product.total-product.discountAmount
                this.unit_id=product.unit?product.unit.id:null
                this.discount_percentage=product.discountPercentage?product.discountPercentage:0
                this.discount_quantity=product.discount?product.discount:0
            }
}

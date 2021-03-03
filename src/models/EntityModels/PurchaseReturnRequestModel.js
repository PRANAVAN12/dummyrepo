export class PurchaseReturn {
    constructor() {
        this.date,
            this.wareHouse_id,
            this.is_active,
            this.supplier_id,
            this.document,
            this.products = [],
            this.remark,
            this.code,
            this.reason,
            this.debit_account
    }

    get(purchaseReturn) {
        this.date = purchaseReturn.date;
        this.wareHouse_id = purchaseReturn.wareHouseId;
        this.supplier_id = purchaseReturn.supplierId;
        this.wareHouse_id = 1;
        this.products = [];
        // this.remarks = purchaseReturn.remarks;
        purchaseReturn.selectedProducts.forEach(product => {
            this.products.push({
                product_id: product.id,
                batch_id: product.selectedBatch.id,
                quantity: product.quantity
            })
        });
        return this;
    }
}

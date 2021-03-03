import { ProductBatchEntityModel } from './ProductBatchEntityModel';

export class ProductEntity {
    constructor(u) {
        console.log('___________________________________________________________');
        console.log(u);
        this.name = u.name ? u.name : '',
            this.code = u.code ? u.code : '',
            this.category_id = u.productCategory.id ? u.productCategory.id : '',
            this.brand_id = u.brand && u.brand.id ? u.brand.id : '',
            this.brand_id = u.brand_Id ? u.brand_Id : ''
        if (u.batches) {
            this.batches = u.batches.map((u, i, arr) => {
                return new ProductBatchEntityModel(u);
            });
        }
        console.log('+++++++++++++++++++++++++++++++++++++++++');
        console.log(u.units);
        this.supplier = u.suppliers,
            this.units = u.units,
            this.default_unit = u.defaultUnit ? u.defaultUnit : ''
        this.description = u.description;
        this.remarks = u.remarks;

    }
    toEntityModel(data) {
        const productDetails = new ProductEntity();
        productDetails.name = data.name;
        productDetails.category_id = data.productCategory.id;
        productDetails.code = data.code;
        productDetails.brand_id = data.brand.id;
        productDetails.batches = data.batches.map((u, i, arr) => {
            return new ProductBatchEntityModel(u);
        });
        productDetails.reorder_level = data.reorder_level,
            productDetails.unit_id = data.unit_id;
        if (data.suppliers.length) {
            data.suppliers.forEach(supplier => {
                if (supplier.id) {
                    productDetails.supplier.push(supplier.id)

                }
                else {
                    productDetails.supplier.push(supplier)

                }
            });
        }
        console.log('=============================================================');
        console.log(data);
        if (data.units.length) {
            productDetails.units = [];
            data.units.forEach(unit => {
                productDetails.units.push({ unit: unit.unit, operator: unit.operator, value: unit.value })
            });
        }
        productDetails.description = data.description;
        productDetails.remarks = data.remarks;

        return productDetails
    }


}

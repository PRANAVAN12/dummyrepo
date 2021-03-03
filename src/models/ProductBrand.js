export class ProductBrand {
    constructor() {
        this.id;
        this.name;
        this.is_active

    }
    Initialise(initialiser) {
        const productBrand = new ProductBrand();
        productBrand.id = initialiser.id ? initialiser.id : ''
        productBrand.name = initialiser.name ? initialiser.name : ''
        productBrand.is_active= initialiser.is_active ? initialiser.is_active : ''
        return productBrand
    }
    MapData(productBrand) {
        if (productBrand && productBrand.length > 0) {
            productBrand.forEach((category, index, arr) => {
                arr[index] = new ProductBrand().Initialise(category);
            });
        }
        return productBrand;
    }
}

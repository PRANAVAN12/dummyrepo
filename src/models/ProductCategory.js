export class ProductCategory {
    constructor() {
        this.id = null;
        this.name = '';
        this.code = '';
        this.image='';
      
        this.is_active=false;
    }
    Initialise(initialiser) {
        const productCategory = new ProductCategory();
        productCategory.id = initialiser.id ? initialiser.id : ''
        productCategory.name = initialiser.name ? initialiser.name : ''
        productCategory.code = initialiser.code ? initialiser.code : ''
        productCategory.image= initialiser.image ? initialiser.image : ''
        productCategory.is_active= initialiser.is_active ? initialiser.is_active : ''
        productCategory.parentCatergoryId= initialiser.parentCatergoryId ? initialiser.parentCatergoryId : ''
        return productCategory
    }
    SetData(u){
        debugger
        const productCategory = new ProductCategory();
        productCategory.id = u.id ? u.id : ''
        productCategory.name = u.name ? u.name : ''
        productCategory.code = u.code ? u.code : ''
        productCategory.image = u.image ? u.image : ''
        productCategory.description= u.description ? u.description : ''
        productCategory.parent_id= u.parent_id ? u.parent_id : null
        return productCategory
    
    }
    MapData(productCategory) {
        if (productCategory && productCategory.length > 0) {
            productCategory.forEach((category, index, arr) => {
                arr[index] = new ProductCategory().Initialise(category);
            });
        }
        return productCategory;
    }
   
}

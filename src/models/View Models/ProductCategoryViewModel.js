export class ProductCategoryViewModel {
    constructor(category) {
        this.id=category.id?category.id:''
        this.name = category.name ? category.name : '',
            
            
            this.parent=category.parent?category.parant.id:''
            
        
    }
  }
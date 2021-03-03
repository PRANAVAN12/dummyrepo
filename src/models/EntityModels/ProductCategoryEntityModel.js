        
export class ProductCategoryEntityModel {
    constructor(u) {
        this.name = u.name ? u.name : ''
        this.code = u.code ? u.code : ''
        if(u.parentCatergoryId>0){
            this.parent_id= u.parentCatergoryId ? u.parentCatergoryId : 0
        }
        this.description = u.description ? u.description : ''
    }

}


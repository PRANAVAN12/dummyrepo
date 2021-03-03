import { ProductCategory } from "./ProductCategory";
import { ProductBrand } from "./ProductBrand";
import { SupplierListViewModel } from '../models/View Models/Supplier';
import _ from "lodash";

export class Product {
    constructor() {
        this.productCategory =[new ProductCategory()];
        this.name='',
        this.id=''
        this.product_id='';
        this.code='',
        this.status=false;
        this.brand =  new ProductBrand();
        this.barcode='',
        this.productImage='',
        this.batches=[],
        this.Image,
        this.brand_Id,
        this.suppliers=[],
        this.isAssigned=false;
    }
    toViewModel(data)
    {

       const productDetails=new Product();
       productDetails.name=data.name;
       productDetails.id=data.id;
       productDetails.product_id=data.id;
       productDetails.productCategory=data.category;
       productDetails.code=data.code;
       productDetails.brand=data.brand;
         
       productDetails.disabled=data.disabled;
       productDetails.unit=data.unit?data.unit:null;
       productDetails.tempId=data.tempId?data.tempId:null
       productDetails.reorderQuantity=data.reorderQuantity?data.reorderQuantity:0;
       productDetails.availableStock=data.availableStock?data.availableStock:0;
       productDetails.batches=data.batches;
       productDetails.status=data.isActive;
       productDetails.index= _.cloneDeep(data.index);
        productDetails.damagedStock=data.damage?data.damage:0;
       productDetails.units=data.units?data.units:[]
        if(data.defaultUnit)
        {
            productDetails.defaultUnit=data.defaultUnit;

        }
        else {
            productDetails.defaultUnit=data.unit;
        }
        productDetails.quantityError=[];
    //    productDetails.units.push(productDetails.defaultUnit)
       productDetails.suppliers=data.suppliers?data.suppliers.map((u, i, arr) => {
        u.index = i;
        return new SupplierListViewModel(u);
       }):[];
       return productDetails
    }

    toViewModelProduct(data) {
        const productDetails = new Product();
        productDetails.name = data.name;
        productDetails.id = data.id;
        productDetails.product_id = data.id;
        productDetails.productCategory = data.category;
        productDetails.code = data.code;
        productDetails.brand = data.brand;
        productDetails.batches = data.batches;
        productDetails.status = data.is_active;
        productDetails.index = _.cloneDeep(data.index);

        return productDetails
    }
}

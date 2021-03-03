
import { BatchUnitPriceDetaiilsViewModel } from './BatchUnitPriceDetailsViewModel'
import {formatDate} from "@/utils/datehelper.js"
import * as moment from "moment/moment";
export class ProductBatchViewModel {
    constructor(u) {
        debugger
        this.name=u.batch?u.batch:'',
        this.id=u.id?u.id:'',
            this.is_editable=u.is_editable,
        this.manufacureDate=u.manufacture_date?moment(u.manufacture_date).format("YYYY-MM-DD"):null,
        this.expiryDate=u.expiry_date?moment(u.expiry_date).format("YYYY-MM-DD"):null;
        this.has_expiry_date =!u.has_expiry_date;

        if(u.productUnits)
        {
             
            u.productUnits.forEach((unit) => {
                if(u.units)
                {
                    if(!u.units.find(un=>un.id==unit.id))
                    {
                        unit.batch_units={

                            purchase_price:0,
                            barcode:null,
                            selling_price:0,
                            profit_margin_percentage:0,
                            isNew:true
                        }
                        u.units.push(unit)
                    }
                }

            });
        }
debugger
 
        this.unitPriceDetails=u.units?u.units.map((r, i, arr) => {
           if(u.productUnits)
           {
               const unit=u.productUnits.find(p=>p.id==r.id);
               if(unit && unit.product_units)
               {
                   r.is_purchasing_unit=unit.product_units.is_purchasing_unit;
               }
               if(unit && unit.isPurchasingUnit)
               {
                   r.is_purchasing_unit=unit.isPurchasingUnit;
               }
           }
debugger
            return new BatchUnitPriceDetaiilsViewModel(r);
          }):[]
        this.status=u.is_active==true?'Active':'Archived'
    }
}

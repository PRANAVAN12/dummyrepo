import { AddressEntityModel } from './AddressEntityModel';
export class SupplierUpdateEntityModel {
    constructor(u) {
        
        this.id=u.id;
        this.name =u.name;
        this.code =u.code;
        this.maxCredit=u.creditDetails.maxCredit,
        this.payTerm=u.payTerm,
        this.addresses =u.addresses.map((u, i, arr) => {
            return new AddressEntityModel(u);
          }),
        this.contracts= u.contracts,
        this.products=u.products
    }

}


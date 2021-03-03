import { AddressEntityModel } from './AddressEntityModel';
import { ContactEntityModel } from './ContactEntityModel';
import { BankDetailsEntityModel } from './BankDetailsEntityModel'

export class SupplierEntityModel {
  constructor(u) {
    
    this.name = u.name;
    this.code = u.code;
    if (u.addresses) {
      this.addresses = u.addresses.map((u, i, arr) => {
        return new AddressEntityModel(u);
      })
    }
    if (u.contracts) {
      this.contacts = u.contracts.map((u, i, arr) => {
        return new ContactEntityModel(u);
      })
    }
    if (u.bankdetails) {
      this.bankdetails = u.bankdetails.map((u, i, arr) => {
        return new BankDetailsEntityModel(u);
      })
    }
    if(u.brandtags)
    {
      let brandtags=[];
      u.brandtags.forEach(brand => {
        brandtags.push(brand.id)
      });
      this.brands=brandtags
    }

  }

}


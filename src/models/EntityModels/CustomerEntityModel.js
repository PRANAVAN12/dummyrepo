import { AddressEntityModel } from './AddressEntityModel';
import { ContactEntityModel } from './ContactEntityModel';

export class CustomerEntityModel {
  constructor(u) {
       
    this.name = u.name;
    this.customer_type_id = u.customer_type_id;
    this.maximum_credit_amount = u.CreditDetails.maxCredit
    this.payment_team = u.CreditDetails.payTerm

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

  }

}


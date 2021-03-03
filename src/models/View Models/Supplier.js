export class SupplierListViewModel {
  constructor(supplier) {
    this.id = "";
    this.name = "";
    this.addess = "";
    this.contacts = [];
    this.is_active = "";
    this.action = "";
    this.phone = supplier.phone ? supplier.phone : "";
    this.email = supplier.email ? supplier.email : "";
    this.id = supplier.id;
    this.index = supplier.index;
    this.name = supplier.name ? supplier.name : "";
    this.addresses = supplier.addresses ? supplier.addresses : "";
    this.code = supplier.code ? supplier.code : "";
    this.reference_number = supplier.reference_number ? supplier.reference_number : "";
    this.contacts = supplier.contact ? supplier.contact : "";
    this.phone =supplier.contacts&&  this.contacts.length > 0 ? this.contacts[0].phone : "";
    this.email = supplier.contacts&& this.contacts.length > 0 ? this.contacts[0].email : "";

    this.is_active = supplier.is_active;
  }
}

import { Contact } from "./Contact";
import { Address } from "./Address";

export default class Shop {
  constructor() {
    debugger;
    this.name = "";
    this.address = new Address();
    this.contact = new Contact();
  }

  //get Api data and Deserialise the data
  Initialise(initialiser) {
    const data = new Shop();
    data.name = initialiser.name ? initialiser.name : "";
    data.id = initialiser.id ? initialiser.id : "";
    if (initialiser && initialiser.address) {
      data.address = new Address().initialise(initialiser.address);
    } else {
      data.address = new Address();
    }
    if (initialiser && initialiser.contact) {
      data.contact = new Contact().initialise(initialiser.contact);
    } else {
      data.contact = new Contact();
    }

    return data;
  }
  toupdateRequest() {
    var data = {};
    data.name = this.name;
    data.id = this.id;
    data.address = this.address;
    data.contact = this.contact;
    return data;
  }
}

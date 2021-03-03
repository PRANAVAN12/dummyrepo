import { Contact } from "./Contact";
import { Role } from "./Role";
import { Address } from "./Address";
export class User {
  constructor() {
    this.username = "";
    (this.lastname = ""), (this.firstname = ""), (this.company = "");
    (this.address = new Address()), (this.contact = new Contact());
    this.roles = "";
    (this.email = ""), (this.Id = "");
  }

  //get Api data and Deserialise the data
  initialise(initialiser) {
    debugger
    const data = new User();
    data.username = initialiser.username ? initialiser.username : "";
    data.firstname = initialiser.first_name ? initialiser.first_name : "";
    data.lastname = initialiser.last_name ? initialiser.last_name : "";
    data.image = initialiser.image ? initialiser.image : "";

    if (initialiser && initialiser.address) {
      data.address = initialiser.address
        ? new Address().initialise(initialiser.address)
        : "";
    } else {
      data.address = new Address();
    }
    if (initialiser.contact) {
      // const contacts=JSON.parse(initialiser.contacts)
      data.contacts = new Contact().initialise(initialiser.contact);
    } else {
      data.contacts = new Contact();
    }
    data.roles = [];
    if (initialiser.roles && initialiser.roles.length > 0) {
      data.roles = new Role().MapData(initialiser.roles);
    }
    data.email = initialiser.email ? initialiser.email : "";
    console.log(
      "------------------------------------------------------------------------"
    );
    console.log(data);
    return data;
  }
  ToRequestModel(data) {
    data.addresses.push(data.address);
    data.contracts.push(data.contacts);
    return data;
  }
}

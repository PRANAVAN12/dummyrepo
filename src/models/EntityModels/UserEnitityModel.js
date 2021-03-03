import { AddressEntityModel } from './AddressEntityModel';
import { ContactEntityModel } from './ContactEntityModel';

export class UserEntityModel {
    constructor(u) {
         
        this.username = u.username;
        this.last_name=u.lastName;
        this.first_name=u.firstName;
        this.email =u.email
        if(u.address.city|| u.country_id|| u.postal_code||u.address_line1||u.address_line2)
        {
            this.address =new AddressEntityModel(u.address)

        }
        if(u.contact && u.contact.phone || u.contact&& u.contact.telephone )
        {
            this.contact = new ContactEntityModel(u.contact);

        }

        if(u.roles && u.roles.id)
        {
            this.roles=u.roles.id;

        }
        else
        {
            this.roles=u.roles
        }

        
    }


}

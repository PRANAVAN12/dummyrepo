import { AddressViewModel } from './AddressViewModel';
import { ContactViewModel } from '../View Models/ContactViewModel';
import { CreditDetails } from '../CreditDetails'



export class CustomerViewModel {
    constructor(u) {
        this.id = u.id ? u.id : '';
        this.name = u.name ? u.name : '';
        this.image=u.image?u.image:''
        this.customerType = u.customerType? u.customerType:''
        this.customerGroup = u.customerGroup? u.customerGroup:''
        this.customer_type_id = u.customer_type_id ? u.customer_type_id : '';
        this.reference_number = u.reference_number ? u.reference_number : '';
        this.address = u.addresses && u.addresses?u.addresses:''
        this.contact = u.contact && u.contact ?  u.contact :''
        this.is_active = u.is_active
        this.maxCredit = u.maximum_credit_amount ? u.maximum_credit_amount : '';
        this.payTerm = u.payment_team ? u.payment_team : '';
        this.created_at=u.created_at?u.created_at:'';
    }
    toUpdate() {

        var data = {}
        data.Id = this.id
        data.name = this.name
        data.customer_type_id = this.customer_type_id
        data.addresses = [this.address]

        data.contacts = [this.contact]
        delete data.contacts[0].full_name

        data.maximum_credit_amount = this.maxCredit
        data.payment_team = this.payTerm


        return data
    }

}




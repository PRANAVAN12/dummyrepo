import { Contact } from './Contact'
import { Address } from './Address';
import { CreditDetails } from '../models/CreditDetails'
import { CustomerType } from '../models/CustomerType'


export class Customer {
    constructor() {
        this.name = ""
        this.customer_category_id=null,
        this.customer_type_id=null,
        this.addresses = [new Address()]
        this.contacts = [new Contact()]
        this.CreditDetails = new CreditDetails()
        
    }

    toRequest() {
        var data = {}

        data.name = this.name
        data.customer_type_id = this.customer_type_id
        data.addresses = this.addresses
        data.contacts = this.contacts
        data.customer_group_id=this.customer_category_id
        data.maximum_credit_amount = this.CreditDetails.maximum_credit_amount

        data.payment_team = this.CreditDetails.payment_team
        data.is_allow_exceed = this.CreditDetails.is_allow_exceed
        return data
    }

    toupdateRequest() {
        var data = {}

        data.name = this.name
        data.id = this.id
        data.customer_type_id = this.customer_type_id
        data.addresses = this.addresses
        data.contacts = this.contacts
        data.customer_group_id=this.customer_category_id?this.customer_category_id:null
        data.maximum_credit_amount = this.CreditDetails.maximum_credit_amount
        data.payment_team = this.CreditDetails.payment_team
        data.is_allow_exceed = this.CreditDetails.is_allow_exceed
        return data
    }

    //get Api data and Deserialise the data
    Initialise(initialiser) {
        const data = new Customer();
        data.name = initialiser.name ? initialiser.name : ''
        data.id = initialiser.id ? initialiser.id : ''
        data.customer_type_id = initialiser.customer_type_id ? initialiser.customer_type_id : ''
        data.customer_category_id = initialiser.customer_group_id ? initialiser.customer_group_id : ''
        data.CreditDetails.maximum_credit_amount = initialiser.maximum_credit_amount ? initialiser.maximum_credit_amount : 0
        data.CreditDetails.payment_team = initialiser.payment_team ? initialiser.payment_team : 0
        data.CreditDetails.is_allow_exceed = initialiser.is_allow_exceed
        data.reference_number = initialiser.reference_number ? initialiser.reference_number : ''
        data.image = initialiser.image ? initialiser.image : ''
        debugger
        if (initialiser && initialiser.addresses.length>0) {
            data.addresses = [];
            initialiser.addresses.forEach(address => {
                data.addresses.push(new Address().initialise(address))
            });
        }
        else {
            // data.addresses = data.addresses.push(new Address())
        }
        if (initialiser && initialiser.contact.length>0) {
            data.contacts = []
            initialiser.contact.forEach(contact => {
                data.contacts.push(new Contact().initialise(contact))
            });

        }
        else {
            // data.contact = data.contacts.push(new Contact());
        }
        return data
    }


}
import { Contact } from './Contact'
import { Role } from './Role';
import { Address } from './Address';
import { CreditDetails } from './CreditDetails';
import { BankDetails } from './BankDetails';
export class Supplier {
    constructor() {
        this.name =  '';
        this.id ='';
        this.code='',
            this.reference_number = '',
            this.addresses =[new Address],
            this.contracts= [new Contact];
        this.creditDetails=new CreditDetails();
        this.products=[]
        this.BankDetails =[new BankDetails]
        this.brandtags=[]
    }

    //get Api data and Deserialise the data
    Initialise(initialiser)
    {
        const data=new Supplier();
        data.name =initialiser.name?initialiser.name:''
        data.id =initialiser.id?initialiser.id:''
        data.code=initialiser.code?initialiser.code:''
        data.reference_number = initialiser.reference_number?initialiser.reference_number:''
        // data.Supplier.creditDetails.maxCredit =initialiser.creditDetails.maxCredit?initialiser.creditDetails.maxCredit:0
        // data.Supplier.creditDetails.payTerm =initialiser.creditDetails.payTerm?initialiser.creditDetails.payTerm:0
        debugger
        if(initialiser && initialiser.addresses.length>0)
        {
            data.addresses=[];
            initialiser.addresses.forEach(address => {
                data.addresses.push(new Address().initialise(address))
            });
        }

        else{
            data.addresses=[new Address()]
        }
        if(initialiser.contact && initialiser.contact.length>0)
        {
            data.contracts=[]
            initialiser.contact.forEach(contact => {
                data.contracts.push(new Contact().initialise(contact))
            });

        }
        else{
            data.contacts=[new Contact()];
        }
        if(initialiser.brands)
        {
            data.brandtags=initialiser.brands
        }
        return data
    }
    ToEntityModel(data)
    {
        data.address=JSON.stringify(data.address);
        data.contacts=JSON.stringify(data.contacts);
        return data
    }
}


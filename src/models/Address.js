export class Address {
    constructor() {
        this.city =  '',
         this.country_id=null,
         this.country_name=null,
        this.postal_code = null,
        this.address_line1=null,
        this.address_line2=null
    }
    initialise(initialiser)
    {
        const address=new Address();
        address.city = initialiser.city?initialiser.city:'',
        address.postal_code = initialiser.postal_code?initialiser.postal_code:'',
        address.state=initialiser.state?initialiser.state:''
        address.country_id=initialiser.country_id?initialiser.country_id:''
        address.country_name=initialiser.country.name?initialiser.country.name:''
        address.address_line1=initialiser.address_line1?initialiser.address_line1:''
        address.address_line2=initialiser.address_line2?initialiser.address_line2:''
        return address

    }
}
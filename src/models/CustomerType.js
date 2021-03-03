export class CustomerType {
    constructor() {
    
        this.id ='',
        this.name=''
        
    }
    initialise(initialiser)
    {
        const customertype=new CustomerType();
        customertype.id = initialiser.id?initialiser.id:'',
        customertype.name = initialiser.name?initialiser.name:''
       
        return customertype

    }
}
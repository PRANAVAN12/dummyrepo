
export class Contact {
    constructor() {
        this.telephone =null;
        this.phone =  null
    //    this.full_name=''
        this.email=null
      
    }
    initialise(initialiser)
    {
         
        const contact=new Contact();
        contact.telephone = initialiser.telephone ? initialiser.telephone : '';
        contact.phone =  initialiser.phone? initialiser.phone : '';
      contact.full_name=  initialiser.full_name? initialiser.full_name : '';
        contact.email=initialiser.email?initialiser.email:''
        return contact
    }
}
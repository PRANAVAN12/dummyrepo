        
export class ContactEntityModel {
    constructor(u) {
         
        if(u.full_name)
        {
            this.full_name = u.full_name

        }
        this.telephone =u.telephone?u.telephone:''
            if(u.phone){
                this.phone = u.phone?u.phone:''
            }

            if(u.email)
            {
                this.email=u.email

            }
    }

}


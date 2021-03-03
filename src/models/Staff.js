

import * as moment from "moment/moment";
export class Staff {
    constructor() {
  
        this.first_name = "",
        this.last_name = "",
        this.short_name = "",
        this.gender = "",
        this.date_of_birth = "",
        this.description = null,
        this.mobile = "",
        this.email="",
        this.telephone=null,
        this.skype=null,
        this.joined_at = "",
        this.nic_number = "",
        this.ethnicity = "",
        this.religion = null,
        this.civil_status = null,
        this.designation_id= null,
        this.employment_type_id=null,
        this.salutation_id=null,
        this.office_id = null,
        this.blood_group ="",
        this.home_address ="",
        this.last_employment ="",
        this.bank_name ="",
        this.branch_name = "",
        this.account_no = "",
        this.basic_salary = null,
        this.parent_id =null


    }

    toRequest() {
        var data = {}
        data.first_name=this.first_name,
       data.last_name= this.last_name,
       data.short_name= this.short_name,
        data.gender = this.gender,
        data.date_of_birth = this.date_of_birth,
        data.description = this.description,
        data.mobile = this.mobile,
        data.email = this.email,
        data.telephone = this.telephone,
        data.skype = this.skype,
        data.joined_at = this.joined_at ,
        data.nic_number = this.nic_number,
        data.ethnicity = this.ethnicity,
        data.religion = this.religion,
        data.civil_status = this.civil_status,   
        data.designation_id = this.designation_id,
        data.employment_type_id = this.employment_type_id,
        data.salutation_id = this.salutation_id,
        data.office_id = this.office_id,    
        data.blood_group = this.blood_group,
        data.home_address = this.home_address,
        data.last_employment = this.last_employment,   
        data.bank_name = this.bank_name,
        data.branch_name = this.branch_name,
        data.account_no = this.account_no,
        data.basic_salary = this.basic_salary ,
        data.parent_id = this.parent_id 
        return data
    }

    toupdateRequest(u) {
        const data = new Object();
        data.id= u.id;
        data.first_name=u.first_name ? u.first_name :null ,
        data.last_name= u.last_name ? u.last_name : null
        data.short_name= u.short_name ? u.short_name : null
   
        data.gender = u.gender ? u.gender :null
        data.date_of_birth = u.date_of_birth ? u.date_of_birth:null,
        data.description = u.description ? u.description:null,
        data.mobile = u.mobile ? u.mobile : null,
        data.telephone = u.telephone ? u.telephone: null ,
        data.skype = u.skype ? u.skype: null,
        data.email = u.email ? u.email : null,
        data.joined_at = u.joined_at ? u.joined_at : null ,
        data.nic_number = u.nic_number ? u.nic_number : null,
        data.ethnicity = u.ethnicity ? u.ethnicity :null,
        data.religion = u.religion ? u.religion : null,
        data.civil_status = u.civil_status   ? u.civil_status : null,
        data.designation_id = u.designation_id ? u.designation_id : null,
        data.employment_type_id = u.employment_type_id ? u.employment_type_id : null,
        data.salutation_id = u.salutation_id ? u.salutation_id : null,
      
        data.blood_group = u.blood_group ? u.blood_group: null,
        data.home_address = u.home_address ? u.home_address: null,
        data.last_employment = u.last_employment ? u.last_employment:null,   
        data.bank_name = u.bank_name ? u.bank_name : null,
        data.branch_name = u.branch_name ? u.branch_name : null,
        data.account_no = u.account_no ? u.account_no : null,
        data.basic_salary = u.basic_salary ? u.basic_salary : null,
        data.parent_id = u.parent_id ? u.parent_id : null
        return data
    }
    toView(u) {
    
        const data = new Object();
        data.id= u.id;
        data.first_name=u.first_name ? u.first_name :"" ,
        data.last_name= u.last_name ? u.last_name : "",
        data.short_name= u.short_name ? u.short_name : "",
   
        data.gender = u.gender ? u.gender :"",
        data.date_of_birth = u.date_of_birth ? u.date_of_birth:"" ,
        
        data.description = u.description ? u.description:"",
        data.mobile = u.mobile ? u.mobile : "",
        data.telephone = u.telephone ? u.telephone: "" ,
        data.skype = u.skype ? u.skype: "",
        data.email = u.email ? u.email : "",
        data.joined_at = u.joined_at ? u.joined_at : "" ,
        data.nic_number = u.nic_number ? u.nic_number : "",
        data.ethnicity = u.ethnicity ? u.ethnicity : "",
        data.religion = u.religion ? u.religion : "",
        data.civil_status = u.civil_status   ? u.civil_status : "",
        data.designation_id = u.designation ? u.designation.name : "",
        data.employment_type_id = u.employmentType ? u.employmentType.name: "",
        data.salutation_id = u.salutation ? u.salutation.name : "",
   

        data.office_id = u.office ? u.office.name : "",
        data.blood_group = u.blood_group ? u.blood_group: "",
        data.home_address = u.home_address ? u.home_address: "",
        data.last_employment = u.last_employment ? u.last_employment:"",   
        data.bank_name = u.bank_name ? u.bank_name : "",
        data.branch_name = u.branch_name ? u.branch_name : "",
        data.account_no = u.account_no ? u.account_no : "",
        data.basic_salary = u.basic_salary ? u.basic_salary : "",
        data.parent_id = u.parent_id ? u.parent_id : null
        return data
    }
    //get Api data and Deserialise the data
    Initialise(u) {
        const data = new Object();
        data.id= u.id;
        data.first_name=u.first_name ? u.first_name :"" ,
        data.last_name= u.last_name ? u.last_name : "",
        data.short_name= u.short_name ? u.short_name : "",
   
        data.gender = u.gender ? u.gender :"",
        data.date_of_birth = u.date_of_birth ? moment(u.date_of_birth).format("YYYY-MM-DD") : '----',
      
        data.description = u.description ? u.description:"",
        data.mobile = u.mobile ? u.mobile : "",
        data.telephone = u.telephone ? u.telephone: "" ,
        data.skype = u.skype ? u.skype: "",
        data.email = u.email ? u.email : "",
    
        data.joined_at = u.joined_at ? moment(u.joined_at).format("YYYY-MM-DD") : '----',
        data.nic_number = u.nic_number ? u.nic_number : "",
        data.ethnicity = u.ethnicity ? u.ethnicity : "",
        data.religion = u.religion ? u.religion : "",
        data.civil_status = u.civil_status   ? u.civil_status : "",
        data.designation_id = u.designation_id ? u.designation_id : "",
        data.employment_type_id = u.employment_type_id ? u.employment_type_id : "",
        data.salutation_id = u.salutation_id ? u.salutation_id : "",
        data.office_id = u.office ? u.office.id : "",
        data.blood_group = u.blood_group ? u.blood_group: "",
        data.home_address = u.home_address ? u.home_address: "",
        data.last_employment = u.last_employment ? moment(u.last_employment).format("YYYY-MM-DD") : '----',   
        data.bank_name = u.bank_name ? u.bank_name : "",
        data.branch_name = u.branch_name ? u.branch_name : "",
        data.account_no = u.account_no ? u.account_no : "",
        data.basic_salary = u.basic_salary ? u.basic_salary : "",
        data.parent_id = u.parent_id ? u.parent_id : null
        return data
    }


}
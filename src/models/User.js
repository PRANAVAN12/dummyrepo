import { Role } from "./Role";
export class User {
  constructor() {
    this.user = "";
    this.roles = "";
    this.staff_id = "";
    (this.email = ""), 
    (this.Id = "");
  }

  //get Api data and Deserialise the data
  initialise(initialiser) {
    const data = new User();
    data.user = initialiser.user ? initialiser.user : "";

    data.roles = [];
    if (initialiser.roles && initialiser.roles.length > 0) {
      data.roles = new Role().MapData(initialiser.roles);
    }
    data.email = initialiser.email ? initialiser.email : "";
    data.staff_id = initialiser.staff?initialiser.staff:"";
    return data;
  }

  toUpdate(u){
    const data = new Object();
    data.id= u.id;
    data.name= u.name ? u.name :"" ,
    data.email= u.email ? u.email : "",
    data.roles= u.roles ? u.roles : "",
    data.staff_id= u.staff_id?u.staff_id:""
    return data
  }


  toInitilaize(u){
    const data = new Object();
    data.id= u.id;
    data.name=u.name ? u.name :"" ,
    data.email= u.email ? u.email : "",
    data.roles= u.roles ? u.roles[0].id : ""
    data.staff_id= u.staff?u.staff.id:""
    return data
  }
}

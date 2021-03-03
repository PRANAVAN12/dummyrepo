export class WareHouseEntityModel {
    constructor(u) {
        this.name = u.name? u.name:''
        this.phone = u.phone? u.phone:'';
        this.address = u.address? u.address:'';
        // this.description = u.description? u.description:'';
     // this.is_active = true;
      this.description = u.description? u.description:'';
    }
  
}
import { AddressViewModel } from './AddressViewModel';
import { Contact } from '../Contact';


export class UserViewModel {
    constructor(u) {
        this.username = u.username?u.username:'';
        this.id=u.id?u.id:'';
        this.lastName=u.last_name?u.last_name:'',
        this.firstName=u.first_name?u.first_name:''
        this.address =u.address&& u.address?new AddressViewModel(u.address):new AddressViewModel([]);
        this.contact =u.contact?new Contact().initialise(u.contact):new Contact().initialise([]);
        this.roles=u.roles?u.roles[0]:[]
        this.email =u.email?u.email:'';
        this.image=u.image?u.image:null

    }
  }
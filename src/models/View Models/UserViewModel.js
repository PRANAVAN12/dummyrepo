export class UserViewModel {
    constructor(u) {
        this.user = u.user?u.user:'';
        this.id=u.id?u.id:'';
        this.roles=u.roles?u.roles[0]:[]
        this.email =u.email?u.email:'';

    }
  }
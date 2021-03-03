
export class UserEntityModel {
    constructor(u) {
        this.name = u.user;
        this.email = u.email;
        this.staff_id= u.staff_id;
        if (u.roles && u.roles.id) {
            this.roles = u.roles.id;

        }
        else {
            this.roles = u.roles
        }


    }


}

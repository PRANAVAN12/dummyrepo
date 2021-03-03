export class UserListViewModel {
    constructor(user) {
        this.name = "";
        this.phone = "";
        this.email = "";
        this.roles = "";
        this.status = "";

        this.name = user.firstName ? user.firstName + " " + user.lastName : "";
        this.phone =
            user.contacts && user.contact.phone ? user.contact.phone : "";
            this.telephone =
            user.contact && user.contact.telephone ? user.contact.telephone : "";
        this.email = user.email ? user.email : "";
        if (user.roles) {
            this.roles = user.roles
                .map((r) => {
                    return r.name;
                })
                .toString();
        }
        // this.roles = user.email ? user.email : "";
        this.status = user.isActive ? 'Active' : 'Archived';
    }
}
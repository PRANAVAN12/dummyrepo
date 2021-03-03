export class RoleEntityModel {
    constructor(u) {
        this.name = u.name,
        this.description = u.description,
        this.policies = u.policies
    }
}
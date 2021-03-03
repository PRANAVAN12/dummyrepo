export class Role {
    constructor() {
        this.id = '';
        this.name = '';
        this.description = '';
        this.policies = [];
    }
    initialise(initialiser) {
        const role = new Role();
        role.id = initialiser.id ? initialiser.id : ''
        role.name = initialiser.name ? initialiser.name : ''
        role.is_active = initialiser.is_active ? initialiser.is_active : false
        role.description = initialiser.description ? initialiser.description : ''

        role.policies = [];
        if (initialiser.policies) {
            initialiser.policies.map(data => {
                role.policies.push(data.id)
            })
        }

        return role
    }
    MapData(roles) {
        if (roles && roles.length > 0) {
            roles.forEach((role, index, arr) => {
                arr[index] = new Role().initialise(role);
            });
        }
        return roles;
    }
}

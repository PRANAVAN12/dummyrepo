import axios from '../../../plugins/axios'
export default {
    state: () => ({}),
    mutations: {
    },
    getters: {

    },
    actions: {
        GetRoles() {
            return new Promise((resolve, reject) => {
                
                axios.get("roles/search")
                    .then(resp => {
                        resolve(resp);
                    })
                    .catch(err => {
                        reject(err.response);
                    });
            });

        }
    }
}

import axios from '../../../plugins/axios'
export default {
    state: () => ({}),
    mutations: {
        SET_TOKEN: (state, value) => {
            state.token = value;

        },
        SET_USER: (state, value) => {
            state.user = value
        },
        SET_USERROLE: (state, value) => {
            state.role = value
        }
    },
    getters: {

    },
    actions: {
        //reset the password by get token from api 
        async CreatePurchaseReturn({ }, Credentials) {
            return new Promise((resolve, reject) => {
                axios.post("purchase-return", Credentials)
                    .then(resp => {
                        console.log("Request succeeded");
                        resolve(resp);
                    })
                    .catch(err => {
                        console.log("Error");
                        reject(err.response);
                    });
            });


        }, async UpdatePurchaseReturn({ }, Credentials) {
            let url =`purchase-return/${Credentials.id}`
            delete Credentials.id;
            return new Promise((resolve, reject) => {
                axios.patch(url, Credentials)
                    .then(resp => {
                        console.log("Request succeeded");
                        resolve(resp);
                    })
                    .catch(err => {
                        console.log("Error");
                        reject(err.response);
                    });
            });


        },
        async GetPurchaseReturn({ }, Id) {
            return new Promise((resolve, reject) => {
                axios.get(`purchase-return/${Id}`)
                    .then(resp => {
                        console.log("Request succeeded");
                        resolve(resp);
                    })
                    .catch(err => {
                        console.log("Error");
                        reject(err.response);
                    });
            });


        },

    },

}


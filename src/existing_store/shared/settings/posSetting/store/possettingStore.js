import axios from '../../../../../plugins/axios'
export default {
    state: () => ({}),
    mutations: {

    },
    getters: {

    },
    actions: {


        async UpdatePosSetting({ }, Credentials) {

            return new Promise((resolve, reject) => {
                axios.post("pos-configuration", Credentials)
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
        async GetPOSSettings({ }) {

            return new Promise((resolve, reject) => {
                axios.get(`pos-configuration/`)
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




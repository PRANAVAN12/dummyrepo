import axios from '../../../../../plugins/axios'

export default {
    state: {
    },
    mutations: {
    },
    actions: {
        GetProductBrands({ }) {
            
            return new Promise((resolve, reject) => {
                axios.get("brands")
                    .then(resp => {
                        console.log("Request succeeded-------------------------", resp);
                        resolve(resp);
                    })
                    .catch(err => {
                        console.log("Error");
                        reject(err.response);
                    });
            });

        }
    },
    modules: {
    }
}

import axios from '../../../../../plugins/axios'

export default {
    state: {
    },
    mutations: {
    },
    actions: {
        GetCountries({ }) {
            return new Promise((resolve, reject) => {
                axios.get("countries/search")
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

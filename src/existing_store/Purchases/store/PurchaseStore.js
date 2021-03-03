import axios from '../../../plugins/axios'
import { PurchaseEntityModel } from '../../../models/EntityModels/Purchases/PurchaseEntityModel';

export default {
    state: () => ({}),
    mutations: {
       
    },
    getters: {

    },
    actions: {


        async CreatePurchase( {},Credentials) {
            return new Promise((resolve, reject) => {
                axios.post("purchases", Credentials)
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
        async GetPurchase( {},Id) {
            
            return new Promise((resolve, reject) => {
                axios.get(`purchases/${Id}`)
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
        async EditPurchase( {},Credential) {
            
            return new Promise((resolve, reject) => {
                axios.patch(`purchases/${Credential.Id}`,new PurchaseEntityModel(Credential) )
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


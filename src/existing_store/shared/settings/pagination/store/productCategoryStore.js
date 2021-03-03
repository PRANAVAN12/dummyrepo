import axios from '../../../../../plugins/axios'

export default {
    state: {
    },
    mutations: {
    },
    actions: {
        async AddProductCategory( {},Credentials) {
            
            return new Promise((resolve, reject) => {
                axios.post("categories", Credentials)
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
        GetProductCategories({ }) {
            
            return new Promise((resolve, reject) => {
                axios.get("categories")
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
        
    }, GetCategorySearch({ }, payload) {
        let url = "categories/search?";
        if (payload != null && payload != undefined) {
          if (payload.query != "" && payload.query != null) {
            url += `query=${payload.query}&`;
          }
    
          if (
            payload.except != undefined &&
            payload.except != null &&
            payload.except.length > 0
          ) {
            url += `except=[${payload.except}]`;
          }
        }
        return new Promise((resolve, reject) => {
          axios
            .get(url)
            .then((resp) => {
              console.log("resp.data", resp.data.data);
              resolve(resp);
            })
            .catch((err) => {
              reject(err.response);
            });
        });
      },
    
    
    async GetProductCategory( {},id) {
            
        return new Promise((resolve, reject) => {
            axios.get(`categories/${id}`)
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
    async GetProductCategories({} ) {
            
        return new Promise((resolve, reject) => {
            axios.get(`categories`)
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
    async EditProductCategory( {},Credentials) {
        debugger
        return new Promise((resolve, reject) => {
            
            axios.patch(`categories/${Credentials.id}`,Credentials)
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
    
    
    modules: {
    }
}

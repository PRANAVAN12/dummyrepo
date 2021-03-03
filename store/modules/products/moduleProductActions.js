/*=========================================================================================
  File Name: moduleProductActions.js
  Description: Product Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

import axios from "@/plugins/axios";
import { Product } from "@/models/Product";
import { ProductEntity } from "@/models/EntityModels/ProductEntity";
import { ProductBatchEntityModel } from "@/models/EntityModels/ProductBatchEntityModel";

export default {
  AddProduct({}, credentials) {
    return new Promise((resolve, reject) => {
      axios
        .post("products", credentials)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  serachProductByBarcode({}, payload) {
    debugger
    let url = `ware-houses/${payload.warehouseId}/product-search?barcode=${payload.barcode}`;
    // if (payload != null && payload != undefined) {
    //   if (payload.query != "" && payload.query != null) {
    //     url += `query=${payload.query}&`;
    //   }

    //   if (
    //     payload.except != undefined &&
    //     payload.except != null &&
    //     payload.except.length > 0
    //   ) {
    //     url += `except=[${payload.except}]`;
    //   }
    // }
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
  serachAllProductByBarcode({}, payload) {
    debugger
    let url = `ware-houses/${payload.warehouseId}/product-search-without-stock?barcode=${payload.barcode}`;
    // if (payload != null && payload != undefined) {
    //   if (payload.query != "" && payload.query != null) {
    //     url += `query=${payload.query}&`;
    //   }

    //   if (
    //     payload.except != undefined &&
    //     payload.except != null &&
    //     payload.except.length > 0
    //   ) {
    //     url += `except=[${payload.except}]`;
    //   }
    // }
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
  GetCategorySearch({}, payload) {
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
  UploadProductImage({}, credentials) {
    return new Promise((resolve, reject) => {
      axios
        .post(`products/${credentials.get("id")}/image-upload`, credentials)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  EditProduct({}, credentials) {
    return new Promise((resolve, reject) => {
      delete credentials.batches;
      axios
        .patch(`products/${credentials.Id}`, new ProductEntity(credentials))
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  GetAllProducts({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get("products")
        .then((res) => {
          commit("SET_PRODUCTS", res.data);
          resolve(resp.data.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  GetProduct({}, payload) {
    let url = "products/search?";
    if (payload != null && payload != undefined) {
      if (payload.query != "" && payload.query != null) {
        url += `query=${payload.query}&`;
      }
      if (payload.status != undefined && payload.status != null) {
        url += `status=${payload.status}&`;
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
          resolve(resp.data.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  GetProductById({ commit }, Id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`products/${Id}`)
        .then((resp) => {
          commit("SET_BREADCRUMB", resp.data.reference_number, {
            root: true,
          });
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  CheckUnitEditable({}, Id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`products/${Id}/check-unit-editable`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  GetProductBatches({}, payload) {
    let url = `products/${payload.id}/batches/search?`;
    if (payload.query != "" && payload.query != null) {
      url += `query=${payload.query}&`;
    }
    url += `except=[${payload.selectedBatches}]`;
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  AddBatch({}, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post("batch", payload)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  AddProductBatch({}, payload) {
    return new Promise((resolve, reject) => {
      var product_id = payload.productId;
      debugger
      axios
        .post(`products/${product_id}/batches`, new ProductBatchEntityModel(payload))
        .then((resp) => {
          debugger
          resolve(resp);
        })
        .catch((err) => {
          debugger
          reject(err.response);
        });
    });
  },
  GetProductBatchByBarcode({}, payload) {
    return new Promise((resolve, reject) => {
      var product_id = payload.productId;
      debugger
      axios
          .get(`product-scan?code=${payload}`)
          .then((resp) => {
            debugger
            resolve(resp.data.data);

          })
          .catch((err) => {
            debugger
            reject(err.response);
          });
    });
  },
  EditProductBatch({}, payload) {
    return new Promise((resolve, reject) => {
      var product_id = payload.productId;
      axios
        .patch(
          `products/${product_id}/batches/${payload.id}`,
          new ProductBatchEntityModel(payload)
        )
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  GetProductBatch({}, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(`products/${payload.product_id}/batches/${payload.batch_id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  ArchiveOrActiceProduct({}, Id) {
    return new Promise((resolve, reject) => {
      axios

        .get(`products/${Id}/soft-delete`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  ArchiveOrActiceProductBatch({}, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `products/${payload.productId}/batches/${payload.batchId}/soft-delete`
        )
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },

  /*==================== Categories ====================*/
  async AddProductCategory({}, Credentials) {
    return new Promise((resolve, reject) => {
      axios
        .post("categories", Credentials)
        .then((resp) => {
          console.log("Request succeeded");
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },

  ArchiveOrActiceCategory({}, Id) {
    return new Promise((resolve, reject) => {
      axios

        .get(`categories/${Id}/soft-delete`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  async UploadProductCategoryImage({}, Credentials) {
    console.log(Credentials.get("id"));
    return new Promise((resolve, reject) => {
      axios
        .post(`categories/${Credentials.get("id")}/image-upload`, Credentials)
        .then((resp) => {
          console.log("Request succeeded");
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  async UploadProductBrandImage({}, Credentials) {
    console.log(Credentials.get("id"));
    return new Promise((resolve, reject) => {
      axios
        .post(`brands/${Credentials.get("id")}/image-upload`, Credentials)
        .then((resp) => {
          console.log("Request succeeded");
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  GetProductCategory({ commit }, credentials) {
    return new Promise((resolve, reject) => {
      axios
        .get(`categories/${credentials.id}`)
        .then((resp) => {
          // console.log("Request succeeded");
          commit("SET_BREADCRUMB", resp.data.name, {
            root: true,
          });
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  // Get All Categories - without pagination
  async FetchAllCategories({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`categories/search`)
        .then((res) => {
          commit("SET_CATEGORIES", res.data.data);
          resolve(res);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  // Get All Categories - with pagination
  async GetProductCategories({}) {
    return new Promise((resolve, reject) => {
      axios
        .get(`categories`)
        .then((res) => {
          // console.log("Request succeeded");
          resolve(res);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  async EditProductCategory({}, Credentials) {
    debugger;
    return new Promise((resolve, reject) => {
      debugger;
      const Id = Credentials.id;
      delete Credentials.id;
      delete Credentials.image;
      delete Credentials.is_active;

      axios
        .patch(`categories/${Id}`, Credentials)
        .then((resp) => {
          console.log("Request succeeded");
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },

  async EditProductBrand({}, Credentials) {
    return new Promise((resolve, reject) => {
      const Id = Credentials.Id;
      let brand = new Object();
      brand.name = Credentials.name;
      brand.is_active = Credentials.is_active;
      axios
        .patch(`brands/${Credentials.id}`, brand)
        .then((resp) => {
          console.log("Request succeeded");
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  /*==================== BRANDS ====================*/
  // Fetch the all brands
  FetchAllBrands({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("brands/search")
        .then((resp) => {
          commit("SET_BRANDS", resp.data.data);
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  //
  GetProductBrands({}) {
    return new Promise((resolve, reject) => {
      axios
        .get("brands")
        .then((resp) => {
          console.log("Request succeeded-------------------------", resp);
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  GetAllUnits({},payload) {
    debugger
    let url = `units/search?`;
    if (payload.status != "" && payload.status != null) {
      url += `status=${payload.status}&`;
    }
    if (payload.query != "" && payload.query != null) {
      url += `query=${payload.query}&`;
    }
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((resp) => {
          console.log("Request succeeded-------------------------", resp);
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
    GetAllProductUnits({ },payload) {
        let url = `products/${payload.id}/assign-units?`;
        if (payload.query != "" && payload.query != null) {
            url += `query=${payload.query}&`;
        }
        url += `except=[${payload.selectedUnits}]`;
        return new Promise((resolve, reject) => {
            axios
                .get(url)
                .then((resp) => {
                    console.log("Request succeeded-------------------------", resp);
                    resolve(resp.data.data);
                })
                .catch((err) => {
                    console.log("Error");
                    reject(err.response);
                });
        });
    },
    // GetProductBrandById({ },Id) {
    //     return new Promise((resolve, reject) => {
    //         axios
    //             .get(`brands/${Id}`)
    //             .then((resp) => {
    //                 console.log("Request succeeded-------------------------", resp);
    //                 resolve(resp);
    //             })
    //             .catch((err) => {
    //                 console.log("Error");
    //                 reject(err.response);
    //             });
    //           })
    // },
  GetProductBrandById({}, Id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`brands/${Id}`)
        .then((resp) => {
          console.log("Request succeeded-------------------------", resp);
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },

  GetAllperators({}) {
    return new Promise((resolve, reject) => {
      console.log(
        "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
      );
      axios
        .get("operators/search?query=")
        .then((resp) => {
          console.log("Request succeeded-------------------------", resp);
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },

  AssignSupplierToProducts({}, credentials) {
    const productId = credentials.productId;
    delete credentials.productId;
    return new Promise((resolve, reject) => {
      axios
        .post(`products/${productId}/suppliers`, credentials)
        .then((resp) => {
          console.log("Request succeeded-------------------------", resp);
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },

  AssignProductToSupplier({}, credentials) {
    const supplierId = credentials.supplierId;
    delete credentials.supplierId;
    return new Promise((resolve, reject) => {
      axios
        .post(`supplier/${supplierId}/products`, credentials)
        .then((resp) => {
          console.log("Request succeeded-------------------------", resp);
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },

  RemoveSupplierFromProduct({}, credentials) {
    const productId = credentials.productId;
    delete credentials.productId;
    return new Promise((resolve, reject) => {
      axios
        .delete(`products/${productId}/suppliers`, { data: credentials })
        .then((resp) => {
          console.log("Request succeeded-------------------------", resp);
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },

  RemoveProductFromSupplier({}, credentials) {
    const supplierId = credentials.supplierId;
    delete credentials.supplierId;
    return new Promise((resolve, reject) => {
      axios
        .delete(`supplier/${supplierId}/products`, { data: credentials })
        .then((resp) => {
          console.log("Request succeeded-------------------------", resp);
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },

  GetProductCategoriesWithChild({}) {
    return new Promise((resolve, reject) => {
      axios
        .get("categories/with-childs")
        .then((resp) => {
          console.log("Request succeeded-------------------------", resp);
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  GetProductCategoriesWithChildSearch({ payload}) {
    let url = "categories/with-childs/search?";
    if (payload != null && payload != undefined) {
      if (payload.query != "" && payload.query != null) {
        url += `query=${payload.query}&`;
      }
    }
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((resp) => {
          console.log("Request succeeded-------------------------", resp);
          resolve(resp);
        })
        .catch((err) => {
          console.log("Error");
          reject(err.response);
        });
    });
  },
  GetBrandsSearch({ }, payload) {
    let url = "brands/search?";
    if (payload != null && payload != undefined) {
      if (payload.query != "" && payload.query != null) {
        url += `query=${payload.query}&`;
      }
      if (payload.status != "" && payload.status != null) {
        url += `status=${payload.status}&`;
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
          resolve(resp.data.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  async GetProductsByReorderLevel({}, payload) {
      let url = "stocks/minimum-reorder?";
      if (payload != null && payload != undefined) {
        if (payload.id) {
          url += `wareHouse=${payload.id}&`;
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
                resolve(resp.data.data);
            })
            .catch((err) => {
                reject(err.response);
            });
    });
  },
    // async GetProductsByReorderLevel({ },payload) {
    //     return new Promise((resolve, reject) => {
    //         let url = "stocks/minimum-reorder?";
    //         if (payload != null && payload != undefined) {
    //             if (payload.id) {
    //                 url += `wareHouse=${payload.id}&`;
    //             }
    //             if (
    //                 payload.except != undefined &&
    //                 payload.except != null &&
    //                 payload.except.length > 0
    //             ) {
    //                 url += `except=[${payload.except}]`;
    //             }
    //         }
    //         axios
    //             .get(url)
    //             .then((res) => {
    //                 resolve(res);
    //             })
    //             .catch((err) => {
    //                 console.log("Error");
    //                 reject(err.response);
    //             });
    //     });
    // },

GetTranferablePercentage({ }, payload) {
    return new Promise((resolve, reject) => {
        var wareHouseId=payload.payload.wareHouseId;
        delete  payload.payload.wareHouseId
        axios
            .post(`stocks/ware-houses/${wareHouseId}/transfer-unit-convert`,payload.payload)
            .then((resp) => {
                resolve(resp.data.data);
            })
            .catch((err) => {
                reject(err.response);
            });
    });
},
  GetTransferableQuantity({ }, payload) {
    return new Promise((resolve, reject) => {
      var wareHouseId=payload.payload.wareHouseId;
      delete  payload.payload.wareHouseId
      axios
          .post(`stocks/ware-houses/${wareHouseId}/transfer-unit-convertBy-qut`,payload.payload)
          .then((resp) => {
            resolve(resp.data.data);
          })
          .catch((err) => {
            reject(err.response);
          });
    });
  },
    TranferProductToShopFromWarehouse({},Credentials)
    {
        return new Promise((resolve, reject) => {
            axios
                .post("transfers",Credentials)
                .then((resp) => {
                    console.log("Request succeeded-------------------------", resp);
                    resolve(resp);
                })
                .catch((err) => {
                    console.log("Error");
                    reject(err.response);
                });
        });
    },
  TranferProductToShopFromWarehouseEdit({},Credentials)
  {
    debugger
    return new Promise((resolve, reject) => {
      debugger
      let Id=Credentials.id;
      delete  Credentials.id;
      axios
          .patch(`transfers/${Id}`,Credentials)
          .then((resp) => {
            resolve(resp.data);
          })
          .catch((err) => {
            console.log("Error");
            reject(err.response);
          });
    });
  },
    GetTranferDetails({},id)
    {
        return new Promise((resolve, reject) => {
            axios
                .get(`transfers/${id}`)
                .then((resp) => {
                    console.log("Request succeeded-------------------------", resp);
                    resolve(resp.data);
                })
                .catch((err) => {
                    console.log("Error");
                    reject(err.response);
                });
        });
    },
  CheckBarcodeIsUniq({},code)
  {
    return new Promise((resolve, reject) => {
      axios
          .get(`product-scan?code=${code}`)
          .then((resp) => {
            console.log("Request succeeded-------------------------", resp);
            resolve(resp.data);
          })
          .catch((err) => {
            console.log("Error");
            reject(err.response);
          });
    });
  },

      }
    

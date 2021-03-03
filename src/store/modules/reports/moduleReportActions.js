/*=========================================================================================
  File Name: moduleReportActions.js
  Description: Report Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

import axios from "@/plugins/axios";

export default {
  getProductReports({ }, payload) {
    debugger
    let brand =payload.brand?payload.brand:""
    let category = payload.category?payload.category:""
    let supplier =payload.supplier?payload.supplier:""
    let url = `reports/products?`;
    if(payload.brand)
    {
      url=url+`brand=${brand}&`
    }
    if(payload.category)
    {
      url=url+`category=${category}&`
    }
    if(payload.supplier)
    {
      url=url+`supplier=${supplier}&`
    }
    if(payload.query)
    {
      url=url+`query=${payload.query}&`
    }
    if(payload.row)
    {
      url=url+`row=${payload.row}&`
    }

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
    getShopProductReports({ }, payload) {
      debugger
      let brand =payload.brand?payload.brand:""
      let category = payload.category?payload.category:""
      let supplier =payload.supplier?payload.supplier:""
      let url = `reports/shops/${payload.shopId}/products?`;
      if(payload.brand)
      {
        url=url+`brand=${brand}&`
      }
      if(payload.category)
      {
        url=url+`category=${category}&`
      }
      if(payload.supplier)
      {
        url=url+`supplier=${supplier}&`
      }
      if(payload.query)
      {
        url=url+`query=${payload.query}&`
      }
      if(payload.row)
      {
        url=url+`row=${payload.row}&`
      }

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
  GetWarehouseProducts({ }, payload) {
    let url = `dashboard/warehouses/${payload.warehouseId}/products`;
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
  GetWarehouseExpiredProducts({ }, payload) {
    let url = `dashboard/warehouses/${payload.warehouseId}/expired-items`;
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
  GetWarehouseDamagedProducts({ }, payload) {
    let url = `dashboard/warehouses/${payload.warehouseId}/damage-items`;
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
  GetShopExpiredProducts({ }, payload) {
    let url = `dashboard/shops/${payload.shopId}/expired-items`;
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
  getPurchaseReports({ }, payload) {
    let supplier =payload.supplier?payload.supplier:""
    let warehouse = payload.warehouse?payload.warehouse:""
    let start =payload.start?payload.start:""
    let end = payload.end?payload.end:""
    let amount = payload.amount?payload.amount:""
    let url = `reports/purchases?supplier=${supplier}&warehouse=${warehouse}&start=${start}&end=${end}&amount=${amount}`;
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
  getPurchaseOrderReports({ }, payload) {
    let supplier =payload.supplier?payload.supplier:""
    let warehouse = payload.warehouse?payload.warehouse:""
    let start =payload.start?payload.start:""
    let end = payload.end?payload.end:""
    let status = payload.status?payload.status:""
    let url = `reports/purchases-orders?supplier=${supplier}&warehouse=${warehouse}&start=${start}&end=${end}&status=${status}`;
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

  getPurchaseReturnReports({ }, payload) {
    let supplier =payload.supplier?payload.supplier:""
    let start =payload.start?payload.start:""
    let end = payload.end?payload.end:""
    let status = payload.status?payload.status:""
    let url = `reports/purchases-returns?supplier=${supplier}&start=${start}&end=${end}&status=${status}`;
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

 getOutofStockReports({ }, payload) {
    let warehouse = payload.warehouse?payload.warehouse:""
    let product =payload.product?payload.product:""
    let unit = payload.unit?payload.unit:""
    let url = `reports/stocks/out-of-stocks?warehouse=${warehouse}&product=${product}&unit=${unit}`;
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

  getSalesReports ({ }, payload) {
    let customer =payload.customer?payload.customer:""
    let start =payload.start?payload.start:""
    let end = payload.end?payload.end:""
    let biller = payload.biller?payload.biller:""
    let shop =  payload.shop?payload.shop:""
    let product =  payload.product?payload.product:""
    let saleType =  payload.saleType?payload.saleType:""
    let url = `reports/sales?customer=${customer}&start=${start}&end=${end}&biller=${biller}&shop=${shop}&product=${product}&saleType=${saleType}`;
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

  getLowStockReports({ }, payload) {
    debugger
    let warehouse = payload.warehouse?payload.warehouse:""
    let product =payload.product?payload.product:""
    let unit = payload.unit?payload.unit:""
    let url = `reports/stocks/low-stocks?warehouse=${warehouse}&product=${product}&unit=${unit}`;
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

};
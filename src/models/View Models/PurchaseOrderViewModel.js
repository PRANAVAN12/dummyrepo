import { ProductViewModel } from './ProductViewModel';

import * as moment from "moment/moment";
export class PurchaseOrderViewModel {
  constructor(purchaseOrder) {

    this.id = purchaseOrder.id ? purchaseOrder.id : '----'
    this.name = purchaseOrder.reference_number ? purchaseOrder.reference_number : '----'
    this.date = purchaseOrder.date ? moment(purchaseOrder.date).format("YYYY-MM-DD") : '----',
      this.reference_number = purchaseOrder.reference_number ? purchaseOrder.reference_number : '----',
      this.wareHouse_id = purchaseOrder.wareHouse_id ? purchaseOrder.wareHouse_id : '----',
      this.is_active = purchaseOrder.is_active ? purchaseOrder.is_active : '----',
      this.supplier_id = purchaseOrder.supplier_id ? purchaseOrder.supplier_id : '----',
      this.document = purchaseOrder.document ? purchaseOrder.document : '----',
      this.warehouses = purchaseOrder.wareHouse ? purchaseOrder.wareHouse : "----";
    this.suppliers = purchaseOrder.supplier ? purchaseOrder.supplier : "----"
    this.products = purchaseOrder.purchaseOrderProducts.map((u, i, arr) => {
      let tempselctedProduct = new ProductViewModel(u.product);
      tempselctedProduct.quantity = u.quantity;

      if (u.unit) {
        tempselctedProduct.unitName = u.unit.name
        tempselctedProduct.unit = u.unit;

      }
      tempselctedProduct.selectedProductUnits = u.product.units
      tempselctedProduct.units = u.product.units
      return tempselctedProduct;
    }),
      this.supplier = purchaseOrder.supplier ? purchaseOrder.supplier : null;
      this.warehouse = purchaseOrder.wareHouse ? purchaseOrder.wareHouse : null;
    this.remarks = purchaseOrder.remarks ? purchaseOrder.remarks : '',
      this.code = purchaseOrder.code ? purchaseOrder.code : ''
    this.status = purchaseOrder.status ? purchaseOrder.status : ''
  }


}

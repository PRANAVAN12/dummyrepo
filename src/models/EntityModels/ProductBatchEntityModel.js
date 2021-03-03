import { BatchUnitPriceDetails } from "./BatchUnitPriceDetails";

export class ProductBatchEntityModel {
  constructor(u) {

    this.batch = u.name ? u.name : null;
    this.manufacture_date = u.manufacureDate;
    if (u.has_expiry_date == false) {
      this.expiry_date = u.expiryDate;
    }
    this.has_expiry_date = !u.has_expiry_date;
    this.unitWithPrice = u.productBachUnitDetails.map((r, i, arr) => {
      r.defaultUnitId = u.defaultUnitId;
      return new BatchUnitPriceDetails(r);
    });
  }
}

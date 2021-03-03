import { el } from "date-fns/locale";
import * as moment from "moment/moment";
import store from "../store/store";

export class PurchaseOrder {
    constructor() {
        this.date = moment(new Date()).format("YYYY-MM-DD");
        if (store.state.sitesetting && store.state.sitesetting.siteSettings) {
            this.wareHouse_id = store.state.sitesetting.siteSettings.ware_house_id
        } else {
            this.wareHouse_id;
        }
        this.is_active,
            this.supplier_id,
            this.document,
            this.products = [],
            this.remarks,
            this.code,
            this.total,
            this.paid
    }


}

import * as moment from "moment/moment";

export class Incomes {
    constructor() {
        this.id = null;
        this.type="Warehouse";
        this.date=moment().format("YYYY-MM-DD"),
        this.expense_for = null;
        this.category_id=null;
        this.warehouse_id = null;
        this.shop_id=null
        this.amount=null,
            this.remark=null;
    }

}

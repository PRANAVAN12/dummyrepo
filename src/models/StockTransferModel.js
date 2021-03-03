import * as moment from "moment/moment";


export class StockTransferModel {
    constructor() {
        this.type,
            this.date=moment().format("YYYY-MM-DD"),
            this.Id,
            this.remarks,
            this.batch,
            this.reference_number,
            this.warehouse,
            this.shop,
            this.isUpdate=false;
        this.statusNote=null,
            this.statusChange,
            this.statusNoteChange=null,
            this.unit,
            this.selectedProduct = { batches: [] };
            this.from_ware_house_id,
                this.to_shop_id,
                this.selectedBatch,
                this.selectedunit,
            this.items=[],
                this.quantity=0;
        this.maxQuantity=0;


    }
}

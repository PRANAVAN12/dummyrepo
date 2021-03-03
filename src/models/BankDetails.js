export class BankDetails {
    constructor() {
        this.bank_name = "",
            this.brange = "",
            this.acount_holder_name = "",
            this.account_no = ""
    }

    Initialise(initialiser) {
        const data = new BankDetails();
        data.bank_name = initialiser.bank_name ? initialiser.bank_name : ''
        data.brange = initialiser.brange ? initialiser.brange : ''
        data.acount_holder_name = initialiser.acount_holder_name ? initialiser.acount_holder_name : ''
        data.account_no = initialiser.account_no ? initialiser.account_no : ''
    }
}
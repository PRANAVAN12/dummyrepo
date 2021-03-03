        
export class AccountViewModel {
    constructor(u) {
        this.name = u.account_number,
        this.id =u.id,
            this.actual_balance=u.actual_balance,
            this.available_balance=u.available_balance,
            this.nickName=u.nick_name 
    }

}


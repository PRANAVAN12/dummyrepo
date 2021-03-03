export class Attendance {
    constructor(u) {
        this.id = u.id ? u.id : '';
        this.full_name = u.full_name ? u.full_name : '';
        this.short_name = u.short_name? u.short_name:''
        this.total_working_hours = u.total_working_hours? u.total_working_hours:''
        this.total_essential_breakes_hours = u.total_essential_breakes_hours ? u.total_essential_breakes_hours : '';
        this.last_moment_status = u.last_moment_status ? u.last_moment_status : '';
        this.last_moment = u.last_moment && u.last_moment?u.last_moment:''
        this.attendance = u.attendance && u.attendance ?  u.attendance :''
    }
}
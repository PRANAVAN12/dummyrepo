
import moment from "moment";
import { formatDate } from "@/utils/datehelper";
var Filters = {
    created() { console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++'); },
    filters: {
        formatDate: function (value) {
            console.log('=============================================================================================');
            return formatDate(value);
        },
    }
};

export default Filters;

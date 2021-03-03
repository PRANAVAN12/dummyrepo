import moment from "moment";

import store from "../store/store";
// const dateformat = "DD-MMM-YYYY";
// const timeformat = "DD-MMM-YYYY HH:mm:ss";
// const monthyearformat = "MMMM YYYY";
// const yearonlyformat = "YYYY";

const dateformat = store.state.sitesetting.date_format;
const timeformat = store.state.timeformat;
const monthyearformat = store.state.monthyearformat;
const yearonlyformat = store.state.yearonlyformat;

export const formatDate = (date) => {

  if(date == null){
    return "..."
      }else{
  var m = moment(new Date(date), store.state.sitesetting.date_format);
  var formatted = m.locale("en").format(store.state.sitesetting.date_format);
  return formatted;
}};

export const formatDateTime = (date) => {
  var m = moment(new Date(date), timeformat);
  var formatted = m.locale("en").format(timeformat);
  return formatted;
};

export const isCurrentDate = (date) => {
  let current = format(new Date());
  let compareto = format(date);
  return moment(current).isSame(compareto, "day");
};

export const isPastCurrentDate = (date) => {
  let current = format(new Date());
  let compareto = format(date);
  return moment(current).isAfter(compareto, "day");
};

export const formatDateToMonthYear = (date) => {
  var m = moment(new Date(date), monthyearformat);
  var formatted = m.locale("en").format(monthyearformat);
  return formatted;
};

export const returnOnlyYear = (date) => {
  var m = moment(new Date(date), yearonlyformat);
  var formatted = m.locale("en").format(yearonlyformat);
  return formatted;
};

function format(date) {
  const format = "YYYY-MM-DD";
  var m = moment(new Date(date), format);
  var formatted = m.locale("en").format(format);
  return formatted;
}

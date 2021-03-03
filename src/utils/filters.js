import Vue from "vue";
import { formatDate } from "./datehelper";
import store from "../store/store";
const _ = require("lodash");

// const filters = {
//   // formatDate: function(value) {
//   //   return formatDate(value);
//   // },
//   amount: function(value) {
//     return value + " /=";
//   },
// };
Vue.filter("amount", function (value) {
  return value + " /=";
});

Vue.filter("formatDate", function (value) {
  return formatDate(value);
});


Vue.filter("formatCurrency", function (value) {
  let wholeNumber = null;
  let fractionalValue = null;
  let roundedValue = (+_.replace(
    value,
    new RegExp(",", "g"),
    ""
  )).toFixed(2);
  if (roundedValue.toString().includes(".")) {
    wholeNumber = roundedValue.split(".")[0];
    fractionalValue = roundedValue.split(".")[1];
    value = wholeNumber;
  } else {
    value = roundedValue;
  }
  debugger
  if (value) {
    value = reverseString(value);
    let modified = false;
    for (let index = 1; index <= value.length; index++) {
      if (index % 3 == 0 && !modified) {
        value = insert(value, ",", index);
        modified = true;
      } else if (index % 4 == 0) {
        value = insert(value, ",", index);
      }
    }
    value = reverseString(value);
    value = _.replace(value, new RegExp(",,", "g"), ",");
    if (value[0] == ",") {
      value = value.substring(1, value.length);
    }

    if (wholeNumber) {
      value = value + "." + fractionalValue;
    } else {
      value = value + ".00";
    }
    return value;
  } else {
    return value;
  }
});

function reverseString(str) {
  return str.split("").reverse().join("");
}

function  insert(main_string, ins_string, pos) {
  if (typeof pos == "undefined") {
    pos = 0;
  }
  if (typeof ins_string == "undefined") {
    ins_string = "";
  }
  return main_string.slice(0, pos) + ins_string + main_string.slice(pos);
}


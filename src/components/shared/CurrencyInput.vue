<template>
  <div>
    <v-text-field
      :rules="[valueNumberRule]"
      v-model="price"
      class="numberInput"
      type="text"
      outlined
      min="1"
      dense
      @blur="formatPrice()"
      @focus="removeFormat()"
      :label="label"
    ></v-text-field>
  </div>
</template>
<script>
const _ = require("lodash");
export default {
  data: () => ({
    valueNumberRule: (v) => {
      v = _.replace(v, new RegExp(",", "g"), "");
      console.log('=sjdhfkhfdkhskjfhjksffhgbklsfhgkhsfkghfskhglhsfkghskfhghkjfsh      =========',v);
      if (v) {
        if (!v.trim()) return true;
        if (!isNaN(parseFloat(v)) && v >= 0) return true;
        return "Value can not be negative";
      }else{
        return true
      }
    },
    price: 0,
  }),
  props: {
    priceValue: {
      type: String,
      default: "0",
    },
    label: {
      type: String,
      default: "",
    },
  },
  methods: {
    formatPrice() {
      let wholeNumber = null;
      let fractionalValue = null;
      let roundedValue = (+_.replace(
        this.price,
        new RegExp(",", "g"),
        ""
      )).toFixed(2);
      if (roundedValue.toString().includes(".")) {
        wholeNumber = roundedValue.split(".")[0];
        fractionalValue = roundedValue.split(".")[1];
        this.price = wholeNumber;
      } else {
        this.price = roundedValue;
      }
      if (this.price) {
        this.price = this.reverseString(this.price);
        let modified = false;
        for (let index = 1; index <= this.price.length; index++) {
          if (index % 3 == 0 && !modified) {
            this.price = this.insert(this.price, ",", index);
            modified = true;
          } else if (index % 4 == 0) {
            this.price = this.insert(this.price, ",", index);
          }
        }
        this.price = this.reverseString(this.price);
        this.price = _.replace(this.price, new RegExp(",,", "g"), ",");
        if (this.price[0] == ",") {
          this.price = this.price.substring(1, this.price.length);
        }

        if (wholeNumber) {
          this.price = this.price + "." + fractionalValue;
        } else {
          this.price = this.price + ".00";
        }
        this.$emit("input", _.replace(this.price, new RegExp(",", "g"), ""));
      }
    },
    removeFormat() {
      this.price = _.replace(this.price, new RegExp(",", "g"), "");
    },
    reverseString(str) {
      return str.split("").reverse().join("");
    },

    insert(main_string, ins_string, pos) {
      if (typeof pos == "undefined") {
        pos = 0;
      }
      if (typeof ins_string == "undefined") {
        ins_string = "";
      }
      return main_string.slice(0, pos) + ins_string + main_string.slice(pos);
    },
  },
  watch: {
    price: {
      handler(val, newVal) {
        this.formatPrice();
      },
      deep: true,
    },
  },
  created() {
    this.formatPrice();
  },
};
</script>
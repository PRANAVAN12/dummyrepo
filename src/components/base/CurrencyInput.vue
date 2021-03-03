<template>
  <div>
    <v-text-field
      @change="changeInput"
      v-currency
      label="Value"
      outlined
      v-model="value"
    ></v-text-field>
  </div>
</template>
<script>
import { CurrencyDirective } from "vue-currency-input";
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  directives: {
    currency: CurrencyDirective,
  },
  created() {
     
  },
};
</script>
<style scoped>
</style>
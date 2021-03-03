<template>
  <v-text-field
    label="Total greater than"
    outlined
    dense
    hide-details="auto"
    type="number"
    v-model="amount"
    clearable
    @change="onChange"
  ></v-text-field>
</template>

<script>
import { email } from "vee-validate/dist/rules";
export default {
  name: "date",
  props: {
    clear: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    amount: null,
  }),
  computed: {},
  methods: {
    onChange(val) {
         
      this.$emit("input", this.amount);
    },
  },
  watch: {
    clear: {
      handler(val) {
         
        this.amount = null;
      },
      deep: true,
    },
  },
};
</script>

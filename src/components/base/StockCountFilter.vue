<template>
  <v-text-field
      label="Stock greater than"
      outlined
      dense
      hide-details="auto"
      type="number"
      v-model="stock"
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
    stock: null,
  }),
  computed: {},
  methods: {
    onChange(val) {

      this.$emit("input", this.stock);
    },
  },
  watch: {
    clear: {
      handler(val) {

        this.stock = null;
      },
      deep: true,
    },
  },
};
</script>

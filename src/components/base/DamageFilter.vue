<template>
  <v-text-field
      label="Damage greater than"
      outlined
      dense
      hide-details="auto"
      type="number"
      v-model="damage"
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
    damage: null,
  }),
  computed: {},
  methods: {
    onChange(val) {

      this.$emit("input", this.damage);
    },
  },
  watch: {
    clear: {
      handler(val) {

        this.damage = null;
      },
      deep: true,
    },
  },
};
</script>

<template>
  <v-select
      hide-details="auto"
      :items="status"
      v-model="selectStatus"
      item-text="text"
      item-value="value"
      label="Status"
      outlined
      clearable
      dense
      @change="emitInput"
  ></v-select>
</template>
<script>
export default {
  props: {
    clear: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    status: [
      { text: "Active", value: "active" },
      { text: "Archived", value: "archived" },
    ],
    selectStatus: null,
  }),
  methods: {
    emitInput() {
      this.$emit("input", this.selectStatus);
    }
  },
  watch: {
    clear: {
      handler(val) {
        this.selectStatus = null;
      },
      deep: true,
    }
  },
  created(){
  }
};
</script>
<template>
  <v-autocomplete
      hide-details="auto"
      :items="IncomeCategories"
      :loading="loading"
      v-model="selectedIncomeCategory"
      item-text="name"
      item-value="id"
      label="Income Category"
      clearable
      outlined
      dense
      @change="emitInput"
      :search-input.sync="searchCategory"
  ></v-autocomplete>
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
    IncomeCategories: [],
    selectedIncomeCategory: null,
    searchCategory:null,
    loading:false
  }),
  methods: {
    emitInput() {
      this.$emit("input", this.selectedIncomeCategory);
    },
    getIncomeCategoryByQuery(query = "") {
      this.loading = true;
      this.$store
          .dispatch("sitesetting/GetIncomeCategories", {
            query: query
          })
          .then((res) => {
            console.log(res);
            this.loading = false;
            this.IncomeCategories = res.data.data;
          })
          .catch((err) => {
            this.loading = false;
          });
    },
  },
  watch: {
    clear: {
      handler(val) {
        this.selectedSupplier = null;
      },
      deep: true,
    },
    searchCategory: {
      handler(val) {
        this.getIncomeCategoryByQuery(val);
      },
      deep: true,
    },
  },
  created(){
    this.getIncomeCategoryByQuery()
  }
};
</script>
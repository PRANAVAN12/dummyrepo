<template>
  <v-autocomplete
      hide-details="auto"
      :items="expenseCategories"
      :loading="loading"
      v-model="selectedExpenseCategory"
      item-text="name"
      item-value="id"
      label="Expense Category"
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
    expenseCategories: [],
    selectedExpenseCategory: null,
    searchCategory:null,
    loading:false
  }),
  methods: {
    emitInput() {
      this.$emit("input", this.selectedExpenseCategory);
    },
    getExpenseCategoryByQuery(query = "") {
      this.loading = true;
      this.$store
          .dispatch("sitesetting/GetExpenseCategories", {
            query: query
          })
          .then((res) => {
            console.log(res);
            this.loading = false;
            this.expenseCategories = res.data.data;
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
        this.getExpenseCategoryByQuery(val);
      },
      deep: true,
    },
  },
  created(){
    this.getExpenseCategoryByQuery()
  }
};
</script>
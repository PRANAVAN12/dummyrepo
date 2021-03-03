<template>
  <v-autocomplete
      hide-details="auto"
      :items="categories"
      :loading="loadingCategories"
      v-model="selectCategory"
      item-text="name"
      item-value="id"
      label="Categories"
      outlined
      dense
      @change="emitInput"
      clearable
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
    categories: [],
    loadingCategories:false,
    selectCategory: null,
    searchCategory:null
  }),
  methods: {
    emitInput() {
      this.$emit("input", this.selectCategory);
    },
    GetCategoryByQuery(query = "") {
       
      this.loadingCategories = true;
      this.$store
          .dispatch("product/GetCategorySearch", { query: query })
          .then((res) => {
             
            this.categories = res.data.data;
            this.loadingCategories = false;
          })
          .catch((err) => {
            this.loadingCategories = false;
            this.messages = err.data.name;
          });
    },
  },
  watch: {
    clear: {
      handler(val) {
        this.selectCategory=null;
        this.searchCategory=null
      },
      deep: true,
    },
    searchCategory: {
      handler(val) {
        this.GetCategoryByQuery(val);
      },
      deep: true,
    },
  },
  created(){
    this.GetCategoryByQuery()
  }
};
</script>
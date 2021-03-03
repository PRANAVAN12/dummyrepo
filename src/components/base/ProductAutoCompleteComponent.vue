<template>
  <v-autocomplete
      hide-details="auto"
      :items="products"
      :loading="loadingProducts"
      v-model="selectedProduct"
      item-text="name"
      item-value="id"
      label="Product"
      outlined
      dense
      @change="emitInput"
      clearable
      :search-input.sync="searchProduct"
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
    products: [],
    selectedProduct: null,
    searchProduct:null,
    loadingProducts:false,
  }),
  methods: {
    emitInput() {
      this.$emit("input", this.selectedProduct);
    },
  getProductsByQuery(query = "") {
    this.loadingProducts = true;
    this.$store
        .dispatch("product/GetProduct", {
          query: query,
        })
        .then((res) => {
          this.products = res;
          this.loadingProducts = false;
        })
        .catch((err) => {
          this.loadingProducts = false;
          this.messages = err.data.title;
        });
  },
  },
  watch: {
    clear: {
      handler(val) {
        this.selectedProduct = null;
      },
      deep: true,
    },
    searchProduct: {
      handler(val) {
        this.getProductsByQuery(val);
      },
      deep: true,
    },
  },
  created(){
    this.getProductsByQuery()
  }
};
</script>
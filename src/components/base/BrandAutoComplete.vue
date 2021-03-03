<template>
  <v-autocomplete
      hide-details="auto"
      :items="brands"
      :loading="loadingBrand"
      v-model="selectBrand"
      item-text="name"
      item-value="id"
      label="Brand"
      outlined
      dense
      clearable
      @change="emitInput"
      :search-input.sync="searchBrand"
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
    brands: [],
    selectBrand: null,
    searchBrand:null,
    loadingBrand:false
  }),
  methods: {
    emitInput() {
      this.$emit("input", this.selectBrand);
    },
    getBrandsByQuery(query = "") {
      this.projectsLoading = true;
      this.$store
          .dispatch("brand/GetBrandSearch", {
            query: query
          })
          .then((res) => {
             
            this.brands = res.data;
            this.loadingBrand = false;

          })
          .catch((err) => {
            this.loadingBrand = false;
            this.messages = err.data.title;
          });
    },
  },
  watch: {
    clear: {
      handler(val) {
         
        this.selectBrand=null;
      },
      deep: true,
    },
    searchBrand: {
      handler(val) {
        this.getBrandsByQuery(val);
      },
      deep: true,
    },
  },
  created(){
    this.getBrandsByQuery()
  }
};
</script>
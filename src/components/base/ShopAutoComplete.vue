<template>
  <v-autocomplete
    hide-details="auto"
    :items="shops"
    :loading="loading"
    v-model="selectedShop"
    item-text="name"
    item-value="id"
    label="Shop"
    clearable
    outlined
    dense
    @change="emitInput"
    :search-input.sync="searchShop"
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
    shops: [],
    selectedShop: null,
    searchShop:null,
    loading:false
  }),
  methods: {
    emitInput() {
      this.$emit("input", this.selectedShop);
    },
    getShopByQuery(query = "") {
        debugger
      this.loading = true;
      this.$store
        .dispatch("shop/GetShop", {
          query: query,
          status: "active",
        })
        .then((res) => {
          this.shops = res
          this.loading = false;

        })
        .catch((err) => {
          this.loading = false;
        });
    },
  },
  watch: {
    clear: {
      handler(val) {
        this.selectedShop = null;
      },
      deep: true,
    },
    searchShop: {
      handler(val) {
        this.getShopByQuery(val);
      },
      deep: true,
    },
  },
  created(){
    this.getShopByQuery()
  }
};
</script>
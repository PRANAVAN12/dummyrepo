<template>
  <v-autocomplete
    hide-details="auto"
    :items="suppliers"
    :loading="loading"
    v-model="selectedSupplier"
    item-text="name"
    item-value="id"
    label="Supplier"
    clearable
    outlined
    dense
    @change="emitInput"
    :search-input.sync="searchSupplier"
  ></v-autocomplete>
</template>
<script>
import { SupplierListViewModel } from "../../models/View Models/Supplier";
export default {
  props: {
    clear: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    suppliers: [],
    selectedSupplier: null,
    searchSupplier:null,
    loading:false
  }),
  methods: {
    emitInput() {
      this.$emit("input", this.selectedSupplier);
    },
    getSupplierByQuery(query = "") {
      this.loading = true;
      this.$store
        .dispatch("supplier/GetSupplierSearch", {
          query: query,
          status: "active",
        })
        .then((res) => {
          console.log(res);
          this.loading = false;
          this.suppliers = res.map((u, i, arr) => {
            u.index = i + 1;
             return new SupplierListViewModel(u);
          });
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
    searchSupplier: {
      handler(val) {
        this.getSupplierByQuery(val);
      },
      deep: true,
    },
  },
  created(){
    this.getSupplierByQuery()
  }
};
</script>
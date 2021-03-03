<template>
  <v-autocomplete
    hide-details="auto"
    :items="customers"
    :loading="loading"
    v-model="selectedCustomer"
    item-text="name"
    item-value="id"
    label="Customer"
    clearable
    outlined
    dense
    @change="emitInput"
    :search-input.sync="searchCustomer"
  ></v-autocomplete>
</template>
<script>
import { CustomerViewModel } from "../../models/View Models/CustomerViewModel";
export default {
  props: {
    clear: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    customers: [],
    selectedCustomer: null,
    searchCustomer:null,
    loading:false
  }),
  methods: {
    emitInput() {
      this.$emit("input", this.selectedCustomer);
    },
    getCustomerByQuery(query = "") {
      this.loading = true;
      this.$store
        .dispatch("customer/GetCustomerSearch", {
          query: query,
          status: "active",
        })
        .then((res) => {
          console.log(res);
          this.loading = false;
          this.customers = res.map((u, i, arr) => {
            u.index = i + 1;
             return new CustomerViewModel(u);
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
        this.selectedCustomer = null;
      },
      deep: true,
    },
    searchCustomer: {
      handler(val) {
        this.getCustomerByQuery(val);
      },
      deep: true,
    },
  },
  created(){
    this.getCustomerByQuery()
  }
};
</script>
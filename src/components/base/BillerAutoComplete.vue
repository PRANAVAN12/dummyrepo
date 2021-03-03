<template>
  <v-autocomplete
    hide-details="auto"
    :items="billers"
    :loading="loading"
    v-model="selectedBiller"
    item-text="first_name"
    item-value="id"
    label="Biller"
    clearable
    outlined
    dense
    @change="emitInput"
  ></v-autocomplete>
</template>
<script>
import { UserViewModel } from "../../models/View Models/UserViewModel";
export default {
  props: {
    clear: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    billers: [],
    selectedBiller: null,
    searchBiller:null,
    loading:false
  }),
  methods: {
    emitInput() {
      this.$emit("input", this.selectedBiller);
    },



    getBillerByQuery(query = "") {
        debugger
      this.loading = true;
      this.$store
        .dispatch("user/GetUserSearch", {
          query: query,
          status: "active",
        })
        .then((res) => {
          
          debugger
          this.billers = res.data
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
        this.selectedBiller = null;
      },
      deep: true,
    },
    searchBiller: {
      handler(val) {
        this.getBillerByQuery(val);
      },
      deep: true,
    },
  },
  created(){
    this.getBillerByQuery()
  }
};
</script>
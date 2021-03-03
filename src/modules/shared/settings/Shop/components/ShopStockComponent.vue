<template>
  <v-container class="light gray lighten-12" fluid>
    <v-row class="ma-0 align-right sub-section">
      <TableFilters
        :filters="['search']"
        v-model="filter"
        :columns="columns"
      ></TableFilters>
    </v-row>
    <v-row>
      <v-card-text class="pa-0">
        <v-data-table
          :items-per-page="paginationOptions.perPage"
          :fixed-header="true"
          hide-default-footer
          :items="stockshops"
          :headers="columns"
        >
          <template v-slot:footer>
            <pagination
              @paginationOptions="setPaginationOptions"
              :url="`shops/${$route.params.id}/stocks`"
              @response="receiveStocksData"
              :filter="filter"
              ref="pagination"
            />
          </template>
        </v-data-table>
      </v-card-text>
    </v-row>
  </v-container>
</template>
<script>
import TableFilters from "@/components/base/TableFilters";

import { required, email, max, regex } from "vee-validate/dist/rules";

import pagination from "../../../components/pagination";
import confirmation from "../../../components/confirmation";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} is required",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});
extend("regex", {
  ...regex,
  message: "The value is not a valid phone number",
});
export default {
  components: {
    pagination,
    ValidationProvider,
    TableFilters,
    ValidationObserver,
  },
  data() {
    return {
      paginationOptions:{},
      shopid: null,
      isLoading: false,

      pagination1: {
        descending: true,
        page: 1,
        rowsPerPage: 2,
        sortBy: "fat",
        totalItems: 0,
        rowsPerPageItems: [1, 2, 4, 8, 16],
      },
      columns: [
        {
          text: "Product",
          value: "product.name",
          show: true,
          disabled: false,
        },
        { text: "Unit", value: "unit.name", show: true, disabled: false },

        {
          text: " Actual stock",
          value: "available_stock",
          align: "center",
          show: true,
          disabled: false,
        },
        {
          text: "Damage",
          value: "damage",
          align: "center",
          show: true,
          disabled: false,
        },
      ],
      filter: {
        search: "",
      },
      stockshops: [],

      pagination: {
        page: 1,
        itemsPerPage: 2,
      },
      page: 1,
      status: [
        { text: "Active", value: "active" },
        { text: "Archived", value: "archived" },
      ],
    };
  },
  created() {
    this.GetStockDetails();
  },
  computed: {
    headers: function () {
      return this.columns.filter((item) => item.show == true);
    },
  },
  methods: {
    receiveStocksData(data) {
      this.stockshops = data;
    },
    setPaginationOptions(data) {
      this.paginationOptions = data;
    },
    // GetStockDetails(event) {
    //   this.isLoading = true;
    //   const shopid = this.$route.params.id;
    //   this.$store
    //     .dispatch("shop/GetStocksinShop", shopid)
    //     .then((resp) => {
    //       this.stockshops = resp;
    //       this.isLoading = false;
    //     })
    //     .catch((error) => console.log(error));
    //   this.isLoading = false;
    // },
  },
};
</script>
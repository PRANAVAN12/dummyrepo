<template>
  <ValidationObserver ref="observer" v-slot="{ validate, reset }">
    <v-container class="light gray lighten-12" fluid>
      <v-row class="ma-0 align-right sub-section">
        <TableFilters
          :filters="['search', 'biller', 'dateRange']"
          v-model="filter"
          :columns="columns"
        ></TableFilters>
      </v-row>
      <v-row>
        <!-- {{ saleshops }} -->
        <v-card-text class="pa-0">
          <v-data-table
            :items-per-page="paginationOptions.perPage"
            :fixed-header="true"
            hide-default-footer
            :items="saleshops"
            :headers="columns"
          >
            <template
              v-slot:item.date="{ item }"
              v-slot="{ errors }"
              name="value"
              rules="numeric"
              >{{ item.date | formatDate }}</template
            >

            <template v-slot:footer>
              <pagination
                @paginationOptions="setPaginationOptions"
                :url="`shops/${$route.params.id}/sales`"
                @response="receiveSalesData"
                :filter="filter"
                ref="pagination"
              />
            </template>
          </v-data-table>
        </v-card-text>
      </v-row>
    </v-container>
  </ValidationObserver>
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
      paginationOptions: {},
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
      filter: {
        search: "",
      },
      columns: [
        {
          text: "Date",
          value: "date",
          show: true,
          disabled: false,
        },

        {
          text: " Reference number",
          value: "reference_number",
          align: "center",
          show: true,
          disabled: false,
        },
        {
          text: "Biller",
          value: "biller.first_name",
          align: "center",
          show: true,
          disabled: false,
        },
        {
          text: "Customer",
          value: "customer.name",
          align: "center",
          show: true,
          disabled: false,
        },
        {
          text: "Total items",
          value: "total_items",
          align: "center",
          show: true,
          disabled: false,
        },
        {
          text: "Grand Total",
          value: "grand_total",
          align: "center",
          show: true,
          disabled: false,
        },
      ],

      saleshops: [],

      pagination: {
        page: 1,
        itemsPerPage: 2,
      },
      page: 1,
    };
  },
  created() {
    this.GetSalesDetails();
  },
  computed: {
    headers: function () {
      return this.columns.filter((item) => item.show == true);
    },
  },
  methods: {
    setPaginationOptions(data) {
      this.paginationOptions = data;
    },
    receiveSalesData(data) {
      this.saleshops = data;
    },

    // GetSalesDetails(event) {
    //   debugger;
    //   this.isLoading = true;
    //   const shopid = this.$route.params.id;
    //   this.$store
    //     .dispatch("shop/GetSalesinShop", shopid)
    //     .then((resp) => {
    //       debugger;
    //       this.saleshops = resp;
    //       this.isLoading = false;
    //     })
    //     .catch((error) => console.log(error));
    //   this.isLoading = false;
    // },
  },
};
</script>
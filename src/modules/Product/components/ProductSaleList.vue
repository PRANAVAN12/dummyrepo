<template>
  <div>
    <!-- <v-container fluid class="lighten-12 container"> -->
    <v-row>
      <v-col cols="12 py-0">
        <v-card>
          <!-- <v-card-title class="d-flex justify-space-between">
              Purchase List
            </v-card-title> -->
          <v-container fluid>
            <v-row>
              <v-col>
                <!-- Filters -->
                <v-row class="ma-0 align-right sub-section">
                  <TableFilters
                    :filters="['customer', 'biller', 'search', 'dateRange']"
                    v-model="filter"
                    :columns="columns"
                  ></TableFilters>
                </v-row>
                <!-- Data table -->
                <v-col cols="12">
                  <v-data-table
                    :items-per-page="paginationOptions.perPage"
                    :headers="headers"
                    :items="SalesList"
                    hide-default-footer
                  >
                    <template
                      v-slot:item.sale="{ item }"
                      v-slot="{ errors }"
                      name="value"
                      rules="numeric"
                      >{{ item.sale.date | formatDate }}</template
                    >
                    <!-- <template
                        v-slot:item.supplier="{ item }"
                        v-slot="{ errors }"
                        name="Quantity"
                        rules="numeric"
                        >{{ item.purchase.supplier | hasName }}</template
                      > -->
                    <!-- Actions -->
                    <template v-slot:item.actions="{ item }">
                      <v-menu offset-y transition="scroll-y-transition">
                        <template v-slot:activator="{ attrs, on }">
                          <v-icon v-bind="attrs" v-on="on"
                            >mdi-dots-vertical</v-icon
                          >
                        </template>
                        <v-list class="actions">
                          <v-list-item
                            dense
                            link
                            @click="viewPurchaseOrder(item)"
                          >
                            <span>
                              <v-icon v-bind="attrs" v-on="on">mdi-eye</v-icon
                              >View
                            </span>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </template>
                    <template v-slot:footer="{}">
                      <paginationComponent
                        @paginationOptions="setPaginationOptions"
                        :url="`${module}/${id}/sales`"
                        @response="receiveSalesData"
                        :filter="filter"
                      />
                      <!-- :url="'purchases-orders'" -->
                    </template>
                  </v-data-table>
                </v-col>

                <v-row> </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <!-- </v-container> -->
  </div>
</template>
<script>
import { PurchaseOrder } from "../../../models/EntityModels/PurchaseOrder";
import { required, email, max, numeric } from "vee-validate/dist/rules";
import { SupplierListViewModel } from "../../../models/View Models/Supplier";
// Mixins
import Suppliers from "@/mixins/Suppliers";
import _ from "lodash";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import { Product } from "../../../models/Product";
import PaymentComponent from "../../shared/components/PaymentComponent";

import { ProductViewModel } from "../../../models/View Models/ProductViewModel";
import paginationComponent from "../../shared/components/pagination.vue";
import { mapGetters } from "vuex";
import { has } from "lodash";

import TableFilters from "@/components/base/TableFilters";
extend("numeric", {
  ...numeric,
  message: "input must be numeric",
});
export default {
  mixins: [Suppliers],
  data: () => ({
    paginationOptions: {},
    messages: [],
    errors: [],
    products: [],
    warehouses: [],

    columns: [
      {
        text: "Date",
        value: "sale",
        show: true,
        disabled: true,
        align: "left",
      },
      {
        text: "Reference no",
        value: "sale.reference_number",
        show: true,
        disabled: false,
        align: "left",
      },
      {
        text: "Biller",
        value: "sale.biller.first_name",
        show: true,
        align: "left",
        disabled: false,
      },
      {
        text: "Customer",
        value: "sale.customer.name",
        show: true,
        disabled: false,
        align: "left",
      },
      {
        text: "Total Items",
        value: "sale.total_items",
        show: true,
        align: "center",
        disabled: false,
      },
      {
        text: "Grand Total",
        value: "sale.grand_total",
        show: true,
        align: "center",
        disabled: false,
      },
      // {
      //   text: "Actions",
      //   value: "actions",
      //   show: true,
      //   disabled: true,
      //   align: "center",
      //   width: "10%",
      // },
    ],
    // For Purchase Table Data
    SalesList: [],
    loadingSupplier: false,
    //For Filter
    date_range: [],
    filter: {
      invoice_status: "",
      start: "",
      end: "",
      amount: "",
      customer: "",
      search: "",
    },
    // menus
    // invoiceStatusOptions: ["All"],
    menu: false,
  }),
  props: {
    module: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    paginationComponent,
    PaymentComponent,
    TableFilters,
  },
  computed: {
    ...mapGetters(["getInvoiceStatusOptions"]),
    // ...mapGetters(["ProductStore", "GetAllProducts"]),
    // ...mapGetters(["supplier", "GetAllSuppliers"]),
    dateRangeText() {
      this.filter.start = this.date_range[0];
      this.filter.end = this.date_range[1];
      return this.date_range.join(" ~ ");
    },
    headers: function () {
      return this.columns.filter((item) => item.show == true);
    },
  },
  methods: {
    setPaginationOptions(data) {
      this.paginationOptions = data;
    },
    clearFilter() {
      this.filter = {};
      this.date_range = [];
    },
    receiveSalesData(data) {
      debugger;
      this.SalesList = data;
    },

    viewPurchaseOrder(purchaseOrder) {
      this.$router.push(`/purchase/${purchaseOrder.id}`);
    },
  },
  created() {
    this.getSuppliers();
  },
  filters: {
    hasName: function (value) {
      if (has(value, "name")) return value.name;
      else return "-";
    },
  },
};
</script>
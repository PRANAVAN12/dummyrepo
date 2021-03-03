<template>
  <div>
    <PageTitle
      title="Purchase Orders"
      :btnCreate="true"
      :createRoute="'/purchase-order/add'"
      :permission="'Purchase Order Create'"
    />
    <v-container fluid class="lighten-12 container">
      <v-card class="lighten-12 card-content">
        <TableFilters
          :filters="[
            'supplier',
            'search',
            'dateRange',
            'warehouse',
            'purchaseOrderStatus',
          ]"
          v-model="filter"
          :columns="columns"
        ></TableFilters>
      </v-card>
      <v-card class="lighten-12 mt-2">
        <v-container fluid class="light gray lighten-12">
          <ValidationObserver ref="observer">
            <form>
              <v-row v-if="messages.length != 0">
                <v-col>
                  <v-card>
                    <v-card-text>
                      <v-row>
                        <template>
                          <v-alert
                            v-for="msg in messages"
                            :key="msg"
                            class="messages"
                            outlined
                            type="error"
                            >{{ msg }}</v-alert
                          >
                        </template>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-card-text class="pa-0">
                  <v-data-table
                    :items-per-page="paginationOptions.perPage"
                    :headers="headers"
                    :items="PurchaseOrderList"
                    @click:row="$router.push(`purchase-order/${$event.id}`)"
                    class="row-pointer"
                    hide-default-footer
                  >
                    <template v-slot:no-data>
                      <div class="mt-16 container justify-center item-center">
                        <noData name="Order" />
                      </div>
                    </template>
                    <template v-slot:item.reference_number="{ item }">
                      <CopyTableCell
                        :text="item.reference_number"
                      ></CopyTableCell>
                    </template>
                    <template
                      v-slot:item.date="{ item }"
                      v-slot="{ errors }"
                      name="value"
                      rules="numeric"
                      >{{ item.date | formatDate }}</template
                    >
                    <template
                      v-slot:item.supplier="{ item }"
                      v-slot="{ errors }"
                      name="Quantity"
                      rules="numeric"
                      >{{ item.supplier | hasName }}</template
                    >
                    <template
                      v-slot:item.supplier="{ item }"
                      v-slot="{ errors }"
                      name="Quantity"
                      rules="numeric"
                      >{{ item.supplier.name }}</template
                    >

                    <template
                      v-slot:item.status="{ item }"
                      v-slot="{ errors }"
                      name="Quantity"
                      rules="numeric"
                    >
                      <v-chip
                        :x-small="true"
                        class="ma-2"
                        label
                        text-color="white"
                        :color="getPurchaseOrderStatusColor(item.status)"
                        dark
                        >{{ item.status }}</v-chip
                      >
                    </template>
                    <!-- Status -->
                    <template v-slot:item.is_active="{ item }">
                      <v-chip
                        :x-small="true"
                        class="ma-2"
                        label
                        text-color="white"
                        :color="getStatusColor(item.is_active)"
                        dark
                        >{{ item.is_active ? "Active" : "Archieved" }}</v-chip
                      >
                    </template>

                    <template v-slot:item.actions="{ item }">
                      <list-menu
                        feature="purchase-order"
                        :item="item"
                        viewPermission="Purchase Order Show"
                        editPermission="Purchase Order Edit"
                        @refreshList="refreshData"
                      ></list-menu>
                    </template>
                    <template v-slot:footer="{}">
                      <paginationComponent
                        @paginationOptions="setPaginationOptions"
                        :url="'purchases-orders'"
                        @response="receivePurchaseOrderData"
                        :filter="filter"
                        ref="pagination"
                      />
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-row>
            </form>
          </ValidationObserver>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import { PurchaseOrder } from "../../../models/EntityModels/PurchaseOrder";
import { required, email, max, numeric } from "vee-validate/dist/rules";
import { SupplierListViewModel } from "../../../models/View Models/Supplier";
import confirmation from "../../shared/components/confirmation";
import noData from "../../../components/shared/noItem";
import TableFilters from "@/components/base/TableFilters";
// Mixins
// import Suppliers from "@/mixins/Suppliers";

import _ from "lodash";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import { Product } from "../../../models/Product";
import { ProductViewModel } from "../../../models/View Models/ProductViewModel";
import paginationComponent from "../../shared/components/pagination.vue";
import { mapGetters } from "vuex";
import { has } from "lodash";

import * as moment from "moment/moment";

extend("numeric", {
  ...numeric,
  message: "input must be numeric",
});
export default {
  // mixins: [Suppliers],
  data: () => ({
    paginationOptions: {},
    purchaseOrderStatus: ["Pending", "Canceled", "Received"],
    messages: [],
    errors: [],
    status: [
      { text: "Active", value: "active" },
      { text: "Archived", value: "archived" },
    ],
    columns: [
      {
        text: "Date",
        value: "date",
        show: true,
        align: "left",
        disabled: true,
        width: "13.5%",
      },
      {
        text: "Reference no",
        value: "reference_number",
        show: true,
        align: "left",
        disabled: true,
        width: "13.5%",
      },

      {
        text: "Supplier",
        value: "supplier",
        show: true,
        align: "left",
        disabled: false,
        width: "12.5%",
      },

      {
        text: "Warehouse",
        value: "wareHouse.name",
        show: true,
        align: "left",
        disabled: true,
        width: "12.5%",
      },
      {
        text: "Purchase order status",
        value: "status",
        show: true,
        align: "center",
        disabled: false,
        width: "12.5%",
      },
      {
        text: "Actions",
        value: "actions",
        show: true,
        disabled: true,
        align: "center",
        width: "12.5%",
      },
    ],
    // For Purchase Order Table Data
    PurchaseOrderList: [],

    //For Filter
    date_range: [],
    filter: {
      invoice_status: "",
      start: "",
      end: "",
      amount: "",
      supplier: "",
      search: "",
      status: "",
    },
    menu: false,
  }),
  components: {
    ValidationProvider,
    ValidationObserver,
    paginationComponent,
    noData,
    TableFilters,
  },
  computed: {
    ...mapGetters(["getInvoiceStatusOptions"]),
    ...mapGetters(["supplier", "GetAllSuppliers"]),
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
    refreshData() {
      this.$refs.pagination.refreshData();
    },
    getStatusColor(is_active) {
      return is_active ? "green" : "gray";
    },

    clearFilter() {
      this.filter = {};
      this.date_range = [];
    },
    receivePurchaseOrderData(data) {
      data.forEach((element) => {
        console.log(element);
        element.selectedStatus = element.status;
      });
      this.PurchaseOrderList = data;
    },
    dateFormat: function (date) {
      return moment(date, "YYYY-MM-DD").format("DD/MM/YYYY");
    },

    archivePurchaseOrder(purchaseOrder) {},
    addPurchaseOrder() {
      this.$router.push(`purchase-order/add`);
    },
    getPurchaseOrderStatusColor(status) {
      switch (status) {
        case "Received":
          return "green";
          break;
        case "Pending":
          return "orange";
          break;
        case "Canceled":
          return "red";
          break;
        default:
          break;
      }
    },
  },

  filters: {
    hasName: function (value) {
      if (has(value, "name")) return value.name;
      else return "-";
    },
  },
};
</script>

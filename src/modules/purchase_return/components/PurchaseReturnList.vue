<template>
  <div>
    <PageTitle
      title="Purchase Returns"
      :btnCreate="true"
      :createRoute="'/purchase-return/add'"
      :permission="'Purchase Return Create'"
    />

    <v-container fluid class="lighten-12 container">
      <v-card class="lighten-12 card-content">
        <TableFilters
          :filters="['supplier', 'status', 'search', 'dateRange','warehouse']"
          v-model="filter"
          :columns="columns"
        ></TableFilters>
      </v-card>

      <v-card class="lighten-12 mt-2 pa-3">
        <v-container fluid class="light gray lighten-12">
          <ValidationObserver ref="observer">
            <form>
              <v-row v-if="messages.length != 0">
                <v-col cols="12" xs="12" sm="6" md="2" lg="2" xl="2">
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
                    :items="PurchaseReturnList"
                    @click:row="$router.push(`purchase-return/${$event.id}`)"
                    class="row-pointer"
                    hide-default-footer
                  >
                    <template v-slot:no-data>
                      <div class="mt-16 container justify-center item-center">
                        <noData name="Purchase Return" />
                      </div>
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
                    <!-- Status -->

                    <template v-slot:item.is_active="{ item }">
                      <!-- {{item.is_active}}jghuhuh -->
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
                    <template v-slot:item.reference_number="{ item }">
                      <CopyTableCell
                        :text="item.reference_number"
                      ></CopyTableCell>
                    </template>
                    <template v-slot:item.actions="{ item }">
                      <list-menu
                        feature="purchase-return"
                        :item="item"
                        viewPermission="Purchase Return Show"
                        editPermission="Purchase Return Edit"
                        softDeletePermission="Purchase Return Soft Delete"
                        @refreshList="refreshData"
                      ></list-menu>
                    </template>
                    <template v-slot:footer="{}">
                      <paginationComponent
                        @paginationOptions="setPaginationOptions"
                        :url="'purchase-return'"
                        @response="receivePurchaseReturnsData"
                        :filter="filter"
                        ref="pagination"
                      />
                      <!-- :url="'purchases-orders'" -->
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
import { required, email, max, numeric } from "vee-validate/dist/rules";
import noData from "../../../components/shared/noItem";
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
import { has } from "lodash";

import * as moment from "moment/moment";
import confirmation from "../../shared/components/confirmation";
import TableFilters from "@/components/base/TableFilters";

extend("numeric", {
  ...numeric,
  message: "input must be numeric",
});
export default {
  data: () => ({
    paginationOptions: {},
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
        disabled: false,
        width: "16.5%",
      },
      {
        text: "Reference Number",
        value: "reference_number",
        show: true,
        align: "left",
        disabled: false,
        width: "16.5%",
      },
      {
        text: "Supplier",
        value: "supplier",
        show: true,
        align: "left",
        disabled: false,
        width: "16.5%",
      },

      {
        text: "Warehouse",
        value: "wareHouse.name",
        show: true,
        align: "left",
        disabled: true,
        width: "16.5%",
      },

      {
        text: " Status",
        value: "is_active",
        show: true,
        disabled: false,
        align: "center",
        width: "16.5%",
      },
      {
        text: "Actions",
        value: "actions",
        show: true,
        disabled: false,
        align: "center",
        width: "16.5%",
      },
    ],
    PurchaseReturnList: [],
    date_range: [],
    filter: {
      invoice_status: "",
      start: "",
      end: "",
      amount: "",
      supplier: "",
      search: "",
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
    headers: function () {
      return this.columns.filter((item) => item.show == true);
    },
  },
  methods: {
    setPaginationOptions(data) {
      this.paginationOptions = data;
    },
    receivePurchaseReturnsData(data) {
      this.PurchaseReturnList = data;
    },

    getStatusColor(is_active) {
      return is_active ? "green" : "gray";
    },

    refreshData() {
      this.$refs.pagination.refreshData();
    },
    dateFormat: function (date) {
      return moment(date).format("DD/MM/YYYY");
    },
    viewPurchaseReturn(purchaseReturn) {
      this.$router.push(`purchase-return/${purchaseReturn.id}`);
    },
    editPurchaseReturn(purchaseReturn) {
      this.$router.push(`purchase-return/edit/${purchaseReturn.id}`);
    },
    archivePurchaseReturn(purchaseReturn) {},
    addPurchaseReturn() {
      this.$router.push(`purchase-return/add`);
    },
  },
  created() {},
  watch: {},
  filters: {
    hasName: function (value) {
      if (has(value, "name")) return value.name;
      else return "-";
    },
  },
};
</script>

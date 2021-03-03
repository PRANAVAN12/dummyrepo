<template>
  <div>
    <!-- <v-container fluid class="lighten-12 container"> -->
    <v-row>
      <v-col cols="12 py-0">
        <v-card>
          <!-- <v-card-title class="d-flex justify-space-between">
              Purchase Return List
            </v-card-title> -->
          <v-container fluid>
            <v-row>
              <v-col>
                <!-- Filters -->
                <v-row class="ma-0 align-right sub-section">
                  <TableFilters
                    :filters="['supplier', 'status', 'search', 'dateRange']"
                    v-model="filter"
                    :columns="columns"
                  ></TableFilters>
                </v-row>
                <!-- Data table -->
                <v-row>
                  <!-- {{PurchaseReturnList}} -->
                  <v-col cols="12">
                    <v-data-table
                      :items-per-page="paginationOptions.perPage"
                      :headers="headers"
                      :items="PurchaseReturnList"
                      hide-default-footer
                    >
                      <template
                        v-slot:item.date="{ item }"
                        v-slot="{ errors }"
                        name="value"
                        rules="numeric"
                        >{{ item.purchaseReturn.date | formatDate }}</template
                      >
                      <template
                        v-slot:item.supplier="{ item }"
                        v-slot="{ errors }"
                        name="Quantity"
                        rules="numeric"
                        >{{ item.purchaseReturn.supplier | hasName }}</template
                      >
                      <template
                        v-slot:item.status="{ item }"
                        v-slot="{ errors }"
                        name="status"
                        rules="numeric"
                      >
                        <v-chip
                          :x-small="true"
                          class="ma-2"
                          label
                          dark
                          text-color="white"
                          :color="item.purchaseReturn.is_active | StatusColor"
                        >
                          {{ item.purchaseReturn.is_active | status }}
                        </v-chip>
                      </template>

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
                              :to="'/purchase-return/' + item.id"
                              link
                            >
                              <span>
                                <v-icon v-bind="attrs" v-on="on">mdi-eye</v-icon
                                >View
                              </span>
                            </v-list-item>
                            <v-list-item
                              dense
                              @click.stop="editPurchaseReturn(item)"
                              link
                            >
                              <span>
                                <v-icon v-bind="attrs" v-on="on"
                                  >mdi-pencil-box-outline</v-icon
                                >Edit
                              </span>
                            </v-list-item>

                            <!-- <v-list-item
                                link
                                dense
                                @click="archivePurchaseReturn(item)"
                              >
                                <span>
                                  <v-icon v-bind="attrs" v-on="on">
                                    {{
                                      item.status == "Archived"
                                        ? "mdi-checkbox-marked-circle"
                                        : "mdi-archive"
                                    }}
                                  </v-icon>
                                  {{
                                    item.status == "Archived"
                                      ? "Active"
                                      : "Archive"
                                  }}
                                </span>
                              </v-list-item> -->
                          </v-list>
                        </v-menu>
                      </template>
                      <template v-slot:footer="{}">
                        <paginationComponent
                          @paginationOptions="setPaginationOptions"
                          :url="`${module}/${id}/purchase-returns`"
                          @response="receivePurchaseReturnsData"
                          :filter="filter"
                        />
                        <!-- :url="'purchases-orders'" -->
                      </template>
                    </v-data-table></v-col
                  >
                </v-row>
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
// Mixins
import Suppliers from "@/mixins/Suppliers";
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
    columns: [
      {
        text: "Date",
        value: "date",
        show: true,
        align: "left",
        disabled: false,
      },
      {
        text: "Supplier",
        value: "supplier",
        show: true,
        align: "left",
        disabled: false,
      },
      {
        text: "Status",
        value: "status",
        show: true,
        disabled: false,
        align: "center",
        width: "10%",
      },
      {
        text: "Actions",
        value: "actions",
        show: true,
        disabled: false,
        align: "center",
        width: "10%",
      },
    ],
    // For Purchase Order Table Data
    PurchaseReturnList: [],
    filter: {
      invoice_status: "",
      start: "",
      end: "",
      amount: "",
      supplier: "",
      search: "",
    },
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

    viewPurchaseReturn(purchaseOrder) {
      this.$router.push(`purchase-return/${purchaseOrder.id}`);
    },
    editPurchaseReturn(purchaseOrder) {
      this.$router.push(`purchase-return/edit/${purchaseOrder.id}`);
    },
    archivePurchaseReturn(purchaseOrder) {},
    addPurchaseReturn() {
      this.$router.push(`purchase-return/add`);
    },
  },
  created() {},
  filters: {
    hasName: function (value) {
      if (has(value, "name")) return value.name;
      else return "-";
    },
    status: function (value) {
      return value ? "Active" : "Archived";
    },
    StatusColor: function (value) {
      return value ? "green" : "gray";
    },
  },
};
</script>

<template>
  <div>
    <PageTitle
      title="Stock Transfers"
      :btnCreate="true"
      :createRoute="'/stock-transfer/add'"
      :permission="'Transfer Create'"
    />
    <v-container fluid class="lighten-12 container">
      <v-card class="lighten-12 card-content">
        <TableFilters
          :filters="[ 'search', 'dateRange','transferStatus','shop','warehouse']"
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
                    :items="PurchaseList"
                    @click:row="$router.push(`stock-transfer/${$event.id}`)"
                    class="row-pointer"
                    hide-default-footer
                  >
                    <template v-slot:no-data>
                      <div class="mt-16 container justify-center item-center">
                        <noData name="Purchase" />
                      </div>
                    </template>
                    <template v-slot:item.reference_number="{ item }">
                      <CopyTableCell
                        :text="item.reference_number"
                      ></CopyTableCell>
                    </template>
                    <template v-slot:item.status="{ item }">
                      <v-chip
                        :x-small="true"
                        label
                        text-color="white"
                        :color="GetChequeStatusColor(item.status)"
                        dark
                        >{{ item.status }}</v-chip
                      ></template
                    >
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
                    <template v-slot:item.date="{ item }">{{
                      item.date | formatDate
                    }}</template>

                    <!-- Actions -->
                    <template v-slot:item.actions="{ item }">
                      <list-menu
                        v-if="item.status == 'Pending'"
                        feature="stock-transfer"
                        :item="item"
                        viewPermission="Transfer Show"
                        editPermission="Transfer Edit"
                        @refreshList="refreshData"
                      ></list-menu>
                      <list-menu
                        v-if="item.status != 'Pending'"
                        feature="stock-transfer"
                        :item="item"
                        viewPermission="Transfer Show"
                        @refreshList="refreshData"
                      ></list-menu>
                    </template>
                    <template v-slot:footer="{}">
                      <paginationComponent
                        @paginationOptions="setPaginationOptions"
                        :url="'transfers'"
                        @response="receivePurchaseData"
                        :filter="filter"
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
import { PurchaseOrder } from "../../../models/EntityModels/PurchaseOrder";
import { required, email, max, numeric } from "vee-validate/dist/rules";
import noData from "../../../components/shared/noItem";
import TableFilters from "@/components/base/TableFilters";

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

import { ProductViewModel } from "../../../models/View Models/ProductViewModel";
import paginationComponent from "../../shared/components/pagination.vue";
import { mapGetters } from "vuex";
import { has } from "lodash";

import confirmation from "../../shared/components/confirmation";

extend("numeric", {
  ...numeric,
  message: "input must be numeric",
});
export default {
  data: () => ({
    paginationOptions: {},
    messages: [],
    status: [
      { text: "Active", value: "active" },
      { text: "Archived", value: "archived" },
    ],

    columns: [
      {
        text: "Date",
        value: "date",
        show: true,
        disabled: false,
        width: "16.5%",
      },
      {
        text: "Reference No",
        value: "reference_number",
        show: true,
        disabled: false,
        align: "left",
        width: "16.5%",
      },

      {
        text: "Warehouse",
        value: "wareHouse.name",
        show: true,
        disabled: true,
        align: "left",
        width: "16.5%",
      },
      {
        text: "Shop",
        value: "shop.name",
        show: true,
        disabled: false,
        align: "left",
        width: "16.5%",
      },

      {
        text: "Status",
        value: "status",
        show: true,
        disabled: false,
        align: "center",
        width: "16.5%",
      },
      {
        text: "Actions",
        value: "actions",
        show: true,
        disabled: true,
        align: "center",
        width: "16.5%",
      },
    ],
    PurchaseList: [],
    filter: {},
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
    headers: function () {
      return this.columns.filter((item) => item.show == true);
    },
  },
  methods: {
    setPaginationOptions(data) {
      this.paginationOptions = data;
    },
    receivePurchaseData(data) {
      this.PurchaseList = data;
    },
    ArchiveOrActivePurchase(PurchaseList) {
      this.$store
        .dispatch("purchase/ArchiveOrActicePurchase", PurchaseList.id)
        .then((res) => {
          PurchaseList.is_active = !PurchaseList.is_active;
          var msg = PurchaseList.is_active ? "activated" : "archived";
          console.log(msg);
          this.$toast.success("Successfully  " + msg);
        })
        .catch((err) => {
          this.isLoading = false;
          this.messages = err.data.title;
        });
    },

    getStatusColor(status) {
      return status ? "green" : "gray";
    },

    openConfirmation(PurchaseList) {
      confirmation.dialog = true;
      this.$confirm(
        "Do you want to " +
          (PurchaseList.is_active ? "Archive" : "Activate  ") +
          "?"
      ).then((res) => {
        if (res) {
          this.ArchiveOrActivePurchase(PurchaseList);
        }
      });
    },
    GetChequeStatusColor(status) {
      switch (status) {
        case "Completed":
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
    ViewStockTransfer(item) {
      this.$router.push(`/stockTransfer/${item.id}`);
    },
    editPurchaseOrder(transfer) {
      this.$router.push(`stocktransfer/${transfer.id}/edit`);
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

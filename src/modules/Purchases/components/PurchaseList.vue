<template>
  <div>
    <PageTitle
      title="Purchases"
      :btnCreate="true"
      :createRoute="'/purchase/add'"
      :permission="'Purchase Create'"
    />
    <v-container fluid class="lighten-12 container">
      <v-card class="lighten-12 card-content">
        <TableFilters
          :filters="[
            'supplier',
            'search',
            'dateRange',
            'total',
            'warehouse',
            'purchaseStatus',
          ]"
          v-model="filter"
          :columns="columns"
        ></TableFilters>
      </v-card>

      <v-card class="lighten-12 mt-2 list-table">
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
                    @click:row="$router.push(`purchase/${$event.id}`)"
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
                    <!-- Status -->

                    <template v-slot:item.date="{ item }">{{
                      item.date | formatDate
                    }}</template>

                    <template v-slot:item.paid_amount="{ item }"
                      ><strong class="px-4">{{
                        item.paid_amount | formatCurrency
                      }}</strong></template
                    >

                    <template v-slot:item.due="{ item }"
                      ><strong class="px-4">{{
                        item.due | formatCurrency
                      }}</strong></template
                    >

                    <template v-slot:item.total_amount="{ item }"
                      ><strong class="px-4">{{
                        item.total_amount | formatCurrency
                      }}</strong></template
                    >
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

                    <template v-slot:item.payment_status="{ item }">
                      <v-chip
                        :x-small="true"
                        label
                        text-color="white"
                        :color="
                          item.paid_amount &&
                          item.sub_total_amount <= item.paid_amount
                            ? 'green'
                            : '#FF4D4D'
                        "
                        dark
                      >
                        {{
                          getPaymentStatus(
                            item.sub_total_amount,
                            item.paid_amount
                          )
                        }}
                      </v-chip></template
                    >

                    <!-- Actions -->
                    <template v-slot:item.actions="{ item }">
                      <list-menu
                        v-if="item.status == 'Pending'"
                        feature="purchase"
                        :item="item"
                        viewPermission="Purchase Show"
                        editPermission="Purchase Edit"
                        @refreshList="refreshData"
                      ></list-menu>
                      <list-menu
                        v-if="item.status != 'Pending'"
                        feature="purchase"
                        :item="item"
                        viewPermission="Purchase Show"
                        @refreshList="refreshData"
                      ></list-menu>
                    </template>

                    <template
                      slot="body.append"
                      v-if="PurchaseList && PurchaseList.length > 0"
                    >
                      <tr class="black--text">
                        <th class="title"></th>
                        <th class="title"></th>
                        <th class="title"></th>
                        <th class="title"></th>
                        <th class="title"></th>
                        <th>
                          <h3 class="justify-content-end pr-2">
                            {{ total | formatCurrency }}
                          </h3>
                        </th>

                        <th>
                          <h3 class="justify-content-end">
                            {{ paid | formatCurrency }}
                          </h3>
                        </th>
                        <th>
                          <h3 class="justify-content-end">
                            {{ due | formatCurrency }}
                          </h3>
                        </th>
                        <th class="title"></th>
                      </tr>
                    </template>

                    <template v-slot:footer="{}">
                      <paginationComponent
                        @paginationOptions="setPaginationOptions"
                        :url="'purchases'"
                        @response="receivePurchaseData"
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
        align: "left",
        disabled: false,
        width: "8%",
      },
      {
        text: "Reference No",
        value: "reference_number",
        show: true,
        align: "left",
        disabled: false,
        width: "12%",
      },

      {
        text: "Supplier",
        value: "supplier.name",
        align: "left",
        show: true,
        disabled: false,
        width: "9%",
      },
      {
        text: "Warehouse",
        value: "wareHouse.name",
        show: true,
        disabled: true,
        width: "9%",
        align: "left",
      },

      {
        text: "Purchase Status",
        value: "status",
        show: true,
        disabled: false,
        align: "center",
        width: "10%",
      },

      {
        text: "Total",
        value: "total_amount",
        show: true,
        disabled: true,
        width: "9%",
        align: "right",
      },
      {
        text: "Paid",
        value: "paid_amount",
        show: true,
        disabled: true,

        width: "9%",
        align: "right",
      },
      {
        text: "Due",
        value: "due",
        show: true,
        disabled: true,

        width: "8%",
        align: "right",
      },
      {
        text: "Payment Status",
        value: "payment_status",
        show: true,
        disabled: false,
        align: "center",
        width: "10%",
      },

      {
        text: "Actions",
        value: "actions",
        show: true,
        disabled: true,
        align: "center",
        width: "9%",
      },
    ],
    PurchaseList: [],
    filter: {
      invoice_status: "",
      start: "",
      end: "",
      amount: "",
      supplier: "",
      search: "",
    },
    menu: false,
    total: 0,
    paid: 0,
    due: 0,
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
    getPaymentStatus(total, paid) {
      return total <= paid ? "Paid" : "Due";
    },
    setPaginationOptions(data) {
      this.paginationOptions = data;
    },
    refreshData() {
      this.$refs.pagination.refreshData();
    },
    receivePurchaseData(data) {
      this.PurchaseList = data;
      this.PurchaseList.forEach((element) => {
        element["due"] = element.sub_total_amount - element.paid_amount;
      });
      this.due = this.sumField(this.PurchaseList, "due");
      this.total = this.sumField(this.PurchaseList, "total_amount");
      this.paid = this.sumField(this.PurchaseList, "paid_amount");
    },

    sumField(array, filed) {
      let value = 0;
      array.forEach((element) => {
        value += element[filed];
      });
      return value;
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
    getStatusColor(status) {
      return status ? "green" : "gray";
    },

    viewPurchaseOrder(purchaseOrder) {
      this.$router.push(`/purchases/${purchaseOrder.id}`);
    },
    editPurchaseOrder(purchaseOrder) {
      this.$router.push(`/purchases/edit/${purchaseOrder.id}`);
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
<style >
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  /* padding: 0 !important; */
}
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr:last-child
  > th {
  /* padding: 0 !important; */
}
.v-application--is-ltr
  .v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr
  > th {
  /* padding: 0 !important; */
}
</style>
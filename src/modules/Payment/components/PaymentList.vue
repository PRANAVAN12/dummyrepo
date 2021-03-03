<template>
  <div>
    <PageTitle title="Payments" :permission="'Purchase Create'" />
    <v-container fluid class="lighten-12 container">
      <v-card class="lighten-12 card-content">
        <TableFilters
          :filters="['paymentType', 'type', 'search', 'dateRange','transferStatus']"
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
                    :items="PaymentList"
                    @click:row="$router.push(`payment/${$event.id}`)"
                    class="row-pointer"
                    hide-default-footer
                  >
                    <template v-slot:no-data>
                      <div class="mt-16 container justify-center item-center">
                        <noData name="Payments" />
                      </div>
                    </template>

                    <template v-slot:item.status="{ item }">
                      <v-chip
                        :x-small="true"
                        class="ma-2"
                        label
                        text-color="white"
                        :color="GetPaymentStatusColor(item.status)"
                        dark
                        >{{ item.status }}</v-chip
                      >
                    </template>
                    <template v-slot:item.user="{ item }">
                      {{ item.user ? item.user.first_name : "" }}
                    </template>
                    <template v-slot:item.date="{ item }">{{
                      item.date | formatDate
                    }}</template>

                    <template v-slot:item.amount="{ item }"><strong class="px-4">{{
                      item.amount | formatCurrency
                    }}</strong></template>

                    <template v-slot:item.actions="{ item }">
                      <v-menu offset-y transition="scroll-x-transition">
                        <template v-slot:activator="{ attrs, on }">
                          <v-icon v-bind="attrs" v-on="on"
                            >mdi-dots-vertical</v-icon
                          >
                        </template>
                        <v-list class="actions">
                          <permission-control permissionName="Purchase Show">
                            <v-list-item dense link @click="viewPayment(item)">
                              <span>
                                <v-icon v-bind="attrs" v-on="on">mdi-eye</v-icon
                                >View
                              </span>
                            </v-list-item>
                          </permission-control>
                        </v-list>
                      </v-menu>
                    </template>

                    <template
                      slot="body.append"
                      v-if="PaymentList && PaymentList.length > 0"
                    >
                      <tr class="black--text">
                        <th class="title"></th>
                        <th class="title"></th>
                        <th class="title"></th>
                        <th class="title"></th>

                        <th>
                          <h3 class="justify-content-end pl-2">
                          {{ total | formatCurrency }}
                          </h3>
                        </th>

                        <th class="title"></th>
                        <th class="title"></th>
                      </tr>
                    </template>

                    <template v-slot:footer="{}">
                      <paginationComponent
                        @paginationOptions="setPaginationOptions"
                        :url="'payments'"
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
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

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
    status: ["Pending", "Canceled", "Received"],

    columns: [
      {
        text: "Date",
        value: "date_time",
        show: true,
        disabled: false,
        width: "16.5%",
      },
      {
        text: "Payment type",
        value: "payment_type",
        show: true,
        align: "left",
        disabled: false,
        width: "16.5%",
      },
      {
        text: "Payment For",
        value: "paymentable_type",
        align: "center",
        show: true,
        disabled: false,
        width: "15%",
      },
      {
        text: "User",
        value: "user",
        align: "center",
        show: true,
        disabled: false,
        width: "15%",
      },
      {
        text: "Payment Amount",
        value: "amount",
        align: "right",
        show: true,
        disabled: false,
        width: "15%",
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
    PaymentList: [],
    filter: {
      // invoice_status: "",
      paymentType: "",
      start: "",
      end: "",
      // amount: "",
      // supplier: "",
      // search: "",
    },
    menu: false,
    total: 0,
    paid: 0,
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
      this.PaymentList = data;

      this.total = this.sumField(this.PaymentList, "amount");
    },
    GetPaymentStatusColor(status) {
      switch (status) {
        case "Cancelled":
          return "red";
          break;
        case "Pending":
          return "orange";
          break;
        case "Completed":
          return "green";
          break;
        default:
          break;
      }
    },
    ArchiveOrActivePurchase(PaymentList) {
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
    sumField(array, filed) {
      let value = 0;
      array.forEach((element) => {
        value += parseFloat(element[filed]);
      });
      return value;
    },

    getStatusColor(status) {
      return status ? "green" : "gray";
    },

    openConfirmation(PaymentList) {
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
    viewPayment(payment) {
      this.$router.push(`/payment/${payment.id}`);
    },
    editPurchaseOrder(purchaseOrder) {
      this.$router.push(`/purchase/edit/${purchaseOrder.id}`);
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


<template>
  <div>
    <v-row>
      <v-col cols="12 py-0">
        <v-card>
          <v-container fluid>
            <v-row>
              <v-col>
                <!-- Filters -->
                <v-row class="ma-0 align-right sub-section">
                  <TableFilters
                    :filters="[
                      'paymentType',
                      'type',
                      'search',
                      'dateRange',
                      'paymentStatus',
                    ]"
                    v-model="filter"
                    :columns="columns"
                  ></TableFilters>
                  <ImportExportMenu></ImportExportMenu>
                </v-row>
                <!-- Data table -->
                <v-row>
                  <v-col cols="12">
                    <v-data-table
                      :items-per-page="paginationOptions.perPage"
                      :headers="headers"
                      :items="payment"
                      :search="search"
                      @click:row="$router.push(`/payment/${$event.id}`)"
                      hide-default-footer
                      :loading="loading"
                      loading-text="Loading... Please wait"
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

                      <template v-slot:item.amount="{ item }"> <strong class="px-4">{{
                        item.amount | formatCurrency
                      }}</strong></template>

                      <template v-slot:footer="{}">
                        <tr class="black--text">
                          <th>
                            <h3 class="justify-content-end pl-2">
                              Total Paid Amount : {{ total | formatCurrency }}
                            </h3>
                          </th>
                        </tr>
                        <paginationComponent
                          @paginationOptions="setPaginationOptions"
                          :url="'customers/' + customerId + '/payments'"
                          :filter="filter"
                          @response="receivePurchaseResponse"
                        />
                      </template>
                      <template
                        slot="body.append"
                        v-if="PaymentList && PaymentList.length > 0"
                      >
                      </template> </v-data-table
                  ></v-col>
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

<!-- *************************************************************************
	SCRIPT
	************************************************************************* -->
<script>
import datePickComponent from "../../../components/base/DateComponent.vue";

import paginationComponent from "../../shared/components/pagination.vue";
import TableFilters from "@/components/base/TableFilters";
import moment from "moment";

export default {
  data() {
    return {
      paginationOptions: {},
      loading: true,
      search: "",
      total: 0,
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
      ],
      payment: [],
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
      filter: {
        paymentType: "",
        start: "",
        end: "",
        paymentStatus: "",
      },
      date_range: [],
    };
  },

  methods: {
    setPaginationOptions(data) {
      this.paginationOptions = data;
    },
    receivePurchaseResponse(payment) {
      this.payment = payment;

      this.total = this.sumField(this.payment, "amount");
      this.loading = false;
    },
    clearFilter() {
      this.filter = {};
    },
    SetSuplierId() {
      this.customerId = this.$route.params.id;
    },
    startDate(date) {
      return moment(date, "YYYY-MM-DD").format("DD/MM/YYYY");
    },
    GetAllPayments() {
      this.$store
        .dispatch("purchase/AddPayment", 1)
        .then((res) => {
          self.siteSetting = res.data;

          this.Supplier.addresses.forEach((address) => {
            address.country_id = self.siteSetting.country.id;
          });
        })
        .catch((err) => {
          this.messages = err.data.title;
        });
    },
    sumField(array, filed) {
      debugger;
      let value = 0;
      array.forEach((element) => {
        value += parseFloat(element[filed]);
      });
      return value;
    },
  },

  mounted() {},

  components: {
    datePickComponent,
    paginationComponent,
    TableFilters,
  },
  created() {
    this.SetSuplierId();
  },

  computed: {
    dateRangeText() {
      this.filter.start = this.date_range[0];
      this.filter.end = this.date_range[1];
      return this.date_range.join(" ~ ");
    },
    // Filter - return selected table fields
    headers: function () {
      return this.columns.filter((item) => item.show == true);
    },
  },
};
</script>
<style scoped></style>

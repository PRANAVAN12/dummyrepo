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
                      'saleType',
                      'search',
                      'dateRange',
                      'paymentStatus',
                      'shop'
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
                        @click:row="$router.push(`/sales/view/${$event.id}`)"
                        hide-default-footer
                        :loading="loading"
                        loading-text="Loading... Please wait"
                    >
                      <template v-slot:no-data>
                        <div class="mt-16 container justify-center item-center">
                          <noData name="Payments" />
                        </div>
                      </template>
                      <template slot="body.append">
                        <tr
                            class="black--text"
                            v-if="total > 0"
                        >
                          <th class="title"></th>
                          <th class="title"></th>


                          <th>
                            <h3>  {{totalSales|formatCurrency

                              }}</h3>
                          </th>
                          <th  class="text-center">
                            <h3> {{discountAmount|formatCurrency}} </h3>
                          </th>
                          <th class="text-center">
                            <h3>  {{total|formatCurrency

                              }}</h3>
                          </th>
                          <th class=" text-right">
                            <h3>  </h3>
                          </th>
                        </tr>
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

                        <paginationComponent
                            @paginationOptions="setPaginationOptions"
                            :url="'customers/' + customerId + '/sales'"
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
      totalSales:0,
      discountAmount:0,
      columns: [
        {
          text: "Date",
          value: "date",
          show: true,
          disabled: false,
          width: "16.5%",
        },
        {
          text: "Shop",
          value: "shop.name",
          show: true,
          disabled: false,
          width: "16.5%",
        },
        {
          text: "Total Amount",
          value: "grand_total",
          show: true,
          align: "left",
          disabled: false,
          width: "16.5%",
        },

        {
          text: "Discount Amount",
          value: "discount_amount",
          align: "center",
          show: true,
          disabled: false,
          width: "15%",
        },
        {
          text: "Paid Amount",
          value: "paid_amount",
          align: "center",
          show: true,
          disabled: false,
          width: "15%",
        },
        {
          text: " Type",
          value: "sale_type",
          align: "center",
          show: true,
          disabled: false,
          width: "15%",
        },
        {
          text: "Biller",
          value: "biller.first_name",
          align: "center",
          show: true,
          disabled: false,
          width: "15%",
        },


        {
          text: "Payment Status",
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

      this.total = this.sumField(this.payment, "paid_amount");
      this.totalSales=this.sumField(this.payment,'grand_total')
      this.discountAmount=this.sumField(this.payment,'discount_amount')
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

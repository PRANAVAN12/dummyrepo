<template>
  <v-container fluid class="lighten-12 content">
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
        <h2>
          Welcome
          {{
            user.first_name.charAt(0).toUpperCase() +
            user.first_name.substring(1) +
            " " +
            user.last_name.charAt(0).toUpperCase() +
            user.last_name.substring(1)
          }}
        </h2>
      </v-col>
      <v-col
        cols="12"
        xs="12"
        sm="12"
        md="6"
        lg="6"
        xl="6"
        class="d-flex justify-end"
      >
        <v-btn-toggle
          v-model="summaryRange"
          @change="getDashboardSummary()"
          shaped
          mandatory
          dense
          background-color="grey"
        >
          <v-btn>
            <span class="hidden-sm-and-down">Today</span>
          </v-btn>

          <v-btn>
            <span class="hidden-sm-and-down">Last 7 days</span>
          </v-btn>

          <v-btn>
            <span class="hidden-sm-and-down">This Month</span>
          </v-btn>

          <v-btn>
            <span class="hidden-sm-and-down">This Year</span>
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <v-divider></v-divider>
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
        <v-row>
          <v-col
            cols="12"
            xs="12"
            sm="12"
            md="3"
            lg="3"
            xl="3"
            style="
              background: linear-gradient(
                to left,
                rgb(244 244 244) 0%,
                rgb(244 244 244) 100%
              ) !important;
            "
            class="py-0 d-flex"
          >
            <v-card class="lighten-12 card-content py-0" width="100%">
              <div class="pt-4 pl-4"><strong>Total Customers</strong></div>
              <div class="amount pl-4">
                {{ dashBoardSummary.total_customers }}
              </div>
              <div class="pb-4 pl-4">
                <span class="py-5" style="color: green">
                  <strong>
                    {{
                      getCustomerPercentage(
                        dashBoardSummary.total_customers,
                        dashBoardSummary.active_customers
                      )
                    }}%
                  </strong></span
                >Active
              </div>
            </v-card>
          </v-col>
          <v-col
            cols="12"
            xs="12"
            sm="12"
            md="3"
            lg="3"
            xl="3"
            style="
              background: linear-gradient(
                to left,
                rgb(244 244 244) 0%,
                rgb(244 244 244) 100%
              ) !important;
            "
            class="py-0 d-flex"
          >
            <v-card class="lighten-12 card-content py-0" width="100%">
              <div class="pt-4 pl-4">
                <strong>{{ getRangeText() }} Sales</strong>
              </div>
              <div class="amount pl-4">
                {{ dashBoardSummary.sales_amount | formatCurrency }}
              </div>
              <div class="pb-4 pl-4">
                <span>
                  <strong> {{ dashBoardSummary.sales_count }}</strong>
                </span>
                {{ dashBoardSummary.sales_count > 1 ? "Sales" : "Sale" }}
              </div>
            </v-card>
          </v-col>
          <v-col
            cols="12"
            xs="12"
            sm="12"
            md="3"
            lg="3"
            xl="3"
            style="
              background: linear-gradient(
                to left,
                rgb(244 244 244) 0%,
                rgb(244 244 244) 100%
              ) !important;
            "
            class="py-0 d-flex"
          >
            <v-card class="lighten-12 card-content py-0" width="100%">
              <div class="pt-4 pl-4">
                <strong> {{ getRangeText() }} Purchases</strong>
              </div>
              <div class="amount pl-4">
                {{ dashBoardSummary.purchase_amount | formatCurrency }}
              </div>
              <div class="pb-4 pl-4">
                <span>
                  <strong> {{ dashBoardSummary.purchase_count }}</strong>
                </span>
                {{
                  dashBoardSummary.purchase_count > 1 ? "Purchases" : "Purchase"
                }}
              </div>
            </v-card>
          </v-col>
          <v-col
            cols="12"
            xs="12"
            sm="12"
            md="3"
            lg="3"
            xl="3"
            style="
              background: linear-gradient(
                to left,
                rgb(244 244 244) 0%,
                rgb(244 244 244) 100%
              ) !important;
            "
            class="py-0 d-flex"
          >
            <v-card class="lighten-12 card-content py-0" width="100%">
              <div class="pt-4 pl-4">
                <strong> {{ getRangeText() }} Expenses</strong>
              </div>
              <div class="amount pl-4">
                {{ dashBoardSummary.expense_amount | formatCurrency }}
              </div>
              <div class="pb-4 pl-4">
                <span>
                  <strong> {{ dashBoardSummary.expense_count }}</strong>
                </span>
                {{
                  dashBoardSummary.expense_count > 1 ? "Expenses" : "Expense"
                }}
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
        <v-row v-if="false">
          <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
            <v-card class="lighten-12 card-content pa-5">
              <div>Sales:Warehouse/Product Category</div>
              <LineChart />
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12"
            ><v-card class="lighten-12 card-content pa-5">
              <CategoryPieChart />
            </v-card>
          </v-col>
          <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12"
            ><v-card class="lighten-12 card-content pa-5">
              <SaleProductPieChart />
            </v-card>
          </v-col>
        </v-row>
        <v-row v-if="false">
          <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
            <v-card class="lighten-12 card-content pa-5">
              <div>Purchasing:Warehouse/Product Category</div>
              <ColumnChart />
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
        <v-row>
          <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
            <v-card class="lighten-12 card-content pa-5">
              <div class="dashboard-card-title">Quick Links</div>
              <v-row>
                <v-col
                  cols="12"
                  xs="12"
                  sm="12"
                  md="2"
                  lg="4"
                  xl="4"
                  @click="$router.push('product-list')"
                  style="cursor: pointer"
                >
                  <div class="d-flex justify-center">
                    <v-icon
                      color="white lighten-2"
                      class="quick-link-icon green lighten-2"
                      large
                      >mdi-layers-triple-outline</v-icon
                    >
                  </div>
                  <div class="d-flex justify-center quick-link-label">
                    Product in stocks
                  </div>
                </v-col>

                <v-col
                  cols="12"
                  xs="12"
                  sm="12"
                  md="2"
                  lg="4"
                  xl="4"
                  style="cursor: pointer"
                  @click="$router.push('expired-product-list')"
                >
                  <div class="d-flex justify-center">
                    <v-icon
                      color="white lighten-2"
                      class="quick-link-icon orange lighten-2"
                      large
                      >mdi-lock-clock</v-icon
                    >
                  </div>
                  <div class="d-flex justify-center quick-link-label">
                    Expired Products
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  xs="12"
                  sm="12"
                  md="2"
                  lg="4"
                  xl="4"
                  style="cursor: pointer"
                  @click="$router.push('damaged-product-list')"
                >
                  <div class="d-flex justify-center">
                    <v-icon
                      color="white lighten-2"
                      class="quick-link-icon red lighten-2"
                      large
                      >mdi-image-broken-variant</v-icon
                    >
                  </div>
                  <div class="d-flex justify-center quick-link-label">
                    Damage Products
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <v-row :hidden="noOfCustomers > 0">
          <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" 
            ><v-card class="lighten-12 card-content pa-4">
              <TopCustomers v-model="noOfCustomers" />
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Charts
import LineChart from "@/components/Charts/LineChart";
import ColumnChart from "@/components/Charts/ColumnChart";
import DateRangeFilter from "@/components/base/DateRangeFilter";
import CategoryPieChart from "./CategoryPieChart";
import SaleProductPieChart from "./SaleProductPieChart";
import TopCustomers from "./TopCustomersList";

import { mapState } from "vuex";
import axios from "@/plugins/axios";

export default {
  name: "Home",
  data: () => ({
    dashBoardSummary: {},
    summaryRange: 0,
    noOfCustomers: 0,
  }),
  computed: {
    ...mapState("user", ["user"]),
    ...mapState(["theme"]),
  },
  components: {
    LineChart,
    ColumnChart,
    DateRangeFilter,
    CategoryPieChart,
    SaleProductPieChart,
    TopCustomers,
  },
  methods: {
    getDashboardSummary() {
      axios
        .get(`dashboard/summary?range=${this.getRange()}`)
        .then((resp) => {
          this.dashBoardSummary = resp.data.data;
        })
        .catch((err) => {
          reject(err.response);
        });
    },
    getRange() {
      if (this.summaryRange == 0) {
        return "today";
      } else if (this.summaryRange == 1) {
        return "last7Days";
      } else if (this.summaryRange == 2) {
        return "thisMonth";
      } else if (this.summaryRange == 3) {
        return "thisYear";
      }
    },
    getRangeText() {
      if (this.summaryRange == 0) {
        return "Today";
      } else if (this.summaryRange == 1) {
        return "Last 7 Days";
      } else if (this.summaryRange == 2) {
        return "This Month";
      } else if (this.summaryRange == 3) {
        return "This Year";
      }
    },
    getCustomerPercentage(total, active) {
      let result = (active / total) * 100;
      if (result % 1 == 0) {
        return result;
      } else {
        return result.toFixed(2);
      }
    },
  },
  created() {
    this.getDashboardSummary();
  },
};
</script>

<!-- *************************************************************************
	TEMPLATE
	************************************************************************* -->
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
                    :filters="['dateRange', 'total', 'search']"
                    v-model="filter"
                    :columns="columns"
                  ></TableFilters>
                </v-row>
                <!-- Data table -->
                <v-row>
                  <v-col cols="12">
                    <v-data-table
                      :items-per-page="paginationOptions.perPage"
                      :headers="headers"
                      :items="purchase"
                      :search="search"
                      hide-default-footer
                      :loading="loading"
                      loading-text="Loading... Please wait"
                    >
                      <template v-slot:item.date="{ item }">
                        <v-list-item-subtitle>{{
                          startDate(item.date)
                        }}</v-list-item-subtitle>
                      </template>
                      <template v-slot:footer="{}">
                        <paginationComponent
                          @paginationOptions="setPaginationOptions"
                          :url="'ware-houses/' + WarehouseId + '/purchases'"
                          :filter="filter"
                          @response="receivePurchaseResponse"
                        />
                      </template>

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

                      <template v-slot:item.action="{ item }">
                        <v-menu offset-y transition="scroll-y-transition">
                          <template v-slot:activator="{ attrs, on }">
                            <v-icon v-bind="attrs" v-on="on"
                              >mdi-dots-vertical</v-icon
                            >
                          </template>
                          <v-list class="actions">
                            <!-- <v-list-item
                  @click="$router.push('/purchases/' + item.id)"
                  link
                >
                  <span>
                    <v-icon v-bind="attrs" v-on="on">mdi-eye</v-icon>View
                  </span>
                </v-list-item> -->
                            <v-list-item
                              @click="
                                $router.push('/purchase/edit/' + item.id)
                              "
                              link
                            >
                              <span>
                                <v-icon v-bind="attrs" v-on="on"
                                  >mdi-pencil-box-outline</v-icon
                                >Edit
                              </span>
                            </v-list-item>
                          </v-list>
                        </v-menu>
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

<!-- *************************************************************************
	SCRIPT
	************************************************************************* -->
<script>
import datePickComponent from "../../../../../components/base/DateComponent.vue";
import TableFilters from "@/components/base/TableFilters";
import paginationComponent from "../../../../shared/components/pagination.vue";

import moment from "moment";

export default {
  data() {
    return {
      paginationOptions: {},
      loading: true,
      search: "",
      columns: [
        {
          text: "Invoice reference",
          value: "reference_number",
          show: true,
          disabled: true,
        },
        {
          text: "Date",
          value: "date",
          align: "left",
          show: true,
          disabled: false,
        },

        {
          text: "Total",
          value: "total_amount",
          align: "center",
          show: true,
          disabled: false,
        },
        {
          text: "Paid",
          value: "paid_amount",
          align: "center",
          show: true,
          disabled: false,
        },
        {
          text: "Status",
          value: "is_active",
          align: "center",
          show: true,
          disabled: false,
        },
        {
          text: "Actions",
          value: "action",
          show: true,
          disabled: true,
          align: "center",
          width: "10%",
        },
      ],
      status: ["Active", "Archeived"],
      purchase: [],
      filter: {
        search: "",
        // reference_number: "",
        start: "",
        end: "",
        amount: "",
      },
      date_range: [],
    };
  },
  props: {
    WarehouseId: {
      type: Number,
      default: null,
    },
  },

  methods: {
    setPaginationOptions(data) {
      this.paginationOptions = data;
    },
    getStatusColor(is_active) {
      return is_active ? "green" : "gray";
    },
    receivePurchaseResponse(purchase) {
      this.purchase = purchase;
      this.loading = false;
    },
    clearFilter() {
      this.filter = {};
    },
    SetSuplierId() {
      this.supplierId = this.$route.params.id;
    },
    startDate(date) {
      return moment(date, "YYYY-MM-DD").format("DD/MM/YYYY");
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

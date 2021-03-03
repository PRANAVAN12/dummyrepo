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
              PurchaseOrder List
            </v-card-title> -->
          <v-container fluid>
            <v-row>
              <v-col>
                <!-- Filters -->
                <v-row class="ma-0 align-right sub-section">
                  <TableFilters
                    :filters="['search', 'dateRange', 'status']"
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
                      :items="purchaseorder"
                      :search="search"
                      loading-text="Loading... Please wait"
                      hide-default-footer
                    >
                      <template v-slot:item.date="{ item }">
                        <v-list-item-subtitle>{{
                          startDate(item.date)
                        }}</v-list-item-subtitle>
                      </template>

                      <template v-slot:footer="{}">
                        <paginationComponent
                          @paginationOptions="setPaginationOptions"
                          :url="
                            'ware-houses/' + WarehouseId + '/purchase-order'
                          "
                          :filter="filter"
                          @response="receivePurchaseOrderResponse"
                        />
                      </template>

                      <template v-slot:item.action="{ item }">
                        <v-menu offset-y transition="scroll-y-transition">
                          <template v-slot:activator="{ attrs, on }">
                            <v-icon v-bind="attrs" v-on="on"
                              >mdi-dots-vertical</v-icon
                            >
                          </template>
                          <v-list class="actions">
                            <v-list-item
                              @click="
                                $router.push('/purchase-order/' + item.id)
                              "
                              link
                            >
                              <span>
                                <v-icon v-bind="attrs" v-on="on">mdi-eye</v-icon
                                >View
                              </span>
                            </v-list-item>
                            <!-- <v-list-item
                  @click="$router.push('/purchase-order/edit/' + item.id)"
                  link
                >
                  <span>
                    <v-icon v-bind="attrs" v-on="on"
                      >mdi-pencil-box-outline</v-icon
                    >Edit
                  </span>
                </v-list-item> -->
                          </v-list>
                        </v-menu>
                      </template>

                      <template v-slot:item.status="{ item }">
                        <v-chip
                          :x-small="true"
                          class="ma-2"
                          label
                          text-color="white"
                          :color="getPurchaseOrderStatusColor(item.status)"
                          dark
                          >{{
                            item.status == "Canceled" ? "Canceled" : "Pending"
                          }}</v-chip
                        >
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
import TableFilters from "@/components/base/TableFilters";
import datePickComponent from "../../../../../components/base/DateComponent.vue";
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
          align: "left",
          disabled: true,
        },
        { text: "Date", value: "date", show: true, disabled: false },
        {
          text: "Supplier",
          value: "supplier.name",
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
          value: "action",
          sortable: true,
          show: true,
          disabled: true,
          align: "center",
          width: "10%",
        },
      ],
      status: ["Pending", "Canceled", "Received"],
      purchaseorder: [],
      date_range: [],
      filter: {
        search: "",
        start: "",
        end: "",
        is_active: "",
        // invoice: "",
      },
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
    receivePurchaseOrderResponse(purchaseorder) {
      this.purchaseorder = purchaseorder;
    },
    SetSuplierId() {
      this.supplierId = this.$route.params.id;
    },
    getStatusColor(is_active) {
      return is_active ? "green" : "gray";
    },
    startDate(date) {
      return moment(date, "YYYY-MM-DD").format("DD/MM/YYYY");
    },
    clearFilter() {
      this.filter = {};
      this.date_range = [];
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

  mounted() {},

  components: {
    datePickComponent,
    paginationComponent,
    TableFilters,
  },

  computed: {
    dateRangeText() {
      this.filter.start = this.date_range[0];
      this.filter.end = this.date_range[1];
      return this.date_range.join(" ~ ");
    },
    headers: function () {
      return this.columns.filter((item) => item.show == true);
    },
  },
  created() {
    this.SetSuplierId();
  },
};
</script>

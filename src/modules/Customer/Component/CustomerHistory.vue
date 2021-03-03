<!-- *************************************************************************
	TEMPLATE
	************************************************************************* -->
<template>
  <v-container fluid class="lighten-12 content">
    <CustomerHistoryCreate @afterSave="refreshData()" ref="historyModal" />
    <CustomerHistoryEdit
      :visible="EditScheduleForm"
      :history="historys"
      @close="EditBankDetails($event)"
      @afterEdit="refreshData()"
    />
    <v-row>
      {{ this.history }}
      <v-col cols="10">
        <!-- Page Title -->
        <PageTitle title="History" :hasBreadcrumbs="false" />
      </v-col>
      <v-col class="text-right ma-auto">
        <v-btn
          class="text-white btn_blue btn_large w-100"
          @click.stop="OpenModal()"
        >
          <v-icon class="icon_small ma-2">mdi-plus</v-icon>Add
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="ma-0 align-right sub-section">
      <TableFilters
        :filters="['search', 'dateRange']"
        v-model="filter"
        :columns="columns"
      ></TableFilters>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-data-table
          :items-per-page="paginationOptions.perPage"
          :headers="headers"
          :items="historydetails"
          :search="search"
          :loading="loading"
          loading-text="Loading... Please wait"
          hide-default-footer
        >
          <template v-slot:item.status="{ item }">
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

          <template v-slot:footer="{}">
            <paginationComponent
              @paginationOptions="setPaginationOptions"
              :url="'customers/' + historydetailsId + '/histoy-details'"
              @response="receivehistorydetailsResponse"
              ref="historydetails"
              :filter="filter"
            />
          </template>
          <template
            v-slot:item.date="{ item }"
            v-slot="{ errors }"
            name="value"
            rules="numeric"
            >{{ item.date | formatDate }}</template
          >

          <template v-slot:item.action="{ item }">
            <v-menu offset-y transition="scroll-y-transition">
              <template v-slot:activator="{ attrs, on }">
                <v-icon v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
              </template>
              <v-list class="actions">
                <v-list-item @click.stop="EditModal(item)" link>
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
  </v-container>
</template>

<!-- *************************************************************************
	SCRIPT
	************************************************************************* -->

<script>
import CustomerHistoryCreate from "./CustomerHistoryCreate";
import CustomerHistoryEdit from "./CustomerHistoryEdit";
import confirmation from "../../shared/components/confirmation";
import TableFilters from "@/components/base/TableFilters";
import * as moment from "moment/moment";
import paginationComponent from "../../shared/components/pagination.vue";

import _ from "lodash";
export default {
  data: () => ({
    paginationOptions: {},
    EditScheduleForm: false,
    loading: true,
    search: "",
    historydetails: [],
    historydetailsId: "",
    histors: {
      date: "",
      comment: "",
    },
    columns: [
      { text: "Date", value: "date", show: true, disabled: false },
      { text: "Comments", value: "comments", show: true, disabled: false },
      {
        text: "Actions",
        value: "action",
        show: true,
        disabled: false,
        align: "center",
        width: "10%",
      },
    ],
    date_range: [],
    filter: {
      start: "",
      end: "",
    },
  }),
  methods: {
    setPaginationOptions(data) {
      this.paginationOptions = data;
    },
    refreshData() {
      this.$refs.historydetails.refreshData();
    },
    receivehistorydetailsResponse(historydetails) {
      this.historydetails = historydetails;
      this.loading = false;
    },
    OpenModal() {
      this.$refs.historyModal.openModal();
    },
    EditModal(data) {
      this.EditScheduleForm = true;
      this.historys = _.cloneDeep(data);
    },
    EditBankDetails($event) {
      this.EditScheduleForm = false;
    },
    SetHisoryId() {
      this.historydetailsId = this.$route.params.id;
    },
    dateFormat: function (date) {
      return moment(date, "YYYY-MM-DD").format("DD/MM/YYYY");
    },
  },
  mounted() {
    this.GetBankDetails();
  },
  created() {
    this.SetHisoryId();
  },
  components: {
    CustomerHistoryCreate,
    CustomerHistoryEdit,
    paginationComponent,
    TableFilters,
  },

  computed: {
    // Filter - return selected table fields
    headers: function () {
      return this.columns.filter((item) => item.show == true);
    },
    dateRangeText() {
      this.filter.start = this.date_range[0];
      this.filter.end = this.date_range[1];
      return this.date_range.join(" ~ ");
    },
  },
};
</script>

<template>
  <div>
    <PageTitle
      title="Staffs"
      :btnCreate="true"
      :createRoute="'staff/add'"
      :permission="'Customer Create'"
    />

    <v-container fluid class="lighten-12 content">
      <!-- Page Title -->
      <v-card class="lighten-12 card-content">
        <TableFilters
          :filters="['status', 'search']"
          v-model="filter"
          :columns="columns"
        >
        </TableFilters>
      </v-card>

      <v-card class="mt-2">
        <v-container fluid class="light gray lighten-12">
          <!-- Data Table -->
          <v-row>
            <v-card-text class="pa-0">
              <v-data-table
                :items-per-page="paginationOptions.perPage"
                :fixed-header="true"
                :headers="headers"
                :items="staff"
                item-key="name"
                hide-default-footer
                class="row-pointer"
                @click:row="$router.push(`staff/${$event.id}`)"
              >
                <template v-slot:item.joined_at="{ item }">{{
                  item.joined_at | formatDate
                }}</template>

                <template v-slot:item.status="{ item }">
                  <v-chip
                    :x-small="true"
                    class="ma-2"
                    label
                    text-color="white"
                    :color="getStatusColor(item.is_active)"
                    dark
                    >{{ item.is_active ? "Active" : "Archived" }}</v-chip
                  >
                </template>

                <template v-slot:footer>
                  <pagination
                    @paginationOptions="setPaginationOptions"
                    @response="setResponseData"
                    url="staffs"
                    :filter="filter"
                    ref="pagination"
                  />
                </template>

                <!-- Action -->
                <template v-slot:item.action="{ item }">
                  <list-menu
                    feature="staff"
                    :item="item"
                    viewPermission="Customer Show"
                    editPermission="Customer Edit"
                    softDeletePermission="Customer Soft Delete"
                    @refreshList="refreshData"
                  ></list-menu>
                </template>
                <template v-slot:item.allocation="{ item }">
                  <div class="text-center">
                    <v-btn
                      @click.stop="openAllocationModal(item)"
                      color="success"
                      fab
                      x-small
                      dark
                    >
                      <v-icon>mdi-domain</v-icon>
                    </v-btn>
                  </div>
                </template>
              </v-data-table>
            </v-card-text>
          </v-row>
        </v-container>
      </v-card>
      <!-- </v-card> -->
      <div class="d-flex justify-center align-center"></div>
      <LeaveAllocation
        :staff="SelectedStaff"
        :StaffId="SelectedStaffId"
        ref="allocation"
      />
    </v-container>
  </div>
</template>

<script>
import { required, email, max } from "vee-validate/dist/rules";
import pagination from "../../shared/components/pagination";
import confirmation from "../../shared/components/confirmation";
import LeaveAllocation from "./ManageLeaveAllocation";
import _ from "lodash";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import TableFilters from "@/components/base/TableFilters";
extend("required", {
  ...required,
  message: "{_field_} is required",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  data: () => ({
    paginationOptions: {},
    expanded: [],
    SelectedStaffId: null,
    SelectedStaff: Object(),
    singleExpand: false,
    pagination1: {
      descending: true,
      page: 1,
      rowsPerPage: 2,

      sortBy: "fat",
      totalItems: 0,
      rowsPerPageItems: [1, 2, 4, 8, 16],
    },

    status: [
      { text: "Active", value: "active" },
      { text: "Archived", value: "archived" },
    ],
    columns: [
      {
        text: "Staff No",
        value: "staff_no",
        show: true,
        disabled: false,
        align: "left",
      },
      {
        text: "Name",
        value: "short_name",
        show: true,
        disabled: false,
        align: "left",
      },
      {
        text: "EmploymentType ",
        value: "employmentType.name",
        show: true,
        disabled: false,
        align: "left",
      },
      {
        text: "Nic number",
        value: "nic_number",
        show: true,
        align: "left",
        disabled: false,
      },
      {
        text: "Mobile",
        value: "mobile",
        show: true,
        disabled: true,

        align: "left",
      },
      {
        text: "Email",
        value: "email",
        show: true,
        disabled: true,

        align: "left",
      },

      {
        text: "Status",
        value: "status",
        show: true,
        disabled: false,
        align: "center",
      },
      {
        text: "Leave Allocation",
        value: "allocation",
        show: true,
        disabled: false,
        align: "center",
      },
      {
        text: "Actions",
        value: "action",
        show: true,
        disabled: true,
        align: "center",
      },
    ],

    staff: [],
    filter: {
      name: "",
      search: "",
      status: "",
    },
  }),
  components: {
    TableFilters,
    ValidationProvider,
    ValidationObserver,
    pagination,
    LeaveAllocation,
  },

  methods: {
    setPaginationOptions(data) {
      this.paginationOptions = data;
    },
    refreshData() {
      this.$refs.pagination.refreshData();
    },

    setResponseData(staff) {
      this.staff = staff;
    },

    getStatusColor(status) {
      return status ? "green" : "gray";
    },

    clearFilter() {
      this.filter = {};
    },
    openAllocationModal(event) {
      debugger;
      this.SelectedStaff = event;
      this.SelectedStaffId = event.id;
      this.$refs.allocation.GetLeaveTypes();

      this.$refs.allocation.GetAllocatedLeaves();
      this.$refs.allocation.openModal();

    },
  },
  computed: {
    // Filter - return selected table fields
    headers: function() {
      return this.columns.filter((item) => item.show == true);
    },
  },
};
</script>

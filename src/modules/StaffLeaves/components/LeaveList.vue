<template>
  <div>
    <PageTitle
      title="Leave Approval Request"
      :permission="'Customer Create'"
    />

    <v-container fluid class="lighten-12 content">
      <v-card class="lighten-12 card-content">
        <TableFilters
          :filters="['status', 'search']"
          v-model="filter"
          :columns="columns"
        >
        </TableFilters>
          <v-row class="ma-0 align-right ">
       
      </v-row>
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
                @click:row="ViewLeaveRequest($event.id)"
              >
                <template v-slot:item.joined_at="{ item }">{{
                  item.joined_at | formatDate
                }}</template>
                <template v-slot:item.status="{ item }">
                      <v-chip
                        :x-small="true"
                        label
                        text-color="white"
                        :color="getStatusColor(item.status)"
                        dark
                        >{{ item.status }}</v-chip
                      ></template>
                <template v-slot:footer>
                  <pagination
                    @paginationOptions="setPaginationOptions"
                    @response="setResponseData"
                    url="leave-approval"
                    :filter="filter"
                    ref="pagination"
                  />
                </template>

                <!-- Action -->
              <template v-slot:item.action="{ item }">
                      <v-menu offset-y transition="scroll-y-transition">
                        <template v-slot:activator="{ attrs, on }">
                          <v-icon v-bind="attrs" v-on="on"
                            >mdi-dots-vertical
                          </v-icon>
                        </template>
                        <v-list class="actions">
                         
                     
                          <v-list-item @click="ViewLeaveRequest(item.id)">
                            <span>
                              <v-icon v-bind="attrs" v-on="on"
                                >mdi-pencil-box-outline</v-icon
                              >
                              View</span
                            >
                          </v-list-item>
                         
                        </v-list>
                      </v-menu>
                    </template>
                   
              </v-data-table>
            </v-card-text>
          </v-row>
        </v-container>
      </v-card>
      <div class="d-flex justify-center align-center"></div>
      <LeaverRequest  @conform="refreshData()" ref="leaveRequest"/>
      <LeaverRequestEdit  @conform="refreshData()" :leaveStatus="leaveStatus" :leave="leaveRequest"  ref="leaveRequestEdit"/>
      <LeaveRequestView :leaveStatus="leaveStatus" @conform="refreshData()" :leave="leaveRequest" ref="leaveRequestview"/>
    </v-container>
  </div>
</template>

<script>
import { required, email, max } from "vee-validate/dist/rules";
import pagination from "../../shared/components/pagination";
import confirmation from "../../shared/components/confirmation";
import LeaverRequest from "./ViewLeaveRequest";
import LeaverRequestEdit from "./ViewLeaveRequest";
import LeaveRequestView from "./ViewLeaveRequest";
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
    SelectedStaff:Object(),
    leaveInfo:Object(),
    singleExpand: false,
    leaveRequest:Object(),
    leaveStatus:null,
    pagination1: {
      descending: true,
      page: 1,
      rowsPerPage: 2,

      sortBy: "fat",
      totalItems: 0,
      rowsPerPageItems: [1, 2, 4, 8, 16],
    },

    pagination: {
      page: 1,
      itemsPerPage: 2,
    },
    page: 1,
    status: [
      { text: "Active", value: "active" },
      { text: "Archived", value: "archived" },
    ],
    columns: [
      {
        text: "Applier",
        value: "applier",
        show: true,
        disabled: false,
        align: "left",
      },
      {
        text: "Staff Name",
        value: "staff",
        show: true,
        disabled: false,
        align: "left",
      },
      {
        text: "LeaveType",
        value: "leave_type",
        show: true,
        disabled: false,
        align: "left",
      },
      {
        text: "Start Date",
        value: "from_date",
        show: true,
        align: "left",
        disabled: false,
      },
      {
        text: "End Date",
        value: "to_date",
        show: true,
        disabled: true,

        align: "left",
      },
      {
        text: "Total Days",
        value: "number_of_days",
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
    pagination,LeaverRequest,LeaverRequestEdit,LeaveRequestView
  },

  methods: {
    setPaginationOptions(data) {
      this.paginationOptions = data;
    },
    refreshData() {
      this.$refs.pagination.refreshData();
    },
    OpenModal() {
     this.$refs.leaveRequest.openModal();
    },
   ViewLeaveRequest(item)
   {
     debugger
      this.GetleaveRequestInformation(item);
      this.$refs.leaveRequestview.openModal();  
   } ,
     OpenEditModal(item) {
       debugger
       this.GetleaveRequestInformation(item.id)
     this.$refs.leaveRequestEdit.openModal();
    },
    setResponseData(staff) {
      this.staff = staff;
    },
  getStatusColor(status) {
      switch (status) {
        case "Applied":
          return "orange";
          break;
        case "Approved":
          return "green";
          break;
        case "Cancelled":
          return "red";
          break;
          case "Rejected":
          return "red";
        default:
          break;
      }
    },
   

    clearFilter() {
      this.filter = {};
    },
    openAllocationModal(event)
    {
      this.SelectedStaff=event
         this.$refs.allocation.openModal();
    },
     GetleaveRequestInformation(id)
    {
      console.log('calll');
       this.$store
        .dispatch(`staff/GetLeaveRequested`,id)
        .then((res) => {
          debugger
         this.leaveRequest=res;
         console.log('SEE:EECCCC',this.leaveRequest);
         this.leaveStatus=this.leaveRequest.status;
         this.leaveInfo=res;
        })
        .catch((err) => {
          this.isLoading = false;
         
        });  
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

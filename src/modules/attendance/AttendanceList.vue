<template>
  <div>
    <PageTitle title="Attendance" :btnCreate="false" />

    <v-container fluid class="lighten-12 content">
      <!-- Page Title -->
      <v-card class="lighten-12 card-content">
        <TableFilters
          :filters="['date']"
          v-model="filter"
          :columns="columns"
          @input="GetAttendancelist()"
        >
        </TableFilters>
      </v-card>

      <v-card class="mt-2">
        <v-container fluid class="light gray lighten-12">
          <!-- Data Table -->
          <v-row>
            <v-card-text class="pa-0">
              <v-data-table
                :items-per-page="1000"
                :fixed-header="true"
                :headers="headers"
                :items="attendances"
                :expanded.sync="expanded"
                :single-expand="singleExpand"
                show-expand
                item-key="full_name"
                @click:row="AddUsers($event)"
                hide-default-footer
                class="row-pointer"
              >
                <template v-slot:expanded-item="{ headers, item }">
                  <td :colspan="headers.length" class="px-5 py-2">
                    <template v-if="item.attendance.length">
                      <v-card class="pa-0 mt-2 mb-2">
                        <v-data-table
                          hide-default-footer="true"
                          :headers="attendanceHeaders"
                          :items="item.attendance"
                          class="sub-table"
                        ></v-data-table>
                      </v-card>
                    </template>
                    <template v-if="item.attendance == 'No Attendance Yet '">
                      <v-card>
                        <v-container fluid>No Attendance Yet </v-container>
                      </v-card></template
                    >
                  </td>
                </template>

                <!-- <template v-slot:footer>
                  <pagination
                    @paginationOptions="setPaginationOptions"
                    @response="setResponseData"
                    url="attendances"
                    :filter="filter"
                    ref="pagination"
                  />
                </template> -->
              </v-data-table>
            </v-card-text>
          </v-row>
        </v-container>
      </v-card>
      <!-- </v-card> -->
      <div class="d-flex justify-center align-center"></div>
    </v-container>
  </div>
</template>

<script>
import pagination from "../shared/components/pagination";

import _ from "lodash";
import TableFilters from "@/components/base/TableFilters";

import { Attendance } from "../../../src/models/Attendance";
import axios from "@/plugins/axios";

export default {
  data: () => ({
    paginationOptions: {},
    expanded: [],
    singleExpand: false,
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
    columns: [
      {
        text: "Full Name",
        value: "full_name",
        show: true,
        disabled: false,
        align: "left",
        width: "16.5%",
      },
      {
        text: "Short Name",
        value: "short_name",
        show: true,
        disabled: false,
        align: "left",
        width: "16.5%",
      },
      {
        text: "Total Work Hours",
        value: "total_working_hours",
        show: true,
        disabled: false,
        align: "left",
        width: "16.5%",
      },
      {
        text: "Total Essential Breakes Hours",
        value: "total_essential_breakes_hours",
        show: true,
        disabled: false,
        align: "left",
        width: "16.5%",
      },
      {
        text: "Last Moment Status",
        value: "last_moment_status",
        show: true,
        disabled: false,
        align: "left",
        width: "16.5%",
      },
      {
        text: "Last Moment",
        value: "last_moment",
        show: true,
        disabled: false,
        align: "left",
        width: "16.5%",
      },

      //   {
      //     text: "Actions",
      //     value: "action",
      //     show: true,
      //     disabled: true,
      //     align: "center",
      //     width: "16.5%",
      //   },
    ],
    attendanceHeaders: [
      { text: "Movement Date", value: "movement_date", align: "left" },
      { text: "Type", value: "type", align: "left" },
      { text: "Moment", value: "moment", align: "left" },
      { text: "Duration", value: "duration", align: "left" },
    ],

    attendances: [],
    filter: {
      name: "",
      search: "",
      status: "",
      date: "",
    },
  }),
  components: {
    TableFilters,
    pagination,
  },

  methods: {
    setPaginationOptions(data) {
      this.paginationOptions = data;
    },
    refreshData() {
      this.$refs.pagination.refreshData();
    },

    // setResponseData(attendene) {
    //   this.attendances = attendene.map((u, i, arr) => {
    //     u.index = i + 1;
    //     return new Attendance(u);
    //   });;
    // },
    GetAttendancelist() {
      if (this.filter.date) {
        axios
          .get(`attendances?date=${this.filter.date}`)
          .then((res) => {
            this.attendances = res.data.data.map((u, i, arr) => {
              u.index = i + 1;
              return new Attendance(u);
            });
          })
          .catch((err) => {
            this.messages = err.data.title;
          });
      } else {
        axios
          .get(`attendances`)
          .then((res) => {
            this.attendances = res.data.data.map((u, i, arr) => {
              u.index = i + 1;
              return new Attendance(u);
            });
          })
          .catch((err) => {
            this.messages = err.data.title;
          });
      }
    },

    GetAttendance() {
      this.$store
        .dispatch("staff/GetAttendance")
        .then((res) => {
          // this.attendance = res;
        })
        .catch((err) => {
          this.messages = err.data.title;
        });
    },
    AddUsers($event) {
      this.expanded = [];
      // debugger
      // console.log('debugg');
      // this.expanded.push($event);
    },
    getStatusColor(status) {
      return status ? "green" : "gray";
    },

    clearFilter() {
      this.filter = {};
    },
  },
  computed: {
    // Filter - return selected table fields
    headers: function () {
      return this.columns.filter((item) => item.show == true);
    },
  },

  created() {
    this.GetAttendance();
    this.GetAttendancelist();
  },
};
</script>

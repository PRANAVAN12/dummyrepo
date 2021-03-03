<template>
  <div>
    <v-row>
      <v-col cols="12 py-0">
        <v-container fluid>
            <v-row>
            <v-col cols="12" class="d-flex justify-end">
              <permission-control permissionName="Batch Create">
                <v-btn
                  depressed
                  small
                  height="32"
                  class="btn_blue w-100"
                  @click.stop="OpenModal()"
                >
                  <v-icon class="icon_small ma-2">mdi-plus </v-icon>
                  Add
                </v-btn>
              </permission-control>
            </v-col>
          </v-row>
          <v-row>
            <!-- Data table -->
            <v-col cols="12">
              <v-data-table
                :items-per-page="paginationOptions.perPage"
                :headers="headers"
                :items="LeaveType"
                hide-default-footer
              >

               <template v-slot:item.created_at="{ item }">{{
                  item.created_at | formatDate
                }}</template>
                <!-- Action -->
                <template v-slot:item.action="{ item }">
                  <list-menu
                    feature="user"
                    :item="item"
                
                    @refreshList="refreshData"
                  ></list-menu>
                </template>
                <template v-slot:footer="{}">
                  <paginationComponent
                    @paginationOptions="setPaginationOptions"
                    :url="`leave-types`"
                    @response="receiveEmployeesTypeData"
                    ref="pagination"
                    :filter="filter"
                  />
                </template>
              </v-data-table>
            </v-col>

            <v-row> </v-row>
          </v-row>
        </v-container>
      </v-col>
    </v-row>

    <!-- </v-container> -->
  </div>
</template>
<script>
export default {
  data: () => ({
    paginationOptions: {},
    messages: [],
    errors: [],
    LeaveType: [],

    columns: [
      {
        text: "Name",
        value: "name",
        show: true,
        disabled: true,
        align: "left",
      },
      {
        text: "Created at",
        value: "created_at",
        show: true,
        disabled: false,
        align: "left",
      },
      {
        text: "Actions",
        value: "action",
        show: true,
        disabled: false,
        align: "left",
      },
    ],
  }),

  filters: {},
  computed: {
    headers: function() {
      return this.columns.filter((item) => item.show == true);
    },
  },
  methods: {
    setPaginationOptions(data) {
      this.paginationOptions = data;
    },
    refreshData() {
      this.$refs.pagination.refreshData();
    },

    receiveEmployeesTypeData(data) {
      this.EmploymentType = data;
    },

    GetLeaveType() {
      this.$store
        .dispatch("GetLeaveTypes")
        .then((res) => {
          this.EmploymentType = res.data.data;
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.GetLeaveType();
  },
};
</script>

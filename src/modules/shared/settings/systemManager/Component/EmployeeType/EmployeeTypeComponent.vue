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
                :items="EmploymentType"
                hide-default-footer
              >
                <template v-slot:item.created_at="{ item }">{{
                  item.created_at | formatDate
                }}</template>
                <!-- Action -->
                <template v-slot:item.action="{ item }">
                  <list-menu
                    feature="category"
                    :item="item"
                    @refreshList="refreshData"
                    editPermission="Category Edit"
                    @onEditClicked="EditModal(item)"
                    :isEditModal="true"
                  ></list-menu>
                </template>

                <template v-slot:footer>
                  <pagination
                    @paginationOptions="setPaginationOptions"
                    @response="receiveEmployeesTypeData"
                    url="employment-types"
                    :filter="filter"
                    ref="pagination"
                  />
                </template>
              </v-data-table>
            </v-col>

            <v-row> </v-row>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <CreateEmployee
      ref="CreateEmployeeType"
      :visible="isEmployeeTypeFormVisible"
      @close="CloseModal($event)"
      @afterSave="refreshData()"
    />
    <EditEmployeeType
      ref="EditEmployeeType"
      :visible="isEditEmployeeTypeFormVisible"
      :EmployeeType="EmployeeTypedatas"
      @close="CloseEditModal($event)"
      @afterSave="refreshData()"
    />
  </div>
</template>
<script>
import pagination from "../../../../../shared/components/pagination";
import EditEmployeeType from "./EditEmployeeTypeComponent";
import CreateEmployee from "./CreateEmployeeTypeComponent";
export default {
  data: () => ({
    paginationOptions: {},
    messages: [],
    isEmployeeTypeFormVisible: false,
    isEditEmployeeTypeFormVisible: false,
    errors: [],
    EmploymentType: [],

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

  components: { CreateEmployee, pagination, EditEmployeeType },
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
      OpenModal() {
      this.isEmployeeTypeFormVisible = true;
    },
    CloseModal($event) {
      this.isEmployeeTypeFormVisible = false;
    },

    EditModal(data) {
      
      this.isEditEmployeeTypeFormVisible = true;

      this.GetEmployeeTypeSingle(data.id);
    },
 CloseEditModal($event) {
      this.isEditEmployeeTypeFormVisible = false;
    },
    GetEmployeeTypeSingle(id) {
      this.$store
        .dispatch(`system/GetSinleEmployeeType`, id)
        .then((res) => {
          this.EmployeeTypedatas = res.data.data;

          this.refreshData();

          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.messages = err.data.title;
        });
    },
   
  },
  created() {
    this.GetEmployeeTypes();
    this.refreshData();
  },
};
</script>

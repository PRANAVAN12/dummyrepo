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
                :items="Offices"
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
                    @response="receiveOfficeData"
                    url="offices"
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
<CreateOffice
      ref="CreateOffice"
      :visible="isOfficeFormVisible"
      @close="CloseModal($event)"
      @afterSave="refreshData()"
    />

    <EditOffice
      ref="EditOffice"
      :visible="isEditOfficeFormVisible"
      :Office="OfficeData"
      @close="CloseEditModal($event)"
      @afterSave="refreshData()"
    />

  </div>
</template>
<script>
import pagination from "../../../../../shared/components/pagination";
import EditOffice from "./EditOfficeComponent";
import CreateOffice from "./CreateOfficeComponent";

export default {
  data: () => ({
    paginationOptions: {},
    messages: [],
    errors: [],
    Offices: [],
  isOfficeFormVisible: false,
    isEditOfficeFormVisible: false,
    columns: [
      {
        text: "Name",
        value: "name",
        show: true,
        disabled: true,
        align: "left",
      },
      {
        text: "Address",
        value: "address_line",
        show: true,
        disabled: false,
        align: "left",
      },
       {
        text: "City",
        value: "city",
        show: true,
        disabled: false,
        align: "left",
      },
       {
        text: "Open time",
        value: "open_time",
        show: true,
        disabled: false,
        align: "left",
      },
       {
        text: "Close time",
        value: "close_time",
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
  components: { EditOffice, pagination, CreateOffice },
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

    receiveOfficeData(data) {
      
      this.Offices = data;
    },

      OpenModal() {
  
      this.isOfficeFormVisible = true;
    },
    CloseModal($event) {
      this.isOfficeFormVisible = false;
    },
    EditModal(data) {
      this.isEditOfficeFormVisible = true;

      this.GetOfficeSingle(data.id);
    },
      CloseEditModal($event) {
      this.isEditOfficeFormVisible = false;
    },
    GetOfficeSingle(id) {
   
      this.$store
        .dispatch(`system/GetSinleOffice`, id)
        .then((res) => {
        
          this.OfficeData = res.data.data;

          this.refreshData();

          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.messages = err.data.title;
        });
    },


    GetOfficedetails() {
      this.$store
        .dispatch("GetOffices")
        .then((res) => {
          this.Offices = res.data.data;
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.GetOfficedetails();
  },
};
</script>

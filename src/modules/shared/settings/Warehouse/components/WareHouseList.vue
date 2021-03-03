<template>
  <div>
    <PageTitle
      title="Warehouses"
      :btnCreate="true"
      :createRoute="'Warehouse'"
      :createPopup="true"
      @onClickCreate="OpenModal()"
      :permission="'Ware House Create'"
    />
    <v-container fluid class="lighten-12 content">
      <v-card class="lighten-12 card-content mb*2">
        <v-row class="ma-0 align-right">
          <TableFilters
            :filters="['status', 'search']"
            v-model="filter"
            :columns="columns"
          ></TableFilters>

          <ImportExportMenu
            :permission="'Ware House Report'"
          ></ImportExportMenu>
        </v-row>
      </v-card>

      <v-card class="lighten-12 card-content mt-2 pa-3">
        <AddWarehouse
          :visible="showScheduleForm"
          @close="AddWarehouse($event)"
          @afterSave="refreshData()"
        />
        <v-progress-linear
          active="false"
          indeterminate="false"
          :query="false"
          v-if="isLoading"
        ></v-progress-linear>
        <v-data-table
          :items-per-page="paginationOptions.perPage"
          class="row-pointer"
          @click:row="$router.push(`warehouse/${$event.id}`)"
          :fixed-header="true"
          :headers="headers"
          :items="Warehouse"
          item-key="id"
          hide-default-footer
        >
          <template v-slot:no-data>
            <img
              style="height: 200px"
              src="../../../../../assets/img/no-result.jpg"
            />
          </template>
          <!-- No -->
          <template v-slot:item.no>
            <v-icon>mdi-vuetify</v-icon>
          </template>

          <!-- Status -->
          <template v-slot:item.status="{ item }" :slot-scope="props">
            <!-- <toggle-button
              v-if="editWarehouseId == item.id"
              :disabled="editWarehouseId != item.id"
              :value="item.is_active"
              :width="80"
              v-model="newbrand.is_active"
              :labels="{ checked: 'Active', unchecked: 'Archeived' }"
            ></toggle-button> -->

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

          <!-- Action -->
          <template v-slot:item.action="{ item }">
            <list-menu
              feature="warehouse"
              :item="item"
              viewPermission="Ware House Show"
              editPermission="Ware House Edit"
              softDeletePermission="Ware House Soft Delete"
              @refreshList="refreshData"
              @onEditClicked="EditModal(item)"
              :isEditModal="true"
            ></list-menu>

            <EditWarehouse
              :visible="EditScheduleForm"
              :warehouse="editwarehouse"
              @close="EditWarehouse($event)"
              @afterSave="refreshData()"
            />
            <AddWarehouse
              :visible="showScheduleForm"
              @close="AddWarehouse($event)"
              @afterSave="refreshData()"
            />
          </template>
          <template v-slot:footer>
            <pagination
              @paginationOptions="setPaginationOptions"
              url="ware-houses"
              @response="receiveCategoryData"
              :filter="filter"
              ref="pagination"
            />
          </template>
        </v-data-table>

        <!-- <v-row>
        <v-col cols="12 pa-5" align-self="end">
          <v-container class="max-width"></v-container>
        </v-col>
      </v-row>-->
      </v-card>
    </v-container>
  </div>
</template>
<script>
import TableFilters from "@/components/base/TableFilters";

import pagination from "../../../../shared/components/pagination";
import confirmation from "../../../../shared/components/confirmation";
import { WarehouseModel, Warehouse } from "../../../../../models/Warehouse";
import AddWarehouse from "./WarehouseCreate";
import EditWarehouse from "./WarehouseEdit";
import { required, email, max } from "vee-validate/dist/rules";
import _ from "lodash";

import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import { WareHouseEntityModel } from "../../../../../models/EntityModels/WareHouseEntityModel";
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
  components: {
    pagination,
    ValidationProvider,
    EditWarehouse,
    ValidationObserver,
    AddWarehouse,
    TableFilters,
  },
  data() {
    return {
      paginationOptions: {},
      isLoading: false,
      showScheduleForm: false,
      EditScheduleForm: false,
      editwarehouse: new Warehouse(),
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
        // {
        //   text: "#",
        //   align: "start",
        //   sortable: false,
        //   value: "index",
        // },
        {
          text: "Name",
          value: "name",
          show: true,
          align: "left",
          disabled: false,
          width: "16.5%",
        },
        {
          text: "Phone",
          value: "phone",
          show: true,
          disabled: false,
          width: "16.5%",
        },
        {
          text: "Address",
          value: "address",
          align: "left",
          show: true,
          disabled: false,
          width: "16.5%",
        },
        {
          text: "Description",
          value: "description",
          show: true,
          align: "left",
          disabled: false,
          width: "16.5%",
        },
        {
          text: "Status",
          value: "status",
          show: true,
          disabled: false,
          align: "center",
          width: "16.5%",
        },
        {
          text: "Actions",
          value: "action",
          show: true,
          disabled: false,
          align: "center",
          width: "16.5%",
        },
      ],
      Warehouse: [],
      newbrand: { name: "", id: "", is_active: "" },
      filter: {
        name: "",
        search: "",
        status: "",
      },
    };
  },
  computed: {
    // Filter - return selected table fields
    headers: function () {
      return this.columns.filter((item) => item.show == true);
    },
  },
  created() {
    this.GetWarehouses();
  },
  methods: {
    setPaginationOptions(data) {
      this.paginationOptions = data;
    },
    clearFilter() {
      this.filter = {};
    },
    refreshData() {
      this.$refs.pagination.refreshData();
    },

    OpenModal() {
      this.showScheduleForm = true;
    },
    receiveCategoryData(data) {
      this.Warehouse = data;
    },

    EditModal(data) {
      this.EditScheduleForm = true;
      this.GetWareHouseSingle(data.id);
    },
    AddWarehouse($event) {
      this.showScheduleForm = false;
    },
    EditWarehouse($event) {
      this.EditScheduleForm = false;
    },
    getStatusColor(status) {
      return status ? "green" : "gray";
    },
    openConfirmation(warehouse) {
      confirmation.dialog = true;
      this.$confirm(
        "Do you want to " +
          (warehouse.is_active ? "Archive  " : "Activate  ") +
          warehouse.name +
          "?"
      ).then((res) => {
        if (res) {
          this.GetArchiveMsgs(warehouse);
        }
      });
    },
    GetArchiveMsgs(warehouse) {
      this.$store
        .dispatch("warehouse/ArchiveOrActive", warehouse.id)
        .then((res) => {
          warehouse.is_active = !warehouse.is_active;
          this.refreshData();
          const msg = warehouse.is_active ? "activated" : "archived";
          this.$toast.success("Successfully  " + msg);
        })
        .catch((err) => {
          this.isLoading = false;
          this.messages = err.data.title;

          this.$toast.error("Archeive  failed");
        });
    },
    GetWareHouseSingle(id) {
      this.$store
        .dispatch(`warehouse/GetWarehouseSingleId`, id)
        .then((res) => {
          this.editwarehouse = res.data;
          this.refreshData();

          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.messages = err.data.title;
        });
    },
  },
};
</script>
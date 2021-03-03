<template>
  <div>
    <PageTitle
        title="Expense Categories"
        :btnCreate="true"
        :createRoute="'/purchase/add'"
        :createPopup="true"
        :permission="'Category Create'"
        @onClickCreate="OpenModal()"
    />
    <v-container fluid class="lighten-12 content">
      <v-card class="lighten-12 card-content mb-2">
        <v-row class="ma-0 align-right">
          <TableFilters
              :filters="['status', 'search']"
              v-model="filter"
              :columns="columns"
          ></TableFilters>

        </v-row>
      </v-card>
      <v-card class="lighten-12 card-content mt-0 pa-3">
        <v-col
            class="pr-1 text-right"
            cols="12"
            xs="12"
            sm="6"
            md="2"
            lg="2"
            xl="2"
        >
          <CategoryForm
              ref="createcategory"
              :visible="isCategoryFormVisible"
              @close="AddCategory($event)"
              @afterSave="refreshData()"
          />
        </v-col>
        <v-progress-linear
            active="false"
            indeterminate="false"
            :query="false"
            v-if="isLoading"
        ></v-progress-linear>
        <v-data-table
            :fixed-header="true"
            :headers="headers"
            :items-per-page="paginationOptions.perPage"
            :items="ProductCategory"
            @click:row="$router.push(`category/${$event.id}`)"
            class="row-pointer"
            item-key="id"
            hide-default-footer
        >
          <template v-slot:no-data>
            <img
                style="height: 200px;"
                src="../../../../../assets/img/no-result.jpg"
            />
          </template>
          <!-- No -->
          <template v-slot:item.no>
            <v-icon>mdi-vuetify</v-icon>
          </template>

          <!-- Status -->
          <template v-slot:item.is_active="{ item }" :slot-scope="props">
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
          <template v-slot:item.image="{ item }">
            <v-avatar size="32px" item color="primary">
              <img
                  v-if="item.image"
                  height="30"
                  width="30"
                  :src="item.image"
                  style="border-radius: 30%"
              />
              <span v-else class="white--text subtitle-2 text-uppercase">{{
                  item.name.substring(0, 2)
                }}</span>
            </v-avatar>
          </template>



          <!-- Action -->
          <template v-slot:item.action="{ item }">
            <list-menu
                feature="category"
                :item="item"
                @refreshList="refreshData"
                viewPermission="Category Show"
                editPermission="Category Edit"
                @onEditClicked="EditModal(item)"
                :isEditModal="true"
                :isSubViewModal="true"
                @onSubViewClicked="ViewCategory(item)"
            ></list-menu>
          </template>
          <template v-slot:footer>
            <pagination
                url="expense-categories"
                @paginationOptions="setPaginationOptions"
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
      </v-row> -->
        <!-- {{existImage}} -->
        <EditCategoryForm
            :visible="EditScheduleForm"
            ref="editcategory"
            :productcategory="editExpenseCategory"
            @afterSave="refreshData()"
            @close="EditCategory($event)"
        />
      </v-card>
    </v-container>
  </div>
</template>

<script>
import TableFilters from "@/components/base/TableFilters";
import CategoryForm from "./ExpenseCategoryCreate";
import { required, email, max } from "vee-validate/dist/rules";
import pagination from "../../../../shared/components/pagination";

import FileUpload from "@/components/base/FileUpload";
import confirmation from "../../../../shared/components/confirmation";
import { ProductCategory } from "../../../../../models/ProductCategory";
import EditCategoryForm from "./ExpenseCategoryEdit";
import _ from "lodash";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import {ExpenseCategory} from "@/models/ExpenseCategory";
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
    isCategoryFormVisible: false,
    EditScheduleForm:false,
    editExpenseCategory: new ExpenseCategory(),
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
        text: "Name",
        value: "name",
        show: true,
        disabled: false,
        width: "16.5%",
      },
      {
        text: "Code",
        value: "code",
        show: true,
        disabled: false,
        width: "16.5%",
      },

      {
        text: "Status",
        value: "is_active",
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
    ProductCategory: [],
    // newbrand: { name: "", id: "", is_active: "" },
    filter: {
      name: "",
      search: "",
      status: "",
    },
  }),
  computed: {
    // Filter - return selected table fields
    headers: function() {
      return this.columns.filter((item) => item.show == true);
    },
  },

  components: {
    ValidationProvider,
    ValidationObserver,
    CategoryForm,
    pagination,
    EditCategoryForm,
    FileUpload,
    TableFilters,
  },

  methods: {
    ViewCategory(item) {
      this.$router.push(`/masterdata/category/${item.id}`);
    },
    setPaginationOptions(data) {
      this.paginationOptions = data;
    },
    clearFilter() {
      this.filter = {};
    },
    navigate(item) {
      console.log(item);
    },

    OpenModal() {
      this.isCategoryFormVisible = true;
    },

    receiveCategoryData(data) {
      this.ProductCategory = data;
    },
    refreshData() {
      this.$refs.pagination.refreshData();
    },

    AddCategory($event) {
      this.isCategoryFormVisible = false;
    },
    EditModal(data) {
      debugger;
      this.EditScheduleForm = true;
      // this.$refs.editcategory.openModal();
      this.GetProductCategorySingle(data.id);
    },
    EditCategory($event) {
      this.EditScheduleForm = false;
      // this.editProductCategory={}
    },
    GetProductCategorySingle(id) {
      this.$store
          .dispatch(`sitesetting/GetExpenseCategory`,  id )
          .then((res) => {
            debugger;
            this.editExpenseCategory = res.data
            //this.existImage = res.data.image;
            this.refreshData();

            this.isLoading = false;
          })
          .catch((err) => {
            this.isLoading = false;
            this.messages = err.data.title;
          });
    },
    getStatusColor(status) {
      return status ? "green" : "gray";
    },
  },
  created() {
    this.refreshData();
  },
};
</script>

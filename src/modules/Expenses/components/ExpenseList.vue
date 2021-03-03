<template>
  <div>
    <PageTitle
        title="Expenses"
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
              :filters="[ 'search','expenseFor','expenseCategory','dateRange']"
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
              :Expense="Expense"
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
            class="row-pointer"
            item-key="id"
            hide-default-footer
        >
          <template v-slot:no-data>
            <!--            <img-->
            <!--                style="height: 200px;"-->
            <!--                src="../../../../assets/img/no-result.jpg"-->
            <!--            />-->
          </template>
          <!-- No -->
          <template v-slot:item.no>
            <v-icon>mdi-vuetify</v-icon>
          </template>
          <template v-slot:item.date="{ item }" :slot-scope="props">
            {{item.date|formatDate}}
          </template>

          <!-- Status -->




          <!-- Action -->
          <template v-slot:item.action="{ item }">
            <list-menu
                feature="category"
                :item="item"
                @refreshList="refreshData"
                editPermission="Category Edit"
                @onEditClicked="EditModal(item)"
                :isEditModal="true"
                :isSubViewModal="true"
                @onSubViewClicked="ViewCategory(item)"
            ></list-menu>
          </template>
          <template
              slot="body.append"
              v-if="ProductCategory && ProductCategory.length > 0"
          >

            <tr class="black--text">

              <th class="title"></th>
              <th class="title"></th>
              <th class="title"></th>
              <th class="title"></th>
              <th>
                <h3 class="justify-content-end">
                  {{ total | formatCurrency }}
                </h3>
              </th>

              <th class="title"></th>
            </tr>
          </template>
          <template v-slot:footer>
            <pagination
                url="expenses"
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
            :expense="Expense"
            @afterSave="refreshData()"
            @close="EditCategory($event)"
        />
      </v-card>
    </v-container>
  </div>
</template>

<script>
import TableFilters from "@/components/base/TableFilters";
import CategoryForm from "./ExpenceCreate";
import { required, email, max } from "vee-validate/dist/rules";
import pagination from '../../shared/components/pagination';

import FileUpload from "@/components/base/FileUpload";
import EditCategoryForm from "./ExpenseEdit";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import {Expenses} from "@/models/Expenses";
import * as moment from "moment/moment";
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
    Expense:new Expenses(),
    pagination1: {
      descending: true,
      page: 1,
      total:0,
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
        text: "Reference Number",
        value: "reference_number",
        show: true,
        disabled: false,
        width: "16.5%",
      },
      {
        text: "Date",
        value: "date",
        show: true,
        disabled: false,
        width: "16.5%",
      },
      {
        text: "Expense From",
        value: "expense_for",
        show: true,
        disabled: false,
        width: "16.5%",
      },
      {
        text: "Expense Category",
        value: "category.name",
        show: true,
        disabled: false,
        width: "16.5%",
      },
      {
        text: "Amount",
        value: "amount",
        show: true,
        disabled: false,
        align: "right",
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
      this.Expense=new Expenses();
    },

    receiveCategoryData(data) {
      this.ProductCategory = data;
      this.total = this.sumField(this.ProductCategory, "amount");
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
      this.GrtExpenseBySingle(data.id);
    },
    EditCategory($event) {
      this.EditScheduleForm = false;
      // this.editProductCategory={}
    },
    sumField(array, filed) {
      let value = 0;
      array.forEach((element) => {
        value += element[filed];
      });
      return value;
    },
    GrtExpenseBySingle(id) {
      debugger
      this.$store
          .dispatch(`warehouse/GetExpense`,  id )
          .then((res) => {
            debugger;
            this.Expense = res.data
            this.Expense.date=moment(res.data.date).format("YYYY-MM-DD")

            //this.existImage = res.data.image;
            // this.refreshData();

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

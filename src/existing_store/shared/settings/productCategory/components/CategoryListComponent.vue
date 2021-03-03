<template>
  <v-container fluid class="lighten-12 content">
    <!-- Page Title -->
    <v-flex class="pb-2">
      <h1 class="title_text">Category</h1>
      <Breadcrumbs />
    </v-flex>

    <v-card class="lighten-12 card-content ">
      <v-row class="ma-0 align-right ">
        <v-col class="pr-6 text-right" xs="12" sm="12" md="2" lg="" xl="2">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                depressed
                small
                class=" text-white btn_blue"
                @click="AddSupplier"
                @click.stop="$router.push('customer/add')"
              >
                <v-icon class="icon_small ma-2 ">mdi-plus</v-icon>
                Create
              </v-btn>
            </template>
            <span>Add Customer</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="lighten-12 card-content mt-2">
      <v-card-title class="card-title">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              class="icon_small"
              @click.stop="OpenModal()"
              v-bind="attrs"
              v-on="on"
              >mdi-plus</v-icon
            >
          </template>
          <span>Add Category</span>
        </v-tooltip>
      </v-card-title>
      <v-col cols="8">
        <CategoryForm
          :visible="isCategoryFormVisible"
          @close="AddCategory($event)"
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
        :items="ProductCategory"
        item-key="id"
        
      >
        <!-- No -->
        <template v-slot:item.no>
          <v-icon>mdi-vuetify</v-icon>
        </template>

        <!-- Status -->
        <template v-slot:item.status="{ item }">
          <v-chip
           :x-small="true"
            class="ma-2"
            label
            text-color="white"
            :color="getStatusColor(item.status)"
            dark
            >{{ item.status }}</v-chip
          >
        </template>

        <!-- Action -->
        <template v-slot:item.action="{ item }">
          <v-menu  offset-y transition="scroll-y-transition" >
            <template v-slot:activator="{ attrs, on }">
              <v-icon v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
            </template>
            <v-list class="actions">
              <v-list-item link @click="ViewCategory(item.id)">
                <span>
                  <v-icon v-bind="attrs" v-on="on">mdi-eye</v-icon>View
                </span>
              </v-list-item>
              <v-list-item @click.stop="EditModal(item)" link>
                <span>
                  <v-icon v-bind="attrs" v-on="on"
                    >mdi-pencil-box-outline</v-icon
                  >Edit
                </span>
              </v-list-item>

              <v-list-item link @click="openConfirmation(item)">
                <span>
                  <v-icon v-bind="attrs" v-on="on">{{
                    item.status == "Archived"
                      ? "mdi-checkbox-marked-circle"
                      : "mdi-archive"
                  }}</v-icon>
                  {{ item.status == "Archived" ? "Active" : "Archive" }}
                </span>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>

      <v-row>
        <v-col cols="12 pa-5" align-self="end">
          <v-container class="max-width"></v-container>
        </v-col>
      </v-row>
      <EditCategoryForm
        :visible="EditScheduleForm"
        :productcategory="editProductCategory"
        @close="EditCategory($event)"
      />
    </v-card>
    <!-- </v-card> -->
    <div class="d-flex justify-center align-center"></div>
  </v-container>
</template>

<script>
import CategoryForm from "../components/AddCategory";
import { required, email, max } from "vee-validate/dist/rules";
import pagination from "../../pagination/components/pagination";
import confirmation from "../../../../shared/components/confirmation";
import { ProductCategory } from "../../../../../models/ProductCategory";
import EditCategoryForm from "../components/CategoryEditComponent";
import _ from "lodash";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
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
    isCategoryFormVisible: false,
    editProductCategory: new ProductCategory(),
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
    headers: [
      { text: "Name", value: "name",align: "left", },
      { text: "Code", value: "code",align: "left", },
      { text: "Image", value: "image" ,align: "left",},
      { text: "ParentCatgory", value: "parentCatgory",align: "left", },
      { text: "Status", value: "status",align:'center',
        width:'10%'  },
      { text: "Actions", value: "action",
        align:'center',
        width:'10%' },
    ],
    ProductCategory: [],
  }),
  components: {
    ValidationProvider,
    ValidationObserver,
    CategoryForm,
    pagination,
    EditCategoryForm,
  },

  methods: {
    OpenModal() {
      this.isCategoryFormVisible = true;
    },
    AddCategory($event) {
      this.isCategoryFormVisible = false;
    },
    EditModal(data) {
      this.EditScheduleForm = true;
      this.editProductCategory = _.cloneDeep(data);
    },
    EditCategory($event) {
      this.EditScheduleForm = false;
    },
    GetProductCategory() {
      this.$store
        .dispatch("product/GetProductCategories", {
          filters: {
            searchText: "",
            roles: [1, 2],
          },
          pagination: {},
        })
        .then((res) => {
          this.ProductCategory = res.data;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.messages = err.data.title;
        });
    },
    getStatusColor(status) {
      return status == "Active" ? "green" : "gray";
    },
    openConfirmation(ProductCategory) {
      confirmation.dialog = true;
      this.$confirm(
        "Do you want to " +
          (ProductCategory.status == "Active" ? "Archive  " : "Activate  ") +
          ProductCategory.name +
          "?"
      ).then((res) => {
        if (res) {
          this.$store
            /*   .dispatch("warehouse/EditWarehouse", {
              id: ProductCategory.id,
              name: ProductCategory.name,
              address: JSON.stringify(ProductCategory.address),
              isActive: ProductCategory.status == "Active" ? false : true,
            })*/
            .then((res) => {
              const message =
                "Category " +
                (ProductCategory.status == "Active"
                  ? "Archived"
                  : "Activated") +
                " Successfully";
              this.$toast.success(message);
              this.GetProductCategory();
            })
            .catch((err) => {
              this.$toast.error("Product category is not archived");
            });
        } else {
        }
      });
    },
  },
  created() {
    this.GetProductCategory();
  },
};
</script>

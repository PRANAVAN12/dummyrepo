<!-- *************************************************************************
	TEMPLATE
	************************************************************************* -->
<template>
  <div>
    <!-- <v-container fluid class="lighten-12 container"> -->
    <v-row>
      <v-col cols="12 py-0">
        <v-card>
          <!-- <v-card-title class="d-flex justify-space-between">
              Product List
            </v-card-title> -->
          <v-container fluid>
            <v-row class="ma-0 align-right">
              <v-col cols="12" sm="12" lg="8" md="6" class=""> </v-col>
              <v-col cols="12" sm="12" lg="4" md="6" class="px-0">
                <v-row>
                  <v-col class="px-0 mx-0">
                    <v-combobox
                      hide-details="auto"
                      v-model="selectedProduct"
                      :hide-no-data="!searchProduct"
                      @change="searchProduct = ''"
                      @input="getProductsByQuery(selectedProduct)"
                      :items="productLists"
                      :search-input.sync="searchProduct"
                      outlined
                      item-text="name"
                      item-value="id"
                      clearable
                      label="Select Products"
                      multiple
                      small-chips
                    >
                    </v-combobox
                  ></v-col>
                  <v-col class="pl-0 ml-0">
                    <v-btn
                      depressed
                      small
                      block
                      height="30"
                      class="btn_blue w-100 ml-2"
                      @click="AssignProductToSupplier()"
                    >
                      Assign Product
                    </v-btn>
                  </v-col></v-row
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <!-- Filters -->
                <v-row class="ma-0 align-right sub-section">
                  <TableFilters
                    :filters="['category', 'brand', 'search']"
                    v-model="filter"
                    :columns="columns"
                  ></TableFilters>
                  <ImportExportMenu></ImportExportMenu>
                </v-row>
                <!-- Data table -->
                <v-row>
                  <v-col cols="12">
                    <v-data-table
                      :items-per-page="paginationOptions.perPage"
                      :fixed-header="true"
                      :headers="headers"
                      @click:row="$router.push(`/product/${$event.id}`)"
                      :items="supplierProducts"
                      :loading="loading"
                      loading-text="Loading... Please wait"
                      hide-default-footer
                    >
                      <template v-slot:footer="{}">
                        <paginationComponent
                          @paginationOptions="setPaginationOptions"
                          :url="'supplier/' + supplierId + '/products'"
                          :filter="filter"
                          @response="receiveproductResponse"
                          ref="pagination"
                        />
                      </template>

                      <template v-slot:item.action="{ item }">
                        <v-menu :key="text" offset-y>
                          <template v-slot:activator="{ attrs, on }">
                            <v-icon v-bind="attrs" v-on="on"
                              >mdi-dots-vertical</v-icon
                            >
                          </template>
                          <v-list class="actions">
                            <v-list-item @click="openConfirmation(item)" link>
                              <span>
                                <v-icon v-bind="attrs" v-on="on"
                                  >mdi-archive</v-icon
                                >Remove
                              </span>
                            </v-list-item>
                            <v-list-item :to="'/product/' + item.id" link>
                              <span>
                                <v-icon v-bind="attrs" v-on="on">mdi-eye</v-icon
                                >View
                              </span>
                            </v-list-item>
                            <v-list-item :to="'/product/edit/' + item.id" link>
                              <span>
                                <v-icon v-bind="attrs" v-on="on"
                                  >mdi-pencil-box-outline</v-icon
                                >Edit
                              </span>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </template>

                      <template v-slot:item.is_active="{ item }">
                        <v-chip
                          x-small="true"
                          class="ma-2"
                          label
                          text-color="white"
                          :color="getStatusColor(item.is_active)"
                          dark
                          >{{ item.status }}</v-chip
                        >
                      </template>
                    </v-data-table>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <!-- </v-container> -->
  </div>
</template>

<!-- *************************************************************************
	SCRIPT
	************************************************************************* -->
<script>
//COMPONENTS
import { Product } from "../../../models/Product";
import _ from "lodash";
import Categories from "@/mixins/Categories";
import Brands from "@/mixins/Brands";

import paginationComponent from "../../shared/components/pagination.vue";
import TableFilters from "@/components/base/TableFilters";
import confirmation from "../../shared/components/confirmation";
export default {
  mixins: [Categories, Brands],
  data() {
    return {
      paginationOptions: {},
      errors: [],

      loading: true,
      selectedProduct: [],

      searchProduct: null,

      productLists: [],
      columns: [
        {
          text: "Product name",
          value: "name",
          align: "left",
          show: true,
          disabled: true,
        },
        {
          text: "Product code",
          value: "code",
          align: "left",
          show: true,
          disabled: false,
        },
        {
          text: "Category",
          value: "category.name",
          show: true,
          align: "left",
          disabled: false,
        },
        {
          text: "Brand",
          value: "brand.name",
          align: "left",
          show: true,
          disabled: false,
        },
        {
          text: "Actions",
          value: "action",
          show: true,
          disabled: true,
          align: "center",
          width: "10%",
        },
      ],
      products: [],
      supplierProducts: [],
      filter: {
        category: "",
        brand: "",
        search: "",
      },
      messages: "",
    };
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
    receiveproductResponse(products) {
      this.supplierProducts = products;
      this.getProductsByQuery(null);
      // this.selectedProduct = [];

      // this.products.forEach((product) => {
      //   this.selectedProduct.push(product.id);
      // });
      this.loading = false;
    },
    SetSuplierId() {
      this.supplierId = this.$route.params.id;
    },
    getStatusColor(status) {
      return status == "true" ? "green" : "gray";
    },
    getProductsByQuery(selectedItems = null, query = "") {
      debugger;
      this.searchProduct = null;
      this.projectsLoading = true;
      let except = [];
      debugger;
      this.supplierProducts.map((element) => {
        except.push(element.id);
      });
      if (this.selectedProduct && this.selectedProduct.length > 0) {
        this.selectedProduct.map((element) => {
          except.push(element.id);
        });
      }
      this.$store
        .dispatch("product/GetProduct", {
          except: except,
          query: query,
        })
        .then((res) => {
          this.productLists = res.map((u, i, arr) => {
            u.index = i + 1;
            return new Product().toViewModel(u);
          });

          this.isLoading = false;
          this.projectsLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.projectsLoading = false;
          this.messages = err.data.title;
        });
    },
    async AssignProductToSupplier() {
      debugger;
      console.log(this.selectedProduct);
      if (this.selectedProduct != null) {
        let credentials = new Object();
        credentials.products = [];
        this.selectedProduct.map((p) => {
          credentials.products.push(p.id);
        });

        credentials.supplierId = this.$route.params.id;
        this.AssignSupplier(credentials);
      }
    },
    AssignSupplier(credentials) {
      this.$store
        .dispatch(`product/AssignProductToSupplier`, credentials)
        .then((res) => {
          this.$emit("aftersave");
          this.isLoading = false;
          this.$toast.success("Product assigned successfully");
          this.$refs.pagination.refreshData();
          this.show = false;
          this.selectedProduct = null;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$toast.error("Product assigned failed");
          this.show = false;
          this.payment = new Payment();
        });
    },

    openConfirmation(item) {
      confirmation.dialog = true;
      this.$confirm("Do you want to Remove ?").then((res) => {
        if (res) {
          this.RemoveProductFromSupplier(item);
        }
      });
    },
    RemoveProductFromSupplier(item) {
      const credentials = new Object();
      credentials.products = [item.id];
      credentials.supplierId = this.$route.params.id;
      this.$store
        .dispatch(`product/RemoveProductFromSupplier`, credentials)
        .then((res) => {
          this.refreshData();
          this.selectedSupplier = null;
          this.isLoading = false;
          this.$toast.success("Supplier removed successfully");
        })
        .catch((err) => {
          this.isLoading = false;
          this.$toast.error("Supplier remove failed");
          this.payment = new Payment();
        });
    },
  },

  created() {
    this.SetSuplierId();
    this.refreshData();
  },
  watch: {
    searchProduct(value) {
      if (!value) {
        return;
      }
      this.getProductsByQuery(this.searchProducts, value);
    },
  },

  components: {
    paginationComponent,
    TableFilters,
  },
  computed: {
    // Filter - return selected table fields
    headers: function () {
      return this.columns.filter((item) => item.show == true);
    },
  },
};
</script>

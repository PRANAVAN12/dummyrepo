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
            <v-row>
              <v-col>
                <!-- Filters -->
                <v-row class="ma-0 align-right sub-section">
                  <TableFilters
                    :filters="['category', 'status', 'brand', 'search']"
                    v-model="filter"
                    :columns="columns"
                  ></TableFilters>
                </v-row>
                <!-- Data table -->
                <v-row>
                  <v-col cols="12">
                    <!-- {{products}} -->
                    <v-data-table
                      :items-per-page="paginationOptions.perPage"
                      :fixed-header="true"
                      :headers="headers"
                      :items="products"
                      :loading="loading"
                      loading-text="Loading... Please wait"
                      hide-default-footer
                    >
                      <template v-slot:footer="{}">
                        <paginationComponent
                          @paginationOptions="setPaginationOptions"
                          :url="'ware-houses/' + WarehouseId + '/store'"
                          :filter="filter"
                          @response="receiveproductResponse"
                        />
                      </template>
                      <!-- Status
          <template v-slot:item.status="{ item }">
            <v-chip
             :x-small="true"
              class="ma-2"
              label
              text-color="white"
              :color="getStatusColor(item.product.is_active)"
              dark
            >{{ item.product.is_active ? "Active" : "Archieved" }}</v-chip>
          </template> -->
                      <template v-slot:item.action="{ item }">
                        <v-menu offset-y transition="scroll-y-transition">
                          <template v-slot:activator="{ attrs, on }">
                            <v-icon v-bind="attrs" v-on="on"
                              >mdi-dots-vertical</v-icon
                            >
                          </template>
                          <v-list class="actions">
                            <v-list-item :to="'/product/' + item.id" link>
                              <span>
                                <v-icon v-bind="attrs" v-on="on">mdi-eye</v-icon
                                >View
                              </span>
                            </v-list-item>
                            <!-- <v-list-item :to="'/product/edit/' + item.id" link>
                  <span>
                    <v-icon v-bind="attrs" v-on="on">mdi-pencil-box-outline</v-icon>Edit
                  </span>
                </v-list-item> -->
                          </v-list>
                        </v-menu>
                      </template>

                      <template v-slot:item.product.is_active="{ item }">
                        <v-chip
                          :x-small="true"
                          class="ma-2"
                          label
                          text-color="white"
                          :color="getStatusColor(item.product.is_active)"
                          dark
                          >{{ item.product.is_active }}</v-chip
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
import { Product } from "../../../../../models/Product";
import _ from "lodash";
import TableFilters from "@/components/base/TableFilters";
import Categories from "@/mixins/Categories";
import Brands from "@/mixins/Brands";

import paginationComponent from "../../../../shared/components/pagination";

export default {
  mixins: [Categories, Brands],
  data() {
    return {
      paginationOptions: {},
      loading: true,
      columns: [
        {
          text: "Product name",
          value: "product.name",
          show: true,
          disabled: true,
          align: "left",
        },
        {
          text: "Product code",
          value: "product.code",
          show: true,
          align: "left",
          disabled: false,
        },
        {
          text: "Category",
          value: "product.category.name",
          show: true,
          align: "left",
          disabled: false,
        },
        {
          text: "Brand",
          value: "product.brand.name",
          show: true,
          align: "left",
          disabled: false,
        },
        {
          text: "Status",
          value: "product.is_active",
          show: true,
          align: "center",
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
      status: ["Active", "Archeived"],
      products: [],
      searchCategory: null,
      searchBrand: null,
      filter: {
        category: "",
        brand: "",
        search: "",
        is_active: "",
      },
      messages: "",
    };
  },
  watch: {
    searchCategory(value) {
      if (!value) {
        return;
      }
      this.GetCategoryByQuery(value);
    },
    searchBrand(value) {
      if (!value) {
        return;
      }
      this.GetBrandByQuery(value);
    },
  },
  props: {
    WarehouseId: {
      type: Number,
      default: null,
    },
  },
  methods: {
    setPaginationOptions(data) {
      this.paginationOptions = data;
    },
    clearFilter() {
      this.filter = {};
    },
    receiveproductResponse(products) {
      this.products = products;
      this.loading = false;
    },

    getStatusColor(is_active) {
      return is_active ? "green" : "gray";
    },
    GetCategoryByQuery(query = "") {
      this.$store
        .dispatch("product/GetCategorySearch", { query: query })
        .then((res) => {
          console.log(res);
          this.categories = res.data.data;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.messages = err.data.name;
        });
    },
    GetBrandByQuery(query = "") {
      this.$store
        .dispatch("brand/GetBrandSearch", { query: query })
        .then((res) => {
          console.log(res);

          this.brands = res.data.data;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.messages = err.data.name;
        });
    },
  },
  created() {
    this.GetCategoryByQuery();
    this.GetBrandByQuery();
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

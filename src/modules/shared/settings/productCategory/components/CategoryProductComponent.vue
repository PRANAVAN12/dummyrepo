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
                    :filters="['status', 'brand', 'search']"
                    v-model="filter"
                    :columns="columns"
                  ></TableFilters>
                </v-row>
                <!-- Data table -->
                <v-row>
                  <v-col cols="12">
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
                          :url="'categories/' + CategoryId + '/products'"
                          :filter="filter"
                          @response="receiveproductResponse"
                        />
                      </template>
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
                          </v-list>
                        </v-menu>
                      </template>
                      <template v-slot:item.image="{ item }">
                        <v-avatar size="32px" item color="primary">
                          <img v-if="item.image" :src="item.image" />
                          <span
                            v-else
                            class="white--text subtitle-2 text-uppercase"
                          >
                            {{ item.name.substring(0, 2) }}</span
                          >
                        </v-avatar>
                      </template>

                      <template v-slot:item.is_active="{ item }">
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

import paginationComponent from "../../../../shared/components/pagination";

export default {
  data() {
    return {
      paginationOptions: {},
      loading: true,
      columns: [
        {
          text: "Image",
          value: "image",
          show: true,
          align: "left",
          disabled: false,
        },
        {
          text: "Product name",
          value: "name",
          show: true,
          align: "left",
          disabled: true,
        },
        {
          text: "Product code",
          value: "code",
          show: true,
          align: "left",
          disabled: false,
        },

        {
          text: "Brand",
          value: "brand.name",
          show: true,
          align: "left",
          disabled: false,
        },
        {
          text: "Status",
          value: "is_active",
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
        brand: "",
        search: "",
        is_active: "",
      },
      messages: "",
    };
  },
  watch: {},
  props: {
    CategoryId: {
      type: Number,
      default: null,
    },
  },
  methods: {
    setPaginationOptions(data) {
      this.paginationOptions = data;
    },
    receiveproductResponse(products) {
      this.products = products;
      this.loading = false;
    },

    getStatusColor(is_active) {
      return is_active ? "green" : "gray";
    },
  },
  created() {},

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

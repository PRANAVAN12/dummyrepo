<template>
  <div>
    <PageTitle title="Shop Stock Details" :btnCreate="true" />

    <v-container fluid class="lighten-12 content">
      <!-- <hr style="border-top: 1px dashed rgb(173 173 173)" /> -->
      <v-card class="lighten-12 card-content">
        <TableFilters
          :filters="[
            'product',
            'shop',
            'stock',
            'search',
          ]"
          v-model="filter"
          :columns="columns"
        ></TableFilters>
      </v-card>

      <v-card class="mt-2">
        <v-container fluid>
          <v-row>
            <v-card-text class="pa-0">
              <v-data-table
                :items-per-page="paginationOptions.perPage"
                :fixed-header="true"
                :single-expand="singleExpand"
                :expanded.sync="expanded"
                @click:row="GetBatchDetails($event)"
                show-expand
                :headers="headers"
                :items="stocks"
                item-key="id"
                hide-default-footer
                class="row-pointer product-list"
                expand
                dense
              >
                <template v-slot:item.available_stock="{ item }">
                  <v-chip
                    :x-small="true"
                    class="ma-2"
                    label
                    text-color="white"
                    :color="getStockColor(item)"
                    dark
                    >{{ item.available_stock }}</v-chip
                  >
                </template>
                <template v-slot:expanded-item="{ headers, item: childItem }">
                  <td :colspan="headers.length">
                    <v-card class="pa-0 mt-3 mb-3">
                      <v-data-table
                        dense
                        :items="stockBatches"
                        :headers="batchHeaders"
                        class="sub-table"
                      >
                        <v-progress-linear
                          v-show="progressBar"
                          slot="progress"
                          color="blue"
                          indeterminate
                        ></v-progress-linear>
                      </v-data-table>
                    </v-card>
                  </td>
                </template>
                <template v-slot:no-data>
                  <!-- <img
                    style="height: 200px"
                    src="../../../assets/img/no-result.jpg"
                  /> -->
                </template>

                <template v-slot:item.image="{ item }">
                  <v-avatar size="32px" item color="primary">
                    <img v-if="item.product.image" :src="item.product.image" />
                    <span v-else class="white--text subtitle-2 text-uppercase">
                      {{ item.product.name.substring(0, 2) }}</span
                    >
                  </v-avatar>
                </template>
                <template
                  v-slot:item.data-table-expand="{ item, isExpanded, expand }"
                >
                  <span
                    @click="GetBatchDetails($event)"
                    v-if="
                      (expanded.length > 0 && item.id != expanded[0].id) ||
                      expanded.length == 0
                    "
                    class="mdi mdi-chevron-double-down"
                  ></span>
                  <span
                    @click="GetBatchDetails($event)"
                    v-if="expanded.length > 0 && item.id == expanded[0].id"
                    class="mdi mdi-chevron-double-up"
                  ></span>
                </template>
                <template v-slot:footer>
                  <pagination
                    @paginationOptions="setPaginationOptions"
                    @response="setResponseData"
                    url="shop-stocks"
                    :filter="filter"
                    ref="pagination"
                  />
                </template>
              </v-data-table>
            </v-card-text>
          </v-row>
        </v-container>
      </v-card>

      <div class="d-flex justify-center align-center"></div>
      <!-- </v-row> -->
    </v-container>
  </div>
</template>

<script>
// Components
import PageTitle from "@/components/shared/PageTitle";
import pagination from "../shared/components/pagination";
import TableFilters from "@/components/base/TableFilters";
import uniq from "lodash/uniq";
import { required, email, max } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import BrandAutoComplete from "@/components/base/BrandAutoComplete";
import CategoryAutoComplete from "@/components/base/CategoryAutoComplete";
import StatusAutoComplete from "@/components/base/StatusAutoComplete";
import _ from "lodash";
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
    progressBar: false,
    batchHeaders: [
      {
        text: "Batch",
        value: "batch.batch",
        show: true,
        align: "left",
        disabled: true,
        width: "14.2%",
      },
      {
        text: "In Stock",
        value: "quantity",
        show: true,
        align: "center",
        disabled: true,
        width: "14.2%",
      },
    ],
    columns: [
      {
        text: "Image",
        value: "image",
        show: true,
        disabled: true,
        align: "left",
        width: "14.2%",
      },
      {
        text: "Product",
        value: "product.name",
        show: true,
        disabled: true,
        align: "left",
      },
      {
        text: "Unit",
        value: "unit.name",
        align: "left",
        show: true,
        disabled: false,
      },
      {
        text: "Shop",
        value: "shop.name",
        show: true,
        disabled: false,
        align: "left",
      },
      {
        text: "In Stock",
        value: "available_stock",
        show: true,
        disabled: false,
        align: "center",
        width: "14.2%",
      },
      {
        text: "Reorder Level",
        value: "reorder_level",
        show: true,
        disabled: false,
        align: "center",
        width: "14.2%",
      },
    ],
    products: [],
    stocks: [],
    expanded: [],
    singleExpand: true,
    stockBatches: [],
    // Filters
    filter: {
      search: "",
      product: "",
      status: "",
      shop: "",
    },
  }),
  components: {
    PageTitle,
    ValidationProvider,
    ValidationObserver,
    pagination,
    TableFilters,
  },
  methods: {
    setPaginationOptions(data) {
      this.paginationOptions = data;
    },
    refreshData() {
      this.$refs.pagination.refreshData();
    },
    setResponseData(stock) {
      this.stocks = stock;;
    },
    clearFilter() {
      this.filter = {};
    },
    GetBatchDetails(event) {
      this.progressBar = true;
      if (this.expanded.length > 0 && this.expanded[0].id == event.id) {
        this.expanded = [];
      } else {
        const payload = new Object();
        payload.product_id = event.product.id;
        payload.shop_id = event.shop.id;
        payload.unit_id = event.unit.id;
        this.$store
          .dispatch("stock/GetShopBatchStocksOnExpand", payload)
          .then((resp) => {
            this.progressBar = false;

            this.stockBatches = resp;
          })
          .catch((error) => console.log(error));
        this.expanded = [];
        this.progressBar = false;
        this.expanded.push(event);
      }
    },
    getStockColor(stock) {
      debugger;
      console.log(stock);
      if (
        0 < stock.available_stock &&
        stock.available_stock < stock.reorder_level
      ) {
        return "orange";
      } else if (stock.available_stock < 1) {
        return "red";
      } else {
        return "green";
      }
    },
  },
  computed: {
    headers: function () {
      return this.columns.filter((item) => item.show == true);
    },
  },
  created() {},
};
</script>

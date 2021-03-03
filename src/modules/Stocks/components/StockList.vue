<template>
  <div>
    <PageTitle title="Stock Details" :btnCreate="true" />

    <v-container fluid class="lighten-12 content">
      <!-- <hr style="border-top: 1px dashed rgb(173 173 173)" /> -->
      <v-card class="lighten-12 card-content">
        <TableFilters
          :filters="[
            'product',
            'warehouse',
            'damage',
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
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-btn   @click="openTransferModal()" v-if="batchHeaders[3].show && selectedItemToTransfer.length>0"
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                    >
                      Transfer
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-switch
                        v-model="batchHeaders[3].show"
                        label="Transfer Stock"
                        class="mt-2"
                    ></v-switch>
                  </v-toolbar>
                </template>

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
                <template v-slot:expanded-item="{ headers, child: childItem }">
                  <td :colspan="headers.length">
                    <v-card class="pa-0 mt-3 mb-3">
                      <v-data-table
                        dense
                        :items="stockBatches"
                        :headers="batchHeaders"
                        class="sub-table"
                        :fixed-header="true"
                        hide-default-footer
                        expand
                        dense
                      >
                        <template v-slot:item.isTransfer="{ item }">
                          <v-checkbox v-if="batchHeaders[3].show && item.available_stock>0" v-model="item.isTransfer"
                                      color="indigo darken-3"
                                      @change="AddItemToTransfer(item)"
                                      hide-details
                          ></v-checkbox>
                        </template>
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
                  <img
                    style="height: 200px"
                    src="../../../assets/img/no-result.jpg"
                  />
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
                    url="stocks"
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
    <TransferStockModal
        :productDetails="selectedItemToTransfer"
        ref="TransferForm"
        @conform="refreshBatches($event)"
    />
  </div>

</template>

<script>
// Components
import PageTitle from "@/components/shared/PageTitle";
import pagination from "../../shared/components/pagination";
import TableFilters from "@/components/base/TableFilters";
import TransferStockModal from "./TransferStockModal";
import confirmation from "../../shared/components/confirmation";
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
    selectedItemToTransfer:[],
    selectedWarehouse:null,
    TransferStock:false,
   selectedProductDetails:null,
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
        value: "available_stock",
        show: true,
        align: "center",
        disabled: true,
        width: "14.2%",
      },
      {
        text: "Damage",
        value: "damage",
        show: true,
        align: "center",
        disabled: false,
        width: "14.2%",
      },
      {
        text: "",
        value: "isTransfer",
        show: false,
        disabled: false,
        align: "center",
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
        width: "14.2%",
      },
      {
        text: "Unit",
        value: "unit.name",
        align: "left",
        show: true,
        disabled: false,
        width: "14.2%",
      },
      {
        text: "Warehouse",
        value: "wareHouse.name",
        show: true,
        disabled: false,
        align: "left",
        width: "14.2%",
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
        text: "Damage",
        value: "damage",
        show: true,
        disabled: false,
        align: "center",
        width: "16.2%",
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
      warehouse: "",
      damage: "",
    },
  }),
  components: {
    PageTitle,
    ValidationProvider,
    ValidationObserver,
    pagination,
    TableFilters,TransferStockModal
  },
  methods: {
    setPaginationOptions(data) {
      this.paginationOptions = data;
    },
    refreshData() {
      this.$refs.pagination.refreshData();
    },
    setResponseData(productData) {
      this.stocks = this.groupStock(productData);
    },
    openTransferModal()
    {
this.$refs.TransferForm.openModal();
    },

    groupStock(productData) {
      let groupedArray = _.groupBy(productData, function (entry) {
        return (
          entry.wareHouse.id + "," + entry.unit.id + "," + entry.product.id
        );
      });
      return Object.keys(groupedArray).map((key) => {
        let actual_stock = _.sumBy(groupedArray[key], "actual_stock");
        let available_stock = _.sumBy(groupedArray[key], "available_stock");
        let background = "green";
        if (0 < available_stock > groupedArray[key][0].reorder_level) {
          background = "orange";
        } else if (available_stock <= 0) {
          let background = "#dd000017";
        }
        return {
          actual_stock: actual_stock,
          available_stock: available_stock,
          batch: groupedArray[key][0].batch,
          damage: _.sumBy(groupedArray[key], "damage"),
          id: groupedArray[key][0].id,
          product: groupedArray[key][0].product,
          reorder_level: groupedArray[key][0].reorder_level,
          unit: groupedArray[key][0].unit,
          wareHouse: groupedArray[key][0].wareHouse,
          background: background,
        };
      });
    },
    clearFilter() {
      this.filter = {};
    },
    AddItemToTransfer(item)
    {
      let productBatch=new Object()
      productBatch.productDetail=this.selectedProductDetails;
      productBatch.details=item;
      productBatch.productDetail.quantity=item.available_stock;
      productBatch.productDetail.maxStock=item.available_stock;
      // productBatch.productDetail.available_stock=item.available_stock;
      console.log('DETAILSSS', item);
      debugger
      if(this.selectedWarehouse && this.selectedWarehouse!=this.selectedProductDetails.wareHouse.id)
      {
        this.$confirm(
            `you can transfer to one warehouse at a time Do you want to change to new Warehouse  previous selected warehouse Transfer will be lost`
        ).then((res) => {
          if (res) {
           this.selectedItemToTransfer=[];
            this.selectedWarehouse=this.selectedProductDetails.wareHouse.id;
            if(item.isTransfer)
            {
              item.error=[];

              this.selectedItemToTransfer.push(_.cloneDeep(productBatch));
            }
            else
            {
              let index =this.selectedItemToTransfer.findIndex(p=>(p.productDetail.product.id==this.selectedProductDetails.product.id)&& p.productDetail.wareHouse.id==item.wareHouse.id && p.details.batch.id==item.batch.id );
              if(index != -1)
              {
                this.selectedItemToTransfer.splice(index,1);
              }
            }
          }
          else
          {
            item.isTransfer=false;
          }

        });
      }
      else
      {
        this.selectedWarehouse=this.selectedProductDetails.wareHouse.id;
        if(item.isTransfer)
        {
          item.error=[];
          this.selectedItemToTransfer.push(_.cloneDeep(productBatch));
          item.quantity=item.available_stock
        }
        else
        {
          let index =this.selectedItemToTransfer.findIndex(p=>(p.productDetail.product.id==this.selectedProductDetails.product.id)&& p.productDetail.wareHouse.id==this.selectedProductDetails.wareHouse.id && p.details.batch.id==item.batch.id );
          if(index != -1)
          {
            this.selectedItemToTransfer.splice(index,1);
          }
        }
      }

    },
    GetBatchDetails(event) {
      this.progressBar = true;
      if (this.expanded.length > 0 && this.expanded[0].id == event.id) {
        this.expanded = [];
      } else {
        const payload = new Object();
        this.selectedProductDetails=event;
        payload.product_id = event.product.id;
        payload.warehouse_id = event.wareHouse.id;
        payload.unit_id = event.unit.id;
        this.$store
          .dispatch("stock/GetBatchForStocksinExpandTable", payload)
          .then((resp) => {
            this.progressBar = false;
            this.stockBatches = resp.map(r=>{
              let selectedProduct=this.selectedItemToTransfer.find(p=>(p.productDetail.product.id==event.product.id && p.productDetail.wareHouse.id==event.wareHouse.id && p.details.batch.id==r.batch.id))
              if(selectedProduct)
              {
                r.isTransfer=true;
              }
              else
              {
                r.isTransfer=false;
              }


              return r
            });
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

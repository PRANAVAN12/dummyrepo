<template>
  <v-container fluid class="table-filter px-3">
    <v-row :style="[this.export.length >0? {'background' : '#d8e9e5','padding': '2px', } : {'background' : 'none'}]">
      <v-col cols="12" sm="12" md="12" lg="9">

        <v-row class="justify-left" >
          <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              class="py-1"
              v-if="hasFilter('status')"
          >
            <StatusAutoComplete
                v-model="filter.status"
                :clear="clearFilter"
            ></StatusAutoComplete>
          </v-col>
          <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              class="py-1"
              v-if="hasFilter('shop')"
          >
            <ShopAutoComplete
                v-model="filter.shop"
                :clear="clearFilter"
            ></ShopAutoComplete>
          </v-col>
          <!-- :lg="filter.end != '' ? 3 : 2" -->
          <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              class="py-1"
              v-if="hasFilter('dateRange')"
          >
            <DateRangeFilter
                :clear="clearFilter"
                @start="startChange"
                @end="endChange"
            ></DateRangeFilter>
          </v-col>

          <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              class="py-1"
              v-if="hasFilter('brand')"
          >
            <BrandAutoComplete
                v-model="filter.brand"
                :clear="clearFilter"
            ></BrandAutoComplete>
          </v-col>
          <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              class="py-1"
              v-if="hasFilter('category')"
          >
            <CategoryAutoComplete
                v-model="filter.category"
                :clear="clearFilter"
            ></CategoryAutoComplete>
          </v-col>
          <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              class="py-1"
              v-if="hasFilter('supplier')"
          >
            <SupplierAutoComplete
                v-model="filter.supplier"
                :clear="clearFilter"
            ></SupplierAutoComplete>
          </v-col>

          <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              class="py-1"
              v-if="hasFilter('customer')"
          >
            <CustomerAutoComplete
                v-model="filter.customer"
                :clear="clearFilter"
            ></CustomerAutoComplete>
          </v-col>
          <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              class="py-1"
              v-if="hasFilter('expenseCategory')"
          >
            <ExpenseCategoryAutoComplete
                v-model="filter.expenseCategory"
                :clear="clearFilter"
            ></ExpenseCategoryAutoComplete>
          </v-col>
  <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              class="py-1"
              v-if="hasFilter('incomeCategory')"
          >
            <IncomeCategoryAutoComplete
                v-model="filter.expenseCategory"
                :clear="clearFilter"
            ></IncomeCategoryAutoComplete>
          </v-col>
          <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              class="py-1"
              v-if="hasFilter('biller')"
          >
            <BillerAutoComplete
                v-model="filter.biller"
                :clear="clearFilter"
            ></BillerAutoComplete>
          </v-col>

          <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              class="py-1"
              v-if="hasFilter('product')"
          >
            <ProductAutoCompleteComponent
                v-model="filter.product"
                :clear="clearFilter"
            ></ProductAutoCompleteComponent>
          </v-col>
          <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              class="py-1"
              v-if="hasFilter('warehouse')"
          >
            <WareHouseAutoComplete
                v-model="filter.warehouse"
                :clear="clearFilter"
            ></WareHouseAutoComplete>
          </v-col>
          <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              class="py-1"
              v-if="hasFilter('customerType')"
          >
            <v-select
                hide-details="auto"
                :items="CustomerTypes"
                :loading="loading"
                v-model="filter.customerType"
                item-text="name"
                item-value="id"
                label="Type"
                outlined
                clearable
                dense
            ></v-select>
          </v-col>
          <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              class="py-1"
              v-if="hasFilter('customerGroup')"
          >
            <v-select
                hide-details="auto"
                :items="CustomerGroups"
                :loading="loading"
                v-model="filter.customerGroup"
                item-text="name"
                item-value="id"
                label="Group"
                outlined
                clearable
                dense
            ></v-select>
          </v-col>
          <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              class="py-1"
              v-if="hasFilter('paymentType')"
          >
            <v-select
                hide-details="auto"
                :items="PaymentTypes"
                :loading="loading"
                v-model="filter.paymenType"
                item-text="name"
                item-value="id"
                label="Payment type"
                outlined
                clearable
                dense
            ></v-select>
          </v-col>
          <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              class="py-1"
              v-if="hasFilter('paymentStatus')"
          >
            <v-select
                hide-details="auto"
                :items="PaymentStatus"
                :loading="loading"
                v-model="filter.paymentStatus"
                item-text="name"
                item-value="id"
                label="Payment Status"
                outlined
                clearable
                dense
            ></v-select>
          </v-col>
          <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              class="py-1"
              v-if="hasFilter('purchaseStatus')"
          >
            <v-select
                hide-details="auto"
                :items="PaymentStatus"
                :loading="loading"
                v-model="filter.purchaseStatus"
                item-text="name"
                item-value="id"
                label="Status"
                outlined
                clearable
                dense
            ></v-select>
          </v-col>
          <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              class="py-1"
              v-if="hasFilter('transferStatus')"
          >
            <v-select
                hide-details="auto"
                :items="PaymentStatus"
                :loading="loading"
                v-model="filter.transferStatus"
                item-text="name"
                item-value="id"
                label="Transfer Status"
                outlined
                clearable
                dense
            ></v-select>
          </v-col>
          <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              class="py-1"
              v-if="hasFilter('cheqStatus')"
          >
            <v-select
                hide-details="auto"
                :items="ChecqStatus"
                :loading="loading"
                v-model="filter.cheqStatus"
                item-text="name"
                item-value="id"
                label="Cheque Status"
                outlined
                clearable
                dense
            ></v-select>
          </v-col>
          <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              class="py-1"
              v-if="hasFilter('saleType')"
          >
            <v-select
                hide-details="auto"
                :items="SaleTypes"
                :loading="loading"
                v-model="filter.saleType"
                item-text="name"
                item-value="id"
                label=" Sale Type"
                outlined
                clearable
                dense
            ></v-select>
          </v-col>
          <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              class="py-1"
              v-if="hasFilter('purchaseOrderStatus')"
          >
            <v-select
                hide-details="auto"
                :items="orderStatus"
                :loading="loading"
                v-model="filter.purchaseOrderStatus"
                item-text="name"
                item-value="id"
                label=" Status"
                outlined
                clearable
                dense
            ></v-select>
          </v-col>

          <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              class="py-1"
              v-if="hasFilter('type')"
          >
            <v-select
                hide-details="auto"
                :items="paymentFrom"
                :loading="loading"
                v-model="filter.type"
                item-text="name"
                item-value="id"
                label="Payment From"
                outlined
                clearable
                dense
            ></v-select>
          </v-col>
          <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              class="py-1"
              v-if="hasFilter('expenseFor')"
          >
            <v-select
                hide-details="auto"
                :items="ExpenseFor"
                :loading="loading"
                v-model="filter.expenseFor"
                item-text="name"
                item-value="id"
                label="Expense From"
                outlined
                clearable
                dense
            ></v-select>
          </v-col>


             <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              class="py-1"
              v-if="hasFilter('incomeFor')"
          >
            <v-select
                hide-details="auto"
                :items="IncomeFor"
                :loading="loading"
                v-model="filter.incomeFor"
                item-text="name"
                item-value="id"
                label="Income From"
                outlined
                clearable
                dense
            ></v-select>
          </v-col>
          <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              class="py-1"
              v-if="hasFilter('damage')"
          >
            <DamageFilter
                v-model="filter.damage"
                :clear="clearFilter"
            ></DamageFilter>
          </v-col>
          <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              class="py-1"
              v-if="hasFilter('stock')"
          >
            <stock-count-filter
                v-model="filter.stock"
                :clear="clearFilter"
            ></stock-count-filter>
          </v-col>

          <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              class="py-1"
              v-if="hasFilter('total')"
          >
            <TotalFilter
                v-model="filter.amount"
                :clear="clearFilter"
            ></TotalFilter>
          </v-col>

          <!-- <v-col class="py-2 px-0 clear-lg" v-if="visibleClearBtn">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  @click="clearFilter1"
                  class="icon_small"
                  v-bind="attrs"
                  v-on="on"
                  >mdi-close</v-icon
                >
              </template>
              <span>Clear Filters</span>
            </v-tooltip>
          </v-col> -->
          <v-col
              cols="12"
              sm="12"
              md="6"
              class="py-1 clear-sm"
              v-if="false"
          >
            <v-btn
                depressed
                block
                small
                height="30"
                class="ma-auto text-white bg-white w-100 ma-0 filter"
                v-bind="attrs"
                v-on="on"
                @click="clearFilter1"
            >Clear Filters</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="3">
        <v-row>
          <v-col
              cols="12"
              sm="12"
              md="6"
              lg="12"
              class="py-1 p-1"
              v-if="hasFilter('search')"
          >
            <v-text-field
                hide-details="auto"
                v-model="filter.search"
                dense
                outlined
                clearable
                placeholder="Search"
                append-icon="mdi-magnify"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="12" md="6" lg="6" class="px-3 py-1" v-if="columns">
            <TableHeaderFilter :columns="columns" />
          </v-col>
          <v-col
              cols="12"
              sm="12"
              md="6"
              lg="6"
              class="py-1"
          >
            <v-btn
                depressed
                block
                small
                height="30"
                class="ma-auto text-white bg-white w-100 ma-0 filter"
                v-bind="attrs"
                v-on="on"
                @click="clearFilter1"
            >Clear</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-if="hasvisible('visible')">
      <v-col cols="12" sm="12" md="12" lg="12">
        <v-row >
          <permission-control permissionName="Product Report Index">

            <v-col
                cols="12"
                sm="12"
                md="8"
                lg="12"
                class="px-3 py-1"
                v-if="hasExport('productexport')"
            >
              <ProductExport @emit="emit" :filter="filter" />
            </v-col>

          </permission-control>
          <permission-control permissionName="Purchase Report Index">
            <v-col
                cols="12"
                sm="12"
                md="6"
                lg="12"
                class="px-3 py-1"
                v-if="hasExport('purchaseexport')"
            >
              <PurchaseExport @emit="emit" :filter="filter" />
            </v-col>
          </permission-control>

          <permission-control permissionName="PurchaseOrder Report Index">
            <v-col
                cols="12"
                sm="12"
                md="6"
                lg="12"
                class="px-3 py-1"
                v-if="hasExport('purchaseorderexport')"
            >
              <PurchaseOrderExport  @emit="emit" :filter="filter" />
            </v-col>
          </permission-control>
          <permission-control permissionName="PurchaseReturn Report Index">
            <v-col
                cols="12"
                sm="12"
                md="6"
                lg="12"
                class="px-3 py-1"
                v-if="hasExport('purchasereturnexport')"
            >
              <PurchaseReturnExport  @emit="emit" :filter="filter" />
            </v-col>
          </permission-control>
          <permission-control permissionName="Sales Report Index">
            <v-col
                cols="12"
                sm="12"
                md="6"
                lg="12"
                class="px-3 py-1"
                v-if="hasExport('salesexport')"
            >
              <SalesExport  @emit="emit" :filter="filter" />
            </v-col>
          </permission-control>

          <permission-control permissionName="Stocks Report Index">
            <v-col
                cols="12"
                sm="12"
                md="6"
                lg="12"
                class="px-3 py-1"
                v-if="hasExport('outofstockexport')"
            >
              <OutofStockExport  @emit="emit" :filter="filter" />
            </v-col>
          </permission-control>
          <permission-control permissionName="Stocks Report Index">
            <v-col
                cols="12"
                sm="12"
                md="6"
                lg="12"
                class="px-3 py-1"
                v-if="hasExport('lowstockexport')"
            >
              <LowStockExport  @emit="emit" :filter="filter" />
            </v-col>
          </permission-control>
        </v-row>
      </v-col>
    </v-row>

  </v-container>
</template>
<script>
import SupplierAutoComplete from "@/components/base/SupplierAutoComplete";
import ExpenseCategoryAutoComplete from "@/components/base/ExpenseCategoryAutoComplete";
import IncomeCategoryAutoComplete from "@/components/base/IncomeCategoryAutoComplete";
import BrandAutoComplete from "@/components/base/BrandAutoComplete";
import CategoryAutoComplete from "@/components/base/CategoryAutoComplete";
import StatusAutoComplete from "@/components/base/StatusAutoComplete";
import DateRangeFilter from "@/components/base/DateRangeFilter";
import TotalFilter from "@/components/base/TotalFilter";
import StockCountFilter from "@/components/base/StockCountFilter";
import DamageFilter from "@/components/base/DamageFilter";
import ProductAutoCompleteComponent from "@/components/base/ProductAutoCompleteComponent";
import WareHouseAutoComplete from "@/components/base/WareHouseAutoComplete";
import CustomerAutoComplete from "@/components/base/CustomerAutoComplete";
import BillerAutoComplete from "@/components/base/BillerAutoComplete";
import ShopAutoComplete from "@/components/base/ShopAutoComplete";
export default {
  components: {
    WareHouseAutoComplete,
    ProductAutoCompleteComponent,
    SupplierAutoComplete,
    BrandAutoComplete,
    CategoryAutoComplete,
    StatusAutoComplete,
    DateRangeFilter,
    TotalFilter,
    DamageFilter,
    StockCountFilter,
    CustomerAutoComplete,
    BillerAutoComplete,
    ShopAutoComplete,
    ExpenseCategoryAutoComplete,IncomeCategoryAutoComplete
  },
  props: {
    output:{
      type:Array,
      default:{},
    },
    columns: {
      type: Array,
      default: [],
    },
    filters: {
      type: Array,
      default: [],
    },
    clear: {
      type: Boolean,
      default: false,
    },
    export: {
      type: Array,
      default: [],
    },
    visible:{
      type: Array,
      default: [],
    },
    products1: {
      type: Array,
      default: [],
    },
    PurchaseList: {
      type: Object,
      default: false,
    },
    PurchaseOrderList: {
      type: Object,
      default: false,
    },
    stocks: {
      type: Object,
      default: false,
    },
    PurchaseReturnList: {
      type: Object,
      default: false,
    },
    salesList: {
      type: Object,
      default: false,
    },
  },
  data: () => ({
    filter: {
      category: "",
      search: "",
      brand: "",
      paymenType:"",
      type:"",
      status: "",
      start: "",
      end: "",
      product: "",
      amount: "",
      damage: "",
      saleType:"",
      paymentStatus:"",
      transferStatus:"",
      warehouse: "",
      shop:"",
      biller:"",
      purchaseStatus:"",
      customertype:"",
      cheqStatus:"",
      customerGroup:"",
      purchaseOrderStatus:"",
      expenseFor:"",
      incomeFor:"",
      expenseCategory:""
    },
    ChecqStatus:[
      {
        "id":"Pending",
        "name":"Pending"
      },
      {
        "id":"Completed",
        "name":"Completed"
      },
      {
        "id":"Canceled",
        "name":"Cancelled"
      },
      {
        "id":"Bounced",
        "name":"Bounced"
      },
    ],
    PaymentStatus:[
      {
        "id":"Pending",
        "name":"Pending"
      },
      {
        "id":"Completed",
        "name":"Completed"
      },
      {
        "id":"Canceled",
        "name":"Cancelled"
      },
    ],
    orderStatus:[
      {
        "id":"Pending",
        "name":"Pending"
      },
      {
        "id":"Received",
        "name":"Received"
      },
      {
        "id":"Canceled",
        "name":"Cancelled"
      },
    ],
    paymentFrom:[
      {
        "id":"purchase",
        "name":"purchase",

      },
      {
        "id":"sale",
        "name":"sales",

      }
    ],
    ExpenseFor:[
      {
        "id":"warehouse",
        "name":"Warehouse",

      },
      {
        "id":"shop",
        "name":"Shop",

      }
    ],
    IncomeFor:[
      {
        "id":"warehouse",
        "name":"Warehouse",

      },
      {
        "id":"shop",
        "name":"Shop",

      }
    ],
    PaymentTypes:[
      {
        "id":"Cash",
        "name":"Cash"
      },
      {
        "id":"Card",
        "name":"Card"

      },
      {
        "id":"Cheque",
        "name":"Cheque"

      }
    ],
    CustomerTypes:[
      {
        "id":"1",
        "name":"Credit"
      },
      {
        "id": "2",
        "name": "Common"
      }
    ],
    SaleTypes:[
      {
        "id":"cash",
        "name":"Cash"
      },
      {
        "id": "credit",
        "name": "Credit"
      },

    ],
    CustomerGroups:[
      {
        "id":"1",
        "name":"Walk-in Customer"
      },
      {
        "id": "2",
        "name": "Distributor"
      },

    ],
    clearFilter: false,
    visibleClearBtn: false,
  }),
  methods: {
    emit(data){
      this.$emit('output',data)
    },
    emitFilter() {
      let temFilter = {};
      Object.keys(this.filter).forEach((key) => {
        if (this.filter[key] != null && this.filter[key] != "") {
          temFilter[key] = this.filter[key];
        }
      });
      this.$emit("input", temFilter);
    },
    clearFilter1() {
      this.clearFilter = !this.clearFilter;
      this.filter = {
        category: "",
        search: "",
        brand: "",
        paymenType:"",
        type:"",
        status: "",
        start: "",
        end: "",
        product: "",
        amount: "",
        damage: "",
        paymentStatus:"",
        transferStatus:"",
        warehouse: "",
        shop:"",
        saleType:"",
        biller:"",
        purchaseStatus:"",
        customertype:"",
        purchaseOrderStatus:"",
        customerGroup:"",
        cheqStatus:"",
        expenseFor:"",
          incomeFor:"",
        expenseCategory:""
      };
    },
    startChange(value) {
      this.filter.start = value;
    },
    endChange(value) {
      this.filter.end = value;
    },
    hasFilter: function (value) {
      return this.filters.indexOf(value) > -1 ? true : false;
    },
    hasExport: function (value) {
      return this.export.indexOf(value) > -1 ? true : false;
    },
    hasvisible:function(value){
      return this.visible.indexOf(value) > -1 ? true : false;
    }
  },
  watch: {
    filter: {
      handler(val) {
        this.emitFilter();
      },
      deep: true,
    },
  },
  created() {
    if (this.filters.length < 2) {
      this.visibleClearBtn = false;
    } else {
      this.visibleClearBtn = true;
    }
  },
};
</script>
<style>
.table-filter {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
.clear-sm {
  display: none;
  visibility: hidden;
}
@media only screen and (max-width: 1263px) {
  .clear-lg {
    display: none;
    visibility: hidden;
  }
  .clear-sm {
    display: block;
    visibility: visible;
  }
}
</style>

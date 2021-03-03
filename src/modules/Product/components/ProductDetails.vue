<template>
  <div>
    <PageTitle
      title="Product View"
      :backBtn="true"
      :editRoute="'/product/edit/' + Product.id"
      :permission="'Product Edit'"
    />
    <v-container fluid class="lighten-12 container">
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="12" lg="12">
          <v-card class="lighten-12 card-content">
            <v-card-title>Product</v-card-title>
            <v-container fluid class="light gray lighten-12">
              <ValidationObserver ref="observer">
                <form>
                  <v-row>
                    <template v-if="messages">
                      <v-alert
                        v-for="msg in messages"
                        :key="msg"
                        class="messages"
                        dense
                        outlined
                        type="error"
                        >{{ msg }}
                      </v-alert>
                    </template>
                  </v-row>
                  <v-row class="category-detail" align="center">
                    <v-col cols="12 d-flex justify-center pb-6" sm="6" md="6">
                      <img
                        v-if="Product.image"
                        height="300"
                        width="300"
                        :src="Product.image"
                      />
                      <img
                        v-else
                        src="../../../assets/noimageavailable.png"
                        height="400"
                        width="50%"
                        class="rounded"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      xs="12"
                      sm="6"
                      md="6"
                      lg="6"
                      align="center"
                    >
                      <div id="qr-code">
                        <VueQrcode
                          :value="getQrData(Product)"
                          :options="{ width: 170, Type: Product }"
                        />
                      </div>
                      <div class="qr-overlay"></div>
                      <v-btn v-print="printQr" class="qr-button"
                        >Print
                        <v-icon right dark> mdi-printer </v-icon>
                      </v-btn></v-col
                    >
                  </v-row>
                  <v-divider></v-divider>
                  <v-row>
                    <v-col cols="12" sm="12" md="12" lg="6">
                      <v-row class="d-flex justify-center">
                        <v-col>
                            <v-row align="center">
                            <v-col cols="6" sm="6" md="6" lg="6">
                              <h4>Reference no</h4></v-col
                            >
                            <v-col cols="6" sm="6" md="6" lg="6">
                              <v-chip label>{{
                                Product.reference_number
                              }}</v-chip></v-col
                            >
                          </v-row>
                          <v-row align="center">
                            <v-col cols="6" sm="6" md="6" lg="6"
                              ><h4>Name</h4></v-col
                            >
                            <v-col cols="6" sm="6" md="6" lg="6">
                              <v-chip label>{{ Product.name }}</v-chip></v-col
                            >
                          </v-row>
                        
                          <v-row align="center">
                            <v-col cols="6" sm="6" md="6" lg="6">
                              <h4>Code</h4></v-col
                            >
                            <v-col cols="6" sm="6" md="6" lg="6">
                              <v-chip label>{{ Product.code }}</v-chip></v-col
                            >
                          </v-row>
                          <v-row align="center">
                            <v-col cols="6" sm="6" md="6" lg="6"
                              ><h4>Category</h4></v-col
                            >
                            <v-col cols="6" sm="6" md="6" lg="6">
                              <v-chip label>{{
                                Product.category.name
                              }}</v-chip></v-col
                            >
                          </v-row>
                          <v-row align="center">
                            <v-col cols="6" sm="6" md="6" lg="6"
                              ><h4>Brand</h4></v-col
                            >
                            <v-col cols="6" sm="6" md="6" lg="6">
                              <v-chip label>{{
                                Product.brand.name
                              }}</v-chip></v-col
                            >
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" lg="6">
                      <v-card class="lighten-12 card-content">
                        <v-card-title>Units</v-card-title>
                        <v-container
                          fluid
                          class="light gray lighten-12 px-0 py-0"
                        >
                          <v-expansion-panels>
                            <v-expansion-panel
                              v-for="unit in Product.units"
                              :key="unit.index"
                            >
                              <v-expansion-panel-header
                                class="px-5 d-flex justify-start"
                                color="white"
                              >
                                <v-row>
                                  <v-col cols="6">
                                    <strong class="mx-2">
                                      {{ unit.name }}
                                      {{
                                        Product.defaultUnit.id == unit.id
                                          ? "( Default unit )"
                                          : ""
                                      }}</strong
                                    > </v-col
                                  ><v-col cols="6" class="d-flex justify-end">
                                    <span
                                      :class="
                                        unit.product_units.is_purchasing_unit ==
                                        true
                                          ? 'purchasing-unit'
                                          : 'selling-unit'
                                      "
                                    >
                                      {{
                                        unit.product_units.is_purchasing_unit ==
                                        true
                                          ? "Purchasing and selling  unit"
                                          : "Selling  unit"
                                      }}</span
                                    ></v-col
                                  >
                                </v-row>
                              </v-expansion-panel-header>
                              <v-expansion-panel-content 
                                v-if="Product.defaultUnit.id != unit.id"
                              >
                                <v-row class="theme">
                                  <v-col cols="12" sm="12" md="3" lg="4"><strong class="mx-2">{{ unit.name }}</strong></v-col>
                                 <v-col cols="12" sm="12" md="3" lg="4">  {{ unit.product_units.conversionOperator.symbol }}
                                  {{ unit.product_units .conversion_value}}
                                  equal to</v-col>
                                   <v-col cols="12" sm="12" md="3" lg="4"><strong class="mx-2">{{
                                    Product.defaultUnit.name
                                  }}</strong></v-col>
                                </v-row>
                                <v-divider></v-divider>
                                <v-row class="theme">
                                   <v-col cols="12" sm="12" md="3" lg="4">
                                  <strong class="mx-2">{{
                                    Product.defaultUnit.name
                                  }}</strong></v-col>
                                   <v-col cols="12" sm="12" md="3" lg="4">
                                  {{ unit.product_units.reverseConversionOperator.symbol }}
                                  {{ unit.product_units.reverse_conversion_value }} equal to</v-col>
                                <v-col cols="12" sm="12" md="3" lg="4">   <strong class="mx-2">{{ unit.name }}</strong></v-col>
                                </v-row>
                              </v-expansion-panel-content>
                            </v-expansion-panel>
                          </v-expansion-panels>
                        </v-container>
                      </v-card>
                    </v-col>
                  </v-row>
                </form>
              </ValidationObserver>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="4" v-if="false">
          <v-card class="lighten-12 card-content" height="100%">
            <v-card-title>QR Code</v-card-title>
            <v-container
              fluid
              class="light gray lighten-12 px-0 py-0 d-flex justify-center"
            >
              <v-row height="100%">
                <v-col cols="12" align="center" height="100%">
                  <div id="qr-code">
                    <VueQrcode
                      :value="getQrData(Product)"
                      :options="{ width: 170, Type: Product }"
                    />
                  </div>
                  <div class="qr-overlay"></div>
                  <v-btn v-print="printQr" class="qr-button"
                    >Print</v-btn
                  ></v-col
                >
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="false">
        <v-col cols="8">
          <v-card class="lighten-12 card-content">
            <v-card-title>Units</v-card-title>
            <v-container fluid class="light gray lighten-12 px-0 py-0">
              <v-expansion-panels>
                <v-expansion-panel
                  v-for="unit in Product.units"
                  :key="unit.index"
                >
                  <v-expansion-panel-header
                    class="px-5 d-flex justify-start"
                    color="white"
                  >
                    <strong class="mx-2"> {{ unit.name }}</strong>
                    {{
                      Product.defaultUnit.id == unit.id
                        ? "( Default unit )"
                        : ""
                    }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content
                    v-if="Product.defaultUnit.id != unit.id"
                  >
                    <v-row>
                      1 <strong class="mx-2">{{ unit.name }}</strong>
                      {{ unit.conversionOperator }}
                      {{ unit.conversionValue }} equal to 1
                      <strong class="mx-2">{{
                        Product.defaultUnit.name
                      }}</strong>
                    </v-row>
                    <v-row>
                      1
                      <strong class="mx-2">{{
                        Product.defaultUnit.name
                      }}</strong>
                      {{ unit.reverseConversionOperator }}
                      {{ unit.reverseConversionValue }} equal to 1
                      <strong class="mx-2">{{ unit.name }}</strong>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12" class="pa-3">
          <v-card class>
            <v-tabs v-model="tab" background-color="primary" dark>
              <v-tabs-slider></v-tabs-slider>
              <v-tab v-for="item in items" :key="item.tab">
                {{ item.tab }}
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
              <v-tab-item v-for="item in items" :key="item.tab">
                <ProductBatchComponent
                  :module="'products'"
                  :id="Product.id"
                  v-if="item.tab === 'Batch'"
                />
                <ProductSupplier
                  :module="'products'"
                  :id="Product.id"
                  v-if="item.tab == 'Supplier'"
                />
                <PurchaseList
                  v-if="item.tab === 'Purchase'"
                  :module="'products'"
                  :id="Product.id"
                >
                </PurchaseList>
                <purchase-order-list
                  v-if="item.tab === 'Purchase Order'"
                  :module="'products'"
                  :id="Product.id"
                ></purchase-order-list>
                <PurchaseReturnList
                  v-if="item.tab === 'Purchase Return'"
                  :module="'products'"
                  :id="Product.id"
                ></PurchaseReturnList>
                <ProductSale v-if="item.tab === 'Sales'"
                  :module="'products'"
                  :id="Product.id">
                </ProductSale>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
      </v-row>
      <BatchForm
        ref="batchForm"
        @conform="refreshBatches($event)"
        :visible="showScheduleForm"
        :productUnits="productUnits"
        :productbatch="productBatch"
        :product="productDetails"
      />
    </v-container>
  </div>
</template>
<script>
import { required, email, max } from "vee-validate/dist/rules";
import paginationComponent from "../../shared/components/pagination.vue";
import { Product } from "../../../models/Product";
import { ProductEntity } from "../../../models/EntityModels/ProductEntity";
import ProductBatchComponent from "./ProductBatchComponent";
import BatchView from "./ProductBatchView";
import BatchForm from "./ProductBatchModal";
import { ProductBatch } from "../../../models/ProductBatch";
import { ProductViewModel } from "../../../models/View Models/ProductViewModel";
import { SupplierListViewModel } from "@/models/View Models/Supplier";
import _ from "lodash";
import moment from "moment";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import PurchaseOrderList from "./ProductPurchaseOrderList.vue";
import PurchaseList from "./ProductPurchaseList.vue";
import PurchaseReturnList from "./ProductPurchaseReturnList.vue";
import VueQrcode from "@chenfengyuan/vue-qrcode";
import ProductBatchViewModal from "@/modules/Product/components/ProductBatchView";
import ProductSupplier from "./ProductSupplierComponent";
import ProductSale from "./ProductSaleList";
setInteractionMode("eager");
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
    ValidationProvider,
    ValidationObserver,
    ProductBatchComponent,
    BatchForm,
    Treeselect,
    BatchView,
    paginationComponent,
    PurchaseOrderList,
    PurchaseList,
    PurchaseReturnList,
    VueQrcode,
    ProductSupplier,
    ProductSale
  },
  data: () => ({
    purchaseTab: new PurchaseTabViewModel(),
    searchPurchaseTabSuppliers: null,
    searchSuppliers: null,
    purchaseOrderTab: new PurchaseOrderTabViewModel(),
    purchaseReturnTab: new PurchaseReturnTabViewModel(),
    productDetails: [],
    selectedSuppliers: [],
    productUnits: [],
    items: [
      { tab: "Batch", content: "this is credit tab" },
      { tab: "Supplier", content: "" },
      { tab: "Purchase", content: "" },
      { tab: "Purchase Order", content: "" },
      { tab: "Purchase Return", content: "" },
       { tab: "Sales", content: "" },
    ],
    tab: "Credit",
    Product: new Product(),
    errors: [],
    messages: [],
    showScheduleForm: false,
    supplierHeaders: [
      { text: "Reference No", value: "reference_number",width:"33%"},
      { text: "Name", value: "name",width:"33%" },
      { text: "Email Address", value: "phone" },
      { text: "Phone", value: "email" },
      { text: "", value: "action",width:"33%" },
    ],
    filter: {
      search: "",
      reference_number: "",
      start: "",
      end: "",
      status: "",
    },
    ProductBatches: [],
    ProductSuppliers: [],
    ProductPurchase: [],
    ProductPurchaseOrder: [],
    ProductPurchaseReturn: [],
    productBatch: new ProductBatch(),
  }),
  created() {
    this.GetProductDetails();
    this.GetSuppliers();
  },
  computed: {
    printQr() {
      return {
        id: "qr-code",
        popTitle: this.Product.name,
      };
    },
  },
  methods: {
    getQrData(product) {
      var data = {
        id: product.id,
        Reference_Number: product.reference_number,
        Name: Product.name,
        Code: Product.code,
      };
      return JSON.stringify(data);
    },
    print() {
      this.$htmlToPaper("qr-code");
    },
    refreshData() {
      if (this.$refs.pagination) {
        this.$refs.pagination.forEach((item) => {
          item.refreshData();
        });
      }
    },
    // Batch Data Received from pagination component emit function
    receiveBatchResponse(batchData) {
      this.ProductBatches = batchData;
    },
    receivePurchaseResponse(PurchaseData) {
      this.purchaseTab.purchases = PurchaseData;
    },
    GetProductDetails() {
      let productId = this.$route.params.id;
      this.$store
        .dispatch("product/GetProductById", productId)
        .then((res) => {
          this.Product = res.data;
          this.productDetails = new ProductViewModel(res.data);
          if(this.productDetails.image)
          {
this.productDetails.image=this.productDetails.image+'?t='+Date.now()
          }
            
          this.productDetails.suppliers.forEach((supplier) => {
            this.selectedSuppliers.push(supplier.id);
          });
          this.productUnits = this.productDetails.units;
        })
        .catch((err) => {
          this.messages.push(err.data.title);
        });
    },
    async submit() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.AddProduct();
      }
    },
    getStatusColor(status) {
      return status == true ? "gray" : "green";
    },
    startDate(date) {
      return moment(date, "YYYY-MM-DD").format("DD/MM/YYYY");
    },
    OpenModal() {
      this.productBatch = new ProductBatch();
      this.$refs.batchForm.openModal();
    },
    viewBatch(batch) {
      const id = this.$route.params.id;
      this.$router.push(`${id}/batch/${batch.id}`);
    },
    GetSuppliers(query = "") {
      this.$store
        .dispatch("supplier/GetSupplierSearch", {
          filters: {
            searchText: "",
          },
        })
        .then((res) => {
          this.suppliers = res.map((u, i, arr) => {
            u.index = i + 1;
            return new SupplierListViewModel(u);
          });
          console.log("this.supplier-----------");
          console.log(this.supplier);
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.messages = err.data.title;
        });
    },
    GetPurchaseTabSuppliers(value) {
      this.$store
        .dispatch("supplier/FetchAllSuppliers", {
          filters: {
            searchText: value,
            roles: [1, 2],
          },
        })
        .then((res) => {
          this.purchaseTab.filter.supplier.items = res.data.data.map(
            (u, i, arr) => {
              u.index = i + 1;
              return new SupplierListViewModel(u);
            }
          );
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.messages = err.data.title;
        });
    },
    selectSuppliers() {
      (this.selectedSuppliers = []),
        this.Product.suppliers.forEach((supplier) => {
          this.selectedSuppliers.push(
            this.suppliers.find((item) => item.id === supplier)
          );
        });
    },
    refreshBatches($event) {
      this.GetProductDetails();
    },
    editBatch(batch) {
      this.productBatch = _.cloneDeep(batch);
      this.productUnits = batch.unitPriceDetails;
      this.productBatch.isAdd = false;
      this.$refs.batchForm.openModal();
    },
    EditProduct() {
      const credentials = this.productDetails;
      credentials.Id = this.$route.params.id;
      credentials.suppliers = this.selectedSuppliers;
      this.$store
        .dispatch("product/EditProduct", credentials)
        .then((res) => {
          this.succeeed = true;
          this.$toast.success("Product edited  successfully");
          this.$router.push("/product");
        })
        .catch((err) => {
          this.messages.push(err.data.title);
          this.$toast.error("Edit product failed");
        });
    },
  },
  watch: {
    searchPurchaseTabSuppliers(value) {
      if (!value) {
        return;
      }
      this.GetPurchaseTabSuppliers(value);
    },
    searchSuppliers(value) {
      if (!value) {
        return;
      }
      this.GetSuppliers(value);
    },
  },
};
export class PurchaseTabViewModel {
  constructor() {
    this.filter = new PurchaseTabFilters();
    this.headers = [
      { text: "Invoice Reference", value: "reference_number" },
      { text: "Date", value: "date" },
      { text: "Ware House", value: "wareHouse.name" },
      { text: "Total", value: "total" },
      { text: "Balance", value: "balance" },
      { text: "Paid", value: "paid" },
      {
        text: "Status",
        value: "is_active",
        align: "center",
        width: "10%",
      },
      { text: "", value: "action" },
    ];
    this.purchases = [];
  }
}
export class PurchaseOrderTabViewModel {
  constructor() {
    this.filter = new PurchaseTabFilters();
    this.headers = [
      { text: "Invoice Reference", value: "purchaseOrder.reference_number" },
      { text: "Date", value: "purchaseOrder.date" },
      { text: "Ware House", value: "purchaseOrder.wareHouse.name" },
      {
        text: "Status",
        value: "purchaseOrder.status",
        align: "center",
        width: "10%",
      },
      {
        text: "Actions",
        value: "action",
        sortable: false,
        align: "center",
        width: "10%",
      },
    ];
    this.purchaseOrders = [];
  }
}
export class PurchaseReturnTabViewModel {
  constructor() {
    this.filter = new PurchaseTabFilters();
    this.headers = [
      { text: "Invoice Reference", value: "purchaseReturn.reference_number" },
      { text: "Date", value: "purchaseReturn.date" },
      { text: "Amount", value: "purchaseReturn.amount" },
      { text: "Return Surcharge", value: "purchaseReturn.return_surcharge" },
      { text: "Status", value: "purchaseReturn.status" },
      {
        text: "Actions",
        value: "action",
        sortable: false,
        align: "center",
        width: "10%",
      },
    ];
  }
}
export class PurchaseTabFilters {
  constructor() {
    this.supplier = new Filter();
    this.searchText = "";
    this.total = "";
    this.dateRangePicker = new DateRangePicker();
  }
}
export class Filter {
  constructor() {
    this.items = [];
    this.selectedItem = 0;
  }
}
export class DateRangePicker {
  constructor() {
    this.range = [];
    this.text = 0;
    this.start = "";
    this.end = "";
  }
}
</script>
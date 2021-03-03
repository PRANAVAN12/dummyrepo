<template>
  <div>
    <PageTitle
      title="Edit Purchase "
      :backBtn="true"
      :showLoading="isLoading"
    />
    <v-container class="lighten-12 container" fluid>
      <v-col cols="12" sm="12" md="12" lg="12" class="pa-0">
        <ValidationObserver ref="observer">
          <v-card class="lighten-12">
            <v-card-title>General</v-card-title>
            <v-container fluid>

              <v-row>
                <v-col class="pl-4" cols="6" sm="12" md="4" lg="4">
                  <h4>Reference Number :</h4> </v-col
                ><v-col cols="6" sm="12" md="8" lg="8">
                  {{ Purchase.referenceNumber }}
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pl-4" cols="6" sm="12" md="4" lg="4">
                  <h4>Purchase Type :</h4></v-col
                ><v-col cols="6" sm="12" md="8" lg="8">
                  {{ Purchase.type }}
                </v-col>
              </v-row>

              <v-container fluid>
                <v-row
                  v-if="
                    Purchase.purchase_order_id ||
                    Purchase.isWithoutPurchaseOrder
                  "
                >
                  <v-col cols="12" sm="12" md="12" lg="4">
                    <ValidationProvider
                      name="Reference Number"
                      rules="required"
                    >
                      <v-autocomplete
                        slot-scope="{ errors }"
                        v-model="Purchase.wareHouse_id"
                        item-text="name"
                        outlined
                        dense
                        disabled
                        item-value="id"
                        :search-input.sync="searchWarehouse"
                        :loading="warehouseLoading"
                        :items="warehouses"
                        :error-messages="errors"
                        label="Warehouse"
                        required
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" lg="4">
                    <ValidationProvider>
                      <v-autocomplete
                        v-model="Purchase.supplier_id"
                        item-text="name"
                        item-value="id"
                        :items="suppliers"
                        :search-input.sync="searchSupplier"
                        :loading="projectsLoading"
                        outlined
                        dense
                        disabled
                        :error-messages="errors"
                        label="Supplier"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>

                    <v-col cols="12" sm="12" md="12" lg="4">
                      <ValidationProvider
                          rules="required"
                          name="Datetime"
                          :disabled="Purchase.purchase_order_id"
                      >
                        <datePickComponent
                            hide-details="auto"
                            slot-scope="{ errors }"
                            v-model="Purchase.date"
                            labelname="Date"
                            :error-messages="errors"
                            :disabled="!(Purchase.type == 'None')"
                            required
                        />
                      </ValidationProvider>
                    </v-col>

                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                    lg="4"
                    v-if="!Purchase.isWithoutPurchaseOrder"
                  >
                    <ValidationProvider
                      rules="required"
                      v-slot="{ errors }"
                      name="Datetime"
                      :disabled="Purchase.purchase_order_id"
                    >
                      <datePickComponent
                        v-model="Purchase.date"
                        labelname="Date"
                        :disabled="!Purchase.purchase_order_id"
                      />
                    </ValidationProvider>
                  </v-col>
                </v-row>
              </v-container>
            </v-container>
          </v-card>

          <form>
            <v-row>
              <v-col cols="12" sm="12" md="12" lg="12">
                <v-card class="lighten-12">
                  <v-card-title>Products</v-card-title>
                  <v-container fluid>
                    <v-row v-if="isProductListValid != ''">
                      <v-col cols="4">
                        <v-flex
                          v-model="isProductListValid"
                          class="product-red"
                          >{{ isProductListValid }}</v-flex
                        >
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="12" md="12" lg="4">
                        <v-autocomplete
                          v-model="Purchase.product"
                          item-text="name"
                          item-value="product_id"
                          outlined
                          :loading="productSearchloading"
                          :search-input.sync="searchProduct"
                          dense
                          @input="GetBatchesForProducts(Purchase.product)"
                          :items="products"
                          :error-messages="productRequiredErrorMessage"
                          label="Please add product to purchase"
                        />
                      </v-col>
                      <v-col cols="10" sm="10" md="12" lg="4">
                        <v-autocomplete
                          v-model="Purchase.batch"
                          item-text="name"
                          outlined
                          dense
                          item-value="id"
                          :loading="batchLoading"
                          @input="RemoveValidation()"
                          :items="selectedProductBatches"
                          :search-input.sync="searchProductBatch"
                          :error-messages="batchRequiredErrorMessage"
                          label="Please add Batch of the product"
                        />
                      </v-col>
                      <v-col
                        cols="2"
                        sm="2"
                        md="12"
                        lg="2"
                        class="d-flex align-center px-0"
                      >
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon
                              class="icon_medium add-arrow-icon"
                              color="#13928e"
                              @click="AddProduct"
                              v-bind="attrs"
                              v-on="on"
                              >mdi-subdirectory-arrow-left</v-icon
                            >
                          </template>
                          <span>Add Product</span>
                        </v-tooltip>

                        <!-- <v-col
                        cols="9"
                        class="content-flex-end pa-0 mb-5"
                        v-if="Purchase.product != undefined"
                      >
                        <v-btn
                          color="dark  gray"
                          small
                          @click.stop="OpenModal()"
                          v-bind="attrs"
                          v-on="on"
                           class="pa-0"
                          >Add Batch</v-btn
                        >
                      </v-col> -->
                      </v-col>

                      <permission-control permissionName="Batch Create">
                        <v-col
                          cols="12"
                          xs="12"
                          sm="12"
                          md="1"
                          lg="2"
                          xl="2"
                          v-if="Purchase.product != null"
                          class="d-flex justify-content-end"
                        >
                          <v-btn
                            color="dark  gray"
                            class="text-white btn_blue w-100"
                            small
                            @click.stop="OpenModal()"
                            v-bind="attrs"
                            v-on="on"
                            >Add Batch</v-btn
                          >
                        </v-col>
                      </permission-control>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-data-table
                          :headers="headers"
                          :items="selectedProducts"
                          disable-pagination

                          hide-default-footer
                        >
                          <template
                              v-slot:item.damage="{ item }"
                              v-slot="{ errors }"
                              name="Damage"
                              rules="numeric"
                          >
                            <ValidationProvider>
                              <v-text-field
                                  @input="increaseInput(item)"
                                  @click="CalculateTotal()"
                                  v-model="item.damage"
                                  type="number"
                                  :error-messages="item.damageError"
                                  required
                                  dense
                                  class="pt-3"
                                  outlined
                                  min="0"
                              ></v-text-field>
                            </ValidationProvider>
                          </template>
                          <template
                              v-slot:item.discount="{ item }"
                              v-slot="{ errors }"
                              name="Discount"
                              rules="numeric"
                          >
                            <ValidationProvider>
                              <v-text-field
                                  @input="increaseInput(item)"
                                  @click="CalculateTotal()"
                                  v-model="item.discount"
                                  type="number"
                                  :error-messages="item.discountError"
                                  required
                                  dense
                                  class="pt-3"
                                  outlined
                                  min="0"
                                  :max="item.received"
                              ></v-text-field>
                            </ValidationProvider>
                          </template>
                          <template
                            v-slot:item.discountPercentage="{ item }"
                            v-slot="{ errors }"
                            name="Discount"
                            rules="numeric"
                          ><div class="percentage">
                            <ValidationProvider>
                              <v-text-field
                                  @input="increaseInput(item)"
                                  @click="CalculateTotal()"
                                  v-model="item.discountPercentage"
                                  append-icon="mdi-percent"
                                  type="number"
                                  :error-messages="item.discountPercentError"
                                  required
                                  dense
                                  class="pt-3"
                                  outlined
                                  min="0"
                                  :max="100"
                              ></v-text-field>
                            </ValidationProvider>
                            </div>
                          </template>

                          <template
                              v-slot:item.unit="{ item }"
                              v-slot="{ errors }"
                              name="Unit"
                          >
                            <ValidationProvider>
                              <v-autocomplete
                                  item-text="name"
                                  item-value="id"
                                  :items="item.units"
                                  v-model="item.unit.id"
                                  class="pt-3"
                                  outlined
                                  :error-messages="item.uniterror"
                                  dense
                                  @input="
                                GetSelectedUnitPriceDetails(item, item.unit)
                              "
                              ></v-autocomplete>
                            </ValidationProvider>
                            
                          </template>
                          <template v-slot:item.unitPrice="{ item }">
                            <strong class="px-4">  {{ item.unitPrice | formatCurrency }}</strong>
                          </template>
                          <template v-slot:item.discountAmount="{ item }">
                            <strong class="px-4">  {{ item.discountAmount | formatCurrency }}</strong>
                          </template>
                          <template v-slot:item.total="{ item }">
                            <!-- <ValidationProvider>
                            <v-text-field
                              v-model="item.total"
                              disabled
                              type="number"
                              :error-messages="errors"
                              required
                              dense
                              min="0"
                            ></v-text-field>
                          </ValidationProvider>-->
                            <strong class="px-4">  {{ item.total | formatCurrency }}</strong>
                          </template>
                          <template
                              v-slot:item.received="{ item }"
                              v-slot="{ errors }"
                              name="Received"
                              rules="numeric"
                          >
                            <ValidationProvider>
                              <v-text-field
                                  @input="increaseInput(item)"
                                  @click="CalculateTotal()"
                                  v-model="item.received"
                                  type="number"
                                  outlined
                                  :error-messages="item.receivedError"
                                  required
                                  dense
                                  min="0"
                                  class="pt-3"
                              ></v-text-field>
                            </ValidationProvider>
                          </template>

                          <template v-slot:item.action="{ item }">
                            <div class="space-around">
                              <div v-if="item.units.length > 1 && !item.disabled">
                                <v-tooltip bottom>
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        x-small
                                        color="black"
                                        v-bind="attrs"
                                        v-on="on"
                                        icon
                                        @click="dulpicateBatch(item)"
                                    >
                                      <v-icon>mdi-content-copy</v-icon>
                                    </v-btn>
                                  </template>
                                  <span>Duplicate Product</span>
                                </v-tooltip>
                              </div>
                              <div>
                                <v-btn
                                    x-small
                                    color="black"
                                    icon
                                    @click="removeProduct(item)"
                                >
                                  <v-icon>mdi-close-circle</v-icon>
                                </v-btn>
                              </div>
                            </div>
                          </template>

                          <template slot="body.append">
                            <tr
                                class="black--text"
                                v-if="selectedProducts.length > 0"
                            >
                              <th class="title"></th>
                              <th class="title"></th>
                              <th class="title"></th>

                              <th class="title"></th>
                              <th class="title"></th>
                              <th class="title"></th>
                              <th class="title"></th>
                              <th class="title"></th>
                              <th class="text-right">
                                <h3> {{
                                    Purchase.totalDiscountAmount | formatCurrency
                                  }}</h3>

                              </th>
                              <th class="text-right">
                                <h3>
                                  {{ selectedProductsTotal | formatCurrency }}</h3>
                              </th>
                              <th class="title"></th>
                            </tr>
                          </template>
                          <v-divider></v-divider>
                        </v-data-table>
                        <!-- <v-divider></v-divider> -->
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12"></v-col>
                    </v-row>
                    <v-row class="sub-section">
                      <v-col cols="4" >
                        <v-text-field
                          v-model="Purchase.discountAmount"
                          @input="onInputDiscountAmount()"
                          :error-messages="discountAmountErrorMessages"
                          :max="selectedProductsTotal -
          Purchase.totalDiscountAmount"
                          type="number"
                          dense
                          label="Discount Amount"
                          outlined
                          class="pt-3"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4"> </v-col>
                      <v-col cols="4" class="d-flex justify-end align-center ">
                        <strong class="mr-5"> Total Payable Amount : </strong>
                        <h3 class="title">
                          {{
                            (selectedProductsTotal -
                              Purchase.totalDiscountAmount -
                              Purchase.discountAmount)
                              | formatCurrency
                          }}
                        </h3>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </form>
          <!-- </ValidationObserver>
        </v-container>
      </v-card>-->

          <v-card class="lighten-12" v-if="false">
            <v-card-title>Discount</v-card-title>
            <v-container fluid>
              <v-row>
                <v-col cols="4">
                  <v-text-field
                    v-model="Purchase.discountAmount"
                    @input="
                      Purchase.discountPercentage = (
                        (Purchase.discountAmount / selectedProductsTotal) *
                        100
                      ).toFixed(2)
                    "
                    type="number"
                    dense
                    label="Discount Amount"
                    outlined
                    class="pt-3"
                  ></v-text-field>
                </v-col>
                <v-col cols="2"> Total Payable Amount: </v-col>
                <v-col cols="4">
                  {{
                    (selectedProductsTotal -
                      Purchase.totalDiscountAmount -
                      Purchase.discountAmount)
                      | formatCurrency
                  }}
                </v-col>
              </v-row>
            </v-container>
          </v-card>

          <v-row>
            <v-col cols="12">
              <v-card class="lighten-12">
                <v-card-title>Notes</v-card-title>
                <v-container fluid>
                  <v-row>
                    <v-col>
                      <v-textarea
                        rows="3"
                        outlined
                        v-model="Purchase.remark"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card class="lighten-12">
                <v-card-title>Files</v-card-title>
                <v-container fluid>
                  <v-row>
                    <v-col>
                      <FileUpload
                        :multiple="true"
                        size="2048"
                        icon="mdi-upload"
                        autoupload="true"
                        :url="
                          'document/upload/purchase/' + this.$route.params.id
                        "
                        :showDocumentView="true"
                        :documentsUrl="
                          'document/purchase/' + this.$route.params.id
                        "
                        downloadUrl="document/:id/download"
                        removeUrl="document/:id"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-spacer></v-spacer>
            <btn-cancel></btn-cancel>
            <v-btn
              depressed
              small
              class="text-white btn_blue btn_medium w-100"
              @click="submit"
              >Update</v-btn
            >
          </v-card-actions>
          <BatchForm
            :visible="showScheduleForm"
            @conform="refreshBatches($event)"
            ref="batchform"
            :productbatch="ProductBatches"
            :productUnits="productUnits"
            :product="selectedProduct"
            @close="AddBatch($event)"
          />

          <EditPaymentModel
            ref="PaymentEditModel"
            :creditAccounts="supplierCreditAccounts"
            :visible="showEditForm"
            :debitAccount="debitAccount"
            :payment="payment"
          />
        </ValidationObserver>
      </v-col>
    </v-container>
  </div>
</template>
<script>
import { Purchase } from "../../../models/Purchase";
import { required, email, max, numeric } from "vee-validate/dist/rules";
import { SupplierListViewModel } from "../../../models/View Models/Supplier";
import _ from "lodash";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import { ProductBatch } from "../../../models/ProductBatch";
import { Product } from "../../../models/Product";
import BatchForm from "../../Product/components/ProductBatchModal";
import PaymentComponent from "../../shared/components/PaymentComponent";
import datePickComponent from "../../../components/base/DateComponent";
import { ProductViewModel } from "../../../models/View Models/ProductViewModel";
import { PurchaseOrderViewModel } from "../../../models/View Models/PurchaseOrderViewModel";
import { PurchaseEntityModel } from "../../../models/EntityModels/Purchases/PurchaseEntityModel";
import { ProductBatchViewModel } from "../../../models/View Models/ProductBatchViewModel";
import { PurchaseViewModel } from "../../../models/View Models/PurchaseViewModel";
import { AccountViewModel } from "../../../models/View Models/AccountViewModel";
import EditPaymentModel from "@/modules/shared/modals/EditPaymentModel";
import { PaymentViewModel } from "../../../models/View Models/PaymentViewModel";
import AddPaymentModel from "@/modules/shared/modals/AddPaymentModel";

import FileUpload from "@/components/base/FileUpload";
extend("numeric", {
  ...numeric,
  message: "input must be numeric",
});
extend("required", {
  ...required,
  message: "{_field_} is required",
});
export default {
  data: () => ({
    selectedFiles: "",
    messages: [],
    showEditForm: false,
    payments: [],
    searchSupplier: null,
    searchWarehouse: null,
    isLoading: true,
    payment: [],
    errors: [],
    suppliers: [],
    warehouses: [],
    discountAmountErrorMessages:[],
    debitAccountsearch: [],
    searchProduct: null,
    warehouseLoading: false,
    productSearchloading: false,
    selectedProductsDiscountTotal: 0,
    batchLoading: false,
    productRequiredErrorMessage: [],
    debitAccount: [],
    productUnits: [],
    purchaseOrders: [],
    selectedPurchaseOrder: [],
    selectedProductBatches: [],
    searchProductBatch: [],
    selectedProducts: [],
    batchRequiredErrorMessage: [],
    purchaseproductClonedDetails: [],
    selectedProduct: "",
    Purchase: [],
    showScheduleForm: false,
    supplierCreditAccounts: [],
    ProductBatches: new ProductBatch(),
    products: [],
    isProductListValid: "",
    paymentHeaders: [
      { text: "Reference Number", value: "reference_number" },
      { text: "Supplier Name", value: "supplierName" },
      { text: "Amount", value: "amount" },
      { text: "Actions", value: "actions", align: "center", width: "15%" },
    ],
    headers: [
      {
        text: "Product name",
        value: "name",
        width: "10%",
        align: "left",
      },
      {
        text: "Batch",
        value: "batch.name",
        width: "8%",
        align: "left",
      },

      {
        text: "unit",
        value: "unit",
        width: "12%",
        align: "left",
      },
      {
        text: "Unit Cost",
        value: "unitPrice",
        align: "right",
        width: "8%",
      },

      {
        text: "Discount Percentage",
        value: "discountPercentage",
        align: "center",
        width: "14%",
      },
      {
        text: "Ordered Qty",
        value: "quantity",
        align: "center",
        width: "9%",
      },
      {
        text: "Received Qty",
        value: "received",
        align: "center",
        width: "9%",
      },
      {
        text: "Damage Qty",
        value: "damage",
        align: "center",
        width: "9%",
      },
      {
        text: "Discount Qty",
        value: "discount",
        align: "center",
        width: "9%",
      },
      {
        text: "Discount Amount",
        value: "discountAmount",
        align: "center",
        width: "12%",
      },
      {
        text: "Total",
        value: "total",
        align: "center",
        width: "5%",
      },
      {
        text: "",
        value: "action",
        align: "center",
        width: "6%",
      },
    ],
    selectedProductsTotal: false,
  }),
  components: {
    ValidationProvider,
    ValidationObserver,
    PaymentComponent,
    BatchForm,
    FileUpload,
    datePickComponent,
    AddPaymentModel,
    EditPaymentModel,
  },
  methods: {
    sumField(key) {
      this.selectedProductsTotal = this.selectedProducts.reduce(
        (a, b) => a + (b[key] || 0),
        0
      );
    },
    sumDiscountField(key) {
      this.Purchase.totalDiscountAmount = this.selectedProducts.reduce(
        (a, b) => a + (b[key] || 0),
        0
      );
    },
    RemoveValidation() {
      this.batchRequiredErrorMessage = [];
    },
    AddProduct() {
      if (this.Purchase.batch && this.Purchase.product) {
        let product = this.products.find(
          (item) => item.product_id === this.Purchase.product
        );
        product.batch = _.cloneDeep(
          this.selectedProductBatches.find((i) => this.Purchase.batch === i.id)
        );
        product.received = product.quantity;
        product.damage = 0;
        product.discountError = [];
        product.discountPercentError = [];
        product.discount = 0;
        product.discountPercentage = 0;
        (product.unitError = []), (this.productUnits = product.units);
        this.GetSelectedUnitPriceDetails(product, product.unit);

        product.disabled = false;
        product.id = 1;
        this.selectedProducts.unshift(_.cloneDeep(product));
        this.purchaseproductClonedDetails.unshift(_.cloneDeep(product));
        this.CalculateTotal();

        this.Purchase.batch = null;
        this.Purchase.product = null;
        this.selectedProductBatches = [];
        if (this.selectedProducts.length) {
          this.isProductListValid = "";
        }
      } else {
        if (!this.Purchase.product) {
          this.productRequiredErrorMessage.push("Choose Product");
        } else {
          this.batchRequiredErrorMessage.push("Choose Batch");
        }
      }
    },
    GetDebitPurchaseAccounts() {
      this.$store
        .dispatch("purchase/GetDebitAccounts", { accountType: "Purchase" })
        .then((res) => {
          this.debitAccount = res.data.data.map((u, i, arr) => {
            return new AccountViewModel(u);
          });
          Purchase.debit_account = this.debitAccount[0];
          this.Purchase.console.log("Payment modell iss", this.debitAccount);
        })
        .catch((err) => {
          this.messages = err.data.title;
        });
    },
    GetDebitAccountsearch() {
      this.$store
        .dispatch("purchase/GetDebitAccountsSearch", {
          accountType: "Purchase Expenses",
        })
        .then((res) => {
          this.debitAccountsearch = res.data.data.map((u, i, arr) => {
            return new AccountViewModel(u);
          });
        })
        .catch((err) => {
          this.messages = err.data.title;
        });
    },

    GetSupplierCreditAccounts() {
      this.$store
        .dispatch("supplier/GetSupplierBankDetails", this.Purchase.supplier_id)
        .then((res) => {
          this.supplierCreditAccounts = res.data.data;
        })
        .catch((err) => {
          this.messages = err.data.title;
        });
    },
    dulpicateBatch(product) {
      let item = _.cloneDeep(product);
      item.count = item.count + 1;
      item.id = item.id + 1;
      item.unit = { id: 0 };
      item.unitPrice = null;
      item.received = 1;
      item.discountError = [];
      item.discountPercentError = [];
      item.discount = 0;
      item.discountPercentage = [];
      item.damage = 0;
      item.total = null;
      item.unitError = [];
      var sameBatches = this.selectedProducts.filter(
        (product) => product.batch.id === item.batch.id
      );
      if (sameBatches) {
        sameBatches.forEach((batch) => {
          batch.count = item.count;
        });
      }
      this.selectedProducts.unshift(item);
      this.RemoveDuplicateUnitForSameBatch(product);
    },
    OpenModal() {
      if (!this.Purchase.product) {
        this.productRequiredErrorMessage.push("Select a product");
      } else {
        this.GetProductDetails(this.selectedProduct.id);
        this.$refs.batchform.openModal();
        this.showScheduleForm = true;
        this.ProductBatches = new ProductBatch();
        this.ProductBatches.productId = this.Purchase.product;
      }
    },

    EditPayment(item) {
      this.$refs.PaymentEditModel.openModal();
      this.payment = item;
    },
    GetProductDetails(id) {
      this.$store
        .dispatch("product/GetProductById", id)
        .then((res) => {
          this.selectedProduct = new ProductViewModel(res.data);
          this.productUnits = this.selectedProduct.units;
        })
        .catch((err) => {
          this.messages.push(err.data.title);
        });
    },
    EditPurchase() {
      this.isLoading = true;

      let error = false;
      this.selectedProducts.forEach((product) => {
        if (!product.unit.id > 0) {
          error = true;
          product.unitError.push("Select unit");
        }
      });
      if (!error) {
        this.Purchase.products = this.selectedProducts;
        this.Purchase.Id = this.$route.params.id;
        this.$store
          .dispatch("purchase/EditPurchase", this.Purchase)
          .then((res) => {
            if (this.selectedFiles) {
              var fileId = this.$route.params.id;
              var files = this.selectedFiles;
              var documentType = "PURCHASE";
              this.$store
                .dispatch("DocumentUploads", {
                  fileId,
                  files,
                  documentType,
                })
                .then((resp) => {
                  console.log(resp);
                });
            }
            this.$toast.success("Purchase updated successfully");
            this.isLoading = false;
            this.$router.push("/purchase");
          })
          .catch((err) => {
            this.isLoading = false;
            this.messages = err.data.title;
          });
      }
    },

    getSupplierByQuery(query = "") {
      this.$store
        .dispatch("supplier/GetSupplierSearch", {
          query: query,
          status: "active",
        })
        .then((res) => {
          console.log(res);
          this.suppliers = res.map((u, i, arr) => {
            u.index = i + 1;
            return new SupplierListViewModel(u);
          });
        })
        .catch((err) => {
          this.messages = err.data.title;
        });
    },
    async submit() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        if (this.selectedProducts.length != 0) {
          let error = false;
          this.selectedProducts.forEach((item) => {
            if (item.received == "" || parseInt(item.received) < 1) {
              item.receivedError.push("received must be Greater than 0");
              error = true;
            } else if (parseInt(item.received) < parseInt(item.damage)) {
              item.receivedError = [];
              item.damageError.push("damage should less than received");
              error = true;
            } else if (parseInt(item.received) < parseInt(item.discount)) {
              item.discountError = [];
              item.discountError.push("discount should less than received");
              error = true;
            } else if (parseInt(item.discountPercentage) < 0) {
              item.discountPercentError = [];
              item.discountPercentError.push("discount should greater than 0");
              error = true;
            } else if (parseInt(item.discountPercentage) > 100) {
              item.discountPercentError = [];
              item.discountPercentError.push(
                "discount should less or equal than 100"
              );
              error = true;
            }
            else if(this.Purchase.discountAmount>
                (this.selectedProductsTotal -
                    this.Purchase.totalDiscountAmount ))
            {
              error=true;
            }
          });

          if (!error) {
            this.EditPurchase();
          }
        } else {
          this.isProductListValid =
            "Please select at least one product and batch";
        }
      }
    },
    onInputDiscountAmount()
    {

      if(this.Purchase.discountAmount>
          (this.selectedProductsTotal -
              this.Purchase.totalDiscountAmount ))
      {
        this.discountAmountErrorMessages.push("discount should be less than the Total Amount ")
      }
      else {
        this.discountAmountErrorMessages=[];
      }
    },
    clear() {
      this.isProductListValid = "";
      this.Purchase = new Purchase();
      // this.PurchaseOrder = new PurchaseOrderEntityModel();
      this.$refs.fileUpload.removeAllItems();
      this.selectedProducts = [];
      this.$refs.observer.reset();
    },

    getWarehouseByQuery(query = "") {
      this.warehouseLoading = true;
      this.$store
        .dispatch("warehouse/GetWarehouse", { query: query })
        .then((res) => {
          console.log(res);
          this.warehouses = res;
          this.warehouseLoading = false;
        })
        .catch((err) => {
          this.warehouseLoading = false;
          this.messages = err.data.name;
        });
    },
    GetPurchase() {
      this.isLoading = true;
      let Id = this.$route.params.id;
      this.$store
        .dispatch("purchase/GetPurchase", Id)
        .then((res) => {
          this.Purchase = new PurchaseViewModel(res.data);
          this.products = this.Purchase.products;
          this.Purchase.Id = Id;
          this.selectedProducts = this.Purchase.products;

          if (!this.Purchase.isWithoutPurchaseOrder) {
            this.purchaseOrders = new PurchaseOrderViewModel(
              res.data.purchaseOrder
            );
          }

          this.searchSupplier = this.Purchase.suppliers.name;
          this.searchWarehouse = this.Purchase.warehouses.name;
          this.GetSupplierCreditAccounts();
          if (this.Purchase.isWithoutPurchaseOrder) {
            this.LoadAllProductsToAdd();
          } else {
            this.products = this.purchaseOrders.products;
          }
          this.selectedProducts.forEach((product) => {
            this.purchaseproductClonedDetails.unshift(_.cloneDeep(product));
            this.GetSelectedUnitPriceDetails(product, product.unit);
            product.unitError = [];
          });
          this.selectedProducts.forEach((product) => {
            this.RemoveDuplicateUnitForSameBatch(product);
            product.unitError = [];
          });
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.messages = err.data;
        });
    },

    GetProductsForSelectedReference(referenceId) {
      this.selectedPurchaseOrder = this.purchaseOrders.find(
        (item) => item.id === referenceId
      );
      if (this.selectedPurchaseOrder) {
        this.products = this.selectedPurchaseOrder.products;
        this.Purchase.product = _.cloneDeep(
          this.selectedPurchaseOrder.products
        );
        this.Purchase.supplier_id = this.selectedPurchaseOrder.supplier_id;
        this.Purchase.wareHouse_id = this.selectedPurchaseOrder.wareHouse_id;
        this.selectedProducts = [];
      } else {
        this.products = [];
      }
    },
    GetSelectedUnitPriceDetails(product, unit) {
      product.unitError = [];
      if (product.batch && product.batch.unitPriceDetails) {
        var selectedUnit = product.batch.unitPriceDetails.find(
          (i) => unit.id === i.unit
        );
        if (selectedUnit) {
          product.unitPrice = selectedUnit.purchasePrice;
        }

        this.CalculateTotal();
      }
      this.RemoveDuplicateUnitForSameBatch(product);
    },
    CalculateTotal() {
      let sum = 0;
      this.selectedProducts.forEach((product) => {
        console.log("DDDDDDDD", this.Purchase.totalDiscountAmount);
        // let discountAmount=puct.discount)*(parseInt(product.unitPrice)*(parseInt(product.discountPercentage)/100))))
        // this.Purchase.totalDiscountAmount=  this.Purchase.totalDiscountAmount+product.unitPrice;
        if (product.received) {
          product.total = product.unitPrice * product.received;
          product.discountAmount = parseInt(
            product.discount * product.unitPrice +
              (product.received - product.discount) *
                (product.unitPrice * (product.discountPercentage / 100))
          );
          sum = sum + product.total;
        }
      });

      this.Purchase.total = sum;
      this.sumField("total");
      this.sumDiscountField("discountAmount");
    },
    AddBatch(credentials) {
      credentials.Id = this.Purchase.products;
      this.$store
        .dispatch("product/AddProductBatch", credentials)
        .then((res) => {
          this.succeeed = true;
          this.$toast.success("Batch Added  Successfully");
          this.showScheduleForm = false;
          this.GetProductBatches();
        })
        .catch((err) => {
          this.messages.push(err.data.title);
          this.$toast.error("Edit Product Failed");
        });
    },
    GetBatchesForProducts(id) {
      this.productRequiredErrorMessage = [];
      let product = this.products.find(
        (item) => item.product_id === this.Purchase.product
      );
      this.productUnits = product.units;
      this.selectedProduct = product;
      this.GetProductBatches();
    },
    onScanBarcode(value) {
      debugger;
      this.$store
          .dispatch("product/serachAllProductByBarcode", {
            warehouseId: this.Purchase.wareHouse_id,
            barcode: value,
          })
          .then((res) => {
            this.$store
                .dispatch("product/GetProductById", res.data.data.id)
                .then(async (resp) => {
                  await this.addProductUsingBarcode(res.data.data, resp.data);

                })
                .catch((err) => {
                  this.productRequiredErrorMessage.push('Product not found for this Barcode');
                });
          })
          .catch((err) => {
            this.productRequiredErrorMessage.push('Product not found for this Barcode');

          });
    },
    async addProductUsingBarcode(barcodeSearchResponse, product) {
      debugger
      let selectedProductId = product.id;
      let selectedUnitId = barcodeSearchResponse.unit_id;
      let selectedBatchId = barcodeSearchResponse.batch_id;
      this.Purchase.batch = selectedBatchId;
      let supplierAssigned=product.suppliers.find(sup=>sup.id==this.Purchase.supplier_id);
      let orderedProduct =null
      let isPurchaseOderError=false;


      let alreadySelectedProduct=false;
      debugger;
      if(this.selectedProducts.length>0)
      {
        let found= this.selectedProducts.find(
            p=>
                (p.product_id == selectedProductId) &&
                (p.batch.id == selectedBatchId) &&
                (p.unit.id == selectedUnitId))
        if(found)
        {
          alreadySelectedProduct=found;
          this.productRequiredErrorMessage=[];
          this.productRequiredErrorMessage.push('This product is already added');
        }
      }


      if(this.Purchase.type=='Purchase Order')
      {
        if(this.Purchase.purchase_order_id)
        {
          orderedProduct=this.selectedPurchaseOrder.products.find(p=>p.id==selectedProductId);
          if(!orderedProduct)
          {
            isPurchaseOderError=true;
            this.productRequiredErrorMessage=[];
            this.productRequiredErrorMessage.push('Selected Product is not ordered For this Purchase Order');
          }
        }
        else {
          this.purchaseOrderErrorMessage.push('Select  a Purchase Order')
        }


      }
      else if(this.Purchase.type=='Purchase Return')
      {
        if(this.Purchase.purchase_return_id)
        {
          orderedProduct=this.selectedPurchaseReturn.products.find(p=>p.id==selectedProductId);
          if(!orderedProduct)
          {
            isPurchaseOderError=true;
            this.productRequiredErrorMessage=[];
            this.productRequiredErrorMessage.push('Selected Product is not available  For this Purchase Return');
          }
        }
        else
        {
          this.purchaseReturnErrorMessage.push('Select  a purchase return')
        }

      }
      else{
        if(!supplierAssigned)
        {
          this.productRequiredErrorMessage=[];
          this.productRequiredErrorMessage.push('Selected Product is not assigned to selected supplier');
        }
      }


      if (!alreadySelectedProduct && supplierAssigned && !isPurchaseOderError) {
        this.Purchase.product = product.id;
        this.products = [new ProductViewModel(product)];
        this.selectedProductBatches = product.batches.map((u, i, arr) => {
          return new ProductBatchViewModel(u);
        });
        this.AddProduct();
        this.productRequiredErrorMessage=[];
      }
    },
    removeProduct(product) {
      this.selectedProducts.splice(
        this.selectedProducts.findIndex((item) => item.id === product.id),
        1
      );
      this.RemoveDuplicateUnitForSameBatch(product);

      this.CalculateTotal();
    },
    RemoveDuplicateUnitForSameBatch(item) {
      let sameBatches = this.selectedProducts.filter(
        (p) => p.batch.id === item.batch.id
      );
      let batchDetail = _.cloneDeep(
        this.purchaseproductClonedDetails.find(
          (p) => p.product_id === item.product_id
        )
      );
      if (batchDetail == undefined) {
        batchDetail = _.cloneDeep(
          this.products.find((p) => p.product_id == item.product_id)
        );
      }
      let units = [];

      if (sameBatches) {
        sameBatches.forEach((batch) => {
          if (sameBatches.length == batchDetail.units.length) {
            batch.disabled = true;
          } else {
            batch.disabled = false;
          }
          if (batch.unit) {
            units.push(batch.unit);
          }
        });
      }

      sameBatches.forEach((batch) => {
        const clonedBatch = _.cloneDeep(batch);
        let unitsCloned = _.cloneDeep(batchDetail.units);
        units.forEach((u) => {
          // let unitFound=sameBatches.find(p=>p.unit.id==u.id)
          if (clonedBatch.unit && clonedBatch.unit.id !== u.id) {
            const index = unitsCloned.findIndex((i) => i.id == u.id);
            if (index != -1) {
              unitsCloned.splice(index, 1);
            }
          }
        });
        batch.units = unitsCloned;
      });
    },

    GetProductBatches() {
      this.batchLoading = true;
      let selectedBatches = [];
      this.selectedProducts
        .filter((p) => p.product_id == this.Purchase.product)
        .forEach((p) => {
          if (p.batch) selectedBatches.push(p.batch.id);
        });
      this.$store
        .dispatch("product/GetProductBatches", {
          id: this.Purchase.product,
          searchText: "",
          selectedBatches: selectedBatches,
        })
        .then((res) => {
          this.batchLoading = false;
          this.selectedProductBatches = res.data.data.map((u, i, arr) => {
            return new ProductBatchViewModel(u);
          });
        })
        .catch((err) => {
          this.batchLoading = false;

          this.messages = err.data.title;
        });
    },
    GetPayments() {
      this.purchaseId = this.$route.params.id;
      this.$store
        .dispatch("purchase/GetPayment", this.purchaseId)
        .then((res) => {
          this.payments = res.data.data.map((u, i, arr) => {
            return new PaymentViewModel(u);
          });
          console.log("PAYMENTTT TYPEEE ISSS", this.payments);
        })
        .catch((err) => {
          this.messages = err.data.title;
        });
    },
    refreshBatches($event) {
      this.GetProductBatches();
    },
    LoadAllProductsToAdd() {
      if (this.Purchase.isWithoutPurchaseOrder) {
        console.log("YEAHHH IT GOESSSSS");
        this.getProductsByQuery();
      }
    },
    increaseInput(item) {
      debugger;
      if (parseInt(item.received) < 1) {
        item.receivedError.push("received must be Greater than 0");
      } else if (parseInt(item.received) < parseInt(item.damage)) {
        item.receivedError = [];
        item.damageError.push("damage should less than received");
      } else {
        item.receivedError = [];
        item.damageError = [];
      }
      if (parseInt(item.discount) < 0) {
        item.discountError.push("discount must be Greater than 0");
      } else if (parseInt(item.received) < parseInt(item.discount)) {
        item.discountError = [];
        item.discountError.push("discount should less than received");
      } else {
        item.discountError = [];
      }

      if (parseInt(item.discountPercentage) < 0) {
        item.discountPercentError.push(
          "discount percentage must be Greater than 0"
        );
      } else if (parseInt(item.discountPercentage) > 100) {
        item.discountPercentError = [];
        item.discountPercentError.push(
          "discount percentage should less than or equal 100"
        );
      } else {
        item.discountPercentError = [];
      }

      this.CalculateTotal();
    },
    getProductsByQuery(query = "") {
      this.productSearchloading = true;
      this.$store
        .dispatch("product/GetProduct", {
          query: query,
        })
        .then((res) => {
          if (
            this.Purchase.supplier_id &&
            this.Purchase.isWithoutPurchaseOrder
          ) {
            this.products = res.map((u, i, arr) => {
              let tempselctedProduct = new ProductViewModel(u);
              tempselctedProduct.quantity = 1;
              if (u.unit) {
                tempselctedProduct.unit = u.unit;
              }
              if (
                u.suppliers.find((sp) => sp.id == this.Purchase.supplier_id) !=
                null
              ) {
                tempselctedProduct.disabled = false;
              } else {
                tempselctedProduct.disabled = true;
              }

              return tempselctedProduct;
            });
          }

          this.productSearchloading = false;
        })
        .catch((err) => {
          this.productSearchloading = false;
          this.messages = err.data.title;
        });
    },
  },

  created() {
    this.$barcodeScanner.init(this.onScanBarcode);
    this.GetPurchase();
    this.GetDebitPurchaseAccounts();
    this.GetPayments();
    this.GetDebitAccountsearch();
  },

  watch: {
    searchWarehouse(value) {
      if (!value) {
        return;
      }
      this.getWarehouseByQuery(value);
    },
    searchSupplier(value) {
      if (!value) {
        return;
      }
      this.getSupplierByQuery(value);
    },
    searchProduct(value) {
      if (!value) {
        this.getProductsByQuery("");
      }
      this.getProductsByQuery(value);
    },
    searchProductBatch(value) {
      if (!value) {
        this.GetProductBatches("");
      }
      this.GetProductBatches(value);
    },
  },
};
</script>
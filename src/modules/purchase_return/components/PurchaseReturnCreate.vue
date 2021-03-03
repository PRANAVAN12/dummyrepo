<template>
  <div>
    <PageTitle
        title="Create Purchase Return"
        :backBtn="true"
        :showLoading="isLoading"
    />
    <v-container fluid class="lighten-12 container">
      <ValidationObserver ref="observer">
        <v-row>
          <v-col cols="12" md="12" sm="12" lg="12">
            <v-card class="lighten-12">
              <v-card-title>General</v-card-title>
              <v-container fluid>
                <v-row>
                  <v-col  cols="12" md="12" sm="12" lg="4">
                    <ValidationProvider>
                      <datePickComponent
                          hide-details="auto"
                          v-model="purchaseReturnViewModel.date"
                          labelname="Date"
                      />
                    </ValidationProvider>
                  </v-col>

                </v-row>
                <v-row>
                  <v-col cols="12" md="12" sm="12" lg="4">
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="Warehouse"
                        rules="required"
                    >
                      <v-autocomplete
                          hide-details="auto"
                          v-model="purchaseReturnViewModel.warehouseId"
                          @input="onSelectWarehouse()"
                          item-text="name"
                          :search-input.sync="searchWarehouse"
                          :loading="projectsLoading"
                          item-value="id"
                          :items="purchaseReturnViewModel.warehouses"
                          :error-messages="warehouseRequiredErrorMessage"
                          label="Select Warehouse"
                          outlined
                          required

                      >
                      </v-autocomplete>
                      <div
                          class="error-containner pa-1"
                          v-if="purchaseReturnViewModel.warehouseId == null"
                      >
                        Please select warehouse before Adding product
                      </div>
                    </ValidationProvider>
                  </v-col>

                  <v-col cols="12" md="12" sm="12" lg="4">
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="Supplier"
                        rules="required"
                    >
                      <v-autocomplete
                          hide-details="auto"
                          v-model="purchaseReturnViewModel.supplierId"
                          :items="purchaseReturnViewModel.suppliers"
                          item-text="name"
                          item-value="id"
                          label="Supplier"
                          outlined
                          :search-input.sync="searchSupplier"
                          :loading="projectsLoading"
                          :error-messages="errors"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col  cols="12" md="12" sm="12" lg="2">
                    <v-checkbox
                        hide-details="auto"
                        color="#002db3"
                        v-model="purchaseReturnViewModel.isExchange"

                        label="is Exchange"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col  cols="12" md="12" sm="12" lg="12">
            <v-card fluid class="lighten-12">
              <v-card-title>Purchase Return Product List</v-card-title>
              <v-progress-linear
                  active="false"
                  height="6"
                  indeterminate="false"
                  :query="false"
                  v-if="isLoading"
              ></v-progress-linear>

              <v-container fluid  class="light gray lighten-12">
                <ValidationObserver ref="observer">
                  <form>
                    <v-row>
                      <template v-if="messages">
                        <v-alert
                            v-for="msg in messages"
                            :key="msg"
                            class="messages"
                            outlined
                            type="error"
                        >{{ msg }}</v-alert
                        >
                      </template>
                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <v-row v-if="isProductListValid != ''">
                          <v-col cols="12">
                            <v-flex
                                v-model="isProductListValid"
                                class="product-red"
                            >{{ isProductListValid }}</v-flex
                            >
                          </v-col>
                        </v-row>
                        <!-- <v-card>
                      <v-card-text>-->
                        <v-row>
                          <!--                          <v-col cols="3">-->
                          <!--                            <v-autocomplete-->
                          <!--                                @input="onSelectReason"-->
                          <!--                                v-model="purchaseReturnViewModel.returnReason"-->
                          <!--                                :items="returnReasons"-->
                          <!--                                item-text="name"-->
                          <!--                                :search-input.sync="searchReturnReasons"-->
                          <!--                                :loading="projectsLoading"-->
                          <!--                                item-value="id"-->
                          <!--                                outlined-->
                          <!--                                :error-messages="productRequiredErrorMessages"-->
                          <!--                                dense-->
                          <!--                                label="Reason"-->
                          <!--                            ></v-autocomplete>-->
                          <!--                          </v-col>-->
                          <v-col  cols="12" md="12" sm="12" lg="4">
                            <v-autocomplete
                                hide-details="auto"
                                :disabled="(!purchaseReturnViewModel.warehouseId)"
                                @input="onSelectProduct"
                                v-model="purchaseReturnViewModel.selectedProduct"
                                :items="purchaseReturnViewModel.products"
                                item-text="name"
                                :search-input.sync="searchProduct"
                                :loading="projectsLoading"
                                item-value="id"
                                outlined
                                :error-messages="productRequiredErrorMessages"
                                dense
                                label="Product"
                            ></v-autocomplete>

                          </v-col>

                          <v-col cols="12" md="12" sm="12" lg="4" >
                            <v-autocomplete
                                hide-details="auto"
                                @input="onSelectBatch"
                                v-model="
                                purchaseReturnViewModel.selectedProduct
                                  .selectedBatch
                              "
                                :items="
                                purchaseReturnViewModel.selectedProduct.batches
                              "
                                :error-messages="batchRequiredErrorMessage"
                                item-text="batch"
                                item-value="id"
                                outlined
                                dense
                                label="Batch"
                            ></v-autocomplete>
                          </v-col>
                          <!--                          <v-col cols="2" >-->
                          <!--                            <v-autocomplete-->
                          <!--                                v-model="purchaseReturnViewModel.selectedProductUnit"-->
                          <!--                                :items="purchaseReturnViewModel.selectedProductUnits"-->
                          <!--                                :error-messages="batchRequiredErrorMessage"-->
                          <!--                                item-text="name"-->
                          <!--                                item-value="id"-->
                          <!--                                outlined-->
                          <!--                                dense-->
                          <!--                                label="Unit"-->
                          <!--                            ></v-autocomplete>-->
                          <!--                          </v-col>-->

                          <v-col cols="1"  class="pl-3" >
                            <v-btn small @click="addProduct">Add</v-btn>
                          </v-col>
                        </v-row>
                        <v-row v-if="purchaseReturnViewModel.Reason == 4">
                          <v-col cols="3">
                            <ValidationProvider>
                              <v-text-field
                                  hide-details="auto"
                                  v-model="purchaseReturnViewModel.otherReason"
                                  required
                                  dense
                                  outlined
                                  label="other Reason"
                              ></v-text-field>
                            </ValidationProvider>
                          </v-col>
                        </v-row>

                        <v-row>
                          <v-col>
                            <v-card-text class="pa-0">
                              <v-data-table
                                  :headers="tableHeaders"
                                  :items="
                                  purchaseReturnViewModel.selectedProducts
                                "
                                  hide-default-footer
                                  disable-pagination
                              >
                                <template slot="body.append">
                                  <tr
                                      class="black--text"
                                      v-if="purchaseReturnViewModel.selectedProducts.length > 0"
                                  >
                                    <th class="title">Total</th>
                                    <th class="title"></th>
                                    <th class="title"></th>
                                    <th class="title"></th>
                                    <th class="title"></th>
                                    <th class="title"></th>
                                    <th class="title"></th>
                                    <th class="title"></th>
                                    <th class="title ">
                                      {{ selectedProductsTotal | formatCurrency }}
                                    </th>
                                  </tr>
                                </template>
                                <template
                                    v-slot:item.total="{ item }"
                                    v-slot="{ errors }"
                                    name="total"
                                    rules="numeric"
                                >
                                  {{ item.total }}
                                </template>
                                <template
                                    v-slot:item.batch="{ item }"
                                    v-slot="{ errors }"
                                    name="Batch"
                                >{{ item.selectedBatch.batch }}</template
                                >
                                <template
                                    v-slot:item.reason="{ item }"
                                    v-slot="{ errors }"
                                    name="reason"
                                >
                                  <ValidationProvider
                                      v-if="item.returnReason == '4'"
                                  >
                                    <v-text-field
                                        hide-details="auto"
                                        min="0"
                                        :max="item.reason"
                                        v-model="item.reason"
                                        @input="sumField('total')"
                                        :error-messages="
                                        item.quantityErrorMeaages
                                      "
                                        dense
                                        class="pt-3"
                                        label="specify"
                                        outlined
                                    ></v-text-field>
                                  </ValidationProvider>
                                </template>
                                <template
                                    v-slot:item.quantity="{ item }"
                                    v-slot="{ errors }"
                                    name="Quantity"
                                    rules="numeric"
                                >
                                  <ValidationProvider>
                                    <v-text-field
                                        hide-details="auto"

                                        min="0"
                                        :max="item.maxQuantity"
                                        v-model="item.quantity"
                                        @input="findTotal(item)"
                                        type="number"
                                        :error-messages="
                                        item.quantityErrorMeaages
                                      "
                                        dense
                                        class="pt-3"
                                        outlined
                                    ></v-text-field>
                                  </ValidationProvider>
                                </template>

                                <template
                                    v-slot:item.returnReason="{ item }"
                                    v-slot="{ errors }"
                                    name="reason"
                                >
                                  <ValidationProvider>
                                    <v-autocomplete
                                        v-model="item.returnReason"
                                        :items="item.returnReasons"
                                        outlined
                                        item-text="name"
                                        @input="GetQuantityFromStock(item)"
                                        item-value="id"
                                        :error-messages="
                                        item.resonRequiredErrorMessages
                                      "
                                        required
                                        dense
                                        class="pt-7"
                                    ></v-autocomplete>
                                  </ValidationProvider>
                                </template>
                                <template
                                    v-slot:item.unit="{ item }"
                                    v-slot="{ errors }"
                                    name="Unit"
                                    rules="numeric"
                                >
                                  <ValidationProvider>
                                    <v-select
                                        hide-details="auto"
                                        v-model="item.unit"
                                        :items="item.units"
                                        outlined
                                        @input="
                                        GetSelectedUnitPriceDetails(
                                          item,
                                          item.unit
                                        )
                                      "
                                        item-text="name"
                                        item-value="id"
                                        type="number"
                                        :error-messages="item.unitError"
                                        required
                                        dense
                                        class="pt-3"
                                    ></v-select>
                                  </ValidationProvider>
                                </template>
                                <template v-slot:item.action="{ item }">
                                  <div class="space-around">
                                    <div

                                    >
                                      <v-row>
                                        <v-col cols="6">
                                          <v-tooltip bottom  >
                                            <template
                                                v-slot:activator="{ on, attrs }"
                                            >
                                              <v-btn v-if="
                                        item.units.length > 1 && !item.disabled
                                      "
                                                     x-small
                                                     color="black"
                                                     icon
                                                     @click="dulpicateBatch(item)"
                                              >
                                                <v-icon>mdi-content-copy</v-icon>
                                              </v-btn>
                                            </template>
                                            <span>Duplicate Product</span>
                                          </v-tooltip>
                                        </v-col>
                                        <v-col cols="6">
                                          <v-btn
                                              x-small
                                              color="black"
                                              icon
                                              @click="removeProduct(item)"
                                          >
                                            <v-icon>mdi-close-circle</v-icon>
                                          </v-btn>
                                        </v-col>
                                      </v-row>




                                    </div>
                                  </div>
                                </template>
                              </v-data-table>
                            </v-card-text>
                          </v-col>
                        </v-row>
                        <!-- </v-card-text>
                      </v-card>-->
                      </v-col>
                    </v-row>
                  </form>
                </ValidationObserver>
              </v-container>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-card class="lighten-12">
              <v-card-title>Note</v-card-title>
              <v-container fluid>
                <v-textarea
                    hide-details="auto"
                    rows="3"
                    outlined
                    v-model="purchaseReturnViewModel.remarks"
                ></v-textarea>
              </v-container>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card class="lighten-12" >
              <v-card-title>Additional Amount</v-card-title>
              <v-container fluid>
                <v-row>
                  <v-col cols="6">
                    <ValidationProvider>
                      <v-text-field
                          v-model="purchaseReturnViewModel.reason"
                          :error-messages="errors"
                          required
                          dense
                          outlined
                          hide-details="auto"
                          label="Reason"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="6"></v-col>
                  <v-col cols="6">
                   <ValidationProvider  name=" Amount"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                          v-model="purchaseReturnViewModel.additional_amount"
                          type="number"
                          :error-messages="minusvalue"
                          required

                          dense
                          outlined
                          min="0"
                          hide-details="auto"
                          label=" Amount"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col
                      cols="6"

                  >
                    <ValidationProvider>
                      <v-autocomplete
                          outlined
                          dense
                          item-text="name"
                          item-value="id"
                          v-model="purchaseReturnViewModel.debit_account"
                          :items="debitAccountsearch"
                          :error-messages="errors"
                          label="Debit Account"
                      >
                      </v-autocomplete>
                    </ValidationProvider>
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
                <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
                  <FileUpload
                      hide-details="auto"
                      :multiple="true"
                      size="2048"
                      v-model="selectedFiles"
                      showList="true"
                      ref="fileUpload"
                  />
                </v-col>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </ValidationObserver>
      <v-row>
        <v-col class="d-flex justify-end">
          <v-card-actions class="pa-0">
            <v-spacer></v-spacer>
            <v-btn
                depressed
                small
                class="text-white btn_medium"
                @click="clear"
            >clear</v-btn
            >
            <v-btn
                depressed
                small
                class="text-white btn_blue btn_medium w-100"
                @click="submit"
            >submit</v-btn
            >
          </v-card-actions>
        </v-col>
      </v-row>
      <v-navigation-drawer
          app
          width="40%"
          v-model="drawer"
          absolute
          temporary
          right
      >
        <v-card style="height: 100%">
          <v-card-title> Select damaged Products </v-card-title>
          <v-container>
            <v-row>
              <v-data-table
                  v-model="selected"
                  :headers="damagedProductHeaders"
                  :items="damagedProducts"
                  item-key="tempId"
                  show-select
                  class="elevation-1"
                  hide-default-footer
              >
                <template v-slot:header.data-table-select> </template>
                <template v-slot:item.data-table-select="{ item }">
                  <v-checkbox
                      color="#002db3"
                      v-model="selected"
                      class="pa-3"
                      :value="item"
                      :disabled="item.disabled"
                  ></v-checkbox>
                </template>
              </v-data-table>
            </v-row>
            <v-row>
              <v-col cols="10"></v-col>
              <v-col cols="2">
                <v-btn depressed small @click="applySelectedReturn()"
                >Apply</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-navigation-drawer>
    </v-container>
  </div>
</template>
<script>
import datePickComponent from "../../../components/base/DateComponent";
import { PurchaseReturn } from "../../../models/EntityModels/PurchaseReturnRequestModel";
import { PurchaseReturnViewModel } from "../../../models/View Models/PurchaseReturn";
import { required, email, max, numeric } from "vee-validate/dist/rules";
import { SupplierListViewModel } from "../../../models/View Models/Supplier";
import _ from "lodash";
import FileUpload from "@/components/base/FileUpload";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import { Product } from "../../../models/Product";
import { ProductViewModel } from "../../../models/View Models/ProductViewModel";
import { AccountViewModel } from "@/models/View Models/AccountViewModel";

extend("numeric", {
  ...numeric,
  message: "input must be numeric",
});
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
    isProductListValid: "",
    selectedFiles: "",
    minusvalue:[],
    selectedProductsTotal:0,
    clonedProductDetails: [],
    searchSupplier: null,
    searchWarehouse: null,
    projectsLoading:false,
    searchProduct: null,
    debitAccountsearch: [],
    debitAccounts: [],
    searchReturnReasons: null,
    returnReasons: [],
    productRequiredErrorMessages: [],
    batchRequiredErrorMessage: [],
    unitRequiredErrorMessages: [],
    warehouseRequiredErrorMessage: [],
    unitErrorMessages: [],
    reasonRequiredErrorMessages: [],
    damagedProducts: [],
    selected: [],
    drawer: false,
    purchaseReturnViewModel: new PurchaseReturnViewModel(),
    damagedProductHeaders: [
      {
        text: "Product name",
        align: "center",
        value: "name",
      },
      {
        text: "Product Unit",
        value: "unit.name",
        width: "25%",
      },
      {
        text: "damaged Quantity",
        value: "damagedStock",
      },
    ],
    tableHeaders: [
      {
        text: "Reason",
        value: "returnReason",
        width: "14%",
      },
      {
        text: "",
        value: "reason",
        width: "9%",
      },
      {
        text: "Product Code",
        value: "code",width: "12%",
      },
      {
        text: "Product name",
        value: "name",width: "12%",
      },
      {
        text: "Batch",
        value: "batch",width: "8%",
      },
      {
        text: "Unit",
        value: "unit",
        width: "12%",
      },
      {
        text: "Qty",
        value: "quantity",
        width: "7%",
      },
      {
        text: "Purchase price",
        value: "unitPrice",
        width: "10%",
      },
      {
        text: "Total Amount",
        value: "total",
        width: "10%",
      },

      {
        text: "Actions",
        value: "action",
        align: "center",
        width: "10%",
      },
    ],

    messages: [],
    errors: [],
    selectedProduct: { batches: [] },
    PurchaseReturn: new PurchaseReturn(),
  }),
  components: {
    ValidationProvider,
    ValidationObserver,
    datePickComponent,
    FileUpload,
  },
  methods: {
    clear() {
      this.isProductListValid = "";
      this.purchaseReturnViewModel = new PurchaseReturnViewModel();
      (this.selectedProducts = []), this.$refs.fileUpload.removeAllItems();

      this.$refs.observer.reset();
    },

    onSelectProduct(value) {
      this.purchaseReturnViewModel.selectedProduct = this.purchaseReturnViewModel.products.find(
          (p) => p.id == value
      );
      this.productRequiredErrorMessages = [];
      this.GetProductBatches();
    },

    onSelectBatch(value) {
      this.batchRequiredErrorMessage = [];
      this.purchaseReturnViewModel.selectedProduct.selectedBatch = this.purchaseReturnViewModel.selectedProduct.batches.find(
          (p) => p.id == value
      );
      this.purchaseReturnViewModel.selectedProductUnits = this.purchaseReturnViewModel.selectedProduct.selectedBatch.units;
    },

    getDamagedProductForReturn() {
      this.$store
          .dispatch("purchaseReturn/GetDamagedProducts")
          .then((res) => {
            this.damagedProducts = res.map((u, i, arr) => {
              u.index = i;
              return new Product().toViewModel(u);
            });
            this.isLoading = false;
          })
          .catch((err) => {
            this.isLoading = false;
            this.messages = err.data.title;
          });
    },
    async getDamageProductByBatchUnit(details) {
      let quantity = 0;
      await this.$store
          .dispatch("purchaseReturn/getProductReturnStock", details)
          .then((res) => {
            quantity = res.data.data.quantity;
          })
          .catch((err) => {});
      return quantity;
    },
    async getProductBatchDetailsFromStock(details) {
      let units = [];
      await this.$store
          .dispatch("purchaseReturn/getProductBatchDetailsFromStock", details)
          .then((res) => {
            units = res.data.data;
          })
          .catch((err) => {});
      return units;
    },
    async GetSelectedUnitPriceDetails(product, unit) {
      debugger;
      await this.GetQuantityFromStock(product);

      this.RemoveDuplicateUnitForSameBatch(product);
      product.uniterror = [];
      var selectedUnit = product.units.find((i) => unit == i.id);
      if (selectedUnit) {
        product.unitPrice = selectedUnit.batch_units.purchase_price;
      }
      this.CalculateTotal();
    },
    findTotal(item) {
      item.total = parseInt(item.quantity) * item.unitPrice;
      this.sumField('total');
      this.CheckQuantity(item)
    },
    CalculateTotal() {
      let sum = 0;
      this.purchaseReturnViewModel.selectedProducts.forEach((product) => {
        if (product.quantity >= 0) {
          product.total = product.unitPrice * product.quantity;
          sum = sum + product.total;
        }
      });
      this.sumField("total");
      // this.Purchase.total = sum;
    },
    async addProduct() {
      if (this.purchaseReturnViewModel.warehouseId) {
        if (
            this.purchaseReturnViewModel.selectedProduct.id &&
            this.purchaseReturnViewModel.selectedProduct.selectedBatch &&
            this.purchaseReturnViewModel.selectedProduct.selectedBatch.id
        ) {
          this.purchaseReturnViewModel.selectedProduct.index = _.cloneDeep(
              this.purchaseReturnViewModel.selectedProducts.length
          );

          this.purchaseReturnViewModel.selectedProduct.units = await this.getProductBatchDetailsFromStock(
              {
                productId: this.purchaseReturnViewModel.selectedProduct.id,
                batchId: this.purchaseReturnViewModel.selectedProduct
                    .selectedBatch.id,
                warehouseId: this.purchaseReturnViewModel.warehouseId,
              }
          );
          this.purchaseReturnViewModel.selectedProduct.returnReason = this.purchaseReturnViewModel.returnReason;
          this.purchaseReturnViewModel.selectedProduct.returnReasons = this.returnReasons;

          this.purchaseReturnViewModel.selectedProduct.unitError = [];
          this.purchaseReturnViewModel.selectedProduct.quantityErrorMeaages = [];
          this.purchaseReturnViewModel.selectedProducts.unshift(
              _.cloneDeep(this.purchaseReturnViewModel.selectedProduct)
          );
          this.clonedProductDetails.unshift(
              _.cloneDeep(this.purchaseReturnViewModel.selectedProduct)
          );
          this.purchaseReturnViewModel.selectedProduct = { batches: [] };
          if (this.purchaseReturnViewModel.selectedProducts.length) {
            this.isProductListValid = "";
          }
        } else {
          if (!this.purchaseReturnViewModel.selectedProduct.id) {
            this.productRequiredErrorMessages.push("Select Product");
          } else if (
              !this.purchaseReturnViewModel.selectedProduct.selectedBatch
          ) {
            this.batchRequiredErrorMessage.push("Select Batch");
          }
        }
      } else {
        this.warehouseRequiredErrorMessage.push("select  a warehouse");
      }
      this.sumField("total");
    },
    sumField(key) {
      // sum data in give key (property)
      this.selectedProductsTotal =  this.purchaseReturnViewModel.selectedProducts.reduce(
          (a, b) => a + (b[key] || 0),
          0
      );
    },
    CreatePurchaseReturn() {
      this.isLoading = true;
      let purchaseReturn = this.getPurchaseReturnRequestModel();
      this.$store
          .dispatch("purchaseReturn/CreatePurchaseReturn", purchaseReturn)
          .then((res) => {
            if (this.selectedFiles) {
              var fileId = res.data.id;
              var files = this.selectedFiles;
              var documentType = "PURCHASE_RETURN";
              this.$store
                  .dispatch("DocumentUploads", {
                    fileId,
                    documentType,
                    files,
                  })
                  .then((resp) => {
                  });
            }
            this.isLoading = false;
            this.$router.push("/purchase-return");
          })
          .catch((err) => {
            this.isLoading = false;
            this.messages = err.data.title;
          });
    },

    getProducts(query = "") {
      this.$store
          .dispatch("purchaseReturn/GetProductsFromStocks", {
            query: query,
            warehouse: this.purchaseReturnViewModel.warehouseId,
          })
          .then((res) => {
            this.purchaseReturnViewModel.products = res.map((u, i, arr) => {
              u.index = i;
              return new Product().toViewModel(u);
            });
            this.isLoading = false;
          })
          .catch((err) => {
            this.isLoading = false;
            this.messages = err.data.title;
          });
    },

    GetProductBatches() {
      let selectedBatches = [];
      this.purchaseReturnViewModel.selectedProducts
          .filter((p) => p.id == this.purchaseReturnViewModel.selectedProduct.id)
          .forEach((p) => {
            if (p.selectedBatch) selectedBatches.unshift(p.selectedBatch.id);
          });
      this.isLoading = true;
      this.$store
          .dispatch("purchaseReturn/GetProductBatches", {
            id: this.purchaseReturnViewModel.selectedProduct.id,
            searchText: "",
            selectedBatches: selectedBatches,
            warehouse: this.purchaseReturnViewModel.warehouseId,
          })
          .then((res) => {
            this.purchaseReturnViewModel.selectedProduct.batches = res.data.data;
            this.isLoading = false;
          })
          .catch((err) => {
            this.isLoading = false;
            this.messages = err.data.title;
          });
    },

    getPurchasereturnReasonByQuery(query = "") {
      this.$store
          .dispatch("purchaseReturn/GetReturnReason", {
            query: query,
          })
          .then((res) => {
            this.returnReasons = res;
          })
          .catch((err) => {
            this.isLoading = false;
            this.messages = err.data.title;
          });
    },

    getSupplierByQuery(query = "") {
      this.$store
          .dispatch("supplier/GetSupplierSearch", {
            query: query,
            status: "active",
          })
          .then((res) => {
            this.purchaseReturnViewModel.suppliers = res.map((u, i, arr) => {
              u.index = i + 1;
              return new SupplierListViewModel(u);
            });
            this.isLoading = false;
          })
          .catch((err) => {
            this.isLoading = false;
            this.messages = err.data.title;
          });
    },
    CheckQuantity(item)
    {
      if (item.quantity > item.maxQuantity) {
        item.quantityErrorMeaages.push(
            `maximum quantity to return is ${item.maxQuantity}`
        );
      }
      else {
        item.quantityErrorMeaages=[]
      }
    },
    async submit() {
      const isValid = await this.$refs.observer.validate();

      if (isValid) {
        let error = false;
        if(this.purchaseReturnViewModel.additional_amount < 0){
                this.minusvalue.push("You must be enter greater than 0");
                error = true;
        }else{
                this.minusvalue.push("");
        }
        if (this.purchaseReturnViewModel.selectedProducts.length != 0 && !error) {
          let error = false;
          let errorUnit = false;
          let errorReason = false;
          this.purchaseReturnViewModel.selectedProducts.forEach((product) => {
            product.unitError = [];
            product.quantityErrorMeaages = [];
            product.resonRequiredErrorMessages = [];
            if (!product.unit) {
              error = true;
              product.unitError.push("Select unit");
            }
            if (product.quantity > product.maxQuantity) {
              errorUnit = true;
              product.quantityErrorMeaages.push(
                  `maximum quantity to return is ${product.maxQuantity}`
              );
            }
            if (!product.returnReason) {
              errorReason = true;
              product.resonRequiredErrorMessages.push("Select a reason");
            }
          });
          if (!error && !errorUnit && !errorReason) {
            this.CreatePurchaseReturn();
          }
        } else {
          this.isProductListValid =
              "Please select at least one product and batch";
        }
      }
    },
    getPurchaseReturnRequestModel() {
      let purchseReturn = new PurchaseReturn();
      purchseReturn.date = this.purchaseReturnViewModel.date;
      purchseReturn.remarks = this.purchaseReturnViewModel.remarks;
      purchseReturn.is_exchange = this.purchaseReturnViewModel.isExchange;
      purchseReturn.account_id =this.purchaseReturnViewModel.debit_account?this.purchaseReturnViewModel.debit_account : null;
      purchseReturn.supplier_id = this.purchaseReturnViewModel.supplierId;
      purchseReturn.wareHouse_id = this.purchaseReturnViewModel.warehouseId;
      purchseReturn.reason = this.purchaseReturnViewModel.reason;
      (this.debit_account = this.purchaseReturnViewModel.debit_account),
          (purchseReturn.products = []);
      this.purchaseReturnViewModel.selectedProducts.forEach((product) => {
        purchseReturn.products.unshift({
          product_id: product.product_id,
          batch_id: product.selectedBatch.id,
          return_reason_id: product.returnReason,
          reason: product.reason ? product.reason : "",
          amount: product.total,
          quantity: product.quantity,
          unit_id: product.unit
        });
      });
      purchseReturn.remarks = this.purchaseReturnViewModel.remarks;
      purchseReturn.additional_amount = this.purchaseReturnViewModel.additional_amount;
      return purchseReturn;
    },
    getWarehouseByQuery(query = "") {
      this.$store
          .dispatch("warehouse/GetWarehouse", { query: query ,status:'active'})
          .then((res) => {
            this.purchaseReturnViewModel.warehouses = res;
            this.isLoading = false;
          })
          .catch((err) => {
            this.isLoading = false;
            this.messages = err.data.name;
          });
    },
    removeProduct(product) {
      this.purchaseReturnViewModel.selectedProducts.splice(
          this.purchaseReturnViewModel.selectedProducts.findIndex(
              (item) => item.id === product.id
          ),
          1
      );
      this.RemoveDuplicateUnitForSameBatch(product);

      this.CalculateTotal();
    },
    dulpicateBatch(product) {
      let item = _.cloneDeep(product);
      item.count = item.count + 1;
      item.id = item.id + 1;
      item.unit = null;
      item.returnReason = null;
      item.quantity = null;
      item.unitError = [];
      item.resonRequiredErrorMessages = [];
      item.quantityErrorMeaages = [];
      item.unitPrice = null;
  debugger
      var sameBatches = this.purchaseReturnViewModel.selectedProducts.filter(
          (product) => product.selectedBatch.id === item.selectedBatch.id
      );
      if (sameBatches) {
        sameBatches.forEach((batch) => {
          batch.count = item.count;
        });
      }
      this.purchaseReturnViewModel.selectedProducts.unshift(item);
      this.RemoveDuplicateUnitForSameBatch(product);
    },
    async GetQuantityFromStock(item) {
      if (item.unit !== null) {
        item.quantity = item.maxQuantity = await this.getDamageProductByBatchUnit(
            {
              productId: item.product_id,
              batchId: item.selectedBatch.id,
              unitId: item.unit,
              warehouseId: this.purchaseReturnViewModel.warehouseId,
              reasonId: item.returnReason,
            }
        );
      }
      item.unitError = [];
      item.quantityErrorMeaages = [];
      item.resonRequiredErrorMessages = [];
      this.CalculateTotal();

    },
    RemoveDuplicateUnitForSameBatch(item) {
      let sameBatches = this.purchaseReturnViewModel.selectedProducts.filter(
          (p) => p.selectedBatch.id == item.selectedBatch.id
      );
      let productDetail = _.cloneDeep(
          this.clonedProductDetails.find((p) => p.product_id === item.product_id)
      );
      let units = [];
      sameBatches.forEach((batch) => {
        if (sameBatches.length == productDetail.units.length) {
          batch.disabled = true;
        } else {
          batch.disabled = false;
        }
        if (batch.unit) {
          units.push(batch.unit);
        }
      });
      sameBatches.forEach((batch) => {
        const clonedBatch = _.cloneDeep(batch);
        let unitsCloned = _.cloneDeep(productDetail.units);
        units.forEach((u) => {
          if (clonedBatch.unit !== u) {
            const index = unitsCloned.findIndex((i) => i.id == u);
            if (index != -1) {
              unitsCloned.splice(index, 1);
            }
          }
        });
        batch.units = unitsCloned;
      });
    },
    applySelectedReturn() {
      this.purchaseReturnViewModel.selectedProducts.forEach((pr) => {
        if (
            this.reOrderLevelProducts.find(
                (p) => p.product_id == pr.id && p.unit.id == pr.unit.id
            ) &&
            !this.selected.find(
                (p) => p.product_id == pr.id && p.unit.id == pr.unit.id
            )
        ) {
          let index = this.selectedProducts.findIndex(
              (p) => p.product_id == pr.id && p.unit.id == pr.unit.id
          );
          let product = this.selectedProducts.find(
              (p) => p.product_id == pr.id && p.unit.id == pr.unit.id
          );
          if (index != -1) {
            this.selectedProducts.splice(index, 1);
            this.RemoveDuplicateUnitForSameBatch(product);
          }
        }
      });
      ///////////push the product if i not already assigned
      this.selected.forEach((product) => {
        if (
            !this.purchaseReturnViewModel.selectedProducts.find(
                (p) => p.product_id == product.id && p.unit.id == product.unit.id
            )
        ) {
          product.quantity = product.reorderQuantity;
          this.purchaseReturnViewModel.selectedProducts.unshift(product);
          // this.RemoveDuplicateUnitForSameBatch(product)
        }
      });
    },
    onSelectWarehouse() {
      this.getProducts();
      this.warehouseRequiredErrorMessage = [];
      this.purchaseReturnViewModel.selectedProducts = [];
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
            this.purchaseReturnViewModel.debit_account = this.debitAccountsearch[0].id;
            this.isLoading = false;
          })
          .catch((err) => {
            this.isLoading = false;
            this.messages = err.data.title;
          });
    },
    onScanBarcode(value) {
      this.$store
          .dispatch("product/serachProductByBarcode", {
            warehouseId: this.purchaseReturnViewModel.warehouseId,
            barcode: value,
          })
          .then((res) => {
            this.$store
                .dispatch("product/GetProductById", res.data.data.id)
                .then(async (resp) => {
                  await this.addProductUsingBarcode(
                      res.data.data,
                      new Product().toViewModel(resp.data)
                  );
                })
                .catch((err) => {});
          })
          .catch((err) => {});
    },

    async addProductUsingBarcode(barcodeSearchResponse, product) {
      let selectedReturnReasonId = this.$store.state.sitesetting.siteSettings
          .returnReasons.id;
      let selectedProductId = product.id;
      let selectedUnitId = barcodeSearchResponse.unit_id;
      let selectedBatchId = barcodeSearchResponse.batch_id;
      if (
          !this.purchaseReturnViewModel.selectedProducts.find(
              (p) =>
                  p.returnReason == selectedReturnReasonId &&
                  p.product_id == selectedProductId &&
                  p.selectedUnit.id == selectedUnitId &&
                  p.selectedBatch.id == selectedBatchId
          )
      ) {
        this.purchaseReturnViewModel.selectedProduct = product;
        this.purchaseReturnViewModel.selectedProduct.selectedBatch = this.purchaseReturnViewModel.selectedProduct.batches.find(
            (b) => b.id == barcodeSearchResponse.batch_id
        );
        this.purchaseReturnViewModel.selectedProduct.selectedUnit = this.purchaseReturnViewModel.selectedProduct.units.find(
            (b) => b.id == barcodeSearchResponse.unit_id
        );
        await this.addProduct();
        let index = this.purchaseReturnViewModel.selectedProducts.length - 1;
        this.purchaseReturnViewModel.selectedProducts[index].unit =
            barcodeSearchResponse.unit_id;
        this.purchaseReturnViewModel.selectedProducts[
            index
            ].returnReason = this.$store.state.sitesetting.siteSettings.returnReasons.id;
        this.GetSelectedUnitPriceDetails(
            this.purchaseReturnViewModel.selectedProducts[index],
            barcodeSearchResponse.unit_id
        );
      }

    },
    GetSiteSetting() {
      this.$store
          .dispatch( "sitesetting/SiteSettingView",1)
          .then((res) => {
            self.siteSetting = res.data;
            this.searchWarehouse=self.siteSetting.wareHouse.name
            this.purchaseReturnViewModel.warehouseId=self.siteSetting.wareHouse.id;
            this.onSelectWarehouse();
          })
          .catch((err) => {
            this.messages = err.data.title;
          });
    },
  },
  created() {
    this.$barcodeScanner.init(this.onScanBarcode);
    this.getSupplierByQuery();
    this.getWarehouseByQuery();
    this.getDamagedProductForReturn();
    this.getPurchasereturnReasonByQuery();
    this.GetDebitAccountsearch();
    this.GetSiteSetting();
  },

  watch: {
    searchWarehouse(value) {
      this.getWarehouseByQuery(value);
    },
    searchSupplier(value) {
      this.getSupplierByQuery(value);
    },
    searchProduct(value) {
      this.getProducts(value);
    },
    searchReturnReasons(value) {
      this.getPurchasereturnReasonByQuery(value);
    },
  },
  initView() {
    this.purchaseReturnViewModel = new PurchaseReturnViewModel();
  },
};
</script>
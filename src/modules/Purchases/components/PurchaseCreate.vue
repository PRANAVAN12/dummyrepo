<template>
  <div>
    <PageTitle
      title="Create Purchase"
      :backBtn="true"
      :showLoading="isLoading"
    />
    <v-container fluid class="lighten-12 container">
      <ValidationObserver ref="observer">
        <v-card>
          <v-card-title>General</v-card-title>
          <v-container fluid>
            <v-row>
              <v-col
                class="text-right"
                cols="12"
                xs="12"
                sm="6"
                md="4"
                lg="4"
                xl="4"
              >
                <ValidationProvider name="Reference Number">
                  <v-autocomplete
                    hide-details="auto"
                    slot-scope="{ errors }"
                    v-model="Purchase.type"
                    item-text="name"
                    item-value="value"
                    outlined
                    @change="onPurchaseTypeChanged"
                    :items="purchaseOptions"
                    label="Select Purchase Type"
                    :error-messages="errors"
                  ></v-autocomplete>
                </ValidationProvider>
              </v-col>
              <v-col
                v-if="Purchase.type == 'Purchase Order'"
                class="text-right"
                cols="12"
                xs="12"
                sm="6"
                md="4"
                lg="4"
                xl="4"
              >
                <ValidationProvider name="Reference Number">
                  <v-autocomplete
                    hide-details="auto"
                    slot-scope="{ errors }"
                    v-model="Purchase.purchase_order_id"
                    :disabled="Purchase.type == 'None'"
                    @input="GetProductsForSelectedReferenceForPurchaseOrder(Purchase.purchase_order_id )"
                    item-text="name"
                    item-value="id"
                    :search-input.sync="searchPurchaseOrder"
                    :loading="referenceLoading"
                    outlined
                    :items="purchaseOrders"
                    label="Purchase order reference number"
                    :error-messages="purchaseOrderErrorMessage"
                  ></v-autocomplete>
                </ValidationProvider>
              </v-col>
              <v-col
                v-if="Purchase.type == 'Purchase Return'"
                class="text-right"
                cols="12"
                xs="12"
                sm="6"
                md="4"
                lg="4"
                xl="4"
              >
                <ValidationProvider name="Reference Number">
                  <v-autocomplete
                    hide-details="auto"
                    slot-scope="{ errors }"
                    v-model="Purchase.purchase_return_id"
                    :disabled="Purchase.type == 'None'"
                    @input="
                      GetProductsForSelectedReferenceForPurchaseReturn(
                        Purchase.purchase_return_id
                      )
                    "
                    item-text="name"
                    item-value="id"
                    :search-input.sync="searchPurchaseReturn"
                    :loading="referenceLoading"
                    outlined
                    :items="purchaseReturns"
                    label="Purchase Return reference number"
                    :error-messages="purchaseReturnErrorMessage"
                  ></v-autocomplete>
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row
              v-if="
                Purchase.purchase_order_id ||
                Purchase.purchase_return_id ||
                Purchase.type == 'None'
              "
            >
              <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
                <ValidationProvider name="Ware House" rules="required">
                  <v-autocomplete
                    slot-scope="{ errors }"
                    outlined
                    hide-details="auto"
                    v-model="Purchase.wareHouse_id"
                    item-text="name"
                    item-value="id"
                    :items="warehouses"
                    :search-input.sync="searchWarehouse"
                    :loading="warehouseLoading"
                    :error-messages="errors"
                    label="Warehouse"
                    :disabled="Purchase.type != 'None'"
                    required
                  ></v-autocomplete>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
                <ValidationProvider name="Supplier" rules="required">
                  <v-autocomplete
                    slot-scope="{ errors }"
                    v-model="Purchase.supplier_id"
                    outlined
                    hide-details="auto"
                    @input="onChangeSupplier()"
                    :disabled="Purchase.type != 'None'"
                    :search-input.sync="searchSupplier"
                    :loading="supplierLoading"
                    item-text="name"
                    item-value="id"
                    :items="suppliers"
                    :error-messages="errors"
                    label="Supplier"
                    required
                  ></v-autocomplete>
                </ValidationProvider>
                <div
                  v-if="Purchase.supplier_id == null && Purchase.type == 'None'"
                  class="error-containner pa-1"
                >
                  Please select supplier before adding product
                </div>
              </v-col>

              <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
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
            </v-row>
          </v-container>
        </v-card>

        <!-- <v-card class="lighten-12"> -->
        <!-- <v-container class="light gray lighten-12"> -->
        <form>
          <v-row>
            <v-col cols="12">
              <v-card>
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
                    <v-col cols="12" sm="12" md="4" lg="4">
                      <v-autocomplete
                        outlined
                        dense
                        :disabled="!Purchase.supplier_id"
                        hide-details="auto"
                        v-model="Purchase.product"
                        item-text="name"
                        item-value="product_id"
                        :loading="productLoading"
                        :search-input.sync="searchProduct"
                        @input="GetBatchesForProducts(Purchase.product)"
                        :items="products"
                        :error-messages="productRequiredErrorMessage"
                        label="Choose Product"
                      >
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="11" sm="11" md="4" lg="4">
                      <v-autocomplete
                        outlined
                        hide-details="auto"
                        dense
                        v-model="Purchase.batch"
                        item-text="name"
                        item-value="id"
                        @input="RemoveValidation()"
                        :loading="batchLoading"
                        :items="selectedProductBatches"
                        :search-input.sync="searchProductBatch"
                        :error-messages="batchRequiredErrorMessage"
                        label="Choose Batch"
                      >
                      </v-autocomplete>
                    </v-col>
                    <v-col
                      cols="1"
                      sm="1"
                      md="2"
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
                    <v-col cols="12" lg="12" sm="12">
                      <v-data-table
                        :headers="headers"
                        :items="selectedProducts"
                        hide-default-footer
                        disable-pagination
                      >
                        <template
                          v-slot:item.damage="{ item }"
                          v-slot="{ errors }"
                          name="Damage"
                          rules="numeric"
                        ><div class="boxes">
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
                          </div>
                        </template>
                        <template
                          v-slot:item.discount="{ item }"
                          v-slot="{ errors }"
                          name="Discount"
                          rules="numeric"
                        >
                        <div class="boxes">
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
                        </div>
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
                              class="pt-3 "
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
                        <div class="boxes">
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
                          </div>
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
                      <v-row class="sub-section">
                        <v-col cols="4">
                          <v-text-field
                            v-model="Purchase.discountAmount"
                            @input="onInputDiscountAmount()
                            "
                            type="number"
                            dense
                            label="Discount Amount"
                            :error-messages="discountAmountErrorMessages"
                            outlined
                            :max="selectedProductsTotal -
                              Purchase.totalDiscountAmount"
                            class="pt-3"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="4"> </v-col>
                        <v-col cols="4" class="d-flex justify-end align-center">
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
                    </v-col>
                  </v-row>
               
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </form>
        <v-card class="lighten-12" v-if="false">
          <v-card-title>Discount</v-card-title>
          <v-container fluid>
            <v-row>
              <v-col cols="4">
                <v-text-field
                  v-model="Purchase.discountAmount"
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
            <v-card>
              <v-card-title>Note</v-card-title>
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
            <v-card>
              <v-card-title>Files</v-card-title>
              <v-container fluid>
                <v-row>
                  <v-col>
                    <FileUpload
                      :multiple="true"
                      size="2048"
                      v-model="selectedFiles"
                      showList="true"
                      ref="fileUpload"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>

        <v-card-actions class="pa-0">
          <v-spacer></v-spacer>
          <v-btn depressed small class="text-white btn_medium" @click="clear"
            >Clear</v-btn
          >
          <v-btn
            depressed
            small
            class="text-white btn_blue btn_medium w-100"
            @click="submit"
            >Submit</v-btn
          >
        </v-card-actions>
      </ValidationObserver>

      <BatchForm
        :visible="showScheduleForm"
        @conform="refreshBatches($event)"
        ref="batchform"
        :productbatch="ProductBatches"
        :productUnits="productUnits"
        :product="selectedProduct"
        @close="AddBatch($event)"
      />
    </v-container>
  </div>
</template>
<script>
import datePickComponent from "../../../components/base/DateComponent";
import { Purchase } from "../../../models/Purchase";
import { required, email, max, numeric } from "vee-validate/dist/rules";
import BatchForm from "../../Product/components/ProductBatchModal";
import { Product } from "../../../models/Product";

import { SupplierListViewModel } from "../../../models/View Models/Supplier";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
  withValidation,
} from "vee-validate";
import _ from "lodash";
import { AccountViewModel } from "../../../models/View Models/AccountViewModel";
import { ProductBatches } from "../../../models/View Models/ProductBatchViewModel";
import { ProductViewModel } from "../../../models/View Models/ProductViewModel";
import { ProductBatch } from "../../../models/ProductBatch";
import { PurchaseOrderViewModel } from "../../../models/View Models/PurchaseOrderViewModel";
import { PurchaseReturnViewModel } from "../../../models/View Models/PurchaseReturnViewModel";
import { PurchaseEntityModel } from "../../../models/EntityModels/Purchases/PurchaseEntityModel";
import { ProductBatchViewModel } from "../../../models/View Models/ProductBatchViewModel";
import * as moment from "moment/moment";
import FileUpload from "@/components/base/FileUpload";
import store from "../../../store/store";
extend("required", {
  ...required,
  message: "{_field_} is required",
});
extend("numeric", {
  ...numeric,
  message: "input must be numeric",
});
export default {
  data: () => ({
    selectedFiles: "",
    purchaseReturnErrorMessage:[],
    messages: [],
    errors: [],
    suppliers: [],
    searchPurchaseReturn: null,
    searchProduct: null,
    debitAccounts: [],
    discountAmountErrorMessages:[],
    batchRequiredErrorMessage: [],
    referenceLoading: false,
    searchProductBatch: null,
    warehouses: [],
    purchaseOrders: [],
    purchaseReturns: [],
    selectedPurchaseOrder: [],
    warehouseLoading: false,
    productLoading: false,
    batchLoading: false,
    selectedProductBatches: [],
    productRequiredErrorMessage: [],
    purchaseOrderErrorMessage:[],
    searchSupplier: null,
    searchWarehouse: null,
    searchPurchaseOrder: null,
    supplierLoading: false,
    selectedProducts: [],
    selectedPurchaseReturn: "",
    showScheduleForm: false,
    ProductBatches: new ProductBatch(),
    Purchase: new Purchase(),
    products: [],
    selectedProduct: "",
    purchaseOptions: [
      { value: "Purchase Order", name: " From Purchase Order" },
      { value: "Purchase Return", name: " From Purchase Return" },
      { value: "None", name: "None" },
    ],
    productUnits: [],
    isProductListValid: "",
    projectsLoading: false,
    PurchaseBatchesClonedDetails: [],

    paymentMethods: [
      { id: "1", name: "Cash" },
      { id: "2", name: "Card" },
      { id: "3", name: "Cheque" },
    ],
    items: [{ tab: "Payment", content: "this is Payment tab" }],
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
        width: "10%",
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
        width: "8.5%",
      },
      {
        text: "Discount Qty",
        value: "discount",
        align: "center",
        width: "8.5%",
      },
      {
        text: "Discount Amount",
        value: "discountAmount",
        align: "right",
        width: "12%",
      },
      {
        text: "Total",
        value: "total",
        align: "right",
        width: "8%",
      },
      {
        text: "",
        value: "action",
        align: "center",
        width: "6%",
      },
    ],
    selectedProductsTotal: 0,
  }),
  components: {
    ValidationProvider,
    ValidationObserver,
    datePickComponent,
    BatchForm,
    FileUpload,
  },

  methods: {
    onPurchaseTypeChanged() {
      this.selectedProducts=[];
      this.purchaseOrderErrorMessage=[];
      this.purchaseReturnErrorMessage=[];
      this.productRequiredErrorMessage=[];
      if (this.Purchase.type == "Purchase Order") {
        this.headers = [
          {
            text: "Product name",
            value: "name",
            width: "10%",
            align: "left",
          },
          {
            text: "Batch",
            value: "batch.name",
            width: "9%",
            align: "left",
          },

          {
            text: "unit",
            value: "unit",
            width: "15%",
            align: "center",
          },
          {
            text: "Unit Cost",
            value: "unitPrice",
            align: "center",
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
            width: "13%",
          },
          {
            text: "Received Qty",
            value: "received",
            align: "center",
            width: "13%",
          },
          {
            text: "Damage Qty",
            value: "damage",
            align: "center",
            width: "13%",
          },
          {
            text: "Discount Qty",
            value: "discount",
            align: "center",
            width: "10%",
          },
          {
            text: "Discount Amount",
            value: "discountAmount",
            align: "center",
            width: "13%",
          },
          {
            text: "Total",
            value: "total",
            align: "center",
            width: "10%",
          },
          {
            text: "",
            value: "action",
            align: "center",
            width: "6%",
          },
        ];
      } else {
        this.headers = [
          {
            text: "Product name",
            value: "name",
            align: "left",
            width: "10%",
          },
          {
            text: "Batch",
            value: "batch.name",
            align: "left",
            width: "10%",
          },

          {
            text: "unit",
            value: "unit",
            align: "center",
            width: "15%",
          },
          {
            text: "Unit Cost",
            value: "unitPrice",
            align: "center",
            width: "10%",
          },
          {
            text: "Discount Percentage",
            value: "discountPercentage",
            align: "center",
            width: "14%",
          },

          {
            text: "Received Qty",
            value: "received",
            align: "center",
            width: "10%",
          },
          {
            text: "Discount Qty",
            value: "discount",
            align: "center",
            width: "10%",
          },
          {
            text: "Damage Qty",
            value: "damage",
            align: "center",
            width: "10%",
          },
          {
            text: "Discount Amount",
            value: "discountAmount",
            align: "center",
            width: "10%",
          },
          {
            text: "Total",
            value: "total",
            align: "center",
            width: "10%",
          },
          {
            text: "",
            value: "action",
            align: "center",
            width: "6%",
          },
        ];
      }
    },
    sumDiscountField(key) {
      this.Purchase.totalDiscountAmount = this.selectedProducts.reduce(
        (a, b) => a + (b[key] || 0),
        0
      );
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
    sumField(key) {
      // sum data in give key (property)
      this.selectedProductsTotal = this.selectedProducts.reduce(
        (a, b) => a + (b[key] || 0),
        0
      );
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
        (product.uniterror = []), (this.productUnits = product.units);
        this.GetSelectedUnitPriceDetails(product, product.unit);
        product.disabled = false;
        product.discount = 0;
        product.discountPercentage = 0;
        product.id = 1;
        this.selectedProducts.unshift(_.cloneDeep(product));
        this.PurchaseBatchesClonedDetails.unshift(_.cloneDeep(product));
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
    deleteProduct(product) {
      this.PurchaseOrder.products.splice(
        this.PurchaseOrder.products.indexOf(product),
        1
      );

      this.selectProducts();
    },
    CreatePurchase() {
      this.isLoading = true;
      let error = false;
      this.selectedProducts.forEach((product) => {
        if (!product.unit.id > 0) {
          error = true;
          product.uniterror.push("Select unit");
        }
      });
      if (!error) {
        this.Purchase.products = this.selectedProducts;
        if (!this.Purchase.debit_account) {
          this.Purchase.debit_account = this.debitAccounts[0].id;
        }
        this.$store
          .dispatch(
            "purchase/CreatePurchase",
            new PurchaseEntityModel(this.Purchase)
          )
          .then((res) => {
            if (this.selectedFiles) {
              var fileId = res.data.id;
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
            this.$toast.success("Purchase created successfully");
            this.isLoading = false;
            this.$router.push(`/purchase/${res.data.id}`);
          })
          .catch((err) => {
            this.isLoading = false;
            this.messages = err.data.title;
          });
      }
    },
    RemoveValidation() {
      this.batchRequiredErrorMessage = [];
    },
    getSupplierByQuery(query = "") {
      this.supplierLoading = true;
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
          this.supplierLoading = false;
        })
        .catch((err) => {
          this.supplierLoading = false;
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
            else {
              item.receivedError = [];
              item.damageError = [];
            }
          });

          if (!error) {
            this.CreatePurchase();
          }
        } else {
          this.isProductListValid =
            "Please select at least one product and batch";
        }
      }
    },
    clear() {
      this.isProductListValid = "";
      // this.PurchaseOrder = new PurchaseOrderEntityModel();
      this.Purchase = new Purchase();
      this.$refs.fileUpload.removeAllItems();
      this.selectedProducts = [];

      this.$refs.fileUpload.this.$refs.observer.reset();
    },
    getWarehouseByQuery(query = "") {
      this.warehouseLoading = true;
      this.$store
        .dispatch("warehouse/GetWarehouse", { query: query, status: "active" })
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
    GetPurchaseOrders(query = "") {
      debugger
      this.referenceLoading = true;
      this.$store
        .dispatch("purchaseOrder/GetPurchaseOdersSearch", { query: query, status: "active" })
        .then((res) => {
          this.purchaseOrders = res.map((u, i, arr) => {
            u.index = i + 1;
            return new PurchaseOrderViewModel(u);
          });

          this.referenceLoading = false;
        })
        .catch((err) => {
          this.referenceLoading = false;
          this.messages = err.data.name;
        });
    },
    GetPurchaseReturnSearch(query = "") {
      this.referenceLoading = true;
      this.$store
        .dispatch("purchaseOrder/GetPurchaseReturnSearch", { query: query, status: "active" })
        .then((res) => {
          this.purchaseReturns = res.map((u, i, arr) => {
            u.index = i + 1;
            return new PurchaseReturnViewModel(u);
          });

          this.referenceLoading = false;
        })
        .catch((err) => {
          this.referenceLoading = false;
          this.messages = err.data.name;
        });
    },
    GetProductsForSelectedReferenceForPurchaseOrder(referenceId) {
      this.purchaseOrderErrorMessage=[];
      this.selectedPurchaseOrder = this.purchaseOrders.find(
        (item) => item.id === referenceId
      );
      if (this.selectedPurchaseOrder) {
        this.searchSupplier = this.selectedPurchaseOrder.suppliers.name;
        this.searchWarehouse = this.selectedPurchaseOrder.warehouses.name;
        this.products = this.selectedPurchaseOrder.products;
        this.Purchase.supplier_id = this.selectedPurchaseOrder.supplier_id;
        this.Purchase.wareHouse_id = this.selectedPurchaseOrder.wareHouse_id;
        this.selectedProducts = [];
      } else {
        this.products = [];
      }
    },
    GetProductsForSelectedReferenceForPurchaseReturn(referenceId) {
      this.purchaseReturnErrorMessage=[];
      this.selectedPurchaseReturn = this.purchaseReturns.find(
        (item) => item.id === referenceId
      );
      if (this.selectedPurchaseReturn) {
        this.searchSupplier = this.selectedPurchaseReturn.suppliers.name;
        this.searchWarehouse = this.selectedPurchaseReturn.warehouses.name;
        this.products = this.selectedPurchaseReturn.products;
        this.Purchase.supplier_id = this.selectedPurchaseReturn.supplier_id;
        this.Purchase.wareHouse_id = this.selectedPurchaseReturn.wareHouse_id;
        this.selectedProducts = [];
      } else {
        this.products = [];
      }
    },
    GetBatchesForProducts(id) {
      let product = this.products.find((item) => item.product_id === id);
      this.productRequiredErrorMessage = [];
      this.productUnits = product.units;
      this.selectedProduct = product;
      this.GetProductBatches();
    },
    removeProduct(product) {
      this.selectedProducts.splice(
        this.selectedProducts.findIndex((item) => item.id === product.id),
        1
      );
      this.RemoveDuplicateUnitForSameBatch(product);

      this.CalculateTotal();
    },
    dulpicateBatch(product) {
      let item = _.cloneDeep(product);
      item.count = item.count + 1;
      item.unit = { id: 0 };
      item.unitPrice = null;
      item.received = 1;
      item.discountError = [];
      item.discountPercentError = [];
      item.discount = 0;
      item.discountPercentage = [];
      item.damage = 0;
      item.total = null;
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
    GetProductBatches(value = "") {
      let selectedBatches = [];
      this.selectedProducts
        .filter((p) => p.product_id == this.Purchase.product)
        .forEach((p) => {
          if (p.batch) selectedBatches.push(p.batch.id);
        });
      this.batchLoading = true;
      this.$store
        .dispatch("product/GetProductBatches", {
          id: this.Purchase.product,
          query: value,
          selectedBatches: selectedBatches,
        })
        .then((res) => {
          this.selectedProductBatches = res.data.data.map((u, i, arr) => {
            return new ProductBatchViewModel(u);
          });
          this.batchLoading = false;
        })
        .catch((err) => {
          this.batchLoading = false;
          this.messages = err.data.title;
        });
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
    AddBatch(credentials) {
      this.$store
        .dispatch("product/AddProductBatch", credentials)
        .then((res) => {
          this.succeeed = true;
          this.$toast.success("Batch added  successfully");
          this.showScheduleForm = false;

          this.GetProductBatches();
        })
        .catch((err) => {
          this.messages.push(err.data.title);
          this.$toast.error("Edit product failed");
        });
    },
    increaseInput(item) {
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

    CalculateTotal() {
      let sum = 0;
      this.selectedProducts.forEach((product) => {
        console.log("DDDDDDDD", this.Purchase.totalDiscountAmount);
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
    GetSelectedUnitPriceDetails(product, unit) {
      product.uniterror = [];
      var selectedUnit = product.batch.unitPriceDetails.find(
        (i) => unit.id === i.unit
      );
      if (selectedUnit) {
        product.unitPrice = selectedUnit.purchasePrice;
      }
      this.RemoveDuplicateUnitForSameBatch(product);
      this.CalculateTotal();
    },
    refreshBatches(event) {
      this.GetProductBatches();
      this.Purchase.batch = event.id;
    },
    RemoveDuplicateUnitForSameBatch(item) {
      let sameBatches = this.selectedProducts.filter(
        (p) => p.batch.id == item.batch.id
      );
      let batchDetail = _.cloneDeep(
        this.PurchaseBatchesClonedDetails.find(
          (p) => p.product_id == item.product_id
        )
      );
      let units = [];
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
      sameBatches.forEach((batch) => {
        const clonedBatch = _.cloneDeep(batch);
        let unitsCloned = _.cloneDeep(batchDetail.units);
        units.forEach((u) => {
          if (clonedBatch.unit.id !== u.id) {
            const index = unitsCloned.findIndex((i) => i.id == u.id);
            if (index != -1) {
              unitsCloned.splice(index, 1);
            }
          }
        });
        batch.units = unitsCloned;
      });
    },
    GetProductDetails(id) {
      this.$store
        .dispatch("product/GetProductById", id)
        .then((res) => {
          this.selectedProduct = new ProductViewModel(res.data);
          this.productUnits = this.selectedProduct.units;
          if (store.state.sitesetting && store.state.sitesetting.siteSettings) {
            this.productUnits.map((productUnit) => {
              productUnit.profit_margin_percentage =
                store.state.sitesetting.siteSettings.profit_margin_percentage;
            });
          }
        })
        .catch((err) => {
          this.messages.push(err.data.title);
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
          this.Purchase.debit_account = this.debitAccountsearch[0];
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.messages = err.data.title;
        });
    },
    LoadAllProductsToAdd() {
      if (this.Purchase.isWithoutPurchaseOrder) {
        this.getProductsByQuery();
      } else {
        this.GetProductsForSelectedReference(this.Purchase.referenceId);
      }
    },
    onChangeSupplier(){
      this.getProductsByQuery();
      this.selectedProducts=[];
    },
    GetSiteSetting() {
      this.$store
        .dispatch("sitesetting/SiteSettingView", 1)
        .then((res) => {
          self.siteSetting = res.data;
          this.searchWarehouse = self.siteSetting.wareHouse.name;
          this.Purchase.wareHouse_id = self.siteSetting.wareHouse.id;
        })
        .catch((err) => {
          this.messages = err.data.title;
        });
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
    getProductsByQuery(query = "") {
      this.productLoading = true;
      this.$store
        .dispatch("product/GetProduct", {
          query: query,
        })
        .then((res) => {
          if (this.Purchase.supplier_id && this.Purchase.type == "None") {
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

          this.productLoading = false;
        })
        .catch((err) => {
          this.productLoading = false;
          this.messages = err.data.title;
        });
    },
  },

  created() {
    this.$barcodeScanner.init(this.onScanBarcode);

    this.GetPurchaseOrders();
    this.GetPurchaseReturnSearch();
    this.getSupplierByQuery();
    this.getWarehouseByQuery();
    this.GetDebitAccountsearch();
    this.GetSiteSetting();
  },
  watch: {
    searchWarehouse(value) {
      if (!value) {
        this.getWarehouseByQuery("");
      }
      this.getWarehouseByQuery(value);
    },
    searchSupplier(value) {
      if (!value) {
        this.getSupplierByQuery("");
      }
      this.getSupplierByQuery(value);
    },
    searchPurchaseOrder(value) {
      if (!value) {
        this.GetPurchaseOrders("");
      }
      this.GetPurchaseOrders(value);
    },
    searchPurchaseReturn(value) {
      if (!value) {
        this.GetPurchaseReturnSearch("");
      }
      this.GetPurchaseReturnSearch(value);
    },
    searchProduct(value) {
      if (!value) {
        this.getProductsByQuery("");
      }
      this.getProductsByQuery(value);
    },
    searchProductBatch(value) {
      debugger;
      if (!value) {
        this.GetProductBatches("");
      }
      this.GetProductBatches(value);
    },
  },
};
</script>

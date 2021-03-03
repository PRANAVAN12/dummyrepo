<template>
  <div>
    <PageTitle
      title=" Product Batch View"
      :backBtn="true"
      :permission="'Product Edit'"
    />

    <v-container fluid>
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="6" lg="6">
          <v-card class="lighten-12">
            <v-card-title>Batch Details</v-card-title>
            <v-container fluid>
              <v-row>
                <v-col cols="6" xs="12" sm="12" md="12" lg="6">
                  <h4>Batch Name :</h4>
                </v-col>
                <v-col cols="6" xs="12" sm="12" md="12" lg="6">
                  <v-chip label>{{ this.producBatch.name }}</v-chip>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" xs="12" sm="12" md="12" lg="6">
                  <h4>Manufacture Date</h4>
                </v-col>
                <v-col cols="6" xs="12" sm="12" md="12" lg="6">
                  <v-chip label>{{
                    this.producBatch.manufacureDate | formatDate
                  }}</v-chip>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" xs="12" sm="12" md="12" lg="6">
                  <h4>Expiry Date :</h4>
                </v-col>
                <v-col cols="6" xs="12" sm="12" md="12" lg="6">
                  <v-chip label>{{
                    this.producBatch.expiryDate | formatDate
                  }}</v-chip>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="6" lg="6">
          <v-card class="lighten-12">
            <v-card-title> Unit Price Details </v-card-title>
            <v-container fluid>
              <template max-height="800px" class="scroll">
                <v-container
                  v-for="unitPriceDetail in producBatch.unitPriceDetails"
                >
                  <v-card-subtitle
                    class="px-0 pb-0 d-flex justify-space-between align-center"
                  >
                    <h2>
                      {{ unitPriceDetail.name }}
                    </h2>
                    <div class="qr-overlay"></div>
                    <v-tooltip v-model="unitPriceDetail.printTootTip" top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          @click.stop="openPrintOptions(unitPriceDetail)"
                          icon
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon color="grey lighten-1">mdi-printer</v-icon>
                        </v-btn>
                      </template>
                      <span>Print Barcode</span>
                    </v-tooltip>
                  </v-card-subtitle>
                  <v-divider></v-divider>

                  <v-row>
                    <v-col>
                      <v-row>
                        <v-col cols="12" sm="12" md="12" lg="6">
                          <h4 class="purchasing-unit">Purchasing Price</h4>
                        </v-col>
                        <v-col cols="12" xs="12" sm="12" md="12" lg="6">
                          <v-chip>{{ unitPriceDetail.purchasePrice }}</v-chip>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" xs="12" sm="12" md="12" lg="6">
                          <h4 class="selling-unit">Selling Price</h4>
                        </v-col>
                        <v-col cols="12" xs="12" sm="12" md="12" lg="6">
                          <v-chip> {{ unitPriceDetail.sellingPrice }}</v-chip>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="12" md="6" lg="6">
                      <!-- <v-card> -->
                      <div >
                        <Barcode
                        id="qr-code"
                          :barcode-value="unitPriceDetail.barcode"
                          :height="70"
                          :width="2"
                           class="test1"
                        />
                      </div>

                      <!-- </v-card> -->
                    </v-col>
                  </v-row>

                  <!-- <v-divider></v-divider> -->
                </v-container>
              </template>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- <v-row>
      <v-col cols="12" xs="12" sm="12" md="12" lg="12">
        <v-container fluid>
          <v-tabs horizontal background-color="primary" dark>
            <v-tab> Purchases </v-tab>
            <v-tab> Sales </v-tab>
            <v-tab-item>
              <v-container fluid>
                <BatchPurchaseList />
              </v-container>
            </v-tab-item>

            <v-tab-item> </v-tab-item>
          </v-tabs>
        </v-container>
      </v-col>
    </v-row> -->

    <v-navigation-drawer
      app
      width="500px"
      v-model="drawer"
      absolute
      temporary
      right
    >
      <v-card style="height: 100%">
        <v-card-title> Printing Options </v-card-title>
        <v-container>
          <v-row class="pt-5">
             <v-col align-self="center" cols="4 py-0">
              <v-checkbox
                v-model="barcodePrintDetails.barcodeNumber"
                label="Barcode"
                color="info"
                :value="barcodePrintDetails.barcodeNumber"
                hide-details
              ></v-checkbox>
              
            </v-col>
            <v-col align-self="center" cols="4 py-0">
              <v-checkbox
                v-model="barcodePrintDetails.name"
                label="Name"
                color="info"
                :value="barcodePrintDetails.name"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col align-self="center" cols="4 py-0">
              <v-checkbox
                v-model="barcodePrintDetails.price"
                label="Price"
                color="info"
                :value="barcodePrintDetails.price"
                hide-details
              ></v-checkbox>
            </v-col>
           
          </v-row>
          <v-row>
            
            <v-col align-self="center" cols="4 py-0">
              <v-checkbox
                v-model="barcodePrintDetails.batch"
                label="Batch"
                color="info"
                :value="barcodePrintDetails.batch"
                hide-details
              ></v-checkbox>
              
            </v-col>
             <v-col align-self="center" cols="4 py-0">
              <v-checkbox
                v-model="barcodePrintDetails.orgname"
                label="Organization"
                color="info"
                :value="barcodePrintDetails.orgname"
                hide-details
              ></v-checkbox>
              
            </v-col>
             <v-col align-self="center" cols="4 py-0">
              <v-checkbox
                v-model="barcodePrintDetails.orgaddress"
                label="Address"
                color="info"
                :value="barcodePrintDetails.orgaddress"
                hide-details
              ></v-checkbox>
              
            </v-col>
          </v-row>
          <v-row>
             <v-col align-self="center" cols="4 py-0">
              <v-checkbox
                v-model="barcodePrintDetails.orgphone"
                label="Phone"
                color="info"
                :value="barcodePrintDetails.orgphone"
                hide-details
              ></v-checkbox>
              
            </v-col>
          </v-row>
          <v-row>
            
          </v-row>
          <v-row> <v-col></v-col></v-row>
          <v-row align="center" justify="center">
            <Barcode
              :barcodeNumber="barcodePrintDetails.barcodeNumber"
              :barcode-value="selectedbarcode.barcode"
              :height="70"
              :width="2"
            />
          </v-row>
          <v-row
            align="center"
            justify="center"
            v-if="barcodePrintDetails.name"
          >
            Name: {{ product.name }}
          </v-row>
          <v-row
            justify="center"
            align="center"
            v-if="barcodePrintDetails.price"
          >
            Price: Rs. {{ selectedbarcode.sellingPrice }}
          </v-row>
           <v-row
            justify="center"
            align="center"
            v-if="barcodePrintDetails.batch"
          >
          <div v-for="batch in product.batches" :key="batch">
            Batch: {{ batch.batch }}
          </div>
          </v-row>
           <v-row
            align="center"
            justify="center"
            v-if="barcodePrintDetails.orgname"
          >
            Organization: {{ organization.name }}
          </v-row>
           <v-row
            align="center"
            justify="center"
            v-if="barcodePrintDetails.orgaddress"
          >
            Address: {{ organization.address }}
          </v-row>
            <v-row
            align="center"
            justify="center"
            v-if="barcodePrintDetails.orgphone"
          >
            TEL: {{ organization.phone_number }}\{{ organization.Tel_phone_number}}
          </v-row>
          <!-- <v-row class="pt-5">
            <v-col align-self="center" cols="12 py-0">
              <v-autocomplete
                v-model="batchprint.papersize"
                :items="paperstyle"
                item-text="name"
                item-value="id"
                outlined
                dense
                hide-details="auto"
                label="Style *"
              ></v-autocomplete>
            </v-col>
          </v-row> -->
          <v-row class="pt-5">
            <v-col align-self="center" cols="12 py-0">
              <v-text-field
                type="number"
                v-model="batchprint.noOfBarcode"
                dense
                outlined
                hide-details="auto"
                label="Number of Barcode"
                min="0"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="pt-5" >
            <v-col align-self="center" cols="6 py-0">
              <v-text-field
                type="number"
                v-model="batchprint.height"
                dense
                outlined
                hide-details="auto"
                label="Height"
                min="0"
                suffix="mm"
              ></v-text-field>
            </v-col>
            <v-col align-self="center" cols="6 py-0">
              <v-text-field
                type="number"
                v-model="batchprint.width"
                dense
                outlined
                hide-details="auto"
                label="Width"
                min="0"
                suffix="mm"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="pt-8">
             
            <v-col align-self="center" cols="6 py-0">
              <v-btn small class="text-white btn_gray w-100 d-none d-sm-flex" v-print="printQr"
                >Print <v-icon right dark> mdi-printer </v-icon></v-btn
              >
              <v-container fluid>
                <BarCodeTemplate
                  v-if="batchprint.noOfBarcode!=0"
                  id="barcode"
                  :datas="barcodePrintDetails"
                  :barcode="selectedbarcode"
                  :printview="printview"
                  :printbarcode="batchprint"
                  :product="product"
                  :organization="organization"
                  :selectedbarcode="selectedbarcode"
                  class="test1"
                  :height="70"
                  style="display: none"
                  :width="2"
                >
                </BarCodeTemplate>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { ProductBatchViewModel } from "@/models/View Models/ProductBatchViewModel";
import BarcodePrintOptionModal from "@/modules/shared/modals/BarcodePrintOptionModal";
import BatchPurchaseList from "@/modules/Product/components/BatchPurchaseList";

import datePickComponent from "../../../components/base/DateComponent";

import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import { ProductViewModel } from "@/models/View Models/ProductViewModel";

export default {
  data: () => ({
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false,
    isProductListValid: "",
    barcodePrintDetails: {
      price: true,
      barcode: true,
      tax: true,
      barcodeNumber: true,
      SKU: true,
      name: true,
      batch:true,
      orgname:true,
      orgaddress:true,
      orgphone:true
    },
     organization: {
      id: "",
      name: "",
      phone_number: "",
      email: "",
      Tel_phone_number: "",
      address: "",
      website: "",
    },
    dialog: false,
    show: false,
    drawer: false,
    product: "",
    producBatch: "",
    selectedbarcode: 0,
    barcodeSymbology: [
      { id: "1", name: "0001" },
      { id: "2", name: "0002" },
      { id: "4", name: "0003" },
    ],
    units: [
      { id: 1, name: "Kg" },
      { id: 2, name: "L" },
      { id: 3, name: "Bucket" },
    ],
    paperstyle: [
      // {
      //   name: "Select Style",
      //   id: 1,
      // },
      // {
      //   name: "40 per sheet (a4) (1.799 x 1.003)",
      //   id: 2,
      // },
      // {
      //   name: "30 per sheet (2.625 x 1)",
      //   id: 3,
      // },
      // {
      //   name: "24 per sheet (a4) (2.48 x 1.334)",
      //   id: 4,
      // },
      // {
      //   name: "20 per sheet (4 x 1)",
      //   id: 5,
      // },
      // {
      //   name: "18 per sheet (a4) (2.5 x 1.835)",
      //   id: 6,
      // },
      // {
      //   name: "14 per sheet (4 x 1.33)",
      //   id: 7,
      // },
      // {
      //   name: "12 per sheet (a4) (2.5 x 2.834)",
      //   id: 8,
      // },
      // {
      //   name: "10 per sheet (4 x 2)",
      //   id: 9,
      // },
      {
        name: "Continuous feed",
        id: 1,
      },
    ],
    batchprint: {
      papersize: "",
      barcode: 1,
      height: 60,
      width: 80,
      noOfBarcode:1
    },
  }),

  name: "AddBatch",
  updated: function () {
    console.log(this.visible);
  },

  components: {
    ValidationProvider,
    ValidationObserver,
    datePickComponent,
    BarcodePrintOptionModal,
    BatchPurchaseList,
  },
  filters: {},
  methods: {
    GetProductDetails() {
      let productId = this.$route.params.id;
      this.$store
        .dispatch("product/GetProductById", productId)
        .then((res) => {
          this.product = res.data;
        })
        .catch((err) => {
          this.messages.push(err.data.title);
        });
    },
    GetSingleBatch() {
      const product_id = this.$route.params.id;
      const batch_id = this.$route.params.batch_id;
      this.$store
        .dispatch("product/GetProductBatch", {
          product_id: product_id,
          batch_id: batch_id,
        })
        .then((res) => {
          this.producBatch = new ProductBatchViewModel(res.data);
          this.producBatch.unitPriceDetails.forEach((detail) => {
            detail.printTootTip = false;
          });
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.messages = err.data.title;
        });
    },
    openPrintOptions(details) {
      this.selectedbarcode = details;
      this.drawer = true;
      this.batchprint.barcode = 1;
      this.batchprint.height = 60;
      this.batchprint.width = 80;
    },
    OrganizationView() {
      var id = 1;
      this.$store
        .dispatch("sitesetting/OrganizationView", id)
        .then((res) => {
          this.organization = res.data;
        })
        .catch((err) => {
          this.messages = err.data.title;
          this.isLoading = false;
        });
    },
  },
  created() {
    this.GetSingleBatch();
    this.GetProductDetails();
    this.OrganizationView();
  },
  computed: {
    printQr() {
      return {
        id: "barcode",
        popTitle: "Print Barcodes",
      };
    },
    printview: function () {
      var a4size = this.batchprint.papersize;
      a4size = 297 * 210;
      var barcodesize = this.batchprint.height * this.batchprint.width;
      var numberofbarcodeperpage = a4size / barcodesize;
      return numberofbarcodeperpage;
    },
  },
};
</script>

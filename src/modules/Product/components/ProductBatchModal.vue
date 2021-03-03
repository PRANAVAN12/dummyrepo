<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="1000">
      <custom-modal
        :title="productbatch.id ? 'Edit Batch' : 'Add Batch'"
        @onSubmit="saveBatch"
        @onClose="cancelBatch"
        :isLoading="isLoading"
      >
        <ValidationObserver ref="observer" v-slot="{ validate, reset }">
          <v-row>
            <v-col cols="12" sm="12" md="12" lg="3">
              <ValidationProvider
                v-slot="{ errors }"
                name="Batch name"
                rules="required"
                vid="name"
              >
                <v-text-field
                  v-model="productbatch.name"
                  :disabled="productbatch.id"
                  class="numberInput"
                  outlined
                  dense
                  :error-messages="errors"
                  label="Name"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="3">
              <ValidationProvider name="Manufacture date">
                <datePickComponent
                  slot-scope="{ errors }"
                  v-model="productbatch.manufacureDate"
                  labelname="Manufacture date"
                  :error-messages="errors"
                />
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="3">
              <ValidationProvider name="Expiry date">
                <datePickComponent
                  :disabled="productbatch.has_expiry_date"
                  slot-scope="{ errors }"
                  v-model="productbatch.expiryDate"
                  labelname="Expiry date"
                  :error-messages="errors"
                />
              </ValidationProvider>
              <div
                v-if="
                  !productbatch.has_expiry_date &&
                  productbatch.expiryDate < productbatch.manufacureDate
                "
                class="selling-price-warning"
              >
                <v-icon>mdi-alert-box-outline</v-icon>expiry Date should be
                greater than or equal to manufature date
              </div>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="3">
              <v-checkbox
                color="#002db3"
                label="Not set expiry date"
                v-model="productbatch.has_expiry_date"
              ></v-checkbox>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-card-title class="custom-card-title"
                >Unit details
              </v-card-title>
            </v-col>
          </v-row>
          <v-row v-for="(productUnit, i) in productUnits" :key="i">
            <v-col
              cols="12"
              sm="12"
              md="6"
              lg="3"
              :class="` ${
                productUnit.isPurchasingUnit
                  ? 'purchasing-unit'
                  : 'selling-unit'
              }`"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="Batch unit"
                rules="required"
              >
                <v-text-field
                  v-model="productUnit.name"
                  disabled
                  outlined
                  dense

                  :error-messages="errors"
                  :label="
                    productUnit.isPurchasingUnit
                      ? 'Purchasing and selling unit'
                      : 'Selling unit'
                  "
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="3">
              <v-text-field
                label="Barcode"
                append-icon="mdi-sync"
                v-model="productUnit.barcode"
                :disabled="!productUnit.isNew && productbatch.id"
                @input="productUnit.barcodeError = []"
                v-on:blur="checkBarcode(productUnit)"
                :error-messages="productUnit.barcodeError"
                outlined
                @click:append="generateCode(productUnit)"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="6"
              lg="2"
              class="purchasing-unit"
              :value="true"
              v-if="productUnit.isPurchasingUnit"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="Purchasing Price"
                rules="required"
              >
               <!-- :rules="[valueNumberRule]" -->
                <v-text-field
                    :disabled="productbatch.id && !productUnit.isNew"
                  v-model="productUnit.purchasePrice"
                  :error-messages="productUnit.purchasePriceError"
                  @input="CalculateMargin('purchaseprice', productUnit)"
                  class="numberInput"
                  type="number"
                  outlined
                  min="1"
                  dense
                  label="Purchase price"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="6"
              lg="2"
              class="purchasing-unit"
              :value="true"
              v-if="productUnit.isPurchasingUnit"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="ProfitMargin"
                rules="required"
              >
                <v-text-field
                  label="Profit margin"
                  v-model="productUnit.profit_margin_percentage"
                  dense
                  outlined
                  type="number"
                  append-icon="mdi-percent"
                  @input="CalculateMargin('margin', productUnit)"
                  :error-messages="productUnit.marginError"
                  required
                >

                </v-text-field>
                <span>

                </span>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="2" class="selling-unit">
              <ValidationProvider
                v-slot="{ errors }"
                name="Selling price"
                rules="required"
              >
              <!-- :rules="[valueNumberRule]" -->
                <v-text-field

                  v-model="productUnit.sellingPrice"
                  :error-messages="productUnit.sellingPriceError"
                  class="numberInput"
                  outlined
                  min="1"
                  @input="CalculateMargin('price', productUnit)"
                  type="number"
                  dense
                  label="Selling price"
                ></v-text-field>
              </ValidationProvider>
              <div
                v-if="parseInt(productUnit.purchasePrice) > parseInt(productUnit.sellingPrice)"
                class="selling-price-warning"
              >
                <v-icon>mdi-alert-box-outline</v-icon>Selling price is less than
                purchase price
              </div>
            </v-col>
          </v-row>
        </ValidationObserver>
      </custom-modal>
    </v-dialog>
  </v-row>
</template>

<script>
import { ProductBatch } from "../../../models/ProductBatch";
import datePickComponent from "../../../components/base/DateComponent";

import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

export default {
  data: () => ({
    valueNumberRule: (v) => {
      if (!v.trim()) return true;
      if (!isNaN(parseFloat(v)) && v >= 0) return true;
      return "Value can not be negative";
    },
    dialog: false,
    show: false,
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
    isLoading: false,
  }),

  name: "AddBatch",
  updated: function () {
    console.log(this.visible);
  },
  props: {
    product: {
      type: Object,
      default: {},
    },
    productUnits: {
      type: Array,
      default: [],
    },
    productbatch: {
      type: Object,
      default: new ProductBatch(),
    },
  },
  components: { ValidationProvider, ValidationObserver, datePickComponent },

  methods: {
    updateBarcode(value) {},
    openModal() {
      this.show = true;
    },
    cancelBatch() {
      this.show = false;
      this.$emit("conform", "");
    },
    async checkBarcode(unit) {
      let result = await this.checkBarcodeDuplicate(unit.barcode);
      if (result == true) {
        unit.barcodeError = []
        unit.barcodeError.push('Duplicate Barcode Found')
      }
    },
    CalculateMargin(type, productUnit) {
      if (type == "margin") {
        productUnit.sellingPrice =
          (parseInt(productUnit.purchasePrice) *
          (
            (parseInt(productUnit.profit_margin_percentage) + 100) /
            100
          )).toFixed(2);
      } else if (type == "price") {
        productUnit.profit_margin_percentage = (
          ((parseInt(productUnit.sellingPrice) -
            parseInt(productUnit.purchasePrice)) /
            parseInt(productUnit.purchasePrice)) *
          100
        )
        debugger
        if((productUnit.profit_margin_percentage%1!=0)){
          productUnit.profit_margin_percentage=productUnit.profit_margin_percentage.toFixed((2))
        }
        if((productUnit.profit_margin_percentage%1==0))
        {
          productUnit.profit_margin_percentage=parseInt(productUnit.profit_margin_percentage)
        }

        if (productUnit.profit_margin_percentage < 0) {
          productUnit.profit_margin_percentage = 0;
        }
      }
      else if(type=="purchaseprice")
      {
        if( productUnit.profit_margin_percentage>0)
        {
         productUnit.sellingPrice= ((productUnit.profit_margin_percentage+100)/100)*productUnit.purchasePrice
           if((productUnit.sellingPrice%1!=0)){
          productUnit.sellingPrice=productUnit.sellingPrice.toFixed((2))
        }
        }
      
      
        
      }
      if (productUnit.sellingPrice > 0) {
        productUnit.sellingPriceError = [];
      }
      if (productUnit.purchasePrice > 0) {
        productUnit.purchasePriceError = [];
      }
      if (productUnit.profit_margin_percentage >= 0) {
        productUnit.marginError = [];
      }
    },
    generateCode(productUnit) {
      productUnit.barcodeError = [];
      productUnit.barcode = String(new Date().getTime());
    },
    async checkBarcodeDuplicate(code) {
      let found=false;
      await this.$store
          .dispatch("product/CheckBarcodeIsUniq", code)
          .then((res) => {
            if (res.status) {
             found=true
            }

          })
          .catch((err) => {
            found=false

          });
      return found;
    },
    async saveBatch() {
      
      const isValid = await this.$refs.observer.validate();
      let error = false;
      for (let u of this.productUnits) {
        console.log('STARTTINGGG')
        if(u.barcode && u.isNew)
        {
          console.log('Barcode Checkkk')
          let isDuplicate= await this.checkBarcodeDuplicate(u.barcode);
          console.log('Barcode Checkkk',isDuplicate)
          if(isDuplicate)
          {
            console.log('YESSS DUPLICATEEE')
            u.barcodeError = [];
            error = true;
            u.barcodeError.push("Barcode already found");
            console.log('YESSS pushinggg',u.barcodeError)
          }
        }
        if (!u.barcode) {
          u.barcodeError = [];
          error = true;
          u.barcodeError.push("Barcode is required");
        }
        if(u.purchasePrice<=0 && u.isPurchasingUnit)
        {
          u.purchasePriceError=[];
          error=true;
          u.purchasePriceError.push('Purchase price should be greater than 0')
        }
        if (u.sellingPrice <= 0) {
          u.sellingPriceError = [];
          error = true;
          u.sellingPriceError.push("Selling price should be greater than 0");
        }
        if(u.profit_margin_percentage<0 && u.isPurchasingUnit)
        {
          u.marginError=[];
          error=true;
          u.marginError.push('Margin should be greater  than or equal 0')
        }



      }
      console.log('FInal',this.productUnits)
      if (isValid && !error) {
        if(this.product.unit)
        {
          this.productbatch.defaultUnitId=this.product.unit.id
        }
        if(this.product.defaultUnit)
        {
          this.productbatch.defaultUnitId=this.product.defaultUnit.id
        }
        this.isLoading = true;
        this.productbatch.productBachUnitDetails = this.productUnits;
        this.productbatch.productId = this.product.id;
        if (this.productbatch.id) {
          await this.$store
            .dispatch("product/EditProductBatch", this.productbatch)
            .then((res) => {
              this.isLoading = false;
              this.show = false;
              this.$toast.success("Product batch edited successfully");
              this.$emit("conform", res.data);
            })
            .catch((err) => {
              this.isLoading = false;
              this.$refs.observer.setErrors(err.data.error);
            });
        } else {
          this.$store
            .dispatch("product/AddProductBatch", this.productbatch)
            .then((res) => {
              this.isLoading = false;
              this.show = false;
              this.$toast.success("Product batch added successfully");
              this.$emit("conform", res.data);
            })
            .catch((err) => {
              this.isLoading = false;
              this.$refs.observer.setErrors(err.data.error);
            });
        }
      }
    },
  },
};
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="800px">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          <span class="headline font-weight-lighter">{{productbatch.id?'EDIT BATCH':' ADD BATCH'}}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <ValidationObserver ref="observer" v-slot="{ validate, reset }">
              <v-row>
                <v-col cols="6">
                  <ValidationProvider v-slot="{ errors }" name="Batch name" rules="required">
                    <v-text-field
                      v-model="productbatch.name"
                      class="numberInput"
                      outlined
                      dense
                      :error-messages="errors"
                      label="Name"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
               <v-col cols="6">
                  <ValidationProvider name="Manufacture date">
                    <datePickComponent
                      slot-scope="{errors}"
                      v-model="productbatch.manufacureDate"
                      labelname="Manufacture Date"
                      :error-messages="errors"
                    />
                  </ValidationProvider>
                </v-col>
                <v-col cols="6">
                  <ValidationProvider name="Expiry date">
                    <datePickComponent
                      slot-scope="{errors}"
                      v-model="productbatch.expiryDate"
                      labelname="Expiry Date"
                      :error-messages="errors"
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-flex class="ma-2 font-weight-medium bg-light pa-3">Price Details For Every unit</v-flex>
              </v-row>
              <v-row v-for="(productUnit, i) in productUnits" :key="i">
                <v-col cols="3">
                  <ValidationProvider v-slot="{ errors }" name="Batch unit" rules="required">
                    <v-text-field
                      v-model="productUnit.name"
                      class="numberInput"
                      disabled
                      outlined
                      dense
                      :error-messages="errors"
                      label="Batch Unit"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="3">
                  <ValidationProvider v-slot="{ errors }" name="Barcode">
                    <v-autocomplete
                      v-model="productbatch.barcode"
                      item-text="name"
                      item-value="id"
                      outlined
                      dense
                      :items="barcodeSymbology"
                      :error-messages="errors"
                      label="Select BarCode Symbology *"
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>
                <v-col cols="3">
                  <ValidationProvider v-slot="{ errors }" name="Purchasing Price" rules="required">
                    <v-text-field
                      v-model="productUnit.purchasePrice"
                      class="numberInput"
                      type="number"
                      outlined
                      dense
                      :error-messages="errors"
                      label="Purchase Price"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="3">
                  <ValidationProvider v-slot="{ errors }" name="Selling price" rules="required">
                   <currency-input v-model="productUnit.sellingPrice" />
                    <v-text-field
                      v-model="productUnit.sellingPrice"
                      class="numberInput"
                      outlined
                      type="number"
                      dense
                      :error-messages="errors"
                      label="Selling Price"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
            </ValidationObserver>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed small class="text-white btn_medium" @click.stop="show = false">Close</v-btn>
          <v-btn depressed small class="text-white btn_blue btn_medium w-100"  @click="saveBatch()">Submit</v-btn>
        </v-card-actions>
      </v-card>
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
    openModal() {
      this.show = true;
    },
    async saveBatch() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.show = false;
        this.productbatch.productBachUnitDetails = this.productUnits;
        this.productbatch.productId = this.product.id;
        console.log(
          "dcshbd-------------------------------------",
          this.productbatch
        );
        if (this.productbatch.id) {
          this.$store
            .dispatch("product/EditProductBatch", this.productbatch)
            .then((res) => {
              this.$toast.success("Product batch edited successfully");
              this.$emit("conform", "");
            })
            .catch((err) => {
              this.messages.push(err.data.title);
            });
        } else {
          // Save Batch
          this.$store
            .dispatch("product/AddProductBatch", this.productbatch)
            .then((res) => {
              this.$toast.success("Product batch added successfully");
              this.$emit("conform", "");
            })
            .catch((err) => {
              this.messages.push(err.data.title);
            });
        }
      }
    },
  },
};
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline font-weight-lighter">INCLUDE IN PRINT</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-checkbox
                  v-model="barcodePrintDetails.price"
                  label="Price"
                  color="#002db3"
                  value="price"
                  hide-details
                ></v-checkbox>
              </v-col>
              <v-col cols="6">
                <v-checkbox
                  v-model="barcodePrintDetails.barcode"
                  label="info"
                  color="#002db3"
                  value="barcode"
                  hide-details
                ></v-checkbox>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-checkbox
                  v-model="barcodePrintDetails.tax"
                  label="info"
                  color="#002db3"
                  value="tax"
                  hide-details
                ></v-checkbox>
              </v-col>
              <v-col cols="6">
                <v-checkbox
                  v-model="barcodePrintDetails.barcodeNumber"
                  label="info"
                  color="#002db3"
                  value="barcodeNumber"
                  hide-details
                ></v-checkbox>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-checkbox
                  v-model="barcodePrintDetails.SKU"
                  label="info"
                  color="#002db3"
                  value="SKU"
                  hide-details
                ></v-checkbox>
              </v-col>
              <v-col cols="6">
                <v-checkbox
                  v-model="barcodePrintDetails.name"
                  label="info"
                  color="#002db3"
                  value="name"
                  hide-details
                ></v-checkbox>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="1"> </v-col>
              <v-col cols="8">
                <v-card>
                  <div id="qr-code">
                    <Barcode  :barcode-value="barcode.barcode" />
                  </div>
                  <div>
                    <v-row align="center">
                      Product Name:{{ productName }}
                    </v-row>
                    <v-row align="center">
                      Price:{{ barcode.sellingPrice|formatCurrency }}
                    </v-row>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-container> </v-card-text
        >/
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { Payment } from "@/models/Payment";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import datePickComponent from "@/components/base/DateComponent";
import FileUpload from "@/components/base/FileUpload";

export default {
  data: () => ({
    dialog: false,
    show: false,
    barcodePrintDetails: {
      price: true,
      barcode: true,
      tax: true,
      barcodeNumber: true,
      SKU: true,
      name: true,
    },
  }),

  name: "AddBatch",
  updated: function () {
    console.log(this.visible);
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    barcode: {
      type: Number,
      default: 0,
    },
    productName: {
      type: String,
      default: "",
    },
  },
  components: {},
  computed: {},
  methods: {
    openModal() {
      this.show = true;
    },
  },
  created() {},
};
</script>
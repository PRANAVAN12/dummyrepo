<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="600px">
      <custom-modal
          title="Add payment"
          @onSubmit="savePayment"
          @onClose="show=false"
          :isLoading="isLoading"
      >
            <ValidationObserver ref="observer" v-slot="{ validate, reset }">
              <v-row>
                <v-col cols="6">
                  <ValidationProvider
                    rules="required"
                    v-slot="{ errors }"
                    name="Date"
                  >
                    <datePickComponent
                      labelname="Date"
                      v-model="payment.date"
                    />
                  </ValidationProvider>
                </v-col>
                <v-col cols="6">
                    <v-text-field
                      v-model="payment.referenceNumber"
                      label="Reference Number"
                      dense
                      outlined
                      min="0"
                    ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <ValidationProvider
                    name=" Amount"
                      v-slot="{ errors }"
                    rules="required"
                  >
                    <v-text-field
                      type="number"
                      :error-messages="errors"
                      :max="PayableBalance"
                      v-model="payment.amount"
                      label=" Amount"
                      dense
                      outlined
                      min="0"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="6">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name=" Method"
                    rules="required"
                  >
                    <v-select
                      outlined
                      dense
                      item-text="name"
                      item-value="id"
                      v-model="payment.PaymentMethod"
                      :items="paymentMethods"
                      :error-messages="errors"
                      label=" Method"
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>

              <v-row v-if="payment.PaymentMethod == 'Cheque'">
                <v-col cols="6">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Cheque Number"
                    rules="required"
                  >
                    <v-text-field
                      v-model="payment.checkqNumber"
                      :error-messages="errors"
                      label="Cheque Number"
                      dense
                      outlined
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="6">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Cheque Bank"
                    rules="required"
                  >
                    <v-text-field
                      v-model="payment.checkqBank"
                      :error-messages="errors"
                      label="Cheque Bank"
                      dense
                      outlined
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" v-if="payment.PaymentMethod == 'Cheque'">
                  <ValidationProvider
                    rules="required"
                    v-slot="{ errors }"
                    name="Date"
                  >
                    <datePickComponent
                      labelname="Cheque Date"
                      v-model="payment.checkqDate"
                    />
                  </ValidationProvider>
                </v-col>
                <v-col cols="6" v-if="payment.PaymentMethod == 'Card'">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Card Bank"
                    rules="required"
                  >
                    <v-text-field
                      v-model="payment.cardBank"
                      :error-messages="errors"
                      label="Card Bank"
                      dense
                      outlined
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="6" v-if="payment.PaymentMethod == 'Cheque'">
                  <ValidationProvider
                      v-slot="{ errors }"
                      name="Cheque Type"
                      rules="required"
                  >
                    <v-select
                        outlined
                        dense
                        item-text="name"
                        item-value="id"
                        v-model="payment.chequeType"
                        :items="CheQueTypes"
                        :error-messages="errors"
                        label="Cheque Type"
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-textarea
                    rows="3"
                    outlined
                    v-model="payment.remarks"
                     
                    label="Note"
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <FileUpload
                      title=" Attachment"
                      :multiple="true"
                      v-model="selectedFiles"
                      showList="true"
                      size="2048"
                      ref="fileUpload"
                      dense
                  />
                </v-col>
              </v-row>
            </ValidationObserver>
      </custom-modal>
    </v-dialog>
  </v-row>
</template>

<script>
import { Payment } from "../../../models/Payment";
import datePickComponent from "../../../components/base/DateComponent";
import FileUpload from "@/components/base/FileUpload";
import { required, numeric } from "vee-validate/dist/rules";

import {
  extend,
  ValidationObserver,
  ValidationProvider,
} from "vee-validate";
extend("required", {
  ...required,
  message: "{_field_} is required",
});
extend("numeric", {
  ...numeric,
  message: "input must be numeric",
});
extend("max", {
  ...numeric,
  message: "amount must be less than balance",
});
export default {
  data: () => ({
    dialog: false,
    show: false, selectedFiles: [],
    errors: [],
    paymentMethods: [
      { id: "Cash", name: "Cash" },
      { id: "Card", name: "Card" },
      { id: "Cheque", name: "Cheque" },
    ],
    CheQueTypes: [
      { id: "Cash", name: "Cash" },
      { id: "Cross", name: "Cross" },
    ],
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
  updated: function() {
    console.log(this.visible);
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    debitAccount: {
      type: Array,
      default: [],
    },
    purchaseId: {
      type: String,
      default: "",
    },
    supplierId: {
      type: Number,
      default: "",
    },
    PayableBalance: {
      type: Number,
      default: 0,
    },
    payment:{
      type:Payment,
      default:''
    },
    creditAccounts:{
      type:Array,
      default:[]
    }

  },
  components: {
    ValidationProvider,
    ValidationObserver,
    datePickComponent,
    FileUpload,
  },
  computed: {
   
  },
  methods: {
    openModal() {
      this.show = true;
    },
    async savePayment() {
      // if (!this.save_inside) {
      const isValid = await this.$refs.observer.validate();
      //   this.productbatch.isAdd = true;
        if (isValid) {
           this.AddPayment();
    
        }
      // } else {

      // }
    },
    works(item)
    {
      console.log('WOOOOERRRKKSKSSKSKSKKSKS')
      item.offset=true;
    },
    AddPayment() {
      this.payment.purchaseId = this.purchaseId;
      this.payment.supplierId = this.supplierId;
      this.$store
        .dispatch(`purchase/AddPayment`, this.payment)
        .then((res) => {
          this.isLoading = false;
          if (this.selectedFiles) {
            var fileId = res.data.id;
            var files = this.selectedFiles;
            var documentType = "PAYMENT";
            this.$store
                .dispatch("DocumentUploads", {
                  fileId,
                  files,
                  documentType,
                })
                .then((resp) => {

                });
          }
          this.$toast.success("Payment added  successfully");
          this.$emit('conform', '')
          this.show=false;
          this.payment=new Payment();


        })
        .catch((err) => {
          this.isLoading = false;
          this.$toast.error("Payment added  failed");
          this.show=false;
    this.payment=new Payment();


        });
    },
  },
  created(){
    this.payment.amount=this.PayableBalance;
    this.payment=new Payment();
  }
};
</script>

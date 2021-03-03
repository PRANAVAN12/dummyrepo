<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="600px">
      <custom-modal
          title="Edit payment"
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
                <datePickComponent labelname="Date" v-model="payment.date_time" />
              </ValidationProvider>
            </v-col>


            <v-col cols="6">
              <ValidationProvider>
                <v-text-field
                    type="number"
                    :error-messages="errors"
                    required  v-model="payment.amount"
                    label="Amount"
                    dense outlined
                    min="0"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="6">
              <ValidationProvider>
                <v-autocomplete
                    outlined
                    dense
                    item-text="name"
                    item-value="id"
                    v-model="payment.payment_type"
                    :items="paymentMethods"
                    :error-messages="errors"
                    label="Payment Method"
                />
              </ValidationProvider>
            </v-col>
          </v-row>



          <v-row  v-if="payment.payment_type=='Cheque'">
            <v-col cols="6">
              <ValidationProvider>
                <v-text-field
                    v-model=" payment.cheque_no"
                    :error-messages="errors"
                    label="Cheque Number"
                    dense outlined
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="6">
              <ValidationProvider>
                <v-text-field
                    v-model="payment.cheque_bank"
                    :error-messages="errors"
                    label="Cheque Bank"
                    dense outlined
                ></v-text-field>
              </ValidationProvider>
            </v-col>

          </v-row>
          <v-row>
            <v-col cols="6" v-if="payment.payment_type=='Cheque'" >
              <ValidationProvider
                  rules="required"
                  v-slot="{ errors }"
                  name="Date"
              >
                <datePickComponent  labelname="Cheque Date" v-model="payment.cheque_date" />
              </ValidationProvider>
            </v-col>
            <v-col cols="6" v-if="payment.payment_type == 'Cheque'">
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
                    v-model="payment.cheque_type"
                    :items="CheQueTypes"
                    :error-messages="errors"
                    label="Cheque Type"
                />
              </ValidationProvider>
            </v-col>
            <v-col cols="6" v-if="payment.payment_type=='Card'">
              <ValidationProvider>
                <v-text-field
                    v-model="payment.card_bank"
                    :error-messages="errors"
                    required
                    label="Card Bank"
                    dense outlined
                ></v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <FileUpload v-if="show"
                          title="Payment Attachment"
                          :multi="true"
                          size="2048"
                          autoupload="true"
                          :url="'document/upload/payment/' +payment.id"
                          :showDocumentView="true"
                          :documentsUrl="
                          'document/payment/' + payment.id
                        "
                          downloadUrl="document/:id/download"
                          removeUrl="document/:id"
                          dense
              />
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
        </ValidationObserver>
      </custom-modal>
    </v-dialog>
  </v-row>
</template>

<script>

import datePickComponent from "../../../components/base/DateComponent";
import FileUpload from "@/components/base/FileUpload";

import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import {numeric, required} from "vee-validate/dist/rules";
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
    paymentMethods:[{id:'Cash',name:'Cash'},
      {id:'Card',name:'Card'},
      {id:'Cheque',name:'Cheque'}],
    barcodeSymbology: [
      { id: "1", name: "0001" },
      { id: "2", name: "0002" },
      { id: "4", name: "0003" },
    ],
    CheQueTypes: [
      { id: "Cash", name: "Cash" },
      { id: "Cross", name: "Cross" },
    ],
    units: [
      { id: 1, name: "Kg" },
      { id: 2, name: "L" },
      { id: 3, name: "Bucket" },
    ],
    show:false
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
    salesId: {
      type: String,
      default: "",
    },
    payment:{
      type:Object,
      default:[]
    },
    creditAccounts:{
      type:Array,
      default:[]
    }

  },
  components: { ValidationProvider, ValidationObserver,datePickComponent,FileUpload},
  computed: {
  },
  methods: {
    async savePayment() {
      this.EditPayment();
      this.visible = false;
    },
    openModal() {
      this.show = true;
    },
    EditPayment() {

      debugger
      this.$store
          .dispatch(`sales/EditSalesPayment`, {data:this.payment,salesId:this.salesId})
          .then((res) => {
            this.isLoading = false;
            this.show=false;
            this.$emit('conform', '')
            this.$toast.success("Payment edited  successfully");
          })
          .catch((err) => {
            this.isLoading = false;
            this.show=false;

            this.$toast.error("Payment edit  failed");

          });
    },





  },

};
</script>

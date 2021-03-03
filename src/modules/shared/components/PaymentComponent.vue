<template>
     <v-card   >
    <v-card-text>
      <v-row v-if="Purchase.payments.length>1" align="center" justify="end"  >
          <v-icon @click="removePayment(payment)" >mdi-close</v-icon>
        </v-row>
            <v-row>
              <v-col cols="6">
                <ValidationProvider
                  rules="required"
                  v-slot="{ errors }"
                  name="Date"
                >
                  <datePickComponent labelname="Date" v-model="payment.data" />
                </ValidationProvider>
              </v-col>
              <v-col cols="6">
                <ValidationProvider>
                              <v-text-field 
                                :error-messages="errors"
                                required v-model="payment.referenceNumber"
                                label="Reference Number"
                                dense  outlined
                                min="0"
                              ></v-text-field>
                            </ValidationProvider>
              </v-col>
            </v-row>
                    <v-row>
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
                          v-model="payment.PaymentMethod" 
                          :items="paymentMethods"
                          :error-messages="errors"
                          label="Payment Method"
                        />
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                     <v-row>
                       <v-col cols="6">
                        <ValidationProvider>
                           <v-autocomplete   
                          outlined 
                          dense
                          item-text="name"
                          item-value="id"
                          v-model="payment.account" 
                          :items="debitAccounts"
                          :error-messages="errors"
                          label="Debit Account"
                        />
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                     <!-- <v-row v-if="payment.PaymentMethod=='3'">
                      <v-col cols="12">
                         <ValidationProvider>
                              <v-text-field  v-if="payment.PaymentMethod=='3'"
                                type="number" payment.checkqNumber
                                :error-messages="errors"
                                required
                                label="Checkque Number"
                                dense outlined
                                min="0"
                              ></v-text-field>
                            </ValidationProvider>
                      </v-col>
                     </v-row>
                    <v-row v-if="payment.PaymentMethod=='2'"> 
                      <v-col cols="6">
                         <ValidationProvider>
                              <v-text-field 
                               v-if="payment.PaymentMethod=='2'"
                                :error-messages="errors"
                                required
                                label="Card Number"
                                dense outlined
                                min="0"
                              ></v-text-field>
                            </ValidationProvider>
                      </v-col>
                      <v-col cols="6">
                        <ValidationProvider>
                           <v-text-field
                          outlined
                          dense
                          item-text="name" v-if="payment.PaymentMethod=='2'"
                          item-value="id"
                          :error-messages="errors"
                          label="Holder Name"
                        />
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                    <v-row v-if="payment.PaymentMethod=='2'">
                      <v-col cols="6">
                        <v-row v-if="payment.PaymentMethod=='2'">
                          <v-col cols="6">
                         <ValidationProvider>
                              <v-text-field 
                                type="number" v-if="payment.PaymentMethod=='2'"
                                :error-messages="errors"
                                required
                                label="Card Type"
                                dense outlined
                                min="0"
                              ></v-text-field>
                            </ValidationProvider>
                      </v-col>
                      <v-col cols="6">
                         <ValidationProvider>
                              <v-text-field 
                                type="number"
                                :error-messages="errors"
                                required
                                label="Month" v-if="payment.PaymentMethod=='2'"
                                dense outlined
                                min="0"
                              ></v-text-field>
                            </ValidationProvider>
                      </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="6">
                        <v-row>
                          <v-col cols="6">
                         <ValidationProvider>
                              <v-text-field 
                                :error-messages="errors"
                                required
                                label="Year" v-if="payment.PaymentMethod=='2'"
                                dense outlined
                                min="0"
                              ></v-text-field>
                            </ValidationProvider>
                      </v-col>
                      <v-col cols="6">
                         <ValidationProvider>
                              <v-text-field 
                                :error-messages="errors"
                                required
                                label="CVV" v-if="payment.PaymentMethod=='2'"
                                dense outlined
                                min="0"
                              ></v-text-field>
                            </ValidationProvider>
                      </v-col>
                        </v-row>
                      </v-col>
                    </v-row> -->
                    <v-row>
                      <v-col cols="12">
                        <FileUpload
  title="Payment Attachment"
  :multi="true"
  v-model="payment.attachment"
  size="2048"
  :types="['jpeg', 'png']"
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
                   
                    
                  </v-card-text>
                   <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="clear">clear</v-btn>
          <v-btn color="blue" @click="AddPayment()">Add Payment</v-btn>
        </v-card-actions>
                </v-card>
</template>
<script>
import datePickComponent from "../../../components/base/DateComponent";
import FileUpload from "@/components/base/FileUpload";
import { Payment } from "../../../models/Payment";


import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";

export default {


  name: "AddBatch",
  data(){
payment=new Payment();
  },
  updated: function() {
    console.log(this.visible);
  },
  props: {
   
    paymentMethods:{
        type:Array,
        default:Object
    },
    Purchase:{
      type:Object,
        default:Object
    },
    debitAccounts:{
      type:Array,
      default:[]
    }

  },
  components: { ValidationProvider, ValidationObserver ,datePickComponent,FileUpload},
  methods:{
      removePayment(payment){
this.Purchase.payments.splice(
          this.Purchase.payments.indexOf(payment),
          1
        );
      },
      

  }
 
};
</script>
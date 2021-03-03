<template>
  <v-row justify="center">

    <v-dialog v-model="show" persistent max-width="600px">
      <custom-modal
          :title=" AdditionalAmount.isEdit?'Edit Additonal Amount':'Add Additonal Amount'"
          @onSubmit="SaveAmount"
          @onClose="show=false"
          :isLoading="isLoading"
      >
            <ValidationObserver ref="observer" v-slot="{ validate, reset }">

              <v-row>
                <v-col cols="6">
                  <ValidationProvider
                      name="Amount"
                      v-slot="{ errors }"
                      rules="required"
                  >
                    <v-text-field
                        type="number"
                        v-model="AdditionalAmount.amount"
                        @input="checkInput()"
                        label=" Amount"
                        :error-messages="amountErrorMessage"
                        dense
                        name="Reason"
                        outlined
                        min="0"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <ValidationProvider
                      name=" Reason"
                      rules="required"
                  >
                  <v-textarea
                      rows="3"
                      slot-scope="{ errors }"
                      outlined
                      v-model="AdditionalAmount.reason"
                      @input="reasonErrorMessage=[]"
                      :error-messages="reasonErrorMessage"
                      label="Reason"
                  ></v-textarea>
                  </ValidationProvider>
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
    show: false,
    amountErrorMessage:[],
    reasonErrorMessage:[],
    errors: [],
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
    AdditionalAmount:{
      type:Object,
      default:{
        reason:null,
        amount:null,isEdit:false,id:null
      }
    },
    purchaseId: {
      type: String,
      default: "",
    },

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
    async SaveAmount() {
      let error=false
      if(this.AdditionalAmount.amount<=0)
      {
        error=true;
        this.amountErrorMessage.push('amount should be greater than 0')
      }
      if(this.AdditionalAmount.reason==null ||this.AdditionalAmount.reason==""  )
      {
        error=true;
        this.reasonErrorMessage.push("reason is required")
      }
        if(!error)
        {
          if(this.AdditionalAmount.isEdit)
          {
            this.$store
                .dispatch(`purchase/EditAdditionalAmount`, {data:this.AdditionalAmount,Id:this.purchaseId})
                .then((res) => {
                  this.isLoading = false;
                  this.$toast.success("Additinal Amount edited  successfully");
                  this.$emit('conform', '')
                  this.show=false;
                })
                .catch((err) => {
                  this.isLoading = false;
                  this.$toast.error("Additinal amount edited  failed");
                  this.show=false;
                });

          }
          else
          {
            this.$store
                .dispatch(`purchase/AdditionalAmount`, {data:this.AdditionalAmount,Id:this.purchaseId})
                .then((res) => {
                  this.isLoading = false;
                  this.$toast.success("Additinal Amount added  successfully");
                  this.$emit('conform', '')
                  this.show=false;
                })
                .catch((err) => {
                  this.isLoading = false;
                  this.$toast.error("Additinal amount added  failed");
                  this.show=false;
                });

          }
        }



    },
    checkInput()
    {
      this.amountErrorMessage = [];
      if(this.AdditionalAmount.amount>=0) {
        this.amountErrorMessage = [];
      }
      else {
        this.amountErrorMessage.push('amount should be greater than 0')
      }

    },
    works(item)
    {
      console.log('WOOOOERRRKKSKSSKSKSKKSKS')
      item.offset=true;
    },

  },
  created(){
    this.payment=new Payment();
  }
};
</script>

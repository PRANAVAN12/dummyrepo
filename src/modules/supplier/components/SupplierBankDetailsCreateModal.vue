<template>  <ValidationObserver ref="observer">
        <v-container fluid>
  <v-row justify="center">
    
    <v-dialog v-model="show" persistent max-width="800px">
      <custom-modal
        title="Create Bank Details"
        @onSubmit="SaveBankdetailsSupplier()"
        @onClose="clear()"
        :isLoading="isLoading"
      >
            
              
                  <v-row>
                    <v-col cols="12" xs="12" sm="12" md="6" lg="6">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="Bank Name"
                        rules="required"
                      >
                        <v-text-field
                          v-model="bankdetails.bank_name"
                          class="numberInput"
                          outlined
                          dense
                          :error-messages="errors"
                          label="Name"
                          required
                          hide-details="auto"
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12" xs="12" sm="12" md="6" lg="6">
                      <v-text-field
                        hide-details="auto"
                        v-model="bankdetails.brange"
                        class="numberInput"
                        outlined
                        dense
                        :error-messages="errors"
                        label="Branch"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" xs="12" sm="12" md="6" lg="6" class="pb-0">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="Account Holder"
                        rules="required"
                      >
                        <v-text-field
                          hide-details="auto"
                          v-model="bankdetails.acount_holder_name"
                          class="numberInput"
                          outlined
                          dense
                          :error-messages="errors"
                          label="Account Holder"
                          required
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12" xs="12" sm="12" md="6" lg="6">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="Account Number"
                        rules="required"
                      >
                        <v-text-field
                          hide-details="auto"
                          v-model="bankdetails.account_no"
                          class="numberInput"
                          outlined
                          dense
                          :error-messages="errors"
                          label="Account Number"
                          type="number"
                          required
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>
                  </v-row>
            
       </custom-modal>
    </v-dialog>
  </v-row>
</v-container>
    </ValidationObserver>
</template>

<script>
import { BankDetails } from "../../../models/BankDetails";
import { required, email, max } from "vee-validate/dist/rules";
import _ from "lodash";

import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

extend("required", {
  ...required,
  message: "{_field_} is required",
});
export default {
  props: {
    permission: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    show: false,

    bankdetails: {
      bank_name: "",
      brange: "",
      acount_holder_name: "",
      account_no: "",
    },
    isLoading: false,
  }),

  methods: {
    openModal() {
      this.show = true;
    },
    async SaveBankdetailsSupplier() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.saveBankDetails();
      }
    },

    saveBankDetails() {
      this.isLoading = true;

      debugger;
      var credential = this.bankdetails;
      var id = this.$route.params.id;
      this.$store
        .dispatch("supplier/BankDetails", { credential, id })
        .then((res) => {
          debugger;
          this.isLoading = false;
          this.$toast.success("Bank details added successfully");
          this.$refs.observer.reset();
          this.$emit("afterSave");
          this.show = false;
          this.bankdetails = {};
        })
        .catch((err) => {
          debugger;
          this.isLoading = false;
          this.messages.push(err.data.title);
        });
    },

    clear() {
      this.show = false;
      this.bankdetails = {};
           this.$refs.observer.reset();
    },
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close", this.payments);
        }
      },
    },
  },
};
</script>

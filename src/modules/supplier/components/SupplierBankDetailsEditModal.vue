<template>
  <v-container fluid>
    <v-row justify="center">
      <v-dialog v-model="show" persistent max-width="800px">
        <custom-modal
          title="Edit Bank Details"
          @onSubmit="SaveEditedBankdetails()"
          @onClose="close()"
          :isLoading="isLoading"
        >
          <ValidationObserver ref="observer" v-slot="{ validate, reset }">
            <v-row>
              <v-col cols="6">
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
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="6">
                <v-text-field
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
              <v-col cols="6" class="pb-0">
                <v-text-field
                  v-model="bankdetails.acount_holder_name"
                  class="numberInput"
                  outlined
                  dense
                  :error-messages="errors"
                  label="Account Holder"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6 pb-0">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Account Number"
                  rules="required"
                >
                  <v-text-field
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
          </ValidationObserver>
        </custom-modal>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { BankDetails } from "../../../models/BankDetails";
import { required, email, max } from "vee-validate/dist/rules";
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
  data: () => ({
    value: [],
    bankdetails: new BankDetails(),
  }),
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    bankdetails: {
      type: Object,
      default: {},
    },
  },

  methods: {
    async SaveEditedBankdetails() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.EditBankDetails();
      }
    },
    close() {
      this.show = false;
    },
    EditBankDetails() {
      let bankdetailId = this.$route.params.id;
      let bankdetails = this.bankdetails;
      this.$store
        .dispatch("supplier/EditBankDetail", { bankdetailId, bankdetails })
        .then((res) => {
          this.succeeed = true;
          this.$emit("afterEdit");
          this.$toast.success("Bank details edited successfully");
          this.show = false;
        })
        .catch((err) => {
          this.messages = err.data.title;
          this.$toast.error("Edit bank details failed");
          this.$emit("afterEdit");
        });
    },
    GetBankDtails() {
      let bankdetailId = this.$route.params.id;
      this.$store
        .dispatch("supplier/GetSupplierBankDetails", bankdetailId)
        .then((res) => {
          this.bankdetails = new BankDetails().Initialise(res.data);
        })
        .catch((err) => {
          this.messages = err.data.title;
        });
    },
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  created() {
    this.GetBankDtails();
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close", this.bankdetails);
        }
      },
    },
  },
};
</script>

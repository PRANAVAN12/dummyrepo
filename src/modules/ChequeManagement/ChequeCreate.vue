<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="600px">
      <custom-modal
        title="Create Cheque"
        @onSubmit="submitCheque"
        @onClose="onClose()"
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
                <datePickComponent labelname="Date" v-model="cheque.date" />
              </ValidationProvider>
            </v-col>

            <v-col cols="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="Type"
                rules="required"
              >
                <v-select
                  outlined
                  dense
                  item-text="name"
                  item-value="id"
                  v-model="cheque.type"
                  :items="chequeTypes"
                  :error-messages="errors"
                  label="Type"
                />
              </ValidationProvider>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="Number"
                rules="required"
              >
                <v-text-field
                  v-model="cheque.number"
                  :error-messages="errors"
                  label="Number"
                  dense
                  outlined
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="Bank"
                rules="required"
              >
                <v-text-field
                  v-model="cheque.bank"
                  :error-messages="errors"
                  label="Bank"
                  dense
                  outlined
                ></v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                name="Date"
              >
                <datePickComponent
                  labelname="Cheque Date"
                  v-model="cheque.chequeDate"
                />
              </ValidationProvider>
            </v-col>

             <v-col cols="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="Amount"
                rules="required"
              >
                <v-text-field
                  v-model="cheque.amount"
                  :error-messages="errors"
                  label="Amount"
                  dense
                  outlined
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-textarea
                rows="3"
                outlined
                v-model="cheque.remarks"
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
import { Payment } from "@/models/Payment";
import datePickComponent from "@/components/base/DateComponent";
import FileUpload from "@/components/base/FileUpload";
import { required, numeric } from "vee-validate/dist/rules";

import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { Cheque } from '../../models/Cheque';
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
    cheque: new Cheque(),
    dialog: false,
    show: false,
    selectedFiles: [],
    errors: [],
    chequeTypes: [
      { id: "Cash", name: "Cash" },
      { id: "Cross", name: "Cross" },
    ],
  }),

  name: "AddBatch",
  updated: function () {},
  props: {
    creditAccounts: {
      type: Array,
      default: [],
    },
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    datePickComponent,
    FileUpload,
  },
  computed: {},
  methods: {
    openModal() {
        debugger
      this.show = true;
    },
    async submitCheque() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.createCheque();
      }
    },
    createCheque() {
      this.$store
        .dispatch(`chequeManagement/CreateCheque`,new Cheque().toRequestModel(this.cheque))
        .then((res) => {
          this.isLoading = false;
          if (this.selectedFiles) {
            var fileId = res.data.id;
            var files = this.selectedFiles;
            var documentType = "CHEQUE";
            if(this.selectedFiles.length>0)
            {
              this.$store
                  .dispatch("DocumentUploads", {
                    fileId,
                    files,
                    documentType,
                  })
                  .then((resp) => {});
            }

          }
          this.$toast.success("Payment added  successfully");
          this.$emit("conform", "");
          this.show = false;
          this.cheque=new Cheque()
        })
        .catch((err) => {
          this.isLoading = false;
          this.$toast.error("Payment added  failed");
          this.show = false;
          this.cheque=new Cheque()
        });
    },
    onClose()
    {
      this.show = false;
      this.cheque=new Cheque()
    }
  },
  created() {
  },
};
</script>

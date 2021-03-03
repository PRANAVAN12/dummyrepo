<template>
  <div ref="editmodal">
    <v-row justify="center">
      <v-container fluid>
        <v-dialog v-model="show" persistent max-width="600px">
          <custom-modal
            title="Edit Income Category"
            @onSubmit="SaveCategory"
            @onClose="show = false"
            :isLoading="isLoading"
          >
            <ValidationObserver ref="observer" v-slot="{ validate, reset }">
              <v-row>
                <v-col cols="8">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Name"
                    vid="name"
                    rules="required"
                  >
                    <v-text-field
                      :error-messages="errors"
                      required
                      v-model="incomecategory.name"
                      label="Name"
                      auto-grow
                      outlined
                      hide-details="auto"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
          
                <v-col cols="4" >
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Code"
                    vid="code"
                    rules="required"
                  >
                    <v-text-field
                      :error-messages="errors"
                      required
                      v-model="incomecategory.code"
                      label="Code"
                      auto-grow
                      outlined
                      hide-details="auto"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <ValidationProvider v-slot="{ errors }" name="Description">
                    <v-textarea
                      hide-details="auto"
                      label="
                      Description"
                      :error-messages="errors"
                      required
                      v-model="incomecategory.description"
                      outlined
                      rows="3"
                    ></v-textarea>
                  </ValidationProvider>
                </v-col>
              </v-row>
            </ValidationObserver>
          </custom-modal>
        </v-dialog>
      </v-container>
    </v-row>
  </div>
</template>
<script>
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import { IncomeCategory } from "@/models/IncomeCategory";
export default {
  data: () => ({
    dialog: false,

    value: [],

    options: [],
    isLoading: false,
  }),

  name: " ",

  props: {
    visible: {
      type: Boolean,
      default: false,
    },

    incomecategory: {
      type: Object,
      default: {},
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
          this.$emit("close", this.incomecategory);
          this.visible = value;
        }
      },
    },
  },
  methods: {
    async SaveCategory() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.EditIncomeCategory();
      }
    },

    EditIncomeCategory() {
      debugger;
      this.isLoading = true;
      const credential = this.incomecategory;
      this.$store
        .dispatch("sitesetting/EditIncomeCategory", {
          Id: credential.id,
          data: {
            name: credential.name,
            code: credential.code,
            description: credential.description,
          },
        })
        .then(async (res) => {
          debugger;
          this.succeeed = true;
          this.$emit("afterSave");

          this.$toast.success("Income category edited  successfully");

          this.show = false;
          this.visible = false;
          this.isLoading = false;
        })
        .catch((err) => {
          // this.isLoading = false;
          this.$refs.observer.setErrors(err.data.error);
          this.$toast.error("Income category edited failed");
        });
    },
  },
};
</script>

<style></style>

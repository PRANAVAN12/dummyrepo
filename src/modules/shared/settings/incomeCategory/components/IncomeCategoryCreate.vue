<template>
  <v-row justify="center">
    <v-dialog
        style="border-radius: 5px"
        v-model="show"
        persistent
        max-width="600px"
    >
      <custom-modal
          title="Create Income  Category"
          @onSubmit="SaveCategory"
          @onClose="close"
          :isLoading="isLoading"
      >
        <ValidationObserver ref="observer" v-slot="{ validate, reset }">
          <v-row>
            <v-col cols="8" >
              <ValidationProvider
                  v-slot="{ errors }"
                  name="Name"
                  vid="name"
                  rules="required"
                  hide-details="auto"
              >
                <v-text-field
                    hide-details="auto"
                    :error-messages="errors"
                    required
                    v-model="incomeCategory.name"
                    label="Name"
                    auto-grow
                    outlined
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
                    v-model="incomeCategory.code"
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
                    :error-messages="errors"
                    required
                    label="
                      Description"
                    v-model="incomeCategory.description"
                    outlined
                    rows="3"
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

import { mapState } from "vuex";
import CustomModal from "@/components/base/CustomModal";

import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import {IncomeCategory} from "@/models/IncomeCategory";
export default {
  data: () => ({

    dialog: false,
    incomeCategory: new IncomeCategory(),
   
    value: [],
    options: [],
    isLoading: false,
  }),

  name: "AddCategory",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    incomeCategory: {
      type: Object,
      default: {},
    },
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    CustomModal,
  },
  computed: {
    ...mapState("product", ["categories_with_child"]),
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close", this.incomeCategory);
        }
      },
    },
  },
  methods: {
    close() {
      this.show = false;
      this.incomeCategory = new ProductCategory();

      this.$refs.observer.reset();
    },
    async SaveCategory() {
      const isValid = await this.$refs.observer.validate();
      this.incomeCategory.isAdd = true;

      if (isValid) {
        this.CreateCategory();
      }
    },


    CreateCategory() {
      this.isLoading = true;
      this.$store
          .dispatch(
              "sitesetting/AddIncomeCategory",
             this.incomeCategory
          )
          .then(async (res) => {
            this.succeeed = true;
            this.$emit("afterSave");
            this.$toast.success("income category created  succesfully");

            this.isLoading = false;
            this.show = false;
            this.incomeCategory = new IncomeCategory();
            this.$refs.observer.reset();
          })
          .catch((err) => {
            this.isLoading = false;
            this.$refs.observer.setErrors(err.data.error);

            this.$toast.error("Income category created  failed!");
            this.isLoading = false;
          });
    },

  },
};
</script>

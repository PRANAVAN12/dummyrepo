<template>
  <v-row justify="center">
    <v-dialog
        style="border-radius: 5px"
        v-model="show"
        persistent
        max-width="600px"
    >
      <custom-modal
          title="Create Expense Category"
          @onSubmit="SaveCategory"
          @onClose="close"
          :isLoading="isLoading"
      >
        <ValidationObserver ref="observer" v-slot="{ validate, reset }">
          <v-row>
            <v-col cols="12" sm="12" lg="12">
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
                    v-model="expenseCategory.name"
                    label="Name"
                    auto-grow
                    outlined
                ></v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" sm="6">
              <ValidationProvider
                  v-slot="{ errors }"
                  name="Code"
                  vid="code"
                  rules="required"
              >
                <v-text-field
                    :error-messages="errors"
                    v-model="expenseCategory.code"
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
                    v-model="expenseCategory.description"
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
import { ProductCategory } from "../../../../../models/ProductCategory";
import { ProductCategoryEntityModel } from "../../../../../models/EntityModels/ProductCategoryEntityModel";
import { mapState } from "vuex";

// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import FileUpload from "@/components/base/FileUpload";
import CustomModal from "@/components/base/CustomModal";

import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import {ExpenseCategory} from "@/models/ExpenseCategory";
export default {
  data: () => ({
    selectedImages: "",
    dialog: false,
    expenseCategory: new ProductCategory(),
    ParentProductCategories: [],
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
    expenseCategory: {
      type: Object,
      default: {},
    },
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    Treeselect,
    FileUpload,
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
          this.$emit("close", this.expenseCategory);
        }
      },
    },
  },
  methods: {
    close() {
      this.show = false;
      this.expenseCategory = new ProductCategory();

      this.$refs.observer.reset();
    },
    async SaveCategory() {
      const isValid = await this.$refs.observer.validate();
      this.expenseCategory.isAdd = true;

      if (isValid) {
        this.CreateCategory();
      }
    },


    CreateCategory() {
      this.isLoading = true;
      this.$store
          .dispatch(
              "sitesetting/AddExpenseCategory",
             this.expenseCategory
          )
          .then(async (res) => {
            this.succeeed = true;
            this.$emit("afterSave");
            this.$toast.success("Expense category created  succesfully");

            this.isLoading = false;
            this.show = false;
            this.expenseCategory = new ExpenseCategory();
            this.$refs.observer.reset();
          })
          .catch((err) => {
            this.isLoading = false;
            this.$refs.observer.setErrors(err.data.error);

            this.$toast.error("Productcategory created  failed!");
            this.isLoading = false;
          });
    },

  },

  created() {
    this.GetCategory();
  },
};
</script>

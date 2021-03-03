<template>
  <div ref="editmodal">
    <v-row justify="center">
      <v-container fluid>
        <v-dialog v-model="show" persistent max-width="600px">
          <custom-modal
              title="Edit Category"
              @onSubmit="SaveCategory"
              @onClose="show = false"
              :isLoading="isLoading"
          >
            <ValidationObserver ref="observer" v-slot="{ validate, reset }">
              <v-row>

                <v-col cols="12">
                  <ValidationProvider
                      v-slot="{ errors }"
                      name="Name"
                      vid="name"
                      rules="required"
                  >
                    <v-text-field
                        :error-messages="errors"
                        required
                        v-model="productcategory.name"
                        label="Name"
                        auto-grow
                        outlined
                        hide-details="auto"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" lg="6" md="6">
                  <ValidationProvider
                      v-slot="{ errors }"
                      name="Code"
                      vid="code"
                      rules="required"

                  >
                    <v-text-field
                        :error-messages="errors"
                        required
                        v-model="productcategory.code"
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
                        v-model="productcategory.description"
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
import { mapState } from "vuex";

import { ProductCategory } from "../../../../../models/ProductCategory";
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import FileUpload from "@/components/base/FileUpload";

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
    ParentProductCategories: [],
    value: [],
    existImage: [],
    options: [],
    isLoading: false,
    imageUpdated: null,
  }),
  created() {
    // this.GetCategory();
  },
  name: " ",

  props: {
    visible: {
      type: Boolean,
      default: false,
    },

    productcategory: {
      type: Object,
      default: {},
    },
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    Treeselect,
    FileUpload,
  },

  computed: {
    ...mapState("product", ["categories_with_child"]),
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close", this.productcategory);
          this.visible = value;
        }
      },
    },
  },
  methods: {
    onChangeImageUpload(value) {
      this.imageUpdated = value;
    },
    async SaveCategory() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.EditProductCategory();
      }
    },

    EditProductCategory() {
      debugger;
      this.isLoading = true;
      const credential = this.productcategory;
      this.$store
          .dispatch(
              "sitesetting/EditExpenseCategory",
              {Id:credential.id,data:{
                name:credential.name,
                  code:credential.code,
                  description:credential.description
                }}
          )
          .then(async (res) => {
            debugger;
            this.succeeed = true;
            this.$emit("afterSave");

            this.$toast.success("Productcategory edited  successfully");

            this.show = false;
            this.visible = false;
            this.isLoading = false;
          })
          .catch((err) => {
            // this.isLoading = false;
            this.$refs.observer.setErrors(err.data.error);
            this.$toast.error("Productcategory edited failed");
          });
    },



  },
};
</script>

<style></style>

<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline font-weight-lighter"
            >Edit Categaory{{ visible }}</span
          >
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <ValidationObserver ref="observer" v-slot="{ validate, reset }">
              <v-row>
                <v-col cols="6">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Category Code"
                    rules="required"
                  >
                    <v-textarea
                      :error-messages="errors"
                      required
                      v-model="productcategory.code"
                      label="Categaory Code"
                      auto-grow
                      rows="1"
                      row-height="15"
                    ></v-textarea>
                  </ValidationProvider>
                </v-col>
                <v-col cols="6">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Category Name"
                    rules="required"
                  >
                    <v-textarea
                      :error-messages="errors"
                      required
                      v-model="productcategory.name"
                      label="Categaory Name"
                      auto-grow
                      rows="1"
                      row-height="15"
                    ></v-textarea>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Parent Category"
                    rules="required"
                  >
                    <treeselect
                      :error-messages="errors"
                      required
                      class="tree-border"
                      :value="name"
                      dense
                      v-model="productcategory.name"
                      filled
                      :options="productcategory"
                      placeholder="Select your Parent Category"
                    >
                      <label
                        slot="option-label"
                        slot-scope="{
                          node,
                          shouldShowCount,
                          count,
                          labelClassName,
                          countClassName,
                        }"
                        :class="labelClassName"
                      >
                        {{ node.raw.id }} - {{ node.raw.name }}
                        <span v-if="shouldShowCount" :class="countClassName"
                          >({{ count }})</span
                        >
                      </label>
                    </treeselect>

                    <span class="error--text">{{ errors[0] }}</span>
                  </ValidationProvider>
                </v-col>
                <v-col cols="6">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Image"
                    rules="required"
                  >
                    <v-file-input
                      :error-messages="errors"
                      required
                      multiple
                      label="Image"
                      v-model="productcategory.image"
                    ></v-file-input>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Category Description"
                    rules="required"
                  >
                    <v-textarea
                      :error-messages="errors"
                      required
                      label="description"
                      v-model="productcategory.description"
                    ></v-textarea>
                  </ValidationProvider>
                </v-col>
              </v-row>
            </ValidationObserver>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click.stop="show = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="EditCategory()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { ProductCategory } from "../../../../../models/ProductCategory";
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
export default {
  data: () => ({
    dialog: false,
    productCategory: new ProductCategory(),
    value: [],
    options: [],
  }),
  created() {
    this.GetProductCategory();
  },
  name: "EditCategory",
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
  components: { ValidationProvider, ValidationObserver, Treeselect },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close", this.productCategory);
          this.visible = value;
        }
      },
    },
  },
  methods: {
    async EditCategory() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.EditProductCategory();
      }
    },

    EditProductCategory() {
      this.$store
        .dispatch("product/EditProductCategory", this.ProductCategory)
        .then((res) => {
          this.succeeed = true;
          this.$toast.success("Product category edited successfully");
          this.show = false;
        })
        .catch((err) => {
          this.messages = err.data.title;
          this.$toast.error("Edit product category failed");
        });
    },
    GetProductCategory() {
      let EditProductCategoryId = this.$route.params.id;
      this.$store
        .dispatch("product/GetProductCategory", EditProductCategoryId)
        .then((res) => {
          this.ProductCategory = new ProductCategory().Initialise(res.data);
        })
        .catch((err) => {
          this.messages = err.data.title;
        });
    },
  },
};
</script>

<style></style>

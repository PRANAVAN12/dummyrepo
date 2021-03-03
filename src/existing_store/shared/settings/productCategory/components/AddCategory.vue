<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline font-weight-lighter">Add Categaory</span>
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
                      v-model="productCategory.code"
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
                      v-model="productCategory.name"
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
                      v-model="productCategory.id"
                      filled
                      :options="ParentProductCategories"
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
                      v-model="productCategory.image"
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
                      v-model="productCategory.description"
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
          <v-btn color="blue darken-1" text @click="SaveCategory()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { ProductCategory } from "../../../../../models/ProductCategory";
import { ProductCategoryEntityModel } from "../../../../../models/EntityModels/ProductCategoryEntityModel";

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
    ParentProductCategories: [],
    value: [],
    options: [],
  }),

  name: "AddCategory",
  props: {
    visible: {
      type: Boolean,
      default: false,
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
        }
      },
    },
  },
  methods: {
    async SaveCategory() {
      const isValid = await this.$refs.observer.validate();
      this.productCategory.isAdd = true;

      if (isValid) {
        //  this.show = false;
        this.isLoading = true;
        this.CreateCategory();
      }
    },

    GetCategory() {
      this.$store
        .dispatch("product/GetProductCategories")
        .then((res) => {
          this.ParentProductCategories = new ProductCategory().MapData(
            res.data.data
          );
          })
        .catch((err) => {
          this.messages.push(err.data.title);
        });
    },
    CreateCategory() {
      this.$store
        .dispatch(
          "product/AddProductCategory",
          new ProductCategoryEntityModel(this.productCategory)
        )
        .then((res) => {
          this.succeeed = true;
          this.$toast.success("ProductCategory added  successfully");
          this.$router.push("/setting/Category");

          this.isLoading = false;
        })
        .catch((err) => {
          this.messages = err.data.title;
          this.isLoading = false;
          this.$toast.error("Category creation failed");
        });
    },
  },

  created() {
    this.GetCategory();
  },
};
</script>

<style>
.vue-treeselect__control {
  margin-top: 15px;
  border: 0 0 1 0;
  outline: none;
  border-width: 0 0 2px;
  outline-offset: 0;
}
</style>

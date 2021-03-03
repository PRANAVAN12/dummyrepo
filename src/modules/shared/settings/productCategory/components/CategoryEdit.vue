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
              <v-col cols="12" sm="12" lg="6" md="6">
                <ValidationProvider v-slot="{ errors }" name="Parent category">
                  <treeselect
                  
                    outlined
                    :error-messages="errors"
                    required
                    class="tree-border"
                    :value="id"
                    dense
                    v-model="productcategory.parent_id"
                    filled
                    :options="ParentProductCategories"
                    placeholder="Select your parent category"
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
                      {{ node.raw.label }}
                      <span v-if="shouldShowCount" :class="countClassName"
                        >({{ count }})</span
                      >
                    </label>
                  </treeselect>
                  <span class="error--text">{{ errors[0] }}</span>
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

              <v-col cols="12 pb-0">
                <!-- {{ productcategory.image ? [productcategory.image] : [] }} -->
                <!-- {{productcategory}} -->
                <v-flex class="pt-0 pa-3">
                  <FileUpload
                  
                    title="Image"
                    :multiple="false"
                    v-model="selectedImages"
                    :externalFiles="
                      productcategory.image ? [productcategory.image] : []
                    "
                    @isImageUpdated="onChangeImageUpload"
                    ref="imageInput"
                    size="2048"
                    :types="['jpeg', 'png']"
                    :showPreview="true"
                  />
                </v-flex>
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
    this.GetCategory();
  },
  name: " ",

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    existImage: {
      type: Array,
      default: [],
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
        if (this.visible) this.GetCategory();
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
          "product/EditProductCategory",
          new ProductCategory().SetData(credential)
        )
        .then(async (res) => {
          debugger;
          // if (this.imageUpdated == true) {
          debugger;
          await this.UploadImage(credential.id)
            .then((res) => {})
            .catch((err) => {
              this.$refs.observer.setErrors(err.data.error);
              this.messages = err.data.title;
              this.$toast.error("Product category image upload failed");
            });
          // }

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
    async UploadImage(id) {
      let formData = new FormData();

      if (this.selectedImages && this.imageUpdated) {
        debugger;
         formData.append("id", this.productcategory.id);
        formData.append("image", this.selectedImages);
        return await this.$store.dispatch(
          "product/UploadProductCategoryImage",
          formData
        );
      } else if (this.imageUpdated == false) {
        debugger;
        formData.append("id", this.productcategory.id);
        formData.append("image", null);
        return await this.$store.dispatch(
          "product/UploadProductCategoryImage",
          formData
        );
      } else {
        return true;
      }
      debugger;

    },

    GetCategory() {
      this.$store
        .dispatch("product/GetProductCategoriesWithChild")
        .then((res) => {
          // this.productCategory=res.data;
          this.ParentProductCategories = res.data;
            this.$refs.imageInput.GetImage();
        })
        .catch((err) => {
          this.messages.push(err.data.title);
        });
    },
  },
};
</script>

<style></style>

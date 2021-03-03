<template>
  <v-row justify="center">
    <v-dialog
      style="border-radius: 5px"
      v-model="show"
      persistent
      max-width="600px"
    >
      <custom-modal
        title="Create Category"
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
                  v-model="productCategory.name"
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
                  v-model="productCategory.code"
                  label="Code"
                  auto-grow
                  outlined
                   hide-details="auto"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="6" sm="6">
              <ValidationProvider v-slot="{ errors }" name="Parent category">
                <treeselect
                 hide-details="auto"
                  outlined
                  :error-messages="errors"
                  required
                  class="tree-border"
                  :value="id"
                  dense
                  v-model="productCategory.parentCatergoryId"
                  filled
                  :options="ParentProductCategories"
                  placeholder="Select your parent category"
                >
                  <label
                   hide-details="auto"
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
                  :error-messages="errors"
                  required
                  label="
                      Description"
                  v-model="productCategory.description"
                  outlined
                  rows="3"
                ></v-textarea>
              </ValidationProvider>
            </v-col>
            <v-col cols="12 pb-0">
              <v-flex class="pt-0 pa-3">
                <FileUpload
                 hide-details="auto"
                  title="Image"
                  :multiple="false"
                       ref="imageInput"
                  v-model="selectedImages"
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
export default {
  data: () => ({
    selectedImages: "",
    dialog: false,
    productCategory: new ProductCategory(),
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
          this.$emit("close", this.productCategory);
        }
      },
    },
  },
  methods: {
    close() {
      this.show = false;
      this.productCategory = new ProductCategory();

      this.$refs.observer.reset();
    },
    async SaveCategory() {
      const isValid = await this.$refs.observer.validate();
      this.productCategory.isAdd = true;

      if (isValid) {
        this.CreateCategory();
      }
    },

    GetCategory() {
      this.$store
        .dispatch("product/GetProductCategoriesWithChild")
        .then((res) => {
          this.ParentProductCategories = res.data;
          this.$refs.imageInput.GetImage();
        })
        .catch((err) => {
          this.messages.push(err.data.title);
        });
    },
    CreateCategory() {
      this.isLoading = true;
      this.$store
        .dispatch(
          "product/AddProductCategory",
          new ProductCategoryEntityModel(this.productCategory)
        )
        .then(async (res) => {
          this.succeeed = true;
          this.GetCategory();
          console.log(res);
          // this.$toast.success("Selected Image");
          await this.UploadImage(res.data.id)
            .then((res) => {
              this.succeeed = true;
              this.$emit("afterSave");
            })
            .catch((err) => {
              this.$toast.success("Product category image upload  failed");
            });

          this.$emit("afterSave");
          this.$toast.success("Productcategory created  succesfully");
     
          this.isLoading = false;
          this.show = false;
          this.productCategory = new ProductCategory();
          this.$refs.observer.reset();
        })
        .catch((err) => {
          this.isLoading = false;
          this.$refs.observer.setErrors(err.data.error);

          this.$toast.error("Productcategory created  failed!");
          this.isLoading = false;
        });
    },
    async UploadImage(id) {
      let formData = new FormData();
      formData.append("image", this.selectedImages);
      formData.append("id", id);
      console.log(this.selectedImages);
      return await this.$store.dispatch(
        "product/UploadProductCategoryImage",
        formData
      );
    },
  },

  created() {
    this.GetCategory();
  },
};
</script>

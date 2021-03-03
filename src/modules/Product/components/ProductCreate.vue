<template>
  <div>
    <PageTitle
      title="Create Product"
      :backBtn="true"
      :showLoading="isLoading"
    />
    <v-container fluid class="lighten-12">
      <ValidationObserver ref="observer">
        <!-- Page Title -->
        <!-- <PageTitle title="Create Product" :backBtn="true" /> -->
        <v-row>
          <v-col cols="12" xs="12" sm="12" md="8" lg="8" xl="8">
            <v-row>
              <v-col cols="12">
                <v-card>
                  <v-card-title>General</v-card-title>
                  <v-container>
                    <!-- <v-row>
                    <v-flex class="ma-2 font-weight-medium bg-light pa-3"
                      >General</v-flex
                    >
                  </v-row> -->
                    <v-row>
                      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Product name"
                          rules="required"
                          vid="name"
                        >
                          <v-text-field
                            outlined
                            v-model="Product.name"
                            :error-messages="errors"
                            dense
                            hide-details="auto"
                            label="Name"
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                        <ValidationProvider
                          name="code"
                          rules="required"
                          v-slot="{ errors }"
                          vid="code"
                        >
                          <v-text-field
                            v-model="Product.code"
                            :error-messages="errors"
                            outlined
                            dense
                            hide-details="auto"
                            label="Code"
                            required
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Category"
                          rules="required">
                          <treeselect
                            outlined
                            :error-messages="errors"
                            required
                            class="tree-border"
                            dense
                            v-model="Product.productCategory.id"
                            filled
                            :options="categories"
                            placeholder="Category"
                            @select="onSelectCategory"
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
                              <span
                                v-if="shouldShowCount"
                                :class="countClassName"
                                >({{ count }})</span
                              >
                            </label>
                          </treeselect>
                          <span
                            class="error-message"
                            v-if="categoryError != ''"
                          >
                            {{ categoryError }}</span
                          >
                        </ValidationProvider>
                        <!--                      </v-flex>-->
                      </v-col>
                      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                        <!-- <v-flex class="mb-2 font-weight-medium bg-light pa-3">Brand</v-flex> -->
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Brand"
                          dense
                          rules="required"
                        >
                          <v-autocomplete
                            v-model="Product.brand_Id"
                            item-text="name"
                            item-value="id"
                            :items="productBrands"
                            :error-messages="errors"
                            :loading="loadingBrand"
                            :search-input.sync="searchBrand"
                            outlined
                            required
                            dense
                            hide-details="auto"
                            label="Brand"
                          ></v-autocomplete>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12" lg="12"  >
                <v-card>
                  <v-card-title>Units</v-card-title>

                  <v-container>
                    <UnitComponent
                      :clickSubmit="clickSubmit"
                      ref="unitComponent"
                      :clear="isClickedClear"
                      @defaultUnit="setDefaultUnit"
                      @productUnits="setSelectedUnits"
                      @clickSubmit="getUnitValidation"
                    ></UnitComponent>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-card>
                  <v-card-title>Note</v-card-title>

                  <v-container>
                    <!-- <v-row>
                    <v-flex class="ma-2 font-weight-medium bg-light pa-3"
                      >Note</v-flex
                    >
                  </v-row> -->
                    <v-row>
                      <v-col cols="12" sm="12" md="12" lg="12">
                        <v-textarea
                          rows="3"
                          outlined
                          v-model="Product.remarks"
                          hide-details
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
            <v-row>
              <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                <v-card>
                  <!-- <v-card-title>Image</v-card-title> -->
                  <v-container>
                    <v-row>
                      <v-col cols="12" class="pb-0">
                        <v-flex class="pt-0 pa-1">
                          <FileUpload ref="fileUpload"
                            title="Image"
                            :multiple="false"
                            v-model="selectedImages"
                            size="2048"
                            :types="['jpeg', 'png', 'jpg']"
                            :showPreview="true"
                            :camera="true"
                            accept="image/x-png,image/gif,image/jpeg"
                          />
                        </v-flex>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-card>
                  <v-card-title>Description</v-card-title>

                  <v-container>
                    <!-- <v-row>
                    <v-flex class="ma-2 font-weight-medium bg-light pa-3"
                      >Description</v-flex
                    >
                  </v-row> -->
                    <v-row>
                      <v-col cols="12" sm="12" md="12" lg="12">
                        <v-textarea
                          rows="3"
                          outlined
                          v-model="Product.description"
                          hide-details
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
       
     <v-col cols="12" class="text-right pa-0">
              <v-btn
                depressed
                small
                class="ml-1 text-white btn_medium"
                @click="clear"
                >Clear</v-btn
              >
              <v-btn
                depressed
                small
                class="text-white btn_blue btn_medium w-100"
                @click="submit"
                >Submit</v-btn
              >
            </v-col>
      </ValidationObserver>
    </v-container>
  </div>
</template>
<script>
import UnitComponent from "./ProductUnit.vue";
import { required, email, max } from "vee-validate/dist/rules";
import FileUpload from "@/components/base/FileUpload";
import { Product } from "../../../models/Product";
import { ProductEntity } from "../../../models/EntityModels/ProductEntity";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import { ProductCategory } from "../../../models/ProductCategory";
import { ProductBrand } from "../../../models/ProductBrand";
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

setInteractionMode("eager");

// Mixins
// import Categories from "@/mixins/Categories";

extend("required", {
  ...required,
  message: "{_field_} is required",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  // mixins: [Categories],
  components: {
    ValidationProvider,
    ValidationObserver,
    Treeselect,
    FileUpload,
    UnitComponent,
  },
  data: () => ({
    cameraEnabled: false,
    isUnitValid: false,
    clickSubmit: false,
    loadingBrand: false,
    Product: new Product(),
    errors: [],
    messages: [],
    suppliers: [],
    productCategory: [new ProductCategory()],
    selectedSuppliers: [],
    productBrands: [new ProductBrand()],
    isLoading: false,
    tab: "Credit",
    selectedImages: "",
    isDisabledSubmit: false,
    categories: [],
    photo: null,
    isClickedClear: false,
    searchBrand: null,
    searchCategory: null,
    categoryError: "",
  }),
  created() {
    this.initialize();
    // this.GetProductBrands();
    this.GetBrandByQuery();
    this.GetProductCategoriesByQuery();
  },
  methods: {
    onSelectCategory(value) {
      this.categoryError = "";
    },
    initialize() {},
    getUnitValidation(value) {
      this.isUnitValid = value;
    },
    setDefaultUnit(value) {
      this.Product.defaultUnit = value;
    },
    setSelectedUnits(value) {
      this.Product.units = value;
    },
    selected(files) {
      console.log("files : ", files);
    },
    async submit() {
      this.clickSubmit = true;
      const isValid = await this.$refs.observer.validate();
      let validCategory =
        this.Product.productCategory && this.Product.productCategory.id != null;
      if (!validCategory) {
        this.categoryError = "Category is required";
      } else {
        this.categoryError = "";
      }
      if (
        validCategory&&
        isValid &&
        this.Product &&
        this.Product.defaultUnit &&
        this.Product.defaultUnit.is_purchasing_unit != undefined &&
        this.Product.defaultUnit.unit_id
      ) {
        this.AddProduct();
      } else {
        this.clickSubmit = false;
      }
    },

    clear() {
      // this.Supplier = new Supplier();
      this.isClickedClear = false;
      this.isClickedClear = true;
      this.Product = [];
      this.selectedImages=[];
      this.Product.productCategory={
        id:null,name:null
      };
      this.$refs.unitComponent.resetUnits();
      this.$refs.fileUpload.removeItem(0);
      this.$refs.observer.reset();
    },
    AddProduct() {
      this.isLoading = true;
      this.isDisabledSubmit = true;
      const credentials = new ProductEntity(this.Product);
      delete credentials.batches;
      delete credentials.supplier;
      this.$store
        .dispatch("product/AddProduct", credentials)
        .then(async (res) => {
          this.succeeed = true;
          this.initialize();

          if (this.selectedImages) {
            await this.UploadProductImage(res.data.id)
              .then(() => {
                this.isDisabledSubmit = false;
                this.isLoading = false;
              })
              .catch(() => {
                this.$toast.error("Product image uploading failed");
                this.isDisabledSubmit = false;
                this.isLoading = false;
              });
          }
          this.$toast.success("Product created  successfully");
          this.$router.push("/product");
        })
        .catch((err) => {
          this.$refs.observer.setErrors(err.data.error);

          // this.messages.push(err.data.title);
          this.$toast.error("Product create failed");
          this.isDisabledSubmit = false;
          this.isLoading = false;
        });
    },
    async UploadProductImage(productId) {
      let fromData = new FormData();
      fromData.append("image", this.selectedImages);
      fromData.append("id", productId);
      await this.$store.dispatch(`product/UploadProductImage`, fromData);
    },

    GetProductBrands() {
      this.loadingBrand = true;
      this.$store
        .dispatch("product/GetProductBrands")
        .then((res) => {
          this.productBrands = new ProductBrand().MapData(res.data.data);
          this.loadingBrand = false;
        })
        .catch((err) => {
          this.loadingBrand = false;
          this.messages.push(err.data.title);
        });
    },
    async GetBrandByQuery(query = "") {
      this.loadingBrand = true;
      await this.$store
        .dispatch("brand/GetBrandSearch", { query: query, status:'active' })
        .then((res) => {
          this.productBrands = new ProductBrand().MapData(res.data);
          this.loadingBrand = false;
        })
        .catch((err) => {});
    },
    GetProductCategoriesByQuery(query = "") {
      debugger;
      this.$store
        .dispatch("product/GetProductCategoriesWithChild", {
          query: query.searchQuery,
        })
        .then((res) => {
          console.log(res);
          this.categories = res.data;
        })
        .catch((err) => {});
    },
  },



  watch: {
    searchBrand: {
      handler(val) {
        this.GetBrandByQuery(val);
      },
      deep: true,
    },
    searchCategory: {
      handler(val) {
        this.GetProductCategoriesByQuery(val);
      },
      deep: true,
    },
  },
};
</script>

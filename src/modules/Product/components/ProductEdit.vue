<template>
  <div>
    <PageTitle title="Edit Product" :backBtn="true" :showLoading="isLoading" />
    <v-container fluid class="lighten-12 container">
      <ValidationObserver ref="observer">
        <v-row>
         

          <v-col cols="12" sm="12" md="12" lg="8">
            <v-row>
              <v-col cols="12">
                <v-card>
                
                  <v-card-title>General</v-card-title>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12" lg="6">
                        <ValidationProvider
                          v-slot="{ errors }"
                          vid="name"
                          name="Product name"
                          rules="required"
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

                      <v-col cols="12" sm="12" md="6" lg="6">
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
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="12" md="12" lg="6">
                        <v-flex>
                          <ValidationProvider
                            v-slot="{ errors }"
                            name="Category"
                            rules="required"
                          >
                            <treeselect
                              outlined
                              :error-messages="errors"
                              required
                              class="tree-border"
                              :value="id"
                              dense
                              v-model="Product.productCategory.id"
                              filled
                              :options="categories"
                              placeholder="Category"
                              :isDefaultExpanded="true"
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
                                :isDefaultExpanded="count == 2"
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
                        </v-flex>
                      </v-col>
                      <v-col md="6" lg="6">
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
                            hide-details
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
              <v-col cols="12">
                <v-card>
                  <v-card-title>Units</v-card-title>
                  <v-container>
                    <UnitComponent
                      :defaultUnit="Product.selectedDefaultUnit"
                      :selectedUnits="Product.units"
                      :isUnitEditable="isUnitEditable"
                      :isUpdate="true"
                      @defaultUnit="setDefaultUnit"
                      @productUnits="setSelectedUnits"
                    ></UnitComponent>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12" lg="12">
                <v-card>
                  <v-card-title>Note</v-card-title>
                  <v-container>
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
          <v-col cols="12" sm="12" md="12" lg="4">
            <v-row>
              <v-col cols="12">
                <v-card>
                  
                  <v-container>
                    <FileUpload
                      title="Image"
                      @isImageUpdated="onChangeImageUpload"
                      :multiple="false"
                      v-model="selectedImages"
                      size="2048"
                  ref="imageInput"
                      :types="['jpeg', 'png', 'jpg']"
                      :showPreview="true"
                      :externalFiles="Product.image ? [Product.image] : []"
                      :camera="true"
                    />
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-card>
                  <v-card-title>Description</v-card-title>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="6" lg="12">
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
              <btn-cancel></btn-cancel>
              <v-btn
                depressed
                small
                class="text-white btn_blue btn_medium w-100"
                @click="submit"
                >Update</v-btn
              >
            </v-col>
        <BatchForm
          ref="batchForm"
          @conform="refreshBatches($event)"
          :productUnits="productUnits"
          :productbatch="ProductBatches"
          :product="Product"
        />
      </ValidationObserver>
    </v-container>
  </div>
</template>
<script>
import UnitComponent from "./ProductUnit.vue";
import { required, email, max } from "vee-validate/dist/rules";
import pagination from "../../shared/components/pagination.vue";
import { Product } from "../../../models/Product";
import { ProductEntity } from "../../../models/EntityModels/ProductEntity";
import BatchForm from "./ProductBatchModal";
import { ProductBatch } from "../../../models/ProductBatch";
import { SupplierListViewModel } from "../../../models/View Models/Supplier";
import _ from "lodash";
import FileUpload from "@/components/base/FileUpload";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import { ProductCategory } from "../../../models/ProductCategory";
import { ProductViewModel } from "../../../models/View Models/ProductViewModel";
import { ProductBrand } from "../../../models/ProductBrand";
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import Categories from "@/mixins/Categories";
setInteractionMode("eager");

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
    BatchForm,
    Treeselect,
    FileUpload,
    UnitComponent,
  },
  data: () => ({
    Product: new Product(),
    ProductBatches: new ProductBatch(),
    errors: [],
    messages: [],
    suppliers: [],
    imageUpdated: null,
    isLoading: false,
    productCategories: [],
    selectedSuppliers: [],
    loadingBrand: false,
    selectedProductUnits: [],
    productBrands: [new ProductBrand()],
    isUnitEditable: false,
    items: [
      { tab: "Batch", content: "this is credit tab" },
      { tab: "Supplier", content: "" },
    ],
    tab: "Credit",
    selectedImages: "",
    batchheaders: [
      { text: "Batch", value: "name" },
      { text: "Manufacture Date", value: "manufacureDate" },
      { text: "Expirery Date", value: "expiryDate" },
      { text: "status", value: "status", align: "center", width: "10%" },
      { text: "", value: "action" },
    ],
    supplierHeaders: [
      { text: "Supplier Name", value: "name" },
      { text: "Email Address", value: "phone" },
      { text: "Phone", value: "email" },
      { text: "", value: "action" },
    ],
    categories: [],
    searchBrand: null,
    categoryError: "",
  }),
  created() {
    this.GetProductCategory();
    this.GetProductBrands();
    this.GetSuppliers();
    this.GetProduct();
    this.GetCategories();
    this.GetBrandByQuery();
  },
  methods: {
    onSelectCategory(value) {
      this.categoryError = "";
    },
    onChangeImageUpload(value) {
      this.imageUpdated = value;
    },
    GetCategories() {
      this.$store
        .dispatch("product/GetProductCategoriesWithChild")
        .then((res) => {
          this.categories = res.data;
          console.log("this.categories", this.categories);
          console.log("this.categoryTreeData", this.categoryTreeData);
        })
        .catch((err) => {
          this.messages.push(err.data.title);
        });
    },
    setDefaultUnit(value) {
      this.Product.defaultUnit = value;
    },
    setSelectedUnits(value) {
      console.log(value);
      this.Product.selectedProductUnits = value;
    },
    async submit() {
      const isValid = await this.$refs.observer.validate();
      let validCategory =
        this.Product.productCategory && this.Product.productCategory.id != null;
      if (!validCategory) {
        this.categoryError = "Category is required";
      } else {
        this.categoryError = "";
      }
      if (validCategory && isValid) {
        this.EditProduct();
      }
    },
    async UploadProductImage1(productId) {
      let fromData = new FormData();
      if (this.selectedImages && this.imageUpdated) {
        fromData.append("id", productId);
        fromData.append("image", this.selectedImages);
        return await this.$store.dispatch(
          `product/UploadProductImage`,
          fromData
        );
      } else if (this.imageUpdated == false) {
        fromData.append("id", productId);
        fromData.append("image", null);
        return await this.$store.dispatch(
          `product/UploadProductImage`,
          fromData
        );
      } else {
        return true;
      }
    },

    clear() {
      this.Product.productCategory.id = "";
      this.Product = [];
      this.Supplier = new Supplier();
      this.$refs.observer.reset();
    },
    getStatusColor(status) {
      return status == "Active" ? "green" : "gray";
    },
    EditProduct() {
      this.isLoading = true;
      const credentials = this.Product;
      credentials.Id = this.$route.params.id;
      credentials.units = this.Product.selectedProductUnits;
      this.$store
        .dispatch("product/EditProduct", credentials)
        .then(async (res) => {
          this.succeeed = true;
          await this.UploadProductImage1(credentials.Id)
            .then(() => {
              this.isDisabledSubmit = false;
              this.isLoading = false;
            })
            .catch(() => {
              this.$toast.error("Product image uploading failed");
              this.isDisabledSubmit = false;
              this.isLoading = false;
            });
          this.$toast.success("Product updated successfully");
          this.$router.push("/product");
        })
        .catch((err) => {
          this.isLoading = false;
          this.$refs.observer.setErrors(err.data.error);
          this.$toast.error(" Product edited failed");
          this.isDisabledSubmit = false;
        });
    },

    GetProductCategory() {
      this.$store
        .dispatch("product/GetProductCategories")
        .then((res) => {
          this.productCategories = res.data.data;
        })
        .catch((err) => {
          this.messages.push(err.data.title);
        });
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
          this.messages.push(err.data.title);
          this.loadingBrand = false;
        });
    },
    AddBatch($event) {
      if ($event.isAdd && !$event.isEdit) {
        this.Product.batches.push($event);
      } else if ($event.isAdd && $event.isEdit) {
        this.Product.batches.splice(
          this.Product.batches.indexOf(this.ProductBatches),
          1,
          $event
        );
      }
    },
    deleteBatch(batch) {
      this.Product.batches.splice(this.Product.batches.indexOf(batch), 1);
    },
    deleteSupplier(supplier) {
      this.Product.suppliers.splice(
        this.Product.suppliers.indexOf(supplier),
        1
      );
      this.selectSuppliers();
    },
    editBatch(batch) {
      this.ProductBatches = batch;
      this.ProductBatches = _.cloneDeep(batch);
      this.productUnits = batch.unitPriceDetails;
      this.ProductBatches.isAdd = false;
      this.$refs.batchForm.openModal();
    },
    OpenModal() {
      this.ProductBatches = new ProductBatch();
      this.$refs.batchForm.openModal();
    },

    GetSuppliers() {
      this.$store
        .dispatch("supplier/GetSuppliers", {
          filters: {
            searchText: "",
            roles: [1, 2],
          },
        })
        .then((res) => {
          this.suppliers = res.data.data.map((u, i, arr) => {
            u.index = i + 1;
            return new SupplierListViewModel(u);
          });
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.messages = err.data.title;
        });
    },
    GetProduct() {
      debugger
      console.log("Product ");
      let Id = this.$route.params.id;
      this.$store
        .dispatch("product/GetProductById", Id)
        .then((res) => {
           this.$refs.imageInput.GetImage();
          debugger
          this.CheckUnitEditable();
          this.Product = new ProductViewModel(res.data);
          {
              this.Product.image=this.Product.image+'?t='+Date.now()
          }
         
          if (this.Product.selectedDefaultUnit && this.Product.units) {
            this.Product.units = this.Product.units.filter(
              (u) => u.id != this.Product.selectedDefaultUnit.id
            );
          }
          this.productUnits = this.Product.units;
          this.ProductBatches.productId = this.Product.Id;
          this.selectedSuppliers = this.Product.suppliers.map((u, i, arr) => {
            u.index = i + 1;
            return new SupplierListViewModel(u);
          });

          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.messages = err.data.title;
        });
    },
    CheckUnitEditable() {
      console.log("Product ");
      let Id = this.$route.params.id;
      this.$store
        .dispatch("product/CheckUnitEditable", Id)
        .then((res) => {
          this.isUnitEditable = res.data.data;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.messages = err.data.title;
        });
    },
    selectSuppliers() {
      (this.selectedSuppliers = []),
        this.Product.suppliers.forEach((supplier) => {
          this.selectedSuppliers.push(
            this.suppliers.find((item) => item.id === supplier)
          );
        });
    },
    ArchiveBatch(item) {
      this.$store
        .dispatch("ArchiveOrActiceBatches", item.id)
        .then((res) => {
          this.GetProduct();
        })
        .catch((err) => {});
    },
    refreshBatches($event) {
      this.GetProduct();
    },
    async GetBrandByQuery(query = "") {
      this.loadingBrand = true;
      await this.$store
        .dispatch("brand/GetBrandSearch", { query: query })
        .then((res) => {
          this.productBrands = new ProductBrand().MapData(res.data);
          this.loadingBrand = false;
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
  },
};
</script>
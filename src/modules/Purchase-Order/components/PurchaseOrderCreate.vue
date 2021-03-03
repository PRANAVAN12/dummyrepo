<template>
  <div>
    <PageTitle
      title="Create Purchase Order"
      :backBtn="true"
      :showLoading="isLoading"
    />
    <v-container fluid class="lighten-12 container">
      <ValidationObserver ref="observer">
        <v-row>
          <v-col cols="12"  sm="12" md="12" lg="3">
            <v-card class="lighten-12">
              <v-card-title>General </v-card-title>
              <v-container fluid class="light gray lighten-12">
                <v-row>
                  <v-col cols="12" sm="12" md="12" lg="12">
                    <ValidationProvider>
                      <datePickComponent
                        hide-details="auto"
                        v-model="PurchaseOrder.date"
                        labelname="Date"
                      />
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" lg="12">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Warehouse"
                      rules="required"
                    >
                      <v-autocomplete
                        required
                        v-model="PurchaseOrder.wareHouse_id"
                        :items="warehouses"
                        item-text="name"
                        :search-input.sync="searchWarehouse"
                        :loading="wareHouseGetLoading"
                        item-value="id"
                        label="Warehouse"
                        outlined
                        hide-details="auto"
                        :error-messages="errors"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>

                  <v-col cols="12" sm="12" md="12" lg="12">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Supplier"
                      rules="required"
                    >
                      <v-autocomplete
                        v-model="PurchaseOrder.supplier_id"
                        @input="onSelectSupplier"
                        :items="suppliers"
                        :search-input.sync="searchSupplier"
                        :loading="projectsLoading"
                        item-text="name"
                        item-value="id"
                        label="Supplier"
                        hide-details="auto"
                        outlined
                        required
                        :error-messages="errors"
                      ></v-autocomplete>
                      <div
                        v-if="
                          (PurchaseOrder.supplier_id == null ||
                            PurchaseOrder.supplier_id < 1) &&
                          errors == ''
                        "
                        class="error-containner pa-1"
                      >
                        Please select supplier before adding product
                      </div>
                    </ValidationProvider>
                  </v-col>
                </v-row>
                <v-row></v-row>
              </v-container>
            </v-card>
          </v-col>
          <v-col cols="12" sm="12" md="12" lg="9">
            <v-card class="lighten-12">
              <v-card-title class="justify-space-between"
                >Purchase Order Product list
                <a @click="getProductsByreorderlevel()"
                  >Load products based on reorder-level</a
                >
              </v-card-title>
              <v-container fluid class="light gray lighten-12">
                <ValidationObserver ref="observer">
                  <form>
                    <v-row>
                      <template v-if="messages">
                        <v-alert
                          v-for="msg in messages"
                          :key="msg"
                          class="messages"
                          outlined
                          type="error"
                          >{{ msg }}</v-alert
                        >
                      </template>
                    </v-row>

                    <v-row>
                      <v-col cols="12" v-if="isProductListValid != ''">
                        <v-flex
                          v-model="isProductListValid"
                          class="product-red"
                        >
                          {{ isProductListValid }}
                        </v-flex>
                      </v-col>
                      <v-col cols="12" sm="12">
                        <v-autocomplete
                          :disabled="
                            PurchaseOrder.supplier_id == null ||
                            PurchaseOrder.supplier_id < 1
                          "
                          v-model="selectedProductId"
                          :items="products"
                          hide-details="auto"
                          item-text="name"
                          item-value="id"
                          label="Choose product"
                          outlined
                          dense
                          :search-input.sync="searchProduct"
                          :loading="productGetLoading"
                          :error-messages="errors"
                          @input="onSelectProduct"
                        >
                          <template v-slot:item="{ item }">
                            <div>{{ item.name }}</div>
                          </template>
                        </v-autocomplete>
                      </v-col>
                      <v-col cols="3" hidden>
                        <v-checkbox
                          v-model="isLoadOnlyReorderlevel"
                          label="Load products based on reorder-level"
                          color="#002db3"
                          @change="getProductsByreorderlevel()"
                          :value="isLoadOnlyReorderlevel"
                          hide-details
                        ></v-checkbox>
                      </v-col>
                      <v-col cols="12">
                        <v-row>
                          <v-col cols="12">
                            <v-data-table
                              :headers="headers"
                              :items="selectedProducts"
                              item-key="clientName"
                              hide-default-footer
                              disable-pagination
                            >
                              <template
                                v-slot:item.unit="{ item }"
                                v-slot="{ errors }"
                                name="Unit"
                                rules="numeric"
                              >
                                <ValidationProvider>
                                  <v-select
                                    v-model="item.unit.id"
                                    :items="item.units"
                                    outlined
                                    item-text="name"
                                    item-value="id"
                                    @input="onchangeUnit(item)"
                                    type="number"
                                    :error-messages="item.unitError"
                                    required
                                    dense
                                    class="pt-3 pr-2"
                                  ></v-select>
                                </ValidationProvider>
                              </template>
                              <template
                                v-slot:item.quantity="{ item }"
                                v-slot="{ errors1 }"
                                name="Quantity"
                                rules="numeric"
                              >
                                <ValidationProvider>
                                  <v-text-field
                                    hide-details="auto"
                                    v-model="item.quantity"
                                    outlined
                                    dense
                                    type="number"
                                    @input="increaseCount(item)"
                                    min="1"
                                    :error-messages="item.quantityError"
                                    required
                                  ></v-text-field>
                                </ValidationProvider>
                              </template>
                              <template v-slot:item.action="{ item }">
                                <div class="space-around">
                                  <div
                                    v-if="
                                      item.units.length > 1 && !item.disabled
                                    "
                                  >
                                    <v-tooltip bottom>
                                      <template
                                        v-slot:activator="{ on, attrs }"
                                      >
                                        <v-btn
                                          x-small
                                          color="black"
                                          icon
                                          v-bind="attrs"
                                          v-on="on"
                                          @click="duplicateProduct(item)"
                                        >
                                          <v-icon>mdi-content-copy</v-icon>
                                        </v-btn>
                                      </template>
                                      <span>Duplicate product</span>
                                    </v-tooltip>
                                  </div>
                                  <div>
                                    <v-btn
                                      x-small
                                      color="black"
                                      icon
                                      @click="removeProduct(item)"
                                    >
                                      <v-icon>mdi-close-circle</v-icon>
                                    </v-btn>
                                  </div>
                                </div>
                              </template>
                            </v-data-table>
                            <v-divider></v-divider>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col></v-col>
                        </v-row>
                        <v-row>
                          <v-col></v-col>
                        </v-row>

                        <v-card-title>Note </v-card-title>
                        <v-row>
                          <v-col class="pa-1 ma-1">
                            <v-textarea
                              rows="3"
                              outlined
                              v-model="PurchaseOrder.remarks"
                              hide-details="auto"
                            ></v-textarea>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                    <v-row></v-row>
                  </form>
                </ValidationObserver>
              </v-container>
            </v-card>
            <v-col cols="12" class="text-right">
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
          </v-col>
        </v-row>
        
        <v-navigation-drawer
          app
          
          :width="drawerSize"
          v-model="drawer"
          absolute
          temporary
          right
        >
          <v-card style="height: 100%" >
            <v-card-title> Select reorder level products </v-card-title>
            <v-container>
              <v-row>
                <v-data-table
                  v-model="selected"
                  :headers="ReorderLevelProductHeaders"
                  :items="reOrderLevelProducts"
                  item-key="tempId"
                  show-select
                  class="elevation-1"
                  hide-default-footer
                  disable-pagination
                >
                  <template v-slot:header.data-table-select> </template>

                  <template v-slot:item.assigned="{ item }">
                    {{ item.disabled ? "no" : "yes" }}
                  </template>
                  <template v-slot:item.data-table-select="{ item }">
                    <v-checkbox
                      color="#002db3"
                      v-model="selected"
                      class="pa-3"
                      :value="item"
                      :disabled="item.disabled"
                    ></v-checkbox>
                  </template>
                </v-data-table>
              </v-row>
             <v-row>
              <v-col cols="10"></v-col>
              <v-col cols="12" sm="6" lg="2">
                <v-btn
                  depressed
                  small
                  class="text-white btn_blue btn_medium w-70"
                  @click="applySelectedOrder()"
                  >Apply</v-btn
                >
              </v-col>
            </v-row>
            </v-container>
          </v-card>
        </v-navigation-drawer>
      </ValidationObserver>
    </v-container>
  </div>
</template>
<script>
import datePickComponent from "../../../components/base/DateComponent";
import { PurchaseOrder } from "../../../models/PurchaseOrder";
import { required, email, max, numeric } from "vee-validate/dist/rules";
import { SupplierListViewModel } from "../../../models/View Models/Supplier";
import _ from "lodash";
import FileUpload from "@/components/base/FileUpload";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import { Product } from "../../../models/Product";
import { PurchaseOrderEntityModel } from "../../../models/EntityModels/PurchaseOrderEntityModel";
extend("required", {
  ...required,
  message: "{_field_} is required",
});
extend("numeric", {
  ...numeric,
  message: "input must be numeric",
});
export default {
  data: () => ({
    selectedFiles: "",
    messages: [],
    errors: [],
    siteSetting: Object,
    errors1: [],
    suppliers: [],
    warehouses: [],
    drawer: false,
    reOrderLevelProducts: [],
    selectedStatus: ["Pending"],
    purchaseOrderStatus: ["Pending", "Received"],
    selectedProducts: [],
    selectedProduct: null,
    selectedProductClonedDetails: [],
    PurchaseOrder: new PurchaseOrder(),
    selectedSupplierDetails: null,
    wareHouseGetLoading: false,
    products: [],
    clonedProducts: [],
    singleSelect: false,
    selected: [],
    isLoadOnlyReorderlevel: false,
    projectsLoading: false,
    searchProduct: null,
    searchSupplier: null,
    searchWarehouse: null,
    productGetLoading: false,
    selectedProductId: 0,
    isProductListValid: "",
    isLoading: false,
    ReorderLevelProductHeaders: [
      {
        text: "Product name",
        align: "start",
        value: "name",
        
      },
      {
        text: "Product unit",
        value: "unit.name",
        align: "start",
        width: "25%",
      },
      {
        text: "Available quantity",
        value: "availableStock",
        align: "start",
      },
      {
        text: "Reorder level",
        value: "reorderQuantity",
        align: "start",
      },
      {
        text: "Is assigned to selected  Supplier",
        value: "assigned",
        align: "start",
      },
    ],
    headers: [
      {
        text: "Product name",
        value: "name",
        align: "start",
        width:"20%"

      },
      {
        text: "Product code",
        value: "code",
        align: "start",
        width:"20%"

      },

      {
        text: "Product unit",
        value: "unit",
        width: "25%",
        align: "center",
        width:"20%"

      },
      {
        text: "Qty",
        value: "quantity",
              width:"20%",

        align: "center",
      },
      {
        text: "Actions",
        value: "action",
        align: "center",
               width:"20%"

      },
    ],
  }),
  computed: {
    drawerSize: {
      get: function () {
        switch (this.$vuetify.breakpoint.name) {
          case "xs":
            return "90%";
          case "sm":
            return "90%";
          case "md":
            return "40%";
          case "lg":
            return "50%";
          case "xl":
            return "50%";
        }
      },
    },
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    datePickComponent,
    FileUpload,
  },
  methods: {
    clear() {
      this.PurchaseOrder.wareHouse_id = "";
      this.PurchaseOrder.supplier_id = "";
      this.PurchaseOrder.remarks = "";
      this.PurchaseOrder = new PurchaseOrder();
      this.selectedFiles = "";
      this.selectedProductId = "";
      this.isProductListValid = "";
      (this.selectedProducts = []), this.$refs.fileUpload.removeAllItems();
      this.$refs.observer.reset();
    },
    onSelectSupplier(supplier) {
      this.selectedSupplierDetails = this.suppliers.find(
        (sup) => sup.id === this.PurchaseOrder.supplier_id
      );
      this.getProductsByQuery();
      this.selectedProducts = [];
    },
    onSelectProduct(product) {
      this.selectedProduct = this.products.find(
        (item) => item.id === this.selectedProductId
      );
      this.selectedProductClonedDetails.unshift(_.cloneDeep(this.selectedProduct));
      this.selectedProduct.quantity = 1;
      this.selectedProduct.unitError = [];
      // this.selectedProduct.quantityError= [];
      this.selectedProduct.unit = this.selectedProduct.defaultUnit;
      if (
        this.selectedProducts.find((p) => p.id == this.selectedProduct.id) ==
        null
      ) {
        this.selectedProduct.unitError = [];
        // this.selectedProduct.quantityError=[];
        this.selectedProducts.unshift(this.selectedProduct);
      }
      this.selectedProductId = {};
      this.getProductsByQuery();

      if (this.selectedProducts.length) {
        this.isProductListValid = "";
      }
    },
    applySelectedOrder() {
      this.selectedProducts.forEach((pr) => {
        if (
          this.reOrderLevelProducts.find(
            (p) => p.product_id == pr.id && p.unit.id == pr.unit.id
          ) &&
          !this.selected.find(
            (p) => p.product_id == pr.id && p.unit.id == pr.unit.id
          )
        ) {
          let index = this.selectedProducts.findIndex(
            (p) => p.product_id == pr.id && p.unit.id == pr.unit.id
          );
          let product = this.selectedProducts.find(
            (p) => p.product_id == pr.id && p.unit.id == pr.unit.id
          );
          if (index != -1) {
            this.selectedProducts.splice(index, 1);
            this.removeDuplicateUnitForSameProduct(product);
          }
        }
      });
      ///////////push the product if i not already assigned
      this.selected.forEach((product) => {
        if (
          !this.selectedProducts.find(
            (p) => p.product_id == product.id && p.unit.id == product.unit.id
          )
        ) {
          product.quantity = product.reorderQuantity;
          this.selectedProducts.unshift(product);
          this.selectedProductClonedDetails.unshift(_.cloneDeep(product));
          this.removeDuplicateUnitForSameProduct(product);
        }
      });
    },
    removeProduct(product) {
      this.selectedProducts.splice(this.selectedProducts.indexOf(product), 1);
      this.selectedProductId = null;
      this.getProductsByQuery();
      this.removeDuplicateUnitForSameProduct(product);
      let productReorderIndex = this.selected.findIndex(
        (p) =>
          p.product_id == product.product_id && p.unit.id == product.unit.id
      );
      if (productReorderIndex != -1) {
        this.selected.splice(productReorderIndex, 1);
      }
    },
    onchangeUnit(item) {
      this.removeDuplicateUnitForSameProduct(item);
      this.selected = [];
      this.selectedProducts.forEach((product) => {
        let productReorder = this.reOrderLevelProducts.find(
          (p) =>
            p.product_id == product.product_id && p.unit.id == product.unit.id
        );
        if (productReorder) {
          this.selected.unshift(productReorder);
        }
      });
    },
    duplicateProduct(product) {
      let item = _.cloneDeep(product);
      item.count = item.count + 1;
      item.quantity = 1;
      item.unit = { id: 0 };
      item.unitError = [];
      item.quantityError = [];
      var sameProducts = this.selectedProducts.filter(
        (product) => product.id === item.id
      );
      if (sameProducts) {
        sameProducts.forEach((product) => {
          product.count = item.count;
        });
      }
      this.selectedProducts.unshift(item);
      this.removeDuplicateUnitForSameProduct(product);
    },
    removeDuplicateUnitForSameProduct(item) {
      let sameProducts = this.selectedProducts.filter(
        (p) => p.product_id == item.product_id
      );
      let productDetail = _.cloneDeep(
        this.selectedProductClonedDetails.find(
          (p) => p.product_id === item.product_id
        )
      );
      item.unitError = [];
      // item.quantityError=[];
      let units = [];
      sameProducts.forEach((product) => {
        if (sameProducts.length == productDetail.units.length) {
          product.disabled = true;
        } else {
          product.disabled = false;
        }
        if (product.unit) {
          units.push(product.unit.id);
        }
      });
      sameProducts.forEach((product) => {
        const clonedProduct = _.cloneDeep(product);
        let unitsCloned = _.cloneDeep(productDetail.units);
        units.forEach((u) => {
          if (
            clonedProduct &&
            clonedProduct.unit &&
            clonedProduct.unit.id != u
          ) {
            const index = unitsCloned.findIndex((i) => i.id == u);
            if (index != -1) {
              unitsCloned.splice(index, 1);
            }
          }
        });
        product.units = unitsCloned;
      });
    },
    createPurchaseOrder() {
      this.isLoading = true;
      let purchaseOrder = _.cloneDeep(this.PurchaseOrder);
      purchaseOrder.products = _.cloneDeep(this.selectedProducts);
      this.$store
        .dispatch(
          "purchaseOrder/createPurchaseOrder",
          new PurchaseOrderEntityModel(purchaseOrder)
        )
        .then((res) => {
          if (this.selectedFiles) {
            const fileId = res.data.id;
            const files = this.selectedFiles;
            const documentType = "PURCHASE_ORDER";
            this.$store
              .dispatch("DocumentUploads", {
                fileId,
                files,
                documentType,
              })
              .then((resp) => {
                console.log(resp);
              });
          }
          this.$toast.success("Purchase order created successfully");
          this.$router.push("/purchase-order");
          this.isLoading = false;
        })
        .catch((err) => {
          this.$toast.error("Purchase order created failed");
          this.isLoading = false;
          this.messages = err.data.title;
        });
    },
    getProductsByQuery(query = "") {
      this.productGetLoading = true;
      let productsIDs = [];
      this.selectedProducts.forEach((product) => {
        productsIDs.push(product.id);
      });
      this.$store
        .dispatch("product/GetProduct", {
          query: query,
          except: productsIDs,
          status: "active",
        })
        .then((res) => {
          this.products = res.map((u, i, arr) => {
            u.index = i + 1;
            if (
              u.suppliers.find(
                (sp) => sp.id == this.PurchaseOrder.supplier_id
              ) != null
            ) {
              // u.disabled = true;
              u.disabled = false;
            } else {
              // u.disabled = false;
              u.disabled = true;
            }
            return new Product().toViewModel(u);
          });
          this.isLoading = false;
          this.productGetLoading = false;
          console.log(this.products);
        })
        .catch((err) => {
          this.isLoading = false;
          this.productGetLoading = false;
          this.messages = err.data.title;
        });
    },
    getSupplierByQuery(query = "") {
      this.projectsLoading = true;
      this.$store
        .dispatch("supplier/GetSupplierSearch", {
          query: query,
          status: "active",
        })
        .then((res) => {
          console.log(res);
          this.suppliers = res.map((u, i, arr) => {
            u.index = i + 1;
            return new SupplierListViewModel(u);
          });
          this.isLoading = false;
          this.projectsLoading = false;
        })
        .catch((err) => {
          this.projectsLoading = false;
          this.isLoading = false;
          this.messages = err.data.title;
        });
    },
    async submit() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        if (this.selectedProducts.length != 0) {
          let error = false;
          this.selectedProducts.forEach((product) => {
            if (!product.unit.id) {
              error = true;
              product.unitError.push("Select Unit");
            }
            if (product.quantity < 1) {
              error = true;
              product.quantityError.push("Quantity must be greater than 0");
            }
          });
          console.log("DHufbd", this.selectedProducts);
          if (!error) {
            this.createPurchaseOrder();
          }
        } else {
          this.isProductListValid = "Please select at least one product";
        }
      }
    },
    getWarehouseByQuery(query = "") {
      this.wareHouseGetLoading = true;
      this.$store
        .dispatch("warehouse/GetWarehouse", { query: query, status: "active" })
        .then((res) => {
          console.log(res);

          this.warehouses = res;
          this.wareHouseGetLoading = false;
        })
        .catch((err) => {
          this.wareHouseGetLoading = false;
          this.messages = err.data.name;
        });
    },
     getProductsByreorderlevel() {
      debugger
      this.drawer = !this.drawer;
      this.selectedProducts.forEach((product) => {
        let foundProduct = this.reOrderLevelProducts.find(
          (p) =>
            p.product_id == product.product_id && p.unit.id == product.unit.id
        );
        if (foundProduct) {
          this.selected.push(foundProduct);
        }
      });
      let productsIDs = [];
      this.drawer = true;
      this.$store
        .dispatch("product/GetProductsByReorderLevel", {
          id: this.PurchaseOrder.wareHouse_id,
        })
        .then((res) => {
          this.reOrderLevelProducts=[];
          let i=0;
          debugger
          let groupedArray = _.groupBy(res, function (entry) {
            return   entry.unit.id+","+entry.product.id
          });
              Object.keys(groupedArray).map((key) => {

                let u=groupedArray[key][0];
            u.index = i + 1;
            u.product.unit = u.unit;
            u.product.reorderQuantity = u.reorder_level;
            u.product.availableStock = _.sumBy(groupedArray[key], "available_stock");
            u.product.tempId = u.id;
            i++;

            if (
              u.product.suppliers.find(
                (sp) => sp.id == this.PurchaseOrder.supplier_id
              ) != null
            ) {
              u.product.disabled = false;
            } else {
              u.product.disabled = true;
            }
                this.reOrderLevelProducts.push(new Product().toViewModel(u.product));
          });
          this.isLoading = false;
          this.selected = [];
          this.selectedProducts.forEach((product) => {
            let foundProduct = this.reOrderLevelProducts.find(
              (p) =>
                p.product_id == product.product_id &&
                p.unit.id == product.unit.id
            );
            if (foundProduct) {
              this.selected.push(foundProduct);
            }
          });
        })
        .catch((err) => {
          this.isLoading = false;
          this.messages = err.data.name;
        });
    },
    assignProduct($event) {
      $event.quantity = 1;
      this.selectedProduct.quantity = 1;
      this.selectedProduct.unit = this.selectedProduct.defaultUnit;
      if (
        this.selectedProducts.find((p) => p.id == this.selectedProduct.id) ==
        null
      ) {
        this.selectedProducts.unshift(this.selectedProduct);
      }
      this.selectedProductId = {};
      this.getProductsByQuery();
    },
    openReorderlevelProducts() {
      // this.selectedbarcode = details;
      this.drawer = true;
    },
    increaseCount(item) {
      if (item.quantity > 0) {
        item.quantityError = [];
      } else {
        item.quantityError = [];
        item.quantityError.push("Quantity must be greater than 0");
      }
    },
  },
  created() {
    this.getSupplierByQuery();
    this.getWarehouseByQuery();
  },

  watch: {
    searchProduct(value) {
      if (!value) {
        this.getProductsByQuery("");
      }
      this.getProductsByQuery(value);
    },
    searchWarehouse(value) {
      this.getWarehouseByQuery(value);
    },
    searchSupplier(value) {
      if (!value) {
        this.getSupplierByQuery("");
      }
      this.getSupplierByQuery(value);
    },
  },
};
</script>
<style scoped>

@media only screen and (max-width: 1000px) {
.v-navigation-drawer--close.v-navigation-drawer--temporary {
    transform: translateX(-13vw) !important;
}
}

@media only screen and (max-width: 600px) {
 .v-navigation-drawer {
   width: 75% !important;
 }
}
 
</style>

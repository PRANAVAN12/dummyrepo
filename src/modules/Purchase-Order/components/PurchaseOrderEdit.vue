<template>
  <div>
    <PageTitle
      title="Edit Purchase Order"
      :backBtn="true"
      :showLoading="isLoading"
    />
    <v-container fluid class="lighten-12 container">
      <!-- Page Title -->

      <v-row>
        <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
          <v-card class="lighten-12">
            <v-card-title>General</v-card-title>
            <v-container fluid class="light gray lighten-12">
              <!-- <v-row>
              <form> -->
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
                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                  <ValidationProvider>
                    <datePickComponent
                      v-model="PurchaseOrder.date"
                      labelname="Date"
                    />
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Warehouse"
                    rules="required"
                  >
                    <v-autocomplete
                      v-model="PurchaseOrder.wareHouse_id"
                      :items="warehouses"
                      :search-input.sync="searchWarehouse"
                      :loading="getWarehouseLoading"
                      item-text="name"
                      item-value="id"
                      label="Warehouse"
                      outlined
                      required
                      hide-details="auto"
                      :error-messages="errors"
                      type="error"
                      >{{ msg }}</v-autocomplete
                    >
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
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
                      :loading="supplierLoading"
                      item-text="name"
                      item-value="id"
                      label="Supplier"
                      required
                      hide-details="auto"
                      outlined
                      :error-messages="errors"
                    ></v-autocomplete>
                    <div
                      v-if="
                        PurchaseOrder.supplier_id == null ||
                        PurchaseOrder.supplier_id < 1
                      "
                      class="error-containner pa-1"
                    >
                      Please select supplier before adding product
                    </div>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12"  sm="12" md="12" lg="12" >
                  <v-select
                    v-model="PurchaseOrder.status"
                    @input="onSelectProduct"
                    :items="purchaseOrderStatus"
                    :error-messages="errors"
                    outlined
                    dense
                    label="Status"
                  />
                </v-col>
              </v-row>
              <!-- </form>
            </v-row> -->
              <v-row> </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="8" lg="8" xl="8">
          <v-card class="lighten-12" style="min-height: 350px">
            <v-card-title class="justify-space-between"
              >Purchase order product list
              <a @click="getProductsByreorderlevel()"
                >Load products based on reorder-level</a
              >
            </v-card-title>
            <v-container  fluid class="light gray lighten-12">
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
                    <v-col cols="12" xs="12" sm="12" md="12" lg="4" xl="12">
                      <!-- <v-card>
                    <v-card-text>-->
                      <v-row>
                        <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                          <v-autocomplete
                            :disabled="
                              PurchaseOrder.supplier_id == null ||
                              PurchaseOrder.supplier_id < 1
                            "
                            v-model="selectedProductId"
                            :items="products"
                            hide-details
                            item-text="name"
                            item-value="id"
                            label="Choose Product"
                            outlined
                            dense
                            :search-input.sync="searchProduct"
                            :loading="getProductsLoading"
                            :error-messages="errors"
                            @input="onSelectProduct"
                          >

                            <template v-slot:item="{ item }">
                             {{ item.name }}
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
                      </v-row>
                      <!-- </v-card-text>
                    </v-card>-->
                    </v-col>
                    <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                      <v-row>
                        <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                          <!-- <v-autocomplete
                              v-model="selectedProductId"
                              :items="products"
                              item-text="name"
                              item-value="id"
                              label="Choose Product"
                              outlined
                              dense
                              :search-input.sync="searchProduct"
                              :loading="projectsLoading"
                              :error-messages="errors"
                              @input="onSelectProduct"
                        ></v-autocomplete>-->

                          <!-- <v-select
                  v-model="PurchaseOrder.products"
                  @input="onSelectProduct)"
                  item-text="name"
                  item-value="id"
                  :items="products"
                  :error-messages="errors"
                  label="Please add product to orderlist"
                  multiple
                        />-->

                          <!-- <v-card-text class="pa-0"> -->
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
                                  type="number"
                                  @input="onchangeUnit(item)"
                                  :error-messages="item.unitError"
                                  required
                                  dense
                                  class="pt-3"
                                ></v-select>
                              </ValidationProvider>
                            </template>
                            <template
                              v-slot:item.quantity="{ item }"
                              v-slot="{ errors }"
                              name="Quantity"
                              rules="numeric"
                            >
                              <ValidationProvider>
                                <v-text-field
                                  v-model="item.quantity"
                                  min="1"
                                  type="number"
                                  @input="increaseCount(item)"
                                  :error-messages="item.quantityError"

                                  dense
                                  outlined
                                  class="pt-3"
                                ></v-text-field>
                              </ValidationProvider>
                            </template>
                            <template v-slot:item.action="{ item }">
                              <div class="space-around">
                                <div
                                  v-if="item.units.length > 1 && !item.disabled"
                                >
                                  <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-btn
                                        x-small
                                        color="black"
                                        v-bind="attrs"
                                        v-on="on"
                                        icon
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
                          <!-- </v-card-text> -->
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col></v-col>
                      </v-row>
                      <v-row>
                        <v-col></v-col>
                      </v-row>
                      
                        <v-card-title class="pl-0">Notes</v-card-title>
                    
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
             <btn-cancel></btn-cancel>
            <v-btn
              depressed
              small
              class="text-white btn_blue btn_medium w-100"
              @click="submit"
              >Update</v-btn
            >
          </v-col>
        </v-col>
      </v-row>
      <v-navigation-drawer
        app
        width="40%"
        v-model="drawer"
        absolute
        temporary
        right
      >
        <v-card style="height: 100%">
          <v-card-title> Select reorder level products </v-card-title>
          <v-container fluid>
            <v-row>
              <v-data-table
                v-model="selected"
                :headers="ReorderLevelProductHeaders"
                :items="reOrderLevelProducts"
                item-key="tempId"
                show-select
                class="elevation-1"
                hide-default-footer
              >
                <template v-slot:item.assigned="{ item }">
                  {{item.disabled?'no':'yes'}}
                </template>
                <template v-slot:header.data-table-select> </template>
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


    </v-container>
  </div>
</template>

<script>
import datePickComponent from "../../../components/base/DateComponent.vue";
import { PurchaseOrderViewModel } from "../../../models/View Models/PurchaseOrderViewModel";
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
import { ProductViewModel } from "../../../models/View Models/ProductViewModel";
extend("numeric", {
  ...numeric,
  message: "input must be numeric",
});
extend("required", {
  ...required,
  message: "{_field_} is required",
});
export default {
  data: () => ({
    selectedFiles: "",
    projectsLoading: false,
    messages: [],
    drawer: false,
    errors: [],
    suppliers: [],
    warehouses: [],
    selectedProducts: [],
    selected: [],
    isLoadOnlyReorderlevel:false,
    selectedProductClonedDetails: [],
    clonedProducts: [],
    selectedProduct: new Product(),
    PurchaseOrder: [],
    searchProduct: null,
    reOrderLevelProducts: [],
    isLoading: false,
    getProductsLoading: false,
    selectedProductId:null,
    supplierLoading: false,
    getWarehouseLoading: false,
    searchSupplier: null,
    searchWarehouse: null,
    products: [],
    purchaseOrderStatus: ["Pending", "Canceled", "Received"],
    ReorderLevelProductHeaders: [
      {
        text: "Product name",
        value: "name",
      },
      {
        text: "Product Unit",
        value: "unit.name",
        width: "25%",
      },
      {
        text: "Available Quantity",
        value: "availableStock",
      },
      {
        text: "reOrder Level",
        value: "reorderQuantity",
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
      },
      {
        text: "Product Code",
        value: "code",
      },

      {
        text: "Product Unit",
        value: "unit",
        width: "25%",
      },
      {
        text: "Qty",
        value: "quantity",
        width: "15%",
      },
      {
        text: "Actions",
        value: "action",
        align: "center",
        width: "10%",
      },
    ],
  }),
  components: {
    ValidationProvider,
    FileUpload,
    ValidationObserver,
    datePickComponent,
  },
  methods: {
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
      this.selectedProduct.quantityError=[];
      this.selectedProduct.unit = this.selectedProduct.defaultUnit;
      this.selectedProducts.unshift(this.selectedProduct);
      this.selectedProductId = {};
      this.getProductsByQuery();
    },
    removeProduct(product) {
      this.selectedProducts.splice(this.selectedProducts.indexOf(product), 1);
      this.getProductsByQuery();
      this.selectedProductId = null;
      this.removeDuplicateUnitForSameProduct(product);
    },

    EditPurchaseOrder() {
      this.isLoading = true;
      let purchaseOrder = _.cloneDeep(this.PurchaseOrder);
      let Id = this.$route.params.id;
      purchaseOrder.id = Id;
      purchaseOrder.products = _.cloneDeep(this.selectedProducts);
      purchaseOrder.products = purchaseOrder.products.map((u, i, arr) => {
        delete u.units;
        return new ProductViewModel(u);
      });
      this.$store
        .dispatch("purchaseOrder/EditPurchaseOrder", purchaseOrder)
        .then((res) => {
          if (this.selectedFiles) {
            var fileId = this.$route.params.id;
            var files = this.selectedFiles;
            var documentType = "PURCHASE_ORDER";
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
          this.$toast.success("Purchase Order edited successfully");
          this.$router.push("/purchase-order");
          this.isLoading = false;
        })
        .catch((err) => {
          this.$toast.error("Purchase Order edited failed");
          this.isLoading = false;
          this.messages = err.data.title;
        });
    },

    getSupplierByQuery(query = "") {
      this.supplierLoading = true;
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
          this.supplierLoading = false;
        })
        .catch((err) => {
          this.supplierLoading = false;
          this.messages = err.data.title;
        });
    },
    async getPurchaseOrder() {
      let Id = this.$route.params.id;
      this.isLoading = true;
      await this.$store
        .dispatch("purchaseOrder/GetPurchaseOder", Id)
        .then((res) => {
          this.PurchaseOrder = new PurchaseOrderViewModel(res.data);
          this.searchSupplier = this.PurchaseOrder.suppliers.name;
          this.searchWarehouse = this.PurchaseOrder.warehouses.name;
          this.selectedProducts = [];
          this.PurchaseOrder.products.forEach((product) => {
              product.unitError = [];
              product.quantityError=[]

            this.selectedProducts.unshift(_.cloneDeep(product));
            this.selectedProductClonedDetails.unshift(_.cloneDeep(product));
          });

        
          this.selectedSupplierDetails = this.suppliers.find(
            (sup) => sup.id === this.PurchaseOrder.supplier_id
          );
          this.selectedProducts.forEach((product) => {
            this.removeDuplicateUnitForSameProduct(product);
          });
          this.isLoading = false;
          this.getProductsByQuery();
        })
        .catch((err) => {
          this.isLoading = false;


        });
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
            this.removeDuplicateUnitForSameProduct(product);
            this.selectedProducts.splice(index, 1);
          }
        }
      });
      ///////////push the product if i not already assigned
      this.selected.forEach((product) => {
        if (
          !this.selectedProducts.find(
            (p) =>
              p.product_id == product.product_id && p.unit.id == product.unit.id
          )
        ) {
          product.quantity = product.reorderQuantity;
          this.selectedProducts.unshift(product);
          this.selectedProductClonedDetails.unshift(_.cloneDeep(product));
          this.removeDuplicateUnitForSameProduct(product);
        }
      });
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
    async submit() {
      const isValid = await this.$refs.observer.validate();

      if (isValid) {
        let error = false;
        this.selectedProducts.forEach((product) => {
          if (!product.unit.id) {
            error = true;
            product.unitError.push("Select Unit");
          }
          if (product.quantity<1) {
            error = true;
            product.quantityError.push("Quantity Must Be Greater than 0");
          }
        });
        if (!error) {
          this.EditPurchaseOrder();
        }
      }
    },
    increaseCount(item)
    {
      if(item.quantity>0)
      {
        item.quantityError=[];
      }
      else
      {
        item.quantityError=[];
        item.quantityError.push("Quantity must be greater than 0");
      }
    },
    clear() {
      this.PurchaseOrder.wareHouse_id = "";
      this.PurchaseOrder.supplier_id = "";
      this.PurchaseOrder.remarks = "";
      this.PurchaseOrder = new PurchaseOrder();
      this.selectedFiles = "";
      this.selectedProductId = "";
      (this.selectedProducts = []), this.$refs.fileUpload.removeAllItems();

      this.$refs.observer.reset();
    },
    getWarehouseByQuery(query = "") {
      this.getWarehouseLoading = true;
      this.$store
        .dispatch("warehouse/GetWarehouse", { query: query,status:'active' })
        .then((res) => {
          console.log(res);
          this.warehouses = res;
          this.getWarehouseLoading = false;
        })
        .catch((err) => {
          this.getWarehouseLoading = false;
          this.messages = err.data.name;
        });
    },
    getProductsByreorderlevel() {
      // let productsIDs = [];
      // this.selectedProducts.forEach((product) => {
      //   productsIDs.unshift(product.id);
      // });
      this.drawer = !this.drawer;
      this.$store
        .dispatch("product/GetProductsByReorderLevel", {
          id: this.PurchaseOrder.wareHouse_id,
          // except: productsIDs,
        })
        .then((res) => {
          this.reOrderLevelProducts = res.map((u, i, arr) => {
            u.index = i + 1;
            u.product.unit = u.unit;
            u.product.reorderQuantity = u.reorder_level;
            u.product.availableStock = u.available_stock;
            u.product.tempId = u.id;
            if (
              u.product.suppliers.find(
                (sp) => sp.id == this.PurchaseOrder.supplier_id
              ) != null
            ) {
              u.product.disabled = false;
            } else {
              u.product.disabled = true;
            }
            return new Product().toViewModel(u.product);
          });
          this.selected = [];
          this.selectedProducts.forEach((product) => {
            let foundProduct = this.reOrderLevelProducts.find(
              (p) =>
                p.product_id == product.product_id &&
                p.unit.id == product.unit.id
            );
            if (foundProduct) {
              this.selected.unshift(foundProduct);
            }
          });
        })
        .catch((err) => {
          this.messages = err.data.name;
        });
    },
    getProductsByQuery(query = "") {
      this.getProductsLoading = true;
      let productsIDs = [];
      this.selectedProducts.forEach((product) => {
        productsIDs.unshift(product.id);
      });
      this.$store
        .dispatch("product/GetProduct", {
          query: query,
          except: productsIDs,
        })
        .then((res) => {
          this.products = res.map((u, i, arr) => {
            u.index = i + 1;
            if (
              u.suppliers.find(
                (sp) => sp.id == this.PurchaseOrder.supplier_id
              ) != null
            ) {
              u.disabled = false;
            } else {
              u.disabled = true;
            }
            return new Product().toViewModel(u);
          });
          this.productLoading = false;
          this.getProductsLoading = false;
        })
        .catch((err) => {
          this.productLoading = false;
          this.getProductsLoading = false;
          this.messages = err.data.title;
        });
    },
    assignProduct($event) {
      $event.quantity = 1;
      this.selectedProducts.unshift($event);
      this.getProductsByQuery();
    },


    duplicateProduct(product) {
      let item = _.cloneDeep(product);
      item.count = item.count + 1;
      item.unit = { id: 0 };
      item.unitError = [];
      item.quantityError=[];
      item.quantity=1;
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
      let sameProducts = this.selectedProducts.filter((p) => p.id == item.id);
      let productDetail = _.cloneDeep(
        this.selectedProductClonedDetails.find((p) => p.id === item.id)
      );
      let units = [];
      item.unitError = [];
      item.quantityError=[]
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
          if (clonedProduct.unit.id !== u) {
            const index = unitsCloned.findIndex((i) => i.id == u);
            if (index != -1) {
              unitsCloned.splice(index, 1);
            }
          }
        });
        product.units = unitsCloned;
      });
    },
  },
  created() {
    this.getProductsByQuery();
    this.getPurchaseOrder();
  },
  watch: {
    searchProduct(value) {
      if (!value) {
        this.getProductsByQuery("");
      }
      this.getProductsByQuery(value);
    },
    searchWarehouse(value) {
      if (!value) {
       this.getWarehouseByQuery("");
      }
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


<template>
  <div>
    <PageTitle
        title="Create Stock Transfer"
        :backBtn="true"
        :showLoading="isLoading"
    />
    <v-container fluid class="lighten-12 container">
      <ValidationObserver ref="observer">
        <v-row >
          <v-col  cols="12" sm="12"  md="12" lg="3">
            <v-card>
              <v-card-title>General</v-card-title>
              <v-container fluid>
                <v-row>
                  <v-col cols="12" sm="6"  md="6" lg="12"> 
                    <ValidationProvider name="Ware House" rules="required">
                      <v-autocomplete
                          slot-scope="{ errors }"
                          outlined
                          hide-details="auto"
                          v-model="StockTransfer.from_ware_house_id"
                          item-text="name"
                          item-value="id"
                          :items="warehouses"
                          @input="getProductsByQuery()"
                          :search-input.sync="searchWarehouse"
                          :loading="warehouseLoading"
                          :error-messages="errors"
                          label="Warehouse"
                          required
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12" sm="6"  md="6" lg="12">
                    <ValidationProvider name="Shop" rules="required">
                      <v-autocomplete
                          slot-scope="{ errors }"
                          outlined
                          hide-details="auto"
                          v-model="StockTransfer.to_shop_id"
                          item-text="name"
                          item-value="id"
                          :items="shops"
                          :search-input.sync="searchShop"
                          :loading="shopLoading"
                          :error-messages="errors"
                          label="Shop"
                          required
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12" sm="12"  md="12" lg="12">
                    <ValidationProvider
                        rules="required"
                        name="Datetime"

                    >
                      <datePickComponent
                          hide-details="auto"
                          slot-scope="{ errors }"
                          v-model="StockTransfer.date"
                          labelname="Date"
                          :error-messages="errors"
                          required
                      />
                    </ValidationProvider>
                  </v-col>
                </v-row>

              </v-container>
            </v-card>
          </v-col>
          <v-col cols="12" sm="12"  md="12" lg="9">
            <v-card >
              <v-card-title>Choose product to transfer</v-card-title>
              <v-container fluid>
                <v-row v-if="isProductListValid != ''">
                  <v-col>
                    <v-flex
                        v-model="isProductListValid"
                        class="product-red"
                    >{{ isProductListValid }}</v-flex>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col  cols="12" sm="6"  md="6" lg="6" >
                    <v-autocomplete
                        outlined
                        dense
                        hide-details="auto"
                        v-model="StockTransfer.selectedProduct"
                        item-text="name"
                        item-value="product_id"
                        :loading="productLoading"
                        :search-input.sync="searchProduct"
                        @input="GetBatchesForProducts(StockTransfer.selectedProduct)"
                        :items="products"
                        :error-messages="productRequiredErrorMessage"
                        label="Choose Product"
                    >

                    </v-autocomplete>
                    <div v-if="StockTransfer.from_ware_house_id == null" class="error-containner pa-1">
                      Please select warehouse to transfer product
                    </div>
                  </v-col>
                  <v-col  cols="12" sm="6"  md="6" lg="6" >
                    <v-autocomplete
                        outlined
                        hide-details="auto"
                        dense
                        v-model="StockTransfer.batch"
                        item-text="batch"
                        item-value="id"
                        @input="onSelectBatch($event)"
                        :loading="batchLoading"
                        :items="selectedProductBatches"
                        :search-input.sync="searchProductBatch"
                        :error-messages="batchRequiredErrorMessage"
                        label="Choose Batch">
                    </v-autocomplete>
                  </v-col>

                  <v-col  cols="12" sm="6"  md="6" lg="6">
                    <v-autocomplete
                        outlined
                        hide-details="auto"
                        dense
                        v-model="StockTransfer.selectedUnit"
                        item-text="name"
                        item-value="id"
                        @input="onSelectUnit(StockTransfer)"
                        :loading="batchLoading"
                        :items="selectedBatchUnits"
                        :error-messages="batchRequiredErrorMessage"
                        label="Choose Unit">
                    </v-autocomplete>
                  </v-col>

                  <v-col cols="10" sm="5"  md="5" lg="5" >
                    <ValidationProvider>
                      <v-text-field
                          v-model="StockTransfer.quantity"
                          type="number"
                          required
                          label="Quantity"
                          dense
                          :max="StockTransfer.maxQuantity"
                          :error-messages="quantityMaxErrorMessages"
                          outlined
                          min="0"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="1">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            class="icon_medium add-arrow-icon"
                            color="#13928e"
                            @click="SelectProductToTransfer()"
                            v-bind="attrs"
                            v-on="on"
                        >mdi-subdirectory-arrow-left</v-icon>
                      </template>
                      <span>Add Product</span>
                    </v-tooltip>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                      cols="11"
                  >
                    <v-row>
                      <v-card-text class="pa-0">
                        <v-data-table
                            items-per-page="15"
                            :fixed-header="true"
                            @click:row="expandStock($event)"
                            :single-expand="singleExpand"
                            :expanded.sync="expanded"
                            show-expand
                            :headers="StockTransferHeaders"
                            :items="selectedProductsToTransfer"
                            item-key="id"
                            hide-default-footer
                            class="row-pointer product-list"
                            expand
                            dense
                        >
                          <template v-slot:item.remove="{ item }" v-slot="{ errors }" name="Unit">
                            <div>
                              <v-btn
                                  x-small
                                  color="black"
                                  icon
                                  @click="RemoveAssignedProduct(item)"
                              >
                                <v-icon>mdi-close-circle</v-icon>
                              </v-btn>
                            </div>

                          </template>
                          <template v-slot:item.allocPercentage="{ item }" v-slot="{ errors }" name="Unit">
                            <div>
                            {{GetTotalPecentage(item)}}
                            </div>

                          </template>
                          <template v-slot:item.waste="{ item }" v-slot="{ errors }" name="Unit">
                            <div>
                             {{GetWastePercentage(item)}}
                            </div>
                          </template>
                          <template v-slot:item.return="{ item }" v-slot="{ errors }" name="Unit">
                            <v-text-field 
                                v-model="item.returnQuantity"
                                type="number"
                                label="Quantity"
                                required
                                v-bind="attrs"
                                :error-messages="item.maxReturnError"
                                @input="validateMaxQuantity(item)"
                                v-on="on"
                                dense
                                class="pt-3"
                                outlined
                                min="0"
                            ></v-text-field>
                          </template>
                          <template v-slot:expanded-item="{ headers, item }">
                            <td :colspan="headers.length">
                              <v-simple-table>
                              <template v-slot:default>
                                <thead>
                                <tr>
                                  <th>is Include</th>
                                  <th>Unit</th>
                                  <th>Percentage</th>
                                  <th>Quantity</th>

                                </tr>
                                </thead>


                                <tbody>

                                <tr v-for="unit in item.productUnits" :key="unit.name">

                                  <td><v-checkbox v-model="unit.is_changes_unit"
                                                  @change="onCheck(unit)"
                                                  color="indigo darken-3"
                                                  hide-details
                                  ></v-checkbox></td>

                                  <td>{{ unit.name }}</td>


                                  <td>  <v-menu
                                      v-model="unit.showMenu"
                                      :close-on-content-click="false"
                                      :nudge-width="150">
                                    <template v-slot:activator="{ on, attrs }" >
                                      <v-row>
                                        <ValidationProvider>
                                          <v-text-field
                                              v-model="unit.transferPecentage"
                                              readonly
                                              autofocus
                                              :disabled="!unit.is_changes_unit"
                                              type="number"
                                              required
                                              v-bind="attrs"
                                              v-on="on"
                                              dense
                                              class="pt-3"
                                              outlined
                                              min="0"
                                          ></v-text-field>
                                        </ValidationProvider>
                                      </v-row>

                                    </template>
                                    <v-card>
                                      <v-container>
                                        <v-row>
                                          <v-col cols="12">
                                            <v-text-field
                                                v-model="unit.preferedPercentage"
                                                type="number"
                                                
                                                @input="OnInputTransferPecentage(unit,item)"
                                                :error-messages="unit.damageError"
                                                label="Add Pecentage of Transfer"
                                                required
                                                v-bind="attrs"
                                                v-on="on"
                                                dense
                                                class="pt-3"
                                                outlined
                                                min="0"
                                            ></v-text-field>
                                          </v-col>
                                        </v-row>
                                        <v-row>
                                          <v-col cols="3">

                                          </v-col>
                                          <v-col cols="5"> <v-btn depressed
                                                                  small
                                                                  @click="conformTransferedPercentage(unit,item)"
                                                                  class="text-white btn_blue btn_medium w-100">Conform</v-btn></v-col>

                                          <v-col cols="2"> <v-btn depressed
                                                                  small
                                                                  @click="unit.showMenu=false"
                                                                  class="text-white btn_medium w-100">cancel</v-btn></v-col>
                                          <v-col cols="1"></v-col>
                                        </v-row>
                                        <v-row>
                                        </v-row>



                                      </v-container>


                                    </v-card>

                                  </v-menu> </td>
                                  <td> <v-menu
                                      v-model="unit.showMenuQuantity"
                                      :close-on-content-click="false"
                                      :nudge-width="150"
                                  >
                                    <template v-slot:activator="{ on, attrs }" >
                                      <v-row>
                                        <ValidationProvider>
                                          <v-text-field
                                              v-model="unit.quantity"
                                              readonly
                                      autofocus
                                              :disabled="!unit.is_changes_unit"
                                              type="number"
                                              required
                                              v-bind="attrs"
                                              v-on="on"
                                              dense
                                              class="pt-3"
                                              outlined
                                              min="0"
                                          ></v-text-field>
                                        </ValidationProvider>
                                      </v-row>
                                    </template>
                                    <v-card>
                                      <v-container>
                                        <v-row>
                                          <v-col cols="12">
                                            <v-text-field
                                                v-model="unit.preferedQuantity"
                                                type="number"
                                                @input="onInputTransferQuantity(unit,item)"
                                                :error-messages="unit.damageError"
                                                label="Add quantity of Transfer"
                                                required
                                                v-bind="attrs"
                                                v-on="on"
                                                dense
                                                class="pt-3"
                                                outlined
                                                min="0"
                                            ></v-text-field>
                                          </v-col>
                                        </v-row>




                                      </v-container>
                                      <v-card-actions>
                                        <v-btn
                                            depressed
                                            small
                                            @click="conformTransferedQuantity(unit,item)"
                                            class="text-white btn_blue btn_medium w-100"
                                        >Conform</v-btn
                                        >
                                        <v-spacer>
                                        </v-spacer>
                                        <v-btn depressed
                                               small
                                               @click="unit.showMenuQuantity=false"
                                               class="text-white btn_medium w-100">cancel</v-btn>
                                      </v-card-actions>
                                    </v-card>
                                  </v-menu></td>

                                </tr>
                                </tbody>
                              </template>
                              </v-simple-table>
                            </td>
                          </template>
                          <template v-slot:no-data>
                            <img
                                style="height: 200px"
                                src="../../../assets/img/no-result.jpg"
                            />
                          </template>

                        </v-data-table>
                      </v-card-text>
                    </v-row>








                  </v-col>
                  <v-col cols="1"></v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12"  md="12" lg="12">
                      <v-card-title>Note</v-card-title>
                      <v-container fluid>
                        <v-row>
                          <v-col>
                            <v-textarea
                                rows="3"
                                outlined
                                v-model="StockTransfer.remarks"
                            ></v-textarea>
                          </v-col>
                        </v-row>

                <v-row>
                  <v-col cols="12"></v-col>
                </v-row>
                <v-row>
                  <v-col cols="12"></v-col>
                </v-row>

              </v-container>
          </v-col>
        </v-row>






              </v-container>
            </v-card>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed small class="text-white btn_medium" @click="clear"
          >Clear</v-btn
          >
          <v-btn
              depressed
              small
              class="text-white btn_blue btn_medium w-100"
              @click="submit"
          >Submit</v-btn
          >
        </v-card-actions>
      </ValidationObserver>





    </v-container>
  </div>
</template>
<script>
import datePickComponent from "../../../components/base/DateComponent";
import { required, email, max, numeric } from "vee-validate/dist/rules";

import {
  extend,
  ValidationObserver,
  ValidationProvider,
} from "vee-validate";
import _ from "lodash";
import { AccountViewModel } from "../../../models/View Models/AccountViewModel";
import { ProductViewModel } from "../../../models/View Models/ProductViewModel";
import { ProductBatch } from "../../../models/ProductBatch";
import { PurchaseEntityModel } from "../../../models/EntityModels/Purchases/PurchaseEntityModel";
import FileUpload from "@/components/base/FileUpload";
import {StockTransferModel} from "@/models/StockTransferModel";
import {Product} from "@/models/Product";
import confirmation from "@/modules/shared/components/confirmation";
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
    messages: [],
    errors: [],
    showMenu:false,
    quantityMaxErrorMessages:[],
    suppliers: [],
    searchPurchaseReturn: null,
    searchProduct: null,
    debitAccounts: [],
    batchRequiredErrorMessage: [],
    referenceLoading: false,
    searchProductBatch: null,
    warehouses: [],
    purchaseOrders: [],
    purchaseReturns: [],
    selectedPurchaseOrder: [],
    warehouseLoading: false,
    shopLoading: false,
    shops: [],
    isLoading:false,
    productLoading: false,
    batchLoading: false,
    selectedProductBatches: [],
    productRequiredErrorMessage: [],
    searchSupplier: null,
    selectedBatchUnits: [],
    searchWarehouse: null,
    searchPurchaseOrder: null,
    supplierLoading: false,
    searchShop: null,
    selectedProductsToTransfer:[],
    selectedProducts: [],
    selectedPurchaseReturn: '',
    SelectedProductAssignedUnits:[],
    showScheduleForm: false,
    ProductBatches: new ProductBatch(),
    StockTransfer: new StockTransferModel(),
    products: [],
    selectedProduct: "",
    purchaseOptions: [
      {value: "Purchase Order", name: " From Purchase Order"},
      {value: "None", name: "None"},
      {value: "Purchase Return", name: " From PurchaseReturn"}
    ],
    productUnits: [],
    isProductListValid: "",
    singleExpand:true,
    expanded:[],
    projectsLoading: false,
    PurchaseBatchesClonedDetails: [],
    StockTransferHeaders: [
      {
        text: "Product",
        value: "product.name",
        width: "15%",
      },
      {
        text: "Batch",
        value: "batch.batch",
        width: "15%",
      },
      {
        text: "unit ",
        value: "unit.name",
        width: "10%",
      },
      {
        text: "quantity",
        value: "quantity",
        align: "left",
        width: "15%",
      },
      {
        text: "Allocated Percentage",
        value: "allocPercentage",
        align: "left",
        width: "15%",
      },
      {
        text: "Return Quantity",
        value: "return",
        align: "left",
        width: "15%",
      },
      {
        text: "Remaining Percentage",
        value: "waste",
        align: "left",
        width: "15%",
      },
      {
        text: "",
        value: "remove",
        align: "left",
        width: "15%",
      },

    ],
    unitHeader: [
      {
        text: "is Include",
        value: "include",
        width: "5%",
      },
      {
        text: "Unit",
        value: "name",
        width: "15%",
      },
      {
        text: "percentage of Transfer ",
        value: "percentage",
        width: "15%",
      },



      {
        text: "quantity",
        value: "quantity",
        align: "left",
        width: "15%",
      },

    ],
    paymentMethods: [
      {id: "1", name: "Cash"},
      {id: "2", name: "Card"},
      {id: "3", name: "Cheque"},
    ],
    items: [{tab: "Payment", content: "this is Payment tab"}],
    selectedProductsTotal: 0,
  }),
  components: {
    ValidationProvider,
    ValidationObserver,
    datePickComponent,
    FileUpload,
  },

  methods: {
    async onSelectBatch(event) {
      this.selectedBatchUnits = await this.getProductBatchDetailsFromStock(
          {
            productId: this.StockTransfer.selectedProduct,
            batchId: event,
            warehouseId: this.StockTransfer.from_ware_house_id,
          }
      );
    },
    clear()
    {

    },
    async submit() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {

        if (this.selectedProductsToTransfer.length != 0) {
          this.StockTransfer.items=this.selectedProductsToTransfer;
          console.log(this.StockTransfer);
          let Credentials=new Object();
          Credentials.date=this.StockTransfer.date;
          Credentials.remarks=this.StockTransfer.remarks;
          Credentials.from_ware_house_id=this.StockTransfer.from_ware_house_id;

          Credentials.to_shop_id=this.StockTransfer.to_shop_id;
          Credentials.items=[]
          let error=false;
          this.StockTransfer.items.map(p=>{
            let item=new Object();
            item.product_id=p.product.id;
            item.batch_id=p.batch.id;
            item.unit_id=p.unit.id;
            item.quantity=p.quantity;
            item.return_quantity=p.returnQuantity,
                item.wast_percentage=this.GetWastePercentage(p);
            item.transferUnit=[];
            p.productUnits.map(u=>{
              let pUnit=new Object();
              if(p.maxReturnError.length>0)
              {
                error=true;
              }
              pUnit.unit_id=u.id;
              pUnit.quantity=u.quantity?u.quantity:0;
                  pUnit.transferable_percentage=u.transferPecentage,
                  pUnit.is_changes_unit=u.is_changes_unit;
              if(u.is_changes_unit && u.quantity>0 && u.transferPecentage>0 )
              {
                item.transferUnit.push(pUnit)
              }
            })
            if(item.transferUnit.length>0)
            Credentials.items.push(item);
          })
if(Credentials.items.length>0 && !error)
{
    confirmation.dialog = true;
  this.$confirm(
      "Are you sure to Assign Remaining Percentage of product as wastage "
  ).then((res) => {
    if (res) {
     this.$store
      .dispatch("product/TranferProductToShopFromWarehouse", Credentials)
      .then((res) => {
        this.$toast.success('Product transfered successfully');
        this.$router.push('/stock-transfer')
      })
      .catch((err) => {
      });
    }
  });
 
}
else
{
  this.isProductListValid =
      "quantity of items to transfer is zero";
}


        } else {
          this.isProductListValid =
              "Please select at least one product  to transfer";
        }
      }
    },
    GetTotalPecentage(product)
    {
     let productSelected= this.selectedProductsToTransfer.find(p=>p.unitqId==product.unitqId);
     let TotalPecentage=0;
     if(productSelected)
     {
      productSelected.productUnits.map(p=>{
       if(parseInt(p.transferPecentage)>0)
       {
         TotalPecentage=parseInt(p.transferPecentage)+TotalPecentage
       }
      })
     }
     return TotalPecentage
    },
    GetWastePercentage(product)
    {
      debugger
      let productSelected= this.selectedProductsToTransfer.find(p=>p.unitqId==product.unitqId);
      let TotalPecentage=0;
      if(productSelected)
      {
        productSelected.productUnits.map(p=>{
          if(parseInt(p.transferPecentage)>0)
          {
            TotalPecentage=parseInt(p.transferPecentage)+TotalPecentage
          }
        })
      }
      debugger
      if(product.returnQuantity>0)
      {
        // let totalQuantity=(parseInt(product.quantity)*(parseInt(TotalPecentage)/100))+parseInt(product.returnQuantity)
        TotalPecentage=(TotalPecentage+((product.returnQuantity/product.quantity)*100))
      }
      return (100-TotalPecentage).toFixed(2)
    },
    GetTotalQuantity(product)
    {
      debugger
      let productSelected= this.selectedProductsToTransfer.find(p=>p.unitqId==product.unitqId);
      let TotalQuantity=0;
      if(productSelected)
      {
        productSelected.productUnits.map(p=>{
          if(parseInt(p.quantity)>0)
          {
            TotalQuantity=parseInt(p.quantity)+TotalQuantity
          }
        })
      }
      return TotalQuantity
    },
    async OnInputTransferPecentage(item, product) {
      item.damageError = [];
      let totalPecentage = await this.GetTotalPecentage(product) - item.transferPecentage;
      if (parseInt(totalPecentage) + parseInt(item.preferedPercentage) > 100) {
        item.damageError.push(`value should be less than or equal ${100 - (totalPecentage)}`);
      }
      else {
        item=await this.GetTransferablePercentage(product, item)
      }
    },
    async onInputTransferQuantity(item, product) {
      item.damageError = [];
debugger
 await this.GetTransferableQuantity(product, item);

    },
    IncreaseInput()
    {
      if(this.StockTransfer.quantity>this.StockTransfer.maxQuantity)
      {
        this.quantityMaxErrorMessages.push(`Quantity must be less than or equal ${this.StockTransfer.maxQuantity}`)
      }
      else if(this.StockTransfer.quantity<0)
      {
        this.quantityMaxErrorMessages.push(`Quantity must be greater than 0`);
      }
      else
      {
        this.quantityMaxErrorMessages=[];
      }
    },
    async SelectProductToTransfer() {
      if(this.StockTransfer.quantity>this.StockTransfer.maxQuantity)
      {
        this.quantityMaxErrorMessages.push(`Quantity must nbe less than ${this.StockTransfer.maxQuantity}`)
      }
      else if(this.StockTransfer.quantity<=0)
      {
        this.quantityMaxErrorMessages.push(`Quantity must be greater than 0`)
      }
      else
      {
        let product = this.products.find(
            (item) => item.product_id === this.StockTransfer.selectedProduct
        );
        this.isProductListValid=[];
        let batch = _.cloneDeep(
            this.selectedProductBatches.find((i) => this.StockTransfer.batch === i.id)
        );
        let unit = _.cloneDeep(
            this.selectedBatchUnits.find((i) => this.StockTransfer.selectedUnit === i.id)
        );
        let payload = new Object();
        payload.selectedUnits = [];
        payload.id = this.StockTransfer.selectedProduct;
        await this.getAllProductUnits(payload);
        this.selectedProductsToTransfer.push({
          product: product,
          batch: batch,
          id:this.selectedProductsToTransfer.length+2,
          unit: unit,
          quantity: this.StockTransfer.quantity,
          productUnits: this.SelectedProductAssignedUnits,
          maxReturnError:[]
        });
        let idCount=1;
        this.selectedProductsToTransfer.map(p=>{
          p.allocPercentage=0;
          p.maxReturnError=[]
          p.unitqId=idCount;
          idCount++;
        })
        this.ResetSelections();
      }
    },
    async GetTransferablePercentage(product, item) {
      let totalPecentage=this.GetTotalPecentage(product)-parseInt(item.transferPecentage);
      if((totalPecentage+parseInt(item.preferedPercentage))<=(100))
      {
        if (item.is_changes_unit) {
        let credentials = new Object();
        credentials.product_id = product.product.id;
        credentials.batch_id = product.batch.id;
        credentials.unit_id = product.unit.id;
        credentials.quantity = product.quantity;
        credentials.transferUnit = new Object();
        credentials.transferUnit.unit_id = item.id;
        credentials.transferUnit.percentage_to_transfer = item.preferedPercentage;
        credentials.wareHouseId = this.StockTransfer.from_ware_house_id;
        await this.$store
        .dispatch("product/GetTranferablePercentage", {payload: credentials})
        .then((res) => {
          item.percentageResult = res.transferable_percentage;
          item.preferableQuantity = res.quantity
        })
        .catch((err) => {

        });
  }
}
return item;

    },
    async GetTransferableQuantity(product, item) {
      debugger
      if (item.is_changes_unit) {
        let credentials = new Object();
        credentials.product_id = product.product.id;
        credentials.batch_id = product.batch.id;
        credentials.unit_id = product.unit.id;
        credentials.quantity = product.quantity;
        credentials.percentage=100-(this.GetTotalPecentage(product)-parseInt(item.transferPecentage));
        credentials.transferUnit = new Object();
        credentials.transferUnit.unit_id = item.id;
        credentials.transferUnit.quantity = item.preferedQuantity;

        credentials.wareHouseId = this.StockTransfer.from_ware_house_id;
        await this.$store
            .dispatch("product/GetTransferableQuantity", {payload: credentials})
            .then((res) => {
              item.percentageResult = res.transferable_percentage;
              item.preferableQuantity = res.quantity;
            })
            .catch((err) => {

            });
      }
    },
    conformTransferedPercentage(item,product)
    {
      if(!item.damageError.length>0)
      {
        item.showMenu = false;
        item.transferPecentage= item.percentageResult;
        item.quantity=item.preferableQuantity;
        product.maxReturnError=[];
        product.returnQuantity=0;
        item.preferedPercentage=0;
        let sum=0
        product.productUnits.map(u=>{
          sum=sum+u.quantity;
        })
        product.allocPercentage=sum;
              }
    },

    conformTransferedQuantity(item,product)
    {
        item.showMenuQuantity = false;
        item.transferPecentage = item.percentageResult;
        product.maxReturnError=[];
        product.returnQuantity=0;
        item.quantity = item.preferableQuantity
        item.preferedPercentage = 0;
        let sum=0
        product.productUnits.map(u=>{
          sum=sum+u.quantity;
        })
        product.allocPercentage=sum;
    },

    ResetSelections()
    {
      this.StockTransfer.selectedProduct=null;
      this.StockTransfer.batch=null;
      this.StockTransfer.selectedUnit=null;
      this.StockTransfer.quantity=null;
    },
    getWarehouseByQuery(query = "") {
      this.warehouseLoading = true;
      this.$store
          .dispatch("warehouse/GetWarehouse", {query: query})
          .then((res) => {
            console.log(res);
            this.warehouses = res;
            this.warehouseLoading = false;
          })
          .catch((err) => {
            this.warehouseLoading = false;
            this.messages = err.data.name;
          });
    },
    getShopsByQuery(query = "") {
      this.shopLoading = true;
      this.$store
          .dispatch("warehouse/GetShops", {query: query})
          .then((res) => {
            console.log('SSSHHHHOOPPPPP',res);
            this.shops = res;
            this.shopLoading = false;
          })
          .catch((err) => {
            this.shopLoading = false;
            this.messages = err.data.name;
          });
    },
    expandStock(event)
    {
      debugger
      this.expanded = [];
      this.progressBar = false;
      this.expanded.push(event);
    },
    async getAllProductUnits(product_id) {
      await this.$store
          .dispatch("product/GetAllProductUnits", product_id)
          .then((res) => {
            this.SelectedProductAssignedUnits = res.map(p => {
              let unitDetails = new Object();
              unitDetails.name = p.name;
              unitDetails.id = p.id;
               unitDetails.is_changes_unit = false;
              unitDetails.transferPecentage = 0;
              unitDetails.quantity=0;
              return unitDetails
            });
          })
          .catch((err) => {
            this.messages = err.data.name;
          });
    },
    async getProductBatchDetailsFromStock(details) {
      let units = [];
      await this.$store
          .dispatch("purchaseReturn/getProductBatchDetailsFromStock", details)
          .then((res) => {
            units = res.data.data;
          })
          .catch((err) => {
          });
      return units;
    },

    GetBatchesForProducts(id) {
      let product = this.products.find((item) => item.product_id === id);
      this.productRequiredErrorMessage = [];
      this.selectedProduct = product;
      this.GetProductBatches();

    },
    validateMaxQuantity(item)
    {
      item.maxReturnError=[];
      debugger
      let allocQuantity=parseFloat(item.quantity)*(parseFloat(this.GetTotalPecentage(item))/100)
          let maxQuantity=parseInt(parseFloat(item.quantity)-parseFloat(allocQuantity))
          if(item.returnQuantity>maxQuantity)
          {
            item.maxReturnError.push(`Maximum Return value is ${maxQuantity}`)
          }

    },

    getProductsByQuery(query = "") {
      this.productLoading = true;
      this.$store
          .dispatch("purchaseReturn/GetProductsFromStocks", {
            query: query,
            warehouse: this.StockTransfer.from_ware_house_id
          })
          .then((res) => {
            this.products = res.map((u, i, arr) => {
              u.index = i;
              return new Product().toViewModel(u);
            });
            this.productLoading = false;
          })
          .catch((err) => {
            this.productLoading = false;
            this.messages = err.data.title;
          });
    },

    GetProductBatches(value = "") {
      this.$store
          .dispatch("purchaseReturn/GetProductBatches", {
            id: this.selectedProduct.id,
            searchText: value,
            selectedBatches: [],
            warehouse: this.StockTransfer.from_ware_house_id,
          })
          .then((res) => {
            this.selectedProductBatches = res.data.data;
          })
          .catch((err) => {
            this.messages = err.data.title;
          });
    },


  async onSelectUnit(item) {
    if (item.unit !== null) {
      debugger
      item.quantity = item.maxQuantity = await this.getDamageProductByBatchUnit(
          {
            productId: item.selectedProduct,
            batchId: item.batch,
            unitId: item.selectedUnit,
            warehouseId: item.from_ware_house_id,
            reasonId: '3',
          });

      let itemFound=this.selectedProductsToTransfer.filter(t=>(t.product.id==item.selectedProduct) &&(t.batch.id==item.batch) && (t.unit.id==item.selectedUnit));
      if(itemFound)
      {
        let totalQCount=0;
        itemFound.forEach((item) => {
          totalQCount= totalQCount+parseInt(item.quantity);
        });
        item.quantity = item.maxQuantity=parseInt(item.quantity)-totalQCount;
        }
      item.unitError = [];
      item.quantityErrorMeaages = [];
      item.resonRequiredErrorMessages = [];
      }

    },

  async getDamageProductByBatchUnit(details) {
    let quantity = 0;
    await this.$store
        .dispatch("purchaseReturn/getProductTransferQuantity", details)
        .then((res) => {
          quantity = res.data.data.quantity;
        })
        .catch((err) => {
        });
    return quantity;
  },
    onCheck(item)
    {
      debugger
      if(!item.is_changes_unit)
      {
        item.transferPecentage=0;
        item.quantity=0;
      }
    },
    async GetproductTransferQuantity(details) {
      let quantity = 0;
      await this.$store
          .dispatch("product-transfer-quantity")
          .then((res) => {
            quantity = res.data.data.quantity;
          })
          .catch((err) => {
          });
      return quantity;
    },
    RemoveAssignedProduct(product)
    {
      debugger
      let indexFound=this.selectedProductsToTransfer.findIndex(p=>p.unitqId==product.unitqId);
      if(indexFound!=-1)
      {
        this.selectedProductsToTransfer.splice(indexFound,1);
      }
    },
    GetSiteSetting() {
      this.$store
          .dispatch( "sitesetting/SiteSettingView",1)
          .then((res) => {
            self.siteSetting = res.data;
            this.searchWarehouse=self.siteSetting.wareHouse.name
            this.StockTransfer.from_ware_house_id=self.siteSetting.wareHouse.id;
            this.getProductsByQuery();
          })
          .catch((err) => {
            this.messages = err.data.title;
          });
    },
},

  created() {
    this.getWarehouseByQuery();
    this.getShopsByQuery();
    this.GetSiteSetting();
  },
  watch: {
    searchWarehouse(value) {
      if (!value) {
        this.getWarehouseByQuery("");
      }
      this.getWarehouseByQuery(value);
    },
    searchShop(value) {
      if (!value) {
        this.getShopsByQuery("");
      }
      this.getShopsByQuery(value);
    },
    searchProduct(value)
    {
      if (!value) {
        this.getProductsByQuery("");
      }
      this.getProductsByQuery(value);
    },
    searchProductBatch(value)
    {
      if (!value) {
        this.GetProductBatches("");
      }
      this.GetProductBatches(value);
    }
  },
};

</script>

<style scoped>

</style>

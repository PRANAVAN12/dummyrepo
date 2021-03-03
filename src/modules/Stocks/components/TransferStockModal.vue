<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="1000">
      <custom-modal
          title="Transfer Stock"
          @onSubmit="saveBatch"
          @onClose="cancelBatch"
          :isLoading="isLoading"
      >


            <v-data-table
                :fixed-header="true"
                :headers="columns"
                :items="productDetails"
                item-key="id"
                disable-pagination
                hide-default-footer
                class="row-pointer product-list"
                expand
                dense
            >

                <template v-slot:top>
                  <v-toolbar flat>
               <strong>To Warehouse : </strong><v-chip class="ml-4" label>{{productDetails[0].productDetail.wareHouse.name}}</v-chip>  
                    <v-spacer></v-spacer>
                   <v-spacer></v-spacer>  <v-autocomplete  item-text="name"
                              item-value="id"
                                     :items="shops"
                                     label="Shop"
                                     :error-messages="productDetailSHoperror"
                                     v-model="productDetails.shop"
                                     @input="productDetailSHoperror=[]"
                                     outlined
                                     :search-input.sync="searchShop">


                    </v-autocomplete>
                  </v-toolbar>


              </template>
              <template v-slot:item.available="{ item }">
                <v-text-field
                    v-model="item.productDetail.quantity"
                    :error-messages="item.productDetail.quantityMaxErrorMessages"
                    @input="checkQuantityMaximum(item)"
                    :max="item.productDetail.maxStock"
                    type="number"
                    label="Quantity"
                    required
                    v-bind="attrs"
                    v-on="on"
                    dense
                    class="pt-3"
                    outlined
                    min="0"
                ></v-text-field>
              </template>
            </v-data-table>
      </custom-modal>
    </v-dialog>
  </v-row>
</template>

<script>
import { ProductBatch } from "../../../models/ProductBatch";
import datePickComponent from "../../../components/base/DateComponent";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import * as moment from "moment/moment";

export default {
  data: () => ({
    shops:[],
    searchShop:null,
    productDetailSHoperror:[],
    shopLoading:false,
    columns: [
      {
        text: "Product Name",
        value: "productDetail.product.name",
        show: true,
        disabled: true,
        align: "left",
        width: "14.2%",
      },
      {
        text: "Batch Name",
        value: "details.batch.batch",
        show: true,
        disabled: true,
        align: "left",
        width: "14.2%",
      },
      {
        text: "Unit",
        value: "productDetail.unit.name",
        align: "left",
        show: true,
        disabled: false,
        width: "14.2%",
      },
      {
        text: "Warehouse",
        value: "productDetail.wareHouse.name",
        show: true,
        disabled: false,
        align: "left",
        width: "14.2%",
      },
      {
        text: "quantity",
        value: "available",
        show: true,
        disabled: false,
        align: "center",
        width: "14.2%",
      },


    ],
    dialog: false,
    show: false,

    isLoading: false,
  }),

  name: "AddBatch",
  updated: function () {
    console.log(this.visible);
  },
  props: {
    productDetails: {
      type: Object,
      default: {},
    },

  },
  components: { ValidationProvider, ValidationObserver, datePickComponent },
watch:{
  searchShop(value) {
    if (!value) {
      this.getShopsByQuery("");
    }
    this.getShopsByQuery(value);
  },
},
  created() {
    this.getShopsByQuery("")
  },
  methods: {
    updateBarcode(value) {},
    openModal() {
      this.show = true;
    },
    checkQuantityMaximum(item)
    {
      item.productDetail
      .quantityMaxErrorMessages=[];
      if(item.productDetail.quantity>item.productDetail.maxStock){
        item.productDetail
            .quantityMaxErrorMessages.push(`max Quantity is ${item.productDetail.maxStock}`)

      }
    },
    cancelBatch() {
      this.show = false;
      this.$emit("conform", "");
    },
    async checkBarcode(unit) {
      let result = await this.checkBarcodeDuplicate(unit.barcode);
      if (result == true) {
        unit.barcodeError = []
        unit.barcodeError.push('Duplicate Barcode Found')
      }
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

    async saveBatch() {
      debugger
      let error = false;
      if(!this.productDetails.shop)
      {
        error=true;
        this.productDetailSHoperror=[];
        this.productDetailSHoperror.push("Shop is required")
      }
      for (let u of this.productDetails) {

        if(u.productDetail && u.productDetail.quantity<=0 )
        {
          error=true;
          u.productDetail.quantityMaxErrorMessages=[];
          u.productDetail.quantityMaxErrorMessages.push("quantity should be greater than 0")
        }
        else if(u.productDetail && u.productDetail.quantity>u.productDetail.maxStock)
        {
          error=true;
        }
        else {
          u.productDetail.quantityMaxErrorMessages=[];
        }




      }
      if (!error) {
        let Credentials=new Object();
        Credentials.date=moment().format("YYYY-MM-DD")
        Credentials.remarks="remarks";
        Credentials.from_ware_house_id=this.productDetails[0].productDetail.wareHouse.id

        Credentials.to_shop_id=this.productDetails.shop;
        Credentials.items=[]
        this.productDetails.map(p=>{
          let item=new Object();
          item.product_id=p.productDetail.product.id;
          item.batch_id=p.details.batch.id;
          item.unit_id=p.productDetail.unit.id;
          item.quantity=p.productDetail.quantity;
          item.return_quantity=0,
              item.wast_percentage=0;
          item.transferUnit=[];
          p.productUnits=[];
          let pUnit=new Object();
          pUnit.unit_id= item.unit_id
          pUnit.quantity=p.productDetail.quantity;
          pUnit.transferable_percentage=100,
              pUnit.is_changes_unit=true;

            item.transferUnit.push(pUnit)
          Credentials.items.push(item)

        });
        this.$store
            .dispatch("product/TranferProductToShopFromWarehouse",  Credentials)
            .then((res) => {
              this.$toast.success('Product transfered successfully');
              this.$router.push('/stock-transfer')
            })
            .catch((err) => {
            });
      }
    },
  },
};
</script>

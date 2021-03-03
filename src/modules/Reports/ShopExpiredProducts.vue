<template>
  <div>
    <v-container fluid class="lighten-12 content">
      <v-container fluid>
        <v-row>
          <v-card-text class="pa-0">
            <v-row>
              <v-col cols="4">

                <v-autocomplete
                    hide-details="auto"
                    :items="shops"
                    :loading="loadingShops"
                    v-model="selectedShop"
                    @input="getAllProducts(search)"
                    item-text="name"
                    item-value="id"
                    label="Shop"
                    outlined
                    dense
                ></v-autocomplete>
              </v-col>
              <v-col cols="4"></v-col>
              <v-col cols="3">
                <v-text-field
                    hide-details="auto"
                    v-model="search"
                    dense
                    outlined
                    clearable
                    @input="getAllProducts(search)"
                    placeholder="Search"
                    append-icon="mdi-magnify"
                ></v-text-field>
              </v-col>
              <v-col cols="1">
                <TableHeaderFilter :columns="columns" />
              </v-col>
            </v-row>

            <v-card-title class="d-flex justify-space-between"
            >Product Details
              <v-btn
                  hidden
                  small
                  class="text-white btn_gray w-100 d-none d-sm-flex"
                  v-print="printQr"
              >Print <v-icon right dark> mdi-printer </v-icon></v-btn
              ></v-card-title
            >
            <StockProductsTemplate
                :datas="data"
                :data="productDetails"
                class="test1"
                id="shopproducts"
                :columns="columns"
                style="display: none"
            />
            <v-simple-table fixed-header dense >
              <template v-slot:default>
                <div
                    v-if="productDetails.length == 0"
                    class="mt-16 container justify-center item-center"
                >
                  <img
                      style="height: 200px"
                      src="../../assets/img/no-result.jpg"
                  />
                </div>
                <thead v-if="productDetails.length > 0">
                <tr>
                  <th
                      class="text-left"
                      v-if="col.show"
                      v-for="(col, index) in columns"
                  >
                    {{ col.text }}
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr
                    v-for="(item, index) in productDetails"
                    :key="item.name"
                >
                  <td v-if="columns[0].show">{{ index + 1 }}</td>
                  <td v-if="columns[1].show">{{ item.name }}</td>
                  <td v-if="columns[2].show">{{ item.brand }}</td>
                  <td v-if="columns[3].show">{{ item.category }}</td>
                  <td v-if="columns[4].show">{{ item.unit }}</td>
                  <td v-if="columns[5].show">{{ item.batch }}</td>
                  <td v-if="columns[6].show">{{ item.selling_price }}</td>
                  <td v-if="columns[7].show">{{ item.damage }}</td>
                  <td v-if="columns[8].show">{{ item.expiry_date }}</td>
                  <td v-if="columns[9].show">{{ item.quantity }}</td>
                </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-row>
      </v-container>
    </v-container>
    <div class="d-flex justify-center align-center"></div>
  </div>
</template>
<script>
import PageTitle from "@/components/shared/PageTitle";
import TableFilters from "@/components/base/TableFilters";
import { Product } from "@/models/Product";
import  StockProductsTemplate  from "@/components/PrintTemplates/StockProductsTemplate";
export default {
  data: () => ({
    shops: [],
    products: [],
    search: null,
    selectedShop: null,
    data:{
      type:"Shop Expired ",
      shop:null
    },
    productDetails: [],
    loadingShops: false,
    columns: [
      {
        text: "No",
        show: true,
      },
      {
        text: "Name",
        show: true,
        disabled: true,
      },
      {
        text: "Brand",
        show: true,
      },
      {
        text: "Category",
        show: true,
      },
      {
        text: "Unit",
        show: true,
        disabled: true,
      },
      {
        text: "Batch",
        show: true,
        disabled: true,
      },

      {
        text: "Selling Price",
        show: true,
        align: "right",
      },
      {
        text: "Damage",
        show: false,
        align: "center",
        disabled: true
      },
      {
        text: "Expiry Date",
        show: true,
        align: "center",
      },

      {
        text: "Quantity",
        show: true,
        align: "center",
      },

    ],
  }),
  components: {
    PageTitle,
    TableFilters,StockProductsTemplate
  },

  methods: {
    async getAllProducts(value) {
      debugger;
      await this.$store
          .dispatch("report/GetShopExpiredProducts", {
            query: value,
            shopId: this.selectedShop,
          })
          .then((res) => {
            this.data.shop=this.shops.find(p=>p.id==this.selectedShop)
            debugger;
            this.products = res.data.data;
            debugger;
            this.productDetails = this.products;
            this.productDetails.map(p=>p.available_stock=p.quantity)
          })
          .catch((err) => {});
    },
    async getAllShops(value) {
      debugger;
      await this.$store
          .dispatch("shop/GetShop", {})
          .then((res) => {
            debugger
            this.shops = res;
            this.selectedShop = 1;
            this.getAllProducts("");
          })
          .catch((err) => {});
    },
  },

  created() {
    this.getAllShops("");
  },
  computed: {
    printQr() {
      return {
        id: "shopproducts",
        popTitle: "Product Details",
      };
    },
  },
};
</script>

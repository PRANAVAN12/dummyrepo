<template>
  <div>
    <PageTitle title="Shop Stock Details" />
    <v-container fluid class="lighten-12 content">
      <v-col cols="12" md="12" class="pa-3">
        <v-card class>
          <v-tabs v-model="tab" background-color="primary" dark>
            <v-tabs-slider></v-tabs-slider>
            <v-tab v-for="item in items" :key="item.tab">
              {{ item.tab }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="item in items" :key="item.tab">
              <v-card  v-if="item.tab === 'Shop Products'" class="mt-2">
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
                              :search-input.sync="searchShop"
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
                            <td v-if="columns[7].show">{{ item.quantity }}</td>

                          </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-card-text>
                  </v-row>
                </v-container>
              </v-card>
              <ProductWarehouse  v-if="item.tab == 'Warehouse Products'" />
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>

      <div class="d-flex justify-center align-center"></div>
      <!-- </v-row> -->
    </v-container>
  </div>
</template>

<script>
// Components
import PageTitle from "@/components/shared/PageTitle";
import TableFilters from "@/components/base/TableFilters";
import  StockProductsTemplate  from "@/components/PrintTemplates/StockProductsTemplate";
import { Product } from "@/models/Product";
import ProductWarehouse from "./ProductWarehouse";
export default {
  data: () => ({
    shops: [],
    products: [],
    data:{
      shop:null,
      type:'Shop',
    },
    tab:'Shop Products',
    items: [
      { tab: "Shop Products", content: "" },
      { tab: "Warehouse Products", content: "this is credit tab" },
    ],
    search: null,
    selectedShop: null,
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
        text: "Quantity",
        show: true,
        align: "center",
      },

    ],
  }),
  components: {
    PageTitle,
    TableFilters,ProductWarehouse,StockProductsTemplate
  },

  methods: {
    async getAllProducts(value) {
      this.data.shop=this.shops.find(p=>p.id==this.selectedShop)
      await this.$store
        .dispatch("report/getShopProductReports", {
          query: value,
          shopId: this.selectedShop,
        })
        .then((res) => {
          debugger;
          this.products = res.data.data;
          debugger;
          this.productDetails = this.products;
          this.products.map(p=>{
            p.available_stock=p.quantity
          })
        })
        .catch((err) => {});
    },
    async getAllShops(value) {
      debugger;
      await this.$store
        .dispatch("shop/GetShop", {})
        .then((res) => {
          this.shops = res;
          this.selectedShop = 1;
          this.data.shop=this.shops.find(p=>p.id==this.selectedShop)
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

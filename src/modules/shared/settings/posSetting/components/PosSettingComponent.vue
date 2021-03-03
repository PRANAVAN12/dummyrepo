<template>
  <div>
    <PageTitle title="POS Setting" />
    <v-container fluid class="lighten-12 ">
      <!-- <v-tabs v-model="tab" background-color="primary" dark>
          <v-tab class="card-tabs" v-for="item in items" :key="item.tab">{{
            item.tab
          }}</v-tab>
        </v-tabs> -->

      <!-- <pre>  {{ possetting }}</pre> -->

      <!-- {{possetting}} -->
      <!-- <v-tabs-items v-model="tab"> -->
      <!-- <v-tab-item> -->
      <!-- <v-container class="light gray lighten-12 c"> -->
      <!-- <v-card class="lighten-12 card-content"> -->

      <v-row>
        <v-col cols="9">
          <v-card class="lighten-12 card-content">
               <v-card-title>General</v-card-title>
            <v-container fluid >
           
              <v-row>
                <v-col cols="8">
                  <v-text-field
                    :error-messages="errors"
                    outlined
                    required
                    dense
                    v-model="possetting.pos_url"
                    hide-details="auto"
                    label="Pos url"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <!-- v-model="possetting.category" -->
                  <treeselect
                    v-model="possetting.category_id"
                    outlined
                    required
                    class="tree-border"
                    hide-details="auto"
                    :value="id"
                    dense
                    filled
                    :options="categories"
                    placeholder="Select your Default Category"
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
                </v-col>
                <v-col cols="6">
                  <v-autocomplete
                    v-model="possetting.customer_group_id"
                    :items="customerTypeList"
                    item-text="name"
                    item-value="id"
                    :error-messages="errors"
                    outlined
                    required
                    dense
                    hide-details="auto"
                    label="Customer Type"
                  ></v-autocomplete>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-select
                    dense
                    outlined
                    :items="option"
                    item-text="text"
                    item-value="value"
                    hide-details="auto"
                    label="Display Time"
                    v-model="possetting.display_time"
                  ></v-select>
                </v-col>

                <v-col cols="6">
                  <v-select
                    dense
                    outlined
                    :items="option"
                    item-text="text"
                    item-value="value"
                    hide-details="auto"
                    label="On Screen Keyboard"
                    v-model="possetting.on_screen_keyboard"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-select
                    dense
                    :items="option"
                    item-text="text"
                    item-value="value"
                    outlined
                    hide-details="auto"
                    label="Display Customer Details on Receipt"
                    v-model="possetting.display_customer_details_on_receipt"
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <v-select
                    dense
                    :items="shops"
                    item-text="name"
                    item-value="id"
                    outlined
                    hide-details="auto"
                    label="Default Shop"
                    v-model="possetting.shop_id"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>


      
      <!-- </v-card> -->
      <!-- </v-container> -->
      <!-- </v-tab-item> -->
      <!-- 
          <v-tab-item> -->

      <!-- shortcuts tab -->
      <!-- <v-card flat> -->
      <!-- <v-container class="light gray lighten-12 container-card"> -->
      <!-- <v-row class="ma-2 align-right">
              <v-col cols="12" xs="12" sm="4" md="4" lg="4" xl="4">
                <v-text-field
                  dense
                  outlined
                  hide-details="auto"
                  label="Focus Add Item Input"
                ></v-text-field>
              </v-col>
              <v-col cols="12" xs="12" sm="4" md="4" lg="4" xl="4">
                <v-text-field
                  dense
                  outlined
                  hide-details="auto"
                  label="Add Customer"
                ></v-text-field>
              </v-col>
              <v-col cols="12" xs="12" sm="4" md="4" lg="4" xl="4">
                <v-text-field
                  dense
                  outlined
                  hide-details="auto"
                  label="Cancel Sale"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="ma-2 align-right">
              <v-col cols="12" xs="12" sm="4" md="4" lg="4" xl="4">
                <v-text-field
                  dense
                  outlined
                  hide-details="auto"
                  label="Susbend Sale"
                ></v-text-field>
              </v-col>
              <v-col cols="12" xs="12" sm="4" md="4" lg="4" xl="4">
                <v-text-field
                  dense
                  outlined
                  hide-details="auto"
                  label="Finalize sale"
                ></v-text-field>
              </v-col>
            </v-row> -->
      <!-- </v-container> -->
      <!-- </v-card> -->
      <!-- </v-tab-item> -->
      <!-- </v-tabs-items> -->
      <!-- </v-card> -->
           <v-row>
        <v-col cols="9">
      <v-card-actions class="justify-content-end">
    
        <div>
          <btn-cancel></btn-cancel>
          <v-btn
            depressed
            small
            class="text-white btn_blue btn_medium w-100"
            @click="submit"
            >Update</v-btn
          >
        </div>
      </v-card-actions>
        </v-col></v-row>
    </v-container>
  </div>
</template>

<script>
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { ProductCategory } from "../../../../../models/ProductCategory";

import { PosSetting } from "@/models/PosSetting";

export default {
  data() {
    return {
      isLoading: false,
      tab: null,
      shops: [],
      items: [{ tab: "POS Configuration" }],
      possetting: [],
      option: [
        { text: "yes", value: true },
        { text: "no", value: false },
      ],
      categories: [],
      customerTypeList: [],
      productCategory: [new ProductCategory()],
      temp: "",
    };
  },
  components: {
    Treeselect,
  },
  methods: {
    async submit() {
      this.UpdateSetting();
    },
    GetCustomerType() {
      this.isLoading = true;
      this.$store
        .dispatch("customer/GetCustomerType")
        .then((res) => {
          this.customerTypeList = res.data.data;
          this.isLoading = false;
        })
        .catch((err) => {
          this.messages = err.data.title;
          this.isLoading = false;
        });
    },

    UpdateSetting() {
      this.isLoading = true;

      const pos = this.possetting;
      this.$store
        .dispatch("UpdatePosSetting", pos)
        .then((res) => {
          this.succeeed = true;

          this.$toast.success("POS setting updated  successfully");
          // this.$router.push({ path: "/" });
          this.isLoading = false;
        })
        .catch((err) => {
          this.$toast.error("POS setting updated  failed");
          this.messages = err.data.title;
          this.isLoading = false;
        });
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
    GetShops() {
      this.$store
        .dispatch("shop/GetShop")
        .then((res) => {
          debugger;

          this.shops = res;
        })
        .catch((err) => {
          this.messages = err.data.title;
          this.isLoading = false;
        });
    },
    GetSetting() {
      this.$store
        .dispatch("GetPOSSettings")
        .then((res) => {
          this.possetting = res.data;
        })
        .catch((err) => {
          this.messages = err.data.title;
          this.isLoading = false;
        });
    },
  },
  created() {
    this.GetSetting();

    this.GetCategories();
    this.GetCustomerType();
    this.GetShops();
  },
};
</script>

<template>
  <div>
    <PageTitle title="Shop Details" :backBtn="true" :editRoute="'/shop/edit/' + this.$route.params.id"
      :permission="'Customer Edit'"/>
    <v-container fluid class="lighten-12 content">
      <ValidationObserver ref="observer" v-slot="{ validate, reset }">
      </ValidationObserver>
      <v-row v-if="false">
         <v-col cols="12" xs="12" sm="12" md="8" lg="12" xl="12">
        <v-card class="lighten-12 card-content pa-5">
          <LineChart />
        </v-card>
      </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="12">
          <v-card class="lighten-12">
            <v-card-title>Account</v-card-title>
            <v-container fluid>
              <v-row>
                <v-col cols="6" sm="6" md="6" lg="3">
                  <h4>Account Type</h4>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="3">
                  <v-chip label>{{ this.Shop.account.account_type }}</v-chip>
                </v-col>
          
           
                <v-col cols="6" sm="6" md="6" lg="3">
                  <h4>Nick name</h4>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="3">
                  <v-chip label>{{ this.Shop.account.nick_name }}</v-chip>
                </v-col>
              </v-row>
             
              <v-row>
                <v-col cols="6" sm="6" md="6" lg="3">
                  <h4>Actual balance</h4>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="3">
                  <v-chip label>{{ this.Shop.account.actual_balance }}</v-chip>
                </v-col>
             
                <v-col cols="6" sm="6" md="6" lg="3">
                  <h4>Opened date</h4>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="3">
                  <v-chip label>{{ this.Shop.account.opened_date |formatDate}}</v-chip>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col></v-row
      >
      <v-row v-if="this.Shop.address" >
        <v-col cols="12" sm="12" md="12" lg="6">
          <v-card class="lighten-12">
            <v-card-title>Address</v-card-title>
            <v-container fluid>
              <v-row>
                <v-col cols="6" sm="6" md="6" lg="6">
                  <h4>Address line1</h4>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="6">
                  <v-chip label>{{ this.Shop.address.address_line1 }}</v-chip>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="6">
                  <h4>Address line2</h4>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="6">
                  <v-chip label>{{ this.Shop.address.address_line2 }}</v-chip>
                </v-col>
              </v-row>

              <v-row> </v-row>
              <v-row>
                <v-col cols="6" sm="6" md="6" lg="6">
                  <h4>City</h4>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="6">
                  <v-chip label>{{ this.Shop.address.city }}</v-chip>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" sm="6" md="6" lg="6">
                  <h4>Country</h4>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="6">
                  <v-chip label>{{ this.Shop.address.country.name }}</v-chip>
                </v-col>
              </v-row>
            </v-container>
          </v-card></v-col
        >
        <v-col v-if="this.Shop.contact">
          <v-card class="lighten-12">
            <v-card-title>Contact</v-card-title>
            <v-container fluid>
              <v-row>
                <v-col cols="6" sm="6" md="6" lg="6">
                  <h4>Telephone</h4>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="86">
                  <v-chip label>{{ this.Shop.contact.telephone }}</v-chip>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6" sm="6" md="6" lg="6"> <h4>Phone</h4> </v-col>
                <v-col cols="6" sm="6" md="6" lg="6">
                  <v-chip label>{{ this.Shop.contact.phone }}</v-chip>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" sm="6" md="6" lg="6">
                  <h4>Email</h4>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="6">
                  <v-chip label>{{ this.Shop.contact.email }}</v-chip>
                </v-col>
              </v-row>
               <v-row>
                <v-col cols="6" sm="6" md="6" lg="6">
                  <h4></h4>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="6">
                  <v-chip label></v-chip>
                </v-col>
              </v-row>
            </v-container>
          </v-card></v-col
        >
      </v-row>

      <v-row>
        <v-col cols="12" md="12" class="pa-3">
          <v-card class>
            <v-tabs v-model="tab" background-color="primary" dark>
              <v-tabs-slider></v-tabs-slider>
              <v-tab v-for="item in items" :key="item.tab">
                {{ item.tab }}
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
              <v-tab-item> <StockShops /> </v-tab-item
              ><v-tab-item>
                <SalesShop />
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
      </v-row>
      <!-- </v-card> -->
      <div class="d-flex justify-center align-center"></div>
    </v-container>
  </div>
</template>
<script>
import StockShops from "./ShopStockComponent";
import SalesShop from "./ShopSalesComponent";
import { required, email, max, regex } from "vee-validate/dist/rules";
import { Address } from "../../../../../models/Address";
import { Contact } from "../../../../../models/Contact";
import Shop from "../../../../../models/Shop";
import LineChart from "@/components/Charts/ShopSaleLineChart";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
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
extend("regex", {
  ...regex,
  message: "The value is not a valid phone number",
});
export default {
  components: {
    ValidationProvider,
    SalesShop,
    StockShops,
    ValidationObserver,
    LineChart
  },
  data() {
    return {
      Shop: new Shop(),
      items: [
        { tab: "Stock", content: "" },
        { tab: "Sales", content: "" },
      ],
      tab: "",
    };
  },
  created() {
    this.GetShopSingle();
  },
  methods: {
    GetShopSingle() {
      const id = this.$route.params.id;
      this.$store
        .dispatch(`shop/GetShopSingleId`, id)
        .then((res) => {
          this.Shop = res.data;
        })
        .catch((err) => {
          this.messages = err.data.title;
          this.isLoading = false;
        });
    },
  },
};
</script>

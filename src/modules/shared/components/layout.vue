<template>
  <v-app id="inspire">
    <v-navigation-drawer
      :dark="theme != 'light'"
      color=" en-3"
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      :mini-variant="!drawer"
      class="navigation"
      :permanent="permanent"
    >
      <!-- <v-parallax

        height="100%"
        src="https://static.vecteezy.com/system/resources/previews/000/549/665/non_2x/abstract-background--and-black-overlaps-004-vector.jpg"
      >-->
     <v-list dense>
        <template v-for="item in itemList">
          <v-row
            v-if="item.heading"
            :key="item.heading"
            align="center"
            class="hie"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDITt</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item['icon-alt'] : item.icon"
            top
            dense
          >
            <v-icon slot="prependIcon" large color="#1d2939">
              {{ item.model ? item["icon-alt"] : item.icon }}
            </v-icon>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title class="sidebar">{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              :to="child.link"
              link
              v-ripple="{ class: 'ripple_color' }"
              :style="drawer ? '' : 'background-color:#b0d7ff7a'"
            >
              <v-list-item-action
                v-if="child.icon"
                :class="!drawer ? '' : 'ml-4'"
              >
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="sidebar">{{ child.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else
            :key="item.text"
            link
            :to="item.link"
            v-ripple="{ class: 'ripple_color' }"
          >
            <v-list-item-action class>
              <v-icon color="#1d2939">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="sidebar">{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
      <!-- </v-parallax> -->
    </v-navigation-drawer>

    <!-- color="white" -->
    <v-app-bar
      :dark="theme != 'light'"
      :color="theme == 'light' ? 'white' : 'black_bar'"
      height="50"
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      flat
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title
        style="width: 200px"
        class="ml-0 pl-4 text-left d-none d-sm-flex"
      >
        <span class="brand_name">{{ sitename }} </span>
      </v-toolbar-title>
      <v-row align="center" justify="center" class="layout_responsive">
        <v-col cols="6" md="3" lg="2" class="mx-6">
          <!-- Add New Button -->
          <v-menu offset-y transition="scroll-y-transition">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                depressed
                small
                height="32"

                class="ml-2 text-white  btn_blue w-100 add_btn theme1"



                v-bind="attrs"
                v-on="on"
              >
                <v-icon class="icon_small ma-2">mdi-plus </v-icon>
                <section class="btn_responsive">
                  Add
                  <v-icon class="icon_small ma-2">mdi-menu-down </v-icon>
                </section>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(item, index) in productLists"
                :key="index"
                :to="item.link"
              >
                <v-list-item-title>
                  <v-icon class="icon_small ma-2">{{ item.icon }}</v-icon>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <v-col cols="6" md="3" lg="2" class="px-0 mx-4">
          <!-- Report New Button -->
          <v-menu offset-y transition="scroll-y-transition">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                depressed
                small
                height="32"
                class="theme1 w-100 btn_blue add_btn pa-0 "
                v-bind="attrs"
                v-on="on"
              >
                <v-icon class="icon_small ma-2">mdi-export </v-icon>

                <section class="btn_responsive">
                  Reports
                  <v-icon class="icon_small ma-2">mdi-menu-down </v-icon>
                </section>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(item, index) in reportLists"
                :key="index"
                :to="item.link"
              >
                <v-list-item-title>
                  <v-icon class="icon_small ma-2">{{ item.icon }}</v-icon>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <v-col class="global_search d-none d-md-flex">
          <v-menu
            transition="slide-y-transition"
            bottom
            :nudge-width="200"
            content-class="my-menu"
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="shadow" color="transparent" dark v-on="on">
                <svg
                  v-if="!color_mode"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  focusable="false"
                  width="2em"
                  height="3em"
                  style="
                    -ms-transform: rotate(360deg);
                    -webkit-transform: rotate(360deg);
                    transform: rotate(360deg);
                  "
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M4 6h2v12H4V6m3 0h1v12H7V6m2 0h3v12H9V6m4 0h1v12h-1V6m3 0h2v12h-2V6m3 0h1v12h-1V6M2 4v4H0V4a2 2 0 0 1 2-2h4v2H2m20-2a2 2 0 0 1 2 2v4h-2V4h-4V2h4M2 16v4h4v2H2a2 2 0 0 1-2-2v-4h2m20 4v-4h2v4a2 2 0 0 1-2 2h-4v-2h4z"
                    fill="white"
                  />
                </svg>
                <svg
                  v-if="color_mode"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  focusable="false"
                  width="2em"
                  height="3em"
                  style="
                    -ms-transform: rotate(360deg);
                    -webkit-transform: rotate(360deg);
                    transform: rotate(360deg);
                  "
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M4 6h2v12H4V6m3 0h1v12H7V6m2 0h3v12H9V6m4 0h1v12h-1V6m3 0h2v12h-2V6m3 0h1v12h-1V6M2 4v4H0V4a2 2 0
                 0 1 2-2h4v2H2m20-2a2 2 0 0 1 2 2v4h-2V4h-4V2h4M2 16v4h4v2H2a2 2 0 0 1-2-2v-4h2m20 4v-4h2v4a2 2 0 0 1-2 2h-4v-2h4z"
                    fill="#626262"
                  />
                </svg>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-row>
                  <v-col cols="7">
                    <v-text-field
                      v-model="barcode"
                      autofocus
                      placeholder="Scan Barcode"
                      @input="barcodeErrorMessage = null"
                      error-messages="barcodeErrorMessage"
                      outlined
                      hide-details
                    ></v-text-field>
                  </v-col>

                  <v-col cols="5">
                    <v-btn small @click="GetBatchByBarcode(barcode)">
                      search
                    </v-btn>
                  </v-col>
                </v-row>
              </v-list-item>
              <v-list-item v-if="barcodeErrorMessage">
                <div style="color: darkred">{{ barcodeErrorMessage }}</div>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>

        <v-col v-if="false" class="global_search d-none d-md-flex">
          <v-text-field
            placeholder="Tell me what you want to do"
            single-line
            outlined
            hide-details
            prepend-icon="mdi-lightbulb-on"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>

      

      <v-btn
        depressed
        small
        height="32"
        class="theme1 w-100 add_btn pa-0"
        v-bind="attrs"
        v-on="on"
        @click="gotopos()"
        target="_blank"
      >
        <v-icon class="icon_small ma-2">mdi-point-of-sale </v-icon>


        <section class="btn_responsive pr-4">POS</section>
      </v-btn>
      <v-btn icon @click="color_mode = !color_mode" class="mr-3">
        <img
          style="fill: white"
          src="../../../assets/img/sun.svg"
          height="15"
          v-show="!color_mode"
        />
        <img
          src="../../../assets/img/moon.svg"
          height="15"
          v-show="color_mode"
        />
      </v-btn>
      <!-- <div class="mr-3 py-2">
        <label id="switch" class="switch">
          <input v-model="color_mode" type="checkbox" onchange="toggleTheme()" id="slider" />
          <span class="slider round"></span>
        </label>
      </div> -->
      <!-- <v-btn icon>
        <Notification></Notification>
      </v-btn -->
      <span class="d-none d-sm-flex">
        {{ user.first_name }}
      </span>
      <v-btn icon>
        <UserMenuComponent></UserMenuComponent>
      </v-btn>
    </v-app-bar>
    <v-main>
      <!-- <v-row> -->

      <!-- <Loading v-if="isLoading"></Loading>
      <router-view v-else /> -->
      <Loading></Loading>
      <!-- <transition name="fade"> -->
      <router-view />
      <!-- </transition> -->
      <!-- </v-row> -->
    </v-main>
    <v-footer padless>
      <v-col class="text-center" cols="12">
        <strong>
          {{ new Date().getFullYear() }} @ Copyright — Inventory & POS by Speed
          Code Labs (Pvt) Ltd
        </strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import _ from "lodash";
import UserMenuComponent from "./user.menu";
import Notification from "./notification";
import env from "../../../config/env";
import { mapState } from "vuex";
import Loading from "@/components/shared/routeLoading.vue";

export default {
  components: {
    UserMenuComponent,
    Notification,
    Loading,
  },
  props: {
    source: String,
  },
  data: () => ({
    barcode: null,
    barcodeErrorMessage: null,
    sitename: "",
    dialog: false,
    drawer: false,
    itemList: [],
    productLists: [],
    reportLists: [],
    items: [
      {
        icon: "mdi-home-circle-outline",
        "icon-alt": "mdi-home-circle",
        text: "Dashboard",
        // model: true,
        link: "/",
        policy: ["Dashboard Index"],
      },
      {
        icon: "mdi-layers-triple-outline",
        "icon-alt": "mdi-layers-triple",
        text: "Products",
        link: "/product",
        policy: ["Product Index"],
      },
      {
        icon: "mdi-sack-percent",
        "icon-alt": "mdi-account-multiple-plus",
        text: "Sales",
        link: "/sales",
        policy: ["Sales Index"],
      },
      // {
      //   icon: "mdi-storefront-outline",
      //   "icon-alt": "mdi-storefront",
      //   text: "Purchase Orders",
      //   link: "/purchase-order",
      //   policy: ["Purchase Order Index"],
      // },
      // {
      //   icon: "mdi-truck-check-outline",
      //   "icon-alt": "mdi-truck-check",
      //   text: "Purchases",
      //   link: "/purchases",
      //   policy: ["Purchase Index"],
      // },
      // {
      //   icon: "mdi-truck-delivery-outline",
      //   "icon-alt": "mdi-truck-delivery",
      //   text: "Purchase Returns",
      //   link: "/purchase-return",
      //   policy: ["Purchase Return Index"],
      // },
      {
        icon: "mdi-account-multiple-outline",
        "icon-alt": "mdi-account-multiple",
        text: "Suppliers",
        link: "/supplier",
        policy: ["Supplier Index"],
      },
      {
        icon: "mdi-account-multiple-outline",
        "icon-alt": "mdi-account-multiple-plus",
        text: "Customers",
        link: "/customer",
        policy: ["Customer Index"],
      },
      // {
      //   icon: "mdi-sack-percent",
      //   "icon-alt": "mdi-account-multiple-plus",
      //   text: "Discounts",
      //   link: "/discount",
      //   policy: ["Discount Index"],
      // },
      // {
      //   icon: "mdi-database-minus",
      //   "icon-alt": "mdi-database-minus",
      //   text: "Stock Transfer",
      //   link: "/stocktransfer",
      //   policy: ["Transfer Index"],
      // },
      {
        icon: "mdi-warehouse",
        "icon-alt": "mdi-store",
        text: "Warehouses",
        link: "/warehouse",
        policy: ["Ware House Index"],
      },
      // {
      //   icon: "mdi-account-circle",
      //   "icon-alt": "mdi-store",
      //   text: "Accounts",
      //   link: "/accounts",
      //   policy: ["Customer Index"],
      // },
      {
        icon: " mdi-shopping",
        text: "Shops",
        link: "/shop",
        policy: ["Shop Index"],
      },
      // {
      //   icon: "mdi-account-circle-outline",
      //   text: "Users",
      //   link: "/user",
      //   policy: ["User Index"],
      // },
      // {
      //   icon: "mdi-checkbook",
      //   text: "Cheques",
      //   link: "/cheque",
      //   policy: ["Cheques Index"],
      // },
      // {
      //   icon: "mdi-cash-multiple",
      //   text: "Payments",
      //   link: "/payment",
      //   policy: ["Cheques Index"],
      // },
      {
        icon: "mdi-truck-check-outline",
        "icon-alt": "mdi-truck-check",
        text: "Purchases",
        link: "/purchases",
        policy: ["Purchase Index"],
        children: [
          {
            icon: "mdi-storefront-outline",
            "icon-alt": "mdi-storefront",
            text: "Purchase Orders",
            link: "/purchase-order",
            policy: ["Purchase Order Index"],
          },
          {
            icon: "mdi-truck-check-outline",
            "icon-alt": "mdi-truck-check",
            text: "Purchases",
            link: "/purchase",
            policy: ["Purchase Index"],
          },
          {
            icon: "mdi-truck-delivery-outline",
            "icon-alt": "mdi-truck-delivery",
            text: "Purchase Returns",
            link: "/purchase-return",
            policy: ["Purchase Return Index"],
          },
        ],
      },
      {
        icon: "mdi-store",
        "icon-alt": "mdi-store",
        text: "Stocks",
        policy: ["Stocks Index"],
        children: [
          {
            icon: "mdi-database",
            "icon-alt": "mdi-database",
            text: "Warehouse",
            link: "/stock",
            policy: ["Stocks Show"],
          },
           {
            icon: "mdi-database",
            "icon-alt": "mdi-database",
            text: "Shop",
            link: "/shop-stock",
            policy: ["Stocks Show"],
          },
          {
            icon: "mdi-database-minus",
            "icon-alt": "mdi-database-minus",
            text: "Transfer",
            link: "/stock-transfer",
            policy: ["Transfer Index"],
          },
          // {
          //   icon: " mdi-shopping",
          //   text: "Shops",
          //   link: "/shop",
          //   policy: ["Customer Index"],
          // },
        ],
      },
      {
        icon: "mdi-store",
        "icon-alt": "mdi-store",
        text: "Transactions",
        policy: ["Stocks Index"],
        children: [
          {
            icon: "mdi-cash-multiple",
            text: "Payments",
            link: "/payment",
            policy: ["Cheques Index"],
          },
          {
            icon: "mdi-checkbook",
            text: "Cheques",
            link: "/cheque",
            policy: ["Cheques Index"],
          },
          {
            icon: "mdi-checkbook",
            text: "Expenses",
            link: "/expenses",
            policy: ["Expenses Index"],
          },
           {
            icon: "mdi-checkbook",
            text: "Incomes",
            link: "/incomes",
            policy: ["Expenses Index"],
          },
        ],
      },
      {
        icon: "mdi-border-all",
        "icon-alt": "mdi-border-all",
        text: "Master Data",
        policy: ["master"],
        children: [
          {
            icon: "mdi-bulletin-board",
            text: "Category",
            link: "/masterdata/category",
            policys: ["Category Index"],
          },
          {
            icon: "mdi-chemical-weapon",
            text: "Brand",
            link: "/masterdata/brand",
          },
          {
            icon: "mdi-yeast",
            text: "Unit",
            link: "/masterdata/unit",
          },
          {
            icon: "mdi-yeast",
            text: "Expence Category",
            link: "/masterdata/expense-category",
          },
          {
            icon: "mdi-yeast",
            text: "Income Category",
            link: "/masterdata/income-category",
          },
        ],
      },

      {
        icon: "mdi-file-document-outline",
        "icon-alt": "mdi-file-document",
        text: "Reports",
        policy: ["Report Index"],
        children: [
          {
            icon: "mdi-file",
            text: "Product",
            link: "/product-report",
            policy: ["Product Report Index"],
          },
          {
            icon: "mdi-file-excel-box",
            text: "Purchase",
            link: "/purchase-report",
            policy: ["Purchase Report Index"],
          },
          {
            icon: "mdi-file-export",
            text: "Purchase Order",
            link: "/purchase-order-report",
            policy: ["Purchase Order Report Index"],
          },
          {
            icon: "mdi-file-export",
            text: "Purchase Return",
            link: "/purchase-return-report",
            policy: ["Purchase Return Report Index"],
          },
          {
            icon: "mdi-file-import",
            text: "Out Of Stock",
            link: "/out-of-stock-report",
             policy: ["Out Of Stocks Report Index"],
          },
          {
            icon: "mdi-file-send",
            text: "Low Stock",
            link: "/low-stock-report",
            policy: ["Low Stocks Report Index"],
          },
          {
            icon: "mdi-file-multiple",
            text: "Sales",
            link: "/sales-report",
            policy: ["Sales Report Index"],
          },
        ],
      },
      {
        icon: "mdi-wrench-outline",
        "icon-alt": "mdi-wrench",
        text: "Settings",
        policy: ["setting"],
        children: [
          {
            icon: "mdi-account-circle-outline",
            text: "Users",
            link: "/user",
            policy: ["User Index"],
          },
          {
            icon: "mdi-shield-lock",
            text: "Roles",
            link: "/role",
            policy: ["Role Index"],
          },
          {
            icon: "mdi-domain",
            text: "Organization",
            link: "/setting/organization",
            policy: ["Organization Index"],
          },
          {
            icon: "mdi-account-key",
            text: "Pos Setting",
            link: "/setting/pos",
            policy: ["Pos setting Index"],
          },
          {
            icon: "mdi-key-variant",
            text: "Site Configuration",
            link: "/setting/sites",
            policy: ["Site setting Index"],
          },
        ],
      },
    ],
    ListOfAdds: [
      {
        text: "Add Product",
        icon: "mdi-layers-triple-outline",
        link: "/product/add",
        policy: ["Product Create"],
      },
      {
        text: "Add Purchase Order",
        icon: "mdi-storefront-outline",
        link: "/purchase-order/add",
        policy: ["Purchase Order Create"],
      },
      {
        text: "Add Purchase",
        icon: "mdi-truck-check-outline",
        link: "/purchase/add",
        policy: ["Purchase Create"],
      },
      {
        text: "Add Purchase Return",
        icon: "mdi-truck-delivery-outline",
        link: "/purchase-return/add",
        policy: ["Purchase Return Create"],
      },
      {
        text: "Add Supplier",
        icon: "mdi-account-multiple-outline",
        link: "/supplier/add",
        policy: ["Supplier Create"],
      },
      {
        text: "Add Customer",
        icon: "mdi-account-multiple-outline",
        link: "/customer/add",
        policy: ["Customer Create"],
      },
      // { text: "Add WareHouse", icon: "mdi-store", link: "/setting/warehouse" },
      // { text: "Add Category", icon: "mdi-tag", link: "/setting/category" },
    ],
     ListOfReports: [
      {
        text: "Product",
        icon: "mdi-layers-triple-outline",
        link: "/product-report",
        policy: ["Product Report Index"],
      },
      {
        text: "Purchase Order",
        icon: "mdi-storefront-outline",
        link: "/purchase-order-report",
        policy: ["PurchaseOrder Report Index"],
      },
      {
        text: "Purchase",
        icon: "mdi-truck-check-outline",
        link: "/purchase-report",
        policy: ["Purchase Report Index"],
      },
      {
        text: "Purchase Return",
        icon: "mdi-truck-delivery-outline",
        link: "/purchase-return-report",
        policy: ["PurchaseReturn Report Index"],
      },
      {
        text: "Out Of Stock",
        icon: "mdi-store",
        "icon-alt": "mdi-store",
        link: "/out-of-stock-report",
        policy: ["Out Of Stocks Report Index"],
      },
      {
        text: "Low Stock",
        icon: "mdi-store",
        "icon-alt": "mdi-store",
        link: "/low-stock-report",
        policy: ["Low Stocks Report Index"],
      },
      {
        text: "Sales",
        icon: "mdi-sack-percent",
        "icon-alt": "mdi-account-multiple-plus",
        link: "/sales-report",
        policy: ["Sales Report Index"],
      },
    ],
  }),
  watch: {
    // color_mode: function() {
    //   this.$store.commit("SET_COLOR_MODE", this.color_mode);
    // },
  },
  methods: {
    gotopos() {
      debugger;
      window.open(this.$store.state.pos_url, "_blank");
    },
    GetBatchByBarcode(barcode) {
      this.$store
        .dispatch("product/GetProductBatchByBarcode", barcode)
        .then((res) => {
          debugger;

          this.$router.push(`/product/${res.id}/batch/${res.batch_id}`);
        })
        .catch((err) => {
          debugger;
          this.barcodeErrorMessage = err.data;
        });
    },

    checkPermission(policy) {
      this.items.map((item) => {
        let permission = this.$store.state.user.policies;
        var hasPermission = _.find(permission, function (permission) {
          return permission.name == item.policy;
        });

        if (hasPermission) {
          this.itemList.push(item);
        }
      });

      this.ListOfAdds.map((item) => {
        let permission = this.$store.state.user.policies;
        var hasPermissions = _.find(permission, function (permission) {
          return permission.name == item.policy;
        });
        if (hasPermissions) {
          this.productLists.push(item);
        }
      });

      this.ListOfReports.map((item) => {
        let permission = this.$store.state.user.policies;
        var hasPermissions = _.find(permission, function (permission) {
          return permission.name == item.policy;
        });
        if (hasPermissions) {
          this.reportLists.push(item);
        }
      });
    },
  },
  mounted: function () {
    this.checkPermission();
  },
  created() {
    this.sitename = this.$store.state.sitesetting.name;



    this.$store.subscribe((mutation, state) => {
      this.sitename = state.sitesetting.name;
    });
  },

  computed: {
    // sitename() {
    //   return this.$store.state.sitesetting.name;
    // },
    color_mode: {
      get() {
        return this.theme == "light";
      },
      set(value) {
        this.$store.commit("SET_COLOR_MODE", value);
      },
    },
    isLoading: function () {
      return this.$root.loading;
    },
    ...mapState(["name", "theme"]),
    ...mapState("user", ["user"]),
    permanent: {
      get: function () {
        switch (this.$vuetify.breakpoint.name) {
          case "xs":
            return !true;
          case "sm":
            return !true;
          case "md":
            return !true;
          case "lg":
            return !false;
          case "xl":
            return !false;
        }
      },
      set: function (value) {
        this.drawer = value;
      },
    },
    name() {
      return env.name;
    },
  },
};
</script>
<style>
/* global_search  */
.global_search fieldset {
  border: unset !important;
}

.global_search .v-input__prepend-outer {
  margin-top: 4px !important;
}

.global_search .v-input__prepend-outer .v-icon {
  font-size: 18px !important;
}

.global_search .v-input__slot {
  margin-left: -15px;
}

.global_search .v-input input {
  padding-left: 16px;
  /* background: #f7f7f796; */
  border-radius: 8px;
  color: #565656;
}

.global_search .v-input input:focus {
  color: black;
  padding-left: 16px;
  background: #f7f7f7;
  border-radius: 8px;
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

.theme-light {
  --color-primary: #0060df;
  --color-secondary: #fbfbfe;
  --color-accent: #fd6f53;
  --font-color: #000000;
}

.theme-dark {
  --color-primary: #17ed90;
  --color-secondary: #2a2c2d;
  --color-accent: #12cdea;
  --font-color: #ffffff;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 14;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #eaeaea;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 0px;
  bottom: 4px;
  top: 0;
  bottom: 0;
  margin: auto 0;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  box-shadow: 0 0px 15px #2020203d;
  background: white url("../../../assets/img/night.png");
  background-repeat: no-repeat;
  background-position: center;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(17px);
  -ms-transform: translateX(17px);
  transform: translateX(17px);
  background: white url("../../../assets/img/sunny.png");
  background-repeat: no-repeat;
  background-position: center;
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
.my-menu {
  margin-top: 40px;
  contain: initial;
  overflow: visible;
}
.my-menu::before {
  position: absolute;
  content: "";
  top: 0;
  left: 10px;
  transform: translateY(-100%);
  width: 10px;
  height: 13px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 13px solid #fff;
}
.shadow {
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
.theme1 {
  background-color: #1d927f!important;
  border-radius: 24px !important;
  color: #ffffff !important;
}
.btn_responsive {
  max-width: -moz-available;
}



@media only screen and (max-width: 1400px) {
  .btn_responsive {
    font-size: 12px !important;
  }
  @media only screen and (max-width: 1000px) {
    .btn_responsive {
      display: none !important;
    }
    @media only screen and (max-width: 700px) {
      .layout_responsive .v-btn {
        height: 30px !important;
        width: 50px !important;
        min-width: 10px !important;
      }
      .v-toolbar__title {
        width: 100px !important;
      }
      .brand_name {
        font-weight: bolder !important;
        font-size: 12px;
        color: #031a61;
      }
    }
  }
}
</style>

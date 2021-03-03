<template>
<!-- <v-container fluid class="lighten-12 container">
 
    <v-row>
      <v-col>
      </v-col>
    </v-row></v-container>
     -->
  <v-container fluid class="lighten-12 container">
    <v-row>
      <v-col>
        <!-- Page Title -->
        <PageTitle title="Purchase List" :hasBreadcrumbs="false" />
      </v-col>
      <v-col class="text-right ma-auto">
        <!-- <v-btn
          depressed
          small
          height="32"
          class="text-white btn_blue btn_large w-100"
          @click.stop="$router.push('/purchase/add')"
        >
          <v-icon class="icon_small ma-2">mdi-plus</v-icon>Create
        </v-btn> -->
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              depressed
              small
              height="32"
              class="ml-2 text-white secondary btn_large w-100"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon class="icon_small ma-2">mdi-apps</v-icon>Actions
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in ['Export', 'Import']"
              :key="index"
              @click
            >
              <v-list-item-title>
                <v-icon v-if="index == 0" class="icon_small ma-2"
                  >mdi-export</v-icon
                >
                <v-icon v-if="index == 1" class="icon_small ma-2"
                  >mdi-import</v-icon
                >
                {{ item }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-card class="lighten-12 card-content">
      <v-row class="ma-0 align-right">
        <v-col class="pr-1 text-right" xs="12" sm="12" md="2" lg xl="2">
          <!-- Date Range -->
          <v-menu
            ref="menu1"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
            dense
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                dense
                outlined
                hide-details="auto"
                v-model="dateRangeText"
                label="Date Range"
                persistent-hint
                prepend-icon
                v-bind="attrs"
                v-on="on"
                clearable
                @click:clear="
                  (date_range = []), (filter.start = null), (filter.end = null)
                "
              ></v-text-field>
            </template>
            <v-date-picker v-model="date_range" range></v-date-picker>
          </v-menu>
        </v-col>
        <v-col class="pl-1 pr-1 text-right" xs="12" sm="12" md="2" lg xl="2">
          <v-text-field
            label="Total Greater Than"
            outlined
            dense
            hide-details="auto"
            type="number"
            v-model="filter.amount"
            :error-messages="errors"
          ></v-text-field>
        </v-col>

        <v-col class="pl-1 pr-1 text-right" xs="12" sm="12" md="2" lg xl="2">
          <v-autocomplete
            :items="suppliers"
            v-model="filter.supplier"
            item-text="name"
            item-value="id"
            label="Supplier"
            outlined
            dense
            hide-details="auto"
            :error-messages="errors"
          ></v-autocomplete>
        </v-col>

        <v-col
          class="ma-auto pr-6 text-left"
          v-if="filter.amount || filter.supplier"
        >
          <v-btn icon small @click="clearFilter">
            <v-icon small>mdi-close</v-icon>
          </v-btn>
        </v-col>
        <v-col class="pr-6 text-right"></v-col>
        <v-col class="pr-3 text-right" sm="12" md="3" xl="2">
          <v-text-field
            hide-details="auto"
            v-model="filter.search"
            dense
            outlined
            placeholder="Search"
            append-icon="mdi-magnify"
          ></v-text-field>
        </v-col>
        <TableHeaderFilter :columns="columns" />
      </v-row>
    </v-card>

    <!-- <v-card class="lighten-12 mt-2"> -->
    <!-- <v-container class="light gray lighten-12"> -->
    <ValidationObserver ref="observer">
      <form>
        <v-row v-if="messages.length != 0">
          <v-col>
            <v-card>
              <v-card-text>
                <v-row>
                  <template>
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
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-card-text class="pa-0">
            <v-data-table
              :headers="headers"
              :items="PurchaseList"
              hide-default-footer
            >
              <template
                v-slot:item.date="{ item }"
                v-slot="{ errors }"
                name="value"
                rules="numeric"
                >{{ item.purchase.date | formatDate }}</template
              >
              <template
                v-slot:item.supplier="{ item }"
                v-slot="{ errors }"
                name="Quantity"
                rules="numeric"
                >{{ item.purchase.supplier | hasName }}</template
              >
              <!-- Actions -->
              <template v-slot:item.actions="{ item }">
                <v-menu  offset-y transition="scroll-y-transition" >
                  <template v-slot:activator="{ attrs, on }">
                    <v-icon v-bind="attrs" v-on="on"
                      >mdi-dots-vertical</v-icon
                    >
                  </template>
                  <v-list class="actions">
                    <v-list-item dense link @click="viewPurchaseOrder(item)">
                      <span>
                        <v-icon v-bind="attrs" v-on="on">mdi-eye</v-icon>View
                      </span>
                    </v-list-item>
                    <v-list-item
                      dense
                      @click.stop="editPurchaseOrder(item)"
                      link
                    >
                      <span>
                        <v-icon v-bind="attrs" v-on="on"
                          >mdi-pencil-box-outline</v-icon
                        >Edit
                      </span>
                    </v-list-item>

                    <v-list-item link dense @click="archivePurchaseOrder(item)">
                      <span>
                        <v-icon v-bind="attrs" v-on="on">
                          {{
                            item.status == "Archived"
                              ? "mdi-checkbox-marked-circle"
                              : "mdi-archive"
                          }}
                        </v-icon>
                        {{ item.status == "Archived" ? "Active" : "Archive" }}
                      </span>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
              <template v-slot:footer="{}">
                <paginationComponent
                  :url="`${module}/${id}/purchase`"
                  @response="receivePurchaseData"
                  :filter="filter"
                />
                <!-- :url="'purchases-orders'" -->
              </template>
            </v-data-table>
          </v-card-text>
        </v-row>
      </form>
    </ValidationObserver>
    <!-- </v-container> -->
    <!-- </v-card> -->
  </v-container>
</template>
<script>
import { PurchaseOrder } from "../../../models/EntityModels/PurchaseOrder";
import { required, email, max, numeric } from "vee-validate/dist/rules";
import { SupplierListViewModel } from "../../../models/View Models/Supplier";
// Mixins
import Suppliers from "@/mixins/Suppliers";
import _ from "lodash";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import { Product } from "../../../models/Product";
import PaymentComponent from "../../shared/components/PaymentComponent";

import { ProductViewModel } from "../../../models/View Models/ProductViewModel";
import paginationComponent from "./pagination.vue";
import { mapGetters } from "vuex";
import { has } from "lodash";


extend("numeric", {
  ...numeric,
  message: "input must be numeric",
});
export default {
  mixins: [Suppliers],
  data: () => ({
    messages: [],
    errors: [],
    products: [],
    warehouses: [],
    // suppliers: [],
    // Table headers
    columns: [
      {
        text: "Date",
        value: "date",
        show: true,
        disabled: true,
      },
      {
        text: "Reference No",
        value: "purchase.reference_number",
        show: true,
        disabled: false,
      },
      {
        text: "Supplier",
        value: "supplier",
        show: true,
        disabled: false,
      },
      {
        text: "Grand Total",
        value: "purchase.total_amount",
        show: true,
        disabled: false,
      },
      {
        text: "Actions",
        value: "actions",
        show: true,
        disabled: true,
        align:'center',
        width:'10%'
      },
    ],
    // For Purchase Table Data
    PurchaseList: [],
    //For Filter
    date_range: [],
    filter: {
      invoice_status: "",
      start: "",
      end: "",
      amount: "",
      supplier: "",
      search: "",
    },
    // menus
    // invoiceStatusOptions: ["All"],
    menu: false,
  }),
  props: {
    module: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    paginationComponent,
    PaymentComponent,
  },
  computed: {
    ...mapGetters(["getInvoiceStatusOptions"]),
    // ...mapGetters(["ProductStore", "GetAllProducts"]),
    // ...mapGetters(["supplier", "GetAllSuppliers"]),
    dateRangeText() {
      this.filter.start = this.date_range[0];
      this.filter.end = this.date_range[1];
      return this.date_range.join(" ~ ");
    },
    headers: function() {
      return this.columns.filter((item) => item.show == true);
    },
  },
  methods: {
    clearFilter() {
      this.filter = {};
      this.date_range = [];
    },
    receivePurchaseData(data) {
      this.PurchaseList = data;
    },
    getSuppliers() {
      this.$store.dispatch("supplier/GetAllSuppliers");
    },
    getWarehouses() {
      this.$store
        .dispatch("warehouse/GetWarehouses")
        .then((res) => {
          this.warehouses = res.data.data;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.messages = err.data.name;
        });
    },
    getProducts() {
      this.$store.dispatch("product/GetAllProducts");
    },
    viewPurchaseOrder(purchaseOrder) {
      this.$router.push(`/purchase/${purchaseOrder.id}`);
    },
    editPurchaseOrder(purchaseOrder) {
      this.$router.push(`/purchase/edit/${purchaseOrder.id}`);
    },
    archivePurchaseOrder(purchaseOrder) {},
    addPurchaseOrder() {
      this.$router.push(`/purchase/add`);
    },
    addPurchase() {
      this.$router.push(`/purchase/add`);
    },
  },
  created() {
    this.getProducts();
    this.getSuppliers();
    this.getWarehouses();
  },
  filters: {
    hasName: function(value) {
      if (has(value, "name")) return value.name;
      else return "-";
    },

  },
};
</script>

<style scoped>
.btnRightMargin {
  margin-right: 10px;
}
/* .contacts{
  background: aliceblue;
  padding: 5px;

}
.Address{
  padding: 5px;
} */
/* .container {
  color: white !important;
} */
.form-blue {
  background: #abc5f1;
  border-radius: 0.25rem;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}
.messages {
  border: transparent !important;
  margin-right: 40px;
}
.custom-card {
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.2),
    0px -3px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
}
</style>

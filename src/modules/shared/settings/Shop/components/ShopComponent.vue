<template>
  <div>
    <PageTitle
      title="Shops"
      :btnCreate="true"
      @onClickCreate="AddShop()"
      :createPopup="true"
      :permission="'Shop Create'"
    />
    <v-container fluid class="lighten-12 content">
      <ValidationObserver ref="observer" v-slot="{ validate, reset }">
        <v-card class="lighten-12 card-content mb-2">
          <v-row class="ma-0 align-right">
            <TableFilters
              :filters="['status', 'search']"
              v-model="filter"
              :columns="columns"
            ></TableFilters>
            <ImportExportMenu :permission="'Unit Report'"></ImportExportMenu>
          </v-row>
        </v-card>

        <LoadingComponent
          v-if="isLoading"
          :visible="isLoading"
        ></LoadingComponent>
        <v-card class="lighten-12 mt-2">
          <v-container class="light gray lighten-12" fluid>
            <v-row>
              <v-card-text class="pa-0">
                <v-data-table
                  :items-per-page="paginationOptions.perPage"
                  :fixed-header="true"
                  :headers="headers"
                  @click:row="$router.push(`shop/${$event.id}`)"
                  class="row-pointer"
                  :items="shops"
                  :single-expand="singleExpand"
                  :expanded.sync="expanded"
                  show-expand
                  item-key="id"
                  hide-default-footer
                >
                  <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length" class="px-5 py-2">
                      <template v-if="item.contact.length">
                        <v-card class="pa-0 mt-2 mb-2">
                          <v-card-title>Contact </v-card-title>
                          <!-- <pre>{{item.contact}}</pre> -->
                          <v-data-table
                            hide-default-footer="true"
                            :headers="contactHeaders"
                            :items="item.contact"
                            class="sub-table"
                          ></v-data-table>
                        </v-card>
                      </template>

                      <template v-if="item.address.length">
                        <v-card class="pa-0 mt-2 mb-2">
                          <v-card-title>Address </v-card-title>
                          <v-data-table
                            single-expand="'true'"
                            hide-default-footer="true"
                            :headers="addressHeaders"
                            :items="item.address"
                            class="sub-table"
                          ></v-data-table>
                        </v-card>
                      </template>
                      <template
                        v-if="
                          item.contact.length == 0 && item.address.length == 0
                        "
                      >
                        <v-card class="pa-0 mt-2 mb-2">
                          <v-container fluid>No Contacts</v-container></v-card
                        ></template
                      >
                    </td>
                  </template>

                  <!-- Status -->
                  <template
                    v-slot:item.is_active="{ item }"
                    :slot-scope="props"
                  >
                    <v-chip
                      :x-small="true"
                      class="ma-2"
                      label
                      text-color="white"
                      :color="getStatusColor(item.is_active)"
                      dark
                      >{{ item.is_active ? "Active" : "Archived" }}</v-chip
                    >
                  </template>

                  <template
                    v-slot:item.account.opened_date="{ item }"
                    v-slot="{ errors }"
                    name="value"
                    rules="numeric"
                    >{{ item.account.opened_date | formatDate }}</template
                  >

                  <!-- Action -->
                  <template v-slot:item.action="{ item }">
                    <list-menu
                      feature="shop"
                      :item="item"
                      viewPermission="Shop Show"
                      editPermission="Shop Edit"
                      softDeletePermission="Shop Soft Delete"
                      @refreshList="refreshData"
                    ></list-menu>
                  </template>
                  <template v-slot:footer>
                    <pagination
                      @paginationOptions="setPaginationOptions"
                      @response="setResponseData"
                      url="shops"
                      ref="refer"
                      :filter="filter"
                    >
                    </pagination>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-row>
          </v-container>
        </v-card>
      </ValidationObserver>

      <!-- </v-card> -->
      <div class="d-flex justify-center align-center"></div>
    </v-container>
  </div>
</template>
<script>
import TableFilters from "@/components/base/TableFilters";
import EditShop from "./EditShopComponent";
import CreateShop from "./CreateShopComonent";
import { required, email, max, regex } from "vee-validate/dist/rules";
import { mapState } from "vuex";
import pagination from "../../../components/pagination";
import confirmation from "../../../components/confirmation";

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
    pagination,
    ValidationProvider,
    TableFilters,
    ValidationObserver,
  },
  data() {
    return {
      paginationOptions: {},
      contactValueS: [
        { email: "aaa@aa.com", telephone: "0212221212", phone: "0212221212" },
      ],
      isLoading: false,
      expanded: [],
      singleExpand: false,
      progressBar: false,

      pagination1: {
        descending: true,
        page: 1,
        rowsPerPage: 2,
        sortBy: "fat",
        totalItems: 0,
        rowsPerPageItems: [1, 2, 4, 8, 16],
      },
      addressHeaders: [
        {
          text: "Address Line1",
          value: "address_line1",
          show: true,
          align: "left",
          disabled: false,
        },
        {
          text: "Address Line2",
          value: "address_line2",
          show: true,
          align: "left",
          disabled: false,
        },
        {
          text: "City",
          value: "city",
          align: "left",
          show: true,
          disabled: false,
        },
        {
          text: "Country",
          value: "country.name",
          align: "left",
          show: true,
          disabled: false,
        },
        {
          text: "Postal Code",
          value: "postal_code",
          align: "left",
          show: true,
          disabled: false,
        },
      ],
      contactHeaders: [
        { text: "Phone", value: "phone", align: "left" },
        { text: "Telephone", value: "telephone", align: "left" },
        { text: "Email", value: "email", align: "left" },
      ],
      stockcolumns: [
        {
          text: "Product",
          value: "product.name",
        },
        { text: "Unit", value: "unit.name" },

        {
          text: " Actual stock",
          value: "available_stock",
          align: "center",
        },
        {
          text: "Damage",
          value: "damage",
          align: "center",
        },
        {
          text: "Reorder Level",
          value: "reorder_level",

          align: "center",
        },
      ],
      shopsdata: {},
      shops: [],
      stockshops: [],
      isCreateFormVisible: false,
      isEditFormVisible: false,
      pagination: {
        page: 1,
        itemsPerPage: 2,
      },
      page: 1,
      status: [
        { text: "Active", value: "active" },
        { text: "Archived", value: "archived" },
      ],
      columns: [
        {
          text: "Name",
          value: "name",
          show: true,
          align: "left",
          disabled: false,
        },
        // {
        //   text: "Account number",
        //   value: "account.account_number ",
        //   show: true,
        //   align: "left",
        //   disabled: false,
        // },
        {
          text: "Account nick name",
          value: "account.nick_name",
          show: true,
          align: "left",

          disabled: false,
        },
        {
          text: "Account open date",
          value: "account.opened_date",
          show: true,
          align: "left",
          disabled: false,
        },
        {
          text: "Account available balance",
          value: "account.available_balance",
          show: true,
          align: "right",
          disabled: false,
        },

        {
          text: "Status",
          value: "is_active",
          show: true,
          disabled: false,
          align: "center",
          width: "20%",
        },
        {
          text: "Actions",
          value: "action",
          show: true,
          disabled: false,
          align: "center",
          width: "10%",
        },
      ],
      contacts: [],
      addresses: [],
      filter: {
        name: "",
        search: "",
        status: "",
      },
    };
  },
  computed: {
    headers: function () {
      return this.columns.filter((item) => item.show == true);
    },
  },
  methods: {
    setPaginationOptions(data) {
      this.paginationOptions = data;
    },
    filterContact(data) {
      return data.map((item) => {
        return {
          email: item.email,
          telephone: item.telephone,
          phone: item.phone,
        };
      });
    },
    ViewShop(item) {
      this.$router.push(`/shop/${item.id}`);
    },
    EditShop(item) {
      debugger;
      this.$router.push(`/shop/edit/${item.id}`);
    },

    openConfirmation(shops) {
      confirmation.dialog = true;
      this.$confirm(
        "Do you want to " + (shops.is_active ? "Archive" : "Activate  ") + "?"
      ).then((res) => {
        if (res) {
          this.ArchiveOrActiveShop(shops);
        }
      });
    },
    ArchiveOrActiveShop(shops) {
      this.$store
        .dispatch("shop/ArchiveOrActiceShop", shops.id)
        .then((res) => {
          shops.is_active = !shops.is_active;

          const msg = shops.is_active ? "activated" : "archived";

          this.$toast.success("Successfully  " + msg);
        })
        .catch((err) => {
          this.isLoading = false;
          this.messages = err.data.title;
        });
    },

    getStatusColor(status) {
      return status ? "green" : "gray";
    },
    AddShop() {
      this.$router.push(`/shop/add`);
    },
    refreshData() {
      this.$refs.refer.refreshData();
    },
    setResponseData(shop) {
      let self = this;
      self.shops = [];
      shop.forEach((element) => {
        element.contact = element.contact == null ? [] : [element.contact];
        element.address = element.address == null ? [] : [element.address];
        self.shops.push(element);
      });

      // this.warehouses = shop;

      // this.contacts= contacts.map(i=>{push(shop.contact)});
      // this.addresses= addresses.push(shop.address);
    },
  },
  mounted: function () {
    this.refreshData();
    // this.GetShopSingle();
  },
};
</script>

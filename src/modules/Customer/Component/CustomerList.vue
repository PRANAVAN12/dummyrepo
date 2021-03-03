<template>
  <div>
    <PageTitle
      title="Customers"
      :btnCreate="true"
      :createRoute="'customer/add'"
      :permission="'Customer Create'"
    />

    <v-container fluid class="lighten-12 content">
      <!-- Page Title -->
      <v-card class="lighten-12 card-content">
        <TableFilters
            :filters="['status', 'search','customerType']"
            v-model="filter"
            :columns="columns"
        >
        </TableFilters>
      </v-card>

      <v-card class="mt-2">
        <v-container fluid class="light gray lighten-12">
          <!-- Data Table -->
          <v-row>
            <v-card-text class="pa-0">
              <v-data-table
                  :items-per-page="paginationOptions.perPage"
                  :fixed-header="true"
                  :headers="headers"
                  :items="customer"
                  :single-expand="singleExpand"
                  :expanded.sync="expanded"
                  item-key="name"
                  show-expand
                  hide-default-footer
                   class="row-pointer"
                  @click:row="$router.push(`customer/${$event.id}`)"
              >
                <template v-slot:item.name="{ item }">
                  <v-list-item class="px-0">
                    <v-list-item-avatar color="primary">
                      <v-img v-if="item.image" :src="item.image"></v-img>
                      <span
                          v-else
                          class="white--text subtitle-2 text-uppercase"
                      >
                        {{ item.name.charAt(0) }}
                      </span>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>{{
                          item.name
                        }}</v-list-item-title>

                    </v-list-item-content>
                  </v-list-item>
                </template>
                <template v-slot:no-data>
                  <div class="mt-16 container justify-center item-center">
                    <img
                        style="height: 200px"
                        src="../../../assets/img/no-result.jpg"
                    />
                  </div>
                </template>
                <template v-slot:item.reference_number="{ item }">
                  <CopyTableCell :text="item.reference_number"></CopyTableCell>
                </template>
                <!-- {{headers}}-headers
              {{item}}-item-->
                <template v-slot:expanded-item="{ headers, item }">
                  <td :colspan="headers.length" class="px-5 py-2">
                    <template v-if="item.contact.length">
                      <!-- <v-subheader class="sub-header">Contact</v-subheader> -->
                      <v-card class="pa-0 mt-2 mb-2">
                        <v-card-title>Contact </v-card-title>
                        <v-data-table
                            single-expand="'true'"
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
                            :items-per-page="paginationOptions.perPage"
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
                      <v-card>
                        <v-container fluid> No Contacts </v-container>
                      </v-card></template
                    >
                  </td>
                </template>

                <template v-slot:footer>
                  <pagination
                      @paginationOptions="setPaginationOptions"
                      @response="setResponseData"
                      url="customers"
                      :filter="filter"
                      ref="pagination"

                  />
                </template>

                <template v-slot:item.is_active="{ item }">
                  <v-chip
                      :x-small="true"
                      class="ma-2"
                      label
                      text-color="white"
                      :color="getStatusColor(item.is_active)"
                      dark
                  >{{ item.is_active ? "Active" : "Archieved" }}</v-chip
                  >
                </template>
                <template v-slot:item.created_at="{ item }">
                  {{ item.created_at | formatDate }}
                </template>

                <!-- Action -->
                <template v-slot:item.action="{ item }">
                  <list-menu
                      feature="customer"
                      :item="item"
                      viewPermission="Customer Show"
                      editPermission="Customer Edit"
                      softDeletePermission="Customer Soft Delete"
                      @refreshList="refreshData"
                  ></list-menu>
                </template>
              </v-data-table>
            </v-card-text>
          </v-row>
        </v-container>
      </v-card>
      <!-- </v-card> -->
      <div class="d-flex justify-center align-center"></div>
    </v-container>
  </div>
</template>

<script>
import { required, email, max } from "vee-validate/dist/rules";
import pagination from "../../shared/components/pagination";
import confirmation from "../../shared/components/confirmation";
import { customer, Customer } from "../../../models/Customer";
import { CustomerViewModel } from "../../../models/View Models/CustomerViewModel";

import _ from "lodash";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import TableFilters from "@/components/base/TableFilters";
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

export default {
  data: () => ({
    paginationOptions: {},
    expanded: [],
    singleExpand: false,
    pagination1: {
      descending: true,
      page: 1,
      rowsPerPage: 2,

      sortBy: "fat",
      totalItems: 0,
      rowsPerPageItems: [1, 2, 4, 8, 16],
    },

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
        disabled: false,
        align: "left",
        width: "16.5%",
      },
      {
        text: "Type",
        value: "customerType.name",
        show: true,
        align: "left",
        disabled: false,
        width: "16.5%",
      },
      {
        text: "Contact",
        value: "contact[0].phone",
        show: true,
        disabled: true,
        width: "16.5%",
        align: "left",
      },
      // {
      //   text: "Group",
      //   value: "customerGroup.name",
      //   show: true,
      //   align: "left",
      //   disabled: false,
      //   width: "16.5%",
      // },
      {
        text: "Created at",
        value: "created_at",
        show: true,
        disabled: false,
        align: "left",
        width: "16.5%",
      },
      {
        text: "Status",
        value: "is_active",
        show: true,
        disabled: false,
        align: "center",
        width: "16.5%",
      },
      {
        text: "Actions",
        value: "action",
        show: true,
        disabled: true,
        align: "center",
        width: "16.5%",
      },
    ],
    contactHeaders: [
      { text: "Phone", value: "phone", align: "left" },
      { text: "Telephone", value: "telephone", align: "left" },
      {
        text: "Email",
        value: "email",
        show: true,
        disabled: false,
        align: "left",
      },
    ],
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
        show: true,
        align: "left",
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
    customer: [],
    filter: {
      name: "",
      search: "",
      status: "",
    },
  }),
  components: {
    TableFilters,
    ValidationProvider,
    ValidationObserver,
    pagination,
  },

  methods: {
    setPaginationOptions(data) {
      this.paginationOptions = data;
    },
    refreshData() {
      this.$refs.pagination.refreshData();
    },

    setResponseData(customer) {
      this.customer = customer.map((u, i, arr) => {
        u.index = i + 1;
        return new CustomerViewModel(u);
      });
    },

    getStatusColor(status) {
      return status ? "green" : "gray";
    },

    clearFilter() {
      this.filter = {};
    },
  },
  computed: {
    // Filter - return selected table fields
    headers: function () {
      return this.columns.filter((item) => item.show == true);
    },
  },
};
</script>

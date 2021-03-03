<template>
  <div>
    <PageTitle
      title="Suppliers"
      :btnCreate="true"
      :createRoute="'/supplier/add'"
      :permission="'Supplier Create'"
    />
    <v-container fluid class="lighten-12 content">
      <v-card class="lighten-12 card-content mb-2">
        <TableFilters
          :filters="['status', 'search', 'product']"
          v-model="filter"
          :columns="columns"
        >
        </TableFilters>
      </v-card>

      <v-card class="lighten-12 mt-2">
        <v-container fluid class="light gray lighten-12">
          <v-row>
            <v-card-text class="pa-0">
              <v-data-table
                :items-per-page="paginationOptions.perPage"
                :headers="headers"
                :items="suppliers"
                :single-expand="singleExpand"
                :expanded.sync="expanded"
                item-key="name"
                show-expand
                hide-default-footer
                @click:row="$router.push(`supplier/${$event.id}`)"
                class="row-pointer"
              >
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
                <template v-slot:expanded-item="{ headers, item }">
                  <td :colspan="headers.length" class="px-5">
                    <template v-if="item.contacts.length">
                      <v-card class="pa-0 mt-2 mb-2">
                        <v-card-title>Contact </v-card-title>
                        <v-data-table
                          single-expand="'true'"
                          hide-default-footer="true"
                          :headers="contactHeaders"
                          :items="item.contacts"
                          class="sub-table"
                        ></v-data-table>
                      </v-card>
                    </template>
                    <template v-if="item.addresses.length">
                      <v-card class="pa-0 mt-2 mb-2">
                        <v-card-title>Address </v-card-title>
                        <v-data-table
                          single-expand="'true'"
                          hide-default-footer="true"
                          :headers="addressHeaders"
                          :items="item.addresses"
                          class="sub-table"
                        ></v-data-table>
                      </v-card>
                    </template>
                    <template
                      v-if="
                        item.contacts.length == 0 && item.addresses.length == 0
                      "
                    >
                      <v-card class="pa-0 mt-2 mb-2">
                        <v-container fluid>No Contacts</v-container></v-card
                      ></template
                    >
                  </td>
                </template>
                <!-- Status -->
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

                <!-- Action -->
                <template v-slot:item.action="{ item }">
                  <list-menu
                    feature="supplier"
                    :item="item"
                    viewPermission="Supplier Show"
                    editPermission="Supplier Edit"
                    softDeletePermission="Supplier Soft Delete"
                    @refreshList="refreshData"
                  ></list-menu>
                </template>
                <template v-slot:footer>
                  <pagination
                    @paginationOptions="setPaginationOptions"
                    @response="setResponseData"
                    url="supplier"
                    :filter="filter"
                    ref="pagination"
                  />
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
import pagination from "../../shared/components/pagination.vue";
import confirmation from "../../shared/components/confirmation";
import { SupplierListViewModel } from "../../../models/View Models/Supplier";
import { Product } from "../../../models/Product";
import ProductAutoCompleteComponent from "@/components/base/ProductAutoCompleteComponent";
import TableFilters from "@/components/base/TableFilters";

export default {
  components: {
    TableFilters,
    ProductAutoCompleteComponent,
    pagination,
  },
  data() {
    return {
      paginationOptions: {},
      expanded: [],
      singleExpand: false,
      isLoading: true,
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
      columns: [
        {
          text: "Name",
          value: "name",
          show: true,
          align: "left",
          disabled: false,
        },
        {
          text: "Reference Number",
          value: "reference_number",
          show: true,
          align: "left",
          disabled: false,
          width: "25%",
        },
        {
          text: "Status",
          value: "is_active",
          show: true,
          disabled: false,
          align: "center",
          width: "25%",
        },
        {
          text: "Actions",
          value: "action",
          show: true,
          disabled: false,
          align: "center",
          width: "25%",
        },
      ],
      contactHeaders: [
        { text: "Name", value: "full_name", align: "left" },
        { text: "Phone", value: "phone", align: "left" },
        { text: "Telephone", value: "telephone", align: "left" },
        {
          text: "Email",
          value: "email",
          align: "left",
          show: true,
          disabled: false,
        },
      ],
      addressHeaders: [
        {
          text: "Address Line1",
          align: "left",
          value: "address_line1",
          show: true,
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
          show: true,
          align: "left",
          disabled: false,
        },
      ],
      suppliers: [],
      newSupplier: { name: "", id: "", is_active: "" },
      filter: {
        name: "",
        search: "",
        status: "",
      },
      searchProduct: null,
      products: [],
    };
  },
  methods: {
    setPaginationOptions(data) {
      this.paginationOptions = data;
    },
    clearFilter() {
      this.filter = {};
    },
    refreshData() {
      this.$refs.pagination.refreshData();
    },
    AddSupplier() {
      this.$router.push({ path: "/supplier/add" });
    },

    setResponseData(supplier) {
      this.suppliers = supplier.map((u, i, arr) => {
        u.index = i + 1;
        return new SupplierListViewModel(u);
      });
    },
    getStatusColor(status) {
      return status ? "green" : "gray";
    },
  },
  computed: {
    // Filter - return selected table fields
    headers: function () {
      return this.columns.filter((item) => item.show == true);
    },
  },
  created() {},
};
</script>
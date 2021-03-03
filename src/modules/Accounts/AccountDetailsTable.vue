<!-- *************************************************************************
	TEMPLATE
	************************************************************************* -->
<template>
  <div>
    <!-- <v-container fluid class="lighten-12 container"> -->
    <v-row>
      <v-col cols="12 py-0">
        <v-card>
          <v-container fluid>
            <v-row>
              <v-col>
                <!-- Filters -->
                <v-row class="ma-0 align-right sub-section">
                  <TableFilters
                    :filters="['search']"
                    v-model="filter"
                    :columns="columns"
                  ></TableFilters>
                  <ImportExportMenu></ImportExportMenu>
                </v-row>
                <!-- Data table -->
                <v-row>
                  <v-col cols="12">
                    <v-data-table
                      :items-per-page="paginationOptions.perPage"
                      :fixed-header="true"
                      :headers="headers"
                      :items="supplierProducts"
                      :loading="loading"
                      loading-text="Loading... Please wait"
                      hide-default-footer
                    >
                      <template v-slot:footer="{}">
                        <paginationComponent
                          @paginationOptions="setPaginationOptions"
                          :url="'accounts/' + typeAccount"
                          :filter="filter"
                          @response="receiveproductResponse"
                          ref="pagination"
                        />
                      </template>

                      <template v-slot:item.action="{ item }">
                        <v-menu :key="text" offset-y>
                          <template v-slot:activator="{ attrs, on }">
                            <v-icon v-bind="attrs" v-on="on"
                              >mdi-dots-vertical</v-icon
                            >
                          </template>
                          <v-list class="actions">
                            <v-list-item @click="openConfirmation(item)" link>
                              <span>
                                <v-icon v-bind="attrs" v-on="on"
                                  >mdi-archive</v-icon
                                >Remove
                              </span>
                            </v-list-item>
                            <v-list-item :to="'/product/' + item.id" link>
                              <span>
                                <v-icon v-bind="attrs" v-on="on">mdi-eye</v-icon
                                >View
                              </span>
                            </v-list-item>
                            <v-list-item :to="'/product/edit/' + item.id" link>
                              <span>
                                <v-icon v-bind="attrs" v-on="on"
                                  >mdi-pencil-box-outline</v-icon
                                >Edit
                              </span>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </template>

                      <template v-slot:item.is_active="{ item }">
                        <v-chip
                          x-small="true"
                          class="ma-2"
                          label
                          text-color="white"
                          :color="getStatusColor(item.status)"
                          dark
                          >{{ item.status }}</v-chip
                        >
                      </template>
                    </v-data-table>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <!-- </v-container> -->
  </div>
</template>

<script>
//COMPONENTS
import _ from "lodash";
import paginationComponent from "../shared/components/pagination";
import TableFilters from "@/components/base/TableFilters";
export default {
  data() {
    return {
      paginationOptions: {},
      errors: [],
      loading: true,
      selectedProduct: null,
      searchProduct: null,
      productLists: [],
      columns: [
        {
          text: "Account Number",
          value: "account_number",
          show: true,
          disabled: true,
          width: "20%",
        },
        {
          text: "Account  Type",
          value: "account_type",
          show: true,
          disabled: false,
          width: "20%",
        },
        {
          text: "Nick Name",
          value: "nick_name",
          show: true,
          disabled: false,
          width: "30%",
        },
        {
          text: "Actual Balance",
          value: "actual_balance",
          show: true,
          disabled: false,
          width: "15%",
        },
        {
          text: "Available Balance",
          value: "available_balance",
          show: true,
          disabled: false,
          width: "15%",
        },
        // {
        //   text: "Actions",
        //   value: "action",
        //   show: true,
        //   disabled: true,
        //   align: "center",
        //   width: "10%",
        // },
      ],
      products: [],
      supplierProducts: [],
      filter: {
        search: "",
      },
      messages: "",
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
    receiveproductResponse(products) {
      this.supplierProducts = products;
      this.loading = false;
    },

    getStatusColor(status) {
      return status == "Active" ? "green" : "gray";
    },
    getProductsByQuery(selectedItems = null, query = "") {
      this.projectsLoading = true;
      let except = [];
      this.supplierProducts.map((element) => {
        except.push(element.id);
      });
      this.$store
        .dispatch("product/GetProduct", {
          except: except,
          query: query,
        })
        .then((res) => {
          this.productLists = res.map((u, i, arr) => {
            u.index = i + 1;
            return new Product().toViewModel(u);
          });

          this.isLoading = false;
          this.projectsLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.projectsLoading = false;
          this.messages = err.data.title;
        });
    },
    async AssignProductToSupplier() {
      debugger;
      console.log(this.selectedProduct);
      if (this.selectedProduct != null) {
        const credentials = new Object();
        credentials.products = [this.selectedProduct];
        credentials.supplierId = this.$route.params.id;
        this.AssignSupplier(credentials);
      }
    },
    AssignSupplier(credentials) {
      this.$store
        .dispatch(`product/AssignProductToSupplier`, credentials)
        .then((res) => {
          this.$emit("aftersave");
          this.isLoading = false;
          this.$toast.success("Product assigned successfully");
          this.$refs.pagination.refreshData();
          this.show = false;
          this.selectedProduct = null;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$toast.error("Product assigned failed");
          this.show = false;
          this.payment = new Payment();
        });
    },

    openConfirmation(item) {
      confirmation.dialog = true;
      this.$confirm("Do you want to Remove ?").then((res) => {
        if (res) {
          this.RemoveProductFromSupplier(item);
        }
      });
    },
    RemoveProductFromSupplier(item) {
      const credentials = new Object();
      credentials.products = [item.id];
      credentials.supplierId = this.$route.params.id;
      this.$store
        .dispatch(`product/RemoveProductFromSupplier`, credentials)
        .then((res) => {
          this.refreshData();
          this.selectedSupplier = null;
          this.isLoading = false;
          this.$toast.success("Supplier removed successfully");
        })
        .catch((err) => {
          this.isLoading = false;
          this.$toast.error("Supplier remove failed");
          this.payment = new Payment();
        });
    },
  },

  created() {
    this.SetSuplierId();
    this.refreshData();
  },
  props: {
    typeAccount: {
      type: String,
      default: "",
    },
  },
  watch: {},

  components: {
    paginationComponent,
    TableFilters,
  },
  computed: {
    // Filter - return selected table fields
    headers: function () {
      return this.columns.filter((item) => item.show == true);
    },
  },
};
</script>

<template>
  <div>
    <!-- <v-container fluid class="lighten-12 container"> -->
    <v-row>
      <v-col cols="12 py-0">
        <v-card>
          <!-- <v-card-title class="d-flex justify-space-between">
              Supplier List
            </v-card-title> -->
          <v-container fluid>
            <!-- Filters -->
            <v-row class="ma-0 align-right">
              <v-col cols="12" sm="6" lg="9" md="6" class=""> </v-col>
              <v-col
                cols="12"
                sm="6"
                lg="3"
                md="6"
                class="px-0 d-flex justify-space-between"
              >
                <v-combobox
                  hide-details="auto"
                  hide-no-data
                  v-model="selectedSupplier"
                  @change="searchSuppliers = ''"
                  @input="GetSuppliers(searchSuppliers)"
                  :items="suppliers"
                  clearable
                  :search-input.sync="searchSuppliers"
                  outlined
                  item-text="name"
                  item-value="id"
                  label="Select Suppliers"
                  multiple
                  small-chips
                >
                </v-combobox>
                <v-btn
                  depressed
                  small
                  height="32"
                  class="btn_blue w-100 ml-2"
                  @click="AssignSupplierToProduct()"
                >
                  update
                </v-btn>
              </v-col>
            </v-row>

            <v-row class="ma-0 align-right sub-section">
              <TableFilters
                :filters="['search', 'dateRange']"
                v-model="filter"
                :columns="columns"
              ></TableFilters>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-data-table
                  :items-per-page="paginationOptions.perPage"
                  :headers="columns"
                  :items="ProductSuppliers"
                  item-key="id"
                  hide-default-footer
                >
                  <!--  -->
                  <!-- No -->
                  <template v-slot:item.no>
                    <v-icon>mdi-vuetify</v-icon>
                  </template>

                  <!-- Status -->
                  <template v-slot:item.status="{ item }">
                    <v-chip
                      :x-small="true"
                      class="ma-2"
                      label
                      text-color="white"
                      :color="getStatusColor(item.status)"
                      dark
                      >{{ item.status }}
                    </v-chip>
                  </template>

                  <!-- Action -->
                  <template v-slot:item.action="{ item }">
                    <v-menu offset-y transition="scroll-y-transition">
                      <template v-slot:activator="{ attrs, on }">
                        <v-icon v-bind="attrs" v-on="on"
                          >mdi-dots-vertical
                        </v-icon>
                      </template>
                      <v-list class="actions">
                        <v-list-item @click="openConfirmation(item)">
                          <span>
                            <v-icon v-bind="attrs" v-on="on">mdi-archive</v-icon
                            >Remove
                          </span>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </template>
                </v-data-table>
                <paginationComponent
                  @paginationOptions="setPaginationOptions"
                  :url="`${module}/${id}/suppliers`"
                  @response="receiveSuppliersResponse"
                  ref="supplierdetails"
                  :filter="filter"
                />
              </v-col>
            </v-row>
            <!-- Data table -->

            <v-row> </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <!-- </v-container> -->
  </div>
</template>
<script>
import _ from "lodash";
import { SupplierListViewModel } from "@/models/View Models/Supplier";
import confirmation from "../../shared/components/confirmation";
import TableFilters from "@/components/base/TableFilters";
import paginationComponent from "../../shared/components/pagination.vue";
import { ProductViewModel } from "../../../models/View Models/ProductViewModel";
export default {
  data: () => ({
    paginationOptions: {},
    searchSuppliers: null,
    selectedSupplier: [],
    suppliers: [],

    columns: [
      {
        text: "Reference no",
        value: "reference_number",
        show: true,
        disabled: true,
        align: "left",
        width: "10%",
      },
      {
        text: "Name",
        value: "name",
        show: true,
        disabled: false,
        align: "left",
        width: "10%",
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
    filter: {
      search: "",
      reference_number: "",
      start: "",
      end: "",
      status: "",

      supplier: "",
    },
    date_range: [],
    ProductSuppliers: [],
    productDetails: [],
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
  components: { paginationComponent, TableFilters },
  created() {},
  computed: {
    dateRangeText() {
      this.filter.start = this.date_range[0];
      this.filter.end = this.date_range[1];
      return this.date_range.join(" ~ ");
    },
    headers: function () {
      return this.columns.filter((item) => item.show == true);
    },
  },
  watch: {
    searchPurchaseTabSuppliers(value) {
      if (!value) {
        return;
      }
      this.GetPurchaseTabSuppliers(value);
    },
    searchSuppliers(value) {
      if (!value) {
        return;
      }
      this.GetSuppliers(value);
    },
  },

  methods: {
    setPaginationOptions(data) {
      this.paginationOptions = data;
    },
    refreshData() {
      this.$refs.supplierdetails.refreshData();
    },
    async AssignSupplierToProduct() {
      let credentials = new Object();
      credentials.suppliers = [];
      this.selectedSupplier.map((p) => {
        credentials.suppliers.push(p.id);
      });
      credentials.productId = this.$route.params.id;
      this.AssignProduct(credentials);
    },
    AssignProduct(credentials) {
      this.$store
        .dispatch(`product/AssignSupplierToProducts`, credentials)
        .then((res) => {
          this.refreshData();
          this.selectedSupplier = null;
          this.isLoading = false;
          this.$toast.success("Supplier assigned successfully");
          console.log("REFEEEE");

          //   this.$refs.supplierdetails[0].refreshData();
        })
        .catch((err) => {
          this.isLoading = false;
          this.$toast.error("Supplier assigned failed");

          this.payment = new Payment();
        });
    },
    openConfirmation(item) {
      debugger;
      confirmation.dialog = true;
      debugger;
      this.$confirm("Do you want to Remove ?").then((res) => {
        if (res) {
          debugger;
          this.removeSupplier(item);
        }
      });
    },
    async removeSupplier(item) {
      const credentials = new Object();
      credentials.suppliers = [item.id];
      credentials.productId = this.$route.params.id;

      this.removeSupplierFromProduct(credentials);
    },

    removeSupplierFromProduct(credentials) {
      this.$store
        .dispatch(`product/RemoveSupplierFromProduct`, credentials)
        .then((res) => {
          this.refreshData();
          debugger;
          let index = this.ProductSuppliers.findIndex(
            (p) => p.id == credentials.suppliers[0]
          );
          if (index != -1) {
            this.ProductSuppliers.splice(index, 1);
          }
          this.selectedSupplier = [];
          this.GetSuppliers();

          this.isLoading = false;
          this.$toast.success("Supplier removed successfully");
        })
        .catch((err) => {
          this.isLoading = false;
          this.$toast.error("Supplier remove failed");
          this.payment = new Payment();
        });
    },
    GetProductDetails() {
      let productId = this.id;
      this.$store
        .dispatch("product/GetProductById", productId)
        .then((res) => {
          this.Product = res.data;
          this.productDetails = new ProductViewModel(res.data);
          // this.productDetails.suppliers.forEach((supplier) => {
          //   this.selectedSupplier.push(supplier.id);
          // });
          this.productUnits = this.productDetails.units;
        })
        .catch((err) => {
          this.messages.push(err.data.title);
        });
    },
    getStatusColor(status) {
      return status == true ? "gray" : "green";
    },
    receiveSuppliersResponse(supplierData) {
      this.ProductSuppliers = supplierData;
      this.GetSuppliers();
    },

    GetSuppliers(query = "") {
      this.searchSuppliers = null;
      let except = [];
      this.ProductSuppliers.forEach((supplier) => {
        except.push(supplier.id);
      });
      if (this.selectedSupplier.length > 0) {
        this.selectedSupplier.forEach((supplier) => {
          except.push(supplier.id);
        });
      }
      this.$store
        .dispatch("supplier/GetSupplierSearch", {
          query: query,
          except: except,
          status: "active",
        })
        .then((res) => {
          this.suppliers = res;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.messages = err.data.title;
        });
    },
  },
};
</script>

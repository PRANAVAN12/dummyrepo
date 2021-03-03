<template>
  <div>
    <v-row>
      <v-col cols="12 py-0">
        <v-card>
          <v-container fluid>
            <v-row class="ma-0 align-right">
              <v-col cols="12" sm="12" md="12" lg="9" class=""> </v-col>
              <v-col
                cols="12"
                sm="12"
                md="12"
                lg="3"
                class="px-0 d-flex justify-space-between"
              >
                <v-autocomplete
                  v-model="selectedshop"
                  :filter="filter"
                  item-text="name"
                  item-value="id"
                  :hide-no-data="!searchshop"
                  @input="getshopsByQuery(selectedshop)"
                  :items="shopLists"
                  :search-input.sync="searchshop"
                  outlined
                  label="Select warehouses"
                  small-chips
                >
                </v-autocomplete>
                <v-btn
                  depressed
                  small
                  height="32"
                  class="btn_blue w-100 mx-2"
                  @click="AssignshopTowarehouse()"
                >
                  Assign shop
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <!-- Filters -->
                <v-row class="ma-0 align-right sub-section">
                  <TableFilters
                    :filters="['status', 'search']"
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
                      :items="warehouseshops"
                      :loading="loading"
                      loading-text="Loading... Please wait"
                      hide-default-footer
                    >
                      <template v-slot:footer="{}">
                        <paginationComponent
                          @paginationOptions="setPaginationOptions"
                          :url="'ware-houses/' + WarehouseId + '/shops'"
                          :filter="filter"
                          @response="receiveshopResponse"
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
                          </v-list>
                        </v-menu>
                      </template>

                      <template v-slot:item.is_active="{ item }">
                        <v-chip
                          x-small="true"
                          class="ma-2"
                          label
                          text-color="white"
                          :color="getStatusColor(item.is_active)"
                          dark
                        >
                          {{ item.is_active ? "Active" : "Archieve" }}</v-chip
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
  </div>
</template>

<script>
import paginationComponent from "../../../../shared/components/pagination.vue";
import TableFilters from "@/components/base/TableFilters";
import confirmation from "../../../../shared/components/confirmation";
export default {
  data() {
    return {
      paginationOptions: {},
      loading: false,
      selectedshop: null,

      searchshop: null,

      shopLists: [],
      columns: [
        {
          text: "Name",
          value: "name",
          show: true,
          disabled: false,
          align: "left",
        },

        {
          text: "Status",
          value: "is_active",
          show: true,
          disabled: false,
          align: "center",
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
      shops: [],
      warehouseshops: [],
      filter: {
        status: "",
        search: "",
      },
      messages: "",
    };
  },
  props: {
    WarehouseId: {
      type: Number,
      default: null,
    },
  },

  methods: {
    setPaginationOptions(data) {
      this.paginationOptions = data;
    },
    openConfirmation(item) {
      confirmation.dialog = true;
      this.$confirm("Do you want to Remove ?").then((res) => {
        if (res) {
          this.RemoveshopFromwarehouse(item);
        }
      });
    },
    clearFilter() {
      this.filter = {};
    },
    refreshData() {
      this.$refs.pagination.refreshData();
    },
    receiveshopResponse(warehouses) {
      this.warehouseshops = shops;
      this.getshopsByQuery(null);

      this.loading = false;
    },

    getStatusColor(status) {
      return status ? "green" : "gray";
    },
    getshopsByQuery(selectedItems = null, query = "") {
      debugger;
      this.projectsLoading = true;
      let except = [];

      this.$store
        .dispatch("shop/GetShop", {
          except: except,
          query: query,
        })
        .then((res) => {
          debugger;
          this.shopLists = res;

          this.isLoading = false;
          this.projectsLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.projectsLoading = false;
          this.messages = err.data.title;
        });
    },
    async AssignshopTowarehouse() {
      const credentials = new Object();
      credentials.shops = [this.selectedshop];
      credentials.WarehouseId = this.$route.params.id;
      this.Assignwarehouse(credentials);
    },
    Assignwarehouse(credentials) {
      debugger;
      this.$store
        .dispatch(`shop/AssignShopToWarehouse`, credentials)
        .then((res) => {
          this.$emit("aftersave");
          this.isLoading = false;
          this.$toast.success("Shop assigned successfully");
          this.$refs.pagination.refreshData();
          this.show = false;
          this.selectedshop = null;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$toast.error("Shop assigned failed");
          this.show = false;
        });
    },
    RemoveshopFromwarehouse(item) {
      debugger;
      const credentials = new Object();
      credentials;
      credentials.shops = [item.id];
      credentials.WarehouseId = this.$route.params.id;
      this.$store
        .dispatch(`shop/RemoveShopFromWarehouse`, credentials)
        .then((res) => {
          debugger;
          this.refreshData();
          this.selectedwarehouse = null;
          this.isLoading = false;
          this.$toast.success(" Shop removed successfully");
        })
        .catch((err) => {
          this.isLoading = false;
          this.$toast.error(" Shop remove failed");
        });
    },
  },

  created() {
    this.refreshData();
  },
  watch: {
    searchshop(value) {
      if (!value) {
        return;
      }
      this.getshopsByQuery(this.searchshop, value);
    },
  },

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

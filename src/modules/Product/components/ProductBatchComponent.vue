<template>
  <div>
    <v-row>
      <v-col cols="12 py-0">
        <v-container fluid>
          <v-row>
            <v-col cols="12" class="d-flex justify-end">
              <permission-control permissionName="Batch Create">
                <v-btn
                  depressed
                  small
                  height="32"
                  class="btn_blue w-100"
                  @click.stop="OpenModal()"
                >
                  <v-icon class="icon_small ma-2">mdi-plus </v-icon>
                  Add
                </v-btn>
              </permission-control>
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
              </v-row>
              <!-- Data table -->
              <v-row>
                <!-- {{productDetails}} -->
                <!-- {{ProductBatches}} -->
                <v-col cols="12">
                  <v-data-table
                    :items-per-page="paginationOptions.perPage"
                    :headers="columns"
                    :items="productBatchList"
                    item-key="id"
                    hide-default-footer
                    class="row-pointer"
                    @click:row="
                      $router.push(`${$route.params.id}/batch/${$event.id}`)
                    "
                  >
                    <!-- Manufactured Date -->

                    <template
                      v-slot:item.manufacureDate="{ item }"
                      v-slot="{ errors }"
                      name="value"
                      rules="numeric"
                      >{{ item.manufacureDate | formatDate }}</template
                    >

                    <!-- Expired Date -->

                    <template
                      v-slot:item.expiryDate="{ item }"
                      v-slot="{ errors }"
                      name="value"
                      rules="numeric"
                      >{{ item.expiryDate | formatDate }}</template
                    >

                    <!-- No -->
                    <template v-slot:item.no>
                      <v-icon>mdi-vuetify</v-icon>
                    </template>

                    <template v-slot:item.manufacureDate="{ item }">
                      {{ item.manufacureDate | formatDate }}
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
                    <template v-slot:footer="{}">
                      <paginationComponent
                        @paginationOptions="setPaginationOptions"
                        :url="`${module}/${id}/batches`"
                        @response="receiveBatchResponse"
                        ref="pagination"
                        :filter="filter"
                      />
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
                          <v-list-item
                            v-if="item.is_editable"
                            @click="openConfirmation(item)"
                          >
                            <span>
                              <v-icon v-bind="attrs" v-on="on"
                                >mdi-archive</v-icon
                              >
                              {{
                                item.status == "Active" ? "Archive" : "Active"
                              }}</span
                            >
                          </v-list-item>
                          <v-list-item
                            @click="editBatch(item)"
                          >
                            <span>
                              <v-icon v-bind="attrs" v-on="on"
                                >mdi-pencil-box-outline</v-icon
                              >
                              Edit</span
                            >
                          </v-list-item>
                          <v-list-item @click="viewBatch(item)">
                            <span>
                              <v-icon v-bind="attrs" v-on="on"
                                >mdi-pencil-box-outline</v-icon
                              >
                              View</span
                            >
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <BatchForm
      ref="batchForm"
      @conform="refreshBatches()"
      :visible="showScheduleForm"
      :productUnits="productUnits"
      :productbatch="ProductBatches"
      :product="productDetails"
    />
    <!-- </v-container> -->
  </div>
</template>
<script>
import { formatDate } from "@/utils/datehelper";
import BatchForm from "./ProductBatchModal";
import { ProductBatch } from "../../../models/ProductBatch";
import { ProductViewModel } from "../../../models/View Models/ProductViewModel";
import _ from "lodash";
import store from "../../../store/store";
import TableFilters from "@/components/base/TableFilters";
import paginationComponent from "../../shared/components/pagination.vue";
import { ProductBatchViewModel } from "../../../models/View Models/ProductBatchViewModel";
import confirmation from "@/modules/shared/components/confirmation";
export default {
  data: () => ({
    paginationOptions: {},
    productDetails: [],
    ProductBatches: [],
    productBatchList: [],
    GetSingleBatch: null,
    productUnits: [],
    selectedSuppliers: [],
    showScheduleForm: false,
    menu: false,
    columns: [
      {
        text: "Batch",
        value: "name",
        align: "left",
        show: true,
        disabled: false,
      },
      {
        text: "Manufacture date",
        value: "manufacureDate",
        align: "left",
        show: true,
        disabled: false,
      },
      {
        text: "Expirery date",
        value: "expiryDate",
        align: "left",
        show: true,
        disabled: false,
      },
      {
        text: "Status",
        value: "status",
        align: "center",
        width: "15%",
        show: true,
        disabled: false,
      },
      {
        text: "Actions",
        value: "action",
        show: true,
        disabled: false,
        width: "10%",
      },
    ],
    filter: {
      search: "",
      start: "",
      end: "",
      status: "",
    },
    date_range: [],
  }),

  created() {
    this.GetProductDetails();
  },
  components: { paginationComponent, BatchForm, TableFilters },
  filters: {
    formatDate: function (value) {
      return formatDate(value);
    },
  },
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
  computed: {
    headers: function () {
      return this.columns.filter((item) => item.show == true);
    },
  },
  methods: {
    setPaginationOptions(data) {
      this.paginationOptions = data;
    },
    refreshBatches() {
      this.GetProductDetails();
      this.$refs.pagination.refreshData();
    },
    getStatusColor(status) {
      return status == "Archived" ? "gray" : "green";
    },
    // Batch Data Received from pagination component emit function
    receiveBatchResponse(batchData) {
      debugger;

      console.log("BATCHHHH", batchData);

      this.productBatchList = batchData.map((u, i, arr) => {
        u.index = i + 1;
        return new ProductBatchViewModel(u);
      });
    },
    refreshData() {
      if (this.$refs.pagination) {
        this.$refs.pagination.forEach((item) => {
          item.refreshData();
        });
      }
    },
    openConfirmation(batch) {
      confirmation.dialog = true;
      this.$confirm(
        "Do you want to " +
          (batch.status ? "Archive  " : "Activate  ") +
          batch.name +
          "?"
      ).then((res) => {
        if (res) {
          this.ArchiveActiveBatch(batch);
        }
      });
    },
    ArchiveActiveBatch(batch) {
      this.$store
        .dispatch("product/ArchiveOrActiceProductBatch", {
          productId: this.id,
          batchId: batch.id,
        })
        .then((res) => {
          const msg = batch.status == "Active" ? "archive" : "active";
          this.refreshBatches();
          this.$toast.success("SuccessFully  " + msg);
        })
        .catch((err) => {
          this.isLoading = false;
          this.messages = err.data.title;
        });
    },
    async GetSingleBatchDetails(productId, batchId) {
      await this.$store
        .dispatch("product/GetProductBatch", {
          product_id: productId,
          batch_id: batchId,
        })
        .then((res) => {
          res.data.productUnits=this.productUnits;
          this.producBatch = new ProductBatchViewModel(res.data);
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.messages = err.data.title;
        });
    },
    GetProductDetails() {
      let productId = this.id;
      this.$store
        .dispatch("product/GetProductById", productId)
        .then((res) => {
          this.Product = res.data;
          this.productDetails = new ProductViewModel(res.data);
          this.productDetails.suppliers.forEach((supplier) => {
            this.selectedSuppliers.push(supplier.id);
          });
          debugger;
          this.productUnits = this.productDetails.units;
        })
        .catch((err) => {
          this.messages.push(err.data.title);
        });
    },
    OpenModal() {
      this.ProductBatches = new ProductBatch();
      this.$refs.batchForm.openModal();

      this.productUnits = this.productDetails.units;

      if (store.state.sitesetting && store.state.sitesetting.siteSettings) {
        this.productUnits.map((productUnit) => {
          productUnit.profit_margin_percentage =
            store.state.sitesetting.siteSettings.profit_margin_percentage;
        });
      }
    },
    deleteBatch(item) {},
    clearFilter() {
      this.date_range = [];
    },
    async editBatch(batch) {
      await this.GetSingleBatchDetails(this.id, batch.id);
      this.ProductBatches = this.producBatch;
      this.productUnits = this.ProductBatches.unitPriceDetails;
      this.ProductBatches.isAdd = false;
      this.$refs.batchForm.openModal();
    },
    viewBatch(batch) {
      const id = this.$route.params.id;
      this.$router.push(`${id}/batch/${batch.id}`);
    },
  },
  filters: {
    hasName: function (value) {
      if (has(value, "name")) return value.name;
      else return "-";
    },
  },
};
</script>

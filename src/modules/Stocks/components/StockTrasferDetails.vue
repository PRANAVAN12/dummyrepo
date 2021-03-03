<template>
  <div>
    <PageTitle v-if="StockTransfer.status=='Pending'"
      title="Stock Transfer View"
      :backBtn="true"
      :editRoute="'/stock-transfer/'+ 'edit/' + $route.params.id "
      :permission="'Purchase Order Edit'"
       @onClickChangeStatus="onClickChangeStatus"
       :changeStatus="true"
    />
    <PageTitle v-if="StockTransfer.status!='Pending'"
        title="Stock Transfer View"
        :backBtn="true"

    />
    <v-container fluid class="lighten-12 container">
      <v-row>
        <v-col  cols="8" sm="8" md="8" lg="8">
          <v-card class="lighten-12">
            <v-card-title>Stock Transfer</v-card-title>
            <v-container fluid>
              <v-row> </v-row>
              <v-row>
                <v-col cols="6" sm="6" md="6" lg="6">
                  <h4>Reference number</h4></v-col
                >
                <v-col cols="6" xs="6" sm="6" md="6" lg="6"
                  ><v-chip label>
                    {{ StockTransfer.reference_number }}
                  </v-chip></v-col
                >
              </v-row>
              <v-row>
                <v-col cols="6" sm="6" md="6" lg="6"> <h4>Date</h4></v-col>
                <v-col cols="6" sm="6" md="6" lg="6"
                  ><v-chip label>
                    {{ StockTransfer.date | formatDate }}
                  </v-chip></v-col
                >
              </v-row>
              <v-row>
                <v-col cols="6" sm="6" md="6" lg="6"> <h4>Status</h4></v-col>
                <v-col cols="6" sm="6" md="6" lg="6">
                  <v-chip
                    label
                    text-color="white"
                    :color="getPurchaseOrderStatusColor(StockTransfer.status)"
                    dark
                  >
                    {{ StockTransfer.status ? StockTransfer.status : "----" }}
                  </v-chip>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" sm="6" md="6" lg="6">
                  <h4>From Warehouse</h4></v-col
                >
                <v-col cols="6" sm="6" md="6" lg="6"
                  ><v-chip label>
                    {{
                      StockTransfer.warehouse.name
                        ? StockTransfer.warehouse.name
                        : "----"
                    }}
                  </v-chip></v-col
                >
              </v-row>
              <v-row>
                <v-col cols="6" sm="6" md="6" lg="6"> <h4>To Shop</h4></v-col>
                <v-col cols="6" sm="6" md="6" lg="6"
                  ><v-chip label>
                    {{
                      StockTransfer.shop.name ? StockTransfer.shop.name : "----"
                    }}
                  </v-chip></v-col
                >
              </v-row>
            </v-container>
          </v-card>
        </v-col>

        <v-col  cols="4" sm="4" md="4" lg="4">
          <v-card class="lighten-12 " height="100%">
            <v-card-title class="d-flex justify-space-between" >Status Details  
<!--               
               <v-btn v-if="!StockTransfer.isUpdate && StockTransfer.status=='Pending'"
                                                                                       depressed
                                                                                       small
                                                                                       class="text-white btn_blue btn_medium w-100"
                                                                                       @click="changeStatus"
            >Edit</v-btn
            > -->
            </v-card-title>
            <v-container fluid>
              <v-row v-if="!StockTransfer.isUpdate">
                <v-col cols="6" sm="6" md="3" lg="3"><h4>Status</h4></v-col>
                <v-col cols="6" sm="6" md="6" lg="6"> <v-chip
                    label
                    text-color="white"
                    :color="getPurchaseOrderStatusColor(StockTransfer.status)"
                    dark
                >{{
                    StockTransfer.status ? StockTransfer.status : "----"
                  }}</v-chip
                >
                </v-col>

              </v-row>
              <v-row v-if="StockTransfer.isUpdate">
                <v-col cols="12"  sm="12" md="12" lg="12" >
                  <v-select
                      v-model="StockTransfer.statusChange"
                      :items="StockTransferStatus"
                      @input="StatusReasonErrorMessages=[]"
                      :error-messages="errors"
                      outlined
                      dense
                      label="Status"
                  />
                </v-col>
              </v-row>
              <v-row v-if="!StockTransfer.isUpdate">
                <v-col cols="6" sm="6" md="3" lg="3"><h4>Status Note</h4></v-col>
                <v-col cols="6" sm="6" md="3" lg="3"><v-chip>{{ StockTransfer.statusNote }}</v-chip></v-col>
              </v-row>

              <v-row v-if="StockTransfer.isUpdate">
                <v-col cols="12"  sm="12" md="12" lg="12" >
                  <v-textarea
                      hide-details="auto"
                      outlined
                      dense
                      rows="3"
                      @input="StatusReasonErrorMessages=[]"
                      :error-messages="StatusReasonErrorMessages"
                      v-model="StockTransfer.statusNoteChange"
                      label="Status Note"
                      required
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions v-if="StockTransfer.status=='Pending'">
              <v-spacer></v-spacer>
              <v-btn  v-if="StockTransfer.isUpdate"   depressed
                      small
                      @click="StockTransfer.isUpdate=false"
                      class="text-white  btn_medium w-80"> cancel</v-btn>

              <v-btn :disabled="StockTransfer.statusChange=='Pending'" v-if="StockTransfer.isUpdate"
                     depressed
                     small
                     class="text-white btn_blue btn_medium w-100"
                     @click="changeStatus"
              >Update</v-btn
              >

            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
          <v-card class="lighten-12">
            <v-card-title class="d-flex justify-space-between"
            >Transfered Product details
              <!-- <v-btn small class="text-white btn_gray w-100" v-print="printQr"
              >Print <v-icon right dark> mdi-printer </v-icon></v-btn
              > -->
            </v-card-title>
            <v-container fluid>
              <v-row>
                <v-col cols="12">
                  <v-data-table
                      items-per-page="15"
                      :fixed-header="true"
                      :headers="StockTransferHeaders"
                      @click:row="ExpandItem($event)"
                      :items="selectedProductsToTransfer"
                      :single-expand="singleExpand"
                      :expanded.sync="expanded"
                      hide-default-footer
                      dense
                      expand
                  >
                    <template
                        v-slot:item.data-table-expand="{
                        item,
                        isExpanded,
                        expand,
                      }"
                    >
                      <span
                          @click="ExpandItem($event)"
                          class="mdi mdi-chevron-double-down"
                      ></span>
                      <span
                          @click="ExpandItem($event)"
                          v-if="expanded.length > 0 && item.id == expanded[0].id"
                          class="mdi mdi-chevron-double-up"
                      ></span>
                    </template>
                    <template
                        v-slot:expanded-item="{ headers, item: childItem }"
                    >
                      <td :colspan="headers.length">
                        <v-card class="pa-0 mt-3 mb-3">
                          <v-data-table
                              dense
                              hide-default-footer
                              :items="unitDetails"
                              :headers="TransferItemUnitHeaders"
                              class="sub-table"
                          >
                            <v-progress-linear
                                v-show="progressBar"
                                slot="progress"
                                color="blue"
                                indeterminate
                            ></v-progress-linear>
                          </v-data-table>
                        </v-card>
                      </td>
                    </template>
                    <!-- Category -->
                    <template v-slot:item.category="{ item }">
                      {{
                        item.productCategory.name
                            ? item.productCategory.name
                            : "----"
                      }}
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="12">
          <v-card>
            <v-card-title>Note</v-card-title>

            <v-container fluid>
              <v-row>
                <v-col cols="12" sm="12" md="12" lg="12"
                  ><v-chip class="pa-0" label>
                    {{ StockTransfer.remarks ? StockTransfer.remarks : "----" }}
                  </v-chip>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
            <change-status
        :visible="visibleChangeStatusModal"
        :statuses="transferStatuses"
        :selectedStatus="StockTransfer.status"
        @onChangeStatus="onChangeStatus"
        @close="onCloseChangeStatus"
      ></change-status>
    </v-container>
  </div>
</template>

<script>
import ChangeStatus from "@/components/shared/ChangeStatus";
import FileUpload from "@/components/base/FileUpload";
import jsPDF from "jspdf";
import VueDocPreview from "vue-doc-preview";
import "jspdf-autotable";
import { PurchaseOrderViewModel } from "../../../models/View Models/PurchaseOrderViewModel";
import { StockTransferModel } from "@/models/StockTransferModel";
import confirmation from "@/modules/shared/components/confirmation";
export default {
  data: () => ({
    PurchaseOrder: [],
    expanded: [],
     visibleChangeStatusModal: false,
    transferStatuses: [
      { requiredNote: false, status: "Completed" },
      { requiredNote: false, status: "Pending" },
      { requiredNote: true, status: "Canceled" },
    ],
    singleExpand: true,
    StatusReasonErrorMessages:[],
    unitDetails: [],
    StockTransferStatus: ["Completed", "Canceled","Pending"],
    selectedProductsToTransfer: [],
    StockTransfer: new StockTransferModel(),
    heading: "Sample PDF Generator",
    moreText: [
      "This is another few sentences of text to look at it.",
      "Just testing the paragraphs to see how they format.",
      "jsPDF likes arrays for sentences.",
      "Do paragraphs wrap properly?",
      "Yes, they do!",
      "What does it look like?",
      "Not bad at all.",
    ],

    selectedProductsItems: [],

    StockTransferHeaders: [
      { text: "Product", value: "product.name", sortable: false },
      { text: "Batch", value: "batch.batch", sortable: false },
      { text: "Quantity", value: "quantity", sortable: false },
      { text: "Waste Percentage", value: "wastePercentage", sortable: false },
      { text: "Return Quantity", value: "return_quantity", sortable: false },
      { text: "Unit", value: "unit.name", sortable: false, align: "center" },
    ],
    TransferItemUnitHeaders: [
      { text: "Unit", value: "name", sortable: false },
      { text: "Tranferable Percentage", value: "percentage", sortable: false },
      { text: "Quantity", value: "quantity", sortable: false },
    ],
  }),
  methods: {
     onChangeStatus(value) {
      value.id=this.$route.params.id
      this.$store
        .dispatch("stock/ChangeStatus", value)
        .then((res) => {
          this.getStockTransfer();
            this.visibleChangeStatusModal = false;

        })
        .catch((err) => {
          this.isLoading = false;
        });
    },
     onClickChangeStatus(value) {
      this.visibleChangeStatusModal = true;
    },
    onCloseChangeStatus() {
      this.visibleChangeStatusModal = false;
    },
    getPurchaseOrderStatusColor(status) {
      switch (status) {
        case "Completed":
          return "green";
          break;
        case "Pending":
          return "orange";
          break;
        case "Canceled":
          return "red";
          break;

        default:
          break;
      }
    },
    print() {
      this.$htmlToPaper("qr-code");
    },
    getStockTransfer() {
      this.Loading = true;
      this.$store
        .dispatch("product/GetTranferDetails", this.$route.params.id)
        .then((res) => {
          debugger;
          this.MapStoreTranfer(res);
        })
        .catch((err) => {
          debugger;
          this.warehouseLoading = false;
          this.messages = err.data.name;
        });
    },
    UpdateStatus() {
      if(this.StockTransfer.statusChange=='Canceled' && this.StockTransfer.statusNoteChange==null)
      {
        this.StatusReasonErrorMessages.push('Reason is Required')
      }
      else
      {
        this.StatusReasonErrorMessages=[];
        confirmation.dialog = true;
        this.$confirm(`Do you want to ${this.StockTransfer.statusChange} Transfer`).then(
            (res) => {
              if (res) {
                this.$store
                    .dispatch(`stock/UpdateTransferStatus`, {
                      stockId: this.$route.params.id,
                      data: {
                        status: this.StockTransfer.statusChange,
                        status_note: this.StockTransfer.statusNoteChange
                      }
                    })
                    .then((res) => {

                      this.getStockTransfer()
                      this.$toast.success("StatusUpdatedSuccessfully");
                    })
                    .catch((err) => {
                      this.isLoading = false;
                      this.$toast.error("Status update Failed");
                      this.show = false;
                    });
              }
              else
              {
                this.Purchase.isUpdate=!this.Purchase.isUpdate
              }
            });

      }

    },
    changeStatus()
    {
      this.StockTransfer.isUpdate = !this.StockTransfer.isUpdate
      if(!this.StockTransfer.isUpdate)
      {
        this.StockTransfer.isUpdate=true;
        this.UpdateStatus();
      }


    },
    ExpandItem(event) {
      this.progressBar = true;
      this.unitDetails = event.transferUnit;
      this.expanded = [];
      this.progressBar = false;
      this.expanded.push(event);
    },

    MapStoreTranfer(stockTransferDetails) {
      let count = 1;
      this.StockTransfer.date = stockTransferDetails.date;
      this.StockTransfer.reference_number =
        stockTransferDetails.reference_number;

      this.StockTransfer.remarks = stockTransferDetails.remarks;
      this.StockTransfer.status = stockTransferDetails.status;
      this.StockTransfer.statusChange = stockTransferDetails.status;
      this.StockTransfer.statusNote = stockTransferDetails.status_note;
      this.StockTransfer.statusNoteChange = stockTransferDetails.status_note;
      this.StockTransfer.isUpdate=false;

      (this.StockTransfer.warehouse = stockTransferDetails.wareHouse),
        (this.StockTransfer.shop = stockTransferDetails.shop),
        stockTransferDetails.transferItems.map((p) => {
          let item = new Object();
          item.product = p.product;
          item.batch = p.batch;
          item.id = count;
          item.unit = p.unit;
          item.quantity = p.quantity;
          item.transferUnit = [];
          item.wastePercentage = p.wast_percentage;
          item.return_quantity = p.return_quantity;
          p.transferItemUnits.map((u) => {
            let pUnit = new Object();
            pUnit.name = u.unit.name;
            pUnit.id = u.unit.id;
            pUnit.quantity = u.quantity ? u.quantity : 0;
            (pUnit.percentage = u.transferable_percentage
              ? parseInt(u.transferable_percentage)
              : 0),
              (pUnit.is_changes_unit = u.is_changes_unit);
            item.transferUnit.push(pUnit);
          });
          this.selectedProductsToTransfer.push(item);
          count++;
        });
    },
  },
  created() {
    this.getStockTransfer();
  },
  components: {
    FileUpload,
    VueDocPreview,ChangeStatus
  },
  computed: {
    printQr() {
      return {
        id: "qr-code",
        popTitle: this.PurchaseOrder.name,
      };
    },
  },
};
</script>


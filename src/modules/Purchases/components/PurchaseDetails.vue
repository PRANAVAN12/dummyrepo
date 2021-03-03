<template>
<div>
   <PageTitle  v-if="Purchase.status=='Pending'" title="Purchase View"   :backBtn = true :editRoute="'/purchase/edit/' + this.$route.params.id"  :permission="'Purchase Edit'"   :changeStatus="true"    @onClickChangeStatus="onClickChangeStatus" />
  <PageTitle v-if="Purchase.status!='Pending'" title="Purchase View" :backBtn = true         />
  <v-container fluid class="lighten-12 container">

  
    <v-row>
      <v-col  cols="8" sm="8" md="8" lg="8">
        <v-card class="lighten-12 ">
            <v-card-title >Purchase </v-card-title>
            <v-container fluid>
              <v-col  cols="12" sm="12" md="12" lg="12">
                <v-row>
                  <v-col cols="6" sm="6" md="3" lg="6"><h4>Reference Number </h4></v-col>
                  <v-col cols="6" sm="6" md="3" lg="6"><v-chip label>{{ Purchase.referenceNumber }}</v-chip></v-col>


                  <v-col cols="6" sm="6" md="3" lg="6"><h4>Purchase Date </h4></v-col>

                  <v-col cols="6" sm="6" md="3" lg="6"><v-chip label>{{ Purchase.date | formatDate }}</v-chip></v-col>



                  <v-col cols="6" sm="6" md="3" lg="6"> <h4>Supplier </h4></v-col>
                  <v-col cols="6" sm="6" md="3" lg="6"><v-chip label>{{ Purchase.suppliers.name }}</v-chip></v-col>
                   <v-col cols="6" sm="6" md="3" lg="6"><h4>Ware House </h4></v-col>
                  <v-col cols="6" sm="6" md="3" lg="6"> <v-chip label>{{ Purchase.warehouses.name }}</v-chip></v-col>
                </v-row>



</v-col>

            </v-container>
        </v-card>
      </v-col>
      <v-col  cols="4" sm="4" md="4" lg="4">
        <v-card class="lighten-12 " height="100%">
          <v-card-title class="d-flex justify-space-between">Status Details   
            <!-- <v-btn v-if="!Purchase.isUpdate && Purchase.status=='Pending'"
                                                 depressed
                                                 small
                                                 class="text-white btn_blue btn_medium w-100"
                                                 @click="changeStatus"
          >Edit</v-btn
          > -->
          
          </v-card-title>
          <v-container fluid>
            <v-row v-if="!Purchase.isUpdate">
              <v-col cols="6" sm="6" md="3" lg="3"><h4>Status</h4></v-col>
              <v-col cols="6" sm="6" md="6" lg="6"> <v-chip
                  label
                  text-color="white"
                  :color="getPurchaseOrderStatusColor(Purchase.status)"
                  dark
              >{{
                  Purchase.status ? Purchase.status : "----"
                }}</v-chip
              >
              </v-col>

            </v-row>
            <v-row v-if="Purchase.isUpdate">
              <v-col cols="12"  sm="12" md="12" lg="12" >
                <v-select
                    v-model="Purchase.statusChange"
                    :items="purchaseStatus"
                    @input="StatusReasonErrorMessages=[]"
                    :error-messages="errors"
                    outlined
                    dense
                    label="Status"
                />
              </v-col>
            </v-row>
            <v-row v-if="!Purchase.isUpdate">
              <v-col cols="6" sm="6" md="3" lg="3"><h4>Status Note</h4></v-col>
              <v-col cols="6" sm="6" md="3" lg="3"><v-chip>{{ Purchase.statusNote?Purchase.statusNote:"-----"}}</v-chip></v-col>
            </v-row>

            <v-row v-if="Purchase.isUpdate">
              <v-col cols="12"  sm="12" md="12" lg="12" >
            <v-textarea
                hide-details="auto"
                outlined
                dense
                rows="3"
                @input="StatusReasonErrorMessages=[]"
                :error-messages="StatusReasonErrorMessages"
                v-model="Purchase.statusNoteChange"
                label="Status Note"
                required
            ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions v-if="Purchase.status=='Pending'">
            <v-spacer></v-spacer>
            <v-btn  v-if="Purchase.isUpdate"   depressed
                      small
                      @click="Purchase.isUpdate=false"
                      class="text-white  btn_medium w-80"> cancel</v-btn>

            <v-btn :disabled="Purchase.statusChange=='Pending'" v-if="Purchase.isUpdate"
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
      <v-col cols="12" sm="12" md="12" lg="12">
        <v-card class="lighten-12 ">
          <v-card-title class="d-flex justify-space-between ">Purchase Products <div>
             <v-btn hidden small class="text-white btn_gray w-100 d-none d-sm-flex" v-print="printQr"
          >Print <v-icon right dark > mdi-printer </v-icon></v-btn
          ></div></v-card-title>
          <v-container fluid>
            <PurchaseTemplate
                id="purchase"
                :purchase="Purchase"
                class="test1"
                :total="selectedProductsTotal"
                :purchaseProducts="selectedProductsItems" 
                style="display: none"

            >

            </PurchaseTemplate>
            <v-row >
           

              <v-col cols="12">
             <v-data-table disable-pagination hide-default-footer :headers="purchaseorderheaders" :items="selectedProductsItems" sortable: false >
                
                    <!-- <template v-slot:item.amount="{ item }">
                              {{item.amount | formatCurrency}}
                            </template> -->

                                 <template v-slot:item.total="{ item }">
                           <strong class="px-4">   {{item.total | formatCurrency}}</strong>
                            </template>

                               <template slot="body.append">
                          <tr
                            class="black--text"
                            v-if="selectedProductsTotal > 0"
                          >
                            <th class="title"></th>
                            <th class="title"></th>
                            <th class="title"></th>

                            <th class="title"></th>
                            <th class="title"></th>
                            <th class="title"></th>
                            <th class="title"></th>
                            <th class="title"></th>
                            <th class="text-right">
                             <h3>  {{
                                      Purchase.totalDiscountAmount
                                          | formatCurrency
                                    }}</h3>
                            </th>
                            <th class=" text-right">
                            <h3>  {{ selectedProductsTotal |formatCurrency }}</h3>
                            </th>
                          </tr>
                        </template>
               <template
                   v-slot:item.discountPercentage="{ item }"
                   v-slot="{ errors }"
                   name="Quantity"
                   rules="numeric"
               >{{item.discountPercentage}} %
               </template>
               <template v-slot:item.discountAmount="{ item }">
                 {{ item.discountAmount | formatCurrency }}
               </template>
              </v-data-table>

              </v-col>

            </v-row>
            <v-row class="sub-section">
              <v-col cols="4">
                Discount Amount : {{Purchase.discountAmount}}
              </v-col>
              <v-col cols="4"> </v-col>
              <v-col cols="4" class="d-flex justify-end align-center">
                <strong class="mr-5"> Total Payable Amount : </strong>
                <h3 class="title">
                  {{
                    (selectedProductsTotal -
                        Purchase.totalDiscountAmount -
                        Purchase.discountAmount)
                        | formatCurrency
                  }}
                </h3>
              </v-col>
            </v-row>
          </v-container>
        </v-card>



      </v-col>
    </v-row>
    <v-row class="purchasedetails">
      <v-col  cols="12" sm="12" md="12" lg="5">
        <v-card class="lighten-12"  >
          <v-card-title>Additional Amounts</v-card-title>
          <v-container class="ma-0 pa-0">
            <v-row class="ma-0 pa-0">

              <v-col cols="12" class="ma-0 pa-0">
                <v-expansion-panels class="ma-0 pa-0">
                  <v-expansion-panel class="ma-0 pa-0">
                    <v-expansion-panel-header>
                      <v-row class="text-left">
                        <v-col cols="5" sm="12" md="5" lg="4" class=" Ui1 mt-6 ma-0 pa-0" >
                          Total Amount      </v-col>
                       <v-col cols="5" sm="12" md="5" lg="5">    <v-chip class="ma-2" label>{{ AdditionalTotal| formatCurrency }}</v-chip> </v-col>
                 
                        <v-col cols="2" sm="12" md="2" lg="2" class=" Ui1 ma-0 pa-0" >
                          <v-btn rounded color="primary" dark @click="OpenAdditionalPayment();$event.prevent_default()" >Add</v-btn>
                        </v-col>
                      </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="ma-0 pa-0">
                      <v-data-table
                          :headers=" AdditionalAmountHeaders"
                          :items="Purchase.additionalAmounts"
                          class="ma-0 pa-0"
                          hide-default-footer
                      disable-pagination>
                        <template v-slot:item.action="{ item }">
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                          <v-icon
                              small
                              class="mr-2"
                              @click="EditAdditionalAmount(item)"
                          >
                            mdi-pencil
                          </v-icon>
                            </template>
                            <span>Edit Amount</span>
                          </v-tooltip>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                          <v-icon
                              small
                              @click="DeleteAdditionalAmount(item)"
                          >
                            mdi-delete
                          </v-icon>
                            </template>
                            <span>Delete Amount</span>
                          </v-tooltip>

                        </template>
                      </v-data-table>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
            </v-row>
            <AdditionalAmountModel
                ref="AdditionalAmount"
                @conform="refreshAdditionalAmountTable"
                :AdditionalAmount="additionalAmount"

            />
            <EditPaymentModel
                ref="PaymentEditModel"
                @conform="refreshPayments"
                :visible="showEditForm"
                :debitAccount="debitAccount"
                :payment="payment"
                :creditAccounts="supplierCreditAccounts"
            />
          </v-container>
        </v-card>
      </v-col>
      <v-col  cols="12" sm="12" md="12" lg="7" >
        <v-card class="lighten-12 " >
          <v-card-title>Payments</v-card-title>
          <v-container class="ma-0 pa-0">
            <v-row class="ma-0 pa-0">

              <v-col cols="12" class="ma-0 pa-0">
                <v-expansion-panels class="ma-0 pa-0" >
                  <v-expansion-panel class="ma-0 pa-0">
                    <v-expansion-panel-header  >
                      <v-row class="text-left  ma-0 pa-0 mt-2">
                        <v-col cols="5" sm="12" md="5" lg="5" class="Ui1  ma-0 pa-0 " >
                          Total Amount
                          <v-chip  label>{{ Purchase.total | formatCurrency }}</v-chip>
                        </v-col>
                        <v-col cols="5" sm="12" md="5" lg="5" class="Ui1  ma-0 pa-0 ">
                          Out Standing balance
                          <v-chip  label>{{ Purchase.balance|formatCurrency }}</v-chip>
                        </v-col>
                        <v-col cols="2" sm="12" md="2" lg="2"  class= " Ui1 pl-3  ma-0 pa-0 " v-if="Purchase.balance>0">
                          <v-btn  rounded color="primary" dark @click="OpenPayment()" class="mt-0">PAY</v-btn>
                        </v-col>
                      </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content   class="ma-0 pa-0" >
                      <v-data-table
                          @click:row="$router.push(`/payment/${$event.id}`)"
                          class="ma-0 pa-0"
                          :headers="paymentHeaders" :items="Purchase.payments" hide-default-footer>
                        <template
                            v-slot:item.status="{ item }"
                            v-slot="{ errors }"
                            name="Quantity"
                            rules="numeric"
                        >
                          <v-chip
                              :x-small="true"
                              class="ma-2"
                              label
                              text-color="white"
                              :color="GetChequeStatusColor(item.status)"
                              dark
                          >{{ item.status }}</v-chip
                          >
                        </template>

                        <template v-slot:item.action="{ item }">
                            <v-tooltip bottom>
                              <template v-slot:activator="{ on, attrs }">
                                <v-icon  v-if="!(item.status!='Pending' && item.payment_type=='Cheque')"
                                    small
                                    class="mr-2"
                                    @click.stop="EditPayment(item)"
                                >
                                  mdi-pencil
                                </v-icon>
                              </template>
                              <span>Edit Amount</span>
                            </v-tooltip>

                        </template>
                      </v-data-table>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
            </v-row>

            <AddPaymentModel
                ref="PaymentModal"
                :PayableBalance="Purchase.balance"
                @conform="refreshPayments"
                :visible="showScheduleForm"
                :debitAccount="debitAccount"
                :creditAccounts="debitAccount"
                :payment="payment"
                :purchaseId="purchaseId"
                :supplierId="Purchase.supplier_id"
            />

            <AdditionalAmountModel
                ref="AdditionalAmount"
                :additional-amount="additionalAmount"
                @conform="refreshPayments"
                :purchaseId="purchaseId"
            />
            <EditPaymentModel
                ref="PaymentEditModel"
                @conform="refreshPayments"
                :visible="showEditForm"
                :debitAccount="debitAccount"
                :purchaseId="purchaseId"
                :payment="payment"
                :creditAccounts="supplierCreditAccounts"
            />
          </v-container>
        </v-card>
      </v-col>

    </v-row>


    <v-row>
     





      <v-col cols="12">
        <v-card class="lighten-12">
          <v-card-title>Files</v-card-title>
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <FileUpload
                    :multiple="true"
                    size="2048"
                    icon="mdi-upload"
                    autoupload="true"
                    :url="'document/upload/purchase/' + this.$route.params.id"
                    :showDocumentView="true"
                    :documentsUrl="'document/purchase/'+this.$route.params.id"
                    downloadUrl="document/:id/download"
                    removeUrl="document/:id"
                ></FileUpload>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>

       <v-col cols="12" v-if="true">
        <v-card class="lighten-12">
          <v-card-title>Note</v-card-title>
          <v-container fluid>
            <v-row >
                <v-col cols="6" sm="6" md="3" lg="3">{{Purchase.remark}}</v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
        <change-status
        :visible="visibleChangeStatusModal"
        :statuses="purchaseStatuses"
       
        :selectedStatus="Purchase.status"
        @onChangeStatus="onChangeStatus"
        @close="onCloseChangeStatus"
      ></change-status>
  </v-container>
</div>
</template>

<script>
import ChangeStatus from "@/components/shared/ChangeStatus";
import { PurchaseViewModel } from "@/models/View Models/PurchaseViewModel";
import { PaymentViewModel } from "@/models/View Models/PaymentViewModel";
import FileUpload from "@/components/base/FileUpload";
import DocumentView from "@/components/base/DocumentView";
import AddPaymentModel from "../../shared/modals/AddPaymentModel";
import AdditionalAmountModel from "../../shared/modals/AddAdditionalAmountModal";
import EditPaymentModel from "../../shared/modals/EditPaymentModel";
import { AccountViewModel } from "../../../models/View Models/AccountViewModel";
import { Payment } from "@/models/Payment";
import "jspdf-autotable";
import VueDocPreview from "vue-doc-preview";
import confirmation from "@/modules/shared/components/confirmation";
import _ from "lodash";

export default {
  data: () => ({
    Purchase: [],
    visibleChangeStatusModal: false,
    purchaseStatuses: [
      { requiredNote: false, status: "Completed" },
      { requiredNote: false, status: "Pending" },
      { requiredNote: true, status: "Canceled" },
    ],
    purchaseStatus: ["Completed", "Canceled","Pending"],
    payment: [],
    showEditForm: false,
    purchaseId: "",
    payments: [],
    StatusReasonErrorMessages:[],
    additionalAmount: {
      amount: 0,
      reason: "",
      isEdit: false,
      id: null,
    },
    showScheduleForm: false,
    AdditionalTotal: 0,
    debitAccount: [],
    supplierCreditAccounts: [],
    PaymentViewModel: [],
      
    selectedProductsItems: [],
    ChequeStatus: ["Pending", "Canceled", "Completed"],
    purchaseorderheaders: [
      { text: "Name", value: "name", sortable: false, width: "20" },
      { text: "Batch", value: "batch.name", sortable: false, width: "20" },
      { text: "Unit", value: "unit.name", sortable: false, width: "20" },
      {
        text: "Unit Cost",
        value: "unitPrice",
        align: "center",
        width: "10%",
      },
      {
        text: "Discount %",
        value: "discountPercentage",
        sortable: false,
        width: "10%",
      },
      {
        text: "Qty",
        value: "quantity",
        sortable: false,
        align: "center",
        width: "10",
      },
      {
        text: "Discount Qty",
        value: "discount",
        sortable: false,
        align: "center",
        width: "10",
      },
      {
        text: "Damage Qty",
        value: "damage",
        sortable: false,
        align: "center",
        width: "10",
      },

      {
        text: "Discount Amount",
        value: "discountAmount",
        align: "right",
        width: "15%",
      },
      {
        text: "Total",
        value: "total",
        sortable: false,
        align: "right",
        width: "10",
      },
    ],
    paymentHeaders: [
      { text: "Date", value: "date_time" },
      { text: "Reference Number", value: "reference_number" },
      { text: "Amount", value: "amount" },
      { text: "Payment Type", value: "payment_type" },
      { text: "status", value: "status", align: "center" },
      { text: "", value: "action" },
    ],
    AdditionalAmountHeaders: [
      { text: "Amount", value: "amount", width: "20" },
      { text: "Reason", value: "reason", width: "90" },
      {
        text: "",
        value: "action",
        sortable: false,
        align: "right",
        width: "5",
      },
    ],
    selectedProductsTotal: 0,
  }),
  methods: {

    onChangeStatus(value) {
      value.id=this.$route.params.id
      this.$store
        .dispatch("purchase/ChangeStatus", value)
        .then((res) => {
          this.GetPurchase();
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
    sumField(key) {
      // sum data in give key (property)

      this.selectedProductsTotal = this.selectedProductsItems.reduce(
        (a, b) => a + (b[key] || 0),
        0
      );
    },
    SumAdditionalAmount() {
      console.log("goooosss");
      this.AdditionalTotal = 0;
      this.Purchase.additionalAmounts.map((p) => {
        this.AdditionalTotal = this.AdditionalTotal + p.amount;
      });
    },
    GetSelectedUnitPriceDetails(product, unit) {
      if (product.batch && product.batch.unitPriceDetails) {
        var selectedUnit = product.batch.unitPriceDetails.find(
          (i) => unit.id === i.unit
        );
        if (selectedUnit) {
          product.unitPrice = selectedUnit.purchasePrice;
        }
      }
    },
    sumDiscountField(key) {
      this.Purchase.totalDiscountAmount = this.selectedProductsItems.reduce(
        (a, b) => a + (b[key] || 0),
        0
      );
    },
    GetPurchase() {
      this.purchaseId = this.$route.params.id;
      this.$store
        .dispatch("purchase/GetPurchase", this.purchaseId)
        .then(async (res) => {
          debugger;
          this.Purchase = new PurchaseViewModel(res.data);
          await this.getOrganization();
          this.SumAdditionalAmount();
          this.selectedProductsItems = this.Purchase.products;
          this.selectedProductsItems.forEach((product) => {
            this.GetSelectedUnitPriceDetails(product, product.unit);
            product.total = product.quantity * product.unitPrice;
            product.discountAmount = parseInt(
              product.discount * product.unitPrice +
                (product.received - product.discount) *
                  (product.unitPrice * (product.discountPercentage / 100))
            );
            product.unitError = [];
          });
          this.sumField("total");
          this.sumDiscountField("discountAmount");
          this.selectedProducts = [];
          this.Purchase.products.forEach((product) => {
            const tempProduct = this.products.find(
              (item) => item.id === product.product_id
            );
            tempProduct.quantity = product.quantity;
            this.selectedProducts.push(tempProduct);
          });
          debugger;
          debugger;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.messages = err.data.title;
        });
    },

    DocumentView() {
      var fileId = this.$route.params.id;
      var documentType = "PURCHASE";
      this.$store
        .dispatch("DocumentView", {
          fileId,
          documentType,
        })
        .then((resp) => {
          console.log(resp);
        });
    },
    OpenPayment() {
      this.payment = new Payment();
      this.$refs.PaymentModal.openModal();
    },

    OpenAdditionalPayment() {
      this.additionalAmount = {
        amount: 0,
        reason: null,
        isEdit: false,
        id: null,
      };
      this.$refs.AdditionalAmount.openModal();
    },
    changeStatus()
    {
      this.Purchase.isUpdate = !this.Purchase.isUpdate
      if(!this.Purchase.isUpdate)
      {
        this.Purchase.isUpdate=true;
        this.UpdateStatus();
      }


    },
    EditPayment(item) {
      this.payment.account_id = this.Purchase.account_id;
      this.payment = _.cloneDeep(item);
      if (this.payment.cheque) {
        this.payment.cheque_bank = item.cheque.cheque_bank;
        this.payment.cheque_date = item.cheque.cheque_date;
        this.payment.cheque_no = item.cheque.cheque_no;
        this.payment.cheque_type = item.cheque.cheque_type;
      }

      this.$refs.PaymentEditModel.openModal();
    },

    GetDebitAccounts() {
      this.$store
        .dispatch("purchase/GetDebitAccounts", { accountType: "Purchase" })
        .then((res) => {
          this.debitAccount = res.data.data.map((u) => {
            return new AccountViewModel(u);
          });
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.messages = err.data.title;
        });
    },

    refreshPayments() {
      this.GetPurchase();
    },
    GetChequeStatusColor(status) {
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
    EditAdditionalAmount(item) {
      this.additionalAmount = {
        amount: item.amount,
        reason: item.reason,
        isEdit: true,
        id: item.id,
      };
      this.$refs.AdditionalAmount.openModal();
    },
    DeleteAdditionalAmount(item) {
      confirmation.dialog = true;
      this.$confirm("Do you want to Delete this Additional Amount").then(
        (res) => {
          debugger;
          if (res) {
            this.$store
              .dispatch(`purchase/DeleteAdditionalAmount`, {
                id: item.id,
                purchaseId: this.purchaseId,
              })
              .then((res) => {
                this.isLoading = false;
                this.$toast.success("Additinal Amount deleted  successfully");
                this.refreshPayments();
                this.show = false;
              })
              .catch((err) => {
                this.isLoading = false;
                this.$toast.error("Additinal amount delete  failed");
                this.show = false;
              });
          }
        }
      );
    },
    UpdateStatus() {
      if(this.Purchase.statusChange=='Canceled' && this.Purchase.statusNoteChange==null)
      {
        this.StatusReasonErrorMessages.push('Reason is Required')
      }
      else
      {
        this.StatusReasonErrorMessages=[];
        confirmation.dialog = true;
        this.$confirm(`Do you want to ${this.Purchase.statusChange} Purchase`).then(
            (res) => {
              if (res) {
                this.$store
                    .dispatch(`purchase/UpdatePurchaseStatus`, {
                      purchaseId: this.purchaseId,
                      data: {
                        status: this.Purchase.statusChange,
                        status_note: this.Purchase.statusNoteChange
                      }
                    })
                    .then((res) => {

                      this.GetPurchase()
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
    refreshAdditionalAmountTable() {},
    async getOrganization() {
      await this.$store
        .dispatch("sitesetting/OrganizationView", 1)
        .then((res) => {
          debugger;
          if (res && res.data) {
            debugger;
            this.Purchase.organization = res.data;
            console.clear();
            console.log(res.data);
          }
        })
        .catch((err) => {});
    },
  },

  components: {
    FileUpload,
    EditPaymentModel,
    DocumentView,
    AddPaymentModel,
    AdditionalAmountModel,
    VueDocPreview,ChangeStatus
  },
  created() {
    this.DocumentView();
    this.GetPurchase();
  },
  computed: {
    printQr() {
      return {
        id: "purchase",
        popTitle: this.Purchase.referenceNumber,
      };
    },
  },
};
</script>
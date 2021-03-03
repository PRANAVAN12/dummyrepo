<template>
  <div>
    <PageTitle
    v-if="sale.status=='Pending'" 
      title="Sales Details"
      :backBtn="true"
      :changeStatus="true"
      @onClickChangeStatus="onClickChangeStatus"
    />
     <PageTitle
    v-if="sale.status !='Pending'" 
      title="Sales Details"
      :backBtn="true"
     
    />
    <v-container fluid class="lighten-12 container">
      <!-- Page Title -->
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="4">
          <v-card class="lighten-12">
            <v-card-title>Sale</v-card-title>
            <v-container fluid>
              <v-row> </v-row>
              <v-row>
                <v-col cols="7" xs="6" sm="6" md="6" lg="6">
                  <h4>Reference number</h4></v-col
                >
                <v-col cols="5" xs="6" sm="6" md="6" lg="6"
                  ><v-chip label>
                    {{ sale.reference_number ? sale.reference_number : "----" }}
                  </v-chip></v-col
                >
              </v-row>
              <v-row>
                <v-col cols="7" sm="6" md="6" lg="6"> <h4>Date</h4></v-col>
                <v-col cols="5" sm="6" md="6" lg="6"
                  ><v-chip label>
                    {{ sale.date | formatDate }}
                  </v-chip></v-col
                >
              </v-row>
              <v-row>
                <v-col cols="7" sm="6" md="6" lg="6"> <h4>Type</h4></v-col>
                <v-col cols="5" sm="6" md="6" lg="6"
                  ><v-chip label>
                    {{ sale.sale_type }}
                  </v-chip></v-col
                >
              </v-row>
              <v-row>
                <v-col cols="7" sm="6" md="6" lg="6"> <h4>Status</h4></v-col>
                <v-col cols="5" sm="6" md="6" lg="6">
                  <v-chip
                    label
                    text-color="white"
                    :color="getPurchaseOrderStatusColor(sale.status)"
                    dark
                    >{{ sale.status ? sale.status : "----" }}</v-chip
                  >
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="7" sm="6" md="6" lg="6"> <h4>Shop</h4></v-col>
                <v-col cols="5" sm="6" md="6" lg="6"
                  ><v-chip label>
                    {{ sale.shop.name ? sale.shop.name : "----" }}
                  </v-chip></v-col
                >
              </v-row>
              <v-row>
                <v-col cols="7" sm="6" md="6" lg="6"> <h4>Customer</h4></v-col>
                <v-col cols="5" sm="6" md="6" lg="6"
                  ><v-chip label>
                    {{ sale.customer.name ? sale.customer.name : "----" }}
                  </v-chip></v-col
                >
              </v-row>
              <v-row>
                <v-col cols="7" sm="6" md="6" lg="6"> <h4>Biller</h4></v-col>
                <v-col cols="5" sm="6" md="6" lg="6"
                  ><v-chip label>
                    {{
                      sale.biller.first_name ? sale.biller.first_name : "----"
                    }}
                  </v-chip></v-col
                >
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="12" lg="8">
          <v-card class="lighten-12">
            <v-card-title
              >Sales Items
              <!-- <v-btn
                small
                class="text-white btn_gray w-100 d-none d-sm-flex"
                v-print="printQr"
                >Print <v-icon right dark> mdi-printer </v-icon></v-btn
              > -->
            </v-card-title>
            <v-container fluid>
              <!-- <PurchaseOrderTemplate
                id="qr-code"
                :datas="sale"
                class="test1"
                :data="selectedProductsItems"
                style="display: none"
              ></PurchaseOrderTemplate> -->
              <v-row>
                <v-col cols="12" sm="12" md="12" lg="12">
                  <v-data-table
                    :headers="headers"
                    :items="sale.saleItems"
                    hide-default-footer
                    dense
                  >
                    <template v-slot:item.subtotal="{ item }">
                      <strong class="px-4">
                        {{
                          (item.amount * item.quantity) | formatCurrency
                        }}</strong
                      >
                    </template>

                    <template v-slot:item.discount_amount="{ item }">
                      <strong class="px-4">
                        {{
                          (item.bargain_discount * item.quantity)
                            | formatCurrency
                        }}</strong
                      >
                    </template>

                    <!--                    <template>-->
                    <!--                              <td class="title pl-4" style="width:100%">Total</td>-->
                    <!--                            <td class="title">-->
                    <!--                              {{ salesItemsTotal |formatCurrency }}-->
                    <!--                            </td>-->
                    <!--                    </template>-->
                    <template slot="body.append">
                      <tr class="black--text" v-if="salesItemsTotal > 0">
                        <th class="title">Total</th>
                        <th class="title"></th>
                        <th class="title"></th>
                        <th class="title"></th>

                        <th class="title"></th>
                        <th>
                          <h3>{{ discountItemTotal | formatCurrency }}</h3>
                        </th>
                        <th>
                          <h3>{{ salesItemsTotal | formatCurrency }}</h3>
                        </th>
                      </tr>
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
              <v-row class="sub-section">
                <v-col cols="4"> </v-col>
                <v-col cols="4"> </v-col>
                <v-col cols="4" class="d-flex justify-end align-center">
                  <strong class="mr-5"> Net Amount : </strong>
                  <h3 class="title">
                    {{ (salesItemsTotal - discountItemTotal) | formatCurrency }}
                  </h3>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="4">
          <v-card>
            <v-card-title>Note</v-card-title>

            <v-container fluid>
              <v-row>
                <v-col cols="6" sm="6" md="12" lg="12"
                  ><v-chip class="pa-0" label>
                    {{ sale.remarks ? sale.remarks : "----" }}
                  </v-chip>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="12">
          <v-card class="lighten-12">
            <v-card-title>Payments</v-card-title>
            <v-container fluid>
              <v-row>
                <v-col cols="12">
                  <v-expansion-panels>
                    <v-expansion-panel>
                      <v-expansion-panel-header>
                        <v-row class="text-left mt-2">
                          <v-col cols="5" sm="12" md="5" lg="5" class="Ui1">
                            Total Amount
                            <v-chip label>{{
                              sale.grand_total | formatCurrency
                            }}</v-chip>
                          </v-col>
                          <v-col cols="5" sm="12" md="5" lg="5" class="Ui1">
                            Out Standing balance
                            <v-chip label>{{
                              (sale.grand_total - sale.paid_amount)
                                | formatCurrency
                            }}</v-chip>
                          </v-col>
                          <v-col
                            cols="2"
                            sm="12"
                            md="2"
                            lg="2"
                            class="Ui1 pl-3"
                            v-if="sale.grand_total - sale.paid_amount > 0"
                          >
                            <v-btn
                              rounded
                              color="primary"
                              dark
                              @click="OpenPayment()"
                              class="mt-0"
                              >PAY</v-btn
                            >
                          </v-col>
                        </v-row>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-data-table
                          @click:row="$router.push(`/payment/${$event.id}`)"
                          :headers="paymentHeaders"
                          :items="sale.payments"
                          hide-default-footer
                        >
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
                                <v-icon
                                  v-if="
                                    !(
                                      item.status != 'Pending' &&
                                      item.payment_type == 'Cheque'
                                    )
                                  "
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

              <SalesPaymentModal
                ref="PaymentModal"
                @conform="refreshPayments"
                :visible="showScheduleForm"
                :debitAccount="debitAccount"
                :creditAccounts="debitAccount"
                :payment="payment"
                :salesId="sale.id"
                :customerId="sale.customer.id"
              />

              <SalesPaymentEditModal
                ref="PaymentEditModel"
                @conform="refreshPayments"
                :visible="showEditForm"
                :debitAccount="debitAccount"
                :salesId="sale.id"
                :payment="payment"
                :creditAccounts="supplierCreditAccounts"
              />
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <change-status
        :visible="visibleChangeStatusModal"
        :statuses="saleStatuses"
        :selectedStatus="sale.status"
        @onChangeStatus="onChangeStatus"
        @close="onCloseChangeStatus"
      ></change-status>
    </v-container>
  </div>
</template>

<script>
import FileUpload from "@/components/base/FileUpload";
import jsPDF from "jspdf";
import SalesPaymentModal from "../shared/modals/SalesPaymentModal";
import SalesPaymentEditModal from "../shared/modals/SalesPaymentEditModal";
import VueDocPreview from "vue-doc-preview";
import "jspdf-autotable";
import { Payment } from "@/models/Payment";
import { SaleViewModel } from "../../models/View Models/SaleViewModel";
import ChangeStatus from "@/components/shared/ChangeStatus";
import axios from "axios";

export default {
  data: () => ({
    sale: new SaleViewModel(),
    isLoading: false,
    salesItemsTotal: 0,
    debitAccount: null,
    payment: [],
    discountItemTotal: 0,
    saleStatuses: [
      { requiredNote: true, status: "Completed" },
      { requiredNote: true, status: "Pending" },
      { requiredNote: true, status: "Suspended" },
      { requiredNote: true, status: "Closed" },
      { requiredNote: true, status: "Canceled" },
    ],
    paymentHeaders: [
      { text: "Date", value: "date_time" },
      { text: "Amount", value: "amount" },
      { text: "Payment Type", value: "payment_type" },
      { text: "status", value: "status", align: "center" },
      { text: "", value: "action" },
    ],
    headers: [
      {
        text: "Name",
        value: "product.name",
        show: true,
        disabled: true,
        width: "15%",
      },
      {
        text: "Unit",
        value: "unit.name",
        show: true,
        disabled: true,
        width: "15%",
      },
      {
        text: "Batch",
        value: "batch.batch",
        show: true,
        disabled: false,
        width: "15%",
      },
      {
        text: "Unit Price",
        value: "amount",
        show: true,
        disabled: true,
        width: "15%",
      },
      {
        text: "Quantity",
        value: "quantity",
        show: true,
        disabled: false,
        width: "15%",
      },
      {
        text: "Discount",
        value: "discount_amount",
        show: true,
        disabled: false,
        width: "15%",
      },

      {
        text: "Subtotal",
        value: "subtotal",
        show: true,
        disabled: false,
        width: "10%",
      },
    ],
    visibleChangeStatusModal: false,
  }),
  methods: {
    onChangeStatus(value) {
      value.id=this.$route.params.id
      this.$store
        .dispatch("sales/ChangeStatus", value)
        .then((res) => {
          this.getSale();
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
    refreshPayments() {
      this.getSale();
    },
    sumField() {
      // sum data in give key (property)
      debugger;
      this.sale.saleItems.map((a) => {
        this.salesItemsTotal += a.amount * a.quantity;
      });
    },
    sumDiscountField() {
      // sum data in give key (property)
      debugger;
      this.sale.saleItems.map((a) => {
        debugger;
        this.discountItemTotal += a.bargain_discount * a.quantity;
      });
    },
    print() {
      this.$htmlToPaper("qr-code");
    },
    OpenPayment() {
      this.payment = new Payment();
      this.$refs.PaymentModal.openModal();
    },
    EditPayment(item) {
      this.payment.account_id = this.sale.account_id;
      this.payment = _.cloneDeep(item);
      if (this.payment.cheque) {
        this.payment.cheque_bank = item.cheque.cheque_bank;
        this.payment.cheque_date = item.cheque.cheque_date;
        this.payment.cheque_no = item.cheque.cheque_no;
        this.payment.cheque_type = item.cheque.cheque_type;
      }

      this.$refs.PaymentEditModel.openModal();
    },
    getSale() {
      let id = this.$route.params.id;
      this.$store
        .dispatch("sales/GetSale", id)
        .then((res) => {
          this.sale = res;
          debugger;
          this.sumField();
          this.sumDiscountField();
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
        });
    },
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
  created() {
    this.getSale();
  },
  components: {
    FileUpload,
    VueDocPreview,
    SalesPaymentModal,
    SalesPaymentEditModal,
    ChangeStatus,
  },
  computed: {
    printQr() {
      return {
        id: "qr-code",
        popTitle: this.sale.name,
      };
    },
  },
};
</script>


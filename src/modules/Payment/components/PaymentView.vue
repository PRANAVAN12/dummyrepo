<template>
  <div>
    <PageTitle title="Payment Details" :backBtn = true  :permission="'Purchase Edit'" />
    <v-container fluid class="lighten-12 container">
      <v-row>
        <v-col  cols="12" sm="12" md="6" lg="4">
          <v-card class="lighten-12 ">
            <v-card-title >Common </v-card-title>
            <v-container fluid>
              <v-row >
                <v-col cols="6" sm="6" md="6" lg="6"><h4> Date </h4></v-col>
                <v-col cols="6" sm="6" md="6" lg="6"><v-chip label>{{ PaymentDetails.date_time | formatDate }}</v-chip></v-col>
              </v-row>
              <v-row>
                <v-col cols="6" sm="6" md="6" lg="6"> <h4>Amount </h4></v-col>
                <v-col cols="6" sm="6" md="6" lg="6"><v-chip label>{{ PaymentDetails.amount }}</v-chip></v-col>
              </v-row>
              <v-row>
                <v-col cols="6" sm="6" md="6" lg="6"><h4> Type </h4></v-col>
                <v-col cols="6" sm="6" md="6" lg="6"><v-chip label>{{ PaymentDetails.payment_type }}</v-chip></v-col>
              </v-row>
              <v-row>
                <v-col cols="6" sm="6" md="6" lg="6"><h4> Status </h4></v-col>
                <v-col cols="6" sm="6" md="6" lg="6">   <v-chip
                    :x-small="true"
                    class="ma-2"
                    label
                    text-color="white"
                    :color="GetChequeStatusColor(PaymentDetails.status)"
                    dark
                >{{ PaymentDetails.status }}</v-chip
                ></v-col>
              </v-row>
              <v-row v-if="PaymentDetails.payment_type=='Cheque'">
                <v-col cols="6" sm="6" md="6" lg="6"> <h4>Cheque Type </h4></v-col>
                <v-col cols="6" sm="6" md="6" lg="6"><v-chip label>{{ PaymentDetails.cheque_type }}</v-chip></v-col>
              </v-row>
              <v-row v-if="PaymentDetails.payment_type=='Cheque'">
                <v-col cols="6" sm="6" md="6" lg="6"> <h4> Cheque Bank </h4></v-col>
                <v-col cols="6" sm="6" md="6" lg="6"><v-chip label>{{ PaymentDetails.cheque_bank }}</v-chip></v-col>
              </v-row>
              <v-row v-if="PaymentDetails.payment_type=='Card'">
                <v-col cols="6" sm="6" md="6" lg="6"> <h4> Card Bank </h4></v-col>
                <v-col cols="6" sm="6" md="6" lg="6"><v-chip label>{{ PaymentDetails.card_bank }}</v-chip></v-col>
              </v-row>
              <v-row v-if="PaymentDetails.payment_type=='Cheque' ">
                <v-col cols="6" sm="6" md="6" lg="6"> <h4>Cheque Date </h4></v-col>
                <v-col cols="6" sm="6" md="6" lg="6"><v-chip label>{{ PaymentDetails.cheque_date|formatDate }}</v-chip></v-col>
              </v-row>
              <v-row v-if="PaymentDetails.payment_type=='Cheque' ">
                <v-col cols="6" sm="6" md="6" lg="6"> <h4>Cheque Number </h4></v-col>
                <v-col cols="6" sm="6" md="6" lg="6"><v-chip label>{{ PaymentDetails.cheque_no }}</v-chip></v-col>
              </v-row>
              <v-row v-if="PaymentDetails.reference_number">
                <v-col cols="6" sm="6" md="6" lg="6"> <h4>Reference Number </h4></v-col>
                <v-col cols="6" sm="6" md="6" lg="6"><v-chip label>{{ PaymentDetails.reference_number }}</v-chip></v-col>
              </v-row>
              <v-row v-if="PaymentDetails.remarks">
                <v-col cols="6" sm="6" md="6" lg="6"> <h4>Remarks </h4></v-col>
                <v-col cols="6" sm="6" md="6" lg="6">{{ PaymentDetails.remarks }}</v-col>
              </v-row>


            </v-container>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="8">


          <v-card class="lighten-12">
            <v-card-title>Files</v-card-title>
            <v-container fluid>
              <v-row>

              </v-row>
              <v-row>
                <v-col cols="12">
                  <FileUpload
                      :multiple="true"
                      size="2048"
                      icon="mdi-upload"
                      autoupload="true"
                      :url="'document/upload/payment/' + this.$route.params.id"
                      :showDocumentView="true"
                      :documentsUrl="'document/payment/'+this.$route.params.id"
                      downloadUrl="document/:id/download"
                      removeUrl="document/:id"
                  ></FileUpload>
                </v-col>
              </v-row>
            </v-container>
          </v-card>

        </v-col>
      </v-row>


    </v-container>
  </div>
</template>

<script>
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


export default {
  data: () => ({
    PaymentDetails:[]
  }),
  methods: {
    GetPayment() {
      debugger
      this.paymentId = this.$route.params.id;
      this.$store
          .dispatch("purchase/GetPaymentById", {paymentId:this.paymentId})
          .then((res) => {
            this.PaymentDetails=res;

          })
          .catch((err) => {
            this.isLoading = false;
            this.messages = err.data.title;
          });
    },
    GetChequeStatusColor(status)
    {
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
    DocumentView() {
      var fileId = this.$route.params.id;
      var documentType = "Payment";
      this.$store
          .dispatch("DocumentView", {
            fileId,
            documentType,
          })
          .then((resp) => {
            console.log(resp);
          });
    },
  },

  components: {
    FileUpload,
    EditPaymentModel,
    DocumentView,
    AddPaymentModel,
    AdditionalAmountModel,
    VueDocPreview,
  },
  created() {
    // this.DocumentView();
    this.GetPayment();
  },
  computed: {
    // printQr() {
    //   return {
    //     id: "purchase",
    //     popTitle: this.Purchase.referenceNumber,
    //   };
    // },
  },
};
</script>

<template>
  <div>
    <PageTitle
      title="Purchase Return View"
      :backBtn="true"
      :editRoute="'/purchase-return/edit/' + this.$route.params.id"
      :permission="'Purchase Return Edit'"
    />
    <v-container fluid class="lighten-12 container">
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="4" xs="12">
          <v-card class="lighten-12" height="100%">
            <v-card-title>Purchase Return</v-card-title>
            <v-container fluid>
              <v-row>
                <v-col 
                 sm="6" md="6" lg="7" xs="6" 
                  ><h4>Reference Number </h4></v-col
                >
                <v-col 
                 sm="6" md="6" lg="5" xs="6"
                  ><v-chip label>{{
                    purchaseReturnViewModel.referencenumber
                      ? purchaseReturnViewModel.referencenumber
                      : "----"
                  }}</v-chip></v-col
                >
              </v-row>

              <v-row>
                <v-col  sm="6" md="6" lg="7"
                  ><h4>Purchase Date </h4></v-col
                >
                <v-col sm="6" md="6" lg="5"
                  ><v-chip label>{{
                    purchaseReturnViewModel.date
                      ? purchaseReturnViewModel.date
                      : "----"
                  }}</v-chip></v-col
                >
              </v-row>

              <v-row>
                <v-col  sm="6" md="6" lg="7"> <h4>Total Amount </h4></v-col>
                <v-col sm="6" md="6" lg="5"
                  ><v-chip label>{{
                    purchaseReturnViewModel.amount|formatCurrency
                  }}</v-chip></v-col
                >
              </v-row>
              <v-row>
                <v-col  sm="6" md="6" lg="7">
                  <h4>Supplier </h4></v-col
                >
                <v-col  sm="6" md="6" lg="5"
                  ><v-chip label>{{
                    purchaseReturnViewModel.suppliers.name
                      ? purchaseReturnViewModel.suppliers.name
                      : "----"
                  }}</v-chip></v-col
                >
              </v-row>
              <v-row>
                <v-col  sm="6" md="6" lg="7">
                  <h4>Ware House </h4></v-col
                >
                <v-col sm="6" md="6" lg="5"
                  ><v-chip label>{{
                    purchaseReturnViewModel.warehouses.name
                  }}</v-chip></v-col
                >
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="12" lg="8">
          <v-card class="lighten-12">
            <v-card-title class="d-flex justify-space-between "
              >Purchase Return Products
              <v-btn small class="text-white btn_gray w-100 	d-none d-sm-flex" v-print="printQr"
                >Print <v-icon right dark> mdi-printer </v-icon></v-btn
              >
            </v-card-title>
            <v-container fluid>
              <PurchaseReturnTemplate
               id="qr-code"
            :datas="purchaseReturnViewModel"
                class="test1"
                :data="PurchasereturnItem"

                style="display: none">
                
              </PurchaseReturnTemplate>
              <v-row>
                <v-col cols="12">
                  <v-data-table
                    :headers="purchasereturnheaders"
                    :items="PurchasereturnItem"
                    disable-pagination
                    hide-default-footer
                  >
                    <template slot="body.append">
                      <tr class="black--text">
                        <th class="title">Total</th>
                        <th class="title"></th>
                        <th class="title"></th>
                        <th class="title"></th>
                        <th class="title"></th>
                        <th class="title ">
                          {{ purchaseReturnViewModel.total | formatCurrency }}
                        </th>
                      </tr>
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
          <v-col></v-col>
          <v-card class="lighten-12">
            <v-card-title>Files</v-card-title>
            <v-container fluid>
              <FileUpload
                :multiple="true"
                size="2048"
                icon="mdi-upload"
                autoupload="true"
                :url="'//' + this.$route.params.id"
                :showDocumentView="true"
                :documentsUrl="
                  'document/PURCHASE_RETURN/' + this.$route.params.id
                "
                downloadUrl="document/:id/download"
                removeUrl="document/:id"
              ></FileUpload>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import FileUpload from "@/components/base/FileUpload";
import "jspdf-autotable";
import jsPDF from "jspdf";
import VueDocPreview from "vue-doc-preview";
import { PurchaseReturnViewModel } from "../../../models/View Models/PurchaseReturn";
export default {
  data: () => ({
    selectedFiles: "",
    selectedProductsTotal:0,
    purchaseReturnViewModel: new PurchaseReturnViewModel(),
    PurchasereturnItem: [],
    purchasereturnheaders: [
      { text: "Code", value: "code", sortable: false,width:"20%"},
      { text: "Name", value: "name", sortable: false,width:"20%" },
      { text: "Batches", value: "selectedBatch.name", sortable: false,width:"20%" },
      { text: "Qty", value: "quantity", sortable: false,width:"20%" },
      {
        text: " Unit ",
        value: "unit.name",
        sortable: false,
        width:"20%"
      },
      {
        text: " unitPrice ",
        value: "unitPrice",
      },

    ],
  }),
  methods: {
     print() {
      this.$htmlToPaper("qr-code");
    },

    GetPurchaseReturn() {
      this.$store
        .dispatch("purchaseReturn/GetPurchaseReturn", this.$route.params.id)
        .then((res) => {
          this.purchaseReturnViewModel = new PurchaseReturnViewModel().set(
            res.data
          );
          this.isLoading = false;
          this.PurchasereturnItem = this.purchaseReturnViewModel.selectedProducts;
        })
        .catch((err) => {
          this.isLoading = false;
          this.messages = err.data.name;
          //  this.$toast.error("Registration Failed");
        });
    },
  },
  created() {
    this.GetPurchaseReturn();
  },
  components: {
    FileUpload,
    VueDocPreview,
    
  },
    computed: {
    printQr() {
      return {
        id: "qr-code",
        popTitle: this.purchaseReturnViewModel.name,
      };
    },
  },
};
</script>

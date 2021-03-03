<template>
  <div>
    <PageTitle
      title="Purchase Order View"
      :backBtn="true"
      :editRoute="'/purchase-order/edit/' + PurchaseOrder.id"
      :permission="'Purchase Order Edit'"
    />
    <v-container fluid class="lighten-12 container">
      <!-- Page Title -->

      <v-row>
        <v-col cols="12" xs="12" sm="12" md="12" lg="4" xl="4">
          <v-card class="lighten-12">
            <v-card-title>Purchase order</v-card-title>
            <v-container fluid>
              <v-row> </v-row>
              <v-row>
                <v-col cols="7" xs="6" sm="6" md="6" lg="6">
                  <h4>Reference number</h4></v-col
                >
                <v-col cols="5" xs="6" sm="6" md="6" lg="6"
                  ><v-chip label>
                    {{
                      PurchaseOrder.reference_number
                        ? PurchaseOrder.reference_number
                        : "----"
                    }}
                  </v-chip></v-col
                >
              </v-row>
              <v-row>
                <v-col cols="7" sm="6" md="6" lg="6"> <h4>Date</h4></v-col>
                <v-col cols="5" sm="6" md="6" lg="6"
                  ><v-chip label>
                    {{ PurchaseOrder.date ? PurchaseOrder.date : "----" }}
                  </v-chip></v-col
                >
              </v-row>
              <v-row>
                <v-col cols="7" sm="6" md="6" lg="6"> <h4>Status</h4></v-col>
                <v-col cols="5" sm="6" md="6" lg="6">
                  <v-chip
                    label
                    text-color="white"
                    :color="getPurchaseOrderStatusColor(PurchaseOrder.status)"
                    dark
                    >{{
                      PurchaseOrder.status ? PurchaseOrder.status : "----"
                    }}</v-chip
                  >
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="7" sm="6" md="6" lg="6"> <h4>Warehouse</h4></v-col>
                <v-col cols="5" sm="6" md="6" lg="6"
                  ><v-chip label>
                    {{
                      PurchaseOrder.warehouses.name
                        ? PurchaseOrder.warehouses.name
                        : "----"
                    }}
                  </v-chip></v-col
                >
              </v-row>
              <v-row>
                <v-col cols="7" sm="6" md="6" lg="6"> <h4>Supplier</h4></v-col>
                <v-col cols="5" sm="6" md="6" lg="6"
                  ><v-chip label>
                    {{
                      PurchaseOrder.suppliers.name
                        ? PurchaseOrder.suppliers.name
                        : "----"
                    }}
                  </v-chip></v-col
                >
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="12" lg="8" xl="8">
          <v-card class="lighten-12">
            <v-card-title class="d-flex justify-space-between"
              >Purchase order products
              <v-btn
                small
                class="text-white btn_gray w-100 d-none d-sm-flex"
                v-print="printQr"
                >Print <v-icon right dark> mdi-printer </v-icon></v-btn
              ></v-card-title
            >
            <v-container fluid>
              <PurchaseOrderTemplate
                id="qr-code"
                :purchaseOrder="PurchaseOrder"
                class="test1"
                :data="selectedProductsItems"
                style="display: none"
              ></PurchaseOrderTemplate>
              <v-row>
                <v-col cols="12">
                  <v-data-table
                    :headers="purchaseorderheaders"
                    :items="selectedProductsItems"
                    hide-default-footer
                    disable-pagination
                    dense
                  >
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
        <v-col cols="12" sm="12" md="12" lg="4">
          <v-card>
            <v-card-title>Note</v-card-title>

            <v-container fluid>
              <v-row>
                <v-col cols="6" sm="6" md="12" lg="12"
                  ><v-chip class="pa-0" label>
                    {{ PurchaseOrder.remarks ? PurchaseOrder.remarks : "----" }}
                  </v-chip>
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
import FileUpload from "@/components/base/FileUpload";
import jsPDF from "jspdf";
import VueDocPreview from "vue-doc-preview";
import "jspdf-autotable";
import { PurchaseOrderViewModel } from "../../../models/View Models/PurchaseOrderViewModel";
export default {
  data: () => ({
    PurchaseOrder: [],
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
    purchaseorderheaders: [
      { text: "Code", value: "code", sortable: false },
      { text: "Name", value: "name", sortable: false },
      // { text: "Unit Code", value: "" ,sortable: false},
      { text: "Unit", value: "unit.name", sortable: false },
      { text: "Qty", value: "quantity", sortable: false, align: "center" },
    ],
  }),
  methods: {
    getPurchaseOrderStatusColor(status) {
      switch (status) {
        case "Received":
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
    getPurchaseOrder() {
      let Id = this.$route.params.id;
      this.$store
        .dispatch("purchaseOrder/GetPurchaseOder", Id)
        .then(async (res) => {
          this.PurchaseOrder = new PurchaseOrderViewModel(res.data);
          await this.getOrganization();
          this.selectedProductsItems = this.PurchaseOrder.products;
          this.selectedProducts = [];
          this.PurchaseOrder.products.forEach((product) => {
            const tempProduct = this.products.find(
              (item) => item.id === product.product_id
            );
            tempProduct.quantity = product.quantity;
            this.selectedProducts.push(tempProduct);
          });

          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.messages = err.data.title;
        });
    },
    async getOrganization() {
      await this.$store
        .dispatch("sitesetting/OrganizationView", 1)
        .then((res) => {
          debugger;
          if (res && res.data) {
            debugger;
            this.PurchaseOrder.organization = res.data;
            console.clear();
            console.log(res.data);
          }
        })
        .catch((err) => {
          this.messages = err.data.title;
          this.isLoading = false;
        });
    },
  },
  created() {
    this.getPurchaseOrder();
  },
  components: {
    FileUpload,
    VueDocPreview,
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


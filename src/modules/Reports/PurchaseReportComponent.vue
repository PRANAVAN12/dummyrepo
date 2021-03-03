<template>
  <div>
    <PageTitle title="Purchase Report" />
    <v-container fluid class="lighten-12 container">
      <v-card class="lighten-12 card-content">
        <TableFilters
          :filters="['supplier', 'dateRange', 'warehouse', 'total']"
          v-model="filter"
          :columns="columns"
          :export="[`purchaseexport`]"
        ></TableFilters>
        <v-row class="py-0 my-0">
          <v-col cols="12" md="12" lg="7" class="py-0 my-0">
            <v-row class="py-0 my-0">
              <v-col cols="12" sm="12" md="4" lg="2" class="mx-lg-1 px-lg-1">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      depressed
                      v-bind="attrs"
                      v-on="on"
                      block
                      height="30px"
                      class="report-button"
                      color="blue"
                      @click="generateReport(), (hide = !hide)"
                      ><v-icon small>mdi-file-send </v-icon> Genarate
                    </v-btn>
                  </template>
                  <span>Genarate</span>
                </v-tooltip>
              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="4"
                lg="2"
                class="mx-lg-1 px-lg-1"
                v-if="hide"
                ><v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }"
                    ><v-btn
                      depressed
                      shaped
                      v-bind="attrs"
                      v-on="on"
                      class="report-button"
                      color="red"
                      height="30px"
                      block
                      @click="pdfdownload()"
                    >
                      <v-icon small>mdi-file-pdf </v-icon>Export
                    </v-btn>
                  </template>
                  <span>Export to PDF</span>
                </v-tooltip></v-col
              >
              <v-col
                cols="12"
                sm="12"
                md="4"
                lg="2"
                class="mx-lg-0 px-lg-0"
                v-if="hide"
              >
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      depressed
                      height="30px"
                      v-bind="attrs"
                      v-on="on"
                      block
                      class="report-button"
                      color="green"
                      @click="exceldownload()"
                    >
                      <v-icon small>mdi-file-excel </v-icon>Export
                    </v-btn>
                  </template>
                  <span>Export to Excel</span>
                </v-tooltip></v-col
              >
            </v-row>
          </v-col>
        </v-row>
      </v-card>

      <v-card class="lighten-12 mt-2">
        <v-container fluid class="light gray lighten-12">
          <v-row>
            <v-card-text class="pa-0">
              <v-data-table
                items-per-page="1000"
                :fixed-header="true"
                :headers="headers"
                :items="PurchaseList"
                class="row-pointer"
                id="indextable"
              >
                <template v-slot:no-data>
                  <div class="mt-16 container justify-center item-center">
                    <noData name="Purchase" />
                  </div>
                </template>
                <template v-slot:item.reference_number="{ item }">
                  <CopyTableCell :text="item.reference_number"></CopyTableCell>
                </template>
                <!-- Status -->
                <template v-slot:item.is_active="{ item }">
                  <v-chip
                    :x-small="true"
                    class="ma-2"
                    label
                    text-color="white"
                    :color="getStatusColor(item.is_active)"
                    dark
                    >{{ item.is_active ? "Active" : "Archieved" }}</v-chip
                  >
                </template>
                <template v-slot:item.date="{ item }">{{
                  item.date | formatDate
                }}</template>

                <template v-slot:item.paid_amount="{ item }">
                  <strong>{{
                    item.paid_amount | formatCurrency
                  }}</strong></template
                >

                <template v-slot:item.total_amount="{ item }"
                  ><strong>{{
                    item.total_amount | formatCurrency
                  }}</strong></template
                >
                 <template
                  v-slot:item.supplier="{ item }"
                  v-slot="{ errors }"
                  name="Quantity"
                  rules="numeric"
                  >{{ item.supplier.name }}</template
                >
                 <template
                  v-slot:item.wareHouse="{ item }"
                  v-slot="{ errors }"
                  name="Quantity"
                  rules="numeric"
                  >{{ item.wareHouse.name }}</template
                >
                <template
                  slot="body.append"
                  v-if="PurchaseList && PurchaseList.length > 0"
                >
                  <tr class="black--text">
                    <th class="title"></th>
                    <th class="title"></th>
                    <th class="title"></th>
                    <th class="title"></th>
                    <th>
                      <h3 class="justify-content-end pl-2">
                        {{ total | formatCurrency }}
                      </h3>
                    </th>

                    <th>
                      <h3 class="justify-content-end">
                        {{ paid | formatCurrency }}
                      </h3>
                    </th>
                    <th class="title"></th>
                  </tr>
                </template>
              </v-data-table>
            </v-card-text>
          </v-row>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import TableFilters from "@/components/base/TableFilters";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import XLSX from "xlsx";
import { DateTime } from "@grapecity/wijmo";
import moment from "moment";
import _ from "lodash";
export default {
  data: () => ({
    messages: [],
    status: [
      { text: "Active", value: "active" },
      { text: "Archived", value: "archived" },
    ],

    columns: [
      {
        text: "Number",
        value: "no",
        show: true,
        disabled: false,
        width: "14%",
      },
      {
        text: "Date",
        value: "date",
        show: true,
        disabled: false,
        width: "16.5%",
      },
      {
        text: "Reference No",
        value: "reference_number",
        show: true,
        disabled: false,
        width: "16.5%",
      },
      {
        text: "Supplier",
        value: "supplier",
        show: true,
        disabled: false,
        width: "15%",
      },
      {
        text: "Total",
        value: "total_amount",
        show: true,
        disabled: false,
        width: "12%",
        align: "right",
      },
      {
        text: "Paid",
        value: "paid_amount",
        show: true,
        disabled: false,
        width: "12%",
        align: "right",
      },
      {
        text: "Warehouse",
        value: "wareHouse",
        show: true,
        disabled: false,
        width: "16.5%",
        align: "center",
      },
    ],
    PurchaseList: [],
    filter: {
      invoice_status: "",
      start: "",
      end: "",
      amount: "",
      supplier: "",
      search: "",
    },
    menu: false,
    total: 0,
    paid: 0,
  }),
  components: {
    TableFilters,
  },
  computed: {
    headers: function () {
      return this.columns.filter((item) => item.show == true);
    },
  },
  methods: {
    generateReport() {
      var filter = this.filter;
      this.$store
        .dispatch("report/getPurchaseReports", filter)
        .then((res) => {
          this.PurchaseList = res.data.data;
          this.total = this.sumField(this.PurchaseList, "total_amount");
          this.paid = this.sumField(this.PurchaseList, "paid_amount");
          let i = 1;
          this.PurchaseList.map((p) => {
            p.no = i;
            i++;
          });
        })
        .catch((err) => {
          this.isLoading = false;
          this.messages = err.data.title;
        });
    },
    sumField(array, filed) {
      let value = 0;
      array.forEach((element) => {
        value += element[filed];
      });
      return value;
    },
    //Product Details Export Pdf
    pdfdownload() {
      let Data = _.cloneDeep(this.PurchaseList);
      for (let x = 0; x < Data.length; x++) {
        Data[x].date = moment(Data[x].date, "YYYY-MM-DD").format("DD/MM/YYYY");
        Data[x].supplier = Data[x].supplier.name;
        Data[x].wareHouse = Data[x].wareHouse.name;
        // Data[x].products = Data[x].products.map((i) => {
        //   return i.product.name;
        // });
        Data[x].status = Data[x].is_active ? "Active" : "Archieved";
      }
      var rows = Data;
      var doc = jsPDF({
        orientation: "landscape",
      });
      doc.setFontSize(14);
      // doc.setFontType("bold");
      doc.setTextColor(26, 26, 26);
      doc.setFont("helvetica", "bold");
      doc.text("Purchase Report", 15, 5);

       doc.setFontSize(11);
        doc.text(15, 12, `${moment(today).format("DD-MM-YYYY HH:MM:SS")}`);

      doc.setFontSize(11);

      doc.text(180, 10, `Total Amount :- ${this.total}.00`);
      doc.text(240, 10, `Paid Amount :- ${this.paid}.00`);

      doc.autoTable(
        this.headers.map((h) => {
          return { title: h.text, dataKey: h.value };
        }),
        rows,
        {
          didParseCell: function (data) {
            if (data.column.dataKey === "addsress") {
              data.cell.text = data.cell.raw.country;
            }
          },
        }
      );
      const today = new DateTime();
      doc.save(`${moment(today).format("DD-MM-YYYY")}-Purchase.pdf`);
    },

    //Product Details Export Excel
    exceldownload() {
      var data = document.getElementById("indextable");
      const today = new DateTime();
      const headData = XLSX.utils.table_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(
        wb,
        headData,
        moment(today).format("DD-MM-YYYY")
      );
      XLSX.writeFile(wb, `${moment(today).format("DD-MM-YYYY")}-Purchase.xlsx`);
    },
  },
};
</script>

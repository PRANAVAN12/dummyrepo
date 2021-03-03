<template>
  <div>
    <PageTitle title="Sales Report" />
    <v-container fluid class="lighten-12 content">
      <v-card class="lighten-12 card-content mb-2">
        <TableFilters
          :filters="[
            'customer',
            'biller',
            'dateRange',
            'shop',
            'saleType',
            'product',
          ]"
          v-model="filter"
          :columns="columns"
          :export="[`salesexport`]"
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
                      shaped
                      block
                      height="30px"
                      class="report-button"
                      color="blue"
                      @click="generateReport(), (hide = !hide)"
                    >
                      <v-icon small>mdi-file-send </v-icon>Generate
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
                v-if="hide"
                class="mx-lg-1 px-lg-1"
                ><v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }"
                    ><v-btn
                      depressed
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
                  <span>Export to Excel</span>l
                </v-tooltip></v-col
              >
            </v-row>
            <v-col cols="12" sm="12" md="8" lg="8" class="mx-lg-1 px-lg-1">
              <div v-if="!filter.shop" class="shop-red">
                {{ shoperror }}
              </div>
            </v-col>
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
                :items="salesList"
                item-key="name"
                class="row-pointer"
                id="indextable"
              >
                <template v-slot:no-data>
                  <div class="mt-16 container justify-center item-center">
                    <!-- <img
                      style="height: 200px"
                      src="../../../assets/img/no-result.jpg"
                    /> -->
                  </div>
                </template>
                <template v-slot:item.reference_number="{ item }">
                  <CopyTableCell :text="item.reference_number"></CopyTableCell>
                </template>

                <template v-slot:item.date="{ item }">
                  {{ item.date | formatDate }}
                </template>

                <template v-slot:item.biller="{ item }">
                  {{ item.biller.first_name }}
                </template>
                <template v-slot:item.customer="{ item }" v-slot="{ errors }">{{
                  item.customer.name
                }}</template>
                <template
                  slot="body.append"
                  v-if="salesList && salesList.length > 0"
                >
                  <tr class="black--text">
                    <th class="title"></th>
                    <th class="title"></th>
                    <!-- <th class="title"></th> -->
                    <th class="title"></th>
                    <th class="title"></th>
                    <th class="title"></th>
                    <th class="title"></th>
                    <th class="title"></th>
                    <th>
                      <h3 class="justify-content-end pl-2">
                        {{ grandTotal | formatCurrency }}
                      </h3>
                    </th>
                    <th>
                      <h3 class="justify-content-end pl-2">
                        {{ discountTotal | formatCurrency }}
                      </h3>
                    </th>
                    <th>
                      <h3 class="justify-content-end pl-2">
                        {{ total | formatCurrency }}
                      </h3>
                    </th>

                    <th class="title"></th>
                    <!-- <th class="title"></th> -->
                  </tr>
                </template>
              </v-data-table>
            </v-card-text>
          </v-row>
        </v-container>
      </v-card>
      <!-- </v-card> -->
      <div class="d-flex justify-center align-center"></div>
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
  components: {
    TableFilters,
  },
  data() {
    return {
      isLoading: true,
      total: 0,
      grandTotal: 0,
      discountTotal: 0,
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
          width: "14.2%",
        },
        {
          text: "Reference Number",
          value: "reference_number",
          show: true,
          disabled: false,
          width: "14.2%",
        },
        {
          text: "Type",
          value: "sale_type",
          show: true,
          disabled: false,
          align: "center",
          width: "8%",
        },
        {
          text: "Biller",
          value: "biller",
          show: true,
          disabled: false,
          align: "center",
          width: "14.2%",
        },
        {
          text: "Customer",
          value: "customer",
          show: true,
          disabled: false,
          align: "center",
          width: "14.2%",
        },
        {
          text: "Total Items",
          value: "total_items",
          show: true,
          disabled: false,
          align: "center",
          width: "14.2%",
        },
        {
          text: "Total Amount",
          value: "total",
          show: true,
          disabled: false,
          align: "right",
          width: "13%",
        },
        {
          text: "Discount Amount",
          value: "discount_amount",
          show: true,
          disabled: false,
          align: "right",
          width: "13.5%",
        },
        {
          text: "Net Amount",
          value: "grand_total",
          show: true,
          disabled: false,
          align: "right",
          width: "12%",
        },
      ],
      salesList: [],
      shoperror: "",
      filter: {
        customer: "",
        biller: "",
        start: "",
        end: "",
        shop: "",
        saleType: "",
        product: "",
      },
    };
  },
  methods: {
     sumField(array, filed) {
      let value = 0;
      array.forEach((element) => {
        value += parseFloat(element[filed]);
      });
      return value;
    },
    generateReport() {
      var filter = this.filter;
      this.$store
        .dispatch("report/getSalesReports", filter)
        .then((res) => {
          this.salesList = res.data.data;
          this.total = this.sumField(this.salesList, "grand_total");
          this.grandTotal = this.sumField(this.salesList, "total");
          this.discountTotal = this.sumField(this.salesList, "discount_amount");
          let i = 1;
          this.salesList.map((p) => {
            p.no = i;
            i++;
          });
        })
        .catch((err) => {
          this.shoperror = err.data;
          this.isLoading = false;
          this.messages = err.data.title;
        });
    },
    //Product Details Export Pdf
    pdfdownload() {
      let Data = _.cloneDeep(this.salesList);
      for (let x = 0; x < Data.length; x++) {
        Data[x].date = moment(Data[x].date, "YYYY-MM-DD").format("DD/MM/YYYY");
        Data[x].customer = Data[x].customer.name;
        Data[x].biller = Data[x].biller.first_name;
      }
      var rows = Data;
      var doc = jsPDF({
        orientation: "landscape",
      });
      doc.setFontSize(14);
      // doc.setFontType("bold");
      doc.setTextColor(26, 26, 26);
      doc.setFont("helvetica", "bold");
      doc.text("Sales Report", 15, 5);

       doc.setFontSize(11);
        doc.text(15, 12, `${moment(today).format("DD-MM-YYYY HH:MM:SS")}`);
      doc.text(120, 10, `Total Amount :- ${this.total}.00`);
      doc.text(180, 10, `Grand Total :- ${this.grandTotal}.00`);
      doc.text(240, 10, `Discount Total :- ${this.discountTotal}.00`);

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
      doc.save(`${moment(today).format("DD-MM-YYYY")}-Sales.pdf`);
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
      XLSX.writeFile(wb, `${moment(today).format("DD-MM-YYYY")}-Sales.xlsx`);
    },
  },
  computed: {
    // Filter - return selected table fields
    headers: function () {
      return this.columns.filter((item) => item.show == true);
    },
  },
};
</script>
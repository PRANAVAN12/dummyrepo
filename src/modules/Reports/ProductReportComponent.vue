<template>
  <div>
    <PageTitle title="Product Reports" />
    <v-container fluid class="lighten-12 content">
      <v-card class="lighten-12 card-content">
        <TableFilters
          :filters="['brand', 'supplier', 'category']"
          :columns="columns"
          v-model="filter"
          :export="[`productexport`]"
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
                      @click="exportPDF()"
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
                  <span>Export to Excel</span>
                </v-tooltip></v-col
              >
            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <v-card class="mt-2">
        <v-container fluid>
          <v-row>
            <v-card-text class="pa-0">
              <v-data-table
                items-per-page="1000"
                :fixed-header="true"
                :headers="headers"
                :items="products"
                item-key="id"
                class="row-pointer product-list"
                id="indextable"
              >
                <template v-slot:item.code="{ item }">
                  <CopyTableCell :text="item.code"></CopyTableCell>
                </template>
                <!-- No -->

                <!-- Image -->
                <template v-slot:item.image="{ item }">
                  <img
                    v-if="item.image"
                    :src="item.image"
                    height="32"
                    width="32"
                    class="image"
                  />
                  <v-avatar v-else size="32px" item color="primary">
                    <span class="white--text subtitle-2 text-uppercase">
                      {{ item.name.substring(0, 2) }}</span
                    >
                  </v-avatar>
                </template>

                <!-- Category -->
                <template v-slot:item.category="{ item }">{{
                  item.category.name ? item.category.name : "-"
                }}</template>

                <!-- Brand -->
                <template v-slot:item.brand="{ item }">{{
                  item.brand.name ? item.brand.name : "-"
                }}</template>
              </v-data-table>
            </v-card-text>
          </v-row>
        </v-container>
      </v-card>
      <div class="d-flex justify-center align-center"></div>
      <!-- </v-row> -->
    </v-container>
  </div>
</template>

<script>
// Components
import PageTitle from "@/components/shared/PageTitle";
import TableFilters from "@/components/base/TableFilters";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import XLSX from "xlsx";
import { DateTime } from "@grapecity/wijmo";
import moment from "moment";
import _ from "lodash";
export default {
  data: () => ({
    columns: [
      {
        text: "Number",
        value: "no",
        show: true,
        disabled: false,
        width: "14%",
      },
      {
        text: "Name",
        value: "name",
        show: true,
        disabled: false,
        width: "14%",
      },
      {
        text: "Code",
        value: "code",
        show: true,
        disabled: false,
        width: "14%",
      },
      {
        text: "Category",
        value: "category",
        show: true,
        disabled: false,
        width: "14%",
      },
      {
        text: "Brand",
        value: "brand",
        show: true,
        disabled: false,
        width: "14%",
      },
    ],
    products: [],
    // Filters
    filter: {
      category: "",
      search: "",
      brand: "",
      status: "",
    },
  }),
  components: {
    PageTitle,
    TableFilters,
  },

  methods: {
    generateReport() {
      debugger;
      var filter = this.filter;
      this.$store
        .dispatch("report/getProductReports", filter)
        .then((res) => {
          let i = 1;
          this.products = res.data.data;
          this.products.map((p) => {
            p.no = i;
            i++;
          });
        })
        .catch((err) => {
          this.isLoading = false;
          this.messages = err.data.title;
        });
    },
    exportPDF() {
      let Data = _.cloneDeep(this.products);
      for (let x = 0; x < Data.length; x++) {
        Data[x].category = Data[x].category.name;
        Data[x].brand = Data[x].brand.name;
        Data[x].suppliers = Data[x].suppliers.map((i) => {
          return i.name;
        });
      }
      var rows = Data;
      var doc = jsPDF({
        orientation: "landscape",
      });
      doc.setFontSize(14);
      // doc.setFontType("bold");
      doc.setTextColor(26, 26, 26);
       doc.setFont("helvetica", "bold");
      doc.text("Product Report", 15, 5);

       doc.setFontSize(11);
        doc.text(15, 12, `${moment(today).format("DD-MM-YYYY HH:MM:SS")}`);

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
      doc.save(`${moment(today).format("DD-MM-YYYY")}-Product.pdf`);
    },
    //Product Details Export Excel
    exceldownload() {
      debugger;
      var data = document.getElementById("indextable");
      const today = new DateTime();
      const headData = XLSX.utils.table_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(
        wb,
        headData,
        moment(today).format("DD-MM-YYYY")
      );
      XLSX.writeFile(wb, `${moment(today).format("DD-MM-YYYY")}-Product.xlsx`);
    },
  },
  computed: {
    headers: function () {
      debugger;
      return this.columns.filter((item) => item.show == true);
    },
  },
};
</script>

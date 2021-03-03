<template>
  <div>
    <PageTitle title="Out Of Stock Report" />
    <v-container fluid class="lighten-12 content">
      <v-card class="lighten-12 card-content mb-2">
        <TableFilters
          :filters="['warehouse']"
          v-model="filter"
          :columns="columns"
           :export="[`outofstockexport`]"
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
              class="   report-button"
                color="blue"
              @click="generateReport(), (hide = !hide)"
              > <v-icon small>mdi-file-send </v-icon>Generate
             
            </v-btn>
          </template>
          <span>Genarate</span>
        </v-tooltip>
      </v-col>
      <v-col cols="12" sm="12" md="4" lg="2" v-if="hide" class="mx-lg-1 px-lg-1" 
        ><v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }"
            ><v-btn
              depressed
              v-bind="attrs"
              v-on="on"
              class="  report-button"
              color="red"
              height="30px"
              block
              @click="pdfdownload()"
              > <v-icon small>mdi-file-pdf </v-icon>Export
             
            </v-btn>
          </template>
          <span>Export to PDF</span>
        </v-tooltip></v-col
      >
      <v-col cols="12" sm="12" md="4" lg="2" class="mx-lg-0 px-lg-0"  v-if="hide">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            
            <v-btn
              height="30px"
              v-bind="attrs"
              v-on="on"
              block
              class="   report-button"
              color="green"
              @click="exceldownload()"
              >   <v-icon small>mdi-file-excel </v-icon>Export
           
            </v-btn>
          </template>
          <span>Export to Excel</span>
        </v-tooltip></v-col
      >
    </v-row>
        <v-col cols="12" sm="12" md="8" lg="8" class="mx-lg-1 px-lg-1">
     <div v-if="!filter.warehouse" class="warehouse-red">
    {{warehouseerror}}
    
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
                :headers="headers"
                :items="outofStockList"
                :single-expand="singleExpand"
                item-key="name"
                class="row-pointer"
                  id="indextable"
              >
               <template
                  v-slot:item.product="{ item }"
                  v-slot="{ errors }"
                  >{{ item.product.name }}</template
                >
                 <template
                  v-slot:item.wareHouse="{ item }"
                  v-slot="{ errors }"
                  >{{ item.wareHouse.name }}</template
                >
                 <template
                  v-slot:item.batch="{ item }"
                  v-slot="{ errors }"
                  >{{ item.batch.batch }}</template
                >
                 <template
                  v-slot:item.unit="{ item }"
                  v-slot="{ errors }"
                  >{{ item.unit.name }}</template
                >
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
      warehouseerror:"",
      columns: [
         {
        text: "Number",
        value: "no",
        show: true,
        disabled: false,
        width: "14%",
      },
        {
          text: "Product",
          value: "product",
          show: true,
          disabled: false,
          width: "14.2%",
        },
        {
          text: "Warehouse",
          value: "wareHouse",
          show: true,
          disabled: false,
          width: "14.2%",
        },
        {
          text: "Unit",
          value: "unit",
          show: true,
          disabled: false,
          align: "center",
          width: "14.2%",
        },
        {
          text: "Batch",
          value: "batch",
          show: true,
          disabled: false,
          align: "center",
          width: "14.2%",
        },
        {
          text: "Available Stock",
          value: "available_stock",
          show: true,
          disabled: false,
          align: "center",
          width: "14.2%",
        },
        {
          text: "Reorder Level",
          value: "reorder_level",
          show: true,
          disabled: false,
          align: "center",
          width: "14.2%",
        },
        {
          text: "Damage",
          value: "damage",
          show: true,
          disabled: false,
          align: "center",
          width: "14.2%",
        },
      ],
      outofStockList: [],
       filter: {
     warehouse:""
    },
    };
  },
  methods: {
    generateReport() {
      debugger;
      var filter = this.filter;
      this.$store
        .dispatch("report/getOutofStockReports", filter)
        .then((res) => {
          this.outofStockList = res.data.data;
           let i = 1;
            this.outofStockList.map((p) => {
            p.no = i;
            i++;
          });
        })
        .catch((err) => {
           this.warehouseerror=err.data
          this.isLoading = false;
          this.messages = err.data.title;
        });
    },

    //Product Details Export Pdf
    pdfdownload() {

      let Data = _.cloneDeep(this.outofStockList);
      for (let x = 0; x < Data.length; x++) {
        Data[x].product = Data[x].product.name;
        Data[x].wareHouse = Data[x].wareHouse.name;
        Data[x].batch = Data[x].batch.batch;
        Data[x].unit = Data[x].unit.name;
      }
      var rows = Data;
      var doc = jsPDF({
        orientation: "landscape",
      });
      doc.setFontSize(14);
      // doc.setFontType("bold");
      doc.setTextColor(26, 26, 26);
      doc.setFont("helvetica", "bold");
      doc.text("Out Of Stock Report", 15, 5);

       doc.setFontSize(11);
        doc.text(15, 12, `${moment(today).format("DD-MM-YYYY HH:MM:SS")}`);
      doc.autoTable( this.headers.map((h) => {
          return { title: h.text, dataKey: h.value };
        }),
        rows, {
        didParseCell: function(data) {
          if (data.column.dataKey === "addsress") {
            data.cell.text = data.cell.raw.country;
          }
        },
      });
      const today = new DateTime();
      doc.save(`${moment(today).format("DD-MM-YYYY")}-OutofStockReport.pdf`);
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
      XLSX.writeFile(
        wb,
        `${moment(today).format("DD-MM-YYYY")}-OutofStockReport.xlsx`
      );
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


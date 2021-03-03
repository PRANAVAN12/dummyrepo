<template>
  <!-- Table fields selector -->
  <div>
    <v-row class="py-0 my-0">
      
      
      <v-col cols="12" md="12" lg="7"  class="py-0 my-0"> 
        
         <v-row class="py-0 my-0">
      <v-col cols="12" sm="12" md="4" lg="2" >
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
              class="  report-button "
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
          <span>Export to Excel</span>l
        </v-tooltip></v-col
      >
    </v-row>
    <div v-if="!filter.shop" class="shop-red">
    {{shoperror}}
    </div>
    
    </v-col>
    
    
    </v-row>
    <v-data-table
      :headers="cvsexcel"
      id="indextable"
      :items="salesList"
      sort-by="calories"
      :search="search"
      :loading="loading"
      class="elevation-1"
      loading-text="Loading... Please wait"
      v-show="setDisable"
      items-per-page="1000"
    >
    </v-data-table>
  </div>
</template>
<script>
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import XLSX from "xlsx";
import { DateTime } from "@grapecity/wijmo";
import moment from "moment";
import _ from "lodash";
export default {
  data: () => ({
    hide:false,
    cvsexcel: [
      {
        text: "Date",
        value: "date",
      },
      {
        text: "Reference Number",
        value: "reference_number",
      },
      {
        text: "Biller",
        value: "biller.first_name",
      },
      {
        text: "Customer",
        value: "customer.name",
      },
      {
        text: "Total Items",
        value: "total_items",
      },
      {
        text: "Grand Total",
        value: "grand_total",
      },
    ],
    salesList:[],
    shoperror:""
  }),
  props: {
     output: {
      type: Array,
      default: {},
    },
    filter: {
      type: Array,
      default: [],
    },
  },
  methods: {
    //Date Format
    startDate(item) {
      return item ? moment(item).format("ll") : "-";
    },

     emit(data) {
      this.$emit("emit", data);
    },
    generateReport() {
      debugger
      var filter = this.filter;
      this.$store
        .dispatch("report/getSalesReports", filter)
        .then((res) => {
          debugger
          this.salesList = res.data.data;
          this.emit(res.data.data);
        })
        .catch((err) => {
          this.shoperror = err.data
          this.isLoading = false;
          this.messages = err.data.title;
        });
    },
    //Product Details Export Pdf
    pdfdownload() {
      var columns = [
        { title: "Date", dataKey: "date" },
        { title: "Reference Number", dataKey: "reference_number" },
        { title: "Biller", dataKey: "biller" },
        { title: "Customer", dataKey: "customer" },
        { title: "Total Items", dataKey: "total_items" },
        { title: "Grand Total", dataKey: "grand_total" },
      ];
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
      doc.setFontSize(20);
      // doc.setFontType("bold");
      doc.setTextColor(26, 26, 26);
      doc.text("Sales Reports", 120, 10);

      doc.autoTable(columns, rows, {
        didParseCell: function (data) {
          if (data.column.dataKey === "addsress") {
            data.cell.text = data.cell.raw.country;
          }
        },
      });
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
    buttonWidth: {
      get: function () {
        switch (this.$vuetify.breakpoint.name) {
          case "xs":
            return "100%";
          case "sm":
            return "100%";
          case "md":
            return "60%";
          case "lg":
            return "60%";
          case "xl":
            return "60%";
        }
      },
    },
  },
};
</script>
<style >
.report-button{
font-size: 12px !important;
color:white !important;
}
.shop-red {
  color: red;
}
@media (min-width: 1264px){
  .v-application .mx-lg-1 {
    margin-right: 30px !important;
    margin-left: 16px !important;
 }
.v-application .px-lg-1 {
    padding-right: 4px !important;
    padding-left: 20px !important;
}

}
</style>
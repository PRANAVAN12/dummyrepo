<template>
  <div>
    <header class="clearfix">
      <div id="supplier">
        <div
          id="company"
          class="clearfix d-flex"
          style="width: 210mm; height: 297mm"
        >
          <!-- <div
            class="d-flex"
            v-for="(r, i) in parseInt(printbarcode.noOfBarcode)"
            :key="i"
            :style="`display:flex;`"
          >
            <div :style="'border:2px solid black;width:'+printbarcode.width+'mm;height:'+printbarcode.height+'mm'">
              <Barcode datas.barcodeNumber :barcode-value="barcode.barcode" />

              <div align="center" justify="center" v-if="datas.name">
                Name: {{ product.name }}
              </div>
              <div justify="center" align="center" v-if="datas.price">
                Price: Rs. {{ selectedbarcode.sellingPrice }}
              </div>
            </div>
          </div> -->
          <div
            class="d-flex"
            v-for="(r, i) in parseInt(noOfRows)"
            :key="i"
            :style="`display:flex;`"
          >
            <div v-for="(column, index) in parseInt(noOfColumns)" :key="index">
              <div
                v-if="i * noOfColumns + index < printbarcode.noOfBarcode"
                class="boxbarcode"
                :style="`height:${printbarcode.height}mm;width:${printbarcode.width}mm;`"
              >
                <Barcode datas.barcodeNumber :barcode-value="barcode.barcode" />

                <div align="center" justify="center" v-if="datas.name">
                  Name: {{ product.name }}
                </div>
                <div justify="center" align="center" v-if="datas.price">
                  Price: Rs. {{ selectedbarcode.sellingPrice }}
                </div>
                <div justify="center" align="center" v-if="datas.batch">
                  <div v-for="batch in product.batches" :key="batch">
                    Batch: {{ batch.batch }}
                  </div>
                </div>
                <div justify="center" align="center" v-if="datas.orgname">
                  {{ organization.name }}
                </div>
                <div justify="center" align="center" v-if="datas.orgaddress">
                  {{ organization.address }}
                </div>
                <div justify="center" align="center" v-if="datas.orgphone">
                  {{ organization.phone_number }}/ {{ organization.Tel_phone_number }}
                </div>
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
    </header>
    <!-- <footer>
      Invoice was created on a computer and is valid without the signature and
      seal.
    </footer> -->
  </div>
</template>
<script>
import { numeric } from "vee-validate/dist/rules";
export default {
  data: () => ({
    noOfColumns: 0,
    noOfRows: 0,
    columns: [],
    rows: [],
  }),
  props: {
    datas: {
      type: Object,
      default: {},
    },
    barcode: {
      type: Object,
      default: {},
    },
    printbarcode: {
      type: Number,
      default: {},
    },
    printview: {
      type: Object,
      default: {},
    },
    product: {
      type: Object,
      default: {},
    },
    organization:{
       type: Object,
      default: {},
    },
    selectedbarcode: {
      type: Number,
      default: {},
    },
  },
  methods: {
    setColumnsAndRows() {
      // alert(this.printbarcode.width)

      this.noOfColumns = (210 / this.printbarcode.width).toFixed();
      this.noOfRows = (297 / this.printbarcode.height).toFixed() + parseInt(1);
      // for (let index = 1; index < this.noOfColumns; index++) {
      //   let col = [];
      //   for (let i = 1; i < this.noOfRows; i++) {
      //     col.push(i);
      //   }
      //   this.rows.push(col);
      // }
    },
  },
  created() {
    this.setColumnsAndRows();
  },
  watch: {
    // printwidth: {
    //   handler(val) {
    //     this.setColumnsAndRows();
    //   },
    //   deep: true,
    // },
    // searchCategory: {
    //   handler(val) {
    //     this.GetProductCategoriesByQuery(val);
    //   },
    //   deep: true,
    // },
    printbarcode: {
      handler(val) {
        this.setColumnsAndRows();
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
.clearfix:after {
  content: "";
  display: table;
  clear: both;
}

.boxbarcode {
  border: 2px solid gray;
  margin: 0;
}
a {
  color: #5d6975;
  text-decoration: underline;
}

body {
  position: relative;
  width: 22cm;
  height: 29.7cm;
  margin: 0 auto;
  color: #001028;
  background: #ffffff;
  font-size: 14px;
}
table,
td,
th {
  border: 1.5px solid black;
}

table {
  border-collapse: collapse;
  width: 100%;
}
@media print {
  @page {
    size: A4;
  }
}

header {
  padding: 10px 0;
  margin-bottom: 30px;
}

#logo {
  text-align: center;
  margin-bottom: 10px;
}

#logo img {
  width: 90px;
}

h1 {
  border-top: 1px solid #5d6975;
  border-bottom: 1px solid #5d6975;
  color: #5d6975;
  font-size: 2.4em;
  line-height: 1.4em;
  font-weight: normal;
  text-align: center;
  margin: 0 0 20px 0;
}

#supplier {
  float: left;
}

#supplier span {
  color: #5d6975;
  width: 60px;
  display: inline-block;
  font-size: 0.8em;
  margin-right: 20px;
}

#company {
  float: right;
  text-align: right;
  border-radius: 25px;
}

#supplier div,
#company div {
  white-space: nowrap;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  margin-bottom: 20px;
}

table tr:nth-child(2n-1) td {
  background: #f5f5f5;
}

table th,
table td {
  text-align: center;
}

table th {
  padding: 5px 20px;
  color: #5d6975;
  border-bottom: 1px solid #c1ced9;
  white-space: nowrap;
  font-weight: bold;
}

table .code,
table .name {
  text-align: left;
}

table td {
  padding: 20px;
  text-align: center;
}


table td.code,
table td.name {
  vertical-align: top;
}

table td.grand {
  border-top: 1px solid #5d6975;
}

#notices .notice {
  color: #5d6975;
  font-size: 1.2em;
}

footer {
  color: #5d6975;
  width: 100%;
  height: 30px;
  position: absolute;
  bottom: 0;
  border-top: 1px solid #c1ced9;
  padding: 8px 0;
  text-align: center;
}
</style>

<template>
  <div>
    <header class="clearfix">
      <div id="logo">
        <!-- <img src="logo.png" /> -->
      </div>
      <h1>Purchase Returns</h1>
      <div id="company" class="clearfix">
        <div>Gomyshopper</div>
        <div>
         {{datas.warehouses.address}}
        </div>
        <div> {{datas.warehouses.phone}}</div>
        <div>
          <a href="mailto:company@example.com">@gomyshopper.com</a>
        </div>
      </div>
      <div id="supplier">
        <div><span>Reference no</span>{{ datas.referencenumber }}</div>
        <div><span>Supplier Name</span>{{ datas.suppliers.name }}</div>
        <div><span>Warehouse</span>{{ datas.warehouses.name }}</div>
        <div><span>Purchase Date</span>{{ datas.date }}</div>
      </div>
    </header>

    <main>

      <table>
        <thead>
          <tr>
            <th class="code">Code</th>
            <th class="name">Name</th>
            <th>Batches</th>
            <th>QTY</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data" :key="item">
            <td class="code">{{ item.code }}</td>
            <td class="name">{{ item.name }}</td>
            <td>{{ item.selectedBatch.name}}</td>
            <td class="unit">{{ item.quantity }}</td>
            <td class="unit">{{ item.unit.name }}</td>
          </tr>
        </tbody>
      </table>

      <v-row>
        <v-col cols="8">
          <p>............................</p>
          <p>Signature</p>
        </v-col>
        <v-col class="left ml-5" cols="4">
          <p>............................</p>
          <p>Date</p>
        </v-col>
      </v-row>
      <!-- 
      <div id="notices">
        <div>NOTICE:</div>
        <div class="notice">
          A finance charge of 1.5% will be made on unpaid balances after 30
          days.
        </div>
      </div> -->
    </main>
    <footer>
      Invoice was created on a computer and is valid without the signature and
      seal.
    </footer>
  </div>
</template>
<script>
export default {
  data: () => ({
    // purchaseorderheaders: [
    //   { text: "Code", value: "code", align: "center" },
    //   { text: "Name", value: "name", align: "center" },
    //   { text: "Unit", value: "unit.name", align: "center" },
    //   { text: "Qty", value: "quantity", align: "center" },
    // ],
  }),
  props: {
    datas: {
      type: Object,
      default: {},
    },
    data: {
      type: Object,
      default: {},
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

<template>
  <div>
    <header class="clearfix">
      <v-row>
        <v-col cols="6">
          <v-row v-if="purchaseOrder.organization">
            <v-col
              class="py-0"
              cols="12"
              style="display: flex; align-items: center; padding-bottom: 0px"
            >
              <div v-if="purchaseOrder.organization && purchaseOrder.organization.image">
                <img class="logo" :src="purchaseOrder.organization.image" />
              </div>
              <div class="organization-title">
                <h2 class="d-flex justify-center">
                  {{ purchaseOrder.organization.name }}
                </h2>
              </div>
            </v-col>
            <v-col cols="12" v-if="purchaseOrder.organization" class="py-0">
              <div>{{ purchaseOrder.organization.address }}</div>
              <div>{{ purchaseOrder.organization.email }}</div>
              <div>{{ purchaseOrder.organization.Tel_phone_number }}</div>
              <div>{{ purchaseOrder.organization.website }}</div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row v-if="purchaseOrder.organization">
            <v-col class="py-0" cols="12">
              <h2 class="text-align-right">Purchase Order</h2></v-col
            >
          </v-row>
          <v-row v-if="purchaseOrder.organization">
            <v-col
              class="py-0 padding-top-0"
              cols="4"
              style="display: flex; padding: 0px"
            >
            </v-col>
            <v-col
              class="py-0 padding-top-0 d-flex full-width"
              style="display: flex; padding: 0px"
              cols="8"
            >
              <div class="d-flex justify-start full-width">Order No :</div>
              <div
                class="d-flex justify-end full-width"
                style="display: flex; justify-content: right"
              >
                {{ purchaseOrder.reference_number }}
              </div>
            </v-col>
          </v-row>

          <v-row v-if="purchaseOrder.organization">
            <v-col
              class="py-0 padding-top-0"
              cols="4"
              style="display: flex; padding: 0px"
            >
            </v-col>
            <v-col
              class="py-0 padding-top-0 d-flex full-width"
              style="display: flex; padding: 0px"
              cols="8"
            >
              <div class="d-flex justify-start full-width">Date :</div>
              <div
                class="d-flex justify-end full-width"
                style="display: flex; justify-content: right"
              >
                {{ purchaseOrder.date }}
              </div>
            </v-col>
          </v-row>
          <div></div>
        </v-col>
      </v-row>

      <v-row> </v-row>

      <v-row class="d-flex justify-space-between">
        <v-col cols="6" class="labels" v-if="purchaseOrder.supplier &&  purchaseOrder.suppliers.addresses.length>0 && purchaseOrder.suppliers.contact.length>0">
          <div><strong>Vendor : {{ purchaseOrder.suppliers.name }}</strong></div>
          <div></div>
          <div>{{ purchaseOrder.suppliers.addresses[0].address_line1 }},</div>
          <div>{{ purchaseOrder.suppliers.addresses[0].address_line2 }},</div>
          <div>{{ purchaseOrder.suppliers.addresses[0].city }},</div>
          <div>{{ purchaseOrder.suppliers.addresses[0].postal_code }}.</div>
          <div>{{ purchaseOrder.suppliers.contact[0].telephone }}</div>
        </v-col>

        <v-col cols="6" class="labels" v-if="purchaseOrder.warehouse">
          <div><strong>Ship To : {{ purchaseOrder.warehouse.name }}</strong></div>
          <div></div>
          <div>
            {{ purchaseOrder.warehouse.address }}
          </div>
          <div>
            {{ purchaseOrder.warehouse.phone }}
          </div>
        </v-col>
      </v-row>
    </header>

    <main>
      <table>
        <thead>
          <tr>
            <th class="code">Code</th>
            <th class="name">Name</th>
            <th>Unit</th>
            <th>QTY</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data" :key="item">
            <td class="code">{{ item.code }}</td>
            <td class="name">{{ item.name }}</td>
            <td class="unit">{{ item.unit.name }}</td>
            <td class="unit">{{ item.quantity }}</td>
          </tr>
        </tbody>
      </table>

      <v-row>
        <v-col cols="9"> </v-col>
        <v-col class="left padding-bottom-0" cols="3">
          <p>............................</p>
          <p>Date</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="9" class="padding-bottom-0">
          <p>............................</p>
          <p>Prepared By</p>
        </v-col>
        <v-col class="left padding-bottom-0" cols="3">
          <p>............................</p>
          <p>Authorized By</p>
        </v-col>
      </v-row>
    </main>
    <footer>
      <!-- Invoice was created on a computer and is valid without the signature and
      seal. -->
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
    Warehousedatas: {
      type: Object,
      default: {},
    },
    purchaseOrder: {
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
.organization-title {
  margin-left: 10px;
}
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
  color: rgb(108, 106, 106);
  background: #ffffff;
  font-size: 14px;
}
table,
td,
th {
  border: 1.5px solid rgb(108, 106, 106);
}

td {
  padding: 5px 20px !important;
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

.logo {
  height: 40px;
  width: 40px;
}
.head2 {
  text-align: right;
}
#logo img {
  width: 90px;
}
.head {
  border-top: 1px solid #5d6975;
  border-bottom: 1px solid #5d6975;
  margin: 0 0 20px 0;
}
.header {
  color: #5d6975;
  font-size: 2.4em;
  line-height: 1.4em;
  font-weight: normal;
  text-align: left;
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

.labels span {
  color: #5d6975;
  font-size: 0.8em;
  margin-right: 2px;
}

#company span {
  color: #5d6975;
  font-size: 0.8em;
  width: 60px;
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
.padding-bottom-0 {
  padding-bottom: 0px;
}

.padding-top-0 {
  padding-top: 0px;
}

.padding-top-25 {
  padding-top: 25px;
}

.text-align-right {
  text-align: right;
}

.text-align-center {
  text-align: center;
}

.full-width {
  width: 100%;
}
</style>

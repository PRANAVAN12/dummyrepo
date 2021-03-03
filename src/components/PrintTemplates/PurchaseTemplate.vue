<template>
  <div>
    <header class="clearfix">
      <v-row>
        <v-col cols="6">
          <v-row v-if="purchase.organization">
            <v-col
              class="py-0"
              cols="12"
              style="display: flex; align-items: center; padding-bottom: 0px"
            >
              <div v-if="purchase.organization && purchase.organization.image">
                <img class="logo" :src="purchase.organization.image" />
              </div>
              <div class="organization-title">
                <h2 class="d-flex justify-center">
                  {{ purchase.organization.name }}
                </h2>
              </div>
            </v-col>
            <v-col cols="12" v-if="purchase.organization" class="py-0">
              <div>{{ purchase.organization.address }}</div>
              <div>{{ purchase.organization.email }}</div>
              <div>{{ purchase.organization.Tel_phone_number }}</div>
              <div>{{ purchase.organization.website }}</div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row v-if="purchase.organization">
            <v-col class="py-0" cols="12">
              <h2 class="text-align-right">Purchase</h2></v-col
            >
          </v-row>
          <v-row v-if="purchase.organization">
            <v-col
              class="py-0 padding-top-0"
              cols="3"
              style="display: flex; padding: 0px"
            >
            </v-col>
            <v-col
              class="py-0 padding-top-0 d-flex full-width"
              style="display: flex; padding: 0px;display: flex; justify-content: right"
              cols="6"
            >
              <!-- <div class="d-flex justify-start full-width">Ref No :</div> -->
              <div
                class="d-flex justify-end full-width"
                style="display: flex; justify-content: right"
              >
              Ref No :
                {{ purchase.referenceNumber }}
              </div>
            </v-col>
          </v-row>

          <v-row v-if="purchase.organization">
            <v-col
              class="py-0 padding-top-0"
              cols="3"
              style="display: flex; padding: 0px"
            >
            </v-col>
            <v-col
              class="py-0 padding-top-0 d-flex full-width"
              style="display: flex; padding: 0px;display: flex; justify-content: right"
              cols="6"
            >
              <!-- <div class="d-flex justify-start full-width">Date :</div> -->
              <div
                class="d-flex justify-end full-width"
                style="display: flex; justify-content: right"
              >
              Date :  {{ purchase.date | formatDate }}
              </div>
            </v-col>
          </v-row>

          <v-row></v-row>

          <div></div>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-space-between">
        <v-col
          cols="6"
          class="labels"
          v-if="
            purchase.supplier &&
            purchase.suppliers.addresses.length > 0 &&
            purchase.suppliers.contact.length > 0
          "
        >
          <div>
            <strong>Vendor : {{ purchase.suppliers.name }}</strong>
          </div>
          <div></div>
          <div>{{ purchase.suppliers.addresses[0].address_line1 }},</div>
          <div>{{ purchase.suppliers.addresses[0].address_line2 }},</div>
          <div>{{ purchase.suppliers.addresses[0].city }},</div>
          <div>{{ purchase.suppliers.addresses[0].postal_code }}.</div>
          <div>{{ purchase.suppliers.contact[0].telephone }}</div>
        </v-col>

        <v-col cols="6" class="labels" v-if="purchase.warehouse">
          <div>
            <strong>Warehouse : {{ purchase.warehouse.name }}</strong>
          </div>
          <div></div>
          <div>
            {{ purchase.warehouse.address }}
          </div>
          <div>
            {{ purchase.warehouse.phone }}
          </div>
        </v-col>
      </v-row>
    </header>

    <main>
     

      <table>
        <thead>
          <tr>
            <th style="width:15% !important">Name</th>
            <!-- <th class="name">Batch</th> -->
            <th style="width:15%">Unit</th>
            <th style="width:6%">Qty</th>
            <th style="width:10%">Unit Cost</th>
            <th style="width:6%">Discount %</th>
            <th style="width:10%">Discount Amount</th>
            <th style="width:10%">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in purchaseProducts" :key="item">
            <td>{{ item.name }}</td>
            <!-- <td class="name">{{ item.batch.name }}</td> -->
            <td>{{ item.unit.name }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.unitPrice }}</td>
            <td>{{ item.discountPercentage }} %</td>
            <td><strong class="px-4">{{ item.discountAmount | formatCurrency }}</strong></td>
            <td><strong class="px-4">{{ item.amount | formatCurrency }}</strong></td>
          </tr>
          <tr class="black--text">
            <td class="hide"></td>
            <td class="hide"></td>
            <td class="hide"></td>
            <td class="hide"></td>
            <td class="hide"></td>


            <td><strong class="text-dark">Total</strong></td>
            <td class="hide">{{total}}</td>
            <!-- <td></td> -->
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
     purchaseorderheaders: [
      { text: "Name", value: "name", sortable: false, width: "20" },
      { text: "Batch", value: "batch.name", sortable: false, width: "20" },
      { text: "Unit", value: "unit.name", sortable: false, width: "20" },
      {
        text: "Unit Cost",
        value: "unitPrice",
        align: "center",
        width: "10%",
      },
      {
        text: "Discount %",
        value: "discountPercentage",
        sortable: false,
        width: "10%",
      },
      {
        text: "Qty",
        value: "quantity",
        sortable: false,
        align: "center",
        width: "10",
      },
      {
        text: "Discount Qty",
        value: "discount",
        sortable: false,
        align: "center",
        width: "10",
      },
      {
        text: "Damage Qty",
        value: "damage",
        sortable: false,
        align: "center",
        width: "10",
      },

      {
        text: "Discount Amount",
        value: "discountAmount",
        align: "right",
        width: "15%",
      },
      {
        text: "Total",
        value: "total",
        sortable: false,
        align: "right",
        width: "10",
      },
    ],
    // purchaseheaders: [
    //   { text: "Code", value: "code", align: "center" },
    //   { text: "Name", value: "name", align: "center" },
    //   { text: "Unit", value: "unit.name", align: "center" },
    //   { text: "Qty", value: "quantity", align: "center" },
    // ],
  }),
  props: {
    purchase: {
      type: Object,
      default: {},
    },
    purchaseProducts: {
      type: Array,
      default: [],
    },
    total: {
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
  font-size: 12px;
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

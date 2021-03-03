<!-- *************************************************************************
	TEMPLATE
	************************************************************************* -->
<template>
  <div>
    <PageTitle
      title="Supplier View"
      :backBtn="true"
      :editRoute="'/supplier/edit/' + this.$route.params.id"
      :permission="'Supplier Edit'"
    />

    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="4">
          <v-card class="lighten-12" height="100%">
            <v-card-title>General </v-card-title>
            <v-container fluid>
              <v-row>
               
                <v-col cols="6" sm="6" md="6" lg="6">
                  <h4>Reference Number</h4></v-col
                >
                <v-col cols="6" sm="6" md="6" lg="6"
                  ><v-chip label>{{ this.reference_number }}</v-chip></v-col
                >

                <v-col cols="6" sm="6" md="6" lg="6"> <h4>Code</h4></v-col>
                <v-col cols="6" sm="6" md="6" lg="6"
                  ><v-chip label>{{ this.code }}</v-chip></v-col
                >

                <v-col cols="6" sm="6" md="6" lg="6"> <h4>Name</h4></v-col>
                <v-col cols="6" sm="6" md="6" lg="6"
                  ><v-chip label>{{ this.name }}</v-chip></v-col
                >
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="12" lg="8">
          <v-card class="lighten-12">
            <v-card-title>Address </v-card-title>
            <v-container fluid>
              <v-row v-for="item in addresses" :key="item.message">
                <v-progress-linear
                  v-if="addresses[0] !== item"
                  background-color="#968e8e"
                ></v-progress-linear>
                <v-col>
                  <v-row>
                    <v-col cols="6" sm="6" md="6" lg="3" >
                      <h4>Address Line1:</h4>
                    </v-col>
                    <v-col cols="6" sm="6" md="6" lg="3">
                      <v-chip label>
                        {{ item.address_line1 ? item.address_line1 : "----" }}
                      </v-chip>
                    </v-col>

                    <v-col cols="6" sm="6" md="6" lg="3">
                      <h4>Address Line2 :</h4>
                    </v-col>
                    <v-col cols="6" sm="6" md="6" lg="3">
                      <v-chip label>
                        {{ item.address_line2 }}
                      </v-chip>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6" sm="6" md="6" lg="3">
                      <h4>City :</h4>
                    </v-col>
                    <v-col cols="6" sm="6" md="6" lg="3">
                      <v-chip label>{{ item.city }}</v-chip>
                    </v-col>

                    <v-col cols="6" sm="6" md="6" lg="3">
                      <h4>Postal Code :</h4>
                    </v-col>
                    <v-col cols="6" sm="6" md="6" lg="3">
                      <v-chip label>{{ item.postal_code }}</v-chip>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6" sm="6" md="6" lg="3">
                      <h4>Country :</h4></v-col
                    >
                    <v-col cols="6" sm="6" md="6" lg="3">
                      <v-chip label>{{ item.country.name }}</v-chip>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
                <v-row v-if="addresses.length==0">
                <div  v-if="addresses.length==0" class="mt-16 container justify-center item-center">
                  <img
                      style="height: 100px;"
                      src="../../../assets/img/01.gif"
                  />
                </div>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      <v-col cols="12" sm="6" md="12" lg="4">
          <v-card class="lighten-12" height="100%">
            <v-card-title>Payment Details</v-card-title>
            <v-container fluid>
              <v-row>
                <v-col cols="6" sm="6" md="6" lg="6">
                  <h4>Payable Balance</h4></v-col
                >
                <v-col cols="6" sm="6" md="6" lg="6">
                  <v-chip label>{{ (-(this.AccountDetails.available_balance))|formatCurrency }}</v-chip></v-col
                >
              </v-row>

            </v-container>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="12" lg="8">
          <v-card class="lighten-12">
            <v-card-title>Contacts</v-card-title>
            <v-container fluid>
              <v-row v-for="item in contacts" :key="item.message">
                <v-progress-linear
                  v-if="contacts[0] !== item"
                  background-color="#968e8e"
                ></v-progress-linear>
                <v-col>
                  <v-row>
                    <v-col cols="6" sm="6" md="6" lg="3">
                      <h4>Full Name </h4>
                    </v-col>
                    <v-col cols="6" sm="6" md="6" lg="3">
                      <v-chip label>
                        {{ item.full_name ? item.full_name : null }}
                      </v-chip>
                    </v-col>

                    <v-col cols="6" sm="6" md="6" lg="3">
                      <h4>Telephone </h4>
                    </v-col>
                    <v-col cols="6" sm="6" md="6" lg="3">
                      <v-chip label>{{ item.telephone }}</v-chip>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6" sm="6" md="12" lg="3">
                      <h4>Phone </h4>
                    </v-col>
                    <v-col cols="6" sm="6" md="6" lg="3">
                      <v-chip label>{{ item.phone }}</v-chip>
                    </v-col>

                    <v-col cols="6" sm="6" md="6" lg="3">
                      <h4>Email </h4>
                    </v-col>
                    <v-col cols="6" sm="6" md="6" lg="3">
                      <v-chip label>{{ item.email }}</v-chip>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
                <v-row v-if="contacts.length==0">
                <div  v-if="addresses.length==0" class="mt-16 container justify-center item-center">
                  <img
                      style="height: 100px;"
                      src="../../../assets/img/01.gif"
                  />
                </div>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>

      <v-tabs horizontal background-color="primary" dark>
        <v-tab> Products </v-tab>
        <v-tab> Bank Details </v-tab>
        <v-tab> Purchases </v-tab>
        <v-tab> Purchase Order </v-tab>
        <v-tab> Purchase Return </v-tab>
         <v-tab> Payments </v-tab>
         

        <v-tab-item>
          <SupplierProductList />
        </v-tab-item>
        <v-tab-item>
          <SupplierBankList />
        </v-tab-item>
        <v-tab-item>
          <SupplierPurchaseList />
        </v-tab-item>
        <v-tab-item>
          <SupplierPurchaseOrderList />
        </v-tab-item>
        <v-tab-item>
          <SupplierPurchaseReturnList />
        </v-tab-item>
        <v-tab-item>
          <SupplierPaymentsList />
        </v-tab-item>
      </v-tabs>
    </v-container>
  </div>
</template>

<!-- *************************************************************************
	SCRIPT
	************************************************************************* -->
<script>
//COMPONENTS
import SupplierPurchaseOrderList from "./SupplierPurchaseOrderList";
import SupplierProductList from "./SupplierProductList";
import SupplierPurchaseList from "./SupplierPurchaseList";
import SupplierPurchaseReturnList from "./SupplierPurchaseReturnList";
import SupplierBankList from "./SupplierBankList";
import SupplierPaymentsList from "./SupplierPaymentsList";


export default {
  data() {
    return {
      name: "",
      code: "",
      reference_number: "",
      addresses: "",
      contacts: "",
      maximum_credit_amount: "",
      payment_team: "",
    };
  },

  components: {
    SupplierPurchaseOrderList,
    SupplierProductList,
    SupplierPurchaseList,
    SupplierPurchaseReturnList,
    SupplierBankList,
      SupplierPaymentsList

  },
  methods: {
    GetSupplier() {
      let supplierId = this.$route.params.id;
      this.$store
        .dispatch("supplier/GetSupplier", supplierId)
        .then((item) => {
          console.log(item);
          this.name = item.data.name ? item.data.name : "----";
          this.code = item.data.code ? item.data.code : "----";
            this.AccountDetails=item.data.account;
          this.reference_number = item.data.reference_number
            ? item.data.reference_number
            : "----";
          this.addresses = item.data.addresses ? item.data.addresses : "----";
          this.contacts = item.data.contact;
          this.maximum_credit_amount = item.data.maximum_credit_amount
            ? item.data.maximum_credit_amount
            : "------";
          this.payment_team = item.data.payment_team
            ? item.data.payment_team
            : "------";
        })
        .catch((err) => {
          this.messages = err.data.title;
        });
    },
  },
  created() {
    this.GetSupplier();
  },
};
</script>
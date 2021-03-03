<!-- *************************************************************************
	TEMPLATE
	************************************************************************* -->
<template>
  <div>
    <PageTitle
      title="Customer View"
      :backBtn="true"
      :editRoute="'/customer/edit/' + this.$route.params.id"
      :permission="'Customer Edit'"
    />
    <v-container fluid>
      <v-row>
        <v-col cols="8">
        <v-col cols="12" sm="12" md="12" lg="12">
          <v-card class="lighten-12" height="100%">
            <v-card-title>General</v-card-title>
            <v-container fluid>
              <v-row>
                <v-col cols="6" sm="6" md="6" lg="6">
                  <h4>Reference Number</h4>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="86">
                  <v-chip label>{{ this.reference_number }}</v-chip>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6" sm="6" md="6" lg="6"> <h4>Name</h4> </v-col>
                <v-col cols="6" sm="6" md="6" lg="6">
                  <v-chip label>{{ this.name }}</v-chip>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" sm="6" md="6" lg="6">
                  <h4>Customer Type</h4>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="6">
                  <v-chip label>{{ this.customerType }}</v-chip>
                </v-col>
              </v-row>
            </v-container>
          </v-card>

          <v-card class="lighten-12 mt-5" v-if="false">
            <v-card-title>Credit Details</v-card-title>
            <v-container fluid>
              <v-row>
                <v-col col="6">
                  <v-row>
                    <v-col cols="6" sm="6" md="6" lg="6">
                      <h4>Maximum Credit Amount</h4>
                    </v-col>
                    <v-col cols="6" sm="6" md="6" lg="6">
                      <v-chip class="ma-2" label>
                        {{ this.maximum_credit_amount }}
                      </v-chip>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6" sm="6" md="6" lg="6">
                      <h4>Payment Team(Days)</h4>
                    </v-col>
                    <v-col cols="6" sm="6" md="" lg="6">
                      <v-chip class="ma-2" label>{{
                        this.payment_team
                      }}</v-chip>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>

        <v-col cols="12" sm="12" md="12" lg="12">
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
                    <v-col cols="6" sm="6" md="6" lg="6">
                      <h4>Telephone</h4>
                    </v-col>
                    <v-col cols="6" sm="6" md="6" lg="6" hide-deatils="auto">
                      <v-chip label>{{ item.telephone }}</v-chip>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6" sm="6" md="6" lg="6">
                      <h4>Phone</h4>
                    </v-col>
                    <v-col cols="6" sm="6" md="6" lg="6">
                      <v-chip label>{{ item.phone }}</v-chip>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6" sm="6" md="6" lg="6">
                      <h4>Email</h4>
                    </v-col>
                    <v-col cols="6" sm="6" md="6" lg="6">
                      <v-chip label>{{ item.email }}</v-chip>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row v-if="contacts.length == 0">
                <div class="mt-16 container justify-center item-center">
                  <img
                    style="height: 100px;"
                    src="../../../assets/img/01.gif"
                  />
                </div>
              </v-row>
            </v-container>
          </v-card>
        </v-col>

</v-col>
<v-col cols="4" >
        <v-col cols="12" sm="12" md="12" lg="12">
          <v-card style="height:63vh" height="100%">
            <v-card-title>Image</v-card-title>
            <v-container>
              <v-img v-if="this.image" :src="this.image" > </v-img>
              <v-img
                v-else
                src="../../../assets/noimageavailable.png"
           
                
              >
              </v-img>
            </v-container>
          </v-card>
        </v-col>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="12">
          <v-card class="lighten-12">
            <v-card-title>Address</v-card-title>
            <v-container fluid>
              <v-row v-for="item in addresses" :key="item.message">
                <v-progress-linear
                  v-if="addresses[0] !== item"
                  background-color="#968e8e"
                ></v-progress-linear>

                <v-col cols="6" sm="6" md="6" lg="3">
                  <h4>Address Line1</h4></v-col
                >
                <v-col cols="6" sm="6" md="6" lg="3">
                  <v-chip label>
                    {{ item.address_line1 ? item.address_line1 : "----" }}
                  </v-chip>
                </v-col>

                <v-col cols="6" sm="6" md="6" lg="3">
                  <h4>Address Line2</h4></v-col
                >
                <v-col cols="6" sm="6" md="6" lg="3">
                  <v-chip label>
                    {{ item.address_line2 }}
                  </v-chip>
                </v-col>

                <v-col cols="6" sm="6" md="6" lg="3"> <h4>City</h4> </v-col>
                <v-col cols="6" sm="6" md="6" lg="3">
                  <v-chip label>{{ item.city }}</v-chip>
                </v-col>

                <v-col cols="6" sm="6" md="6" lg="3">
                  <h4>Postal Code</h4>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="3">
                  <v-chip label>{{ item.postal_code }}</v-chip>
                </v-col>

                <v-col cols="6" sm="6" md="6" lg="3"> <h4>Country</h4></v-col>
                <v-col cols="6" sm="6" md="6" lg="3">
                  <v-chip label>{{ item.country.name }}</v-chip>
                </v-col>
              </v-row>
              <v-row v-if="addresses.length == 0">
                <div class="mt-16 container justify-center item-center">
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
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="12">
          <v-card class="lighten-12">
            <v-tabs horizontal background-color="primary" dark>
              <v-tab> Sales </v-tab>
              <v-tab-item>
                <CustomerSalesList />
              </v-tab-item>
              <v-tab> Payments </v-tab>
              <v-tab-item>
                <CustomerPaymentList />
              </v-tab-item>
            </v-tabs>
          </v-card>
        </v-col>
      </v-row>

      <!-- <v-tabs horizontal background-color="primary" dark>
        <v-tab>History</v-tab>
        <v-tab>Reward Points</v-tab>
        <v-tab>Loyalty</v-tab>
        <v-tab>Sales</v-tab>

        <v-tab-item>
          <CustomerHistory />
        </v-tab-item>
        <v-tab-item>
          <CustomerRewardPoint />
        </v-tab-item>
        <v-tab-item>
          <CustomerLoyalty />
        </v-tab-item>
        <v-tab-item>
          <CustomerSale />
        </v-tab-item>
      </v-tabs> -->
    </v-container>
  </div>
</template>

<!-- *************************************************************************
	SCRIPT
	************************************************************************* -->
<script>
//COMPONENTS
import CustomerHistory from "./CustomerHistory";
import CustomerRewardPoint from "./CustomerRewardPoint";
import CustomerLoyalty from "./CustomerLoyalty";
import CustomerPaymentList from "./CustomerPaymentList";
import CustomerSalesList from "./CustomerSalesList";
export default {
  data() {
    return {
      name: "",
      code: "",
      reference_number: "",
      image: "",
      addresses: "",
      contacts: "",
      maximum_credit_amount: "",
      payment_team: "",
      customerType: "",
    };
  },

  components: {
    CustomerHistory,
    CustomerRewardPoint,
    CustomerLoyalty,
    CustomerPaymentList,
    CustomerSalesList,
  },
  methods: {
    GetCustomer() {
      let customerId = this.$route.params.id;
      this.$store
        .dispatch("customer/GetCustomer", customerId)
        .then((item) => {
          this.name = item.data.name ? item.data.name : "----";
          this.code = item.data.code ? item.data.code : "----";
          this.reference_number = item.data.reference_number
            ? item.data.reference_number
            : "----";
          this.addresses = item.data.addresses ? item.data.addresses : "----";
          this.contacts = item.data.contact;
          this.image = item.data.image;
          this.maximum_credit_amount = item.data.maximum_credit_amount
            ? item.data.maximum_credit_amount
            : "------";
          this.customerType = item.data.customerType.name
            ? item.data.customerType.name
            : "----";
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
    this.GetCustomer();
  },
};
</script>



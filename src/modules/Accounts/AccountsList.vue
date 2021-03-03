<!-- *************************************************************************
	TEMPLATE
	************************************************************************* -->
<template>
  <div>
    <PageTitle
        title="Accounts Details"
        :backBtn="true"
        :editRoute="'/supplier/edit/' + this.$route.params.id"
        :permission="'Supplier Edit'"
    />
    <v-container fluid>
      <v-tabs horizontal background-color="primary" dark>
        <v-tab> Company </v-tab>
        <v-tab> Supplier </v-tab>
        <v-tab> Customer </v-tab>


        <v-tab-item>
          <AccountDetailsTable  type-account="company"/>
        </v-tab-item>
        <v-tab-item>
          <AccountDetailsTable type-account="supplier" />
        </v-tab-item>
        <v-tab-item>
          <AccountDetailsTable type-account="customer" />
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

import AccountDetailsTable from "./AccountDetailsTable";

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
    AccountDetailsTable
  },
  methods: {

  },
  created() {
  },
};
</script>
<!-- *************************************************************************
	TEMPLATE
	************************************************************************* -->
<template>
  <div>
    <!-- <v-container fluid class="lighten-12 container"> -->
    <v-row>
      <v-col cols="12 py-0">
        <v-card>
          <v-container fluid>
            <v-row>
              <v-col cols="12" class="d-flex justify-end">
                <permission-control permissionName="Bank Details Create">
                  <v-btn
                    depressed
                    small
                    class="btn_blue w-100"
                    @click.stop="OpenModal()"
                  >
                    <v-icon class="icon_small ma-2">mdi-plus</v-icon>Add
                  </v-btn>
                </permission-control>
              </v-col>
            </v-row>
            <!-- <v-row> -->
            <!-- <v-col> -->
            <!-- Filters -->
            <v-row class="ma-0 align-right sub-section">
              <TableFilters
                :filters="['search']"
                v-model="filter"
                :columns="columns"
              ></TableFilters>
              <BankDetailsForm @afterSave="refreshData()" ref="paymentModal" />

              <EditBankDetails
                :visible="EditScheduleForm"
                :bankdetails="editbankdatails"
                @close="EditBankDetails($event)"
                @afterEdit="refreshData()"
              />
            </v-row>
            <!-- Data table -->

            <v-row>
              <v-col cols="12">
                <v-data-table
                  :items-per-page="paginationOptions.perPage"
                  :headers="headers"
                  :items="bankdetails"
                  :search="search"
                  :loading="loading"
                  loading-text="Loading... Please wait"
                  hide-default-footer
                >
                  <template v-slot:item.status="{ item }">
                    <v-chip
                      :x-small="true"
                      class="ma-2"
                      label
                      text-color="white"
                      :color="getStatusColor(item.is_active)"
                      dark
                      >{{ item.is_active ? "Active" : "Archieved" }}</v-chip
                    >
                  </template>

                  <template v-slot:footer="{}">
                    <paginationComponent
                      @paginationOptions="setPaginationOptions"
                      :url="'supplier/' + bankdetailsId + '/bank-details'"
                      @response="receiveBankdetailsResponse"
                      ref="bankDetails"
                      :filter="filter"
                    />
                  </template>

                  <template v-slot:item.action="{ item }">
                    <v-menu offset-y transition="scroll-y-transition">
                      <template v-slot:activator="{ attrs, on }">
                        <v-icon v-bind="attrs" v-on="on"
                          >mdi-dots-vertical</v-icon
                        >
                      </template>
                      <v-list class="actions">
                        <permission-control permissionName="Bank Details Edit">
                          <v-list-item @click.stop="EditModal(item)" link>
                            <span>
                              <v-icon v-bind="attrs" v-on="on"
                                >mdi-pencil-box-outline</v-icon
                              >Edit
                            </span>
                          </v-list-item>
                        </permission-control>
                        <permission-control
                          permissionName="Bank Details Soft Delete"
                        >
                          <v-list-item
                            @click.stop="openConfirmation(item)"
                            link
                          >
                            <span>
                              <v-icon v-bind="attrs" v-on="on">
                                {{
                                  item.is_active
                                    ? "mdi-archive"
                                    : "mdi-checkbox-marked-circle"
                                }}
                              </v-icon>
                              {{ item.is_active ? "Archieve" : "Active" }}
                            </span>
                          </v-list-item>
                        </permission-control>
                      </v-list>
                    </v-menu>
                  </template>
                </v-data-table></v-col
              >
            </v-row>
            <!-- </v-col> -->
            <!-- </v-row> -->
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <!-- </v-container> -->
  </div>
</template>

<!-- *************************************************************************
	SCRIPT
	************************************************************************* -->

<script>
import BankDetailsForm from "./SupplierBankDetailsCreateModal";
import TableFilters from "@/components/base/TableFilters";
import EditBankDetails from "./SupplierBankDetailsEditModal";
import { BankDetails } from "../../../models/BankDetails";
import confirmation from "../../shared/components/confirmation";
import paginationComponent from "../../shared/components/pagination.vue";

import _ from "lodash";
export default {
  data: () => ({
    paginationOptions: {},
    EditScheduleForm: false,
    loading: true,
    search: "",
    bankdetails: [],
    editbankdatails: new BankDetails(),
    columns: [
      {
        text: "Bank",
        value: "bank_name",
        align: "left",
        show: true,
        disabled: false,
      },
      {
        text: "Branch",
        value: "brange",
        align: "left",
        show: true,
        disabled: false,
      },
      {
        text: "Account Holder",
        value: "acount_holder_name",
        align: "left",
        show: true,
        disabled: false,
      },
      {
        text: "Account",
        value: "account_no",
        align: "left",
        show: true,
        disabled: false,
      },
      {
        text: "Status",
        value: "status",
        show: true,
        disabled: false,
        align: "center",
        width: "10%",
      },
      {
        text: "Actions",
        value: "action",
        show: true,
        disabled: false,
        align: "center",
        width: "10%",
      },
    ],
    filter: {
      search: "",
    },
  }),
  methods: {
    setPaginationOptions(data) {
      this.paginationOptions = data;
    },
    refreshData() {
      this.$refs.bankDetails.refreshData();
    },
    refreshEditData() {
      this.$refs.bankDetails.refreshEditData();
    },
    receiveBankdetailsResponse(bankdetails) {
      this.bankdetails = bankdetails;
      this.loading = false;
    },
    OpenModal() {
      this.$refs.paymentModal.openModal();
    },
    EditModal(data) {
      this.EditScheduleForm = true;
      this.editbankdatails = _.cloneDeep(data);
    },
    EditBankDetails($event) {
      this.EditScheduleForm = false;
    },
    // GetBankDetails() {
    //   var id = this.$route.params.id;
    //   this.$store
    //     .dispatch("supplier/GetSupplierBankDetails", id)
    //     .then((res) => {
    //       this.bankdetails = res.data.data;
    //       this.loading = false;
    //     })
    //     .catch((err) => {
    //       this.messages.push(err.data.title);
    //     });
    // },
    getStatusColor(status) {
      return status ? "green" : "gray";
    },
    openConfirmation(bankdetail) {
      confirmation.dialog = true;
      this.$confirm(
        "Do you want to " +
          (bankdetail.is_active ? "Archive   " : "Activate  ") +
          bankdetail.bank_name +
          "?"
      ).then((res) => {
        if (res) {
          this.GetArchiveMsgs(bankdetail);
        }
      });
    },
    GetArchiveMsgs(bankdetail) {
      var id = this.$route.params.id;
      var bankdetails = bankdetail.id;
      this.$store
        .dispatch("supplier/ArchiveOrActice", { id, bankdetails })
        .then((res) => {
          bankdetail.is_active = !bankdetail.is_active;
          const msg = bankdetail.is_active ? "activated" : "archived";
          this.$toast.success("Successfully  " + msg);
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;

          this.$toast.error("Archeive  failed");
        });
    },
    SetBankId() {
      this.bankdetailsId = this.$route.params.id;
    },
  },
  mounted() {
    this.GetBankDetails();
  },
  created() {
    //this.openConfirmation();
    this.SetBankId();
  },
  components: {
    BankDetailsForm,
    EditBankDetails,
    paginationComponent,
    TableFilters,
  },
  computed: {
    // Filter - return selected table fields
    headers: function () {
      return this.columns.filter((item) => item.show == true);
    },
  },
};
</script>

<template>
  <div>
    <!-- :btnCreate="true" -->
    <PageTitle
        title="Cheques"
        :btnCreate="true"
        :createPopup="true"
        @onClickCreate="createCheque()"
        :permission="'Cheques Index'"
    />
    <v-container fluid class="lighten-12 container">
      <v-flex>
        <v-row>
          <v-col
              cols="12"
              xs="12"
              sm="12"
              md="3"
              lg="3"
              xl="3"
              style="
              background: linear-gradient(
                to left,
                rgb(244 244 244) 0%,
                rgb(244 244 244) 100%
              ) !important;
            "
              class="d-flex"
          >
            <v-card class="lighten-12 card-content py-0" width="100%">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                  ><span>
                      <!-- <v-icon medium>mdi-sack-percent</v-icon> -->
                      <strong class="dashboard-card-title"> Cheques to pay</strong></span
                  ></v-list-item-title
                  >

                  <div class="amount">
                    {{ noOfPayingCheques }}
                  </div>
                  <v-list-item-subtitle
                  ><span
                  >{{ payingAmount | formatCurrency }}
                    </span></v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>

          <v-col
              cols="12"
              xs="12"
              sm="12"
              md="3"
              lg="3"
              xl="3"
              style="
              background: linear-gradient(
                to left,
                rgb(244 244 244) 0%,
                rgb(244 244 244) 100%
              ) !important;
            "
              class="d-flex"
          >
            <v-card class="lighten-12 card-content py-0" width="100%">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                  ><span>
                      <!-- <v-icon medium>mdi-sack-percent</v-icon> -->
                      <strong class="dashboard-card-title"> Cheques to receive</strong></span
                  ></v-list-item-title
                  >

                  <div class="amount">
                    {{ noOfReceivingCheques }}
                  </div>
                  <v-list-item-subtitle
                  ><span> {{ receivingAmount | formatCurrency }} </span
                  ></v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-flex>
      <v-card class="lighten-12 card-content">
        <TableFilters
            :filters="[

            'cheqStatus',
            'search',
            'dateRange',
            'chequeFor',
            'total',
          ]"
            v-model="filter"
            :columns="columns"
        ></TableFilters>
      </v-card>
      <v-card class="lighten-12 mt-2">
        <v-container fluid class="light gray lighten-12">
          <ValidationObserver ref="observer">
            <v-row>
              <v-card-text class="pa-0">
                <v-data-table
                    :items-per-page="paginationOptions.perPage"
                    :headers="headers"
                    :items="ChequeList"

                    class="row-pointer"
                    hide-default-footer
                    item-class="test2"
                    st
                >
                  <template v-slot:body="{ items }">
                    <tbody>
                    <tr  @click="viewCheque(item.id)"   :class="getDateValidation(item.date)&&item.chequeFor === 'purchase'&& item.status == 'Pending' ? 'custom-highlight-row' : ''"         v-for="(item, key) in items" :key="item.name">
                      <td >{{ item.date|formatDate }}</td>
                      <td>{{ item.number }}</td>
                      <td>{{ item.bank }}</td>
                      <td class="d-flex justify-end  pr-8 pt-3"> <strong>{{ item.amount|formatCurrency }}</strong></td>
                      <td >{{ item.chequeFor }}</td>
                      <td > <v-chip
                          :x-small="true"
                          class="ma-2"
                          label
                          text-color="white"
                          :color="getStatusColor(item.status)"
                          dark
                      >{{ item.status }}</v-chip
                      ></td>
                      <td class="d-flex justify-center  pr-8 pt-3">
                        <list-menu
                            v-if="item.status == 'Pending'"
                            feature="cheque"
                            :item="item"
                            editPermission="Cheques Index"
                            @refreshList="refreshData"
                            @onEditClicked="editCheque(item)"
                            :isEditModal="true"
                        ></list-menu>
                      </td>
                    </tr>
                    </tbody>
                  </template>


                  <!--
                        <template slot="body.append" >
                                        <tr class="black--text">
                                          <th class="title"></th>
                                          <th class="title"></th>
                                          <th class="title"></th>


                                          <th>
                                            <h3 class="justify-content-end pl-2">
                                         {{ total | formatCurrency }}
                                            </h3>
                                          </th>

                                          <th class="title"></th>

                                          <th class="title"></th>
                                          <th class="title"></th>
                                        </tr>
                                      </template> -->











                  <template v-slot:no-data>
                    <div class="mt-16 container justify-center item-center">
                      <noData name="Order" />
                    </div>
                  </template>
                  <template v-slot:item.reference_number="{ item }">
                    <CopyTableCell
                        :text="item.reference_number"
                    ></CopyTableCell>
                  </template>

                  <template v-slot:item.status="{ item }">
                    <v-chip
                        :x-small="true"
                        class="ma-2"
                        label
                        text-color="white"
                        :color="getStatusColor(item.status)"
                        dark
                    >{{ item.status }}</v-chip
                    >
                  </template>
                  <!--
                                    <template style="background:red" v-slot:item.date="{ item }">
                                      {{ item.date | formatDate }}
                                    </template> -->
                  <template v-slot:item.action="{ item }">
                    <list-menu
                        v-if="item.status == 'Pending'"
                        feature="cheque"
                        :item="item"
                        editPermission="Cheques Index"
                        @refreshList="refreshData"
                        @onEditClicked="editCheque(item)"
                        :isEditModal="true"
                    ></list-menu>
                  </template>
                  <template v-slot:footer>
                    <pagination
                        @paginationOptions="setPaginationOptions"
                        @response="receiveChequeData"
                        url="cheques"
                        :filter="filter"
                        ref="pagination"
                    />
                  </template>
                </v-data-table>
              </v-card-text>
            </v-row>
          </ValidationObserver>
        </v-container>
      </v-card>
    </v-container>
    <ChequeDetails ref="refChequeDetails" @onClose="onClose" />
    <ChequeCreate
        @conform="conform()"
        @afterSave="refreshData()"
        ref="refCreateCheque"
    />

    <ChequeEdit
        @close="AddWarehouse($event)"
        @conform="conform()"
        @afterSave="refreshData()"
        ref="refEditCheque"
    />
  </div>
</template>
<script>
import noData from "@/components/shared/noItem";
import TableFilters from "@/components/base/TableFilters";
import pagination from "../shared/components/pagination.vue";
import ChequeDetails from "./ChequeDetails.vue";
import ChequeCreate from "./ChequeCreate.vue";
import ChequeEdit from "./ChequeEdit.vue";
import { Cheque } from "../../models/Cheque";

import { Product } from "../../models/Product";

export default {
  data: () => ({
    paginationOptions: {},
    showChequeCreate: true,
    selectedCheque: null,
    columns: [
      {
        text: "Date",
        value: "date",
        show: true,
        disabled: false,
        width:"10%"
      },
      {
        text: "Cheque No",
        value: "number",
        show: true,
        disabled: true,
        width:"10%"
      },
      {
        text: "Bank",
        value: "bank",
        show: true,
        disabled: true,
        width:"8%"
      },
      {
        text: "Amount",
        value: "amount",
        show: true,
        disabled: true,
        align: "right",
        width:"10%"
      },
      {
        text: "Cheque For",
        value: "chequeFor",
        show: true,
        disabled: true,
        width:"10%"
      },
      {
        text: "Status",
        value: "status",
        show: true,
        disabled: true,
        width:"5%"
      },
      {
        text: "Action",
        value: "action",
        show: true,
        disabled: true,
        align: "center",
        width:"10%"
      },
    ],
    ChequeList: [],
    filter: {
      invoice_status: "",
      start: "",
      end: "",
      amount: "",
      supplier: "",
      search: "",
      status: "",
    },
    showChequeDetails: false,
    pendingCheques: [],
    total:0
  }),
  components: {
    pagination,
    noData,
    TableFilters,
    ChequeDetails,
    ChequeCreate,
    ChequeEdit,
  },
  computed: {
    headers: function () {
      return this.columns.filter((item) => item.show == true);
    },

    noOfPayingCheques: function () {
      // return "test"
      return this.pendingCheques.filter((item) => item.chequeFor == "purchase")
          .length;
    },
    noOfReceivingCheques: function () {
      return this.pendingCheques.filter((item) => item.chequeFor == "sale")
          .length;
    },
    payingAmount: function () {
      let value = 0;
      this.pendingCheques
          .filter((item) => item.chequeFor == "purchase")
          .forEach((element) => {
            value += +element.amount;
          });
      return value;
    },
    receivingAmount: function () {
      let value = 0;
      this.pendingCheques
          .filter((item) => item.chequeFor == "sale")
          .forEach((element) => {
            value += +element.amount;
          });
      return value;
    },
  },
  methods: {
    setPaginationOptions(data) {
      this.paginationOptions = data;
    },
    async getPendingCheques() {
      debugger;
      await this.$store
          .dispatch("chequeManagement/GetPendingCheques")
          .then((res) => {
            debugger;
            this.pendingCheques = res.data.map((element) => {
              return new Cheque().toViewModel(element);
            });
          })
          .catch((err) => {});
    },
    sumField(array, filed) {
      let value = 0;
      array.forEach((element) => {
        value += parseFloat(element[filed]);
      });
      return value;
    },
    onClose() {
      this.getPendingCheques();
      this.$refs.pagination.refreshData();
    },
    receiveChequeData(data) {
      debugger;
      this.ChequeList = data.map((element) => {
        return new Cheque().toViewModel(element);
      });
      this.total = this.sumField(this.ChequeList, "amount");

      debugger;
    },
    viewCheque(chequeId) {

      this.$refs.refChequeDetails.openModal(chequeId);
    },
    createCheque() {
      this.$refs.refCreateCheque.openModal();
    },
    editCheque(cheque) {
      this.$refs.refEditCheque.openModal(cheque.id);
    },
    conform() {
      this.$refs.pagination.fetchData();
    },
    getDateValidation(d){
      var date = new Date(d)
      date.setDate(date.getDate() - 1)

      date.setHours(0)
      date.setMinutes(0)
      date.setSeconds(0)
// Add a day
// date.setDate(date.getDate() + 1)

      let yesterDay=new Date();
      yesterDay.setHours(0)
      yesterDay.setMinutes(0)
      yesterDay.setSeconds(0)

      console.log(date);
      console.log(yesterDay);
      if(date.getTime()<= yesterDay.getTime()){
        return true;
      }else{
        return false;

      }
    },

    getStatusColor(status) {
      debugger;
      switch (status) {
        case "Completed":
          return "green";
          break;
        case "Pending":
          return "orange";
          break;
        case "Canceled":
          return "red";
          break;
        case "Bounced":
          return "red";
          break;
        default:
          break;
      }
    },
  },
  created() {
    // this.$refs.refChequeDetails.openModal();
    this.getPendingCheques();
  },
  watch: {},
  filters: {},
};
</script>





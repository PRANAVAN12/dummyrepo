<template>
  <div>
    <PageTitle title="Sales" />
    <v-container fluid class="lighten-12 content">
      <v-card class="lighten-12 card-content mb-2">
        <TableFilters
          :filters="['customer', 'search', 'biller', 'dateRange','saleType','product']"
          v-model="filter"
          :columns="columns"paginationOptions
        ></TableFilters>
      </v-card>

      <v-card class="lighten-12 mt-2">
        <v-container fluid class="light gray lighten-12">
          <v-row>
            <v-card-text class="pa-0">
              <v-data-table
                :items-per-page="paginationOptions.perPage"
                :headers="headers"
                :items="salesList"
                :single-expand="singleExpand"
                item-key="name"
                hide-default-footer
                @click:row="$router.push(`sales/view/${$event.id}`)"
                class="row-pointer"
              >
                <template v-slot:no-data>
                  <div class="mt-16 container justify-center item-center">
                  </div>
                </template>
                <template v-slot:item.reference_number="{ item }">
                  <CopyTableCell :text="item.reference_number"></CopyTableCell>
                </template>

                <template v-slot:item.date="{ item }">
                  {{ item.date | formatDate }}
                </template>

                <template v-slot:item.biller="{ item }">
                  {{ item.biller.first_name }}
                </template>

                <!-- Status -->
                <!-- <template v-slot:item.status="{ item }">
                  <v-chip
                    :x-small="true"
                    class="ma-2"
                    label
                    text-color="white"
                    :color="getStatusColor(item.status)"
                    dark
                    >{{ item.status ? "Active" : "Archieved" }}</v-chip
                  >
                </template> -->

                <!-- Action -->
                <template v-slot:item.action="{ item }">
                  <v-menu offset-y transition="scroll-y-transition">
                    <template v-slot:activator="{ attrs, on }">
                      <v-icon v-bind="attrs" v-on="on"
                        >mdi-dots-vertical</v-icon
                      >
                    </template>
                    <v-list class="actions">
                      <permission-control permissionName="Sales Show">
                        <v-list-item
                          @click="$router.push('sales/view/' + item.id)"
                          link
                        >
                          <span>
                            <v-icon v-bind="attrs" v-on="on">mdi-eye</v-icon
                            >View
                          </span>
                        </v-list-item>
                      </permission-control>
                      <!-- <permission-control permissionName="Supplier Edit">
                        <v-list-item
                          @click="$router.push('sales/edit/' + item.id)"
                          link
                        >
                          <span>
                            <v-icon v-bind="attrs" v-on="on"
                              >mdi-pencil-box-outline</v-icon
                            >Edit
                          </span>
                        </v-list-item>
                      </permission-control> -->
                      <!-- <permission-control permissionName="Supplier Soft Delete">
                        <v-list-item @click="openConfirmation(item)" link>
                          <span>
                            <v-icon v-bind="attrs" v-on="on">
                              {{
                                item.status
                                  ? "mdi-archive"
                                  : "mdi-checkbox-marked-circle"
                              }}
                            </v-icon>
                            {{ item.status ? "Archieve" : "Active" }}
                          </span>
                        </v-list-item>
                      </permission-control> -->
                    </v-list>
                  </v-menu>
                </template>
                <template
                  slot="body.append"
                  v-if="salesList && salesList.length > 0"
                >
                  <tr class="black--text">
                    <th class="title"></th>
                    <th class="title"></th>
                    <th class="title"></th>
                    <!-- <th class="title"></th> -->
                    <th class="title"></th>
                    <th class="title"></th>
                    <th class="title"></th>
                    <th>
                      <h3 class="justify-content-end pl-2">
                        {{ grandTotal | formatCurrency }}
                      </h3>
                    </th>
                    <th>
                      <h3 class="justify-content-end pl-2">
                        {{ discountTotal | formatCurrency }}
                      </h3>
                    </th>
                    <th>
                      <h3 class="justify-content-end pl-2">
                        {{ total | formatCurrency }}
                      </h3>
                    </th>

                    <th class="title"></th>
                    <th class="title"></th>
                  </tr>
                </template>
                <template v-slot:footer>
                  <pagination
                    @paginationOptions="setPaginationOptions"
                    @response="setResponseData"
                    url="sales"
                    :filter="filter"
                  />
                </template>
              </v-data-table>
            </v-card-text>
          </v-row>
        </v-container>
      </v-card>
      <!-- </v-card> -->
      <div class="d-flex justify-center align-center"></div>
    </v-container>
  </div>
</template>
<script>
import pagination from "../../modules/shared/components/pagination.vue";
import confirmation from "../../modules/shared/components/confirmation";
import TableFilters from "@/components/base/TableFilters";

export default {
  components: {
    TableFilters,
    pagination,
  },
  data() {
    return {
      paginationOptions: {},
      isLoading: true,
      total: 0,
      grandTotal: 0,
      discountTotal: 0,
      columns: [
        {
          text: "Date",
          value: "date",
          show: true,
          disabled: false,
          width: "7%",
        },
        {
          text: "Reference Number",
          value: "reference_number",
          show: true,
          disabled: false,
          width: "12%",
        },
         {
          text: "Type",
          value: "sale_type",
          show: true,
          disabled: false,
          align: "center",
          width: "8%",
        },
        {
          text: "Shop",
          value: "shop.name",
          show: true,
          disabled: false,
          align: "center",
          width: "8%",
        },
        {
          text: "Biller",
          value: "biller",
          show: true,
          disabled: false,
          align: "center",
          width: "8%",
        },
        {
          text: "Customer",
          value: "customer.name",
          show: true,
          disabled: false,
          align: "center",
          width: "10%",
        },


        // {
        //   text: "Total Items",
        //   value: "total_items",
        //   show: true,
        //   disabled: false,
        //   align: "center",
        //   width: "10%",
        // },
        {
          text: "Total Amount",
          value: "total",
          show: true,
          disabled: false,
          align: "right",
          width: "13%",
        },
        {
          text: "Discount Amount",
          value: "discount_amount",
          show: true,
          disabled: false,
          align: "right",
          width: "13%",
        },
        {
          text: "Net Amount",
          value: "grand_total",
          show: true,
          disabled: false,
          align: "right",
          width: "11%",
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
      salesList: [],
      filter: {
        name: "",
        customer: "",
        start: "",
        end: "",

        search: "",
        status: "",
      },
      products: [],
    };
  },
  methods: {
    setPaginationOptions(data) {
      this.paginationOptions = data;
    },
    clearFilter() {
      this.filter = {};
    },
    sumField(array, filed) {
      debugger;
      let value = 0;
      array.forEach((element) => {
        value += parseFloat(element[filed]);
      });
      return value;
    },

    setResponseData(sales) {
      this.salesList = sales;
      this.total = this.sumField(this.salesList, "grand_total");
      this.grandTotal = this.sumField(this.salesList, "total");
      this.discountTotal = this.sumField(this.salesList, "discount_amount");
    },
    openConfirmation(supplierdetail) {
      confirmation.dialog = true;
      this.$confirm(
        "Do you want to " +
          (supplierdetail.status ? "Archive  " : "Activate ") +
          supplierdetail.name +
          "?"
      ).then((res) => {
        if (res) {
          this.GetArchiveMsgs(supplierdetail);
        }
      });
    },
  },
  computed: {
    // Filter - return selected table fields
    headers: function () {
      return this.columns.filter((item) => item.show == true);
    },
  },
  created() {
    this.GetSuppliers();
  },
};
</script>

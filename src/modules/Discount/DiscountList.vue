<template>
  <div>
    <PageTitle
      title="Discount List"
      :btnCreate="true"
      :createRoute="'/discount/add'"
      :permission="'Discount Create'"
    />
    <v-container fluid class="lighten-12 content">
      <v-card class="lighten-12 card-content">
        <TableFilters
          :filters="['status', 'search', 'dateRange']"
          v-model="filter"
          :columns="columns"
        ></TableFilters>
      </v-card>
      <v-card class="lighten-12 mt-2">
        <v-container fluid class="light gray lighten-12">
          <v-row>
            <v-card-text class="pa-0">
              <v-data-table
                :items-per-page="paginationOptions.perPage"
                :fixed-header="true"
                :headers="headers"
                :items="discountList"
                item-key="id"
                hide-default-footer
                @click:row="$router.push(`discount/${$event.id}`)"
                class="row-pointer"
              >
                <!-- Action -->
                <template v-slot:item.actions="{ item }">
                  <v-menu offset-y transition="scroll-y-transition">
                    <template v-slot:activator="{ attrs, on }">
                      <v-icon v-bind="attrs" v-on="on"
                        >mdi-dots-vertical</v-icon
                      >
                    </template>
                    <v-list class="actions">
                      <permission-control permissionName="Discount Show">
                        <v-list-item :to="'/discount/' + item.id" link>
                          <span>
                            <v-icon v-bind="attrs" v-on="on">mdi-eye</v-icon
                            >View
                          </span>
                        </v-list-item>
                      </permission-control>
                      <permission-control permissionName="Discount Edit">
                        <v-list-item :to="`/discount/edit/${item.id}`" link>
                          <span>
                            <v-icon v-bind="attrs" v-on="on"
                              >mdi-pencil-box-outline</v-icon
                            >Edit
                          </span>
                        </v-list-item>
                      </permission-control>
                      <permission-control permissionName="Discount Soft Delete">
                        <v-list-item link @click="openConfirmation(item)">
                          <span>
                            <v-icon v-bind="attrs" v-on="on">
                              {{
                                item.status
                                  ? "mdi-archive"
                                  : "mdi-checkbox-marked-circle"
                              }}
                            </v-icon>
                            {{ item.is_active ? "Archive" : "Active" }}
                          </span>
                        </v-list-item>
                      </permission-control>
                    </v-list>
                  </v-menu>
                </template>
                <template v-slot:item.status="{ item }">
                  <v-chip
                    :x-small="true"
                    class="ma-2 cursor-pointer"
                    label
                    text-color="white"
                    :color="getStatusColor(item.is_active)"
                    dark
                    >{{ item.is_active ? "Active" : "Archieved" }}</v-chip
                  >
                </template>
                <template v-slot:item.end="{ item }">
                  {{ !item.hasEnd ? item.end : "" }}
                </template>
                <template v-slot:no-data>
                  <!-- <img
                    style="height: 200px"
                    src="../../../assets/img/no-result.jpg"
                  /> -->
                </template>
                <template v-slot:footer="{}">
                  <paginationComponent
                    @paginationOptions="setPaginationOptions"
                    :url="'discounts'"
                    @response="receiveDiscountData"
                    :filter="filter"
                    ref="pagination"
                  />
                  <!-- :url="'purchases-orders'" -->
                </template>
              </v-data-table>
            </v-card-text>
          </v-row>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import { required, email, max, numeric } from "vee-validate/dist/rules";

import _ from "lodash";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import paginationComponent from "../../modules/shared/components/pagination";
import { mapGetters } from "vuex";
import { has } from "lodash";

import * as moment from "moment/moment";
import TableFilters from "@/components/base/TableFilters";
import { Discount } from "../../models/View Models/DiscountViewModel";

extend("numeric", {
  ...numeric,
  message: "input must be numeric",
});
export default {
  data: () => ({
    paginationOptions: {},
    columns: [
      {
        text: "Name",
        value: "name",
        show: true,
        disabled: true,
        width: "20%",
      },
      {
        text: "Start",
        value: "start",
        show: true,
        disabled: true,
        width: "20%",
      },
      {
        text: "End",
        value: "end",
        show: true,
        disabled: true,
        width: "20%",
      },
      {
        text: "Status",
        value: "status",
        show: true,
        disabled: true,
        align: "center",
        width: "20%",
      },
      {
        text: "Actions",
        value: "actions",
        show: true,
        disabled: true,
        align: "center",
        width: "20%",
      },
    ],
    discountList: [],
    date_range: [],
    filter: {
      search: "",
      start: "",
      end: "",
      status: "",
    },
    menu: false,
  }),
  components: {
    ValidationProvider,
    ValidationObserver,
    paginationComponent,
    TableFilters,
  },
  computed: {
    headers: function () {
      return this.columns.filter((item) => item.show == true);
    },
  },
  methods: {
    setPaginationOptions(data) {
      this.paginationOptions = data;
    },
    getStatusColor(is_active) {
      return is_active ? "green" : "gray";
    },
    receiveDiscountData(value) {
      this.discountList = value.map((d) => {
        return new Discount().toViewModel(d);
      });
    },
  },
  created() {},
  watch: {
    // searchSupplier(value) {
    //   if (!value) {
    //     return;
    //   }
    //   this.getSupplierByQuery(value);
    // },
  },
};
</script>

<style scoped>
.btnRightMargin {
  margin-right: 10px;
}
/* .contacts{
  background: aliceblue;
  padding: 5px;

}
.Address{
  padding: 5px;
} */
.container {
  /* color: white !important; */
}
.form-blue {
  background: #abc5f1;
  border-radius: 0.25rem;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}
.messages {
  border: transparent !important;
  margin-right: 40px;
}
.custom-card {
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.2),
    0px -3px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
}

.pending {
  background: orange;
}
.complete {
  background: green;
}
.canceled {
  background: red;
}
.clear_button {
  box-shadow: unset !important;
  background-color: #f5f5f5;
  width: 100%;
  padding: 16px;
}
</style>

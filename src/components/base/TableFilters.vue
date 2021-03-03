<template>
  <v-container fluid class="table-filter px-3">
    <v-row >
      <v-col cols="12" sm="12" md="12" lg="9">

        <v-row class="justify-left" >
          <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              class="py-1"
              v-if="hasFilter('status')"
          >
            <StatusAutoComplete
                v-model="filter.status"
                :clear="clearFilter"
            ></StatusAutoComplete>
          </v-col>
           <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              class="py-1"
              v-if="hasFilter('date')"
          >
            <datePickComponent
                v-model="filter.date"
                :clear="clearFilter"
            ></datePickComponent>
          </v-col>
          <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              class="py-1"
              v-if="hasFilter('dateRange')"
          >
            <DateRangeFilter
                :clear="clearFilter"
                @start="startChange"
                @end="endChange"
            ></DateRangeFilter>
          </v-col>
          <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              class="py-1"
              v-if="hasFilter('customerType')"
          >
            <v-select
                hide-details="auto"
                :items="CustomerTypes"
                :loading="loading"
                v-model="filter.customerType"
                item-text="name"
                item-value="id"
                label="Type"
                outlined
                clearable
                dense
            ></v-select>
          </v-col>
          
          <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              class="py-1"
              v-if="hasFilter('cheqStatus')"
          >
            <v-select
                hide-details="auto"
                :items="ChecqStatus"
                :loading="loading"
                v-model="filter.cheqStatus"
                item-text="name"
                item-value="id"
                label="Cheque Status"
                outlined
                clearable
                dense
            ></v-select>
          </v-col>
          <v-col
              cols="12"
              sm="12"
              md="6"
              class="py-1 clear-sm"
              v-if="false"
          >
            <v-btn
                depressed
                block
                small
                height="30"
                class="ma-auto text-white bg-white w-100 ma-0 filter"
                v-bind="attrs"
                v-on="on"
                @click="clearFilter1"
            >Clear Filters</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="3">
        <v-row>
          <v-col
              cols="12"
              sm="12"
              md="6"
              lg="12"
              class="py-1 p-1"
              v-if="hasFilter('search')"
          >
            <v-text-field
                hide-details="auto"
                v-model="filter.search"
                dense
                outlined
                clearable
                placeholder="Search"
                append-icon="mdi-magnify"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="12" md="6" lg="6" class="px-3 py-1" v-if="columns">
            <TableHeaderFilter :columns="columns" />
          </v-col>
          <v-col
              cols="12"
              sm="12"
              md="6"
              lg="6"
              class="py-1"
          >
            <v-btn
                depressed
                block
                small
                height="30"
                class="ma-auto text-white bg-white w-100 ma-0 filter"
                v-bind="attrs"
                v-on="on"
                @click="clearFilter1"
            >Clear</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import StatusAutoComplete from "@/components/base/StatusAutoComplete";
import DateRangeFilter from "@/components/base/DateRangeFilter";
import datePickComponent from "@/components/base/DateComponent";
import moment from 'moment'

export default {
  components: {
    StatusAutoComplete,
    DateRangeFilter,
    datePickComponent
  },
  props: {
    columns: {
      type: Array,
      default: [],
    },
    filters: {
      type: Array,
      default: [],
    },
    clear: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    filter: {
      search: "",
      status: "",
      start: "",
      end: "",
      customertype:"",
      date:moment(new Date()).format("YYYY-MM-DD")
    },
    CustomerTypes:[
      {
        "id":"1",
        "name":"Common"
      },
      {
        "id": "2",
        "name": "Credit"
      }
    ],
    clearFilter: false,
    visibleClearBtn: false,
  }),
  methods: {
    emitFilter() {
      let temFilter = {};
      Object.keys(this.filter).forEach((key) => {
        if (this.filter[key] != null && this.filter[key] != "") {
          temFilter[key] = this.filter[key];
        }
      });
      this.$emit("input", temFilter);
    },
    clearFilter1() {
      this.clearFilter = !this.clearFilter;
      this.filter = {
        search: "",
        status: "",
        start: "",
        end: "",
        customertype:"",
        date:""
      };
    },
    startChange(value) {
      this.filter.start = value;
    },
    endChange(value) {
      this.filter.end = value;
    },
    hasFilter: function (value) {
      return this.filters.indexOf(value) > -1 ? true : false;
    },
  },
  watch: {
    filter: {
      handler(val) {
        this.emitFilter();
      },
      deep: true,
    },
  },
  created() {
    if (this.filters.length < 2) {
      this.visibleClearBtn = false;
    } else {
      this.visibleClearBtn = true;
    }
  },
};
</script>
<style>
.table-filter {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
.clear-sm {
  display: none;
  visibility: hidden;
}
@media only screen and (max-width: 1263px) {
  .clear-lg {
    display: none;
    visibility: hidden;
  }
  .clear-sm {
    display: block;
    visibility: visible;
  }
}
</style>

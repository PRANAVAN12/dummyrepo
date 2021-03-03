<template>

  <div >
    <div v-if="hadData && options.perPage <= noOfRecords">
 <v-row
      ><v-col cols="4"> <slot name="footer"></slot></v-col>
      <v-col cols="4"> <slot name="footer2"></slot></v-col>
      <v-col cols="4"> <slot name="footer3"></slot></v-col>
    </v-row>
    <div class="max-width">
      <v-row class="bg_1 ma-1 pa-0">
        <v-col
          class="pr-0 ma-auto pa-0 text-right d-none d-sm-flex"
          cols="1"
          sm="1"
        >
          <label class="small">Display </label>
        </v-col>
        <v-col
          class="ma-auto ml-0 pa-0 text-left"
          cols="3"
          xs="4"
          sm="1"
          md="1"
          lg="1"
          xl="1"
        >
          <v-select
            dense
            hide-details="auto"
            outlined
            :items="rowsPerPageItems"
            v-model="options.perPage"
            @change="onChangePageSize"
            :disabled="noOfRecords == 0"
          ></v-select>
        </v-col>
        <!-- <v-col class="d-flex ma-auto pa-0" cols="1" sm="1">
          <span style="align-items: left;display: flex;">
            <label class="small">Display :</label>
          </span>
        </v-col> -->
        <v-col class="ma-auto pa-0 text-left d-none d-sm-flex" cols="1" sm="1">
          <label class="small">{{
            recordFrom + " - " + recordTo + " of " + noOfRecords
          }}</label>
        </v-col>
        <!-- <v-col class="d-flex ma-auto pl-5 pa-0" cols="2" sm="2">
          <span style="align-items: center;display:block">
            <label class="">{{
              recordFrom + " - " + recordTo + " of " + noOfRecords
            }}</label>
          </span>
        </v-col> -->
        <!-- Pagination -->
        <v-col cols="8" class="ma-auto pa-0 text-right">
          <v-pagination
            @input="onPaginationChange"
            v-model="options.page"
            :circle="true"
            :disabled="disabled"
            :length="options.total"
            :next-icon="nextIcon"
            :prev-icon="prevIcon"
            :page="selectedPage"
            :total-visible="totalVisiblePages"
          ></v-pagination>
        </v-col>
        <!-- Pagination -->
      </v-row>
    </div>
    </div>
   
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    // Request URL
    url: {
      type: String,
      default: "",
    },
    filter: {
      type: Object,
      default: {},
    },
    // Options for pagination
    // options: {
    //   type: Object,
    //   default: {
    //     descending: true,
    //     page: 1,
    //     rowsPerPage: 5,
    //     sortBy: "",
    //     totalItems: 0,
    //     rowsPerPageItems: [5, 10, 15],
    //     total: 0,
    //     page: 1,
    //   },
    // },
    // totalRecords: {
    //   type: Number,
    //   default: 0,
    // },
    // total: {
    //   type: Number,
    //   default: 0,
    // },
    value: {
      type: Number,
      default: 0,
    },
    // length: {
    //   type: Number,
    //   default: 0,
    // },
  },
  watch: {
    options: {
      handler(val) {
        this.$emit("paginationOptions", val);
      },
      deep: true,
    },
    filter: {
      handler(val) {
        this.fetchData();
      },
      deep: true,
    },
  },
  data() {
    return {
      hadData: false,
      pageSizes: [5, 10, 15],
      noOfRecords: 0,
      circle: false,
      disabled: false,
      // length: 0,
      nextIcon: "mdi-arrow-right",
      nextIcons: ["mdi-chevron-right", "mdi-arrow-right", "mdi-menu-right"],
      prevIcon: "mdi-arrow-left",
      prevIcons: ["mdi-chevron-left", "mdi-arrow-left", "mdi-menu-left"],
      //
      selectedPage: 1,
      totalVisiblePages: 10,
      selectedPageSize: 10,
      // recordFrom: 5,
      // recordTo: 10,

      options: {
        descending: true,
        page: 1,
        perPage: 15,
        rowsPerPage: 5,
        sortBy: "fat",
        totalItems: 0,
        rowsPerPageItems: [5, 10, 20, 50],
        total: 0,
        // page: 1,
      },
    };
  },
  computed: {
    ...mapState(["pagination_settings"]),
    recordFrom: {
      get() {
        var from =
          this.noOfRecords < this.options.perPage
            ? this.noOfRecords
            : this.options.perPage * this.options.page - this.options.perPage;
        if (this.noOfRecords > 0 && from == 0) {
          return 1;
        } else {
          return from;
        }
      },
      set() {},
    },
    recordTo: {
      get() {
        var to =
          this.noOfRecords < this.options.perPage
            ? this.noOfRecords
            : this.options.perPage * this.options.page;
        if (to > this.noOfRecords) {
          return this.noOfRecords;
        }
        return to;
      },
      set() {},
    },
    rowsPerPageItems: {
      get() {
        var rowsPerPage = this.options.rowsPerPageItems
          ? this.options.rowsPerPageItems
          : [15, 20, 25, 30];

        if (this.noOfRecords < 5) {
          rowsPerPage = [1];
          this.options.perPage = 1;
        }

        var final = rowsPerPage.filter((item) => item <= this.noOfRecords);
        return final;
      },
      set() {},
    },
  },
  created() {
    // this.GetPaginationSettings();
    // Fetch data
    this.fetchData();
  },
  mounted: function () {
    this.SetPaginationSettings(this.pagination_settings);
  },
  methods: {
    refreshData() {
      this.fetchData();
    },
    fetchData() {
      debugger
      this.$store
        .dispatch("GetPaginationData", {
          url: this.url,
          // "?page=" +
          // this.options.page +
          // "&size=" +
          // this.options.rowsPerPage +
          // "&query=",
          data: this.options,
          params: {
            ...this.filter,
            page: this.options.page,
            size: this.options.perPage,
            query: this.filter.search,
          },
        })
        .then((res) => {
          // this.Product = new ProductViewModel(res.data);
          // this.Product = res.data;
          if (res.data.meta) {
            this.noOfRecords = res.data.meta.total;
            this.options.total = res.data.meta.last_page;

            if (res.data.data.length != 0) this.hadData = true;
            else this.hadData = false;
            this.$emit("response", res.data.data);
          } else {
            this.noOfRecords = res.data.length;
            this.options.total = 1;
            this.$emit("response", []);
          }
        })
        .catch((err) => {
          this.$emit("response", []);
          // this.messages.push(err.data.title);
        });
    },
    onPaginationChange(value) {
      // console.log("onPaginationChange", value);
      this.changeSelectedPageRange();
      this.fetchData();
    },
    onChangePageSize(value) {
      this.options.page = 1;
      this.selectedPage = 1;
      this.changeSelectedPageRange();
      this.fetchData();
      // this.$emit("input", value);
    },
    changeSelectedPageRange() {
      this.options.length = this.noOfRecords / this.selectedPageSize;
      this.recordFrom = this.selectedPageSize * (this.selectedPage - 1) + 1;
      this.recordTo =
        this.noOfRecords < 5
          ? this.noOfRecords
          : this.selectedPageSize * this.selectedPage;
    },
    // GetPaginationSettings() {
    //   this.$store
    //     .dispatch("GetPaginationSettings")
    //     .then((res) => {
    //       if (res.data && res.data[0]) {
    //         this.SetPaginationSettings(res.data[0]);
    //       }
    //     })
    //     .catch((err) => {
    //       this.messages = err.data.title;
    //       // this.$toast.error("Pagination settins error");
    //     });
    // },

    SetPaginationSettings(settings) {
      this.pageSizes = JSON.parse(settings.page_sizes);
      this.options.rowsPerPageItems = JSON.parse(settings.page_sizes);
      // this.selectedPageSize = settings.default_page_size;
      // this.noOfRecords = this.totalRecords;
      // this.length = this.noOfRecords / this.selectedPageSize;
      this.totalVisiblePages = settings.total_visible_pages;
      this.options.perPage = settings.default_page_size;
    },
  },
};
</script>

<style scoped>
hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #ccc;
  margin: 1em 0;
  padding: 0;
}
</style>

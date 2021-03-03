<template>
  <div>
    <!-- <hr /> -->
    <div class="max-width">
      <v-row class="bg_1 ma-1">
        <v-col class="d-flex" cols="1" sm="1">
          <span style="align-items: left;display: flex;">
            <label class="small">Rows per page :</label>
          </span>
        </v-col>
        <v-col class="d-flex" cols="2" sm="1">
          <v-select
            dense
            :items="rowsPerPageItems"
            v-model="options.rowsPerPage"
            @change="onChangePageSize"
            :disabled="noOfRecords == 0"
          ></v-select>
        </v-col>
        <v-col class="d-flex " cols="2" sm="2">
          <span style="align-items: center;display:block">
            <label class="">{{
              recordFrom + " - " + recordTo + " of " + noOfRecords
            }}</label>
          </span>
        </v-col>
        <!-- Pagination -->
        <v-col cols="8" class="text-right">
          <v-pagination
            @input="onPaginationChange"
            v-model="options.page"
            :circle="circle"
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
</template>

<script>
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
    // pagination: {
    //   handler() {
    //     console.log(
    //       "=======================================================",
    //       this.pagination
    //     );
    //   },
    // },
    filter: {
      handler(val) {
        this.fetchData();
      },
      deep: true,
    },
  },
  data() {
    return {
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
    recordFrom: {
      get() {
        return this.noOfRecords < this.selectedPageSize
          ? this.noOfRecords
          : this.selectedPageSize * this.options.page - this.selectedPageSize;
      },
      set() {},
    },
    recordTo: {
      get() {
        return this.noOfRecords < this.selectedPageSize
          ? this.noOfRecords
          : this.selectedPageSize * (this.options.page + 1);
      },
      set() {},
    },
    rowsPerPageItems: {
      get() {
        return this.options.rowsPerPageItems
          ? this.options.rowsPerPageItems
          : [5, 10, 15, 20];
      },
      set() {},
    },
  },
  created() {
    this.GetPaginationSettings();
    // Fetch dat
    this.fetchData();
  },
  methods: {
    refreshData() {
      this.fetchData();
    },
    fetchData() {
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
            size: this.options.rowsPerPage,
            query: this.filter.search,
          },
        })
        .then((res) => {
          // this.Product = new ProductViewModel(res.data);
          // this.Product = res.data;
          if (res.data.data) {
            this.noOfRecords = res.data.meta.totalItems;
            this.options.total = res.data.meta.lastPage;
            this.$emit("response", res.data.data);
          } else {
            this.$emit("response", []);
          }
        })
        .catch((err) => {
          this.$emit("response", []);
          // this.messages.push(err.data.title);
        });
    },
    onPaginationChange(value) {
      console.log("onPaginationChange", value);
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
    GetPaginationSettings() {
      this.$store
        .dispatch("GetPaginationSettings")
        .then((res) => {
          if (res.data && res.data[0]) {
            this.SetPaginationSettings(res.data[0]);
          }
        })
        .catch((err) => {
          this.messages = err.data.title;
          // this.$toast.error("Pagination settins error");
        });
    },

    SetPaginationSettings(settings) {
      this.pageSizes = JSON.parse(settings.pageSizes);
      this.selectedPageSize = settings.defaultPageSize;
      // this.noOfRecords = this.totalRecords;
      this.length = this.noOfRecords / this.selectedPageSize;
      this.totalVisiblePages = settings.totalVisiblePages;
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

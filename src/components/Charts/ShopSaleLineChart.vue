<template>
  <div>
    <v-row>
      <v-col cols="12" sm="12" md="3">
        <DateRangeFilter
          @start="startChange"
          @end="endChange"
        ></DateRangeFilter>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <line-chart height="200px" :data="data"></line-chart>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DateRangeFilter from "@/components/base/DateRangeFilter";
export default {
  name: "Line Chart",
  components: {
    DateRangeFilter,
    //VDaterange
  },
  data: () => ({
    //colors: ["#d00000", "#ffba08", "#3f88c5", "#032b43", "#136f63 "],
    filter: {
      start: "",
      end: "",
    },
    data: [
      {
        name: "Ware houe 01",
        data: {
          "2017-01-01": 60,
          "2017-01-02 ": 4,
          "2017-01-03": 55,
          "2017-01-04": 1,
          "2017-01-05": 80,
          "2017-01-06": 5,
        },
      },
      {
        name: "Ware houe 02",
        data: {
          "2017-01-01": 18,
          "2017-01-02": 35,
          "2017-01-03": 25,
          "2017-01-04": 85,
          "2017-01-05": 24,
          "2017-01-06": 65,
        },
      },
      {
        name: "Ware houe 03",
        data: {
          "2017-01-01": 22,
          "2017-01-02": 55,
          "2017-01-03": 77,
          "2017-01-04": 66,
          "2017-01-05": 5,
          "2017-01-06": 90,
        },
      },
      {
        name: "Ware houe 04",
        data: {
          "2017-01-01": 10,
          "2017-01-02": 55,
          "2017-01-03": 20,
          "2017-01-04": 30,
          "2017-01-05": 40,
          "2017-01-06": 90,
        },
      },
    ],
  }),
  methods: {
    startChange(value) {
      this.filter.start = value;
    },
    endChange(value) {
      this.filter.end = value;
    },
  },
};
</script>

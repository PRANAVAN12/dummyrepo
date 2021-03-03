<template>
  <div class="lighten-12 card-content">
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="12" lg="6" xl="6" class="pt-0">
        <div class="dashboard-card-title">Category Stock</div>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="12" lg="6" xl="6" class="pt-0">
        <v-autocomplete
          hide-details="auto"
          :items="charttype"
          :loading="loading"
          v-model="chartby"
          item-text="name"
          item-value="id"
          label="By"
          outlined
          dense
          @change="getCategoryData()"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <PieChart :data="data" />
  </div>
</template>

<script>
// Charts
import PieChart from "@/components/Charts/PieChart";

import axios from "@/plugins/axios";

export default {
  name: "Home",
  data: () => ({
    data: [],
    charttype: [
      { id: "qty", name: "Qty" },
      { id: "value", name: "Price" },
    ],
    chartby: "qty",
  }),

  components: {
    PieChart,
  },
  methods: {
    getCategoryData() {
      axios
        .get(`dashboard/chart/category-stock-chart?chartBy=${this.chartby}`)
        .then((resp) => {
          debugger
          this.data = resp.data.data;
        })
        .catch((err) => {
          console.log("Error");
        });
    },
  },
  created() {
    this.getCategoryData();
  },
};
</script>

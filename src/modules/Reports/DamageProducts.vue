<template>
  <div>
    <PageTitle title="Damaged Stock Details" />
    <v-container fluid class="lighten-12 content">
      <v-col cols="12" md="12" class="pa-3">
        <v-card class>
          <v-tabs v-model="tab" background-color="primary" dark>
            <v-tabs-slider></v-tabs-slider>
            <v-tab v-for="item in items" :key="item.tab">
              {{ item.tab }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="item in items" :key="item.tab">
              <WarehouseDamagedProducts  v-if="item.tab == 'Warehouse Products'" />
<!--              <ShopExpiredProducts  v-if="item.tab == 'ShopProducts'" />-->
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>

      <div class="d-flex justify-center align-center"></div>
      <!-- </v-row> -->
    </v-container>
  </div>
</template>

<script>
import PageTitle from "@/components/shared/PageTitle";
import TableFilters from "@/components/base/TableFilters";
import WarehouseDamagedProducts from "./WarehouseDamagedProducts";
import ShopExpiredProducts from "./ShopExpiredProducts";

export default {
  data: () => ({
    tab:'Shop Products',
    items: [
      { tab: "Warehouse Products", content: "this is credit tab" },
    ],

  }),
  components: {
    PageTitle,
    TableFilters,WarehouseDamagedProducts,ShopExpiredProducts
  },


};
</script>

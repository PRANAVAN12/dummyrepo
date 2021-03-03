<!-- *************************************************************************
	TEMPLATE
	************************************************************************* -->
<template>
  <div>
    <PageTitle
      title="Warehouse View"
      :backBtn="true"
      :editRoute="'edit/' + this.$route.params.id"
    />

    <v-container fluid>
      <v-row
        ><v-col cols="12" sm="12" md="12" lg="12"
          ><v-card class="lighten-12">
            <v-card-title>General </v-card-title>
            <v-container fluid>
              <v-row>
                <v-col cols="6" sm="6" md="3" lg="3"> <h4>Name</h4></v-col>
                <v-col cols="6" sm="6" md="3" lg="3"
                  ><v-chip label>
                    {{ warehouse.name }}
                  </v-chip>
                </v-col>

                <v-col cols="6" sm="6" md="3" lg="3"> <h4>Phone</h4></v-col>
                <v-col cols="6" sm="6" md="3" lg="3"
                  ><v-chip label>
                    {{ warehouse.phone }}
                  </v-chip></v-col
                >

                <v-col cols="6" sm="6" md="3" lg="3"> <h4>Address</h4></v-col>
                <v-col cols="6" sm="6" md="3" lg="3"
                  ><v-chip label>
                    {{ warehouse.address }}
                  </v-chip></v-col
                >

                <v-col cols="6" sm="6" md="3" lg="3">
                  <h4>Description</h4></v-col
                >
                <v-col cols="6" sm="6" md="3" lg="3"
                  ><v-chip label>
                    {{ warehouse.description }}
                  </v-chip></v-col
                >
              </v-row>
            </v-container>
          </v-card></v-col
        >
        <v-col cols="12" xs="12" sm="12" md="6" lg="8" v-if="false">
          <v-card class="lighten-12 card-content pa-5">
            <LineChart class="chart-height" />
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="6" lg="4" v-if="false">
          <v-card class="lighten-12 card-content pa-5">
            <PieChart />
          </v-card>
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="6" lg="8" v-if="false">
          <v-card class="lighten-12 card-content pa-5">
            <ColumnChart />
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col></v-col>
      </v-row>
      <v-tabs horizontal background-color="primary" dark>
        <v-tab> Products </v-tab>
        <v-tab> Purchases </v-tab>
        <v-tab> Purchase order </v-tab>
        <v-tab> Purchase return </v-tab>
        <v-tab> Shops</v-tab>
        <v-tab-item>
          <WarehouseProductList :WarehouseId="$route.params.id" />
        </v-tab-item>

        <v-tab-item>
          <WarehousePurchase :WarehouseId="$route.params.id" />
        </v-tab-item>
        <v-tab-item>
          <WarehousePurchaseOrder :WarehouseId="$route.params.id" />
        </v-tab-item>
        <v-tab-item>
          <WarehousePurchaseReturn :WarehouseId="$route.params.id" />
        </v-tab-item>
        <v-tab-item>
          <WarehouseShop :WarehouseId="$route.params.id" />
        </v-tab-item>
      </v-tabs>
    </v-container>
  </div>
</template>

<!-- *************************************************************************
	SCRIPT
	************************************************************************* -->
<script>
import { Warehouse } from "../../../../../models/Warehouse";
//COMPONENTS

import WarehouseProductList from "./WarehouseProductList";
import WarehousePurchase from "./WarehousePurchaseList";
import WarehousePurchaseOrder from "./WarehousePurchaseOrderList";
import WarehousePurchaseReturn from "./WarehousePurchaseReturnList";
import WarehouseShop from "./WarehouseShopList";
import LineChart from "@/components/Charts/LineChart";
import PieChart from "@/components/Charts/PieChart";
import ColumnChart from "@/components/Charts/ColumnChart";

export default {
  data() {
    return {
      warehouse: {
        type: Object,
        default: {},
      },
    };
  },

  components: {
    WarehousePurchaseOrder,
    WarehousePurchaseReturn,
    WarehousePurchase,
    WarehouseShop,
    LineChart,
    PieChart,
    ColumnChart,

    WarehouseProductList,
  },
  methods: {
    GetWarehouse() {
      let warehouseId = this.$route.params.id;

      this.$store
        .dispatch("warehouse/GetWarehouseSingleId", warehouseId)
        .then((res) => {
          this.warehouse = new Warehouse().Initialise(res.data);
        })
        .catch((err) => {
          this.messages = err.data.title;
        });
    },
  },
  created() {
    this.GetWarehouse();
  },
};
</script>

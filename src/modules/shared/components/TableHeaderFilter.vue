<template>
  <!-- Table fields selector -->
  <v-menu offset-y :close-on-content-click="false">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        depressed
        small
        height="30"
        width="60"
        class="ma-auto mr-2 text-white bg-white w-100"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon class="icon_small ma-2">mdi-filter </v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item v-for="(item, index) in columns" :key="index">
        <v-list-item-title>
          <v-checkbox
            color="#002db3"
            dense
            hide-details="auto"
            v-model="item.show"
            :label="item.text"
            :disabled="item.disabled"
          ></v-checkbox>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
export default {
  props: {
    columns: {
      type: Array,
      default: {},
    },
  },
};
</script>

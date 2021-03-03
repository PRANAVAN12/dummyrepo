<template>
  <!-- Table fields selector -->
  <v-menu
    offset-y
    :close-on-content-click="false"
    transition="scroll-y-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        depressed
        block
        small
        height="30"
        :width="buttonWidth"
        class="ma-auto  text-white bg-white w-100 ma-0 filter"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon class="icon_small">mdi-filter </v-icon>
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
  computed: {
    buttonWidth: {
      get: function() {
        switch (this.$vuetify.breakpoint.name) {
          case "xs":
            return "100%";
          case "sm":
            return "100%";
          case "md":
            return "60%";
          case "lg":
            return "60%";
          case "xl":
            return "60%";
        }
      },
    },
  },
};
</script>

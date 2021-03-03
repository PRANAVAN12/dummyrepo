<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-icon
        class="icon_medium"
        color="#13928e"
        @click="onClick"
        v-bind="attrs"
        v-on="on"
        >mdi-plus-box</v-icon
      >
    </template>
    <span>{{tooltipText}}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    tooltipText: {
      type: String,
      default: "",
    },
  },
  data() {
  },
  methods: {
    onClick() {
        this.$emit("onClick",true)
    },
  },
};
</script>
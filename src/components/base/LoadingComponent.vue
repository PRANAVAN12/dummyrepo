<template>
  <v-container>
    <v-overlay v-if="visible"></v-overlay>
    <v-progress-linear active="false" indeterminate="false" :query="false" v-if="visible"></v-progress-linear>
  </v-container>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
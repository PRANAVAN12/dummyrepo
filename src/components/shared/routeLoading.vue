<template>
  <div v-if="isLoading">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="false"
      :height="80"
      :width="80"
      color="#007BFF"
      opacity="0.5"
    ></loading>
  </div>
</template>

<script>
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "route Loading",
  computed: {
    isLoading: function() {
      return this.$root.loading;
    },
  },
  components: {
    Loading,
  },
};
</script>

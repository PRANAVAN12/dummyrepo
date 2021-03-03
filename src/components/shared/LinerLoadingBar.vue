<template>
  <div class="loading-section">
    <!-- <v-progress-linear v-if="isLoading" class="loading-color" indeterminate rounded height="6"></v-progress-linear> -->
     <v-overlay v-if="isLoading"></v-overlay>

        <v-progress-linear
          active="false"
          indeterminate="false"
          :query="false"
          v-if="isLoading"
        ></v-progress-linear>
  </div>
</template>
<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style scoped>
.loading-color{
    color: blue !important;
}
.loading-section{
    height: 1px;
}
</style>
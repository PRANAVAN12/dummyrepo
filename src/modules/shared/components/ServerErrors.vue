<template>
  <v-container class="error-containner">
    <v-row>
          <v-col class="py-0 px-0">
        <v-icon>mdi-alert</v-icon>
        {{error.message}}
      </v-col>
      <v-col class="py-0 px-0 content-flex-end">
        <v-icon small>mdi-close</v-icon>
      </v-col>
    </v-row>
    <v-row>
    
    </v-row>
    <v-row v-for="err in error.error">
      <v-col class="py-0">
        <v-icon x-small>mdi-circle</v-icon>
        {{err[Object.keys(err)[0]]}}
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: {
    error: {
      type: Object,
      default: {
        message: "TEST",
        error: ["error 1", "error 2", "error 1", "error 2"],
      },
    },
  },
};
</script>
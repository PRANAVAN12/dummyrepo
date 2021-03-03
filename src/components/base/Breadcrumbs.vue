<template>
  <v-breadcrumbs :items="breadcrumb">
    <template v-slot:divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Breadcrumb",
  created: function() {},
  computed: {
    breadcrumb: function() {
      if (this.$route.params.id) {
        var replacedJson = null;
        var json = JSON.stringify(this.$route.meta.breadcrumb);
        if (this.bread) {      
          replacedJson = json.replace(":id", this.bread);
        } else {
          replacedJson = json.replace(":id", this.$route.params.id);
        }

        return JSON.parse(replacedJson);
      } else {
        return this.$route.meta.breadcrumb;
      }
    },
    ...mapState({ bread: "breadcrumb" }),
  },
};
</script>

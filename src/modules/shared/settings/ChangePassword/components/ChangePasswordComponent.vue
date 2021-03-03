<template>
  <div>
 <PageTitle
      title="Change Password"
      :permission="'Customer Create'"
    />

<v-row>
    <v-container fluid class="lighten-12 content ">
        <v-col cols="12">
    <ChangePassword /></v-col>
    </v-container>
  </v-row>
  </div>
</template>
<script>
import ChangePassword from "../../../../../components/shared/ChangePassword";
export default {
  data: () => ({
username:""


  }),
  components: {
    ChangePassword,
  },
  methods: {

  },
};
</script>

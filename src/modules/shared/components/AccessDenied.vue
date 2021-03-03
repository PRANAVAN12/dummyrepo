

<template>

  <v-app id="inspire">
   
  <v-main style="height:100%">
      <v-container style="background-image: url(https://storage-asset.msi.com/global/picture/wallpaper/wallpaper_15855579545e81b1c23ba07.jpg);" class="fill-height" fluid>
        <v-row  align="center" justify="center">
          <v-col  cols="12" sm="8" md="4">
            <v-card  style="border: solid 1px #313131;" class="elevation-12">
            <v-card-text><h1>Access Denied</h1>
            <v-divider/>
            <v-row>You do not have permision to access this page </v-row>
            <v-row> Please contact your site administrator(s)  to request access</v-row>
            <v-row><div class="my-2">
        <v-btn text small color="primary" @click="dashboard()">Return to the DashBoard</v-btn>
      </div></v-row>
            <v-row></v-row>
            </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
       <!-- </v-parallax> -->
    </v-main>
   
  </v-app>
</template>


<script>


export default {
  props: {
    source: String
  },
  components: {
    // BaseInput
  },
  data() {
    return {
     
    };
  },
  name: "AccessDenied",

  methods: {
   dashboard()
   {
       this.$router.push('/')
   }
  
  },

};
</script>




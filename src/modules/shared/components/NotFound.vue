

<template>

  <!-- <v-app id="inspire">
   
  <v-main style="height:100%">
      <v-container style="background-image: url(https://storage-asset.msi.com/global/picture/wallpaper/wallpaper_15855579545e81b1c23ba07.jpg);" class="fill-height" fluid>
        <v-row  align="center" justify="center">
          <v-col  cols="12" sm="8" md="4">
            <v-card  style="border: solid 1px #313131;" class="elevation-12">
            <v-card-text><h1> Page Not Found</h1>
            <v-divider/>
            <v-row><div class="my-2">
        <v-btn text small color="primary" @click="dashboard()">Return to the DashBoard</v-btn>
      </div></v-row>
            <v-row></v-row>
            </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
   
  </v-app> -->
    <v-app class="primary">
    <v-content>
      <v-layout align-center justify-center style="padding-top:250px    ">
        <v-flex xs12 sm6 md4 lg4 xl3>
          <v-row class="elevation-1 p-3" text-xs-center>
            <v-col cols="3">
              <img src="@/assets/img/svg/Forbidden.gif" style="width:150px" />
            </v-col>
            <v-col class="text-center " cols="9">
              <p class="flex my-4 grey--text">
                Doh! You don't have access to this action.
              </p>
              <v-spacer></v-spacer>
              <v-btn depressed small  @click="dashboard" color="primary" :loading="loading">Home</v-btn>
              <v-btn depressed small @click="tyrAgain" :loading="loading">Try again</v-btn>
            </v-col>
          </v-row>
        </v-flex>
      </v-layout>
    </v-content>
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
   async dashboard()
   {
       this.$router.push('/')
   },
   async tyrAgain() {
      window.location.reload();
    }
  
  },

};
</script>




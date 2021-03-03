<template>
  <v-app>
    <div id="app">
      <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
      <transition name="fade">
        <router-view :key="$route.path" />
      </transition>
    </div>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";
export default {
  computed: {
    // ...mapState({
    //   policies:state=>state.user.policies
    // })
    loading: function() {
      return this.$root.loading;
    },
  },
  watch: {
    // '$route':function(){
    //   this.checkPolicy()
    // }
  },
  methods: {
    // checkPolicy(){
    //   let routerMetaPolicy=this.$route.meta.permission;
    //   let hasPermission = _.find(this.$store.state.user.policies, function(policy) {
    //     return policy.name == routerMetaPolicy;
    //   });
    //   if(this.$route.name != "Dashboard" && this.$route.name != "Setting"){
    //     if(hasPermission === undefined) {
    //       this.$router.push("/notFound");
    //     }
    //   }
    // }
  },
};
</script>

<style lang="scss">
@import "./main.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

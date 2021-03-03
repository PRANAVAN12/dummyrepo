<template>
  <v-app>
    <div id="app">
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
    loading: function() {
      return this.$root.loading;
    },
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

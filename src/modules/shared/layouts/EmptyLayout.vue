
<template>
  <v-app>
    <div id="app">
      <transition name="fade">
        <router-view />
      </transition>
    </div>
  </v-app>
</template>
<script>
export default {
  created () {
    if (this.$msal.isAuthenticated()) this.$router.replace('/')
  }
}
</script>

<template>
  <div>
    <img src="../../../assets/img/speedcodelabs.jpg" class="bg" />
    <div id="page-wrap">
      <v-btn class="align-self-start mr-auto btn" @click.stop="$msal.signIn()" >
           <img  src="../../../assets/img/Microsoft.png" width="30" height="25" > Sign in with Microsoft
      </v-btn>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {

    }
  },
  methods: {
   
  },
  
  created () {
    if(this.$msal.isAuthenticated()){
      this.$router.push({ path: "/" });
    }
    
    // debugger
    // if (this.msal.isAuthenticated) {
    //   this.$router.push('/')
    // } else {
    //   this.$router.push('/login')
    // }
    
  },
  mounted(){
    
  },
  computed: {

  }
}
</script>

<!-- Use preprocessors via the lang attribute! e.g. <style lang="scss"> -->
<style>
.bg {
  min-height: 100%;
  min-width: 1024px;
  width: 100%;
  height: auto;
  position: fixed;
  top: 0;
  left: 0;
}
#page-wrap {
  position: relative;
  width: 300px;
  margin: 300px auto;
  padding: 20px;
  background: white;
  -moz-box-shadow: 0 0 20px black;
  -webkit-box-shadow: 0 0 20px black;
  box-shadow: 0 0 20px black;
}
.footer-texts {
    margin-top: 250px;
    margin-bottom: 4rem;
}
</style>>

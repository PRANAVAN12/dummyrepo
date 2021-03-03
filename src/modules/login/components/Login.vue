<template>
  <div class="limiter">
    <div class="container-login">
      <div class="wrap-login">
        <div class="login-form loginlayout ">
          <span class="login-form-title pb-5">
            Account Login
          </span>
          <v-row class="mb-3" v-show="messages.length > 0">
            <v-col cols="12">
              <div v-for="(msg, index) in messages" :key="index">
                <v-alert
                  dense
                  class="pl-3"
                  type="error"
                  text
                  color="red"
                  border="left"
                  colored-border
                >
                  {{ msg }}
                </v-alert>
              </div>
            </v-col>
          </v-row>
          <ValidationObserver ref="observer">
            <v-row>
              <v-col cols="12" class="pb-2">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Name"
                  rules="required"
                >
                  <v-text-field
                    v-model="form.username"
                    class="input100"
                    placeholder="Username"
                    :error-messages="errors"
                    outlined
                    hide-details="auto"
                    append-icon="mdi-account"
                      v-on:keydown.enter="login()"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Password"
                  rules="required"
                >
                  <v-text-field
                    v-model="form.password"
                    class="input100"
                    placeholder="Password"
                    :error-messages="errors"
                    outlined
                    hide-details="auto"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="() => (show1 = !show1)"
                    v-on:keydown.enter="login()"
                  ></v-text-field>
                  <!-- <v-text-field
                    v-model="form.password"
                    type="password"
                    :error-messages="errors"
                    outlined
                    placeholder="Password"
                    hide-details="auto"
                  ></v-text-field> -->
                </ValidationProvider>
              </v-col>
            </v-row>
          </ValidationObserver>

          <v-btn
            depressed
            class="login-form-btn"
            @click.stop="login()"
            :loading="loading"
            color="primary"
          >
            Sign in
          </v-btn>

          <div class="text-center pt-8 pb-2 ma-auto">
            <router-link to="/forgot-password" class="txt1">
              Forgot password?
            </router-link>
            <!-- </a> -->
          </div>
        </div>

        <div class="login-more"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { required, email, max } from "vee-validate/dist/rules";
import VuelidateMixin from "@/mixins/VuelidateMixins";
import { Login } from "../../../models/EntityModels/Login";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} is required",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});
export default {
  name: "Login",
  props: {
    source: String,
  },
  components: {
    // BaseInput
  },
  data() {
    return {
      form: new Login(),
      value: String,
      messages: [],
      errors: [],
      show1: false,
      loading: false,
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  name: "Login",
  mixins: [VuelidateMixin],
  methods: {
    async login() {
      const isValid = await this.$refs.observer.validate();
      // console.log("Validation is", isValid);
      if (isValid) {
        this.loading = true;
        this.$store
          .dispatch("user/Login", {
            username: this.form.username,
            password: this.form.password,
          })

          .then((res) => {
            this.$store.dispatch("user/LoginUser");
            debugger;
            this.$store.dispatch("GetPaginationSettings");
            this.$store.dispatch("GetPOSSettings");
             this.$store.dispatch("sitesetting/SiteSettingView", 1);
            // this.$store.dispatch("user/GetUser");
            this.messages = null;
            if (res.data && res.data.accessToken) {
              localStorage.setItem("token", res.data.accessToken);
              localStorage.setItem("user", JSON.stringify(res.data));
              setTimeout(() => {
                this.$router.push({
                  path: "/",
                });
              }, 1000);
              this.loading = false;
            } else if (res.data.redirectLink == "change-password") {
              var userName = this.CryptoJS.AES.encrypt(
                this.form.username,
                "changepassword"
              ).toString();
              var password = this.CryptoJS.AES.encrypt(
                this.form.password,
                "changepassword"
              ).toString();
              this.$router.push({
                path: `/change-password`,
                query: {
                  us: userName,
                  pwd: password,
                },
              });
              this.loading = false;
            } else {
              this.loading = false;
              this.$toast.error(res.title);
            }
          })
          .catch((err) => {
            this.messages = [];
            this.loading = false;
            // this.messages.push(err.data);
            this.messages.push("Incorrect username or password.");
          });
      }

      //
    },
    forgotPassword() {
      this.$router.push("/forgot-password");
    },
  },
};
</script>
<style>
/*//////////////////////////////////////////////////////////////////
[ FONT ]*/

/* @font-face {
  font-family: Poppins-Regular;
  src: url("../fonts/poppins/Poppins-Regular.ttf");
}

@font-face {
  font-family: Poppins-Medium;
  src: url("../fonts/poppins/Poppins-Medium.ttf");
}

@font-face {
  font-family: Poppins-Bold;
  src: url("../fonts/poppins/Poppins-Bold.ttf");
}

@font-face {
  font-family: Poppins-SemiBold;
  src: url("../fonts/poppins/Poppins-SemiBold.ttf");
} */

/* @font-face {
  font-family: Montserrat-Bold;
  src: url("../fonts/montserrat/Montserrat-Bold.ttf");
} */

/*//////////////////////////////////////////////////////////////////
[ RESTYLE TAG ]*/

.login-form * {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

.login-form body,
.login-form html {
  height: 100%;
  font-family: Poppins, sans-serif;
}

/*---------------------------------------------*/
.login-form a {
  font-family: Poppins;
  font-size: 14px;
  line-height: 1.7;
  color: #666666;
  margin: 0px;
  transition: all 0.4s;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
}

.login-form a:focus {
  outline: none !important;
}

.login-form a:hover {
  text-decoration: none;
  color: #333333;
}

/*---------------------------------------------*/
.login-form h1,
.login-form h2,
.login-form h3,
.login-form h4,
.login-form h5,
.login-form h6 {
  margin: 0px;
}

.login-form p {
  font-family: Poppins;
  font-size: 14px;
  line-height: 1.7;
  color: #666666;
  margin: 0px;
}

.login-form ul,
.login-form li {
  margin: 0px;
  list-style-type: none;
}

/*---------------------------------------------*/
.login-form input {
  outline: none;
  border: none;
}

.login-form textarea {
  outline: none;
  border: none;
}

.login-form textarea:focus,
.login-form input:focus {
  border-color: transparent !important;
}

.login-form input::-webkit-input-placeholder {
  color: #999999;
}

.login-form input:-moz-placeholder {
  color: #999999;
}

.login-form input::-moz-placeholder {
  color: #999999;
}

.login-form input:-ms-input-placeholder {
  color: #999999;
}

.login-form textarea::-webkit-input-placeholder {
  color: #999999;
}

.login-form textarea:-moz-placeholder {
  color: #999999;
}

.login-form textarea::-moz-placeholder {
  color: #999999;
}

.login-form textarea:-ms-input-placeholder {
  color: #999999;
}

/*---------------------------------------------*/
.login-form button {
  outline: none !important;
  border: none;
  /* background: transparent; */
}

.login-form button:hover {
  cursor: pointer;
}

.login-form iframe {
  border: none !important;
}

/*//////////////////////////////////////////////////////////////////
[ utility ]*/

/*==================================================================
[ Text ]*/
.txt1 {
  font-family: Poppins;
  font-size: 13px;
  line-height: 1.4;
  color: #464646 !important;
  text-decoration: none;
}

.txt2 {
  font-family: Poppins;
  font-size: 13px;
  line-height: 1.4;
  color: #00ad5f;
}

.txt3 {
  font-family: Poppins;
  font-size: 15px;
  line-height: 1.4;
  color: #00ad5f;
  text-transform: uppercase;
}

/*//////////////////////////////////////////////////////////////////
[ login ]*/

.limiter {
  width: 100%;
  margin: 0 auto;
}

.container-login {
  width: 100%;
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background: #f2f2f2;
}

.wrap-login {
  border-radius: 20px;
  width: 890px;
  background: #fff;
  overflow: hidden;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  flex-direction: row-reverse;
}

/*==================================================================
[ login more ]*/
.login-more {
  width: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  z-index: 1;
}

.login-more::before {
  content: "";
  display: block;
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  /* background: rgba(0, 0, 0, 0.3); */
}

/*==================================================================
[ Form ]*/

@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap");

.login-form {
  width: 50%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  /* padding: 255px 52px; */
  padding: 170px 48px;
}

.login-form-title {
  font-family: Poppins;
  font-size: 20px;
  color: #555555;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;

  width: 100%;
  display: block;
}

/*------------------------------------------------------------------
[ Input ]*/

.wrap-input100 {
  width: 100%;
  position: relative;
  border: 1px solid #e6e6e6;
}

.rs1-wrap-input100,
.rs2-wrap-input100 {
  width: 50%;
}

.rs2-wrap-input100 {
  border-left: none;
}

.input100 {
  display: block;
  width: 100%;
  background: transparent;
  font-family: Poppins;
  font-size: 18px;
  color: #666666;
  line-height: 1.2;
  padding: 0 25px;
}

.login-form input.input100 {
  height: 40px;
}

/*---------------------------------------------*/

/* .focus-input100 {
  position: absolute;
  display: block;
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  top: -1px;
  left: -1px;
  pointer-events: none;
  border: 1px solid #00ad5f;

  visibility: hidden;
  opacity: 0;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;

  -webkit-transform: scaleX(1.1) scaleY(1.3);
  -moz-transform: scaleX(1.1) scaleY(1.3);
  -ms-transform: scaleX(1.1) scaleY(1.3);
  -o-transform: scaleX(1.1) scaleY(1.3);
  transform: scaleX(1.1) scaleY(1.3);
} */

/* .input100:focus + .focus-input100 {
  visibility: visible;
  opacity: 1;

  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -ms-transform: scale(1);
  -o-transform: scale(1);
  transform: scale(1);
} */

/*------------------------------------------------------------------
[ Button ]*/
.container-login-form-btn {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.login-form-btn {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 50px;
  border-radius: 3px;
  background: #00ad5f;
  margin-top: 15px;
  font-family: poppins;
  font-size: 13px;

  color: #fff;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 1px;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.login-form-btn:hover {
  background: #333333;
  cursor: pointer;
}

/*------------------------------------------------------------------
[ Responsive ]*/

@media (max-width: 992px) {
  .login-form {
    width: 60%;
    padding-left: 30px;
    padding-right: 30px;
  }

  .login-more {
    width: 40%;
  }
}

@media (max-width: 768px) {
  .login-form {
    width: 100%;
  }

  .login-more {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .login-form {
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 150px;
  }

  .rs1-wrap-input100,
  .rs2-wrap-input100 {
    width: 100%;
  }

  .rs2-wrap-input100 {
    border-left: 1px solid #e6e6e6;
  }
}

.login-form .error_msg {
  background-color: #ff3e3e42;
  padding: 1px 9px;
  color: #6f0000;
  font-size: 10px;
  font-family: Poppins;
  border-radius: 5px;
}

.login-form .v-input__slot fieldset {
  /* background-color: #e8f0fe; */
  /* border: 1px solid #c5c5c5; */
  color: #d6d6d6 !important;
}

.login-form
  .v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)
  > .v-input__control
  > .v-input__slot {
  padding: 6px 10px !important;
  border-radius: unset;
}

/* Remove Autofill color */
.login-form input:-webkit-autofill,
.login-form input:-webkit-autofill:hover,
.login-form input:-webkit-autofill:focus,
.login-form input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px white inset !important;
}

.border-left-none fieldset {
  border-left: 0px;
}

.border-left-none fieldset:focus {
  outline: red;
}

.loginlayout {
  padding: 140px 48px !important;
}
</style>

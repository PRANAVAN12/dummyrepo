<template>
  <v-app id="inspire">
    <v-main style="height:100%">
      <div class="limiter">
        <div class="container-login">
          <div class="wrap-login">
            <div class="login-form">
              <span class="login-form-title pb-5">
                Forgot Password
              </span>

              <v-row class="mb-3" v-show="messages.length > 0">
                <v-col cols="12">
                  <div v-for="(msg, index) in messages" :key="index">
                    <v-alert
                      v-if="!succeed"
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
                    <v-alert
                      v-else
                      dense
                      class="pl-3"
                      type="success"
                      text
                      border="left"
                    >
                      {{ msg }}
                    </v-alert>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" v-if="!succeed">
                  <ValidationObserver ref="observer">
                    <form>
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="Email"
                        rules="required"
                      >
                        <v-text-field
                          v-model="form.username"
                          class="input100"
                          placeholder="Email"
                          :error-messages="errors"
                          outlined
                          hide-details="auto"
                           v-on:keydown.enter="forgotPassword()"
                        ></v-text-field>
                      </ValidationProvider>
                      <!-- <ul style="color:red" class="overline text-left">
                        <li v-for="(error, index) in messages" :key="index">
                          <span>{{ error }}</span>
                        </li>
                      </ul> -->
                    </form>
                  </ValidationObserver>
                </v-col>
                <v-col cols="12" v-if="!succeed">
                  <v-btn
                    depressed
                    color="primary"
                    :loading="loading"
                    class="login-form-btn"
                    @click.stop="forgotPassword()"
                  >
                    Send
                  </v-btn>
                </v-col>
                <v-col cols="12" class="text-center mt-6">
                  <v-btn
                    icon
                    class="mx-2"
                    depressed
                    fab
                    small
                    @click.stop="back()"
                  >
                    <v-icon dark>
                      mdi-arrow-left-circle
                    </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </div>

            <div
              class="fogetpassword-more"
  
            ></div>
            
          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>
<script>
import { required, email, max } from "vee-validate/dist/rules";
import User from "../../../models/User";
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
  props: {
    source: String,
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  computed: {
    alertType: function() {
      return this.succeed ? "success" : "error";
    },
  },
  data() {
    return {
      form: {
        username: "",
      },
      messages: [],
      succeed: false,
      loading: false,
    };
  },
  name: "Login",
  methods: {
    back() {
      this.$router.push("/login");
    },
    async forgotPassword() {
      this.messages = [];
      const status = await this.$refs.observer.validate();
      this.errors = [];
      if (status) {
        this.loading = true;
        this.$store
          .dispatch("user/ForgetPassword", { email: this.form.username })
          .then((res) => {
            debugger;
            this.succeed = true;
            this.messages.push(res.data.data);
            this.loading = false;
          })
          .catch((err) => {
            debugger;
            this.messages.push(err.data);
            this.loading = false;
          });
      }
    },
  },
  validations: {
    form: {
      username: { required },
    },
  },
};
</script>
<style>
.messages {
  border: transparent !important;
  margin-right: 40px;
}

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
.fogetpassword-more {
  width: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  z-index: 1;
}

.fogetpassword-more::before {
  content: "";
  display: block;
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
 
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

  .fogetpassword-more {
    width: 40%;
  }
}

@media (max-width: 768px) {
  .login-form {
    width: 100%;
  }

  .fogetpassword-more {
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
</style>

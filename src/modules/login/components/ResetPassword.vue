<template>
  <div class="limiter">
    <div class="container-login">
      <div class="wrap-login">
        <div class="login-form">
          <span class="login-form-title font-weight-medium pb-5">
            Reset Password
          </span>

          <div class="changepassbody">
            <ValidationObserver ref="observer">
              <v-row>
                <v-col cols="12" style="padding-right:0">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name=" password"
                    rules="required"
                  >
                    <v-text-field
                      @click:append="show2 = !show2"
                      v-model="form.password"
                      label="New password"
                      dense
                      required
                      outlined
                      hide-details="auto"
                      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show2 ? 'text' : 'password'"
                      :error-messages="passwordNotMatchError"
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" style="padding-right:0">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="confirm password"
                    rules="required"
                  >
                    <v-text-field
                      v-model="form.rePassword"
                      hide-details="auto"
                      dense
                      outlined
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show1 ? 'text' : 'password'"
                      @click:append="show1 = !show1"
                      @mousedown="onConfirmPasswordMouseDown()"
                      required
                      :error-messages="passwordNotMatchError"
                      label="Confirm Password"
                          v-on:keydown.enter="Reset()"
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
            </ValidationObserver>
          </div>
          <v-btn
            depressed
            class="login-form-btn"
            @click="Reset()"
            :loading="loading"
            color="primary"
          >
            Reset
          </v-btn>
        </div>

        <div class="reset-more"></div>
      </div>
    </div>
  </div>
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
  data() {
    return {
      form: {
        password: "",
        rePassword: "",
      },  passwordNotMatchError: null,
      show1: false,
      show2: false,
      messages: null,

      loading: false,
    };
  },
  name: "Login",

  methods: {
    onConfirmPasswordMouseDown() {
      this.passwordNotMatchError = null;
    },

    async Reset() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.ResetPassword();
      }
    },
    ResetPassword() {
      debugger;
      if (this.form.password !== this.form.rePassword) {
        this.passwordNotMatchError = "passwords does not match";
      } else {
        this.passwordNotMatchError = null;
      }
      if (this.form.password == this.form.rePassword) {
        debugger;
        this.loading = true;
        var resetLink = this.$route.query.token;
        this.$store
          .dispatch("user/ResetPassword", {
            resetLink: resetLink,
            newPassword: this.form.password,
          })
          .then((res) => {
            this.loading = false;
            this.$toast.success("password has been changed");
            this.$router.push({ path: "Login" });
          })
          .catch((err) => {
            this.loading = false;
            this.messages = err.data.detail;
          });
      }
    },
  },
 
};
</script>

<style>

.changepassbody {
    width: 100%;
    height: 117px !important;
    margin: 20px 0px;
}
.login-form * {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
      margin-bottom: 2px;
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
.reset-more {
  width: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  z-index: 1;
}

.reset-more::before {
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
  padding: 140px 48px;
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
}

.login-form input.input100 {
  height: 40px;
}

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

.not-form-btn {
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
.changepassbody {
  width: 100%;
  height: 170px;
  margin: 20px 0px;
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

  .reset-more {
    width: 40%;
  }
}

@media (max-width: 768px) {
  .login-form {
    width: 100%;
  }

  .reset-more {
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
</style>

<template>
  <ValidationObserver ref="observer">
    <v-row>
      <!-- username: {{username}}    LoginUser:{{LoginUser}} -->
      <v-col >
        <v-card class="lighten-12">
          <v-card-title>Change Password </v-card-title>
          <v-container fluid class="light gray lighten-12">
            <v-col >
              <ValidationProvider
                name="Current Password"
                v-slot="{ errors }"
                rules="required"
              >
                <v-text-field
                  dense
                  outlined
                  hide-details="auto"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show2 ? 'text' : 'password'"
                  @click:append="show2 = !show2"
                  v-model="Password.current_password"
                  required
                  :error-messages="errors"
                  label="Current Password"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="12">
              <ValidationProvider
                name="New Password"
                required
                v-slot="{ errors }"
              >
                <v-text-field
                 hide-details="auto"
                  dense
                  outlined
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                  v-model="Password.new_password"
                  required
                  :error-messages="passwordNotMatchError"
                  label="New Password"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="12">
              <ValidationProvider
                name="Confirm Password"
                required
                v-slot="{ errors }"
              >
                <v-text-field
                 hide-details="auto"
                  dense
                  outlined
                  required
                  :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show3 ? 'text' : 'password'"
                  v-model="Password.confirm_password"
                  @click:append="show3 = !show3"
                  :error-messages="passwordNotMatchError"
                  label="Confirm Password"
                  @mousedown="onConfirmPasswordMouseDown()"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
          </v-container>
        </v-card>
        <v-row>
          <v-col class="content-flex-end">
            <v-btn
              depressed
              small
              height="15"
              class="btn_blue btn_medium w-100 text-right"
              @click="ChangePassword()"
              >Change</v-btn
            >
            <v-btn depressed small class="text-white btn_medium" @click="clear"
              >Clear</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </ValidationObserver>
</template>
<script>
import { required, email, max } from "vee-validate/dist/rules";
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
    username: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      Password: {
        current_password: "",
        new_password: "",
        confirm_password: "",
      },
      show1: false,
      show2: false,
      show3: false,
      isCurrentPasswordHidden: String,
      isNewPasswordHidden: String,
      isConfirmPasswordHidden: String,

      errors: [],
      messages: null,
      passwordNotMatchError: null,
      CurrentUser: "",
      LoginUser: "",
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },

  methods: {
    onConfirmPasswordMouseDown() {
      this.passwordNotMatchError = null;
    },
    clear() {
      this.Password = {};
      this.$refs.observer.reset();
    },

    GetLoginUser() {
      this.$store
        .dispatch("user/LoginUser")
        .then((res) => {
          this.LoginUser = res.data.username;
        })
        .catch((err) => {
          this.isLoading = false;
          this.messages = err.data.title;
        });
    },

    async ChangePassword() {
      this.messages = null;
      const isValid = await this.$refs.observer.validate();
      // const isValid = await this.$refs.observer.validate();
      if (this.Password.new_password !== this.Password.confirm_password) {
        this.passwordNotMatchError = "passwords does not match";
      } else {
        this.passwordNotMatchError = null;
      }
      if (this.Password.new_password == this.Password.confirm_password) {
        this.$store
          .dispatch("user/ChangePassword", this.Password)
          .then((res) => {
            this.succeeed = true;
            this.$router.push({ path: "/" });
            this.$toast.success("Change password successfully");
          })
          .catch((err) => {
            this.isLoading = false;
            this.messages = err.data.title;
            this.$toast.error("Change password failed");
            this.$toast.error("Current password not matched");
          });
      }
    },
  },
  created() {
    this.GetLoginUser();
  },
};
</script>

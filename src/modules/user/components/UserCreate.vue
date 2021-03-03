<template>
  <div>
    <PageTitle title="Create User" :backBtn="true" :showLoading="isLoading" />

    <v-container fluid class="lighten-12 content">
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="12">
          <v-row>
            <v-col cols="12">
              <ValidationObserver ref="observer" v-slot="{ validate, reset }">
                <v-card class="lighten-12 card-content mb-1">
                  <v-card-title> General</v-card-title>
                  <!-- Stack the columns on mobile by making one full-width and the other half-width -->
                  <v-container fluid class="light gray lighten-12">
                    <form>
                      <v-row>
                        <v-col cols="12" sm="6" md="6" lg="6">
                          <ValidationProvider
                            v-slot="{ errors }"
                            vid="user"
                            name="User"
                            rules="required"
                          >
                            <v-text-field
                              outlined
                              dense
                              v-model="user.user"
                              :error-messages="errors"
                              label="User"
                              hide-details="auto"
                            ></v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="6">
                          <ValidationProvider
                            v-slot="{ errors }"
                            name="Email"
                            vid="name"
                            rules="required"
                          >
                            <v-select
                              hide-details="auto"
                              dense
                              v-model="user.email"
                              item-text="name"
                              item-value="id"
                              :items="Getemails"
                              :error-messages="errors"
                              label="Email"
                              outlined
                            ></v-select>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="6">
                          <ValidationProvider
                            v-slot="{ errors }"
                            name="Staff"
                            vid="roles"
                            rules="required"
                          >
                            <v-select
                              hide-details="auto"
                              dense
                              v-model="user.staff_id"
                              item-text="last_name"
                              item-value="id"
                              :items="staffs"
                              :error-messages="errors"
                              label="Staff"
                              outlined
                            ></v-select>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="6">
                          <ValidationProvider
                            v-slot="{ errors }"
                            name="Role"
                            vid="roles"
                            rules="required"
                          >
                            <v-select
                              hide-details="auto"
                              dense
                              v-model="user.roles"
                              item-text="name"
                              item-value="id"
                              :items="roles"
                              :error-messages="errors"
                              label="Roles"
                              outlined
                            ></v-select>
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                    </form>
                  </v-container>
                </v-card>
              </ValidationObserver>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-card-actions class="pa-0">
        <v-spacer></v-spacer>
        <v-btn @click="clear" depressed small class="ml-1 text-white btn_medium"
          >clear</v-btn
        >
        <v-btn
          @click="submit"
          depressed
          small
          class="text-white btn_blue btn_medium w-100"
          >submit</v-btn
        >
      </v-card-actions>
    </v-container>
  </div>
</template>

<script>
import { required, email, max, regex } from "vee-validate/dist/rules";
import { User } from "../../../models/User";
import { UserEntityModel } from "../../../models/EntityModels/UserEnitityModel";
import { mapGetters } from "vuex";
import ServerMessages from "@/components/shared/ServerMessages";

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

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    ServerMessages,
  },

  data: () => ({
    isLoading: false,
    isSubmitDisabled: false,
    name: "",
    email: "",
    select: null,
    roles: [],
    staffs:[],
    Getemails: [],
    checkbox: null,
    user: new User(),
    errors: [],
    messages: [],
    ServerError: "",
  }),

  methods: {
    async submit() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.RegisterUser();
      }
    },
    clear() {
      this.user = new User();
      this.$refs.observer.reset();
    },
    RegisterUser() {
      this.isLoading = true;
      this.isSubmitDisabled = true;
      this.messages = [];
      this.$store
        .dispatch("user/RegisterUser", new UserEntityModel(this.user))
        .then(async (res) => {
          this.isSubmitDisabled = false;
          this.succeeed = true;
          this.isLoading = false;
          this.$router.push({ path: "/user" });
          this.$toast.success("User registered successfully");
        })
        .catch((err) => {
          this.isSubmitDisabled = false;
          this.$refs.observer.setErrors(err.data.error);
          this.isLoading = false;
          this.$toast.error("Registration failed");
          this.isLoading = false;
        });
    },

    GetRoles() {
      this.$store
        .dispatch("GetRoles")
        .then((res) => {
          this.roles = res.data;
        })
        .catch((err) => {
          this.messages = err.data.title;
        });
    },
    GetUsers() {
      this.$store
        .dispatch("staff/GetStaffs")
        .then((res) => {
          this.staffs = res.data.data;
        })
        .catch((err) => {
          this.messages = err.data.title;
        });
    },
    GetEmails() {
      this.$store
        .dispatch("fetchmsuser")
        .then((res) => {
          this.Getemails = res.data.map((p) => {
            let object = new Object();
            object.id = p.mail;
            object.name = p.mail;
            return object;
          });
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.GetRoles();
    this.GetEmails();
    this.GetUsers();
  },
};
</script>

<style scoped>

</style>

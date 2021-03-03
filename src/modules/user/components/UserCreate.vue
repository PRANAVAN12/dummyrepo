<template>
  <div>
    <PageTitle title="Create User" :backBtn="true" :showLoading="isLoading" />

    <v-container fluid class="lighten-12 content">
      <v-row>
        <v-col cols="12" sm="12" md="8" lg="8">
          <v-row>
            <v-col cols="12">
              <ValidationObserver ref="observer" v-slot="{ validate, reset }">
                <v-card class="lighten-12 card-content mb-1">
                  <!-- <v-overlay v-if="isLoading"></v-overlay> -->

                  <!-- <v-progress-linear
              active="false"
              indeterminate="false"
              :query="false"
              v-if="isLoading"
            ></v-progress-linear> -->
                  <v-card-title> General</v-card-title>
                  <!-- Stack the columns on mobile by making one full-width and the other half-width -->
                  <v-container fluid class="light gray lighten-12">
                    <form>
                      <v-row>
                        <v-col cols="12" sm="6" md="6" lg="6">
                          <ValidationProvider
                            v-slot="{ errors }"
                            vid="first_name"
                            name="First Name"
                            rules="required"
                          >
                            <v-text-field
                              outlined
                              dense
                              v-model="user.firstName"
                              :error-messages="errors"
                              label="First Name"
                              hide-details="auto"
                            ></v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="6">
                          <ValidationProvider
                            v-slot="{ errors }"
                            vid="last_name"
                            name="Last Name"
                            rules="required"
                          >
                            <v-text-field
                              hide-details="auto"
                              outlined
                              dense
                              v-model="user.lastName"
                              :error-messages="errors"
                              label="Last Name"
                            ></v-text-field>
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="6" md="6" lg="6">
                          <ValidationProvider
                            v-slot="{ errors }"
                            name="Email"
                            vid="email"
                            rules="required|email"
                          >
                            <v-text-field
                              outlined
                              dense
                              hide-details="auto"
                              v-model="user.email"
                              :error-messages="errors"
                              label="E-mail"
                              required
                            ></v-text-field>
                            <!-- <ServerMessages dense name="email" /> -->
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="6">
                          <ValidationProvider
                            v-slot="{ errors }"
                            name="Username"
                            vid="username"
                            rules="required"
                          >
                            <v-text-field
                              hide-details="auto"
                              outlined
                              dense
                              v-model="user.username"
                              :error-messages="errors"
                              label="UserName"
                              required
                            ></v-text-field>
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="12" md="12" lg="6">
                          <ValidationProvider
                            v-slot="{ errors }"
                            name="Roles"
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

          <v-row
            ><v-col cols="12">
              <v-card class="lighten-12 card-content">
                <v-card-title> Address</v-card-title>
<v-container>
                <AddressComponent
                  ref="addressComponent"
                  :address="user.address"
                />
                </v-container>
              </v-card>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-card class="lighten-12 card-content">
                <v-card-title> Contact</v-card-title>
                <v-container fluid class="light gray lighten-12">
                  <v-row>
                    <v-col cols="12" sm="6" md="6" lg="6">
                      <ValidationProvider
                        v-slot="{ errors }"
                        :rules="{ regex: /^[+,-,0-9]*[+,-,0-9]*$/ }"
                      >
                        <v-text-field
                          hide-details="auto"
                          dense
                          outlined
                          maxlength="13"
                          v-model="user.contact.telephone"
                          :error-messages="errors"
                          label="Telephone"
                          required
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="6">
                      <ValidationProvider
                        v-slot="{ errors }"
                        :rules="{ regex: /^[+,-,0-9]*[+,-,0-9]*$/ }"
                      >
                        <v-text-field
                          dense
                          outlined
                          v-model="user.contact.phone"
                          :error-messages="errors"
                          label="phone"
                          maxlength="13"
                          required
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
          <v-row>
            <v-col cols="12">
              <v-card class="lighten-12">
                <v-container class="light gray lighten-12">
                  <v-row>
                    <v-col cols="12 py-0">
                      <v-flex class="pt-0 pa-1">
                        <FileUpload
                          title="Image"
                          :multiple="false"
                          v-model="selectedImages"
                          size="2048"
                          :types="['jpeg', 'png', 'jpg']"
                          :showPreview="true"
                          :camera="true"
                        />
                      </v-flex>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- Submit -->
      <!-- <v-col offset="9">
        <v-btn
          depressed
          small
          class="text-white btn_blue btn_medium w-100"
          :disabled="isSubmitDisabled"
          @click="submit"
          >submit</v-btn
        >
        <v-btn depressed small @click="clear" class="ml-1 text-white btn_medium"
          >clear</v-btn
        >
      </v-col> -->
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
import AddressComponent from "../../shared/components/Address";
import { mapGetters } from "vuex";
import FileUpload from "@/components/base/FileUpload";
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

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});
extend("regex", {
  ...regex,
  message: "The value is not a valid phone number",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    AddressComponent,
    FileUpload,
    ServerMessages,
  },

  data: () => ({
    isLoading: false,
    isSubmitDisabled: false,
    name: "",
    email: "",
    select: null,
    roles: [],
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: null,
    user: new User(),
    errors: [],
    messages: [],
    selectedImages: "",
    countries: [],

    ServerError: "",
  }),

  methods: {
    async submit() {
      const isValid = await this.$refs.observer.validate();
      let addrssComponentValid = true;
      if (
        this.user.address.address_line1 ||
        this.user.address.city ||
        this.user.address.country_id
      ) {
        addrssComponentValid = await this.$refs.addressComponent.isValid();
      }
      if (isValid && addrssComponentValid) {
        this.RegisterUser();
      }
    },
    async UploadUserImage(userId) {
      let fromData = new FormData();
      fromData.append("image", this.selectedImages);
      fromData.append("id", userId);
      return await this.$store.dispatch(`user/UploadUserImage`, fromData);
    },

    clear() {
      this.user = new User();
      this.$refs.observer.reset();
    },
    RegisterUser() {
      this.isLoading = true;
      this.isSubmitDisabled = true;
      this.isSubmitDisabled = true;
      this.messages = [];
      this.$store
        .dispatch("user/RegisterUser", new UserEntityModel(this.user))
        .then(async (res) => {
          this.isSubmitDisabled = false;
          this.succeeed = true;
          window.open(res.data.credential, "_blank");

          if (this.selectedImages) {
            await this.UploadUserImage(res.data.id)
              .then(() => {
                this.isLoading = false;
                this.$router.push({ path: "/user" });
                this.$toast.success("User registered successfully");
              })
              .catch(() => {
                this.isLoading = false;
                this.$toast.success("User registered successfully");
                this.$toast.error("User image uploading failed");
                this.isLoading = false;
              });
            this.$router.push({ path: "/user" });
          } else {
            this.isLoading = false;

            this.$router.push({ path: "/user" });
            this.$toast.success("User registered successfully");
          }
        })
        .catch((err) => {
          this.ServerError = err.response;
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
    GetCountries() {
      this.$store
        .dispatch("GetCountries")
        .then((res) => {
          this.countries = res.data;
          console.log("USERRRSSS");
        })
        .catch((err) => {
          this.messages = err.data.title;
          this.isLoading = false;
        });
    },
  },
  created() {
    this.GetRoles();
    this.GetCountries();
  },
  computed: {
    // ...mapGetters("Countryname", ["GetCountries"]),
  },
};
</script>

<style scoped>
/* .btnRightMargin {
  margin-right: 10px;
}

.container {
  color: white !important;
}
.form-blue {
  background: #d8dbe0;
  border-radius: 0.25rem;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}
.messages {
  border: transparent !important;
  margin-right: 40px;
} */
</style>

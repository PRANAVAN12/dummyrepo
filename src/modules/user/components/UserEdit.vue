<template>
  <div>
    <PageTitle title="Edit User" :backBtn="true" :showLoading="isLoading" />
    <v-container fluid class="lighten-12 content">
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="8">
          <v-row>
            <v-col>
              <v-card class="lighten-12 card-content mb-1">
                <v-card-title>General</v-card-title>
                <v-container fluid class="light gray lighten-12">
                  <!-- <v-overlay v-if="isLoading"></v-overlay> -->

                  <!-- <v-progress-linear
              active="false"
              indeterminate="false"
              :query="false"
              v-if="isLoading"
            ></v-progress-linear> -->

                  <ValidationObserver
                    ref="observer"
                    v-slot="{ validate, reset }"
                  >
                    <form>
                      <v-row>
                        <v-col cols="12" sm="6" md="6" lg="6">
                          <ValidationProvider
                            v-slot="{ errors }"
                            name="firstName"
                            vid="first_name"
                            rules="required"
                          >
                            <v-text-field
                              hide-details="auto"
                              outlined
                              dense
                              v-model="user.firstName"
                              :error-messages="errors"
                              label="FirstName"
                              required
                            ></v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="6">
                          <ValidationProvider
                            v-slot="{ errors }"
                            name="lastName"
                            vid="last_name"
                            rules="required"
                          >
                            <v-text-field
                              hide-details="auto"
                              outlined
                              dense
                              v-model="user.lastName"
                              :error-messages="errors"
                              label="Last Name"
                              required
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
                              hide-details="auto"
                              outlined
                              dense
                              v-model="user.email"
                              :error-messages="errors"
                              label="E-mail"
                              required
                            ></v-text-field>
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
                              disabled
                              v-model="user.username"
                              :error-messages="errors"
                              label="UserName"
                              required
                            ></v-text-field>
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="12" md="12" lg="12">
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
                  </ValidationObserver>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
          <v-row
            ><v-col cols="12">
              <ValidationObserver ref="address" v-slot="{ validate, reset }">
                <v-card class="lighten-12 card-content">
                  <v-card-title> Address</v-card-title>
<v-container>
                  <AddressComponent
                    ref="addressComponent"
                    :address="user.address"
                  />
                  </v-container>
                </v-card>
              </ValidationObserver>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-card class="lighten-12 card-content">
                <v-card-title> Contacts</v-card-title>
                <v-container fluid class="light gray lighten-12">
                  <v-row>
                    <v-col cols="12" sm="6" md="6" lg="6">
                      <ValidationProvider
                        v-slot="{ errors }"
                        :rules="{ regex: /^[+,-,0-9]*[+,-,0-9]*$/ }"
                      >
                        <v-text-field
                          dense
                          outlined
                          v-model="user.contact.telephone"
                          :error-messages="errors"
                          maxlength="13"
                          label="Telephone"
                          required
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="6">
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
        <v-col cols="12" sm="12" md="12" lg="4">
          <v-row>
            <v-col cols="12">
              <v-card class="lighten-12">
                <v-container class="light gray lighten-12">
                  <v-row>
                    <v-col cols="12 py-0">
                      <v-flex class="pt-0 pa-1">
                        <FileUpload
                          title="Image"
                          @isImageUpdated="onChangeImageUpload"
                          :multiple="false"
                          v-model="selectedImages"
                          :externalFiles="user.image ? [user.image] : []"
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
            </v-col> </v-row
        ></v-col>
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

      <v-row>
        <v-col cols="12" sm="12" md="6" lg="12" class="content-flex-end">
          <btn-cancel></btn-cancel>
          <v-btn
            depressed
            small
            class="text-white btn_blue btn_medium w-100"
            @click="submit"
            :disabled="isDisabledSubmit"
            >Update</v-btn
          >
        </v-col>
      </v-row>
      <!-- <ChangePassword :username="user.username" /> -->
    </v-container>
  </div>
</template>

<script>
import { required, email, max, regex } from "vee-validate/dist/rules";
import jwt_decode from "jwt-decode";
import { mapGetters } from "vuex";
import { User } from "../../../models/User";

import { UserViewModel } from "../../../models/View Models/UserViewModel";
import AddressComponent from "../../shared/components/Address";
import FileUpload from "@/components/base/FileUpload";
import ChangePassword from "../../../components/shared/ChangePassword";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import { Contact } from "../../../models/Contact";

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
    ChangePassword,
  },
  data: () => ({
    name: "",
    email: "",
    imageUpdated: null,
    show: false,
    isAdmin: false,
    value: String,
    select: null,
    roles: [],
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: null,
    user: new User(),
    loginedUser: new User(),
    isLoading: false,
    errors: [],
    selectedImages: "",
    oldUserDetails: new User(),
    messages: [],
    LoginUser: "",
    CurrentUser: "",
  }),
  computed: {
    ...mapGetters("user", ["GetUsers"]),
  },

  methods: {
    onChangeImageUpload(value) {
      this.imageUpdated = value;
    },
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
        this.EditUser();
      }
    },
    // GetLoginUser() {
    //   this.$store;
    //   this.$store
    //     .dispatch("user/LoginUser")
    //     .then((res) => {
    //
    //       this.LoginUser = res.data.firstName;
    //
    //     })
    //     .catch((err) => {
    //       this.isLoading = false;
    //       this.messages = err.data.title;
    //     });
    // },
    clear() {
      this.user = new User();
      this.$refs.observer.reset();
    },
    async UploadUserImage(userId) {
      let fromData = new FormData();

      if (this.selectedImages && this.imageUpdated) {
        fromData.append("image", this.selectedImages);
        fromData.append("id", userId);
        return await this.$store
          .dispatch(`user/UploadUserImage`, fromData)
          .then(() => {})
          .catch(() => {
            this.$toast.error("User image uploading failed");
          });
      } else if (this.imageUpdated == false) {
        debugger;
        fromData.append("image", this.selectedImages);
        fromData.append("id", userId);
        return await this.$store
          .dispatch(`user/UploadUserImage`, fromData)
          .then(() => {})
          .catch(() => {
            this.$toast.error("User image uploading failed");
          });
      } else {
        return true;
      }
      debugger;

      formData.append("id", id);
      console.log(this.selectedImages);
    },

    cancel() {
      this.$router.push({ path: "/user" });
    },
    Reset() {
      this.user = this.oldUserDetails;
      this.$refs.observer.reset();
    },

    EditUser() {
      let userId = this.$route.params.id;
      this.isLoading = true;
      this.user.Id = userId;

      this.$store
        .dispatch("user/EditUser", this.user)
        .then(async (res) => {
          this.$router.push("/user");
          await this.UploadUserImage(userId)
            .then(() => {
              this.succeeed = true;
              this.isLoading = false;
              this.$emit("refreshData");
              this.$toast.success("User edited successfully");
              this.$router.push("/user");
            })
            .catch(() => {
              this.isLoading = false;

              this.$toast.error("User edit failed");
            });
        })

        .catch((err) => {
          this.isLoading = false;
          let error = {};
          err.data.error.forEach((element) => {
            error[Object.keys(element)[0]] = element[Object.keys(element)[0]];
          });
          this.$refs.observer.setErrors(error);
          this.messages = err.data.title;
          this.$toast.error("Edit failed");
        });
    },

    GetRoles() {
      this.$store
        .dispatch("user/GetRoles")
        .then((res) => {
          this.roles = res.data.data;
        })
        .catch((err) => {
          this.messages = err.data.title;
        });
    },

    getUser() {
      let userId = this.$route.params.id;
      this.$store
        .dispatch("user/GetSingleUser", userId)
        .then((res) => {
          this.succeeed = true;
          this.user = new UserViewModel(res.data);
          if (this.user.image) {
            this.user.image = this.user.image + "?t=" + Date.now();
          }

          console.log(this.user);
          this.oldUserDetails = this.user;
          this.loginedUser = this.parseJwt(localStorage.getItem("token"));
          const index = this.loginedUser.roles.findIndex(
            (role) => role.name === "Admin"
          );
          this.isAdmin = index != -1;
          if (index == -1 && this.loginedUser.username !== this.user.username) {
            // this.$router.push("/accessDenied");
          }
        })
        .catch((err) => {
          this.messages.push(err.data);
          // this.$router.push("/accessDenied");
        });
    },
    parseJwt(token) {
      jwt_decode(token);
      const user = new User().initialise(jwt_decode(token).rese);
      return user;
    },
  },
  created() {
    this.GetRoles();
    this.getUser();
    // this.GetLoginUser();
    this.loginedUser = this.parseJwt(localStorage.getItem("token"));
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

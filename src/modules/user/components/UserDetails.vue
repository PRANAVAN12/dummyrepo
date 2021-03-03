<template>
  <div>
    <PageTitle
      title="User View"
      :backBtn="true"
      :editRoute="'/user/edit/' + this.$route.params.id"
      :permission="'User Edit'"
      :resetPasswordPermission="'User Reset Password'"
      :resetpass="true"
      @onResetPassword="onReset()"
    />
    <v-container fluid>
      <!-- Page Title -->

      <v-row>
        <v-col cols="12" sm="12" md="4" lg="4">
          <v-card>
            <v-img :src="user.image" height="450"> </v-img>
            <v-list two-line class="pl-10 pr-10">
              <v-list-item href="#">
                <v-list-item-action>
                  <v-icon color="indigo">mdi-id-card</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title
                    class="font-weight-black text-decoration-underline"
                    >Full Name</v-list-item-title
                  >
                  <v-list-item-title
                    >{{ user.firstname }} {{ user.lastname }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-divider inset></v-divider>
              <v-list-item href="#">
                <v-list-item-action>
                  <v-icon color="indigo">mail</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title
                    class="font-weight-black text-decoration-underline"
                    >Mail</v-list-item-title
                  >
                  <v-list-item-title>{{ user.email }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider inset></v-divider>
              <v-list-item href="#">
                <v-list-item-action>
                  <v-icon color="indigo">mdi-account-group-outline</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title
                    class="font-weight-black text-decoration-underline"
                    >Roles</v-list-item-title
                  >
                  <v-list-item-title>
                    {{ user.roles[0].name }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="8" lg="8">
          <v-card class="mb-15">
            <v-card-title>Contact</v-card-title>
            <v-list two-line class="pa-0">
              <v-list-item href="#">
                <v-list-item-action>
                  <v-icon color="indigo">mdi-phone-classic </v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ user.contacts.telephone }}</v-list-item-title
                  >

                  <v-list-item-sub-title
                    >Telephone Number</v-list-item-sub-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-divider inset></v-divider>
              <v-list-item href="#">
                <v-list-item-action>
                  <v-icon color="indigo">mdi-cellphone-basic</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ user.contacts.phone }}</v-list-item-title
                  >
                  <v-list-item-sub-title>Mobile Number</v-list-item-sub-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>

          <v-card class="address-card">
            <v-card-title>Address</v-card-title>
            <v-list two-line class="pa-0">
              <v-list-item href="#">
                <v-list-item-action>
                  <v-icon color="indigo">mdi-mailbox-open-up</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-sub-title>Postal Code</v-list-item-sub-title>
                  <v-list-item-title>{{
                    user.address.postal_code
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider inset></v-divider>
              <v-list-item href="#">
                <v-list-item-action>
                  <v-icon color="indigo">mdi-map-search-outline</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-sub-title>Address line 1</v-list-item-sub-title>
                  <v-list-item-title>
                    {{ user.address.address_line1 }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-divider inset></v-divider>
              <v-list-item href="#">
                <v-list-item-action>
                  <v-icon color="indigo">mdi-map-outline</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-sub-title>Address line 2</v-list-item-sub-title>
                  <v-list-item-title>{{
                    user.address.address_line2
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider inset></v-divider>
              <v-list-item href="#">
                <v-list-item-action>
                  <v-icon color="indigo">mdi-city</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-sub-title>City</v-list-item-sub-title>
                  <v-list-item-title>
                    {{ user.address.city }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-divider inset></v-divider>
              <v-list-item href="#">
                <v-list-item-action>
                  <v-icon color="indigo">mdi-map-outline</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-sub-title>Country</v-list-item-sub-title>
                  <v-list-item-title>
                    {{
                      user.address.country_name ? user.address.country_name : ""
                    }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <!-- <v-col>
        <v-card class="light gray lighten-12 mb-2">
          <v-container>
            <v-row>
              <v-flex class="font-weight-medium bg-light ma-2 pa-3">
                Contacts</v-flex
              >
            </v-row>
            <v-row>
              <v-col>
                Telephone Number :
                {{ user.contacts.telephone }}
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                Mobile Number :
                {{ user.contacts.phone }}
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <v-card class="light gray lighten-12">
          <v-container>
            <v-row>
              <v-flex class="font-weight-medium bg-light ma-2 pa-3">
                Address</v-flex
              >
            </v-row>

            <v-row>
              <v-col>
                Country :
                {{ user.address.country }}
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                City :
                {{ user.address.city }}
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                Postalcode :
                {{ user.address.postal }}
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                State :
                {{ user.address.state }}
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col> -->
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { required, email, max, regex } from "vee-validate/dist/rules";
import jwt_decode from "jwt-decode";
import { User } from "../../../models/User";

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
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    name: "",
    email: "",
    isAdmin: false,
    value: String,
    select: null,
    roles: [],
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: null,
    user: new User(),
    loginedUser: new User(),
    errors: [],
    oldUserDetails: new User(),
    messages: [],
  }),

  methods: {
    submit() {
      this.$refs.observer.validate();
      this.EditUser();
    },
    async onReset() {
      this.$confirm("Do you want to Reset Password ?").then((res) => {
        if (res) {
          let Credentials = this.$route.params.id;
          this.$store
            .dispatch("user/AdminResetPassword", Credentials)
            .then((res) => {
              this.succeeed = true;
                     window.open(res.data.credential, "_blank");
            })
            .catch((err) => {
              this.messages.push(err.data);
              // this.$router.push("/pages/404");
              console.log(err);
            });
        }
      });
    },
    Reset() {
      this.user = this.oldUserDetails;
      this.$refs.observer.reset();
    },
    EditUser() {
      const selectedRoles = [];
      let userId = this.$route.params.id;
      this.$store
        .dispatch("user/EditUser", {
          id: userId,
          username: this.user.username,
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          address: JSON.stringify(this.user.address),
          email: this.user.email,
          contacts: JSON.stringify(this.user.contacts),
          conmpany: this.user.username,
          password: this.user.password,
          roles: this.user.role,
          image: this.user.role,
        })
        .then((res) => {
          this.succeeed = true;
          this.$toast.success("User edited successfully");
        })
        .catch((err) => {
          this.messages = err.data.title;
          this.$toast.error("Edit failed");
        });
    },
    GetRoles() {
      this.$store
        .dispatch("user/GetRoles")
        .then((res) => {
          this.roles = res.data;
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

          this.user = new User().initialise(res.data);
          if (this.user.image) {
            this.user.image = this.user.image + "?t=" + Date.now();
          }
        })
        .catch((err) => {
          this.messages.push(err.data);
          // this.$router.push("/pages/404");
          console.log(err);
        });
    },
  },
  created() {
    this.GetRoles();
    this.getUser();
  },
};
</script>

<template>
  <div>
    <PageTitle title="Edit User" :backBtn="true" :showLoading="isLoading" />
    <v-container fluid class="lighten-12 content">
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="12">
          <v-row>
            <v-col>
              <v-card class="lighten-12 card-content mb-1">
                 <ValidationObserver ref="observer" v-slot="{ validate, reset }">
                <v-card-title>General</v-card-title>
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
                            v-model="user.name"
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
                 </ValidationObserver>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
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
    </v-container>
  </div>
</template>

<script>
import { required, email, max, regex } from "vee-validate/dist/rules";
import jwt_decode from "jwt-decode";
import { mapGetters } from "vuex";
import { User } from "../../../models/User";


import FileUpload from "@/components/base/FileUpload";

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
    FileUpload,
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
    staffs:[],
    Getemails:[],
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
  },

  methods: {
    onChangeImageUpload(value) {
      this.imageUpdated = value;
    },
    async submit() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.EditUser();
      }
    },
    clear() {
      this.user = new User();
      this.$refs.observer.reset();
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
        .dispatch("user/EditUser", new User().toUpdate(this.user))
        .then(async (res) => {
          this.$router.push("/user")
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

 GetSingleUser() {
 let UserId = this.$route.params.id;
      this.$store
        .dispatch("user/GetSingleUser",UserId)
        .then((res) => {
          this.user = new User().toInitilaize(res.data.data);
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
    this.GetSingleUser();
    this.GetUsers();
    
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

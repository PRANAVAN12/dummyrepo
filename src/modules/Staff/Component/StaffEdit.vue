<template>
  <div>
    <PageTitle title="Edit Staff" :backBtn="true" :showLoading="isLoading" />
    <ValidationObserver ref="observer">
      <v-container fluid class="lighten-12">
        <v-card class="lighten-12">
          <v-card-title>General </v-card-title>
          <v-container fluid class="light gray lighten-12 container-card">
            <form>
              <v-row>
                <template v-if="messages">
                  <v-alert
                    v-for="msg in messages"
                    :key="msg"
                    class="messages"
                    dense
                    outlined
                    type="error"
                    >{{ msg }}</v-alert
                  >
                </template>
              </v-row>

              <v-row>
                <v-row>
                    <v-col cols="12"  sm="3" md="3" lg="3">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="Salutation "
                        rules="required"
                      >
                        <v-select
                          dense
                          outlined
                          :items="Saluations"
                          item-text="name"
                          item-value="id"
                          hide-details="auto"
                          v-model="Staff.salutation_id"
                          :error-messages="errors"
                          label="Salutation Type"
                          required
                        ></v-select>
                      </ValidationProvider>
                    </v-col>
                  <v-col cols="12" sm="12" md="3" lg="3">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name=" First Name"
                      rules="required"
                    >
                      <v-text-field
                        hide-details="auto"
                        dense
                        outlined
                        v-model="Staff.first_name"
                        :error-messages="errors"
                        label="First name"
                        required
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12" sm="12" md="3" lg="3" >
                    <ValidationProvider
                      v-slot="{ errors }"
                      name=" Last Name "
                      rules="required"
                    >
                      <v-text-field
                        hide-details="auto"
                        dense
                        outlined
                        v-model="Staff.last_name"
                        :error-messages="errors"
                        label="Last name"
                        required
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                 
                </v-row>
                <v-row>
                   <v-col cols="12" xs="12" sm="12" md="3" lg="3" xl="3">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name=" Short Name "
                      rules="required"
                    >
                      <v-text-field
                        hide-details="auto"
                        dense
                        outlined
                        v-model="Staff.short_name"
                        :error-messages="errors"
                        label="Short name"
                        required
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12" xs="12" sm="12" md="3" lg="3" xl="3">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name=" Gender "
                      rules="required"
                    >
                      <v-select
                        dense
                        outlined
                        :items="gender"
                        item-text="text"
                        item-value="value"
                        hide-details="auto"
                        v-model="Staff.gender"
                        :error-messages="errors"
                        label="Gender"
                        required
                      ></v-select>
                    </ValidationProvider>
                  </v-col>

                  <v-col cols="12" sm="12"  md="3" lg="3" >
                    <ValidationProvider      v-slot="{ errors }" name=" Date " rules="required">
                      <datePickComponent
                        hide-details="auto"
                        :errors="errors"
                        v-model="Staff.date_of_birth"
                        labelname="Date Of Birth"
                      />
                    </ValidationProvider>
                  </v-col>

                 

                  <v-col cols="12"  sm="12" md="3" lg="3">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name=" Blood group "
                     
                    >
                      <v-select
                        dense
                        outlined
                        :items="blood"
                        item-text="text"
                        item-value="value"
                        hide-details="auto"
                        v-model="Staff.blood_group"
                        :error-messages="errors"
                        label="Blood Group"
                       
                      ></v-select>
                    </ValidationProvider>
                  </v-col>
                </v-row>
              </v-row>
            </form>
          </v-container>
        </v-card>

        <v-row>
          <v-col cols="7"
            ><v-card class="lighten-12" height="100%">
              <v-card-title>Sub General</v-card-title>
              <v-container fluid class="light gray lighten-12">
                <v-row>
                  <v-col cols="12" sm="6" md="4" lg="6">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Nic number"
                      rules="required"
                    >
                      <v-text-field
                        hide-details="auto"
                        outlined
                        dense
                        v-model="Staff.nic_number"
                        :error-messages="errors"
                        label="NIC"
                        required
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>

                  <v-col cols="12" sm="6" md="4" lg="6">
                    <ValidationProvider
                    
                      name="last employment At "
                     
                    >
                      <datePickComponent
                        hide-details="auto"
                        v-model="Staff.last_employment"
                        labelname="Last Employment "
                      />
                    </ValidationProvider>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12"  sm="6" md="4" lg="6" >
                    <ValidationProvider v-slot="{ errors }" name="ethnicity">
                      <v-text-field
                        hide-details="auto"
                        outlined
                        dense
                        v-model="Staff.ethnicity"
                        :error-messages="errors"
                        label="Ethnicity"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>

                  <v-col cols="12"  sm="6" md="4" lg="6">
                    <ValidationProvider v-slot="{ errors }" name="religion">
                      <v-select
                        dense
                        outlined
                        :items="religion"
                        item-text="text"
                        item-value="value"
                        hide-details="auto"
                        v-model="Staff.religion"
                        :error-messages="errors"
                        label="Religion"
                      ></v-select>
                    </ValidationProvider>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12"  sm="6" md="4" lg="6">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Joined At "
                      rules="required"
                    >
                      <datePickComponent
                      :errors="errors"
                        hide-details="auto"
                        v-model="Staff.joined_at"
                        labelname="Joined At"
                      />
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12"  sm="6" md="4" lg="6">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Civil Status "
                    >
                      <v-select
                        dense
                        outlined
                        :items="civil_status"
                        item-text="text"
                        item-value="value"
                        hide-details="auto"
                        v-model="Staff.civil_status"
                        :error-messages="errors"
                        label="Civil Status "
                      ></v-select>
                    </ValidationProvider>
                  </v-col>
                </v-row>
                <v-row>
                   <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name=" Description "
                    >
                      <v-textarea
                        hide-details="auto"
                        dense
                        outlined
                        rows="2"
                        v-model="Staff.description"
                        :error-messages="errors"
                        label="Description"
                      ></v-textarea>
                    </ValidationProvider>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
          <v-col cols="5"
            ><v-card class="lighten-12" height="100%">
              <v-card-title>Contacts</v-card-title>
              <v-container fluid class="light gray lighten-12">
                <form>
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-row>
                        <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="6">
                          <ValidationProvider
                            v-slot="{ errors }"
                            name="Email"
                            vid="name"

                             :rules="{ email ,required}"
                          >
                            <v-text-field
                              hide-details="auto"
                              dense
                              v-model="Staff.email"
                              :error-messages="errors"
                              label="Email"
                              outlined
                            ></v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="6">
                          <ValidationProvider
                            v-slot="{ errors }"
                            name="TelePhone"
                            :rules="{ regex: /^[+,-,0-9]*[+,-,0-9]*$/ }"
                          >
                            <v-text-field
                              hide-details="auto"
                              outlined
                              dense
                              maxlength="13"
                              v-model="Staff.telephone"
                              :error-messages="errors"
                              label="Telephone"
                            ></v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="6">
                          <ValidationProvider
                            v-slot="{ errors }"
                            name="Phone"
                            :rules="{
                              required: true,
                              regex: /^[+,-,0-9]*[+,-,0-9]*$/,
                            }"
                          >
                            <v-text-field
                              hide-details="auto"
                              outlined
                              dense
                              maxlength="13"
                              v-model="Staff.mobile"
                              :error-messages="errors"
                              label="Mobile"
                              required
                            ></v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="6">
                          <ValidationProvider v-slot="{ errors }" name="skype">
                            <v-text-field
                              hide-details="auto"
                              outlined
                              dense
                              v-model="Staff.skype"
                              :error-messages="errors"
                              label="Skype "
                            ></v-text-field>
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          cols="12"
                          xs="12"
                          sm="12"
                          md="12"
                          lg="12"
                          xl="12"
                        >
                          <ValidationProvider
                            v-slot="{ errors }"
                            name="home address"
                          >
                            <v-textarea
                              hide-details="auto"
                              outlined
                              rows="2"
                              dense
                              v-model="Staff.home_address"
                              :error-messages="errors"
                              label="Home Address "
                            ></v-textarea>
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </form>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card class="lighten-12">
              <v-card-title>Posting </v-card-title>
              <v-container fluid class="light gray lighten-12 container-card">
                <form>
                  <v-row>
                    <v-col cols="12" xs="12" sm="3" md="3" lg="3" xl="3">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name=" designation"
                        rules="required"
                      >
                        <v-select
                          dense
                          outlined
                          :items="Designation"
                          item-text="name"
                          item-value="id"
                          hide-details="auto"
                          v-model="Staff.designation_id"
                          :error-messages="errors"
                          label="Designation"
                          required
                        ></v-select>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12" xs="12" sm="3" md="3" lg="3" xl="3">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="Employment type"
                        rules="required"
                      >
                        <v-select
                          dense
                          outlined
                          :items="EmploymentType"
                          item-text="name"
                          item-value="id"
                          hide-details="auto"
                          v-model="Staff.employment_type_id"
                          :error-messages="errors"
                          label="Employee Type"
                          required
                        ></v-select>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12" xs="12" sm="3" md="3" lg="3" xl="3">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="parent_id "
                       
                      >
                        <v-select
                          dense
                          outlined
                          :items="parents"
                          item-text="first_name"
                          item-value="id"
                          hide-details="auto"
                          v-model="Staff.parent_id"
                          :error-messages="errors"
                          label="Parent"
                      
                        ></v-select>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12" xs="12" sm="3" md="3" lg="3" xl="3">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="Office "
                        rules="required"
                      >
                        <v-select
                          dense
                          outlined
                          :items="Offices"
                          item-text="name"
                          item-value="id"
                          hide-details="auto"
                          v-model="Staff.office_id"
                          :error-messages="errors"
                          label="Office "
                          required
                        ></v-select>
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                </form>
              </v-container> </v-card
          ></v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card class="lighten-12">
              <v-card-title>Salaray Details </v-card-title>
              <v-container fluid class="light gray lighten-12 container-card">
                <form>
                  <v-row>
                    <v-col cols="12" xs="12" sm="3" md="3" lg="3" xl="3">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name=" Bank Name"
                       
                      >
                        <v-text-field
                          dense
                          outlined
                          hide-details="auto"
                          v-model="Staff.bank_name"
                          :error-messages="errors"
                          label="Bank name"
                         
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12" xs="12" sm="3" md="3" lg="3" xl="3">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="Branch Name "
                      
                      >
                        <v-text-field
                          dense
                          outlined
                          hide-details="auto"
                          v-model="Staff.branch_name"
                          :error-messages="errors"
                          label="Bank Branch"
                         
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12" xs="12" sm="3" md="3" lg="3" xl="3">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="Account No "
                       
                      >
                        <v-text-field
                          dense
                          outlined
                          hide-details="auto"
                          v-model="Staff.account_no"
                          :error-messages="errors"
                          label="Account No"
                         
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>

                    <v-col cols="12" xs="12" sm="3" md="3" lg="3" xl="3">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="Basic Salary "
                        
                      >
                     
                        <v-text-field
                          dense
                          outlined
                          hide-details="auto"
                          v-model="Staff.basic_salary"
                          :error-messages="errors"
                          label="Basic Salary"
                       
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                </form>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
        <!-- Submit -->

        <v-row>
          <v-col cols="12" sm="12" md="6" lg="12" class="content-flex-end">
            <v-btn depressed small class="text-white btn_medium" @click="clear"
              >Clear</v-btn
            >
            <v-btn
              depressed
              small
              class="text-white btn_blue btn_medium w-100"
              @click="submit"
              :disabled="isDisabledSubmit"
              >Submit</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </ValidationObserver>
  </div>
</template>

<script>
import { required, email, max, regex } from "vee-validate/dist/rules";

import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

import datePickComponent from "../../../components/base/DateComponent";

import { Staff } from "../../../models/Staff";

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
    datePickComponent,
  },
  data: () => ({
    Staff: new Staff(),
    isLoading: false,
    Getemails: [],
       parents:[],
    EmploymentType: [],
    Designation: [],
    Saluations: [],
    Offices: [],
    errors: [],
    blood: [
      { text: "A+", value: "A+" },
      { text: "A-", value: "A-" },
      { text: "B-", value: "B-" },
      { text: "B+", value: "B+" },
      { text: "AB+", value: "AB+" },
      { text: "AB-", value: "AB-" },
      { text: "O-", value: "O-" },
      { text: "O+", value: "O+" },
    ],

    messages: [],
    gender: [
      { text: "Male", value: "Male" },
      { text: "Female", value: "Female" },
    ],
    religion: [
      { text: "Buddhism", value: "Buddhism" },
      { text: "Hinduism", value: "Hinduism" },
      { text: "Islam", value: "Islam" },
      { text: "Christianity", value: "Christianity" },
    ],

    civil_status: [
      { text: "Single", value: "Single" },
      { text: "Married", value: "Married" },
      { text: "Remarried", value: "Remarried" },
      { text: "Divorced", value: "Divorced" },
    ],
    isDisabledSubmit: false,
  }),

  methods: {
    async submit() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.UpdateStaff();
      }
    },
     GetStaffs() {
      this.$store
        .dispatch("staff/GetStaffs")
        .then((res) => {
          this.parents = res.data.data;
        })
        .catch((err) => console.log(err));
    },

    UpdateStaff() {
      this.isLoading = true;
      this.isDisabledSubmit = false;
      this.Staff.id = this.$route.params.id;

      this.$store
        .dispatch("staff/EditStaff", new Staff().toupdateRequest(this.Staff))
        .then((res) => {
          this.succeeed = true;
          let credentials = this.$route.params.id;
          this.$router.push("/staff");
          this.$toast.success("Staff edited  Successfully");

          this.isLoading = false;
          this.isDisabledSubmit = false;
        })
        .catch((err) => {
          this.$refs.observer.setErrors(err.data.error);
          this.$toast.error("Edit Staff failed");
          this.isDisabledSubmit = false;
          this.isLoading = false;
        });
    },

    GetStaff() {
      let StaffId = this.$route.params.id;

      this.$store
        .dispatch("staff/GetStaff", StaffId)
        .then((res) => {
          this.Staff = new Staff().Initialise(res.data.data);
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

    GetOffices() {
      this.$store
        .dispatch("GetOffices")
        .then((res) => {
          this.Offices = res.data.data;
        })
        .catch((err) => console.log(err));
    },
    GetSaluations() {
      this.$store
        .dispatch("GetSaluations")
        .then((res) => {
          this.Saluations = res.data.data;
        })
        .catch((err) => console.log(err));
    },
    GetDesignation() {
      this.$store
        .dispatch("GetDesignations")
        .then((res) => {
          this.Designation = res.data.data;
        })
        .catch((err) => console.log(err));
    },
    GetEmployeeTypes() {
      this.$store
        .dispatch("GetEmployeeTypes")
        .then((res) => {
          this.EmploymentType = res.data.data;
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.GetOffices();
    this.GetSaluations();
    this.GetDesignation();
    this.GetEmployeeTypes();
    this.GetEmails();
    this.GetStaff();
    this.GetStaffs();
  },
};
</script>

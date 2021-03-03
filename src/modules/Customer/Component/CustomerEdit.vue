<template>
  <div>
    <PageTitle title="Edit Customer" :backBtn="true" :showLoading="isLoading" />
    <ValidationObserver ref="observer">
      <v-container fluid class="lighten-12">
        <!-- <v-overlay v-if="isLoading"></v-overlay> -->
        <!-- <v-progress-linear
          active="false"
          indeterminate="false"
          :query="false"
          v-if="isLoading"
        ></v-progress-linear> -->
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
                <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name=" Customer Name"
                    rules="required"
                    vid="name"
                  >
                    <v-text-field
                      hide-details="auto"
                      dense
                      outlined
                      v-model="Customer.name"
                      :error-messages="errors"
                      label="Name"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Customer Type"
                    rules="required"
                  >
                    <v-autocomplete
                      v-model="Customer.customer_type_id"
                      :items="customerTypeList"
                      item-text="name"
                      item-value="id"
                      :error-messages="errors"
                      outlined
                      required
                      dense
                      hide-details="auto"
                      label="Customer Type"
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Customer Group"
                    rules="required"
                  >
                    <v-autocomplete
                      v-model="Customer.customer_category_id"
                      :items="customerCategoryList"
                      item-text="name"
                      item-value="id"
                      :error-messages="errors"
                      outlined
                      required
                      dense
                      hide-details="auto"
                      label="Customer Group"
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>
              </v-row>

              <div v-if="Customer.customer_type_id == 2">
                <v-row>
                  <v-flex class="font-weight-medium bg-light ma-2 pa-3"
                    >Credit Details</v-flex
                  >
                </v-row>
                <v-row>
                  <v-col cols="4" sm="12" md="4" lg="4">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Amount"
                      :rules="{
                        required: true,
                        regex: /^[+,-,0-9]*[+,-,0-9]*$/,
                      }"
                    >
                      <v-text-field
                        dense
                        hide-details="auto"
                        outlined
                        v-model="Customer.CreditDetails.maximum_credit_amount"
                        :error-messages="errors"
                        label="Amount"
                        type="number"
                        required
                        :min="0"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="4" sm="12" md="4" lg="4">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Payment Term(day) "
                      :rules="{
                        required: true,
                        regex: /^[+,-,0-9]*[+,-,0-9]*$/,
                      }"
                    >
                      <v-text-field
                        hide-details="auto"
                        outlined
                        dense
                        v-model="Customer.CreditDetails.payment_team"
                        :error-messages="errors"
                        label="Payment Term(day)"
                        :min="0"
                        type="number"
                        required
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col>
                    <v-switch
                      v-model="Customer.CreditDetails.is_allow_exceed"
                      inset
                      label="Allow exceed"
                    ></v-switch>
                  </v-col>
                </v-row>
              </div>
            </form>
          </v-container>
        </v-card>

        <!-- <AddAddress :address="Customer.addresses[0]" /> -->

        <v-row>
          <v-col cols="8"
            ><v-card class="lighten-12">
              <v-card-title>Address</v-card-title>
              <v-container fluid class="light gray lighten-12">
                <ValidationObserver ref="address">
                  <div
                    v-for="address in Customer.addresses"
                    :key="address.addressLine1"
                    class="light gray lighten-12"
                  >
                    <v-row>
                      <v-col cols="12" sm="6" md="4" lg="6">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Country"
                          rules="required"
                        >
                          <v-autocomplete
                            hide-details="auto"
                            outlined
                            dense
                            v-model="address.country_id"
                            item-text="name"
                            item-value="id"
                            :items="countries"
                            :error-messages="errors"
                            label="Country"
                          ></v-autocomplete>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" xs="12" sm="6" md="4" lg="6" xl="4">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="City"
                          rules="required"
                        >
                          <v-text-field
                            hide-details="auto"
                            outlined
                            dense
                            v-model="address.city"
                            :error-messages="errors"
                            label="City"
                            required
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>

                      <v-col cols="12" xs="12" sm="6" md="4" lg="6" xl="4">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Postal Code"
                          rules="required"
                        >
                          <v-text-field
                            hide-details="auto"
                            outlined
                            dense
                            type="number"
                            v-model="address.postal_code"
                            :error-messages="errors"
                            label="Postal Code"
                            required
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12" xs="12" sm="6" md="4" lg="6" xl="4">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Address Line1"
                          rules="required"
                        >
                          <v-textarea
                            hide-details="auto"
                            outlined
                            dense
                            v-model="address.address_line1"
                            :error-messages="errors"
                            label="Address Line1"
                            required
                          ></v-textarea>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" xs="12" sm="6" md="4" lg="6" xl="4">
                        <v-textarea
                          hide-details="auto"
                          outlined
                          dense
                          v-model="address.address_line2"
                          :error-messages="errors"
                          label="Address Line 2"
                          required
                        ></v-textarea>
                        <!-- </ValidationProvider> -->
                      </v-col>

                    </v-row>
             
                    <!-- <v-divider /> -->
                  </div>
              
                </ValidationObserver>
              </v-container>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card >
              <!-- <v-card-title>Image</v-card-title> -->
              <v-container>
                <!-- {{Customer.image}} -->
                <v-row>
                  <v-col cols="12" class="pb-0">
                    <v-flex class="pt-0 pa-1">
                      <FileUpload
                        title="Image"
                        @isImageUpdated="onChangeImageUpload"
                        :multiple="false"
                         :ContainerHeight="247"
                        v-model="selectedImages"
                        size="2048"
                        ref="imageInput"
                        :types="['jpeg', 'png', 'jpg']"
                        :showPreview="true"
                        :externalFiles="Customer.image ? [Customer.image] : []"
                        :camera="true"
                      />
                    </v-flex>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>

        <v-row
          ><v-col cols="12"
            ><v-card class="lighten-12">
              <v-card-title>Contacts</v-card-title>
              <v-container fluid class="light gray lighten-12">
                <form>
                  <ValidationObserver ref="contact">
                    <v-row>
                      <v-col cols="12" md="12">
                        <!-- <v-divider></v-divider> -->
                        <div
                          class="light gray lighten-12"
                          v-for="contact in Customer.contacts"
                          :key="contact.Email"
                        >
                       
                            <!-- <v-col cols="4" sm="12" md="4" lg="8">
                        <v-text-field
                          outlined
                          dense
                          v-model="contact.full_name"
                          :error-messages="errors"
                          label="Full Name"
                          required
                        ></v-text-field>
                      </v-col>-->
                         
                      
                          <v-row>
                            <v-col
                              cols="12"
                              xs="12"
                              sm="6"
                              md="4"
                              lg="4"
                              xl="4"
                            >
                              <ValidationProvider
                                v-slot="{ errors }"
                                name="Phone"
                                :rules="{ regex: /^[+,-,0-9]*[+,-,0-9]*$/ }"
                              >
                                <v-text-field
                                  hide-details="auto"
                                  outlined
                                  dense
                                  :rules="Countrules"
                                  maxlength="13"
                                  v-model="contact.telephone"
                                  :error-messages="errors"
                                  label="Telephone"
                                  required
                                ></v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col
                              cols="12"
                              xs="12"
                              sm="6"
                              md="4"
                              lg="4"
                              xl="4"
                            >
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
                                  :rules="Countrules"
                                  maxlength="13"
                                  v-model="contact.phone"
                                  :error-messages="errors"
                                  label="Phone"
                                  required
                                ></v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col
                              cols="12"
                              xs="12"
                              sm="6"
                              md="4"
                              lg="4"
                              xl="4"
                            >
                              <ValidationProvider
                                v-slot="{ errors }"
                                name="email"
                                rules="email"
                              >
                                <v-text-field
                                  hide-details="auto"
                                  outlined
                                  dense
                                  v-model="contact.email"
                                  :error-messages="errors"
                                  label="Email Address"
                                  required
                                ></v-text-field>
                              </ValidationProvider>
                            </v-col>
                          </v-row>

                        </div>

                       
                        <!-- </v-card> -->
                      </v-col>
                      <!-- <v-col hidden cols="12" md="12" class="pa-3">
                        <v-card class="custom-card">
                          <v-tabs
                            v-model="tab"
                            background-color="primary"
                            dark
                            icons-and-text
                            color="#650e42"
                          >
                            <v-tabs-slider></v-tabs-slider>
                            <v-tab
                              class="card-tabs"
                              v-for="item in items"
                              :key="item.tab"
                            >
                              {{ item.tab }}
                              <v-icon>mdi-cash-usd</v-icon>
                            </v-tab>
                          </v-tabs>
                          <v-tabs-items v-model="tab">
                            <v-tab-item v-for="item in items" :key="item.tab">
                              <v-card flat>
                               

                                <v-row>
                                  <v-col cols="6" sm="12" md="4" lg="4">
                                    <v-text-field
                                      outlined
                                      dense
                                      v-model="creditDetails.maxCredit"
                                      :error-messages="errors"
                                      label="Maximum Credit Amount"
                                      required
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="6" sm="12" md="4" lg="4">
                                    <v-text-field
                                      outlined
                                      dense
                                      v-model="Supplier.creditDetails.payTerm"
                                      :error-messages="errors"
                                      label="Payment Term(day"
                                      required
                                    ></v-text-field>
                                  </v-col>
                                </v-row>
                              </v-card>
                            </v-tab-item>
                          </v-tabs-items>
                        </v-card>
                      </v-col> -->
                    </v-row>
                  </ValidationObserver>
                </form>
              </v-container>
            </v-card>
          </v-col>
        </v-row>

        <!-- Submit -->

        <v-row>
          <v-col class="d-flex justify-end pr-12">
            <btn-cancel></btn-cancel>
            <v-btn
              hide-details="auto"
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

import { Address } from "../../../models/Address";
import AddAddress from "../../shared/components/Address";

import { CustomerType } from "../../../models/CustomerType";
import FileUpload from "@/components/base/FileUpload";
import { CustomerViewModel } from "../../../models/View Models/CustomerViewModel";

import { Customer } from "../../../models/Customer";
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

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    AddAddress,FileUpload
  },
  data: () => ({
    Countrules: [(v) => v.length <= 13 || "Maximum 13 numbers are allowed"],
    checkbox: null,
    selectedImages: "",
    Customer: new Customer(),
    isLoading: false,
    errors: [],
    imageUpdated: null,
    isDisabledSubmit: false,
    contact: [],
    messages: [],
    customerCategoryList: [],
    countries: { id: "", name: "" },

    customerTypeList: [],
  }),

  methods: {
    async submit() {
      const isValid = await this.$refs.observer.validate();
      if (this.Customer.maxCredit > 0 && this.Customer.payTerm <= 0) {
        this.messages.push("Payment term is required for the MaxCredit");
      } else if (isValid) {
        // this.isLoading = true;
        this.UpdateCustomer();
      }
    },
    async UploadCustomerImage(customerId) {
      let fromData = new FormData();
      if (this.selectedImages && this.imageUpdated) {
        fromData.append("id", customerId);
        fromData.append("image", this.selectedImages);
        return await this.$store.dispatch(
          `customer/UploadCustomerImage`,
          fromData
        );
      } else if (this.imageUpdated == false) {
        fromData.append("id", customerId);
        fromData.append("image", null);
        return await this.$store.dispatch(
          `customer/UploadCustomerImage`,
          fromData
        );
      } else {
        return true;
      }
    },
    UpdateCustomer() {
      this.isLoading = true;
      this.isDisabledSubmit = false;
      this.$store
        .dispatch("customer/EditCustomer", this.Customer.toupdateRequest())
        .then(async (res) => {
          debugger
          this.succeeed = true;
let credentials= this.$route.params.id;
          await this.UploadCustomerImage(credentials)
            .then(() => {
              this.isDisabledSubmit = false;
              this.isLoading = false;
            })
            .catch(() => {
              this.$toast.error("Customer image uploading failed");
              this.isDisabledSubmit = false;
              this.isLoading = false;
            });
          this.$router.push("/customer");
          this.$toast.success("Customer edited  Successfully");

          this.isLoading = false;
          this.isDisabledSubmit = false;
        })
        .catch((err) => {
          this.$refs.observer.setErrors(err.data.error);
          this.$toast.error("Edit customer failed");
          this.isDisabledSubmit = false;
          this.isLoading = false;
        });
    },
    GetCountries() {
      this.$store
        .dispatch("GetCountries")
        .then((res) => {
          this.countries = res.data.data;
        })
        .catch((err) => {
          this.messages = err.data.title;
          this.isLoading = false;
        });
    },
    GetCustomerCategory() {
      this.$store
        .dispatch("customer/GetCustomerCategory")
        .then((res) => {
          this.customerCategoryList = res.data.data;
        })
        .catch((err) => {
          this.messages = err.data.title;
          this.isLoading = false;
        });
    },
     onChangeImageUpload(value) {
      this.imageUpdated = value;
    },
    GetCustomer() {
      let CustomerId = this.$route.params.id;

      this.$store
        .dispatch("customer/GetCustomer", CustomerId)
        .then((res) => {
           this.$refs.imageInput.GetImage();
          this.Customer = new Customer().Initialise(res.data);
        })
        .catch((err) => {
          this.messages = err.data.title;
        });
    },

    GetCustomerType() {
      this.$store
        .dispatch("customer/GetCustomerType")
        .then((res) => {
          this.customerTypeList = res.data.data;
        })
        .catch((err) => {
          this.messages = err.data.title;
          this.isLoading = false;
        });
    },
    async AddAddress() {
      const isValid = await this.$refs.address.validate();
      if (isValid) {
        this.Customer.addresses.push(new Address());
      }
    },
    deleteAddress(address) {
      this.Customer.addresses.splice(
        this.Customer.addresses.indexOf(address),
        1
      );
    },
    async addContact() {
      const isValid = await this.$refs.contact.validate();
      if (isValid) {
        this.Customer.contacts.push(new Contact());
      }
    },
    deleteContact(contact) {
      this.Customer.contacts.splice(this.Customer.contacts.indexOf(contact), 1);
    },
  },
  created() {
    this.GetCountries();
    this.GetCustomerType();
    this.GetCustomerCategory();
    this.GetCustomer();
  },
};
</script>


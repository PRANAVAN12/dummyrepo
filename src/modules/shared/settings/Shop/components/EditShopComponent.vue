<template>
  <div>
    <PageTitle
      title="Edit Shop"
      :backBtn="true"
      :permission="'Customer Create'"
      :showLoading="isLoading"
    />
    <ValidationObserver ref="observer">
      <v-container fluid class="lighten-12">
        <v-card class="lighten-12">
          <v-card-title>General </v-card-title>
          <v-container fluid class="light gray lighten-12 container-card">
            <form>
              <v-row> </v-row>

              <v-row>
                <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name=" Shop Name"
                    rules="required"
                    vid="name"
                  >
                    <v-text-field
                      hide-details="auto"
                      dense
                      outlined
                      v-model="Shop.name"
                      :error-messages="errors"
                      label="Name"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
            </form>
          </v-container>
        </v-card>

        <v-row
          ><v-col cols="12"
            ><v-card class="lighten-12">
              <v-card-title>Address</v-card-title>
              <v-container fluid class="light gray lighten-12">
                <ValidationObserver ref="address">
                  <div class="light gray lighten-12">
                    <v-row>
                          <v-col cols="12" sm="6" md="4" lg="4">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Country"
                          rules="required"
                        >
                          <v-autocomplete
                            hide-details="auto"
                            outlined
                            dense
                            item-text="name"
                            item-value="id"
                            :items="countries"
                            v-model="Shop.address.country_id"
                            :error-messages="errors"
                            label="Country"
                          ></v-autocomplete>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" xs="12" sm="6" md="4" lg="4" xl="4">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Address Line1"
                          rules="required"
                        >
                          <v-text-field
                            hide-details="auto"
                            outlined
                            dense
                            :error-messages="errors"
                            label="Address Line1"
                            v-model="Shop.address.address_line1"
                            required
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" xs="12" sm="6" md="4" lg="4" xl="4">
                        <v-text-field
                          hide-details="auto"
                          outlined
                          dense
                          :error-messages="errors"
                          label="Address Line 2"
                          v-model="Shop.address.address_line2"
                          required
                        ></v-text-field>
                        <!-- </ValidationProvider> -->
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12" xs="12" sm="6" md="4" lg="4" xl="4">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="City"
                          rules="required"
                        >
                          <v-text-field
                            hide-details="auto"
                            outlined
                            dense
                            :error-messages="errors"
                            v-model="Shop.address.city"
                            label="City"
                            required
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                  
                      <v-col cols="12" xs="12" sm="6" md="4" lg="4" xl="4">
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
                            v-model="Shop.address.postal_code"
                            :error-messages="errors"
                            label="Postal Code"
                            required
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                    </v-row>

                    <v-row></v-row>
                  </div>
                </ValidationObserver>
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
                        <div class="light gray lighten-12">
                          <v-row> </v-row>
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
                                :rules="{
                                 
                                  regex: /^[+,-,0-9]*[+,-,0-9]*$/,
                                }"
                              >
                                <v-text-field
                                  hide-details="auto"
                                  outlined
                                  dense
                                  :error-messages="errors"
                                  label="Telephone"
                                  :rules="Countrules"
                                  maxlength="13"
                                  v-model="Shop.contact.telephone"
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
                                  :error-messages="errors"
                                  :rules="Countrules"
                                  maxlength="13"
                                  v-model="Shop.contact.phone"
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
                                  :error-messages="errors"
                                  v-model="Shop.contact.email"
                                  label="Email Address"
                                  required
                                ></v-text-field>
                              </ValidationProvider>
                            </v-col>
                          </v-row>

                          <v-row></v-row>
                        </div>
                      </v-col>
                    </v-row>
                  </ValidationObserver>
                </form>
              </v-container>
            </v-card>
          </v-col>
        </v-row>

        <!-- Submit -->

        <v-row>
          <v-col cols="12" sm="12" md="6" lg="12" class="content-flex-end">
            <btn-cancel></btn-cancel>
            <v-btn
              depressed
              small
              class="text-white btn_blue btn_medium w-100"
              @click="EditShop()"
              >Update</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </ValidationObserver>
  </div>
</template>
<script>
import { Address } from "../../../../../models/Address";
import { Contact } from "../../../../../models/Contact";
import Shop from "../../../../../models/Shop";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import { required, email, max, regex } from "vee-validate/dist/rules";
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
  data: () => ({
    Shop: new Shop(),

    countries: [],
    value: [],
    options: [],
    isLoading: false,
    errors: [],
    messages: [],
    Id: null,
  }),
  Countrules: [(v) => v.length <= 13 || "Maximum 13 numbers are allowed"],
  name: "EditShop",

  components: {
    ValidationProvider,
    ValidationObserver,
  },

  created() {
    this.GetCountries();
    this.GetShopSingle();
  },
  methods: {
    GetCountries() {
      this.$store
        .dispatch("GetCountries")
        .then((res) => {
          debugger;
          this.countries = res.data.data;
        })
        .catch((err) => {
          this.messages = err.data.title;
          this.isLoading = false;
        });
    },
    close() {
      this.Shop = {};

      this.$refs.observer.reset();
    },

    GetShopSingle() {
      const id = this.$route.params.id;
      this.$store
        .dispatch(`shop/GetShopSingleId`, id)
        .then((res) => {
          this.Shop = new Shop().Initialise(res.data);
        })
        .catch((err) => {
          this.messages = err.data.title;
          this.isLoading = false;
        });
    },
    EditShop() {
      const isValid = this.$refs.observer.validate();
      if (isValid) {
        this.Updateshop();
      }
    },
    Updateshop() {
      this.$store
        .dispatch("shop/EditShop", this.Shop.toupdateRequest())
        .then((res) => {
          this.succeeed = true;

          this.isLoading = false;
          this.$emit("afterSave");
          this.$toast.success("Shop edited  succesfully");
          this.$router.push(`/shop`);
        })
        .catch((err) => {
          this.$refs.observer.setErrors(err.data.error);
          this.$toast.error("Shop edited  failed!");
          this.messages = err.data.title;
          this.isLoading = false;
        });
    },
  },
};
</script>

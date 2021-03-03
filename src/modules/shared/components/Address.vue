<template>
<v-container fluid class="light gray lighten-12">
  <ValidationObserver ref="addressObserver">
  
    <!-- <v-card class="radius-none"> -->
      <!-- <v-subheader class="sub-header-custom">Address</v-subheader> -->
      <!-- <v-divider></v-divider> -->
      <!-- <v-container class="light gray lighten-12 container-card"> -->
        <v-row>
          <v-row>
            <v-col cols="12" sm="6" md="6" lg="4" >
              <ValidationProvider
                  v-slot="{ errors }"
                  vid="address_line1"
                  name=address_line1
                  rules="required"
              >
            <v-textarea
            hide-details="auto"
              outlined
              dense rows="3"
                          row-height="20"
              v-model="address.address_line1"
              :error-messages="errors"
              label="Address Line 1"
              required
            ></v-textarea>
              </ValidationProvider>
          </v-col>

           

            <v-col cols="12" sm="6" md="6" lg="4" >

            <v-textarea
            hide-details="auto"
              outlined
              dense rows="3"
                          row-height="20"
              v-model="address.address_line2"
              :error-messages="errors"
              label="Address Line 2"
              required
            ></v-textarea>
          </v-col>
          </v-row>

          <v-row>
           <v-col cols="12" sm="6" md="6" lg="4" >
            <ValidationProvider>
              <v-text-field
              hide-details="auto"
                outlined
                dense
                v-model="address.postal_code"
                :error-messages="errors"
                label="Postal Code"
                required
                type="number"
              ></v-text-field>
            </ValidationProvider>
          </v-col>

          <v-col cols="12" sm="6" md="6" lg="4" >
         <ValidationProvider
                v-slot="{ errors }"
                vid="city"
                name=City
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

          <v-col cols="12" sm="12" md="12" lg="4" >
            <ValidationProvider
                v-slot="{ errors }"
                vid="country"
                name=country
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
                label="country"
              ></v-autocomplete>
            </ValidationProvider>
          </v-col>
</v-row>
        </v-row>
      <!-- </v-container> -->
    <!-- </v-card> -->
  </ValidationObserver>
</v-container>
</template>

<script>
import { required, email, max, regex, numeric } from "vee-validate/dist/rules";
import { mapGetters } from "vuex";

import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import { mapState } from "vuex";

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
  message: "{_field_} number must be valid",
});
extend("numeric", {
  ...numeric,
  message: " must be number",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    // countries: [],
    siteSetting:null,
    errors: [],
  }),
  props: {
    address: {
      type: Array,
      default: {},
    },
  },

  methods: {
    isValid()
    {
return this.$refs.addressObserver.validate();
    },
    GetSiteSetting() {
      debugger
      this.$store
          .dispatch( "sitesetting/SiteSettingView",1)
          .then((res) => {

            this.siteSetting = res.data;
            this.address.country_id=this.siteSetting.country.id;
          })
          .catch((err) => {
            this.messages = err.data.title;
          });
    },
    GetCountries() {
      this.$store.dispatch("GetCountries");
      // .then((res) => {
      //   this.countries = res.data.data;
      // })
      // .catch((err) => {
      //   this.messages = err.data.title;
      //   this.isLoading = false;
      // });
    },
  },

  computed: {
    ...mapState(["countries"]),
    ...mapGetters("CountryStore", ["GetAllCountries"]),
  },
  created() {
    this.GetCountries();
    this.GetSiteSetting();
  },
};
</script>

<style scoped>
.btnRightMargin {
  margin-right: 10px;
}

/* .form-blue {
  background: #d8dbe0;
  border-radius: 0.25rem;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
} */
.messages {
  border: transparent !important;
  margin-right: 40px;
}
</style>

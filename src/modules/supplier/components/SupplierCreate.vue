<template>
  <div>
    <PageTitle
      title="Create Supplier"
      :showLoading="isLoading"
      :backBtn="true"
    />
    <ValidationObserver ref="observer">
      <v-container fluid class="lighten-12">
        <v-row
          ><v-col cols="12"
            ><v-card class="lighten-12">
              <v-card-title>General</v-card-title>

              <v-container fluid class="light gray lighten-12">
                <v-row>
                  <ServerMessages />
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
                      name="Name"
                      vid="name"
                      rules="required"
                    >
                      <v-text-field
                        hide-details="auto"
                        outlined
                        dense
                        v-model="Supplier.name"
                        :error-messages="errors"
                        label="Name"
                        required
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="supplierCode"
                      vid="code"
                    >
                      <v-text-field
                        hide-details="auto"
                        outlined
                        dense
                        v-model="Supplier.code"
                        :error-messages="errors"
                        label="Code"
                        required
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
                    <v-combobox
                      hide-details="auto"
                      v-model="Supplier.brandtags"
                      :filter="filter"
                      :hide-no-data="!searchBrands"
                      @input="GetBrandsSearch(Supplier.brandtags)"
                      :items="brands"
                      :search-input.sync="searchBrands"
                      outlined
                      label="Search to add the brands"
                      multiple
                      small-chips
                    >
                      <template v-slot:no-data>
                        <v-list-item>
                          <span class="subheading">Create</span>
                          <v-chip color="white" label small>
                            {{ searchBrands }}
                          </v-chip>
                        </v-list-item>
                      </template>
                      <template
                        v-slot:selection="{ attrs, item, parent, selected }"
                      >
                        <v-chip
                          v-if="item === Object(item)"
                          v-bind="attrs"
                          color="lightgray"
                          :input-value="selected"
                          label
                          small
                        >
                          <span class="pr-2">
                            {{ item.name }}
                          </span>
                          <v-icon small @click="parent.selectItem(item)"
                            >close</v-icon
                          >
                        </v-chip>
                      </template>
                      <template v-slot:item="{ item }">
                        <v-chip dark label small>
                          {{ item.name }}
                        </v-chip>
                      </template>
                    </v-combobox>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col></v-row
        >

        <v-row
          ><v-col cols="12" sm="12" md="12" lg="12"
            ><v-card class="lighten-12">
              <v-card-title>Address</v-card-title>
              <v-container fluid class="light gray lighten-12">
                <ValidationObserver ref="address">
                  <div
                    v-for="address in Supplier.addresses"
                    :key="address.addressLine1"
                    class="light gray lighten-12"
                  >
                   
                    <v-row>
                      <v-col cols="12" sm="12" md="4" lg="4">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Address Line1"
                          rules="required"
                        >
                          <v-textarea
                            hide-details="auto"
                            outlined
                            dense
                            rows="3"
                            row-height="20"
                            v-model="address.address_line1"
                            :error-messages="errors"
                            label="Address Line1"
                            required
                          ></v-textarea>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" sm="12" md="4" lg="4">
                        <v-textarea
                          hide-details="auto"
                          outlined
                          dense
                          rows="3"
                          row-height="20"
                          v-model="address.address_line2"
                          :error-messages="errors"
                          label="Address Line 2"
                          required
                        ></v-textarea>
                      </v-col>

                      <v-col cols="1" v-if="Supplier.addresses.length > 1">
                        <v-row
                          style="padding-right: 13px; justify-content: flex-end"
                        >
                          <v-btn
                            class="ma-2 mt-0"
                            tile
                            large
                            color="#E53935"
                            icon
                            @click="deleteAddress(address)"
                          >
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                        </v-row>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="12" md="4" lg="4">
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

                      <v-col cols="4" sm="4" md="2" lg="4">
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
                        <v-col cols="12" sm="12" md="4" lg="4">
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

                    <v-row></v-row>
                    <v-divider />
                    <!-- <v-divider /> -->
                  </div>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <!-- <AddButton
                      @onClick="AddAddress"
                      tooltipText="Add Address"
                    ></AddButton> -->

                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          class="icon_medium"
                          color="#13928e"
                          @click="AddAddress"
                          v-bind="attrs"
                          v-on="on"
                          >mdi-plus-box</v-icon
                        >
                      </template>
                      <span>Add address</span>
                    </v-tooltip>
                  </v-card-actions></ValidationObserver
                >
              </v-container>
            </v-card>
          </v-col></v-row
        >

        <v-row
          ><v-col cols="12" sm="12" md="12" lg="12"
            ><v-card class="lighten-12">
              <v-card-title>Contacts</v-card-title>
              <v-container fluid class="light gray lighten-12">
                <ValidationObserver ref="contact">
                  <div
                    class="light gray lighten-12"
                    v-for="contact in Supplier.contracts"
                    :key="contact.Email"
                  >
                    <v-row>
                      <v-col cols="12" sm="12" md="4" lg="4">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Full Name"
                          rules="required"
                        >
                          <v-text-field
                            hide-details="auto"
                            outlined
                            dense
                            v-model="contact.full_name"
                            :error-messages="errors"
                            label="Full Name"
                            required
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="1" v-if="Supplier.contracts.length > 1">
                        <v-row
                          style="padding-right: 15px; justify-content: flex-end"
                        >
                          <v-btn
                            tile
                            large
                            color="#E53935"
                            icon
                            @click="deleteContact(contact)"
                          >
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                        </v-row>
                      </v-col>
                      <v-col cols="12" sm="12" md="4" lg="4">
                        <ValidationProvider
                          v-slot="{ errors }"
                          :rules="{ regex: /^[+,-,0-9]*[+,-,0-9]*$/ }"
                        >
                          <v-text-field
                            hide-details="auto"
                            outlined
                            dense
                            maxlength="13"
                            v-model="contact.telephone"
                            :error-messages="errors"
                            label="Telephone"
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" sm="12" md="4" lg="4">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="phone"
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
                            v-model="contact.phone"
                            :error-messages="errors"
                            label="Phone"
                            required
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" sm="12" md="4" lg="4">
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
                    <v-divider />
                  </div>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-spacer></v-spacer>
                    <!-- <AddButton
                      @onClick="addContact"
                      tooltipText="Add Contact"
                    ></AddButton>  -->

                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          class="icon_medium"
                          color="#13928e"
                          @click="addContact"
                          v-bind="attrs"
                          v-on="on"
                          >mdi-plus-box</v-icon
                        >
                      </template>
                      <span>Add contact</span>
                    </v-tooltip>
                  </v-card-actions></ValidationObserver
                ></v-container
              >
            </v-card>
          </v-col></v-row
        >

        <v-card-actions class="pa-0">
          <v-spacer></v-spacer>
          <v-btn
            @click="clear"
            depressed
            small
            class="ml-1 text-white btn_medium"
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
    </ValidationObserver>
  </div>
</template>

<script>
import { required, email, max, regex } from "vee-validate/dist/rules";
import { Supplier } from "../../../models/Supplier";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import { Contact } from "../../../models/Contact";
import { SupplierEntityModel } from "../../../models/EntityModels/SupplierEntityModel";
import { Address } from "../../../models/Address";
import ServerMessages from "@/components/shared/ServerMessages";
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
    ServerMessages,
  },
  data: () => ({
    checkbox: null,
    Supplier: new Supplier(),
    isLoading: false,
    errors: [],
    brands: [],
    messages: [],
    siteSetting: null,
    creditValid: true,
    searchBrands: null,
    contacts: [new Contact()],
    countries: { id: "", name: "" },
    items: [{ tab: "Credit", content: "this is credit tab" }],
    tab: "Credit",
  }),

  methods: {
    async submit() {
      const isValid = await this.$refs.observer.validate();
      if (
        this.Supplier.creditDetails.maxCredit > 0 &&
        this.Supplier.creditDetails.payTerm <= 0
      ) {
        this.messages.push("Payment term is required for the MaxCredit");
      } else if (isValid) {
        this.isLoading = true;
        this.createSupplier();
      }
    },
    clear() {
      this.Supplier = new Supplier();
      this.$refs.observer.reset();
    },
    createSupplier() {
      this.isLoading = true;
      this.$store
        .dispatch(
          "supplier/AddSupplier",
          new SupplierEntityModel(this.Supplier)
        )
        .then((res) => {
          this.succeeed = true;
          this.$toast.success("Supplier added  successfully");
          this.$router.push("/supplier");
          this.isLoading = false;
        })
        .catch((err) => {
          this.messages = err.data.title;
          this.$refs.observer.setErrors(err.data.error);
          this.isLoading = false;
          this.$toast.error("Supplier creation failed");
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
    async addContact() {
      const isValid = await this.$refs.contact.validate();
      if (isValid) {
        this.Supplier.contracts.push(new Contact());
      }
    },
    async AddAddress() {
      const isValid = await this.$refs.address.validate();
      if (isValid) {
        this.Supplier.addresses.push(new Address());
      }
    },
    deleteContact(contact) {
      this.Supplier.contracts.splice(
        this.Supplier.contracts.indexOf(contact),
        1
      );
    },
    deleteAddress(address) {
      this.Supplier.addresses.splice(
        this.Supplier.addresses.indexOf(address),
        1
      );
    },

    GetBrandsSearch(selectedItems = null, query = "") {
      let except = [];
      for (const selectedItemsKey in selectedItems) {
        except.push(selectedItems[selectedItemsKey].id);
      }
      this.$store
        .dispatch("product/GetBrandsSearch", {
          except: except,
          query: query,
          status: "active",
        })
        .then((res) => {
          this.brands = res;
          return true;
        })
        .catch((err) => {
          this.messages = err.data.title;
          this.isLoading = false;
        });
    },
    GetSiteSetting() {
      this.$store
        .dispatch("sitesetting/SiteSettingView", 1)
        .then((res) => {
          self.siteSetting = res.data;

          this.Supplier.addresses.forEach((address)=>{
            address.country_id= self.siteSetting.country.id;
          });
        })
        .catch((err) => {
          this.messages = err.data.title;
        });
    },
  },
  created() {
    this.GetCountries();
    this.GetBrandsSearch();
    this.GetSiteSetting();
  },
  watch: {
    searchBrands(value) {
      if (!value) {
        return;
      }
      this.GetBrandsSearch(this.Supplier.brandtags, value);
    },
  },
};
</script>

<style scoped>
/* .btnRightMargin {
  margin-right: 10px;
} */
/* .contacts{
  background: aliceblue;
  padding: 5px;

}
.Address{
  padding: 5px;
} */
/* .container {
  color: white !important;
}
.form-blue {
  background: #abc5f1;
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

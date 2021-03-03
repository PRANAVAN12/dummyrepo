<template>
  <div>
    <PageTitle title="Edit Supplier" :showLoading="isLoading" :backBtn="true" />
    <ValidationObserver ref="observer">
      <v-container fluid class="lighten-12 ">
        <!-- <v-progress-linear active="false" indeterminate="false" :query="false" v-if="isLoading"></v-progress-linear> -->

        <v-card class="lighten-12">
          <v-card-title>General</v-card-title>
          <v-container fluid class="light gray lighten-12">
            <v-row>
              <template v-if="messages">
                <v-alert
                  hide-details="auto"
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
              <ServerMessages />
              <v-col cols="12" sm="12" md="4" lg="4">
                <ValidationProvider
                  vid="name"
                  v-slot="{ errors }"
                  name="Name"
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
              <v-col cols="12" sm="12" md="4" lg="4">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="supplierCode"
                  vid="code"
                >
                  <v-text-field
                    hide-details="auto"
                    dense
                    outlined
                    v-model="Supplier.code"
                    :error-messages="errors"
                    label="Code"
                    required
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" sm="12" md="4" lg="4">
                <v-combobox
                  hide-details="auto"
                  v-model="Supplier.brandtags"
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
                      <v-chip color="blue" label small>
                        {{ search }}
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
            <v-row>
              <v-col cols="12" sm="12" md="4" lg="4">
                <v-text-field
                  hide-details="auto"
                  dense
                  outlined
                  v-model="Supplier.reference_number"
                  :error-messages="errors"
                  disabled
                  label="Reference Number"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <v-row
          ><v-col cols="12"
            ><v-card class="lighten-12">
              <v-card-title>Address</v-card-title>
              <v-container fluid class="light gray lighten-12">
                <!-- Address contacts -->
                <ValidationObserver ref="address">
                  <v-row> </v-row>
                  <v-row>
                    <v-col cols="12" md="12" class="pa-3">
                      <!-- <v-card class="custom-card radius-none"> -->
                      <!-- <v-subheader class="sub-header-custom">Address</v-subheader> -->

                      <div
                        v-for="address in Supplier.addresses"
                        :key="address.addressLine1"
                        class="light gray lighten-12"
                      >
                        <v-row>
                         </v-row>
                        <v-row>
                          <!-- <v-col cols="4" sm="12" md="4" lg="4">
                        <v-text-field  dense 
                          v-model="address.state"
                          :error-messages="errors"
                          label="state"
                          required
                        ></v-text-field>
                      </v-col>-->

                          <v-col cols="12" sm="12" md="4" lg="4">
                            <ValidationProvider
                              v-slot="{ errors }"
                              name="Address Line1"
                              rules="required"
                            >
                              <v-textarea
                                hide-details="auto"
                                dense
                                outlined
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
                              dense
                              outlined
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
                              style="padding-right: 13px;justify-content: flex-end;"
                            >
                              <v-btn
                                hide-details="auto"
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
                                dense
                                outlined
                                v-model="address.city"
                                :error-messages="errors"
                                label="City"
                                required
                              ></v-text-field>
                            </ValidationProvider>
                          </v-col>

                          <v-col cols="4" sm="4" md="4" lg="4">
                            <ValidationProvider
                              v-slot="{ errors }"
                              name="Postal Code"
                              rules="required"
                            >
                              <v-text-field
                                hide-details="auto"
                                dense
                                outlined
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
                            >
                              <v-select
                                hide-details="auto"
                                dense
                                outlined
                                v-model="address.country_id"
                                item-text="name"
                                item-value="id"
                                :items="countries"
                                :error-messages="errors"
                                label="Country"
                              ></v-select>
                            </ValidationProvider> </v-col
                        >
                        </v-row>
                        <v-divider />
                      </div>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <!-- <AddButton
                      @click="AddAddress()"
                      tooltipText="Add Address"
                    ></AddButton> -->
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon
                              hide-details="auto"
                              class="icon_medium "
                              color="#13928e"
                              @click="AddAddress"
                              v-bind="attrs"
                              v-on="on"
                              >mdi-plus-box</v-icon
                            >
                          </template>
                          <span>Add address</span>
                        </v-tooltip>
                      </v-card-actions>
                      <!-- </v-card> -->
                    </v-col>
                  </v-row>
                </ValidationObserver>
              </v-container>
            </v-card>
          </v-col>
        </v-row>

        <v-row
          ><v-col cols="12" sm="12" md="4" lg="12"
            ><v-card class="lighten-12">
              <v-card-title>Contacts</v-card-title>
              <v-container fluid class="light gray lighten-12">
                <ValidationObserver ref="contact">
                  <v-row>
                    <v-col cols="12" md="12" class="pa-3">
                      <!-- <v-card class="custom-card radius-none"> -->

                      <div
                        class="light gray lighten-12"
                        v-for="contact in Supplier.contracts"
                        :key="contact.Email"
                      >
                        <v-row>
                          <v-col cols="12" sm="12" md="4" lg="4">
                            <v-text-field
                              hide-details="auto"
                              dense
                              outlined
                              v-model="contact.full_name"
                              :error-messages="errors"
                              label="Full Name"
                              required
                            ></v-text-field>
                          </v-col>
                          <!-- <v-col cols="3"></v-col>
                      <v-col cols="1" v-if="Supplier.contracts.length > 1">
                        <v-row
                          style="padding-right: 13px;justify-content: flex-end;"
                        >
                          <v-btn
                            class="ma-2 mt-0"
                            tile
                            large
                            color="#E53935"
                            icon
                            @click="deleteContact(contact)"
                          >
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                        </v-row>
                      </v-col> -->
                        </v-row>

                        <v-row>
                          <v-col cols="12" sm="12" md="4" lg="4">
                            <ValidationProvider
                              v-slot="{ errors }"
                              :rules="{ regex: /^[+,-,0-9]*[+,-,0-9]*$/ }"
                            >
                              <v-text-field
                                hide-details="auto"
                                dense
                                outlined
                                maxlength="13"
                                v-model="contact.telephone"
                                :error-messages="errors"
                                label="Telephone"
                                required
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
                                dense
                                outlined
                                v-model="contact.phone"
                                :error-messages="errors"
                                label="Phone"
                                maxlength="13"
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
                            </ValidationProvider> </v-col
                        ></v-row>
                        <v-divider />
                      </div>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <!-- <AddButton
                      @click="addContact()"
                      tooltipText="Add Contact"
                    ></AddButton> -->
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon
                              hide-details="auto"
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
                      </v-card-actions>
                      <!-- </v-card> -->
                    </v-col>
                    <v-col hidden cols="12" md="12" class="pa-3">
                      <v-card class="custom-card">
                        <v-tabs
                          hide-details="auto"
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
                              <v-container
                                class="light gray lighten-12 container-card"
                              >
                                <v-row>
                                  <v-col cols="6" sm="12" md="4" lg="4">
                                    <v-text-field
                                      hide-details="auto"
                                      dense
                                      outlined
                                      v-model="Supplier.creditDetails.maxCredit"
                                      :error-messages="errors"
                                      label="Maximum Credit Amount"
                                      required
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="6" sm="12" md="4" lg="4">
                                    <v-text-field
                                      dense
                                      outlined
                                      v-model="Supplier.creditDetails.payTerm"
                                      :error-messages="errors"
                                      label="Payment Term(day"
                                      required
                                    ></v-text-field>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </v-card>
                          </v-tab-item>
                        </v-tabs-items>
                      </v-card>
                    </v-col>
                  </v-row>
                </ValidationObserver>
              </v-container>
            </v-card> </v-col
        ></v-row>
      </v-container>

      <v-row>
        <v-col class="content-flex-end pr-8">
          <btn-cancel></btn-cancel>
          <v-btn
            depressed
            small
            class="text-white btn_blue btn_medium w-100"
            @click="submit"
            >Update</v-btn
          >
        </v-col>
      </v-row>
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
    errors: [],
    messages: [],
    brands: [],
    contacts: [new Contact()],
    isLoading: false,
    countries: { id: "", name: "" },
    items: [{ tab: "Credit", content: "this is credit tab" }],
    tab: "Credit",
    filter: "",
  }),
  created() {
    this.GetSupplier();
    this.GetCountries();
  },
  methods: {
    async submit() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.EditSupplier();
      }
    },
    clear() {
      this.Supplier = new Supplier();
      this.$refs.observer.reset();
    },
    GetBrandsSearch(selectedItems) {
      let except = [];
      for (const selectedItemsKey in selectedItems) {
        except.push(selectedItems[selectedItemsKey].id);
      }
      this.$store
        .dispatch("product/GetBrandsSearch", { except: except })
        .then((res) => {
          this.brands = res;
        })
        .catch((err) => {
          this.messages = err.data.title;
          this.isLoading = false;
        });
    },
    deleteAddress(address) {
      this.Supplier.addresses.splice(
        this.Supplier.addresses.indexOf(address),
        1
      );
    },
    deleteContact(contact) {
      this.Supplier.contracts.splice(
        this.Supplier.contracts.indexOf(contact),
        1
      );
    },
    EditSupplier() {
      this.isLoading = true;
      this.$store
        .dispatch("supplier/EditSupplier", this.Supplier)
        .then((res) => {
          this.succeeed = true;
          this.$toast.success("Supplier edited  successfully");
          this.isLoading = false;
          this.$router.push("/supplier");
        })
        .catch((err) => {
          this.messages = err.data.title;
          this.isLoading = false;
          this.$refs.observer.setErrors(err.data.error);
        });
    },
    GetSupplier() {
      let supplierId = this.$route.params.id;
      this.$store
        .dispatch("supplier/GetSupplier", supplierId)
        .then((res) => {
          this.Supplier = new Supplier().Initialise(res.data);

          this.GetBrandsSearch(this.Supplier.brandtags);
        })
        .catch((err) => {
          this.messages = err.data.title;
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
    // deleteContact(contact) {
    //   this.Supplier.contacts.splice(
    //     this.Supplier.contracts.indexOf(contact),
    //     1
    //   );
    // },
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
}
.custom-card {
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.2),
    0px -3px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
} */
</style>

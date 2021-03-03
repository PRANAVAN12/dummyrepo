<template>
  <div>
    <PageTitle title="Site Setting" />

    <v-container fluid class="lighten-12 pt-0">
      <ValidationObserver ref="observer">
        <v-row>
          <v-col cols="12" lg="8" md="12" sm="12">
            <v-row>
              <v-col cols="12">
                <v-card class="lighten-12">
                  <v-card-title>General</v-card-title>
                  <v-container fluid>
                    <v-row>
                      <v-col cols="12" lg="6" md="12" sm="12">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Site name"
                          rules="required"
                        >
                          <v-text-field
                            v-model="sitesetting.name"
                            dense
                            :error-messages="errors"
                            outlined
                            required
                            hide-details="auto"
                            label="Site name"
                          ></v-text-field> </ValidationProvider
                      ></v-col>
                      <v-col cols="12" lg="6" md="12" sm="12">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="URL"
                          rules="required"
                        >
                          <v-text-field
                            v-model="sitesetting.url"
                            dense
                            :error-messages="errors"
                            outlined
                            required
                            hide-details="auto"
                            label="URL"
                          ></v-text-field> </ValidationProvider
                      ></v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" lg="6" md="12" sm="12">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Default email"
                          rules="required|email"
                        >
                          <v-text-field
                            v-model="sitesetting.default_email"
                            dense
                            outlined
                            :error-messages="errors"
                            required
                            hide-details="auto"
                            label="Default email"
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" lg="6" md="12" sm="12">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="password"
                          rules="required"
                        >
                          <v-text-field
                            v-model="sitesetting.default_password"
                            label="Default password"
                            hide-details="auto"
                            dense
                            outlined
                            :error-messages="errors"
                            required
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" lg="12" md="12" sm="12">
                <v-card>
                  <v-card-title>Inventory notificaton</v-card-title>
                  <v-container fluid>
                    <v-row>
                      <v-col cols="12" lg="6" md="6" sm="12">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Notification period"
                          rules="required"
                        >
                          <v-autocomplete
                            v-model="sitesetting.notification_period"
                            :items="notification_period"
                            item-text="name"
                            item-value="id"
                            outlined
                            dense
                            hide-details="auto"
                            label="Notification period"
                            :error-messages="errors"
                            required
                          ></v-autocomplete>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                    <div v-if="sitesetting.notification_period == 'Custom'">
                      <v-row>
                        <v-col cols="12" lg="6" md="12" sm="12">
                          <v-autocomplete
                            v-model="sitesetting.period"
                            :items="period"
                            item-text="name"
                            item-value="id"
                            outlined
                            dense
                            hide-details="auto"
                            label="Period"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" lg="6" md="12" sm="12">
                          <v-text-field
                            type="number"
                            v-model="sitesetting.interval"
                            dense
                            outlined
                            hide-details="auto"
                            label="Interval"
                            min="0"
                          ></v-text-field
                        ></v-col>
                      </v-row>
                    </div>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="12" md="12" sm="12">
                <v-card>
                  <v-card-title>Product</v-card-title>
                  <v-container fluid>
                    <v-row>
                      <v-col cols="12" lg="6" md="12" sm="12">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Percentage"
                          rules="required"
                        >
                          <v-text-field
                            v-model="sitesetting.profit_margin_percentage"
                            outlined
                            dense
                            hide-details="auto"
                            label="Profit Percentage"
                            :error-messages="errors"
                            required
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" lg="6" md="12" sm="12">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Category"
                          rules="required"
                        >
                          <treeselect
                            outlined
                            :error-messages="errors"
                            required
                            class="tree-border"
                            dense
                            v-model="sitesetting.category_id"
                            filled
                            :options="categories"
                            placeholder="Category"
                            @select="onSelectCategory"
                          >
                            <label
                              slot="option-label"
                              slot-scope="{
                                node,
                                shouldShowCount,
                                count,
                                labelClassName,
                                countClassName,
                              }"
                              :class="labelClassName"
                            >
                              {{ node.raw.label }}
                              <span
                                v-if="shouldShowCount"
                                :class="countClassName"
                                >({{ count }})</span
                              >
                            </label>
                          </treeselect>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="12" md="12" sm="12">
                <v-card>
                  <v-card-title>Purchase</v-card-title>
                  <v-container fluid>
                    <v-row>
                      <v-col cols="12" lg="6" md="12" sm="12">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Purchasing type"
                          rules="required"
                        >
                          <v-autocomplete
                            v-model="sitesetting.default_purchase"
                            :items="default_purchase"
                            item-text="name"
                            item-value="id"
                            outlined
                            dense
                            hide-details="auto"
                            label="Default purchasing type"
                            :error-messages="errors"
                            required
                          ></v-autocomplete>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" lg="6" md="12" sm="12">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Defalut purchase return type"
                          rules="required"
                        >
                          <v-autocomplete
                            v-model="sitesetting.return_reasons_id"
                            :items="purchaseReturnReasons"
                            item-text="name"
                            item-value="id"
                            outlined
                            dense
                            hide-details="auto"
                            label="Defalut purchase return type"
                            :error-messages="errors"
                            required
                          ></v-autocomplete>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="12" md="12" sm="12">
                <v-card>
                  <v-card-title>Common</v-card-title>
                  <v-container fluid>
                    <v-row>
                      <v-col cols="12" lg="6" md="12" sm="12">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Date format"
                          rules="required"
                        >
                          <v-autocomplete
                            v-model="sitesetting.dateFormat.id"
                            :items="newDate"
                            item-text="name"
                            item-value="id"
                            outlined
                            dense
                            hide-details="auto"
                            label="Date format"
                            :error-messages="errors"
                            required
                          ></v-autocomplete>
                        </ValidationProvider>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12" lg="6" md="12" sm="12">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Default Country"
                          rules="required"
                        >
                          <v-autocomplete
                            v-model="sitesetting.country.id"
                            :items="countries"
                            item-text="name"
                            item-value="id"
                            outlined
                            dense
                            hide-details="auto"
                            label="Default Country"
                            :error-messages="errors"
                            required
                          ></v-autocomplete>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" lg="6" md="12" sm="12">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Default Warehouse"
                          rules="required"
                        >
                          <v-autocomplete
                            v-model="sitesetting.wareHouse.id"
                            :items="warehouses"
                            item-text="name"
                            item-value="id"
                            outlined
                            dense
                            :search-input.sync="searchWarehouse"
                            hide-details="auto"
                            label="Default Warehouse"
                            :error-messages="errors"
                            required
                          ></v-autocomplete>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" lg="6" md="12" sm="12">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Default Customer Group"
                          rules="required"
                        >
                          <v-autocomplete
                            v-model="sitesetting.customerGroup.id"
                            :items="customerCategoryList"
                            item-text="name"
                            item-value="id"
                            outlined
                            dense
                            hide-details="auto"
                            label="Default CustomerGroup"
                            :error-messages="errors"
                            required
                          ></v-autocomplete>
                        </ValidationProvider>
                      </v-col>

                      <v-col cols="12" lg="6" md="12" sm="12">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Default Customer type"
                          rules="required"
                        >
                          <v-autocomplete
                            v-model="sitesetting.customerType.id"
                            :items="customerTypeList"
                            item-text="name"
                            item-value="id"
                            outlined
                            dense
                            hide-details="auto"
                            label="Default CustomerType"
                            :error-messages="errors"
                            required
                          ></v-autocomplete>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12 " lg="4" sm="12">
            <v-row>
              <v-col cols="12">
                <v-card>
                  <v-container fluid>
                    <v-row>
                      <v-col cols="12 ">
                        <FileUpload
                          title="Site logo"
                          ref="imageInput"
                          :multiple="false"
                          v-model="selectedImages"
                          @isImageUpdated="onChangeImageUpload"
                          :externalFiles="
                            sitesetting.image ? [sitesetting.image] : []
                          "
                          size="2048"
                          :types="['jpeg', 'png', 'jpg']"
                          :showPreview="true"
                          :camera="true"
                      /></v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="content-flex-end" cols="12">
            <btn-cancel></btn-cancel>
            <v-btn
              depressed
              small
              class="text-white btn_blue btn_medium w-100"
              @click="submit()"
              >Update</v-btn
            >
          </v-col>
        </v-row>
      </ValidationObserver>
    </v-container>
  </div>
</template>

<script>
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import FileUpload from "@/components/base/FileUpload";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import { required, email, max } from "vee-validate/dist/rules";
import moment from "moment";
import { mapGetters, mapState } from "vuex";

extend("required", {
  ...required,
  message: "{_field_} is required",
});
extend("email", {
  ...email,
  message: "Email must be valid",
});
export default {
  data: () => ({
    DateFormet: [],
    categories: [],
    warehouses: [],
    searchWarehouse: null,
    warehouseLoading: false,
    customerTypeList: null,
    customerCategoryList: null,

    notification_period: [
      {
        name: "No",
        id: "No",
      },
      {
        name: "Instantly",
        id: "Instantly",
      },
      {
        name: "Daily",
        id: "Daily",
      },
      {
        name: "Weekly",
        id: "Weekly",
      },
      {
        name: "Fortnight",
        id: "Fortnight",
      },
      {
        name: "Monthly",
        id: "Monthly",
      },
      {
        name: "Annually",
        id: "Annually",
      },
      {
        name: "Custom",
        id: "Custom",
      },
    ],
    period: [
      {
        name: "Day",
        id: "Daily",
      },
      {
        name: "Week",
        id: "Weekly",
      },
      {
        name: "Month",
        id: "Monthly",
      },
      {
        name: "year",
        id: "Annually",
      },
    ],

    default_purchase: [
      {
        name: "Purchase Order",
        id: "Purchase Order",
      },
      {
        name: "Purchase Return",
        id: "Purchase Return",
      },
      {
        name: "None",
        id: "None",
      },
    ],

    purchaseReturnReasons: [],
    sitesetting: {
      id: "",
      name: "",
      default_email: "",
      default_password: "",
      notificationperiod: "",
      period: "",
      profit_margin_percentage: "",
      interval: "",
      default_purchase: "",
      return_reasons_id: "",
      date_format: "",
      date_format_id: "",
      warehouses: [],
      url: "",
    },
    imageUpdated: null,
    selectedImages: "",
    sitesetting: [],
    newDate: [],
  }),
  components: {
    FileUpload,
    ValidationProvider,
    ValidationObserver,
    Treeselect,
  },
  methods: {
    onChangeImageUpload(value) {
      this.imageUpdated = value;
    },
    async submit() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.EditSiteSettings();
      }
    },
    EditSiteSettings() {
      this.isLoading = true;
      const credentials = this.sitesetting;
       
      credentials.date_format_id = this.sitesetting.date_format_id;
      credentials.country_id = this.sitesetting.country.id;
      credentials.country = this.sitesetting.country;
      credentials.wareHouse = this.sitesetting.wareHouse;
      credentials.ware_house_id = this.sitesetting.wareHouse.id;
      credentials.customerGroup = this.sitesetting.customerGroup;
      credentials.customer_group_id = this.sitesetting.customerGroup.id;
      credentials.category_id = this.sitesetting.category_id;
      credentials.profit_margin_percentage = this.sitesetting.profit_margin_percentage;
      credentials.customerType = this.sitesetting.customerType;
      credentials.customer_type_id = this.sitesetting.customerType.id;

      delete this.sitesetting.returnReasons;

      this.$store
        .dispatch("sitesetting/EditSiteSetting", credentials)
        .then( (res) => {
          
          this.succeeed = true;
        
           this.UploadSitelogo()
            .then(() => {
              this.isLoading = false;
            })
            .catch(() => {
              this.$toast.error("Sitesetting logo uploading failed");

              this.isLoading = false;
            });
          this.succeeed = true;
          this.em;
          // this.$router.push({ path: "/" });
          this.$toast.success("Site setting edited successfully");
          this.isLoading = false;
          this.$store.dispatch("sitesetting/SiteSettingView", 1);
        })
        .catch((err) => {
          this.messages.push(err.data.title);
          this.$toast.error(" Site setting edit failed");
          this.isLoading = false;
        });
    },

    GetCurrentDateFormats() {
      var self = this;
      this.$store
        .dispatch("sitesetting/GetDateFormats")
        .then((res) => {
          self.DateFormet = res.data.data;

          //  var dateformats = ["yyyy/mm/dd", "dd/mm/yyyy"];

          for (let x = 0; x < self.DateFormet.length; x++) {
            var m = moment(new Date(), self.DateFormet[x].format);
            var formatted = m.locale("en").format(self.DateFormet[x].format);
            self.newDate.push({ id: self.DateFormet[x].id, name: formatted });
          }
        })
        .catch((err) => {
          this.messages.push(err.data.title);
        });
    },
    SiteSettingView() {
       
      var siteid = 1;
      this.$store
        .dispatch("sitesetting/SiteSettingView", siteid)
        .then((res) => {
          this.sitesetting = res.data;
           this.$refs.imageInput.GetImage();
        })
        .catch((err) => {
          this.messages = err.data.title;
          this.isLoading = false;
        });
    },
    async UploadSitelogo() {
      
      let fromData = new FormData();
      if (this.selectedImages && this.imageUpdated) {
        // fromData.append("1", sitesettingId);
        fromData.append("image", this.selectedImages);


        return await this.$store.dispatch(
          `sitesetting/UploadSiteImage`,
          fromData
        );


      } else if (this.imageUpdated == false) {
     //   fromData.append("1", sitesettingId);
        fromData.append("image", null);
        return await this.$store.dispatch(
          `sitesetting/UploadSiteImage`,
          fromData
        );


      } else {
        return true;
      }
    },

    getWarehouseByQuery(query = "") {
      this.warehouseLoading = true;
      this.$store
        .dispatch("warehouse/GetWarehouse", { query: query })
        .then((res) => {
          console.log(res);
          this.warehouses = res;
          this.warehouseLoading = false;
        })
        .catch((err) => {
          this.warehouseLoading = false;
          this.messages = err.data.name;
        });
    },
    GetCategories() {
      this.$store
        .dispatch("product/GetProductCategoriesWithChild")
        .then((res) => {
          this.categories = res.data;

          console.log("this.categories", this.categories);
          console.log("this.categoryTreeData", this.categoryTreeData);
        })
        .catch((err) => {
          this.messages.push(err.data.title);
        });
    },

    getPurchaseReturnReasons() {
       
      this.$store
        .dispatch("sitesetting/GetPurchaseReturnReasons")
        .then((res) => {
           
          this.purchaseReturnReasons = res.data.data;
        })
        .catch((err) => {
          this.messages.push(err.data.title);
        });
    },
    GetCountries() {
      this.$store.dispatch("GetCountries");
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
  },
  watch: {
    searchWarehouse(value) {
      if (!value) {
        this.getWarehouseByQuery("");
      }
      this.getWarehouseByQuery(value);
    },
  },

  created() {
    this.GetCurrentDateFormats();
    this.GetCategories();
    this.SiteSettingView();
    this.GetCountries();
    this.getPurchaseReturnReasons();
    this.getWarehouseByQuery();
    this.GetCustomerType();
    this.GetCustomerCategory();
  },
  computed: {
    ...mapState(["countries"]),
    ...mapGetters("CountryStore", ["GetAllCountries"]),
  },
};
</script>

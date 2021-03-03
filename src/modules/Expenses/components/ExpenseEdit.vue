<template>
  <v-row justify="center">
    <v-dialog
        style="border-radius: 5px"
        v-model="show"
        persistent
        max-width="600px"
    >
      <custom-modal
          title="Create Expense "
          @onSubmit="SaveCategory"
          @onClose="close"
          :isLoading="isLoading"
      >

        <ValidationObserver ref="observer" v-slot="{ validate, reset }">
          <v-row>
            <v-col cols="6" sm="6" lg="6">
              <v-radio-group
                  v-model="Expense.expense_for"
                  row
              >
                <v-radio
                    label="Warehouse"
                    value="Warehouse"
                ></v-radio>
                <v-radio
                    label="Shop"
                    value="Shop"
                ></v-radio>
              </v-radio-group>

            </v-col>
             <v-col cols="6" sm="6" lg="6">
              <ValidationProvider
                  rules="required"
                  name="Datetime"

              >
                <datePickComponent
                    hide-details="auto"
                    slot-scope="{ errors }"
                    v-model="Expense.date"
                    labelname="Date"
                    :error-messages="errors"
                    required
                />
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" lg="12">
              <ValidationProvider
                  name="Expense For"
                  rules="required"
                  hide-details="auto"
              >
                <v-autocomplete
                    slot-scope="{ errors }"
                    outlined
                    hide-details="auto"
                    v-model="Expense.category_id"
                    item-text="name"
                    item-value="id"
                    :items="expenseCategories"
                    :search-input.sync="searchExpense"
                    :loading="expenseLoading"
                    :error-messages="errors"
                    label="Expense For"

                    required
                ></v-autocomplete>
              </ValidationProvider>
            </v-col>

          </v-row>


          <v-row>
            <v-col cols="6" v-if="Expense.expense_for=='Warehouse'">
              <ValidationProvider  v-slot="{ errors }"   rules="required" name="warehouse">
                <v-autocomplete
                    outlined
                    hide-details="auto"
                    v-model="Expense.warehouse_id"
                    item-text="name"
                    item-value="id"
                    :items="warehouses"
                    :search-input.sync="searchWarehouse"
                    :loading="warehouseLoading"
                    :error-messages="errors"
                    label="Warehouse"
                    required
                ></v-autocomplete>
              </ValidationProvider>
            </v-col>
            <v-col cols="6" v-if="Expense.expense_for=='Shop'">
              <ValidationProvider  v-slot="{ errors }"  name="shop"  rules="required">
                <v-autocomplete
                    outlined
                    hide-details="auto"
                    v-model="Expense.shop_id"
                    item-text="name"
                    item-value="id"
                    :items="shops"
                    :search-input.sync="searchShop"
                    :loading="shopLoading"
                    :error-messages="errors"
                    label="Shops"
                    required
                ></v-autocomplete>
              </ValidationProvider>
            </v-col>
            <v-col cols="6" sm="6">
              <ValidationProvider
                  v-slot="{ errors }"
                  name="Amount"
                  rules="required"
              >
                <v-text-field
                    :error-messages="errors"
                    v-model="Expense.amount"
                    label="Amount"
                    auto-grow
                    outlined
                    hide-details="auto"
                ></v-text-field>
              </ValidationProvider>
            </v-col>

          </v-row>
          <v-row>
            <v-col cols="12">
              <ValidationProvider v-slot="{ errors }"  rules="required" name="Description">
                <v-textarea
                    hide-details="auto"
                    :error-messages="errors"
                    required
                    label="
                      Remark"
                    v-model="Expense.remark"
                    outlined
                    rows="3"
                ></v-textarea>
              </ValidationProvider>
            </v-col>

          </v-row>
        </ValidationObserver>
      </custom-modal>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapState } from "vuex";
import datePickComponent from "../../../components/base/DateComponent";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import FileUpload from "@/components/base/FileUpload";
import CustomModal from "@/components/base/CustomModal";
import * as moment from "moment/moment";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import {Expenses} from "@/models/Expenses";
export default {
  data: () => ({
    selectedImages: "",
    dialog: false,
    warehouses:[],
    searchWarehouse:null,
    expenseLoading:false,
    expenseCategories:[],
    ParentProductCategories: [],
    value: [],
    shops:[],
    options: [],
    isLoading: false,
  }),

  name: "AddCategory",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    Expense: {
      type: Object,
      default: {},
    },
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    FileUpload,datePickComponent,
    CustomModal,
  },
  computed: {

    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close", this.expenseCategory);
        }
      },
    },
  },
  methods: {
    close() {
      this.show = false;
      this.expenseCategory = new ProductCategory();

      this.$refs.observer.reset();
    },
    async SaveCategory() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.CreateExpense();
      }
    },

    getWarehouseByQuery(query = "") {
      this.warehouseLoading = true;
      this.$store
          .dispatch("warehouse/GetWarehouse", { query: query, status: "active" })
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
    async getAllShops(value) {
      debugger;
      await this.$store
          .dispatch("shop/GetShop", {})
          .then((res) => {
            this.shops = res;
          })
          .catch((err) => {});
    },
    getExpenseCategoriesByQuery() {
      this.expenseLoading = true;
      this.$store
          .dispatch("sitesetting/GetExpenseCategories")
          .then((res) => {
            debugger
            console.log(res);
            this.expenseCategories = res.data.data;
            this.expenseLoading = false;
          })
          .catch((err) => {
            this.expenseLoading = false;
            this.messages = err.data.name;
          });
    },
    CreateExpense() {
      this.isLoading = true;
      debugger
      this.$store
          .dispatch(
              "warehouse/EditExpense",
              {
                expense_for:this.Expense.expense_for,
                warehouse_id:this.Expense.warehouse_id,
                shop_id:this.Expense.shop_id,
                category_id:this.Expense.category_id,
                amount:this.Expense.amount,
                remark:this.Expense.remark,
                id:this.Expense.id,
                date:this.Expense.date
              }
          )
          .then(async (res) => {
            this.succeeed = true;
            this.$emit("afterSave");
            this.$toast.success("Expense category Edited  succesfully");

            this.isLoading = false;
            this.show = false;
            this.$refs.observer.reset();
          })
          .catch((err) => {
            this.isLoading = false;
            this.$refs.observer.setErrors(err.data.error);

            this.$toast.error("Productcategory created  failed!");
            this.isLoading = false;
          });
    },

  },

  created() {
    this.getExpenseCategoriesByQuery();
    this.getWarehouseByQuery();
    this.getAllShops("");
  },
  watch: {
    searchWarehouse(value) {
      if (!value) {
        this.getWarehouseByQuery("");
      }
      this.getWarehouseByQuery(value);
    },
  }
};
</script>


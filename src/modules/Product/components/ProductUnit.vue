<template>
  <div>
    <v-row>
      <v-col cols="12" sm="12" v-if="minimumurchasingUnitError != ''">
        <v-flex v-model="minimumurchasingUnitError" class="product-red">
          {{ minimumurchasingUnitError }}
        </v-flex>
      </v-col>

      <v-col cols="12" sm="12" md="4" lg="3">
        <v-autocomplete
          hide-details="auto"
          :disabled="isUpdate && !isUnitEditable"
          item-text="name"
          item-value="id"
          :items="units"
          v-model="defaultUnit.id"
          outlined
          dense
          label="Default unit"
          @input="onSelectDefaultUnit"
          :error-messages="defaultUnitError"
        >
          <template v-slot:item="{ item }">
            {{ item.name }} - {{ item.sortform }}
          </template>
        </v-autocomplete>
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="5">
        <v-radio-group
          hide-details="auto"
          class="unit-radio-buttom"
          row
          v-model="defaultUnit.isPurchasingUnit"
          :error-messages="defaultUnit.isPurchaseOrderUnitError"
          @change="onChangeIsPurchasingUnit(defaultUnit)"
        >
          <v-radio label="Purchasing and selling unit" :value="true"></v-radio>
          <v-radio label="Selling unit only" :value="false"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="6"
        lg="2"
        v-if="defaultUnit.isPurchasingUnit == true"
      >
        <v-text-field
          hide-details="auto"
          :rules="[reorderNumberRule]"
          type="number"
          v-model="defaultUnit.reorderLevel"
          @change="onChangeValue(selectedUnit)"
          label="Reorder level"
          outlined
          dense
          required
          :min="0"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="12" md="4" lg="2" class="pt-4">
        <v-tooltip
          bottom
          v-if="selectedUnits.length == 0 && defaultUnit.id != 0"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              class="icon_medium"
              color="#13928e"
              @click="addUnit"
              v-bind="attrs"
              v-on="on"
              >mdi-plus-box</v-icon
            >
          </template>
          <span>Add Unit</span>
        </v-tooltip>
      </v-col>
    </v-row>

    <div
      class="pa-0 mt-4"
      v-for="selectedUnit in selectedUnits"
      :key="selectedUnit"
    >
      <v-container>
        <v-row
          :class="`units unit-section d-flex justify-space-between ${
            selectedUnit.isPurchasingUnit != null
              ? selectedUnit.isPurchasingUnit
                ? 'purchasing-unit-section'
                : 'selling-unit-section'
              : ''
          }`"
        >
          <v-col cols="12" lg="3">
            <v-row>
              <v-col cols="12" class="py-0">
                <v-autocomplete
                  hide-details="auto"
                  item-text="name"
                  item-value="id"
                  :items="selectedUnit.units"
                  v-model="selectedUnit.id"
                  :error-messages="selectedUnit.unitError"
                  @change="onSelectUnit(selectedUnit)"
                  outlined
                  dense
                  label="Unit"
                  :disabled="
                    selectedUnit.isUnitDisabled ||
                    (selectedUnit.existing && isUpdate && !isUnitEditable)
                  "
                ></v-autocomplete>
              </v-col>
              <v-col cols="12">
                <v-radio-group
                  hide-details="auto"
                  class="unit-radio-buttom"
                  style="display: flex"
                  v-model="selectedUnit.isPurchasingUnit"
                  @change="onChangeIsPurchasingUnit(selectedUnit)"
                  :error-messages="selectedUnit.isPurchaseOrderUnitError"
                >
                  <v-radio
                    hide-details="auto"
                    label="Purchasing and selling unit"
                    :value="true"
                  ></v-radio>
                  <v-radio label="Selling unit only" :value="false"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" v-if="selectedUnit.isPurchasingUnit == true">
                <v-text-field
                  hide-details="auto"
                  :rules="[reorderNumberRule]"
                  v-if="selectedUnit.isPurchasingUnit == true"
                  type="number"
                  v-model="selectedUnit.reorderLevel"
                  @change="onChangeValue(selectedUnit)"
                  label="Reorder level"
                  outlined
                  dense
                  required
                  :min="0"
                ></v-text-field
              ></v-col>
            </v-row>
          </v-col>

          <v-col cols="12" sm="12" md="12" lg="8" v-if="selectedUnit.id > 0">
            <div class="sub-section pa-5">
              <v-row class=" d-flex align-baseline">
                <v-col cols="12" sm="12" md="12" lg="3">   1 <b class="px-3"> {{ getUnitName(selectedUnit.id) }}</b></v-col>
                <v-col cols="12" sm="12" md="12" lg="3">
               
                  <v-autocomplete
                    hide-details="auto"
                    item-text="symbol"
                    item-value="id"
                    :items="operators"
                    v-model="selectedUnit.conversionOperator"
                    :error-messages="selectedUnit.conversionOperatorError"
                    @change="onSelectOperator(selectedUnit)"
                    dense
                    outlined
                    label
                    :disabled="
                      selectedUnit.isChildDisabled ||
                      (selectedUnit.existing && isUpdate && !isUnitEditable)
                    "
                  ></v-autocomplete
                ></v-col>
                <v-col cols="12" sm="12" md="12" lg="3">
                  <v-text-field
                    hide-details="auto"
                    :rules="[valueNumberRule]"
                    type="number"
                    v-model="selectedUnit.conversionValue"
                    :error-messages="selectedUnit.conversionValueError"
                    @change="onChangeValue(selectedUnit)"
                    label="Value"
                    outlined
                    dense
                    required
                    :disabled="
                      selectedUnit.existing && isUpdate && !isUnitEditable
                    "
                    :min="0"
                  ></v-text-field>
                 
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="3">
                 equals to 1
                  <b class="px-3">{{ getUnitName(defaultUnit.id) }}</b>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row class="d-flex align-baseline">
                <v-col cols="12" sm="12" md="12" lg="3">
             1 <b class="px-3"> {{ getUnitName(defaultUnit.id) }}</b>
                </v-col>
           <v-col cols="12" sm="12" md="12" lg="3">
                              <v-autocomplete
                    hide-details="auto"
                    item-text="symbol"
                    item-value="id"
                    :items="operators"
                    v-model="selectedUnit.reverseConversionOperator"
                    :error-messages="
                      selectedUnit.reverseConversionOperatorError
                    "
                    @change="onSelectOperator(selectedUnit)"
                    outlined
                    dense
                    label
                    :disabled="
                      selectedUnit.isChildDisabled ||
                      (selectedUnit.existing && isUpdate && !isUnitEditable)
                    "
                  ></v-autocomplete>
           </v-col>
           
          <v-col cols="12" sm="12" md="12" lg="3">
                <v-text-field
                    hide-details="auto"
                    :rules="[valueNumberRule]"
                    type="number"
                    v-model="selectedUnit.reverseConversionValue"
                    :error-messages="selectedUnit.reverseConversionValueError"
                    @change="onChangeValue(selectedUnit)"
                    label="Value"
                    outlined
                    dense
                    required
                    :min="0"
                    :disabled="
                      selectedUnit.existing && isUpdate && !isUnitEditable
                    "
                  ></v-text-field>
           </v-col>
             <v-col cols="12" sm="12" md="12" lg="3">
                equals to 1
                <b class="px-1"> {{ getUnitName(selectedUnit.id) }}</b>
             </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="6"
            lg="1"
            class="pt-0 justify-end d-flex align-start cursor-pointer"
          >
            <v-tooltip
              class="cursor-pointer"
              bottom
              v-if="
                !selectedUnit.existing ||
                (selectedUnit.existing && isUpdate && isUnitEditable)
              "
            >
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  color="#b30000"
                  class="icon_small"
                  @click="removeUnit(selectedUnit.index)"
                  v-bind="attrs"
                  v-on="on"
                  >mdi-close</v-icon
                >
                    
              </template>
              <span>Remove</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-row
      class="justify-content-end"
      v-if="selectedUnits.length > 0 && defaultUnit.id != 0"
    >
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            class="icon_medium px-5"
            color="#13928e"
            @click="addUnit"
            v-bind="attrs"
            v-on="on"
            >mdi-plus-box</v-icon
          >
        </template>
        <span>Add unit</span>
      </v-tooltip>
    </v-row>
    <v-row>
      <v-col style="padding-top: 0px" cols="1" sm="12" md="6" lg="11"></v-col>
      <v-col style="padding-top: 0px" lg="1"></v-col>
    </v-row>
    <!-- </v-container> -->
    <!-- </v-card> -->
  </div>
</template>
<script>
import confirmation from "../../shared/components/confirmation";
import _ from "lodash";
import { numeric } from "vee-validate/dist/rules";
export default {
  props: {
    defaultUnit: {
      type: Object,
      default: { id: 0, reorderLevel: 1, isPurchaseOrderUnitError: "" },
    },
    selectedUnits: {
      type: Array,
      default: [],
    },
    isUpdate: {
      type: Boolean,
      default: false,
    },
    isUnitEditable: {
      type: Boolean,
      default: false,
    },
    clickSubmit: {
      type: Boolean,
      default: false,
    },
    defaultUnitError: {
      type: String,
      default: "",
    },
    clear: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    minimumurchasingUnitError: "",
    units: [],
    unitCombinations: [],
    btnHidden: true,
    removeRelatedUnits: [],
    operators: ["*", "/", "+", "-"],
    reorderNumberRule: (v) => {
      if (!v.trim()) return true;
      if (!isNaN(parseFloat(v)) && v >= 0) return true;
      return "Reorder level can not be negative";
    },
    valueNumberRule: (v) => {
      if (!v.trim()) return true;
      if (!isNaN(parseFloat(v)) && v >= 0) return true;
      return "Value can not be negative";
    },
  }),
  methods: {
    initialize() {
      this.selectedUnits = [];
      this.defaultUnit = {
        id: 0,
        reorderLevel: 1,
        isPurchaseOrderUnitError: "",
      };
    },
    addUnit() {
      this.minimumurchasingUnitError = "";
      if (
        this.validateLastAddedUnit() &&
        this.getUnitsForNewUnits().length > 0
      ) {
        let newUnit = new ProductUnit();
        newUnit.operator = 0;
        newUnit.operators = this.operators;
        newUnit.units = this.getUnitsForNewUnits();
        newUnit.reorderLevel = 1;
        newUnit.id = 0;
        newUnit.unitError = "";
        newUnit.conversionOperator = 1;
        newUnit.conversionOperatorError = "";
        newUnit.conversionValue = 0;
        newUnit.conversionValueError = "";
        newUnit.reverseConversionOperator = 1;
        newUnit.reverseConversionOperatorError = "";
        newUnit.reverseConversionValue = 0;
        newUnit.reverseConversionValueError = "";
        newUnit.isPurchaseOrderUnitError = "";
        newUnit.isPurchasingUnit = null;
        newUnit.index = this.selectedUnits.length;
        this.selectedUnits.push(newUnit);
        this.disableAddedUnits();
        this.emitData();
      }
    },
    resetUnits()
    {
      this.selectedUnits=[];
      this.defaultUnit = {
        id: 0,
        reorderLevel: 1,
        isPurchaseOrderUnitError: "",
      };
    },
    onSelectDefaultUnit(value) {
      this.defaultUnitError = "";
      this.emitData();
    },
    onSelectOperator(value) {
      this.emitData();
    },
    onSelectUnit(value) {
      value.unitError = "";
      this.emitData();
    },
    onChangeValue(value) {
      this.emitData();
    },
    onChangeIsPurchasingUnit(value) {
      this.minimumurchasingUnitError = "";
      value.isPurchaseOrderUnitError = "";
      this.emitData();
    },
    removeUnit(index) {
      this.resetUnitForSelectedUnits(this.selectedUnits[index].id);
      this.selectedUnits.splice(index, 1);
      this.selectedUnits.forEach((element, i, arr) => {
        element.index = i;
      });
      this.disableAddedUnits();
      this.emitData();
    },
    validateLastAddedUnit() {
      let isValid = true;
      if (
        this.selectedUnits.length > 0 &&
        this.selectedUnits[this.selectedUnits.length - 1].id == 0
      ) {
        this.selectedUnits[this.selectedUnits.length - 1].unitError =
          "Please select unit";

        isValid = false;
      }

      if (
        this.selectedUnits.length > 0 &&
        this.selectedUnits[this.selectedUnits.length - 1].isPurchasingUnit ==
          undefined
      ) {
        this.selectedUnits[
          this.selectedUnits.length - 1
        ].isPurchaseOrderUnitError = "Please select unit type";

        isValid = false;
      }
      if (this.defaultUnit.isPurchasingUnit == undefined) {
        this.defaultUnit.isPurchaseOrderUnitError = "Please select unit type";

        isValid = false;
      }
      this.selectedUnits = this.selectedUnits;
      return isValid;
    },
    emitData() {
      this.$emit("defaultUnit", {
        unit_id: this.defaultUnit.id,
        reorder_level: this.defaultUnit.reorderLevel + "",
        is_purchasing_unit: this.defaultUnit.isPurchasingUnit,
      });

      let tempSelectedUnits = [];
      _.cloneDeep(this.selectedUnits).forEach((selectedUnit) => {
        const t = _.cloneDeep({
          unit_id: selectedUnit.id,
          // reorder_level: selectedUnit.reorderLevel,
          conversion: {
            value: selectedUnit.conversionValue,
            operator_id: selectedUnit.conversionOperator,
          },
          reverseConversion: {
            value: selectedUnit.reverseConversionValue,
            operator_id: selectedUnit.reverseConversionOperator,
          },
        });

        if (selectedUnit.isPurchasingUnit) {
          t.reorder_level = selectedUnit.reorderLevel + "";
          t.is_purchasing_unit = true;
        } else {
          t.reorder_level = "0";
          t.is_purchasing_unit = false;
        }
        tempSelectedUnits.push(t);
      });
      this.$emit("productUnits", _.cloneDeep(tempSelectedUnits));
    },
    sortByNameUnits(array) {
      array = array.sort(function (a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
    },
    async GetUnits(query) {

      await this.$store
        .dispatch("product/GetAllUnits",{status:'active',query:query})
        .then((res) => {
          this.units = res.data.data;
          this.sortByNameUnits(this.units);
          this.selectedUnits.forEach((selectedUnit) => {
            selectedUnit.units = this.units;
          });
        })
        .catch((err) => {
          this.messages.push(err.data.title);
        });
    },
    GetOperator() {
      this.$store
        .dispatch("product/GetAllperators")
        .then((res) => {
          this.operators = res.data.data;
          this.sortByNameUnits(this.units);
        })
        .catch((err) => {
          this.messages.push(err.data.title);
        });
    },
    openConfirmation(selectedUnit) {
      confirmation.dialog = true;
      this.$confirm(
        `Do you want to change default unit \n ${
          this.units.find((u) => u.id == this.defaultUnit.id).name
        }`
      ).then((res) => {
        if (res) {
          this.removeUnit(this.selectedUnits.indexOf(selectedUnit));
        } else {
        }
      });
    },
    getUnitsForNewUnits() {
      if (this.selectedUnits.length == 0) {
        return this.units.filter((u) => u.id != this.defaultUnit.id);
      } else {
        let diff = [];
        this.units.forEach((item) => {
          if (item.id != this.defaultUnit.id) {
            if (this.selectedUnits.find((u) => u.id == item.id) == null) {
              diff.push(item);
            }
          }
        });
        return diff;
      }
    },
    disableAddedUnits() {
      this.selectedUnits.forEach((unit, i, arr) => {
        if (
          (i == this.selectedUnits.length - 1 && !unit.existing) ||
          (unit.existing && this.isUpdate && this.isUnitEditable)
        ) {
          unit.isUnitDisabled = false;
        } else {
          unit.isUnitDisabled = true;
        }
      });
    },
    resetUnitForSelectedUnits(unitId) {
      if (unitId) {
        this.selectedUnits.forEach((element) => {
          element.units.push(this.units.find((u) => u.id == unitId));
          this.sortByNameUnits(element.units);
        });
      }
    },
    resetSelectedUnitsIndex() {
      this.selectedUnits.forEach((element, i, arr) => {
        element.index = i;
      });
    },
    validateUnit() {
      if (this.defaultUnit.id == 0) {
        this.$emit("validUnit", false);
        this.defaultUnitError = "Please select unit";
      } else if (this.defaultUnit.reorder_level < 0) {
        this.defaultUnitReorderError = "Please select unit";
      } else {
        this.$emit("validUnit", true);
        this.defaultUnitError = "";
      }
    },
    getUnitName(id) {
      if (this.units.find((u) => u.id == id) != null) {
        return ` ${this.units.find((u) => u.id == id).name}`;
      } else {
        return "";
      }
    },
    emitDefaultUnit() {
      this.$emit("defaultUnit", {
        unit_id: this.defaultUnit.id,
        reorder_level: this.defaultUnit.reorderLevel + "",
        is_purchasing_unit: this.defaultUnit.isPurchasingUnit,
      });
    },
    onClear() {
      this.defaultUnit.id = 0;
      this.defaultUnit.isPurchasingUnit = null;
      this.defaultUnit.reorderLevel = 1;
      this.selectedUnits = [];
    },
    validatePurchasingUnit() {
      if (
        this.selectedUnits.filter((s) => s.isPurchasingUnit).length == 0 &&
        !this.defaultUnit.isPurchasingUnit
      ) {
        this.minimumurchasingUnitError =
          "Please add at least one purchasing unit";
        return false;
      } else {
        return true;
      }
    },
  },
  created: function () {
    this.initialize();
    this.GetUnits("");
    this.GetOperator();
  },
  mounted: function () {},
  watch: {
    selectedUnits: (newVal, oldVal) => {
      console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");
      console.log(newVal);

      // this.selectedUnits = [];
      // if (newVal != null) {
      //   newVal.forEach((unit) => {
      //     let newUnit = new Unit();
      //     newUnit.units = this.units;
      //     newUnit.id = unit.id;
      //     newUnit.operators = this.operators;
      //     newUnit.operator = unit.operator;
      //     newUnit.value = unit.value;
      //     newUnit.unitError = "";
      //     newUnit.operatorError = "";
      //     newUnit.valueError = "";
      //   });
      // }
    },

    defaultUnit: {
      handler: function (val, oldVal) {
        // this.emitDefaultUnit();
        this.emitData();
      },
      deep: true,
    },
    clickSubmit: {
      handler: function (val, oldVal) {
        try {
          if (this.defaultUnit.id == 0) {
            this.emitData();
            this.$emit("validUnit", false);
            this.defaultUnitError = "Please select default unit";
          } else {
            if (this.validatePurchasingUnit()) {
              this.emitData();
              this.$emit("validUnit", true);
              this.defaultUnitError = "";
            } else {
              this.$emit("validUnit", false);
            }
          }
        } catch (error) {
          console.log(error);
        }
      },
      deep: true,
    },
    clear: {
      handler: function (val, oldVal) {
        debugger;

        this.onClear();
      },
      deep: true,
    },
  },
};

export class ProductUnit {
  constructor() {
    this.units = [];
    this.selectedUnit = null;
    this.operators = [];
    this.selectedOperator = null;
    this.value = null;
  }
}
</script>

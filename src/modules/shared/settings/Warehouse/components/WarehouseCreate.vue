<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="600px">
      <custom-modal
        title="Create Warehouse"
        @onSubmit="saveWarehouse"
        @onClose="close"
        :isLoading="isLoading"
      >
        <ValidationObserver ref="observer" v-slot="{ validate, reset }">
          <v-row>
            <v-col cols="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="Name"
                vid="name"
                rules="required"
              >
                <v-textarea
                hide-details="auto"
                  outlined
                  dense
                  :error-messages="errors"
                  required
                  v-model="warehouse.name"
                  label="Name"
                  auto-grow
                  rows="1"
                  row-height="15"
                ></v-textarea>
              </ValidationProvider>
            </v-col>
            <v-col cols="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="Phone"
                :rules="{ required: true, regex: /^[+,-,0-9]*[+,-,0-9]*$/ }"
              >
                <v-textarea
                  outlined
                        hide-details="auto"
                  dense
                  v-model="warehouse.phone"
                  required
                  label="Phone"
                  number
                  :rules="Countrules"
                            maxlength="13"
                  :error-messages="errors"
                  auto-grow
                  rows="1"
                  row-height="15"
                ></v-textarea>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row></v-row>
          <v-row>
            <v-col cols="12">
              <ValidationProvider
                v-slot="{ errors }"
                name="Address"
                rules="required"
              >
                <v-textarea
                      hide-details="auto"
                  outlined
                  v-model="warehouse.address"
                  :error-messages="errors"
                  required
                  dense
                  label="Address"
                  auto-grow
                  rows="1"
                  row-height="15"
                ></v-textarea>
              </ValidationProvider>
            </v-col>
            <v-col cols="12">
              <ValidationProvider v-slot="{ errors }">
                <v-textarea
                      hide-details="auto"
                  outlined
                  :error-messages="errors"
                  required
                  v-model="warehouse.description"
                  dense
                  label="Description"
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
import { required, email, max, regex } from "vee-validate/dist/rules";

import { Warehouse } from "../../../../../models/Warehouse";
// import the component

import {
  WarehouseEntity,
  WareHouseEntityModel,
} from "../../../../../models/EntityModels/WareHouseEntityModel";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
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
  data: () => ({
          Countrules: [v => v.length <= 13 || 'Maximum 13 numbers are allowed'],
    dialog: false,
    warehouse: new Warehouse(),
    value: [],
    options: [],
    isLoading:false
  }),

  name: "ADD warehouse",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  components: { ValidationProvider, ValidationObserver },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close", this.warehouse);
        }
      },
    },
  },
  methods: {
    close() {
      this.show = false;
      this.warehouse = new Warehouse();

      this.$refs.observer.reset();
    },
    async saveWarehouse() {
      const isValid = await this.$refs.observer.validate();
      this.warehouse.isAdd = true;

      if (isValid) {
        this.isLoading = true;
        this.Createwarehouse();
      }
    },

    Createwarehouse() {
      delete this.warehouse.id;
      delete this.warehouse.isAdd;
      this.$store
        .dispatch(
          "warehouse/AddWarehouse",
          new WareHouseEntityModel(this.warehouse)
        )
        .then((res) => {
          this.succeeed = true;
          this.$emit("afterSave");
          this.$toast.success("Warehouse created  successfully");
          this.warehouse = {};
         
          this.isLoading = false;
          this.show = false;
          
      this.$refs.observer.reset();
        })
        .catch((err) => {
          this.$refs.observer.setErrors(err.data.error);
          this.messages = err.data.title;
          this.isLoading = false;
          this.$toast.error("Warehouse created failed");
        });
    },
  },
};
</script>

<style></style>

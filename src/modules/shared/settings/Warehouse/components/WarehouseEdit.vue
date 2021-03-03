<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="600px">
      <custom-modal
        title="Edit Warehouse"
        @onSubmit="SaveEditedWareHouse"
        @onClose="show = false"
        :isLoading="isLoading"
      >
        <ValidationObserver ref="observer" v-slot="{ validate, reset }">
          <v-row>
            <v-col cols="6">
              <ValidationProvider
                v-slot="{ errors }"
                vid="name"
                name="Name"
                rules="required"
              >
                <v-textarea
                  hide-details="auto"
                  outlined
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
                name="phone"
                :rules="{ required: true, regex: /^[+,-,0-9]*[+,-,0-9]*$/ }"
              >
                <v-textarea
                  hide-details="auto"
                  outlined
                  required
                  v-model="warehouse.phone"
                  label="Phone"
                  :error-messages="errors"
                  :rules="Countrules"
                  maxlength="13"
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
                  outlined
                  hide-details="auto"
                  v-model="warehouse.address"
                  :error-messages="errors"
                  required
                  label="Address"
                  auto-grow
                  rows="1"
                  row-height="15"
                ></v-textarea>
              </ValidationProvider>
            </v-col>
            <v-col cols="12">
              <ValidationProvider v-slot="{ errors }" name="Description">
                <v-textarea
                  hide-details="auto"
                  outlined
                  :error-messages="errors"
                  required
                  v-model="warehouse.description"
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
import { Warehouse } from "../../../../../models/Warehouse";
// import the component
import { required, email, max, regex } from "vee-validate/dist/rules";

import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
export default {
  data: () => ({
    Countrules: [(v) => v.length <= 13 || "Maximum 13 numbers are allowed"],
    dialog: false,
    value: [],
    options: [],
    isLoading: false,
  }),
  created() {
    this.GetWarehouse();
    extend("regex", {
      ...regex,
      message: "The value is not a valid phone number",
    });
  },

  name: "editwarehouse",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    warehouse: {
      type: Object,
      default: {},
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
    async SaveEditedWareHouse() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.EditWarehouse();
      }
    },

    EditWarehouse() {
      this.isLoading = true;
      this.$store
        .dispatch("warehouse/EditWarehouse", this.warehouse)
        .then((res) => {
          this.succeeed = true;
          this.$emit("afterSave");
          this.$toast.success("Warehouse edited  successfully");
          this.show = false;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$refs.observer.setErrors(err.data.error);

          this.messages = err.data.title;
          this.$toast.error("Warehouse edited  failed");
        });
    },
    GetWarehouse() {
      let warehouseId = this.$route.params.id;
      this.$store
        .dispatch("warehouse/GetWarehouse", warehouseId)
        .then((res) => {
          this.warehouse = new Warehouse().Initialise(res.data);
        })
        .catch((err) => {
          this.messages = err.data.title;
        });
    },
  },
};
</script>

<style></style>

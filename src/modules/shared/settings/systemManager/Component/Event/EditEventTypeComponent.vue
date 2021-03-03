<template>
  <v-row justify="center">
    <v-dialog
      style="border-radius: 5px"
      v-model="show"
      persistent
      max-width="600px"
    >
      <custom-modal
        title="Edit Event Type"
        @onSubmit="SaveEvent"
        @onClose="close"
        :isLoading="isLoading"
      >
        <ValidationObserver ref="observer" v-slot="{ validate, reset }">
          <v-row>
            <v-col cols="8">
              <ValidationProvider
                v-slot="{ errors }"
                name="Name"
                vid="name"
                rules="required"
                hide-details="auto"
              >
                <v-text-field
                  hide-details="auto"
                  :error-messages="errors"
                  required
                  label="Name"
                  v-model="Event.name"
                  auto-grow
                  outlined
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="4">
              <ValidationProvider
                v-slot="{ errors }"
                name="Code"
                rules="required"
                hide-details="auto"
              >
                <v-text-field
                  hide-details="auto"
                  :error-messages="errors"
                  required
                  label="Code"
                  v-model="Event.code"
                  auto-grow
                  outlined
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="4">
              
                    <v-menu offset-y>
        <template v-slot:activator="{ on }">
           <ValidationProvider
                v-slot="{ errors }"
                name="color"
                rules="required"
                hide-details="auto"
              >
          <v-btn
            :color="Event.color"
            dark
            v-on="on"
              v-model="Event.color"
          >
            Event Type Color
          </v-btn>
              </ValidationProvider>
        </template>
        <v-color-picker
     
        v-model="Event.color"
        hide-canvas 
        hide-inputs 
        show-swatches
        class="mx-auto"
      ></v-color-picker>
      </v-menu>
             
            </v-col>

            <v-col cols="4">
              <ValidationProvider
                v-slot="{ errors }"
                name="Read Only"
                rules="required"
                hide-details="auto"
              >
                <v-select
                  dense
                  outlined
                  :items="status"
                  item-text="text"
                  item-value="value"
                  hide-details="auto"
                  v-model="Event.readonly"
                  :error-messages="errors"
                  label="Read  Only "
                ></v-select>
              </ValidationProvider>
            </v-col>
            <v-col cols="4">
              <ValidationProvider
                v-slot="{ errors }"
                name="Holiday"
                rules="required"
                hide-details="auto"
              >
                <v-select
                  dense
                  outlined
                  :items="status"
                  item-text="text"
                  item-value="value"
                  hide-details="auto"
                  v-model="Event.is_holiday"
                  :error-messages="errors"
                  label="Holiday "
                ></v-select>
              </ValidationProvider>
            </v-col>

            <v-col cols="12">
              <v-textarea
                label="description"
                dense
                outlined
                 rows="2"
                hide-details="auto"
                v-model="Event.description"
                :error-messages="errors"
              >
              </v-textarea>
            </v-col>
          </v-row>
        </ValidationObserver>
      </custom-modal>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapState } from "vuex";
import CustomModal from "@/components/base/CustomModal";
import { required, email, max } from "vee-validate/dist/rules";
import _ from "lodash";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

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
  data: () => ({
       dialog: false,
   
    pagination1: {
      descending: true,
      page: 1,
      rowsPerPage: 2,
      sortBy: "fat",
      totalItems: 0,
      rowsPerPageItems: [1, 2, 4, 8, 16],
    },
    pagination: {
      page: 1,
      itemsPerPage: 2,
    },
    page: 1,
   
    value: [],
    options: [],
     status: [
      { text: "Yes", value: "Yes" },
      { text: "No", value: "No" },
     
    ],
    isLoading: false,
  }),

  name: "Add Eventype",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    Event: {
      type: Object,
      default: {},
    },
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    CustomModal,
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      },
    },
  },
  methods: {
    close() {
      this.show = false;

      this.$refs.observer.reset();
    },
    async SaveEvent() {
      const isValid = await this.$refs.observer.validate();

      if (isValid) {
        this.UpdateEventType();
      }
    },

    UpdateEventType() {
      this.isLoading = true;
      const credential = this.Event;

      this.$store
        .dispatch("system/UpdateEventType", {
          data: {
            id: credential.id,
            name: credential.name,
            code: credential.code,
            color: credential.color,
            readonly: credential.readonly,
            is_holiday: credential.is_holiday,
              description: credential.description,
          },
        })
        .then(async (res) => {
          this.succeeed = true;
          this.$emit("afterSave");
          this.$toast.success("Event Type edited  succesfully");

          this.isLoading = false;
          this.show = false;

          this.$refs.observer.reset();
        })
        .catch((err) => {
          this.isLoading = false;
          this.$refs.observer.setErrors(err.data.error);

          this.$toast.error("Event Type edited  failed!");
          this.isLoading = false;
        });
    },
  },
};
</script>

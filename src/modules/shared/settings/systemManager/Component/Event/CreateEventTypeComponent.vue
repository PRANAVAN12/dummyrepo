<template>
  <v-row justify="center">
    <v-dialog
      style="border-radius: 5px"
      v-model="show"
      persistent
      max-width="600px"
    >
      <custom-modal
        title="Create Event Type"
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
                 vid="code"
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
                   <ValidationProvider
                v-slot="{ errors }"
                name="color"
                rules="required"
                hide-details="auto"
              >
            <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            :color="Event.color"
            dark
            v-on="on"
          >
            Event Type Color
          </v-btn>
        </template>
        <v-color-picker
        value="#7417BE"
        v-model="Event.color"
        hide-canvas 
        hide-inputs 
        show-swatches
        class="mx-auto"
      ></v-color-picker>
      </v-menu>
         </ValidationProvider>
          
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
     color: 'pink',
    
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
    Event: {
      name: "",
      code: "",
      description: "",
      color: "",
      readonly: "",
      is_holiday: "",
    },

    value: [],
      status: [
      { text: "Yes", value: "Yes" },
      { text: "No", value: "No" },
     
    ],
    options: [],
    isLoading: false,
  }),

  name: "Add EventType",
  props: {
    visible: {
      type: Boolean,
      default: false,
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
        this.CreateEvent();
      }
    },

    CreateEvent() {
      this.isLoading = true;
      this.$store
        .dispatch("system/AddEventType", this.Event)
        .then(async (res) => {
          this.succeeed = true;
          this.$emit("afterSave");
          this.$toast.success("Event Type created  succesfully");

          this.isLoading = false;
          this.show = false;

          this.$refs.observer.reset();
        })
        .catch((err) => {
          this.isLoading = false;
          this.$refs.observer.setErrors(err.data.error);

          this.$toast.error("Event Type created  failed!");
          this.isLoading = false;
        });
    },
  },
};
</script>

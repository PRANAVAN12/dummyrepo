<template>
  <v-row justify="center">
    <v-dialog
      style="border-radius: 5px"
      v-model="show"
      persistent
      max-width="600px"
    >
      <custom-modal
        title="Create Office"
        @onSubmit="SaveOffice"
        @onClose="close"
        :isLoading="isLoading"
      >
        <ValidationObserver ref="observer" v-slot="{ validate, reset }">
          <v-row>
        
            <v-col cols="4">
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
                  v-model="Office.name"
                  auto-grow
                  outlined
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="8">
              <ValidationProvider
                v-slot="{ errors }"
                name="Addres"
                rules="required"
                hide-details="auto"
              >
                <v-text-field
                  hide-details="auto"
                  :error-messages="errors"
                  required
                  label="Address"
                  v-model="Office.address_line"
                  auto-grow
                  outlined
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="4">
              <ValidationProvider
                v-slot="{ errors }"
                name="City"
                rules="required"
                hide-details="auto"
              >
                <v-text-field
                  hide-details="auto"
                  :error-messages="errors"
                  required
                  label="City"
                  v-model="Office.city"
                  auto-grow
                  outlined
                ></v-text-field>
              </ValidationProvider>
            </v-col>

            <v-col cols="4">
              <ValidationProvider
                v-slot="{ errors }"
                name="Open Time"
                rules="required"
                hide-details="auto"
              >
              
               <v-menu
        ref="menu"
        v-model="menu22"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="time"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="Office.open_time"
            label="Opening Time"
            readonly
            outlined
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="menu22"
          v-model="Office.open_time"
          ampm-in-title
          full-width
          @click:minute="$refs.menu.save(time)"
        ></v-time-picker>
      </v-menu>

      
                
              </ValidationProvider>
            </v-col>
            <v-col cols="4">
              <ValidationProvider
                v-slot="{ errors }"
                name="Close Time"
                rules="required"
                hide-details="auto"
              >

               <v-menu
        ref="menu"
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="time"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="Office.close_time"
            label="Closing Time"
            readonly
            outlined
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="menu2"
          v-model="Office.close_time"
          ampm-in-title
          full-width
          @click:minute="$refs.menu.save(time)"
        ></v-time-picker>
      </v-menu>

  
                
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
     time: null,
    menu2: false,
     menu22: false,
    modal2: false,
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
    Office: {
      name: "",
      close_time:"",
      open_time:"",
      city:"",
      address_line:"",

    },

    value: [],
    options: [],
    isLoading: false,
  }),

  name: "Add Office",
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
    async SaveOffice() {
      const isValid = await this.$refs.observer.validate();

      if (isValid) {
        this.CreateOffice();
      }
    },

    CreateOffice() {
      this.isLoading = true;
      this.$store
        .dispatch("system/AddOffice", this.Office)
        .then(async (res) => {
          this.succeeed = true;
          this.$emit("afterSave");
          this.$toast.success("Office created  succesfully");

          this.isLoading = false;
          this.show = false;

          this.$refs.observer.reset();
        })
        .catch((err) => {
          this.isLoading = false;
          this.$refs.observer.setErrors(err.data.error);

          this.$toast.error("Office created  failed!");
          this.isLoading = false;
        });
    },
  },
};
</script>

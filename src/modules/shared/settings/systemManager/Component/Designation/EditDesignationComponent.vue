<template>
  <v-row justify="center">
    <v-dialog
      style="border-radius: 5px"
      v-model="show"
      persistent
      max-width="600px"
    >
      <custom-modal
        title="Edit Desigination"
        @onSubmit="SaveDesigination"
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
                  v-model="Designation.name"
                  auto-grow
                  outlined
                ></v-text-field>
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
    Designtion: {
      name: "",
    },

    value: [],
    options: [],
    isLoading: false,
  }),

  name: "Add Employe",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    Designation: {
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
    async SaveDesigination() {
      const isValid = await this.$refs.observer.validate();

      if (isValid) {
        this.UpdateDesigination();
      }
    },

    UpdateDesigination() {
      this.isLoading = true;
      const credential = this.Designation;
      
         
      this.$store
        .dispatch("system/UpdateDesigination", {
           
          data: {
                id: credential.id,
            name: credential.name,
          
          },
        })
        .then(async (res) => {
          this.succeeed = true;
          this.$emit("afterSave");
          this.$toast.success("Desiginaion created  succesfully");

          this.isLoading = false;
          this.show = false;

          this.$refs.observer.reset();
        })
        .catch((err) => {
          this.isLoading = false;
          this.$refs.observer.setErrors(err.data.error);

          this.$toast.error("Desiginaion created  failed!");
          this.isLoading = false;
        });
    },
  },
};
</script>

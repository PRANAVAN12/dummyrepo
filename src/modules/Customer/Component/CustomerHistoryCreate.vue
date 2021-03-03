<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline font-weight-lighter">Add History</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="12" class="pa-3">
                <ValidationObserver ref="observer">
                  <v-row>
                    <v-col cols="12">
                      <ValidationProvider v-slot="{ errors }" name="Date" rules="required">
                        <datePickComponent
                          v-model="history.date"
                          labelname="Date"
                          outlined
                          :error-messages="errors"
                          required
                        />
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12">
                      <ValidationProvider v-slot="{ errors }" name="Comment" rules="required">
                        <v-textarea
                          rows="3"
                          outlined
                          v-model="history.comments"
                          label="Comment"
                          :error-messages="errors"
                          required
                        ></v-textarea>
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                </ValidationObserver>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed small class="text-white btn_medium" @click="clear()">Clear</v-btn>
          <v-btn
            depressed
            small
            class="text-white btn_blue btn_medium w-100"
            @click="SaveCustomerHistory()"
            :disabled="isDisabledSubmit"
          >Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { required, email, max } from "vee-validate/dist/rules";
import _ from "lodash";
import datePickComponent from "../../../components/base/DateComponent";

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
export default {
  data: () => ({
    show: false,
    isDisabledSubmit: false,
    history: {
      date: "",
      comments: "",
    },
  }),

  methods: {
    openModal() {
      this.show = true;
    },
    async SaveCustomerHistory() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.saveHistory();
      }
    },

    saveHistory: _.debounce(function () {
      this.isDisabledSubmit = true;
      var id = this.$route.params.id;
      var historydetails = this.history;
      this.$store
        .dispatch("customer/CreateHistoryDetails", { historydetails, id })
        .then((res) => {
          this.visible = false;
          this.isDisabledSubmit = false;
          this.$toast.success("Customer history added successfully");
          this.$emit("afterSave");
          this.show = false;
          this.history = {};
        })
        .catch((err) => {
          this.messages.push(err.data.title);
        });
    }),

    clear() {
      this.show = false;
      this.history = {};
    },
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    datePickComponent,
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close", this.payments);
        }
      },
    },
  },
};
</script>

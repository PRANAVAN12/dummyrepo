<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline font-weight-lighter">Edit Bank Details</span>
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
            @click="SaveEditedHistorydetails()"
          >Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { required, email, max } from "vee-validate/dist/rules";
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
    value: [],
    history: {
      date: "",
      comment: "",
      id: "",
    },
  }),
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    history: {
      type: Object,
      default: {},
    },
  },

  methods: {
    async SaveEditedHistorydetails() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.EditHistory();
      }
    },
     clear() {
      this.show = false;
      this.history = {};
    },

    EditHistory() {
      let historydetailId = this.$route.params.id;
      let history = this.history;
      this.$store
        .dispatch("customer/EditHistoryDetail", { historydetailId, history })
        .then((res) => {
          this.visible = false;
          this.$emit("afterEdit");
          this.$toast.success("Customer history edited successfully");

          this.show = false;
        })
        .catch((err) => {
          this.messages = err.data.title;
          this.$toast.error("Customer history details failed");
          this.$emit("afterEdit");
        });
    },
    GetHistoryDtails() {
       
      let historydetailId = this.$route.params.id;
      this.$store
        .dispatch("customer/GetcustomerHistoryDetails", historydetailId)
        .then((res) => {
           
          this.history = res.data.data;
        })
        .catch((err) => {
          this.messages = err.data.title;
        });
    },
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    datePickComponent,
  },
  created() {
    this.GetHistoryDtails();
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close", this.history);
        }
      },
    },
  },
};
</script>

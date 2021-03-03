<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="800">
      <custom-modal
        title="Cheque Details"
        @onClose="
          onClose();
          show = false;
        "
        :isLoading="isLoading"
        :showSave="false"
      >
        <v-container class="pt-0" fluid>
          <v-row>
            <v-col>
              <v-row v-if="cheque.chequeFor == 'other'">
                <v-col cols="6" sm="6" md="6" lg="2">
                  <h4>Date :</h4>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="4">
                  <v-chip label> {{ cheque.date | formatDate }} </v-chip>
                </v-col>
              </v-row>

              <v-row v-else>
                <v-col cols="6" sm="6" md="6" lg="2">
                  <h4>Date :</h4>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="4">
                  <v-chip label> {{ cheque.date | formatDate }} </v-chip>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="2">
                  <h4>Cheque for :</h4>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="4">
                  <v-chip label>{{ cheque.chequeFor }}</v-chip>
                </v-col>
              </v-row>

              <v-row v-if="cheque.chequeFor != 'other'">
                <v-col
                  cols="6"
                  sm="6"
                  md="6"
                  lg="2"
                  v-if="cheque.chequeFor == 'purchase'"
                >
                  <h4>Supplier :</h4>
                </v-col>
                <v-col v-else cols="6" sm="6" md="6" lg="2">
                  <h4>Customer :</h4>
                </v-col>

                <v-col cols="6" sm="6" md="6" lg="4"  v-if="cheque.chequeFor == 'purchase'">
                  <v-chip label>{{ cheque.supplier }}</v-chip>
                </v-col>

                <v-col v-else cols="6" sm="6" md="6" lg="4" >
                  <v-chip label>{{ cheque.customer.name }}</v-chip>
                </v-col>

                <v-col cols="6" sm="6" md="6" lg="2">
                  <h4>Bank :</h4>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="4">
                  <v-chip label>{{ cheque.bank }}</v-chip>
                </v-col>
              </v-row>

              <v-row v-else>
                <v-col cols="6" sm="6" md="6" lg="2">
                  <h4>Cheque for :</h4>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="4">
                  <v-chip label>{{ cheque.chequeFor }}</v-chip>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="2">
                  <h4>Bank :</h4>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="4">
                  <v-chip label>{{ cheque.bank }}</v-chip>
                </v-col>
              </v-row>
              <v-row> </v-row>

              <v-row>
                <v-col cols="6" sm="6" md="6" lg="2">
                  <h4>Number :</h4>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="4">
                  <v-chip label>{{ cheque.number }}</v-chip>
                </v-col>

                <v-col cols="6" sm="6" md="6" lg="2">
                  <h4>Amount :</h4>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="4">
                  <v-chip label>{{ cheque.amount }}</v-chip>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6" sm="6" md="6" lg="2">
                  <h4>Type :</h4>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="4">
                  <v-chip label>{{ cheque.type }}</v-chip>
                </v-col>

                <v-col cols="6" sm="6" md="6" lg="2" v-if="showEditCheque">
                  <h4>Status :</h4>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="4" v-if="showEditCheque">
                  <v-chip label>
                    {{ cheque.status }}
                  </v-chip>

                  <v-tooltip
                    bottom
                    v-if="showEditCheque && cheque.status == 'Pending'"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="ma-1 white ml-5"
                        x-small
                        color="black"
                        v-bind="attrs"
                        v-on="on"
                        icon
                        @click="editChequeStatus"
                      >
                        <v-icon>edit</v-icon>
                      </v-btn>
                    </template>
                    <span>Change Status</span>
                  </v-tooltip>

                  <!-- <v-btn
                    v-if="showEditCheque && cheque.status == 'Pending'"
                    x-small
                  >
                    <v-icon depressed small link @click="editChequeStatus"
                      >edit</v-icon
                    >
                  </v-btn> -->
                </v-col>
                <v-col v-if="!showEditCheque" lg="6" class="sub-section">
                  <v-row>
                    <v-col cols="12">
                      <v-select
                        v-if="!showEditCheque"
                        hide-details="auto"
                        :items="status"
                        v-model="selectedStatus"
                        item-text="text"
                        item-value="value"
                        outlined
                        dense
                        label="Status"
                        @change="setShowReason"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <ValidationObserver ref="observer">
                    <v-row v-if="showReason">
                      <v-col cols="12" class="pb-0">
                        <ValidationProvider
                          name="Reason"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-textarea
                            :error-messages="errors"
                            required
                            v-model="reason"
                            label="Reason"
                            auto-grow
                            rows="3"
                            row-height="20"
                            outlined
                          ></v-textarea>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                  </ValidationObserver>
                  <v-row>
                    <v-col
                      cols="12"
                      v-if="!showEditCheque"
                      class="d-flex justify-content-end py-0 align-center"
                    >
                      <v-btn color="green" x-small dark>
                        <v-icon link @click="updateChequeStatus()">done</v-icon>
                      </v-btn>
                      <v-btn color="secondary" x-small dark class="ma-1">
                        <v-icon
                          depressed
                          small
                          link
                          @click="cancelEditChequeStatus(item)"
                          >clear</v-icon
                        >
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="mt-5" cols="12 sub-section">
                  <FileUpload
                    v-if="show"
                    :multiple="true"
                    size="2048"
                    icon="mdi-upload"
                    autoupload="true"
                    :url="`document/upload/payment/${cheque.id}`"
                    :showDocumentView="true"
                    :documentsUrl="`document/payment/${cheque.id}`"
                    downloadUrl="document/:id/download"
                    removeUrl="document/:id"
                  ></FileUpload>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </custom-modal>
    </v-dialog>
  </v-row>
</template>

<script>
import FileUpload from "@/components/base/FileUpload";
import { Cheque } from "../../models/Cheque";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
  withValidation,
} from "vee-validate";
import { required, email, max, numeric } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "{_field_} is required",
});

export default {
  components: {
    FileUpload,
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    showEditCheque: true,
    showReason: false,
    isLoading: false,
    show: false,
    cheque: {},
    status: [
      { text: "Pending", value: "Pending" },
      { text: "Bounced", value: "Bounced" },
      { text: "Canceled", value: "Canceled" },
      { text: "Completed", value: "Completed" },
    ],
    selectedStatus: null,
    chequeId: null,
    reason: null,
  }),
  props: {},
  computed: {},
  methods: {
    editChequeStatus() {
      this.showEditCheque = false;
    },
    cancelEditChequeStatus() {
      this.showEditCheque = true;
      this.selectedStatus = this.cheque.status;
    },
    onClose() {
      this.$emit("onClose", true);
    },
    async updateChequeStatus() {
      if (await this.$refs.observer.validate()) {
        this.isLoading = true;
        let payload = {
          id: this.cheque.id,
          status: this.selectedStatus,
          remarks: this.reason,
        };
        this.$store
          .dispatch("chequeManagement/changeChequeStatus", payload)
          .then((res) => {
            this.isLoading = false;
            this.$toast.success("Cheque status successfully updated");
            this.getCheque(this.chequeId);
            this.showEditCheque = true;
          })
          .catch((err) => {
            this.selectedStatus = this.cheque.status;
            this.$toast.error("Cheque status updated failed");
            this.isLoading = false;
          });
      }
    },
    openModal(chequeId) {
      this.chequeId = chequeId;
      this.show = true;
      this.showEditCheque = true;
      this.getCheque(chequeId);
    },
    getCheque(id) {
      this.$store
        .dispatch("chequeManagement/GetCheque", id)
        .then((res) => {
          debugger;
          this.cheque = new Cheque().toViewModel(res.data);
          this.selectedStatus = this.cheque.status;
          this.setShowEdit();
          this.setShowReason();
        })
        .catch((err) => {});
    },
    setShowEdit() {
      if (this.cheque.status == "Pending") {
        this.showEditCheque = true;
      }
    },
    setShowReason() {
      if (
        this.selectedStatus == "Canceled" ||
        this.selectedStatus == "Bounced"
      ) {
        this.showReason = true;
      } else {
        this.showReason = false;
      }
    },
  },
  created() {},
};
</script>
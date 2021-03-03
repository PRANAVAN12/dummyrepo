<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="880px">
      <custom-modal
        title="Leave Request Details"
        @onSubmit="submitCheque"
        @onClose="onClose()"
        :isLoading="isLoading"
      >
           <v-container class="pt-0" fluid>
          <v-row>
            <v-col>
              <v-row >
                <v-col cols="6" sm="6" md="6" lg="2">
                  <h4>Date :</h4>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="4">
                  <v-chip label> {{ leave.from_date | formatDate }} </v-chip>
                </v-col>
              </v-row>

            
 <v-row >
                <v-col
                  cols="6"
                  sm="6"
                  md="6"
                  lg="2"
                
                >
                  <h4>First Day of Leave :</h4>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="4" >
                  <v-chip label>{{ leave.first_day_of_leave |formatDate }}</v-chip>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="2">
                  <h4>Last Day of Leave :</h4>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="4">
                  <v-chip label>{{ leave.last_day_of_leave | formatDate }}</v-chip>
                </v-col>
              </v-row>
              <v-row >
                <v-col
                  cols="6"
                  sm="6"
                  md="6"
                  lg="2"
                
                >
                  <h4>Last Working  Day Before Leave</h4>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="4" >
                  <v-chip label>{{ leave.last_working_day_before_leave|formatDate }}</v-chip>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="2">
                  <h4>Last Working  Day After Leave :</h4>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="4">
                  <v-chip label>{{ leave.first_working_day_after_leave|formatDate }}</v-chip>
                </v-col>
              </v-row>
             <v-row >
                <v-col
                  cols="6"
                  sm="6"
                  md="6"
                  lg="2"
                
                >
                  <h4>Start Date :</h4>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="4" >
                  <v-chip label>{{ leave.from_date|formatDate }}</v-chip>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="2">
                  <h4>No Of Days :</h4>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="4">
                  <v-chip label>{{ leave.number_of_days }}</v-chip>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6" sm="6" md="6" lg="2">
                  <h4>Type :</h4>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="4">
                  <v-chip label>{{ leave.leaveType.name }}</v-chip>
                </v-col>

                <v-col cols="6" sm="6" md="6" lg="2" v-if="showEditCheque">
                  <h4>Status :</h4>
                </v-col>
                <v-col cols="6" sm="6" md="6" lg="4" v-if="showEditCheque">
                  <v-chip label>
                    {{ leave.status }}
                  </v-chip>

                  <v-tooltip
                    bottom
                    v-if="showEditCheque && leave.status == 'Applied'"
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
                        <v-icon link @click="updateLeaveStatus()">done</v-icon>
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

              
            </v-col>
          </v-row>
        </v-container>
      </custom-modal>
    </v-dialog>
  </v-row>
</template>

<script>
import { Payment } from'../../../models/EntityModels/LeaveRequest';
import datePickComponent from "@/components/base/DateComponent";
import FileUpload from "@/components/base/FileUpload";
import { required, numeric } from "vee-validate/dist/rules";

import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { Cheque } from '../../../models/EntityModels/LeaveRequest';
extend("required", {
  ...required,
  message: "{_field_} is required",
});
extend("numeric", {
  ...numeric,
  message: "input must be numeric",
});
extend("max", {
  ...numeric,
  message: "amount must be less than balance",
});
export default {
  data: () => ({
      leaveTypes:[],
       showReason: false,
    showEditCheque:true,
    dialog: false,
    reason:null,
    show: false,
    selectedFiles: [],
    errors: [],
    status: [
      { text: "Applied", value: "Applied" },
      { text: "Cancelled", value: "Cancelled" },
    ],
  }),

  name: "AddBatch",
  updated: function () {},
  props: {
    leave: {
      type: Array,
      default: [],
    },
    leaveInfo:{
        type: Array,
      default: [], 
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    datePickComponent,
    FileUpload,
  },
  computed: {},
  methods: {
    openModal() {
        
      this.show = true;
      this.GetLeaveTypes();
    },
    async submitCheque() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.EditLeaveRequest();
      }
    },
     async updateLeaveStatus() {
      if (await this.$refs.observer.validate()) {
        this.isLoading = true;
        let payload = {
          id: this.leave.id,
          status: this.selectedStatus,
          comment: this.reason,
        };
        this.$store
          .dispatch("staff/cancelLeaveRequest", payload)
          .then((res) => {
            this.isLoading = false;
            this.$toast.success("Leave status successfully updated");
            this.GetleaveRequestInformation(this.leave.id);
             this.$emit("conform", "");
            this.showEditCheque = true;
          })
          .catch((err) => {
            this.selectedStatus = this.cheque.status;
            this.$toast.error("Leave status updated failed");
            this.isLoading = false;
          });
      }
    },
     cancelEditChequeStatus() {
      this.showEditCheque = true;
      this.selectedStatus = this.leave.status;
    },
      setShowReason() {
      if (
        this.selectedStatus == "Cancelled" ||
        this.selectedStatus == "Bounced"
      ) {
        this.showReason = true;
      } else {
        this.showReason = false;
      }
    },
 GetleaveRequestInformation(id)
    {
      
       this.$store
        .dispatch(`staff/GetLeaveRequestSingle`,id)
        .then((res) => {
         this.leave=res;
        })
        .catch((err) => {
          this.isLoading = false;
         
        });  
    },
    editChequeStatus() {
      this.showEditCheque = false;
    },
  

    onClose()
    {
      this.show = false;
      this.cheque=new Cheque()
    }
  },
  created() {
  },
};
</script>
<style scoped>
.sideColumn{
    color: rgb(239 7 43);
    background-color: rgb(250 253 253);
}
.leaveAlloc
{
       color:navy;
}
.submitBut{
    margin-top: 102px !important;
    margin-right:4px;
}
</style>

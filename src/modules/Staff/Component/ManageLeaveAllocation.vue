<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="880px">
      <custom-modal
        @onSubmit="submitCheque"
        @onClose="onClose()"
        :isLoading="isLoading"
      >
        {{ StaffId }}
        <v-row align="center" class="spacer" no-gutters>
          <v-col cols="4" sm="2" md="1">
            <v-avatar color="#DC143C">
              <span class="white--text headline">{{
                staff.first_name.charAt(0)
              }}</span>
            </v-avatar>
          </v-col>
          <v-col class="hidden-xs-only" sm="5" md="3">
            <strong v-html="staff.first_name"></strong> <span></span>
            <strong v-html="staff.last_name"></strong>
          </v-col>

          <v-col class="text-no-wrap" cols="5" sm="3">
            <strong>Joined Date : </strong>
            <span></span>
            <v-chip
              v-if="staff.joined_at"
              color="`#DC143C lighten-4`"
              class="ml-0 mr-2 black--text"
              label
              small
            >
              {{ staff.joined_at | formatDate }}
            </v-chip>
          </v-col>
        </v-row>
        <ValidationObserver ref="observer" v-slot="{ validate, reset }">
          <v-row
            v-for="(leaveAllocation, index) in SelectedLeaveAllocations"
            :key="index"
            class="mt-5"
          >
            <v-col cols="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="Type"
                rules="required"
              >
                <v-select
                  outlined
                  dense
                  item-text="name"
                  item-value="id"
                  v-model="leaveAllocation.leave_type_id"
                  :items="leaveTypes"
                  :error-messages="errors"
                  label=" Leave Type"
                  disabled
                />
              </ValidationProvider>
            </v-col>
            <v-col cols="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="Type"
                rules="required"
              >
                <v-text-field
                  outlined
                  dense
                  item-text="name"
                  item-value="id"
                  v-model="leaveAllocation.total"
                  :error-messages="errors"
                  label="Allocated Total"
                />
              </ValidationProvider>
            </v-col>
          </v-row>
        </ValidationObserver>
      </custom-modal>
    </v-dialog>
  </v-row>
</template>

<script>
import { Payment } from "../../../models/EntityModels/LeaveRequest";
import datePickComponent from "@/components/base/DateComponent";
import FileUpload from "@/components/base/FileUpload";
import { required, numeric } from "vee-validate/dist/rules";

import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import Cheque from "../../../models/EntityModels/LeaveRequest";
import ServerErrorsVue from "../../shared/components/ServerErrors.vue";
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
    leave: Object(),
    leaveTypes: [],
    SelectedLeaveAllocations: [],
    leaveInfo: Object(),
    LeaveAllocations: [],
    cheque: new Object(),
    dialog: false,
    show: false,
    selectedFiles: [],
    errors: [],
    chequeTypes: [
      { id: "Cash", name: "Cash" },
      { id: "Cross", name: "Cross" },
    ],
  }),

  name: "AddBatch",
  updated: function() {},
  props: {
    staff: {
      type: Object,
      default: [],
    },
    StaffId: {
      type: Number,
      default: null,
    },
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
      // this.GetLeaveTypes();
      // this.GetAllocatedLeaves();

      this.show = true;
    },
    async submitCheque() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.createLeaveRequest();
      }
    },
    SelectLeaveTypes() {
      this.SelectedLeaveAllocations = [];
      this.LeaveAllocations.map((p) => {
        let allocated = new Object();
        allocated.leave_type_id = p;
        allocated.total = 0;
        this.SelectedLeaveAllocations.push(allocated);
      });
    },

    createLeaveRequest() {
      let credentials = new Object();
      credentials.id = this.staff.id;
      let allocatedLeaves = [];
      this.SelectedLeaveAllocations.map((p) => {
        let allocation = new Object();
        allocation.leave_type_id = p.leave_type_id;
        allocation.total = p.total;
        allocatedLeaves.push(allocation);
      });
      credentials.data = allocatedLeaves;
      this.$store
        .dispatch(`staff/LeaveBalance`, credentials)
        .then((res) => {
          this.$toast.success("Leave Allocated successfully");
          this.$emit("afterSave");
          this.show = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$toast.error("Leave alocation  failed");
          this.show = false;
        });
    },
    GetLeaveTypes() {
      this.$store
        .dispatch(`staff/GetLeaveType`)
        .then((res) => {
          this.leaveTypes = res;
        })
        .catch((err) => {
          this.isLoading = false;
        });
    },
    GetAllocatedLeaves() {
      this.$store
        .dispatch(`staff/GetAllocatedLeaveTypes`, this.StaffId)
        .then((res) => {
          res.map((p) => {
            this.LeaveAllocations.push(p.leave_type_id);
          });
          this.SelectedLeaveAllocations = res;
        })
        .catch((err) => {
          this.isLoading = false;
        });
    },
    onClose() {
      this.show = false;
      this.cheque = new Cheque();
      this.$emit("afterSave");
    },
  },
  created() {},
};
</script>
<style scoped>
.sideColumn {
  color: rgb(239 7 43);
  background-color: rgb(250 253 253);
}
.leaveAlloc {
  color: navy;
}
.submitBut {
  margin-top: 102px !important;
  margin-right: 4px;
}
</style>

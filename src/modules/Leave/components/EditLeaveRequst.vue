<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="880px">
      <custom-modal
        title="Edit Leave Request"
        @onSubmit="submitCheque"
        @onClose="onClose()"
        :isLoading="isLoading"
      >
        <ValidationObserver ref="observer" v-slot="{ validate, reset }">
            <v-row>
            <v-col cols="7">
                   <v-row>
            <v-col cols="8">
              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                name="Date"
              >
                <datePickComponent    @input="GetleaveConformation()" labelname="Start Date" v-model="leave.from_date" />
              </ValidationProvider>
            </v-col>
              <v-col cols="4">
                  <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                name="TotalDays"
              >
               <v-text-field
                  v-model="leave.number_of_days"
                   :error-messages="MaxError"
                  label="no of days"
                   type="number"
                   :max="maxAllocate"
                  @input="GetleaveConformation()"
                  dense
                  outlined
                ></v-text-field>
                  </ValidationProvider>
            </v-col>

            <v-col cols="8">
              <ValidationProvider
                v-slot="{ errors }"
                name="Type"
                rules="required"
              >
                <v-select
                  outlined
                  dense
                  item-text="name"
                  @input="GetLeaveAllocation()"
                  item-value="id"
                  v-model="leave.leave_type_id"
                  :items="leaveTypes"
                  :error-messages="errors"
                  label=" Leave Type"
                />
              </ValidationProvider>
            </v-col>
                 
          </v-row>

         <v-row>

            <v-col cols="12">
              <v-textarea
                rows="4"
                outlined
                v-model="leave.reason"
                label="Include coments for your approver"
              ></v-textarea>
            </v-col>
         </v-row>
            </v-col>
              <v-col cols="5">
                  <div class="sideColumn" >

                          <v-row   v-for="(item, index) in selectedLeaveAllocation" :key="index" >
                              <v-col cols="6">
                             {{item.leaveType.name}} :
                          </v-col>
                            <v-col cols="6">
                            {{item.available}}
                          </v-col>
                         </v-row>
                           <div class="leaveAlloc" v-if="leaveInfo.first_day_of_leave">
                         <v-row>
                              <v-col cols="8">
                             First day of leave
                          </v-col>
                           <v-col cols="4">
                               {{leaveInfo.first_day_of_leave|formatDate}}
                          </v-col>
                         </v-row>
                         <v-row>
                              <v-col cols="8">
                              Last day of leave
                          </v-col>
                           <v-col cols="4">
                                   {{leaveInfo.last_day_of_leave|formatDate}}
                          </v-col>
                         </v-row>
                         <v-row>
                              <v-col cols="8">
                            First working day after leave
                          </v-col>
                           <v-col cols="4">
                               {{leaveInfo.first_working_day_after_leave|formatDate}}
                          </v-col>
                         </v-row>
                         <v-row>
                              <v-col cols="8">
                            Last working day before before leave
                          </v-col>
                           <v-col cols="4">
                               {{leaveInfo.last_working_day_before_leave|formatDate}}
                          </v-col>
                         </v-row>
                     </div>
                      <div class="submitBut">
                         <!-- <v-btn
                            rounded
                            color="primary"
                            dark
                            >
                             Send Request
                            </v-btn> -->
                  </div>
                  </div>
            </v-col>
            </v-row>
        </ValidationObserver>
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
    cheque: new Object(),
    dialog: false,
       maxAllocate:0,
      MaxError:[],
  selectedLeaveAllocation:[],
    show: false,
    selectedFiles: [],
    errors: [],
    chequeTypes: [
      { id: "Cash", name: "Cash" },
      { id: "Cross", name: "Cross" },
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
    if (isValid && (this.leave.number_of_days<=this.maxAllocate)){
        this.EditLeaveRequest();
      }
    },
     GetLeaveAllocation()
    {
;
let alloc=this.selectedLeaveAllocation.find(d=>d.leaveType.id==this.leave.leave_type_id);
if(alloc)
{
  this.maxAllocate=alloc.available;
  
}
else{
   this.maxAllocate=0;
}
this.GetleaveConformation()
    },
    GetleaveConformation()
    {
        let info=new Object();
        info.start_date=this.leave.from_date;
        info.no_of_days=this.leave.number_of_days;
        info.leave_type_id=this.leave.leave_type_id;
       this.$store
        .dispatch(`staff/GetLeaveRequestInformation`,info)
        .then((res) => {
         this.leaveInfo=res;
        })
        .catch((err) => {
          this.isLoading = false;
         
        });  
         if(this.leave.leave_type_id)
        {
          if(this.leave.number_of_days>this.maxAllocate)
          {
            this.MaxError.push(`your available leave is ${this.maxAllocate }`)
          }
          else{
            this.MaxError=[];
          }
        }
        else{
           this.MaxError=[];
        }
    },
    EditLeaveRequest() {
      let leaveRequest=new Object();
       leaveRequest.leave_type_id=this.leave.leave_type_id;
       leaveRequest.reason=this.leave.reason;
       leaveRequest.from_date=this.leave.from_date;
       leaveRequest.number_of_days=this.leave.number_of_days;
      leaveRequest.first_day_of_leave=this.leaveInfo.first_day_of_leave
      leaveRequest.last_day_of_leave=this.leaveInfo.last_day_of_leave
      leaveRequest.last_working_day_before_leave=this.leaveInfo.last_working_day_before_leave
      leaveRequest.first_working_day_after_leave=this.leaveInfo.first_working_day_after_leave
      let credentials=new Object();
      credentials.id=this.leave.id;
      credentials.data=leaveRequest;
      this.$store
        .dispatch(`staff/EditLeaveRequest`,credentials)
        .then((res) => {
          this.$toast.success("Leave Request Sent  successfully");
          this.$emit("conform", "");
          this.show = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$toast.error("Leave Request edit  failed");
          this.show = false;
        });
    },
      GetLeaveTypes() {
      this.$store
        .dispatch(`staff/GetLeaveType`)
        .then((res) => {
            
          this.leaveTypes=res;
         
        })
        .catch((err) => {
          this.isLoading = false;
        });
         this.$store
        .dispatch(`staff/UserLeaveAllocation`)
        .then((res) => {
         this.selectedLeaveAllocation=res;
        })
        .catch((err) => {
          this.isLoading = false;
         });  
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

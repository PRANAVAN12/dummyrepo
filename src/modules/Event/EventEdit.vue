<template>
  <v-row justify="center">
    <v-dialog
      style="border-radius: 5px"
      v-model="show"
      persistent
      max-width="600px"
    >
      <custom-modal
        title="Edit Event"
        @onSubmit="SaveEvent"
        @onClose="close"
        :isLoading="isLoading"
      >
        <ValidationObserver ref="observer" v-slot="{ validate, reset }">
          <v-row>
            
            <v-col cols="4">
              <ValidationProvider
                v-slot="{ errors }"
                name="Title"
                rules="required"
              >
                <v-text-field
                  v-model="event.title"
                  :error-messages="errors"
                  label="Title"
                  dense
                  outlined
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="4"></v-col>
            <v-col cols="4">
              <ValidationProvider
                v-slot="{ errors }"
                name="All Day"
                rules="required"
              >
                <v-switch
                  v-model="event.all_day"
                  flat
                  label="All Day"
                  :error-messages="errors"
                ></v-switch>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row v-if="event.all_day">
            <v-col cols="6">
              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                name="StartDate"
              >
                <datePickComponent
                  labelname="Start Date"
                  v-model="event.start"
                  :error-messages="errors"
                />
              </ValidationProvider>
            </v-col>
            <v-col cols="6">
              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                name="EndDate"
              >
                <datePickComponent
                  labelname="End Date"
                  v-model="event.end"
                  :error-messages="errors"
                />
              </ValidationProvider>
            </v-col>
          </v-row>

          <v-row v-if="!event.all_day">
            <v-col cols="6">
              <DatetimePicker
                v-model="event.start"
                :text-field-props="textFieldProps"
                :date-picker-props="dateProps"
                :time-picker-props="timeProps"
              />
            </v-col>
            <v-col cols="6">
              <DatetimePicker
                v-model="event.end"
                :text-field-props="textFieldProps"
                :date-picker-props="dateProps"
                :time-picker-props="timeProps"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <ValidationProvider
                v-slot="{ errors }"
                name="Repeat"
                rules="required"
              >
                <v-select
                  outlined
                  dense
                  item-text="name"
                  item-value="id"
                  v-model="event.repeat"
                  :items="repeats"
                  :error-messages="errors"
                  label="Repeat"
                />
              </ValidationProvider>
            </v-col>
            <v-col cols="4">
              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                name="Repeat Date"
              >
                <datePickComponent
                  labelname="Repeat Date"
                  v-model="event.repeat_end"
                  :error-messages="errors"
                />
              </ValidationProvider>
            </v-col>
            <v-col cols="4">
              <ValidationProvider
                v-slot="{ errors }"
                name="Visibility"
                rules="required"
              >
                <v-select
                  outlined
                  dense
                  item-text="name"
                  item-value="id"
                  v-model="event.visibility"
                  :items="visibilitys"
                  :error-messages="errors"
                  label="Visibility"
                />
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="Event Type"
                rules="required"
              >
                <v-select
                  outlined
                  dense
                  item-text="name"
                  item-value="id"
                  v-model="event.event_type_id"
                  :items="eventTypes"
                  :error-messages="errors"
                  label="Event Type"
                />
              </ValidationProvider>
            </v-col>
            <v-col cols="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="Staffs"
                rules="required"
              >
                <v-select
                  outlined
                  dense
                  item-text="last_name"
                  item-value="id"
                  v-model="event.staffs"
                  :items="staffs"
                  :error-messages="errors"
                  label="Staffs"
                  multiple
                  chips
                />
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <ValidationProvider
                v-slot="{ errors }"
                name="Description"
                rules="required"
              >
                <v-textarea
                  rows="3"
                  outlined
                  v-model="event.description"
                  label="Description"
                  :error-messages="errors"
                ></v-textarea>
              </ValidationProvider>
            </v-col>
            <!-- <v-col>
              <DatetimePicker
               v-model="datetime"
                  :text-field-props="textFieldProps"
                  :date-picker-props="dateProps"
                  :time-picker-props="timeProps"
                  time-format="HH:mm:ss"
                  />
            </v-col> -->
          </v-row>
        </ValidationObserver>
      </custom-modal>
    </v-dialog>
  </v-row>
</template>
<script>
import datePickComponent from "@/components/base/DateComponent";
import DatetimePicker from "@/components/base/DatetimePicker";
import { Event } from "../../models/Event";
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
    nullDatetime: null,
    datetime: new Date(),
    datetimeString: "2019-01-01 12:00",
    formattedDatetime: "09/01/2019 12:00",
    textFieldProps: {
      appendIcon: "event",
    },
    dateProps: {
      headerColor: "blue",
    },
    timeProps: {
      useSeconds: true,
      ampmInTitle: true,
    },
     errors: [],
    repeats: [
      { id: "Never", name: "Never" },
      { id: "Every Day", name: "Every Day" },
      { id: "Every Week", name: "Every Week" },
      { id: "Every Month", name: "Every Month" },
      { id: "Every Year", name: "Every Year" },
      { id: "Custom", name: "Custom" },
    ],
    visibilitys: [
      { id: "Public", name: "Public" },
      { id: "Participants", name: "Participants" },
      { id: "Private", name: "Private" },
    ],
    staffs: [],
    eventTypes: [],
   
    
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
    },

    value: [],
    options: [],
    isLoading: false,
  }),

  name: "Edit Event",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    event: {
      type: Object,
      default: {},
    },
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    CustomModal, datePickComponent,
    DatetimePicker,
  },  created() {
    this.GetUsers();
    this.GetEventsType();
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
        this.createEvent();
      }
    },
  createEvent() {
      this.$store
        .dispatch(`event/EditEvent`,this.event )
        .then((res) => {
          this.isLoading = false;
          this.$toast.success("Event edit successfully");
         this.$emit("afterSave");
          this.show = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$toast.error("Event edited  failed");
          this.show = false;
        });
    },
       GetUsers() {
      this.$store
        .dispatch("staff/GetStaffs")
        .then((res) => {
          this.staffs = res.data.data;
        })
        .catch((err) => {
          this.messages = err.data.title;
        });
    },
    GetEventsType() {
      this.$store
        .dispatch("event/GetEventType")
        .then((res) => {
          this.eventTypes = res;
        })
        .catch((err) => {
          this.messages = err.data.title;
        });
    },
  
  },
};
</script>

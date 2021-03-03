<template>
  <div>
    <PageTitle title="Master Data" />
    <v-container fluid class="lighten-12 ">
      <v-row>
        <v-col cols="12" md="12" class="pa-3">
          <v-card class>
            <v-tabs v-model="tab" background-color="primary" dark>
              <v-tabs-slider></v-tabs-slider>
              <v-tab v-for="item in items" :key="item.tab">
                {{ item.tab }}
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
              <v-tab-item v-for="item in items" :key="item.tab">
                <EmployeeType v-if="item.tab === 'Employee Type'" />
                <DesiginationComponent v-if="item.tab === 'Designation'" />
                <LeavetypeComponent v-if="item.tab === 'Leave Type'" />
                <OfficeComponent v-if="item.tab === 'Office'" />
                <SalutationpeComponent v-if="item.tab === 'Salutations'" />
                <EventTypeComponent v-if="item.tab === 'Event Type'" />
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import EventTypeComponent from "./Event/EventTypeComponent";
import EmployeeType from "./EmployeeType/EmployeeTypeComponent";
import OfficeComponent from "./Office/OfficeComponent";
import DesiginationComponent from "./Designation/DesiginationComponent";
import LeavetypeComponent from "./Leave/LeaveTypeComponent";
import SalutationpeComponent from "./Saluation/SalutationComponent";
export default {
  data() {
    return {
      items: [
        { tab: "Employee Type", content: "this is credit tab" },
        { tab: "Designation", content: "" },
        // { tab: "Leave Type", content: "" },
        { tab: "Office", content: "" },
        { tab: "Salutations", content: "" },
        { tab: "Event Type", content: "" },
      ],
      tab: "Credit",
    };
  },
  components: {
    EmployeeType,
    DesiginationComponent,
    LeavetypeComponent,
    OfficeComponent,
    SalutationpeComponent,
    EventTypeComponent,
  },
};
</script>

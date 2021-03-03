<template>
  <div>
    <PageTitle title="Units" />
    <v-container fluid class="lighten-12 content">
      <ValidationObserver ref="observer" v-slot="{ validate, reset }">
        <v-card class="lighten-12 card-content mb-2">
          <v-row class="ma-0 align-right">
            <TableFilters
              :filters="['status', 'search']"
              v-model="filter"
              :columns="columns"
            ></TableFilters>
            <ImportExportMenu :permission="'Unit Report'"></ImportExportMenu>
          </v-row>
        </v-card>

        <LoadingComponent
          v-if="isLoading"
          :visible="isLoading"
        ></LoadingComponent>
        <v-card class="lighten-12 mt-2">
          <v-container fluid class="light gray lighten-12">
            <v-row>
              <v-card-text class="pa-0">
                <v-data-table
                  :items-per-page="paginationOptions.perPage"
                  :fixed-header="true"
                  :headers="headers"
                  :items="units"
                  item-key="id"
                  hide-default-footer
                >
                  <template v-slot:no-data>
                    <img
                      style="height: 200px"
                      src="../../../../../assets/img/no-result.jpg"
                    />
                  </template>
                  <!-- No -->
                  <template v-slot:item.no>
                    <v-icon>mdi-vuetify</v-icon>
                  </template>
                  <!-- Name -->
                  <template v-slot:item.name="{ item }"
                    ><ValidationProvider
                      v-slot="{ errors }"
                      name="Name"
                      vid="name"
                      v-if="item.id == editUnitId"
                    >
                      <v-text-field
                        v-model="newUnit.name"
                        :error-messages="errors"
                        :value="item.name"
                        outlined
                        class="pt-3"
                      ></v-text-field>
                    </ValidationProvider>
                    <p v-else>{{ item.name }}</p>
                  </template>

                  <!-- Name -->
                  <template v-slot:item.sortform="{ item }">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Shortname"
                      v-if="item.id == editUnitId"
                      vid="sortform"
                      rules="required"
                    >
                      <v-text-field
                        :error-messages="errors"
                        v-model="newUnit.sortform"
                        :value="item.sortform"
                        outlined
                        class="pt-3"
                      ></v-text-field>
                    </ValidationProvider>
                    <p v-else>{{ item.sortform }}</p>
                  </template>

                  <!-- Status -->
                  <template v-slot:item.status="{ item }" :slot-scope="props">
                    <toggle-button
                      v-model="newUnit.is_active"
                      v-if="editUnitId == item.id"
                      :disabled="editUnitId != item.id"
                      :value="item.is_active"
                      :width="80"
                      :labels="{ checked: 'Active', unchecked: 'Archeived' }"
                    ></toggle-button>
                    <v-chip
                      v-else
                      :x-small="true"
                      class="ma-2"
                      label
                      text-color="white"
                      :color="getStatusColor(item.is_active)"
                      dark
                      >{{ item.is_active ? "Active" : "Archived" }}</v-chip
                    >
                  </template>

                  <!-- Action -->
                  <template v-slot:item.action="{ item }">
                    <v-menu offset-y transition="scroll-y-transition">
                      <template v-slot:activator="{ attrs, on }">
                        <v-icon
                          v-show="editUnitId != item.id"
                          v-bind="attrs"
                          v-on="on"
                          >mdi-dots-vertical</v-icon
                        >
                        <v-btn
                          v-show="editUnitId == item.id"
                          color="secondary"
                          fab
                          x-small
                          dark
                          class="ma-1"
                        >
                          <v-icon depressed small link @click="CancelUnit(item)"
                            >clear</v-icon
                          ></v-btn
                        >
                        <v-btn
                          v-show="editUnitId == item.id"
                          color="green"
                          fab
                          x-small
                          dark
                          ><v-icon link @click="UpdateUnit(item)"
                            >done</v-icon
                          ></v-btn
                        >

                        <!-- {{editUnitId==item.id}} -->
                      </template>

                      <v-list class="actions">
                        <permission-control permissionName="Unit Edit">
                          <v-list-item link @click="EditUnit(item)">
                            <span>
                              <v-icon v-bind="attrs" v-on="on"
                                >mdi-pencil-box-outline</v-icon
                              >Edit
                            </span>
                          </v-list-item>
                        </permission-control>
                        <permission-control permissionName="Unit Soft Delete">
                          <v-list-item link @click="openConfirmation(item)">
                            <span>
                              <v-icon v-bind="attrs" v-on="on">
                                {{
                                  item.is_active
                                    ? "mdi-archive"
                                    : "mdi-checkbox-marked-circle"
                                }}
                              </v-icon>
                              {{ item.is_active ? "Archieve" : "Active" }}
                            </span>
                          </v-list-item>
                        </permission-control>
                      </v-list>
                    </v-menu>
                  </template>
                  <template v-slot:footer>
                    <pagination
                      @paginationOptions="setPaginationOptions"
                      @response="setResponseData"
                      url="units"
                      :filter="filter"
                      ref="pagination"
                    >
                    </pagination>
                  </template>
                  <template slot="body.append">
                    <tr class="" v-if="editUnitId == null">
                      <th>
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="name"
                          vid="name"
                          rules="required"
                        >
                          <v-col cols="12" class="pl-0">
                            <v-text-field
                              :error-messages="errors"
                              required
                              dense
                              label="Name"
                              v-model="newUnit.name"
                              outlined
                            ></v-text-field>
                          </v-col>
                        </ValidationProvider>
                      </th>
                      <th>
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Shortname"
                          vid="sortform"
                          rules="required"
                        >
                          <v-col cols="12" class="pl-0">
                            <v-text-field
                              :error-messages="errors"
                              required
                              dense
                              label="Shortname"
                              v-model="newUnit.sortform"
                              outlined
                            ></v-text-field>
                          </v-col>
                        </ValidationProvider>
                      </th>
                      <th></th>

                      <th class="title">
                        <v-col cols="4">
                          <permission-control permissionName="Unit Create">
                            <v-btn
                              @click="SaveUnit()"
                              depressed
                              small
                              class="text-white btn_blue btn_medium w-100"
                              >Create</v-btn
                            >
                          </permission-control>
                        </v-col>
                      </th>
                    </tr>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-row>
          </v-container>
        </v-card>
      </ValidationObserver>
      <!-- </v-card> -->
      <div class="d-flex justify-center align-center"></div>
    </v-container>
  </div>
</template>
<script>
import TableFilters from "@/components/base/TableFilters";

import { required, email, max, regex } from "vee-validate/dist/rules";
import { mapState } from "vuex";
import pagination from "../../../components/pagination";
import confirmation from "../../../components/confirmation";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
setInteractionMode("eager");

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
extend("regex", {
  ...regex,
  message: "The value is not a valid phone number",
});
export default {
  components: {
    pagination,
    ValidationProvider,
    TableFilters,
    ValidationObserver,
  },
  data() {
    return {
      paginationOptions: {},
      isLoading: false,
      pagination1: {
        descending: true,
        page: 1,
        rowsPerPage: 2,
        sortBy: "fat",
        totalItems: 0,
        unitErrors: null,
        rowsPerPageItems: [1, 2, 4, 8, 16],
      },
      units: [],
      pagination: {
        page: 1,
        itemsPerPage: 2,
      },
      page: 1,
      status: [
        { text: "Active", value: "active" },
        { text: "Archived", value: "archived" },
      ],
      columns: [
        {
          text: "Name",
          value: "name",
          show: true,
          disabled: false,
          width: "35%",
          align: "left",
        },
        {
          text: "Shortname",
          value: "sortform",
          show: true,
          disabled: false,
          width: "35%",
          align: "left",
        },
        {
          text: "Status",
          value: "status",
          show: true,
          disabled: false,
          align: "center",
          width: "15%",
        },
        {
          text: "Actions",
          value: "action",
          show: true,
          disabled: false,
          align: "center",
          width: "15%",
        },
      ],
      newUnit: { name: "", id: "", sortform: "", is_active: "" },
      filter: {
        sortform: "",
        name: "",
        search: "",
        status: "",
      },

      // For edit purpose
      editUnitId: null,
    };
  },
  methods: {
    setPaginationOptions(data) {
      this.paginationOptions = data;
    },
    clearFilter() {
      this.filter = {};
    },
    refreshData() {
      this.$refs.pagination.refreshData();
    },
    setResponseData(unit) {
      this.units = unit;
    },

    CancelUnit(item) {
      this.refreshData();
      this.editUnitId = null;
      this.newUnit = {};
    },
    SaveUnit() {
      const isValid = this.$refs.observer.validate();
      if (isValid) {
        this.isLoading = true;
        this.CreateUnit();
      }
    },

    CreateUnit() {
      debugger;
      let Unitname = this.newUnit;
      this.$store
        .dispatch("Unit/CreateUnit", Unitname)
        .then((res) => {
          //this.succeeed = true;

          this.$toast.success("Unit created  succesfully");
          this.refreshData();
          this.$refs.observer.reset();
          this.isLoading = false;
          this.newUnit = {};
        })
        .catch((err) => {
          this.$refs.observer.setErrors(err.data.error);
          this.$toast.error("Unit created  failed");
          this.messages = err.data.title;
          this.isLoading = false;
        });
    },

    UpdateUnit(data) {
      debugger;
      let unit = _.cloneDeep(data);
      this.$store
        .dispatch("Unit/EditUnit", unit)
        .then((res) => {
          //
          //   this.newUnit =[]

          this.editUnitId = null;
          this.newUnit = {};
          this.$toast.success("Unit edited  successfully");
          this.$refs.observer.reset();
          this.refreshData();
        })
        .catch((err) => {
          debugger;
          this.$refs.observer.setErrors(err.data.error);
          this.unitErrors = err.data.error.name;
          this.messages = err.data.title;
          this.$toast.error("Unit edited failed");
        });
    },

    EditUnit(data) {
      debugger;
      this.newUnit = data;
      this.editUnitId = data.id;
    },
    getStatusColor(is_active) {
      return is_active ? "green" : "gray";
    },
    openConfirmation(Unit) {
      confirmation.dialog = true;
      this.$confirm(
        "Do you want to " +
          (Unit.is_active ? "Archive " : "Active ") +
          Unit.name +
          " ?"
      ).then((res) => {
        if (res) {
          this.$store
            .dispatch("Unit/ActiveOrArchiveUnits", Unit.id)
            .then((res) => {
              this.refreshData();
              const msg = Unit.is_active ? "archived" : "activated";
              this.$toast.success("Successfully  " + msg);
            })
            .catch((err) => {
              this.$toast.error("Unit is not Archived");
            });
        } else {
        }
      });
    },
  },
  computed: {
    headers: function () {
      return this.columns.filter((item) => item.show == true);
    },
  },
  created() {
    this.GetUnits();
    this.refreshData();
  },
};
</script>

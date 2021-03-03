<template>
  <div>
    <PageTitle
      title="Roles"
      :btnCreate="true"
      :createRoute="'/role/create'"
      :permission="'Role Create'"
    />
    <v-container fluid class="lighten-12 container">
      <v-card class="lighten-12 card-content">
        <TableFilters
          :filters="['status', 'search']"
          v-model="filter"
          :columns="columns"
        ></TableFilters>
      </v-card>

      <v-card class="lighten-12 mt-2">
        <v-container fluid class="light gray lighten-12">
          <v-row>
            <v-card-text class="pa-0">
              <v-data-table
                :items-per-page="paginationOptions.perPage"
                :fixed-header="true"
                :headers="headers"
                :items="roles"
                :filter="filter"
                hide-default-footer
                item-key="name"
                @click:row="$router.push(`role/${$event.id}`)"
                class="row-pointer"
              >
                <template v-slot:no-data>
                  <img
                    style="height: 200px"
                    src="../../assets/img/no-result.jpg"
                  />
                </template>
                <template v-slot:footer="{}">
                  <paginationComponent
                    @paginationOptions="setPaginationOptions"
                    url="roles"
                    :filter="filter"
                    ref="pagination"
                    @response="receiveRole"
                  />
                </template>
                <!-- Action -->

                <template v-slot:item.action="{ item }">
                  <list-menu
                    feature="role"
                    :item="item"
                    viewPermission="Role Show"
                    editPermission="Role Edit"
                    softDeletePermission="Role Soft Delete"
                    @refreshList="refreshData"
                  ></list-menu>
                </template>

                <!-- Status -->
                <template v-slot:item.is_active="{ item }">
                  <v-chip
                    :x-small="true"
                    class="ma-2"
                    label
                    text-color="white"
                    :color="getStatusColor(item.is_active)"
                    dark
                    >{{ item.is_active ? "Active" : "Archieved" }}</v-chip
                  >
                </template>
              </v-data-table>
            </v-card-text>
          </v-row>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import TableFilters from "@/components/base/TableFilters";
import paginationComponent from "../shared/components/pagination.vue";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import { Role } from "../../models/Role";
import confirmation from "../shared/components/confirmation";
export default {
  data: () => ({
    paginationOptions: {},
    roles: [],
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
        text: "Description",
        value: "description",
        show: true,
        disabled: false,
        width: "35%",
        align: "left",
      },
      {
        text: "Status",
        value: "is_active",
        show: true,
        disabled: false,
        width: "15%",
        align: "center",
      },
      {
        text: "Actions",
        value: "action",
        show: true,
        disabled: false,
        width: "15%",
        align: "center",
      },
    ],
    status: [
      { text: "Active", value: "active" },
      { text: "Archived", value: "archived" },
    ],
    filter: {
      search: "",
      status: "",
    },
  }),

  props: {},
  components: {
    ValidationProvider,
    ValidationObserver,
    paginationComponent,
    TableFilters,
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
    saveBatch() {
      this.$store
        .dispatch("user/GetRoles")
        .then((res) => {
          this.roles = res.data.data.map((u, i, arr) => {
            u.index = i + 1;
            return new Role().initialise(u);
          });
        })
        .catch((err) => {
          this.messages.push(err.data.title);
        });
    },
    receiveRole(roledata) {
      this.roles = roledata;
    },
    getStatusColor(status) {
      return status == true ? "green" : "gray";
    },
  },
  computed: {
    headers: function () {
      return this.columns.filter((item) => item.show == true);
    },
  },
  created() {
    this.saveBatch();
  },
};
</script>

<template>
  <div>
    <PageTitle
      title="View Role"
      :backBtn="true"
      :editRoute="'role/edit/' + this.$route.params.id"
    />
    <v-container fluid class="lighten-12 container">
      <v-row>
        <v-col>
          <v-card>
            <v-card-title> General</v-card-title>
            <v-container fluid>
              <v-row>
                <v-col cols="6" sm="6" md="3" lg="6"> <h4>Name </h4></v-col>
                <v-col cols="6" sm="6" md="9" lg="6"
                  ><v-chip label>
                    {{ role.name }}
                  </v-chip></v-col
                >
              </v-row>
              <v-row>
                <v-col cols="6" sm="6" md="3" lg="6">
                  <h4>Description </h4></v-col
                >
                <v-col cols="6" sm="6" md="9" lg="6">
                  <v-chip label>
                    {{ role.description }}
                  </v-chip>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card >
              <v-card-title >Permissions </v-card-title>
              <v-container fluid class="light gray lighten-12 pa-0">
          
          
              <v-simple-table >
                <template v-slot:default>
                  <v-expansion-panels class="permission pa-2">
                    <v-expansion-panel
                      v-for="(items, index) in policies"
                      :key="index"
                    >
                      <v-expansion-panel-header >{{
                        index
                      }}</v-expansion-panel-header>
                      <v-expansion-panel-content >
                        <v-row>
                          <v-col cols="12" class="mt-0 mb-5 permssion-checkbox">
                            <tr
                              v-for="(item, key) in groupByModel(items)"
                              :key="key"
                            >
                              <p class="mr-6 permssion-checkbox">{{ key }}</p>
                              <td v-for="(i, k) in item" :key="k" class="mr-10">
                                <v-checkbox
                                  color="#002db3"
                                  v-model="role.policies"
                                  @change="
                                    checkAllChange(item, role.policies, key)
                                  "
                                  :value="i.id"
                                  :label="i.action"
                                  class="mr-12 mt-3"
                                ></v-checkbox>
                              </td>

                              <v-checkbox
                                color="#002db3"
                                v-model="checkSingleGroupData"
                                @change="checkSingleGroupPolicies(item, key)"
                                :value="key"
                                label="Check All"
                              ></v-checkbox>
                            </tr>
                          </v-col>
                        </v-row>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </template>
              </v-simple-table>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="content-flex-end">
          <v-btn
            depressed
            small
            class="text-white btn_medium"
            to="/role"
            @click.stop="show = false"
            >Close</v-btn
          >
          <v-btn
            depressed
            small
            class="text-white btn_blue btn_medium w-100"
            @click="updateRole()"
            >Update</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { required, email, max } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

import { Role } from "../../models/Role";
import _ from "lodash";

extend("required", {
  ...required,
  message: "{_field_} is required",
});
export default {
  data: () => ({
    //roles: [],
    role: new Role(),
    errors: [],
    messages: [],
    roleHeaders: [
      { text: "Name", value: "name" },
      { text: "Description", value: "description" },
    ],
    policies: [],
    selected: [],
    checkAllGroupData: "",
    checkSingleGroupData: [],
  }),

  props: {},
  components: { ValidationProvider, ValidationObserver },

  methods: {
    loadRoledetails() {
      let id = this.$route.params.id;
      let self = this;
      this.$store.dispatch("user/getroleById", id).then((item) => {
        this.role = new Role().initialise(item.data);
        item.data.policies.map((data) => {
          let isValue = this.checkSingleGroupData.includes(data.model);
          if (isValue == false) {
            this.checkSingleGroupData.push(data.model);
          }
        });
      });
    },
    checkAllChange(items, rolePolicies, key) {
      let itemsFiltered = [];
      rolePolicies.map((r) => {
        let item = items.find((p) => p.id == r);
        if (item && item.model == key) {
          itemsFiltered.push(item);
        }
      });
      if (items.length !== itemsFiltered.length) {
        let index = this.checkSingleGroupData.findIndex((p) => p == key);
        if (index != -1) {
          this.checkSingleGroupData.splice(index, 1);
        }
      } else {
        this.checkSingleGroupData.push(key);
      }
    },
    //create new role
    updateRole() {
      this.$store
        .dispatch("user/EditRole", this.role)
        .then((resp) => {
          this.$toast.success("Role updated successfully");
          this.$router.push("/role");
        })
        .catch((error) => console.log(error));
    },
    checkSingleGroupPolicies(items, key) {
      items.map((item) => {
        let isValue = this.role.policies.includes(item.id);
        if (isValue == true) {
          let index = this.role.policies.indexOf(item.id);
          if (index > -1 && !this.checkSingleGroupData.includes(key)) {
            this.role.policies.splice(index, 1);
          }
        } else if (this.checkSingleGroupData.includes(key)) {
          this.role.policies.push(item.id);
        }
      });
    },
    groupByModel(items) {
      return _.groupBy(items, "model");
    },
  },
  created() {
    this.loadRoledetails();
    //this.GetPolicies();
  },
  mounted() {
    this.$store
      .dispatch("user/GetPolicies")
      .then((resp) => {
        this.policies = resp.data;
      })
      .catch((err) => {
        console.log("Role Details Error : " + err);
      });
  },
};
</script>

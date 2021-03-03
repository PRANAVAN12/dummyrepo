<template>
  <div>
    <PageTitle title="Update Role" :backBtn="true" />
    <v-container fluid class="lighten-12 container">
      <v-row>
        <v-col md="12" class="pr-1">
          <v-card class="lighten-12">
            <v-card-title>General</v-card-title>
            <v-container fluid class="light gray lighten-12">
              <ValidationObserver ref="observer">
                <form>
                  <v-row>
                    <template v-if="messages">
                      <v-alert
                        v-for="msg in messages"
                        :key="msg"
                        class="messages"
                        dense
                        outlined
                        type="error"
                        >{{ msg }}</v-alert
                      >
                    </template>
                  </v-row>

                  <v-row>
                    <v-col cols="4" sm="12" md="4" lg="4">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="Name"
                        rules="required" vid="name"
                      >
                        <v-text-field
                          outlined
                          v-model="role.name"
                          :error-messages="errors"
                          dense
                          label="Name"
                        ></v-text-field>
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
                          outlined
                          v-model="role.description"
                          :error-messages="errors"
                          dense
                          label="Description"
                          rows="2"
                        ></v-textarea>
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                </form>
              </ValidationObserver>
            </v-container>
          </v-card>
        </v-col>
        <v-col md="12" class="pr-1">
          <v-card class="lighten-12">
            <v-card-title>Permissions</v-card-title>
            <v-container fluid class="light gray lighten-12">
              <form>
                <v-simple-table>
                  <template v-slot:default>
                    <v-expansion-panels>
                      <v-expansion-panel
                        v-for="(items, index) in policies"
                        :key="index"
                      >
                        <v-expansion-panel-header class="pl-2">{{
                          index
                        }}</v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <v-row>
                            <v-col
                              cols="12"
                              class="mt-0 mb-5 permssion-checkbox"
                            >
                              <tr
                                v-for="(item, key) in groupByModel(items)"
                                :key="key"
                              >
                                <p class="mr-6 permssion-checkbox">{{ key }}</p>
                                <td
                                  v-for="(i, k) in item"
                                  :key="k"
                                  class="mr-10"
                                >
                                  <v-checkbox
                                    color="#002db3"
                                    v-model="role.policies"
                                    :value="i.id"
                                    :label="i.action"
                                    class="mr-12 mt-3"
                                    @change="
                                      CheckedStatusOfAll(
                                        i.model,
                                        i.id,
                                        key,
                                        item
                                      )
                                    "
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
              </form>
            </v-container>
          </v-card>
        </v-col>
        <v-row>
          <v-col class="content-flex-end">
             <btn-cancel></btn-cancel>
            <v-btn
              depressed
              small
              class="text-white btn_blue btn_medium w-100"
              @click="UpdateRoleAndPermision()"
              >Update</v-btn
            >
          </v-col>
        </v-row>
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
    CheckedStatusOfAll(Model, id, index, item) {
      if (!this.role.policies.includes(id)) {
        let index = this.checkSingleGroupData.indexOf(Model);
        this.checkSingleGroupData.splice(index, 1);
        // let removed=policies.splice(index, 1);
        // let a= policies.filter(item=>item.model==Child.model)
      }
      var hadAllValues = true;
      item.forEach((item) => {
        if (!this.role.policies.includes(item.id)) {
          hadAllValues = false;
        }
      });
      if (hadAllValues) {
        this.checkSingleGroupData.push(Model);
      }

      //  
      // let policies=this.policies[Parent]
      // let index = policies.indexOf(Child);
      // let removed=policies.splice(index, 1);
      // let a= policies.filter(item=>item.model==Child.model)
    },
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
    //create new role
    updateRole() {
      this.$store
        .dispatch("user/EditRole", this.role)
        .then((resp) => {
          this.$toast.success("Role updated successfully");
          this.$router.push("/role");
        })
        .catch((error) =>{
          this.$refs.observer.setErrors(error.data.error);
        });
    },

    async UpdateRoleAndPermision() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.updateRole();
      }
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
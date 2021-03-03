<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="600px">
      <custom-modal
        title="Movement"
        @onClose="onClose()"
        :isLoading="isLoading"
        @onSubmit="submitAttendance"
      >
        <v-container fluid>
          <ValidationObserver ref="observer">
            <v-row >
              <v-col v-show="!moment">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Movement"
                  rules="required"
                  ><v-select
                    v-model="attendant.movement_id"
                    item-text="name"
                    item-value="id"
                    dense
                    :items="movements"
                    outlined
                    :error-messages="errors"
                  ></v-select>
                </ValidationProvider>
              </v-col>
               <v-col v-if="moment">
                <!-- <ValidationProvider
                  v-slot="{ errors }"
                  name="Movement"
                  rules="required"
                  ><v-select
                    v-model="attendant.movement_id"
                    item-text="name"
                    item-value="id"
                    dense
                    :items="moment"
                    outlined
                    :error-messages="errors"
                  ></v-select>
                </ValidationProvider> -->
                  {{moment.name}}
              </v-col>
                <!-- <v-col v-if="moment">
              {{moment.name}}
              </v-col> -->
            </v-row>
            <!-- <v-row>
              <v-col v-if="moment">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Movement"
                  rules="required"
                  ><v-select
                    v-model="attendant.movement_id"
                    item-text="name"
                    item-value="id"
                    dense
                    :items="moment"
                    outlined
                    :error-messages="errors"
                  ></v-select>
                </ValidationProvider>
              </v-col>
            </v-row> -->
          </ValidationObserver>
        </v-container>
      </custom-modal>
    </v-dialog>
  </v-row>
</template>
<script>
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "{_field_} is required",
});
export default {
  data: () => ({
    isLoading:false,
    show: false,
    movements: [],
    attendant: {
      movement_id: "",
      movement: "",
    },
  }),
  props: {
    inOutToggle: { type: Boolean, default: false },
    moment:{type:Object,default:{}}
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  methods: {
    async submitAttendance() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.createAttendance();
      }
    },

    createAttendance() {
      this.attendant.movement = this.inOutToggle ? "In" : "Out";
      this.$store
        .dispatch(`staff/CreateAttendance`, this.attendant)
        .then((res) => {
          this.isLoading = false;
          this.$emit("conform", "");
          this.show = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.show = false;
        });
    },
    openModal() {
      this.show = true;
      this.attendant.movement_id=this.moment.id;
    },
    onClose() {
      this.show = false;
       this.$emit("cancels", "");
    },
    GetMovements() {
      debugger
      this.$store
        .dispatch("staff/GetMovements")
        .then((res) => {
          this.movements = res.data;
        })
        .catch((err) => {
          this.messages = err.data.title;
        });
    },
  },
  created() {
    this.GetMovements();
  },
};
</script>
<style scoped>
</style>

<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="400px">
      <custom-modal
        @onSubmit="submit"
        @onClose="show = false"
        :isLoading="isLoading"
      >
        <ValidationObserver ref="observer" v-slot="{ validate, reset }">
          <v-row>
            <v-col cols="12">
              <ValidationProvider
                v-slot="{ errors }"
                name="Status"
                rules="required"
              >
                <v-select
                  v-model="selectedStatus"
                  :items="statuses"
                  :error-messages="errors"
                  item-text="status"
                  item-value="status"
                  outlined
                  dense
                  label="Status"
                  @change="onStatusChange"
                />
              </ValidationProvider>
            </v-col>
            <v-col cols="12">
              <ValidationProvider
                v-slot="{ errors }"
                name="Category Name"
                
              >
                <v-textarea
                  hide-details="auto"
                  outlined
                  dense
                  rows="3"
                  @input="onNoteChange"
                  :error-messages="statusNoteError"
                  v-model="statusNote"
                  label="Status Note"
                 
                ></v-textarea>
              </ValidationProvider>
            </v-col>
          </v-row>
        </ValidationObserver>
      </custom-modal>
    </v-dialog>
  </v-row>
</template>
<script>
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
export default {
  data: () => ({
    dialog: false,
    statusNoteError: [],
  }),

  name: "ChangeStatus",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    statuses: {
      type: Array,
      default: [],
    },
    selectedStatus: {
      type: String,
      default: "",
    },
    statusNote: {
      type: String,
      default: "",
    },
  },
  components: { ValidationProvider, ValidationObserver },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close", this.productcategory);
          this.visible = value;
        }
      },
    },
  },
  methods: {
    onNoteChange(value) {
      if (
        this.statuses.find((s) => s.status == this.selectedStatus)
          .requiredNote &&
        this.statusNote == ""
      ) {
        this.statusNoteError.push("Reason is required");
      } else {
        this.statusNoteError = [];
      }
    },

    onStatusChange(value) {
      if (
        this.statuses.find((s) => s.status == value).requiredNote &&
        this.statusNote == ""
      ) {
        this.statusNoteError.push("Reason is required");
      } else {
        this.selectedStatus=value
      }
    },
    async submit() {
      console.log('asyusutaiudtfuidsgfugsdfgsdiugfuigsdufgsudgfusgdu')
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.$emit("onChangeStatus", {status:this.selectedStatus,status_note:this.statusNote});
      }
    },
  },

  created() {},
};
</script>

<style>
.vue-treeselect__control {
  margin-top: 15px;
  border: 0 0 1 0;
  outline: none;
  border-width: 0 0 2px;
  outline-offset: 0;
}
</style>

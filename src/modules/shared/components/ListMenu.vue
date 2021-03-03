<template>
  <div>
    <v-menu offset-y transition="scroll-x-transition">
      <template v-slot:activator="{ attrs, on }">
        <v-icon v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
      </template>
      <v-list class="actions">
        <permission-control :permissionName="viewPermission">
          <v-list-item dense link @click="onViewClicked(item)">
            <span> <v-icon v-bind="attrs" v-on="on">mdi-eye</v-icon>View </span>
          </v-list-item>
        </permission-control>

       

        <permission-control :permissionName="editPermission">
          <v-list-item dense @click.stop="onEditClicked(item)" link>
            <span>
              <v-icon v-bind="attrs" v-on="on">mdi-pencil-box-outline</v-icon
              >Edit
            </span>
          </v-list-item>
        </permission-control>
        <permission-control :permissionName="softDeletePermission">
          <v-list-item link dense @click="onChangeStatusClicked(item)">
            <span>
              <v-icon v-bind="attrs" v-on="on">
                {{
                  item.is_active ? "mdi-archive" : "mdi-checkbox-marked-circle"
                }}
              </v-icon>
              {{ item.is_active ? "Archive" : "Active" }}
            </span>
          </v-list-item>
        </permission-control>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
import confirmation from "../../shared/components/confirmation.vue";
export default {
  data: () => ({}),
  props: {
    item: {
      type: Object,
      default: "",
    },
    feature: {
      type: String,
      default: "",
    },
    isEditModal: {
      type: Boolean,
      default: false,
    },
    isSubViewModal: {
      type: Boolean,
      default: false,
    },
    viewPermission: {
      type: String,
      default: "",
    },
    editPermission: {
      type: String,
      default: "",
    },
    softDeletePermission: {
      type: String,
      default: "",
    },
  },
  components: {},
  computed: {
    headers: function() {
      return this.columns.filter((item) => item.show == true);
    },
  },
  methods: {
    // onViewClicked() {
    //   this.$router.push(`/${this.feature}/${this.item.id}`);
    // },

    onViewClicked() {
      if (this.isSubViewModal) {
        this.$emit("onSubViewClicked", true);
      } else {
        this.$router.push(`/${this.feature}/${this.item.id}`);
      }
    },
    onEditClicked() {
      if (this.isEditModal) {
        this.$emit("onEditClicked", true);
      } else {
        this.$router.push(`/${this.feature}/edit/${this.item.id}`);
      }
    },
    onChangeStatusClicked(item) {
      this.$confirm(
        "Do you want to " + (item.is_active ? "Archive" : "Activate  ") + "?"
      ).then((res) => {
        if (res) {
          this.archiveOrActive(item);
        }
      });
    },
    async archiveOrActive(item) {
      await this.$store
        .dispatch("common/SoftDelete", { id: item.id, feature: this.feature })
        .then((res) => {
          this.$emit("refreshList", true);
          var msg = item.is_active ? "archived" : "activated";
          this.$toast.success("Successfully  " + msg);
        })
        .catch((err) => {});
    },
  },
  created() {},
  watch: {},
  filters: {
    hasName: function(value) {
      if (has(value, "name")) return value.name;
      else return "-";
    },
  },
};
</script>

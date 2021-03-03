<template>
  <div v-if="server_messages.length != 0" style="width: 100%;">
    <div v-for="(message, index) in arrayMessages" :key="index">
      <v-alert
        dense
        v-if="!dense && (name == message.key || name == null)"
        outlined
        type="error"
        class="custom_icon"
      >
        {{ message.key }} - {{ message.value }}</v-alert
      >
      <div
        v-if="dense && (name == message.key || name == null)"
        class="error_dense"
      >
        {{ message.value }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "Server Messages",
  props: {
    name: {
      type: String,
      default: null,
    },
    dense: Boolean,
  },
  computed: {
    ...mapState(["server_messages"]),
    // ...mapGetters(["getServerMessages"]),
    arrayMessages: function() {
      var messages = [];
      var key;
      var value;
       
      if (this.server_messages.length != 0) {
        for (let x = 0; x < this.server_messages.length; x++) {
          key = Object.keys(this.server_messages[x]);
          value = this.server_messages[x][key[0]];
          messages.push({ key: key[0], value: value });
        }
        return messages;
      } else {
        return [];
      }
    },
  },
  methods: {
    getKey(value) {
      var result = Object.entries(value);

      for (var i = 0; i < result.length; i++) {
        for (var z = 0; z < result[i].length; z++) {
          //   document.write(result[i][z] + " ");
          var data = {
            key: result[i][z],
            value: result[i][z + 1],
          };
          return data;
        }
        // document.write("</br>");
      }
      return;
    },
  },

  created: function() {
    this.$store.dispatch("setErrorMessages", []);
  },
};
</script>
<style>
.custom_icon .v-alert__icon.v-icon {
  background-color: #f9f2f4 !important;
}
.error_dense {
  color: #c7254e;
  padding: 2px 11px;
  background: #f9f2f4;
  font-size: 11px;
  border-radius: 21px;
}
</style>

<template>
  <v-menu
    ref="menu1"
    v-model="menu1"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        readonly
        outlined
        dense
        hide-details="auto"
        v-model="value"
        :label="labelname"
        persistent-hint
        v-on="on"
        clearable
        :disabled="disabled"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="value"
      no-title
      @input="menu1 = false"
      @change="onChange"
      :max="max"
      :min="min"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "date",
  props: {
    labelname: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    min: {
      type: Date,
      default: null,
    },
    max: {
      type: Date,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: null,
    },
  },
  data: (vm) => ({
    date: new Date().toISOString().substr(0, 10),
    // dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
  }),

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },

  methods: {
    onChange(val) {
      // this.$emit('getDateChange',this.date);
      this.$emit("changed");
      this.$emit("input", val);
    },
    getdate() {
      return this.date;
    },
    setdate(init) {
      this.date = init;
    },
    label: function(text) {
      label = te;
    },
  },
};
</script>

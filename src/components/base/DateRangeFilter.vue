<template>
  <v-menu
    ref="menu1"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
    dense
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        dense
        outlined
        hide-details="auto"
        v-model="dateRangeText"
        label="Date range"
        persistent-hint
        v-bind="attrs"
        clearable
        v-on="on"
        @click:clear="
          (date_range = []), (filter.start = null), (filter.end = null)
        "
      ></v-text-field>
    </template>
    <v-date-picker v-model="date_range" range></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  props: {
    clear: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    date_range: [],
  }),
  methods: {
    emitInput() {
      if (this.date_range.length > 1) {
        if (
          new Date(this.date_range[1]).getTime() >
          new Date(this.date_range[0]).getTime()
        ) {
          this.$emit("start", this.date_range[0]);
          this.$emit("end", this.date_range[1]);
        } else {
          this.$emit("start", this.date_range[1]);
          this.$emit("end", this.date_range[0]);
        }
      } else {
        this.$emit("start", this.date_range[0]);
      }
    },
  },
  computed: {
    dateRangeText() {
      return this.date_range.join(" ~ ");
    },
  },
  watch: {
    clear: {
      handler(val) {
        this.date_range = [];
      },
      deep: true,
    },
    dateRangeText: {
      handler(val) {
        this.emitInput();
      },
      deep: true,
    },
  },
};
</script>
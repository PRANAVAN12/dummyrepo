<template>
  <v-card class="custom-modal">
    <v-container class="header" v-if="title">
      <v-row>
        <v-col class="d-flex justify-space-between align-center pr-0 py-0">
          <span class="header-title"> {{ title }}</span>
          <v-btn class="ma-2 cursor-pointer" text icon @click="close()">
            <v-icon class="icon_large" v-bind="attrs" v-on="on"
              >mdi-close</v-icon
            >
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <slot />
    </v-container>
    <v-container class="footer">
      <v-row
        ><v-col class="d-flex justify-end py-0">
          <v-btn
            depressed
            small
            class="text-white  mx-1"
            @click.stop="close()"
            >Close</v-btn
          >
          <v-btn
            v-if="showSave"
            depressed
            small
            class="text-white btn_blue  w-100 mx-1"
            @click="submit()"
            :loading="isLoading"
            >Save</v-btn
          ></v-col
        ></v-row
      >
    </v-container>
  </v-card>
</template>
<script>
export default {
  data: () => ({}),
  props: {
    title: {
      type: String,
      default: "",
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    showSave: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    submit() {
      this.$emit("onSubmit", true);
    },
    close() {
      this.$emit("onClose", true);
    },
  },
  computed: {
    show: {
      get() {
        return this.isVisible;
      },
    },
  },
};
</script>
<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">{{title}}</v-card-title>
        <v-card-text>{{message}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="accept">Yes</v-btn>
          <v-btn color="green darken-1" text @click="reject">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      message: "",
      title: "",
    };
  },
  methods: {
    accept() {
      this.dialog = false;
    },
    reject() {
      this.dialog = false;
    },
  },
};
</script>
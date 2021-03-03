<template>
  <div class="text-center">
    <v-menu
      v-if="user"
      v-model="menu"
      :close-on-content-click="false"
      origin="center center"
      :nudge-right="140"
      :nudge-bottom="10"
      transition="scale-transition"
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-avatar v-bind="attrs" v-on="on" size="32px" item color="primary">
          <template v-if="user && user.image">
            <img :src="user.image"
          /></template>

          <span v-else class="white--text subtitle-2 text-uppercase">{{
            user.first_name.charAt(0) + user.last_name.charAt(0)
          }}</span>
        </v-avatar>
      </template>
      <v-card class="pa-0">
        <v-list>
          <v-list-item class="justify-space-between">
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold">{{
                user.first_name + " " + user.last_name
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item :to="'/user/' + user.id" class="justify-space-between">
            <v-list-item-action>
              <v-avatar color="cyan" size="30">
                <v-icon>account_circle</v-icon>
              </v-avatar>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>


          <v-list-item :to="'/changepassword' " class="justify-space-between">
            <v-list-item-action>
              <v-avatar color="green" size="30">
                <v-icon>settings</v-icon>
              </v-avatar>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Change Password</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item class="justify-end">
            <v-chip class="ma-2" color="primary" outlined>
              <a @click="logout">Log out</a>
              <v-icon right>
                mdi-logout
              </v-icon>
            </v-chip>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true,
    name: "",
    role: "",
  }),
  created() {},
  computed: {
    ...mapState("user", ["user"]),
  },
  methods: {
    logout() {
      this.menu = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      this.$store.dispatch("user/LogOut");
      this.$router.push("/login");
    },
  },
};
</script>

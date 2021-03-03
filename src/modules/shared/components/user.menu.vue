<template>
  <div>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-y
    >
      <template v-slot:activator="{ on }">
        <v-list-item-avatar v-on="on" class="imgs">
          <img :src="avatars" />
        </v-list-item-avatar>
      </template>
      <v-card>
        <v-list-item>
          <v-list-item-avatar>
            <img :src="avatars" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ this.username }}</v-list-item-title>
            <v-list-item-subtitle>{{ this.jobTitle }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list>
          <v-list-item>
            <v-col></v-col>
            <v-btn class="logout" color="primary" dark v-on:click="signOut"
              >log out
              <v-icon dark right>mdi-logout</v-icon>
            </v-btn></v-list-item
          >
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["man"],
  data: () => ({
    fav: true,
    menu: "",
    message: false,
    hints: true,
    name: "",
    role: "",
    avatars: "",
    jobTitle: "",
    loading: true,
  }),
  computed: {
    username() {
      return (this.msal && this.msal.user.name) || "Unknown";
    },
    email() {
      return (this.msal && this.msal.user.userName) || null;
    },
    token() {
      return (this.msal && this.msal.accessToken) || null;
    },
    // user() {
    //   let user = null;
    //   if (this.msal.isAuthenticated) {
    //     // Note that the dollar sign ($) is missing from this.msal
    //     user = {
    //       ...this.msal.user,
    //       profile: {},
    //     };
    //     if (this.msal.graph && this.msal.graph.profile) {
    //       user.profile = this.msal.graph.profile;
    //       console.log("User" + JSON.stringify(this.msal.graph));
    //     }
    //   }
    //   return user;
    // },
    // ...mapState("user", ["user"]),
  },
  methods: {
    signOut() {
      localStorage.removeItem("accessToken");
      localStorage.clear();
      this.$msal.signOut();
    },
    async fetchPhoto() {
      await this.$msal
        .msGraph({ url: "/me/photo/$value", responseType: "blob" })
        .then(({ body }) => {
          ;
          const avatar = (window.URL || window.webkitURL).createObjectURL(body);
          this.$store.commit("user/SET_USERPHOTO", avatar);
          this.avatars = avatar;
        })
        .catch(() => {
          // this.avatar = process.env.default_avatar
        });
    },
    async fetchData() {
      await this.$msal
        .msGraph({ url: "/me" })
        .then(({ body }) => {
          this.jobTitle = body.jobTitle;
        })
        .catch(() => {
          // this.avatar = process.env.default_avatar
        });
    },
  },
  created() {},
  beforeMount() {
    this.avatars = this.$store.state.user.avatar;
    this.fetchPhoto();
    //   this.fetchData();
  },
};
</script>

<style scoped>
.list-item-avatar .imgs {
  padding: 10px;
}
.logout {
  color: #96124c;
}
</style>

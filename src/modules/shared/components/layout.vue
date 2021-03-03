<template>
  <div>
    <div class="vld-parent">
      <loading
        v-if="!login_status"
        :height="80"
        :active.sync="LoadingStatus"
        :is-full-page="true"
        :width="80"
        color="#9d0191"
      >
      </loading>
    </div>

    <v-app id="inspire" v-if="login_status">
      <v-navigation-drawer
        :dark="theme != 'light'"
        color=" en-3"
        v-model="drawer"
        :clipped="$vuetify.breakpoint.lgAndUp"
        app
        :mini-variant="!drawer"
        class="navigation"
        :permanent="permanent"
      >
     

        <v-list dense>
          <template v-for="(item,index) in GetMenuList">
            <v-row
              v-if="item.heading"
              :key="item.heading"
              align="center"
              class="hie"
            >
              <v-col cols="6">
                <v-subheader v-if="item.heading">{{
                  item.heading
                }}</v-subheader>
              </v-col>
              <v-col cols="6" class="text-center">
                <a href="#!" class="body-2 black--text">EDITt</a>
              </v-col>
            </v-row>
            <v-list-group
              v-else-if="item.children"
              :key="item.text"
              v-model="item.model"
              :prepend-icon="item.model ? item['icon-alt'] : item.icon"
              top
              dense
            >
              <v-icon slot="prependIcon" large color="#1d2939">
                {{ item.model ? item["icon-alt"] : item.icon }}
              </v-icon>
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title class="sidebar">{{
                    item.text
                  }}</v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item
                v-for="(child, i) in item.children"
                :key="i"
                :to="child.link"
                link
                v-ripple="{ class: 'ripple_color' }"
                :style="drawer ? '' : 'background-color:#b0d7ff7a'"
              >
                <v-list-item-action
                  v-if="child.icon"
                  :class="!drawer ? '' : 'ml-4'"
                >
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="sidebar">{{
                    child.text
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
            <v-list-item
              v-else
              :key="item.text"
              link
              :to="item.link"
              v-ripple="{ class: 'ripple_color' }"
            >
              <v-list-item-action class>
                <v-icon color="#1d2939">{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="sidebar">{{
                  item.text
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
        <!-- </v-parallax> -->
      </v-navigation-drawer>

      <!-- color="white" -->
      <v-app-bar
        :dark="theme != 'light'"
        :color="theme == 'light' ? 'white' : 'black_bar'"
        height="55"
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        app
        flat
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title
          style="width: 200px"
          class="ml-0 pl-4 text-left d-none d-sm-flex"
        >
          <img
            src="../../../assets/img/speedcodelabs.png"
            alt="logo"
            height="47"
          />
          <!-- <span class="brand_name">{{ sitename }} dsdsdd</span> -->
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn icon @click="color_mode = !color_mode" class="mr-3">
          <img
            style="fill: white"
            src="../../../assets/img/sun.svg"
            height="15"
            v-show="!color_mode"
          />
          <img
            src="../../../assets/img/moon.svg"
            height="15"
            v-show="color_mode"
          />
        </v-btn>
        <!-- <div class="mr-3 py-2">
        <label id="switch" class="switch">
          <input v-model="color_mode" type="checkbox" onchange="toggleTheme()" id="slider" />
          <span class="slider round"></span>
        </label>
      </div> -->
        <!-- <v-btn icon>
          <Notification></Notification>
        </v-btn> -->
        <UserMenuComponent></UserMenuComponent>
      </v-app-bar>
      <v-main>
        <!-- <v-row> -->

        <!-- <Loading v-if="isLoading"></Loading> -->
        <!-- <router-view v-else /> -->
        <!-- <Loading></Loading> -->
        <!-- <transition name="fade"> -->
        <router-view />
        <!-- </transition> -->
        <!-- </v-row> -->
      </v-main>
      <v-footer padless>
        <v-col class="text-center" cols="12">
          <strong>
            {{ new Date().getFullYear() }} @ Copyright — Speed HRM by Speed Code
            Labs (Pvt) Ltd
          </strong>
        </v-col>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import _ from "lodash";
import UserMenuComponent from "./user.menu";
import Notification from "./notification";
import env from "../../../config/env";
import { mapState, mapGetters } from "vuex";
// import Loading from "@/components/shared/routeLoading.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  components: {
    UserMenuComponent,
    Notification,
    Loading,
  },
  props: {
    source: String,
  },
  data: () => ({
    LoadingStatus: true,
    sitename: "",
    dialog: false,
    drawer: false,
    itemList: [],
    // items: [
    //   {
    //     icon: "mdi-home-circle-outline",
    //     "icon-alt": "mdi-home-circle",
    //     text: "Dashboard",
    //     // model: true,
    //     link: "/",
    //     policy: ["Leave Index"],
    //   },
    //   {
    //     icon: "mdi-account-multiple-outline",
    //     "icon-alt": "mdi-account-multiple-plus",
    //     text: "Staffs",
    //     link: "/staff",
    //     policy: ["Staff Index"],
    //   },

    //   {
    //     icon: "mdi-calendar-multiple",
    //     "icon-alt": "mdi-calendar-multiple",
    //     text: "Leaves",
    //     policy: ["Leave Index"],
    //     children: [
    //       {
    //         icon: "mdi-calendar-plus",
    //         text: "Request",
    //         link: "/leave",
    //         policy: ["Leave Index"],
    //       },
    //       {
    //         icon: "mdi-calendar-multiple-check",
    //         text: "Approvals",
    //         link: "/staff_leave",
    //         policy: ["Leave Index"],
    //       },
    //     ],
    //   },

    //   {
    //     icon: "mdi-calendar-clock",
    //     text: "Event",
    //     link: "/event",
    //     policy: ["Event Index"],
    //   },
    //   {
    //     icon: "mdi-fingerprint",
    //     text: "Attendance",
    //     link: "/attendance",
    //     policy: ["Event Index"],
    //   },
    //   {
    //     icon: "mdi-cog-transfer",
    //     text: "Master Data",
    //     link: "/master-data",
    //     policy: ["Salutation Index"],
    //   },
    //   {
    //     icon: "mdi-wrench-outline",
    //     "icon-alt": "mdi-wrench",
    //     text: "Settings",
    //     policy: ["User Index"],
    //     children: [
    //       {
    //         icon: "mdi-account-circle-outline",
    //         text: "Users",
    //         link: "/user",
    //         policy: ["User Index"],
    //       },
    //       {
    //         icon: "mdi-shield-lock",
    //         text: "Roles",
    //         link: "/role",
    //         policy: ["Role Index"],
    //       },
    //     ],
    //   },
    // ],
  }),
  watch: {},
  methods: {
    init() {
      let permission = this.$store.state.user.policies;
    },
    async GetPhoto() {
      await this.$msal
        .msGraph({ url: "/me/photo/$value", responseType: "blob" })
        .then(({ body }) => {
          debugger
          const avatar = (window.URL || window.webkitURL).createObjectURL(body);
          this.$store.commit("user/SET_USERPHOTO", avatar);
        });
    },
    GetLoginUser(email, token) {
      this.$store.dispatch("user/Logins", { email, token }).then((res) => {
        if (res.data && res.data.accessToken) {
          this.$store.dispatch("user/LoginUsers").then((resp) => {
            // this.$router.push("/");

            this.loading = false;
          });
        } else {
          this.$router.push("/notFound");
        }
      });
    },
    // checkPermission() {
    //   this.items.map((item) => {
    //     let permission = this.$store.state.user.policies;
    //     var hasPermission = _.find(permission, function(permission) {
    //       return permission.name == item.policy;
    //     });

    //     if (hasPermission) {
    //       this.itemList.push(item);
    //     }
    //   });
    // },
  },
  created() {
    var login_status=this.$store.state.user.login_status
    debugger
    var counter = 0;
    if(!login_status){
      var intervalId = setInterval(() => {
        var isAuthenticated=this.$msal.isAuthenticated()
        if (this.$msal.isAuthenticated()) {
          debugger
            var token = this.$msal.data.accessToken;
            var email = this.$msal.data.user.userName;
            if (token && (token !== null)) {
              this.GetLoginUser(email, token);
              this.GetPhoto();
              // this.checkPermission();
              
              clearInterval(intervalId);
              
              this.sitename = this.$store.state.sitesetting.name;
    
              this.$store.subscribe((mutation, state) => {
                this.sitename = state.sitesetting.name;
              });
            }
        }
        else {
          this.$router.push({ path: "/login" });
        }

        if(counter>=8){
          this.$msal.signOut();
          this.$router.push({ path: "/login" });
        }
        counter++;
        console.log('Counter: ' ,counter)
      }, 2000);
    }
    else{
      // this.checkPermission();
      this.GetPhoto();
    }
  },

  computed: {
    color_mode: {
      get() {
        return this.theme == "light";
      },
      set(value) {
        this.$store.commit("SET_COLOR_MODE", value);
      },
    },
    // isLoading: function() {
    //   return !this.login_status;
    // },
    ...mapState(["name", "theme"]),
    ...mapState("user", ["user", "login_status"]),
    ...mapGetters("user", ["GetMenuList"]),

    permanent: {
      get: function() {
        switch (this.$vuetify.breakpoint.name) {
          case "xs":
            return !true;
          case "sm":
            return !true;
          case "md":
            return !true;
          case "lg":
            return !false;
          case "xl":
            return !false;
        }
      },
      set: function(value) {
        this.drawer = value;
      },
    },
    name() {
      return env.name;
    },
  },
};
</script>
<style>
/* global_search  */
.global_search fieldset {
  border: unset !important;
}

.global_search .v-input__prepend-outer {
  margin-top: 4px !important;
}

.global_search .v-input__prepend-outer .v-icon {
  font-size: 18px !important;
}

.global_search .v-input__slot {
  margin-left: -15px;
}

.global_search .v-input input {
  padding-left: 16px;
  /* background: #f7f7f796; */
  border-radius: 8px;
  color: #565656;
}

.global_search .v-input input:focus {
  color: black;
  padding-left: 16px;
  background: #f7f7f7;
  border-radius: 8px;
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

.theme-light {
  --color-primary: #0060df;
  --color-secondary: #fbfbfe;
  --color-accent: #fd6f53;
  --font-color: #000000;
}

.theme-dark {
  --color-primary: #17ed90;
  --color-secondary: #2a2c2d;
  --color-accent: #12cdea;
  --font-color: #ffffff;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 14;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #eaeaea;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 0px;
  bottom: 4px;
  top: 0;
  bottom: 0;
  margin: auto 0;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  box-shadow: 0 0px 15px #2020203d;
  background: white url("../../../assets/img/night.png");
  background-repeat: no-repeat;
  background-position: center;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(17px);
  -ms-transform: translateX(17px);
  transform: translateX(17px);
  background: white url("../../../assets/img/sunny.png");
  background-repeat: no-repeat;
  background-position: center;
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
.my-menu {
  margin-top: 40px;
  contain: initial;
  overflow: visible;
}
.my-menu::before {
  position: absolute;
  content: "";
  top: 0;
  left: 10px;
  transform: translateY(-100%);
  width: 10px;
  height: 13px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 13px solid #fff;
}
.shadow {
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
.theme1 {
  background-color: #1d927f !important;
  border-radius: 24px !important;
  color: #ffffff !important;
}
.btn_responsive {
  max-width: -moz-available;
}

@media only screen and (max-width: 1400px) {
  .btn_responsive {
    font-size: 12px !important;
  }
  @media only screen and (max-width: 1000px) {
    .btn_responsive {
      display: none !important;
    }
    @media only screen and (max-width: 700px) {
      .layout_responsive .v-btn {
        height: 30px !important;
        width: 50px !important;
        min-width: 10px !important;
      }
      .v-toolbar__title {
        width: 100px !important;
      }
      .brand_name {
        font-weight: bolder !important;
        font-size: 12px;
        color: #031a61;
      }
    }
  }
}
</style>

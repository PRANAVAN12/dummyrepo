<template>
  <!-- Page Title -->
  <v-flex class="fixed-bar">
    <v-row style="background: #feffff" class="px-8 pt-6 pb-4 fixed-bar-row">
      <v-col class="py-0">
        <h1 style="font-size: 24px" v-if="!isSubTiltle" class="title_text">
          {{ title }}
        </h1>
        <h2 v-if="isSubTiltle" class="title_text">{{ title }}</h2>
        <template v-if="hasBreadcrumbs">
          <Breadcrumbs />
        </template>
      </v-col>
      <permission-control :permissionName="permission">
        <v-col class="text-right ma-auto" v-if="btnCreate">
          <v-btn
            depressed
            small
            height="32"
            class="text-white btn_blue w-100 pl-1"
            @click.stop="onClickCreate"
          >
            <v-icon class="icon_small ma-2">mdi-plus</v-icon>Create
          </v-btn>
          <!-- <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              depressed
              small
              height="32"
              class="ml-2 text-white secondary w-100"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon class="icon_small ma-2">mdi-menu</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in ['Export', 'Import']"
              :key="index"
              @click
            >
              <v-list-item-title>
                <v-icon v-if="index == 0" class="icon_small ma-2"
                  >mdi-export</v-icon
                >
                <v-icon v-if="index == 1" class="icon_small ma-2"
                  >mdi-import</v-icon
                >
                {{ item }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu> -->
        </v-col>
      </permission-control>

      <v-col class="text-right ma-auto" v-if="backBtn">
        <v-row justify="end">
          <v-btn
            depressed
            small
            height="32"
            class="btn-white w-100 btn-back pl-1 mr-3"
            @click="$router.go(-1)"
          >
            <v-icon class="icon_small ma-2">mdi-keyboard-backspace</v-icon>BACK
          </v-btn>

          <permission-control :permissionName="resetPasswordPermission">
            <v-btn
              v-if="resetpass"
              depressed
              small
              height="32"
              class="w-100 mr-2"
              @click="resetpassword()"
            >
              <v-icon class="icon_small ma-2">mdi-shield-key</v-icon>Reset
              Password
            </v-btn>
          </permission-control>

          <v-btn
            v-if="changeStatus"
            depressed
            small
            height="32"
            class="w-100 mr-2"
            @click="onClickChangeStatus()"
          >
            <v-icon class="icon_small ma-2">mdi-shield-key</v-icon>Change Status
          </v-btn>

          <permission-control :permissionName="permission">
            <v-btn
              v-if="editRoute != ''"
              depressed
              small
              height="32"
              class="btn_blue w-100 pl-1"
              :to="editRoute"
            >
              <v-icon class="icon_small ma-2">mdi-pencil-outline</v-icon>EDIT
            </v-btn>
          </permission-control>
        </v-row>
      </v-col>
      <!--  -->
    </v-row>
    <v-row>
      <v-overlay v-if="showLoading"></v-overlay>
      <v-progress-linear
        :indeterminate="false"
        :query="false"
        v-if="showLoading"
      ></v-progress-linear>
    </v-row>
  </v-flex>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    editRoute: {
      type: String,
      default: "",
    },
    resetpass: {
      type: Boolean,
      default: false,
    },
    changeStatus: {
      type: Boolean,
      default: false,
    },
    backBtn: {
      type: Boolean,
      default: false,
    },
    isSubTiltle: {
      type: Boolean,
      default: false,
    },
    hasBreadcrumbs: {
      type: Boolean,
      default: true,
    },
    createRoute: {
      type: String,
      default: "",
    },
    btnCreate: {
      type: Boolean,
      default: false,
    },
    createPopup: {
      type: Boolean,
      default: false,
    },
    showLoading: {
      type: Boolean,
      default: false,
    },
    permission: {
      type: String,
      default: "",
    },
    resetPasswordPermission: {
      type: String,
      default: "",
    },
    isChangeStatusClicked: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    resetpassword() {
      if (this.resetpass) {
        this.$emit("onResetPassword", true);
      }
    },
    onClickChangeStatus() {
      this.$emit("onClickChangeStatus", true);
    },
    onClickCreate() {
      if (this.createPopup) {
        this.$emit("onClickCreate", true);
      } else {
        this.$router.push({ path: this.createRoute });
      }
    },
  },
};
</script>
<style>
.fixed-bar:not([data-scroll="0"]) {
  position: sticky;
  position: -webkit-sticky;
  top: 1.8rem;
  z-index: 2;
}
@media only screen and (max-width: 715px) {
  .v-breadcrumbs .v-breadcrumbs__item {
    font-size: 12px !important;
  }
  .fixed-bar .v-btn.v-size--small {
    height: 20px !important;
    font-size: 9px !important;
    padding: 5px;
    margin: 0;
  }
  .fixed-bar .icon_small {
    font-size: 9px !important;
  }
  .fixed-bar .col {
    display: contents;
  }
  .fixed-bar h1 {
    font-size: 12px !important;
    padding-right: 10px;
  }
}
</style>

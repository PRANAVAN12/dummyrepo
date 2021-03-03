<template>
  <div class="text-center">
    <v-menu
      v-model="notification"
      :close-on-content-click="false"
      offset-y
      offset-x
      origin="center center"
      :nudge-right="300"
      :nudge-bottom="10"
      transition="scale-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-avatar v-bind="attrs" v-on="on" size="32px" item>
          <v-icon>mdi-bell</v-icon>
        </v-avatar>
      </template>
      <v-card class="elevation-0">
        <v-toolbar card color="transparent">
          <v-toolbar-title><h4>Notification</h4></v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="pa-0">
          <v-list two-line class="pa-0">
            <v-divider></v-divider>

            <v-list-item avatar>
              <v-list-item-avatar color="green">
                <v-avatar color="green">
                  <v-icon dark>account_circle</v-icon>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title> New user registered</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action class="caption">
                Just now
              </v-list-item-action>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item avatar>
              <v-list-item-avatar>
                <v-avatar color="blue">
                  <v-icon dark>shopping_cart</v-icon>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title> New order received</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action class="caption">
                2 min ago
              </v-list-item-action>
            </v-list-item>

            <v-divider></v-divider>
            <v-list-item avatar>
              <v-list-item-avatar>
                <v-avatar color="cyan">
                  <v-icon dark>payment</v-icon>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title> New payment made</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action class="caption">
                24 min ago
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-btn block flat class="ma-0">All</v-btn>
          <v-divider></v-divider>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  data: () => ({
    notification: "",
  }),
};
</script>

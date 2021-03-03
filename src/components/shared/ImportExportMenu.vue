


        <template>
  <!-- Table fields selector -->

  <v-menu offset-y v-if="false">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        depressed
        small
        height="30"
        class="ma-auto mr-2 text-white secondary w-100"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon class="icon_small ma-2">mdi-menu</v-icon>
      </v-btn>
    </template>
    <permission-control :permissionName="permission">
      <v-list>
        <v-list-item v-for="(item, index) in ['Export', 'Import']" :key="index">
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
    </permission-control>
  </v-menu>
</template>
<script>
export default {
  props: {
    permission: {
      type: String,
      default: "",
    },
  },
};
</script>

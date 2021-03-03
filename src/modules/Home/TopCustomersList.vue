<template>
  <div class="lighten-12 card-content">
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="12" lg="6" xl="6" class="pt-0">
        <div class="dashboard-card-title">Top 10 Customers</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" class="pt-0">
        <v-list three-line>
          <template>
            <v-row v-for="item in items">
              <v-col
                cols="12"
                xs="12"
                sm="12"
                md="12"
                lg="6"
                xl="6"
                class="pl-5"
              >
                <!-- {{ item["customer.name"] }} -->
               
                  <v-list-item>
                       <v-list-item-content class="pa-0 dashboard-list-item-content">
                    <v-list-item-title class="dashboard-list-title"
                      v-html="item['customer.name']"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="item['customer.contact.phone']"
                    ></v-list-item-subtitle>
                       </v-list-item-content>
                  </v-list-item>
              </v-col>
              <v-col
                cols="12"
                xs="12"
                sm="12"
                md="12"
                lg="6"
                xl="6"
                class="d-flex justify-end pr-5"
              >
                {{ item.total }}
              </v-col>
            </v-row>
          </template>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  name: "Home",
  data: () => ({
    items: [
      { header: "Today" },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Brunch this weekend?",
        subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        title: "Oui oui",
        subtitle:
          '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        title: "Birthday gift",
        subtitle:
          '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        title: "Recipe to try",
        subtitle:
          '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
      },
    ],
  }),

  components: {},
  methods: {
    getTopCustomers() {
      axios
        .get(`dashboard/top-customer`)
        .then((resp) => {
          debugger;
          this.items = resp.data.data;
          this.$emit('input',this.items);
        })
        .catch((err) => {
          console.log("Error");
        });
    },
  },
  created() {
    this.getTopCustomers();
  },
};
</script>

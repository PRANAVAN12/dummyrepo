<template>
  <div>
    <PageTitle
      title="Users"
      :btnCreate="true"
      :createRoute="'user/add'"
      :permission="'User Create'"
    />
    <v-container fluid class="lighten-12 content">
      <v-card class="lighten-12 card-content">
        <TableFilters
          :filters="['status', 'search']"
          v-model="filter"
          :columns="columns"
        >
        </TableFilters>
      </v-card>

      <v-card class="lighten-12 mt-2">
        <v-container fluid class="light gray lighten-12">
          <v-row>
            <v-card-text class="pa-0">
              <v-data-table
                :items-per-page="paginationOptions.perPage"
                :fixed-header="true"
                :headers="headers"
                :items="users"
                item-key="id"
                hide-default-footer
                @click:row="$router.push(`user/${$event.id}`)"
                class="row-pointer"
              >
                <template v-slot:no-data>
                  <img
                    style="height: 200px"
                    src="../../../assets/img/no-result.jpg"
                  />
                </template>
                <template v-slot:item.name="{ item }">
                  <v-list-item class="px-0">
                    <v-list-item-avatar color="primary">
                      <v-img v-if="item.image" :src="item.image"></v-img>
                      <span
                        v-else
                        class="white--text subtitle-2 text-uppercase"
                      >
                        {{ item.first_name.charAt(0) }}
                      </span>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>{{
                        item.first_name + " " + item.last_name
                      }}</v-list-item-title>
                      <v-list-item-subtitle>{{
                        item.roles[0].name
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </template>
                <template v-slot:item.image="{ item }">
                  <img
                    v-if="item.image"
                    height="30"
                    width="30"
                    :src="item.image"
                    style="border-radius: 30%"
                  />
                  <img
                    v-else
                    height="20"
                    src="data:image/png;base64,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"
                  />
                </template>

                <!-- No -->
                <template v-slot:item.no>
                  <v-icon>mdi-vuetify</v-icon>
                </template>

                <!-- Status -->
                <template v-slot:item.status="{ item }">
                  <v-chip
                    :x-small="true"
                    class="ma-2"
                    label
                    text-color="white"
                    :color="getStatusColor(item.is_active)"
                    dark
                    >{{ item.is_active ? "Active" : "Archived" }}</v-chip
                  >
                </template>

                <!-- Action -->
                <template v-slot:item.action="{ item }">
                  <list-menu
                    feature="user"
                    :item="item"
                    viewPermission="User Show"
                    editPermission="User Edit"
                    softDeletePermission="User Soft Delete"
                    @refreshList="refreshData"
                  ></list-menu>
                </template>
                <template v-slot:footer>
                  <pagination
                    @paginationOptions="setPaginationOptions"
                    @response="setResponseData"
                    url="users"
                    ref="pagination"
                    :filter="filter"
                  />
                </template>
              </v-data-table>
            </v-card-text>
          </v-row>
        </v-container>
      </v-card>

      <!-- </v-card> -->
      <div class="d-flex justify-center align-center"></div>
    </v-container>
  </div>
</template>
<script>
import pagination from "../../shared/components/pagination.vue";
import confirmation from "../../shared/components/confirmation.vue";
import TableFilters from "@/components/base/TableFilters";

export default {
  components: {
    pagination,
    TableFilters,
  },
  data() {
    return {
      paginationOptions: {},
      isLoading: true,
      pagination1: {
        descending: true,
        page: 1,
        rowsPerPage: 2,
        sortBy: "fat",
        totalItems: 0,
        rowsPerPageItems: [1, 2, 4, 8, 16],
      },
      pagination: {
        page: 1,
        itemsPerPage: 2,
      },
      page: 1,
      columns: [
        {
          text: "Name",
          value: "name",
          show: true,
          disabled: false,
          width: "25%",
          align: "left",
        },
        {
          text: "Username",
          value: "username",
          align: "left",
          show: true,
          disabled: false,
          width: "15%",
        },
        {
          text: "Telephone",
          value: "contact.phone",
          show: true,
          disabled: false,
          width: "15%",
        },

        {
          text: "Email",
          value: "email",
          show: true,
          disabled: false,
          align: "left",
          width: "15%",
        },
        {
          text: "Status",
          value: "status",
          show: true,
          disabled: false,
          align: "center",

          width: "15%",
        },
        {
          text: "Actions",
          value: "action",
          show: true,
          disabled: false,
          width: "15%",
        },
      ],
      users: [],
      filter: {
        status: "",
        search: "",
      },
    };
  },
  methods: {
    setPaginationOptions(data) {
      this.paginationOptions = data;
    },
    refreshData() {
      this.$refs.pagination.refreshData();
    },
    clearFilter() {
      this.filter = {};
    },

    setResponseData(usersData) {
      this.users = usersData;
      this.users.map((u) => {
        if (u.image) {
          u.image = u.image + "?t=" + new Date().getTime();
        }
      });
    },

    GetUsers() {
      this.$store
        .dispatch("user/GetUsers", {
          filters: {
            searchText: "",
            roles: [1, 2],
          },
          pagination: {},
        })
        .then((res) => {
          this.users = res.data.data.map((u, i, arr) => {
            console.log(arr);
            u.index = i + 1;
            return new UserListViewModel(u);
          });
          this.isLoading = false;
          console.log("this.users", this.users);
        })
        .catch((err) => {
          this.isLoading = false;
          this.messages = err.data.title;
        });
    },
    getStatusColor(status) {
      return status ? "green" : "gray";
    },
  },
  computed: {
    // Filter - return selected table fields
    headers: function () {
      return this.columns.filter((item) => item.show == true);
    },
  },
  created() {},
};

class UserListViewModel {
  constructor(user) {
    this.id = "";
    this.name = "";
    this.phone = "";
    this.email = "";
    this.roles = "";
    this.status = "";
    this.telephone = "";
    this.action = "";
    this.no = "";
    this.id = user.id;
    this.image = user.image;
    this.index = user.index;
    this.image = user.image;
    this.username = user.username ? user.username : "";
    this.name = user.first_name ? user.first_name + " " + user.last_name : "";
    this.phone = user.contact && user.contact.phone ? user.contact.phone : "";
    this.telephone =
      user.contact && user.contact.telephone ? user.contact.telephone : "";
    this.email = user.email ? user.email : "";
    if (user.roles) {
      this.roles = user.roles
        .map((r) => {
          return " " + r.name;
        })
        .toString();
    }
    // this.roles = user.email ? user.email : "";
    this.status = user.is_active ? "Active" : "Archived";
  }
}
</script>
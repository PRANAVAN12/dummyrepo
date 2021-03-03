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
                class="row-pointer"
              >
             
               <template v-slot:item.roles="{ item }">
                  {{item.roles[0].name}}
                </template>
                  <template v-slot:item.staff="{ item }">
                  {{item.staff?item.staff.last_name:null }}
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
                    viewPermission= "User View"
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
          text: "User",
          value: "name",
          show: true,
          disabled: false,
          width: "25%",
          align: "left",
        },
        {
          text: "Email",
          value: "email",
          align: "left",
          show: true,
          disabled: false,
          width: "15%",
        },
         {
          text: "Staff",
          value: "staff",
          show: true,
          disabled: false,
          width: "15%",
        },
        {
          text: "Role",
          value: "roles",
          show: true,
          disabled: false,
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
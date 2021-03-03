<template>
  <div>
    <PageTitle
      title="Brands"
      :btnCreate="true"
      :createPopup="true"
      @onClickCreate="OpenCreateModal()"
      :permission="'Brand Create'"
    />

    <v-container fluid class="lighten-12 content">
      <v-card class="lighten-12 card-content mb-2">
        <v-row class="ma-0 align-right">
          <TableFilters
            :filters="['status', 'search']"
            v-model="filter"
            :columns="columns"
          ></TableFilters>
          <ImportExportMenu :permission="'Brand Report'"></ImportExportMenu>
        </v-row>
      </v-card>
      <LoadingComponent
        v-if="isLoading"
        :visible="isLoading"
      ></LoadingComponent>
      <v-card class="lighten-12 mt-2">
        <ValidationObserver ref="observer" v-slot="{ validate, reset }">
          <v-container fluid class="light gray lighten-12">
            <v-row>
              <v-card-text class="pa-0">
                <v-data-table
                  :items-per-page="paginationOptions.perPage"
                  :fixed-header="true"
                  :headers="headers"
                  :items="brand"
                  item-key="id"
                  hide-default-footer
                >
                  <template v-slot:item.image="{ item }">
                    <v-avatar size="32px" item color="primary">
                      <img
                        v-if="item.image"
                        height="30"
                        width="30"
                        :src="item.image"
                        style="border-radius: 30%"
                      />
                      <span
                        v-else
                        class="white--text subtitle-2 text-uppercase"
                        >{{ item.name.substring(0, 2) }}</span
                      >
                    </v-avatar>
                  </template>
                  <template v-slot:no-data>
                    <img
                      style="height: 200px"
                      src="../../../../assets/img/no-result.jpg"
                    />
                  </template>
                  <!-- No -->
                  <template v-slot:item.no>
                    <v-icon>mdi-vuetify</v-icon>
                  </template>
                  <!-- Name -->
                  <template v-slot:item.name="{ item }">
                    <v-text-field
                      v-if="item.id == editBrandId"
                      v-model="newbrand.name"
                      :value="item.name"
                      outlined
                      class="pt-3"
                    ></v-text-field>
                    <p v-else>{{ item.name }}</p>
                  </template>
                  <!-- Status -->
                  <template v-slot:item.status="{ item }" :slot-scope="props">
                    <!-- {{item.is_active}} -->

                    <!-- {{editBrandId}} - {{item.id}} -->

                    <toggle-button
                      v-if="editBrandId == item.id"
                      :disabled="editBrandId != item.id"
                      :value="item.is_active"
                      :width="80"
                      v-model="newbrand.is_active"
                      :labels="{ checked: 'Active', unchecked: 'Archeived' }"
                    ></toggle-button>

                    <v-chip
                      v-else
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
                      feature="brand"
                      :item="item"
                      editPermission="Brand Edit"
                      softDeletePermission="Brand Soft Delete"
                      @refreshList="refreshData"
                      @onEditClicked="EditBrand(item)"
                      :isEditModal="true"
                    ></list-menu>
                  </template>
                  <template v-slot:footer>
                    <pagination
                      @paginationOptions="setPaginationOptions"
                      @response="setResponseData"
                      url="brands"
                      :filter="filter"
                      ref="pagination"
                    >
                    </pagination>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-row>
          </v-container>
        </ValidationObserver>
      </v-card>
      <BrandForm
        ref="createBrandModal"
        @close="AddCategory($event)"
        @afterSave="refreshData()"
      />

      <BrandEditForm
        ref="editBrandModal"
        :productBrand="productBrand"
        @close="AddCategory($event)"
        @afterSave="refreshData()"
      />

      <div class="d-flex justify-center align-center"></div>
    </v-container>
  </div>
</template>
<script>
import { required, email, max, regex } from "vee-validate/dist/rules";
import { mapState } from "vuex";
import TableFilters from "@/components/base/TableFilters";
import pagination from "../../components/pagination";
import confirmation from "../../components/confirmation";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
setInteractionMode("eager");
import BrandForm from "./BrandCreate";
import BrandEditForm from "./BrandEdit";
extend("required", {
  ...required,
  message: "{_field_} is required",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});
extend("regex", {
  ...regex,
  message: "The value is not a valid phone number",
});
export default {
  components: {
    pagination,
    ValidationProvider,
    BrandForm,
    BrandEditForm,
    ValidationObserver,
    TableFilters,
  },
  data() {
    return {
      paginationOptions: {},
      isLoading: false,
      productBrand: {
        id: 0,
        name: "",
        image: "",
        is_active: false,
      },
      pagination1: {
        descending: true,

        page: 1,
        rowsPerPage: 2,
        sortBy: "fat",
        totalItems: 0,
        rowsPerPageItems: [1, 2, 4, 8, 16],
      },
      brand: [],
      pagination: {
        page: 1,
        itemsPerPage: 2,
      },
      page: 1,

      status: [
        { text: "Active", value: "active" },
        { text: "Archived", value: "archived" },
      ],
      columns: [
        {
          text: "Image",
          value: "image",
          show: true,
          disabled: false,
          width: "25%",
          align: "left",
        },
        {
          text: "Name",
          value: "name",
          show: true,
          disabled: false,
          align: "left",
          width: "25%",
        },

        {
          text: "Status",
          value: "status",
          show: true,
          disabled: false,
          align: "center",
          width: "25%",
        },
        {
          text: "Actions",
          value: "action",
          show: true,
          disabled: false,
          align: "center",
          width: "25%",
        },
      ],
      newbrand: { name: "", id: "", is_active: "" },
      filter: {
        name: "",
        search: "",
        status: "",
      },
      // For edit purpose
      editBrandId: null,
    };
  },
  methods: {
    setPaginationOptions(data) {
      this.paginationOptions = data;
    },
    clearFilter() {
      this.filter = {};
    },
    refreshData() {
      this.$refs.pagination.refreshData();
      console.log("Refresh");
    },
    setResponseData(brand) {
      this.brand = [];
      this.brand = brand;
    },
    CancelBrand(item) {
      this.refreshData();
      this.editBrandId = null;
      this.newbrand = {};
    },
    async OpenCreateModal() {
      this.$refs.createBrandModal.openModal();
    },

    EditBrand(data) {
      this.GetBrand(data.id);
    },
    getStatusColor(is_active) {
      return is_active ? "green" : "gray";
    },

    GetBrand(id) {
      this.$store.dispatch("product/GetProductBrandById", id).then((res) => {
        this.productBrand = {
          id: res.data.id,
          name: res.data.name,
          image: res.data.image,
          is_active: res.data.is_active,
        };
        this.$refs.editBrandModal.openModal();
      });
    },
  },
  computed: {
    // Filter - return selected table fields

    //  ...mapGetters("product", ["brands"]),
    headers: function () {
      return this.columns.filter((item) => item.show == true);
    },
  },
  created() {
    this.refreshData();
  },
};

class Brand {
  constructor(brand) {
    this.name = "";

    this.name = brand.name ? brand.name : "";
  }
}
</script>

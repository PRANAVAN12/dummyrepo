<template>
  <div>
    <PageTitle
      title="Products"
      :btnCreate="true"
      :createRoute="'/product/add'"
      :permission="'Product Create'"
    />
    <v-container fluid class="lighten-12 content">
      <v-flex>
        <v-row v-if="false">
          <!-- Product info box -->
          <v-col
            class="pr-1 text-left"
            cols="12"
            xs="12"
            sm="12"
            md="4"
            lg="4"
            xl="4"
            v-for="i in [
              'linear-gradient(to right, #00c5fb 0%, #0253cc 100%)',
              'linear-gradient(to right, rgb(0 226 9) 0%, rgb(76 175 80) 100%)',
              'linear-gradient(to right, #be64e2 0%, #851298 100%)',
            ]"
            :key="i"
          >
            <v-card class="mx-auto" :color="i" :style="'background:' + i">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1 white--text"
                    >Nestomalt</v-list-item-title
                  >
                  <v-list-item-subtitle class="white--text"
                    >Product Growth by 6%</v-list-item-subtitle
                  >
                </v-list-item-content>

                <v-icon medium color="white">mdi-trending-up</v-icon>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-flex>
      <!-- <hr style="border-top: 1px dashed rgb(173 173 173)" /> -->

      <v-card class="lighten-12 card-content">
        <TableFilters
          :filters="['brand', 'supplier', 'category', 'status', 'search']"
          v-model="filter"
          :columns="columns"
        ></TableFilters>
      </v-card>

      <v-card class="mt-2">
        <v-container fluid>
          <v-row>
            <v-card-text class="pa-0">
              <v-data-table
                :items-per-page="paginationOptions.perPage"
                :fixed-header="true"
                :headers="headers"
                :items="products"
                item-key="id"
                hide-default-footer
                class="row-pointer product-list"
                @click:row="$router.push(`product/${$event.id}`)"
              >
                <template v-slot:no-data>
                  <img
                    style="height: 200px"
                    src="../../../assets/img/no-result.jpg"
                  />
                </template>
                <template v-slot:item.code="{ item }">
                  <CopyTableCell :text="item.code"></CopyTableCell>
                </template>
                <!-- No -->
                <template v-slot:item.no>
                  <v-icon>mdi-vuetify</v-icon>
                </template>

                <!-- Image -->
                <template v-slot:item.image="{ item }">
                  <img
                    v-if="item.image"
                    :src="item.image"
                    height="32"
                    width="32"
                    class="image"
                  />
                  <v-avatar v-else size="32px" item color="primary">
                    <span class="white--text subtitle-2 text-uppercase">
                      {{ item.name.substring(0, 2) }}</span
                    >
                  </v-avatar>
                </template>

                <!-- Category -->
                <template v-slot:item.category="{ item }">{{
                  item.category.name ? item.category.name : "-"
                }}</template>

                <!-- Brand -->
                <template v-slot:item.brand="{ item }">{{
                  item.brand.name ? item.brand.name : "-"
                }}</template>

                <!-- Status -->
                <template v-slot:item.status="{ item }">
                  <v-chip
                    :x-small="true"
                    class="ma-2 cursor-pointer"
                    label
                    text-color="white"
                    :color="getStatusColor(item.is_active)"
                    dark
                    >{{ item.is_active ? "Active" : "Archieved" }}</v-chip
                  >
                </template>

                <!-- Action -->
                <template v-slot:item.action="{ item }">
                  <list-menu
                    feature="product"
                    :item="item"
                    viewPermission="Product Show"
                    editPermission="Product Edit"
                    softDeletePermission="Product Soft Delete"
                    @refreshList="refreshData"
                  ></list-menu>
                </template>

                <template v-slot:footer>
                  <pagination
                    @paginationOptions="setPaginationOptions"
                    @response="setResponseData"
                    url="products"
                    :filter="filter"
                    ref="pagination"
                  />
                </template>
              </v-data-table>
            </v-card-text>
          </v-row>
        </v-container>
      </v-card>

      <div class="d-flex justify-center align-center"></div>
      <!-- </v-row> -->
    </v-container>
  </div>
</template>

<script>
// Components
import PageTitle from "@/components/shared/PageTitle";
import pagination from "../../shared/components/pagination";
import confirmation from "../../shared/components/confirmation";
import TableFilters from "@/components/base/TableFilters";

import { required, email, max } from "vee-validate/dist/rules";
import { mapGetters } from "vuex";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import BrandAutoComplete from "@/components/base/BrandAutoComplete";
import CategoryAutoComplete from "@/components/base/CategoryAutoComplete";
import StatusAutoComplete from "@/components/base/StatusAutoComplete";

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

export default {
  data: () => ({
    paginationOptions: {},

    columns: [
      {
        text: "Image",
        value: "image",
        show: true,
        disabled: true,

        width: "14%",
      },
      {
        text: "Name",
        value: "name",
        align: "left",
        show: true,
        disabled: true,
        width: "14%",
      },
      {
        text: "Code",
        value: "code",
        show: true,
        disabled: false,
        width: "14%",
      },
      {
        text: "Category",
        value: "category",
        show: true,
        align: "left",
        disabled: false,
        width: "14%",
      },
      {
        text: "Brand",
        value: "brand",
        show: true,
        align: "left",
        disabled: false,
        width: "14%",
      },
      {
        text: "Status",
        value: "status",
        show: true,
        disabled: false,
        align: "center",
        width: "14%",
      },
      {
        text: "Actions",
        value: "action",
        show: true,
        disabled: false,
        align: "center",
        width: "14%",
      },
    ],
    products: [],
    // Filters
    filter: {
      category: "",
      search: "",
      brand: "",
      status: "",
    },
  }),
  components: {
    PageTitle,
    ValidationProvider,
    ValidationObserver,
    pagination,
    TableFilters,
  },

  methods: {
    setPaginationOptions(data) {
      this.paginationOptions = data;
    },
    refreshData() {
      this.$refs.pagination.refreshData();
    },

    setResponseData(productData) {
      this.products = productData;
      this.products.map((u) => {
        if (u.image) {
          u.image = u.image + "?t=" + new Date().getTime();
        }
      });
    },
    clearFilter() {
      this.filter = {};
    },
    getStatusColor(is_active) {
      return is_active ? "green" : "gray";
    },

    EditModal(item) {
      this.$router.push({ path: "/product/edit/" + item.id });
    },
  },
  computed: {
    ...mapGetters("product", ["GetAllProducts"]),
    // Filter - return selected table fields
    headers: function () {
      return this.columns.filter((item) => item.show == true);
    },
  },
};
</script>

<template>
  <div>
    <v-row>
      <v-col cols="12 py-0">
        <v-container fluid>
            <v-row>
            <v-col cols="12" class="d-flex justify-end">
              <permission-control permissionName="Batch Create">
                <v-btn
                  depressed
                  small
                  height="32"
                  class="btn_blue w-100"
                  @click.stop="OpenModal()"
                >
                  <v-icon class="icon_small ma-2">mdi-plus </v-icon>
                  Add
                </v-btn>
              </permission-control>
            </v-col>
          </v-row>
          <v-row>
            <!-- Data table -->
            <v-col cols="12">
              <v-data-table
                :items-per-page="paginationOptions.perPage"
                :headers="headers"
                :items="Saluations"
                hide-default-footer
              >

               <template v-slot:item.created_at="{ item }">{{
                  item.created_at | formatDate
                }}</template>
                <!-- Action -->
                <template v-slot:item.action="{ item }">
                   <list-menu
                    feature="category"
                    :item="item"
                    @refreshList="refreshData"
                    editPermission="Category Edit"
                    @onEditClicked="EditModal(item)"
                    :isEditModal="true"
                  ></list-menu>
                </template>
                <template v-slot:footer="{}">
             <pagination
                    @paginationOptions="setPaginationOptions"
                    :url="`salutations`"
                    @response="receiveSalutationsTypeData"
                    ref="pagination"
                    :filter="filter"
                  />
                </template>
              </v-data-table>
            </v-col>

            <v-row> </v-row>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
<Createsaluatation
      ref="Createsaluatation"
      :visible="isSaluatationFormVisible"
      @close="CloseModal($event)"
      @afterSave="refreshData()"
    />

    <Editsaluatation
      ref="Editsaluatation"
      :visible="isEditSaluatationFormVisible"
      :Salutation="Salutationdatas"
      @close="CloseEditModal($event)"
      @afterSave="refreshData()"
    />
    <!-- </v-container> -->
  </div>
</template>
<script>
import pagination from "../../../../../shared/components/pagination";
import Editsaluatation from "./EditSaluationComponent";
import Createsaluatation from "./CreateSaluationComponent";

export default {
  data: () => ({
    paginationOptions: {},
    messages: [],
    errors: [],
    Saluations: [],
      isSaluatationFormVisible: false,
    isEditSaluatationFormVisible: false,

    columns: [
      {
        text: "Name",
        value: "name",
        show: true,
        disabled: true,
        align: "left",
      },
      {
        text: "Created at",
        value: "created_at",
        show: true,
        disabled: false,
        align: "left",
      },
      {
        text: "Actions",
        value: "action",
        show: true,
        disabled: false,
        align: "left",
      },
    ],
  }),
  components: { Editsaluatation, pagination, Createsaluatation },
  filters: {},
  computed: {
    headers: function() {
      return this.columns.filter((item) => item.show == true);
    },
  },
  methods: {
    setPaginationOptions(data) {
      this.paginationOptions = data;
    },
    refreshData() {
      this.$refs.pagination.refreshData();
    },

    receiveSalutationsTypeData(data) {
      this.Saluations = data;
    },
    OpenModal() {
      this.isSaluatationFormVisible = true;
    },
    CloseModal($event) {
      this.isSaluatationFormVisible = false;
    },
    EditModal(data) {
      this.isEditSaluatationFormVisible = true;

      this.GetSaluatationSingle(data.id);
    },
      CloseEditModal($event) {
      this.isEditSaluatationFormVisible = false;
    },
    GetSaluatationSingle(id) {
      this.$store
        .dispatch(`system/GetSinleSaluatation`, id)
        .then((res) => {
          this.Salutationdatas = res.data.data;

          this.refreshData();

          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.messages = err.data.title;
        });
    },

    GetSalutations() {
      this.$store
        .dispatch("GetSaluations")
        .then((res) => {
          this.Saluations = res.data.data;
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.GetSalutations();
  },
};
</script>

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
                :items="EventsData"
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
                    :url="`event-types`"
                    @response="receiveEventsTypeData"
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
    <CreateEventType
      ref="CreateEventTypeType"
      :visible="EventTypeFormVisible"
      @close="CloseModal($event)"
      @afterSave="refreshData()"
    />
    <EditEventType
      ref="EditEventType"
      :visible="isEditEventTypeFormVisible"
      :Event="EventTypedatas"
      @close="CloseEditModal($event)"
      @afterSave="refreshData()"
    />
    <!-- </v-container> -->
  </div>
</template>
<script>
import pagination from "../../../../../shared/components/pagination";
import EditEventType from "./EditEventTypeComponent";
import CreateEventType from "./CreateEventTypeComponent";
export default {
  data: () => ({
    paginationOptions: {},
    messages: [],
    errors: [],
    EventTypeFormVisible: false,
    isEditEventTypeFormVisible: false,
    EventsData: [],

    columns: [
      {
        text: "Name",
        value: "name",
        show: true,
        disabled: true,
        align: "left",
      },
      {
        text: "Code ",
        value: "code",
        show: true,
        disabled: false,
        align: "left",
      },
      {
        text: "Description",
        value: "description",
        show: true,
        disabled: true,
        align: "left",
      },
      {
        text: "Holiday ",
        value: "is_holiday",
        show: true,
        disabled: false,
        align: "left",
      },
      {
        text: "Color",
        value: "color",
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
 components: { CreateEventType, pagination, EditEventType },

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

    receiveEventsTypeData(data) {
      this.EventsData = data;
    },
    OpenModal() {
      this.EventTypeFormVisible = true;
    },
    CloseModal($event) {
      this.EventTypeFormVisible = false;
    },

    EditModal(data) {
      this.isEditEventTypeFormVisible = true;

      this.GetEventTypeSingle(data.id);
    },
    CloseEditModal($event) {
      this.isEditEventTypeFormVisible = false;
    },
    GetEventTypeSingle(id) {
      this.$store
        .dispatch(`system/GetSingleEventType`, id)
        .then((res) => {
          this.EventTypedatas = res.data.data;

          this.refreshData();

          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.messages = err.data.title;
        });
    },
    GetEventTypes() {
      this.$store
        .dispatch("event/GetEventType")
        .then((res) => {
          this.EventsData = res;
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.refreshData();
  },
};
</script>

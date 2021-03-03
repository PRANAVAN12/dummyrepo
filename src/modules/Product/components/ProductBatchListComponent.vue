<template>
  <v-container>
    <v-row>
      <v-col>
        <!-- Page Title -->
        <PageTitle title="Batch List" :hasBreadcrumbs="false" />
      </v-col>
      <v-col class="text-right ma-auto">
        <v-btn
          depressed
          small
          height="32"
          class="text-white btn_blue btn_large w-100"
          @click.stop="OpenModal()"
        >
          <v-icon class="icon_small ma-2">mdi-plus</v-icon>Add
        </v-btn>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              depressed
              small
              height="32"
              class="ml-2 text-white secondary btn_large w-100"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon class="icon_small ma-2">mdi-apps</v-icon>Actions
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
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="lighten-12 card-content">
          <v-row class="ma-0 align-right">
            <v-col class="pr-1 text-right" xs="12" sm="12" md="2" lg xl="2">
              <!-- Date Range -->
              <v-menu
                ref="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
                dense
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    dense
                    outlined
                    hide-details="auto"
                    v-model="dateRangeText"
                    label="Date Range"
                    persistent-hint
                    prepend-icon
                    v-bind="attrs"
                    v-on="on"
                    clearable
                    @click:clear="
                      (date_range = []),
                        (filter.start = null),
                        (filter.end = null)
                    "
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date_range" range></v-date-picker>
              </v-menu>
            </v-col>

            <v-col
              class="ma-auto pr-6 text-left"
              v-if="filter.amount || filter.supplier"
            >
              <v-btn icon small @click="clearFilter">
                <v-icon small>mdi-close</v-icon>
              </v-btn>
            </v-col>
            <v-col class="pr-6 text-right"></v-col>
            <v-col class="pr-3 text-right" sm="12" md="3" xl="2" lg="12">
              <v-text-field
                hide-details="auto"
                v-model="filter.search"
                dense
                outlined
                placeholder="Search"
                append-icon="mdi-magnify"
              ></v-text-field>
            </v-col>
            <TableHeaderFilter :columns="columns" />
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="batchheaders"
          :items="productDetails.batches"
          item-key="id"
          hide-default-footer


        >
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
              :color="getStatusColor(item.status)"
              dark
              >{{ item.status }}</v-chip
            >
          </template>
          <template v-slot:footer="{}">
            <paginationComponent
              :url="'products/' + Product.id + '/batches'"
              @response="receiveBatchResponse"
              ref="pagination"
              :filter="filter"
            />
          </template>

          <!-- Action -->
          <template v-slot:item.action="{ item }">
            <v-menu  offset-y transition="scroll-y-transition" >
              <template v-slot:activator="{ attrs, on }">
                <v-icon v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
              </template>
              <v-list class="actions">
                <v-list-item @click="deleteBatch(item)">
                  <span>
                    <v-icon v-bind="attrs" v-on="on">mdi-archive</v-icon>
                    delete</span
                  >
                </v-list-item>
                <v-list-item @click="editBatch(item)">
                  <span>
                    <v-icon v-bind="attrs" v-on="on"
                      >mdi-pencil-box-outline</v-icon
                    >
                    Edit</span
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {

}
</script>

<template>
  <div class="FileLists">
    <div class="itemDetails" v-for="(item, index) in data" :key="index">
      <v-row :style="'background:' + (index % 2 == 1 ? '#f7f7f7' : 'white')">
        <v-col xs="1" sm="1" md="1" lg="1" xl="1" style="text-align:right" class="pa-0">
          <img class="item_image" src="../../assets/file.png" />
        </v-col>
        <v-col xs="12" sm="2" md="2" lg="3" xl="2" class="pa-0">
          <div><small>{{ item.name }}</small></div>
        </v-col>
        <v-col xs="12" sm="1" md="1" lg="1" xl="2" class="pa-0 ">
          <div class="itemDetails"><small>{{ item.size | bytesToSize }}</small></div>
        </v-col>
        <v-col xs="12" sm="3" md="3" lg="3" xl="3" class="py-0 px-1">
          <div class="itemDetails "><small>{{ item.mime }}</small></div>
        </v-col>
        <v-col xs="12" sm="4" md="3" lg="4" xl="3" class="pa-0">
          <v-row >
            <v-col cols="4" class="py-0 px-1">
              <v-btn
                @click="viewFile(item.id)"
                depressed
                block
                x-small
                color="blue"
              >
                <v-icon color="white" small>mdi-eye</v-icon> 
              </v-btn>
              
              <p class="text-center"><small>View</small></p>
              
            </v-col>
            <v-col cols="4" class="py-0 px-1">
              <v-btn
                @click="downloadFile(item.id)"
                depressed
                block
                x-small
                color="green"
              >
                <v-icon small color="white">mdi-download</v-icon>
              </v-btn>
              
              <p class="text-center"><small>Download</small></p>
              
            </v-col>
            <v-col cols="4" class="py-0 px-1">
              <v-btn 
                @click="removeConfirm(item.id)"
                depressed
                block
                x-small
                 color="red"
                 
              >
                <v-icon small color="white">mdi-delete</v-icon> 
              </v-btn>
              <p class="text-center"><small>Delete</small></p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>

    <!-- Remove Confirmation Modal -->
    <v-dialog v-model="confirmModal" persistent max-width="280">
      <v-card>
        <v-card-title 
          >Do you want to delete this file?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="remove()">Remove</v-btn>
          
          <v-btn color="red darken-1" text @click="confirmModal = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Remove Confirmation Modal -->
  </div>
</template>

<script>
import axios from "@/plugins/axios";
export default {
  name: "Document View",
  data() {
    return {
      confirmModal: false,
      delete_id: "",
    };
  },
  props: {
    url: {
      type: String,
      default: "",
    },
    removeUrl: {
      type: String,
      default: "",
    },
    downloadUrl: {
      type: String,
      default: "",
    },
    data: {
      type: Array,
      default: [],
    },
    refresh: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    // refresh: {
    //   deep: true,
    //   handler: function() {
    //     console.log("Document view Refresh --------------", this.refresh);
    //     if (this.refresh) {
    //       this.fetchDocuments();
    //       this.refresh = false;
    //     }
    //   },
    // },
  },
  methods: {
    fetchDocuments() {
      axios
        .get(this.url)
        .then((res) => {
          if (res.data.data) {
            this.data = res.data.data;
          } else {
            this.data = res.data;
          }
        })
        .catch((err) => {
          this.data = [];
        });
    },
    removeConfirm(id) {
      this.confirmModal = true;
      this.delete_id = id;
    },
    remove() {
      this.confirmModal = false;
      axios
        .delete(this.removeUrl.replace(":id", this.delete_id))
        .then((res) => {
          this.fetchDocuments();
        })
        .catch((err) => {});
    },
    downloadFile(index) {
      axios
        .get(this.downloadUrl.replace(":id", index))
        .then((res) => {
          if (res.data.data) {
            window.open(res.data.data, "_blank");
          }
        })
        .catch((err) => {});
    },
    viewFile(index) {
      axios
        .get(this.downloadUrl.replace(":id", index))
        .then((res) => {
          if (res.data.data) {
            window.open(res.data.data, "_blank");
          }
        })
        .catch((err) => {});
    },
  },
  created: function() {
    this.fetchDocuments();
  },
  filters: {
    bytesToSize(bytes) {
      const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      if (bytes === 0) return "n/a";
      let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      if (i === 0) return bytes + " " + sizes[i];
      return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
    },
  },
};
</script>

<style>
.FileLists {
  max-height: 232px;
  overflow: scroll;
  overflow-x: hidden;
  width: 100%;
  margin: auto;
  padding: 0 20px;
}
.itemDetails .item_image {
  height: 20px;
  filter: contrast(2);

}

.itemDetails{
  font-size: 11px !important;
}
</style>

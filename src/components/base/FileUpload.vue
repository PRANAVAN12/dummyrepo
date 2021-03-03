<template>
  <div class="uploadBox">
    <v-row
      v-if="title != null"
      align="center"
      justify="center"
      class="ma-0 py-0"
    >
      <v-col cols="12 px-0 pt-0">
        <v-card-title>
          {{ title }}
          <v-col
            class="ma-0 pa-0 text-right"
            v-if="camera && itemsPreviews.length == 0"
          >
            <v-tooltip v-model="show" top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="white"
                  fab
                  depressed
                  small
                  @click="enableDisableCamera"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon small color="blue" v-if="!cameraEnabled"
                    >mdi-camera</v-icon
                  >
                  <v-icon small color="blue" v-if="cameraEnabled"
                    >mdi-image-multiple</v-icon
                  >
                </v-btn>
              </template>
              <span>Camera</span>
            </v-tooltip>
          </v-col></v-card-title
        >
      </v-col>
    </v-row>
    <!-- Document View -->
    <v-row>
      <DocumentView
        v-if="showDocumentView"
        :url="documentsUrl"
        :downloadUrl="downloadUrl"
        :removeUrl="removeUrl"
        ref="documentView"
      />
    </v-row>
    <!-- Document View -->

    <form role="form" enctype="multipart/form-data" @submit.prevent="onSubmit">
      <!-- {{itemsPreviews}} -->
      <!-- Single Image and Multi Images Preview -->
      <v-row>
        <v-col
          v-if="showPreview"
          class="preview_wrap text-center"
          v-for="(image, index) in itemsPreviews"
          :key="index"
        >
          <v-img v-if="!multiple" :src="image" :height="ContainerHeight" class="rounded">
            <v-layout column class="media ma-0">
              <v-card-title>
                <v-spacer></v-spacer>
                <v-btn
                  color="white"
                  fab
                  small
                  @click="enableDisableCamera"
                  class="mr-2"
                >
                  <v-icon v-if="!cameraEnabled" small color="blue">
                    mdi-camera
                  </v-icon>
                  <v-icon v-if="cameraEnabled" small color="blue">
                    mdi-image-multiple
                  </v-icon>
                </v-btn>
                <v-btn fab small color="white">
                  <v-icon @click="removeItem(index)" color="red">
                    mdi-delete
                  </v-icon>
                </v-btn>
              </v-card-title>
            </v-layout>
          </v-img>
          <div
            v-else-if="multiple"
            :style="'background-image:url(' + image + ')'"
            class="img_pre"
          >
            <v-btn color="white" fab small dark>
              <v-icon large @click="removeItem(index)" color="black"
                >mdi-delete</v-icon
              >
            </v-btn>
          </div>
          <v-img
            v-else-if="image"
            src="../../assets/img/svg/empty.svg"
            height="400"
            class="rounded"
          >
            <v-layout column class="media ma-0">
              <v-card-title>
                <v-spacer></v-spacer>
                <v-btn color="white" fab small dark>
                  <v-icon large @click="removeItem(index)" color="black"
                    >mdi-delete</v-icon
                  >
                </v-btn>
              </v-card-title>
            </v-layout>
          </v-img>
        </v-col>
      </v-row>
      <div
        class="uploadBoxMain"
        v-if="(itemsPreviews.length == 0 || multiple) && !cameraEnabled"
      >
        <div class="form-group text-align">
          <div
            class="dropArea"
            @ondragover="onChange"
            :class="dragging ? 'dropAreaDragging' : ''"
            @dragenter="dragging = true"
            @dragend="dragging = false"
            @dragleave="dragging = false"
          >
            <v-icon v-if="!loading" x-large>{{ icon }}</v-icon>
            <h3 v-if="!loading">{{ dropAreaPrimaryMessage }}</h3>
            <!--  Input for Multiple file upload  -->
            <input
              v-if="!loading && multiple"
              type="file"
              id="items"
              name="items[]"
              required
              multiple
              @change="onChange"
            />
            <!--  Input for Single file upload  -->
            <input
              v-if="!loading && !multiple"
              type="file"
              id="items"
              name="items[]"
              required
              :accept="accept"
              @change="onChange"
            />
            <h4 v-if="!loading" class="help-block">
              {{ dropAreaSecondaryMessage }}
            </h4>
            <h3 v-if="!loading">{{ dropArea2PrimaryMessage }}</h3>

            <!-- Loading -->
            <v-progress-circular
              :size="50"
              color="primary"
              class="mt-5"
              indeterminate
              v-if="loading"
            ></v-progress-circular>
            <!-- Loading -->
          </div>
        </div>
      </div>
      <div class="" v-if="itemsAdded">
        <!-- <button @click="removeAllItems">{{ removeFileMessage }}</button> -->
        <div class="loader" v-if="isLoaderVisible">
          <div class="loaderImg"></div>
        </div>
      </div>

      <div class="FileList" v-if="showList">
        <div class="itemDetails" v-for="(name, index) in files" :key="index">
          <v-row>
            <v-col>
              <img class="item_image" src="../../assets/file.png" />
            </v-col>
            <v-col>
              <div class="">{{ itemsNames[index] }}</div>
            </v-col>
            <v-col>
              <div class="itemDetails">{{ itemsSizes[index] }}</div>
            </v-col>
            <v-col>
              <v-btn @click="removeItem(index)" depressed small>Remove</v-btn>
            </v-col>
          </v-row>
          <hr />
        </div>
      </div>

      <div class="errorMsg">
        {{ errorMsg }}
      </div>
      <!-- <p v-if="itemsNames.length != 0">
        <strong>{{ totalUploadSizeMessage }}</strong> {{ itemsTotalSize }}
      </p> -->
    </form>

    <!-- Camera -->
    <div
      v-if="(itemsPreviews.length == 0 || multiple) && cameraEnabled"
      class="text-center"
    >
      <div class="camera">
        <vue-web-cam
          selectFirstDevice="true"
          screenshotFormat="image/jpeg"
          ref="webcam"
          height="250"
          resolution="1024"
        />
        <v-btn
          color="white"
          fab
          small
          @click="takePhoto"
          class="btn_take_photo"
        >
          <v-icon small color="blue">mdi-camera</v-icon>
        </v-btn>
      </div>
    </div>
    <!-- Camera End -->
    <!-- {{externalFiles}} -->
  </div>
</template>

<script>
require("es6-promise").polyfill();
import axios from "@/plugins/axios";
import DocumentView from "@/components/base/DocumentView";
export default {
  name: "File Upload",
  props: {
    // Additional Props for Document View
    showDocumentView: {
      type: Boolean,
      default: false,
    },
    documentsUrl: {
      type: String,
      default: "",
    },
    downloadUrl: {
      type: String,
      default: "",
    },
    removeUrl: {
      type: String,
      default: "",
    },
    // Pros for FileUpload
    icon: {
      type: String,
      default: "mdi-cloud-upload-outline",
    },

  
    multiple: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
    },
    // Size in kilobytes
    size: {
      type: Number,
      default: 0,
    },
    types: {
      type: Array,
      default: [],
    },
    accept: {
      type: String,
      default: "",
    },
    autoupload: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
      default: "",
    },
    showList: {
      type: Boolean,
      default: false,
    },
    showPreview: {
      type: Boolean,
      default: false,
    },
    dropAreaPrimaryMessage: {
      type: String,
      default: function() {
        if (this.multiple) return "Drop multiple files here";
        else return "Drop your file here";
      },
    },

    dropAreaSecondaryMessage: {
      type: String,
      default: "or ",
    },
      ContainerHeight: {
      type: Number,
      default: 400,
    },
    
    dropArea2PrimaryMessage: {
      type: String,
      default: "Click to upload",
    },

    totalUploadSizeMessage: {
      type: String,
      default: "Total upload size:",
    },
    removeFileMessage: {
      type: String,
      default: "Remove files",
    },
    fileSizeExceededMessage: {
      type: String,
      default: function() {
        if (this.multiple) {
          return "Some of your file size exceeded";
        } else {
          return "File size exceeded";
        }
      },
    },
    fileTypeNotAcceptableMessage: {
      type: String,
      default: function() {
        if (this.multiple) {
          return "Some of your file type not acceptable";
        } else {
          return "File type not acceptable";
        }
      },
    },
    fileAlreadyAddedMessaage: {
      type: String,
      default: function() {
        if (this.multiple) {
          return "This file was already added";
        } else {
          return "Already Added";
        }
      },
    },

    // usage of camera
    camera: {
      type: Boolean,
      default: false,
    },
    externalFiles: {
      type: Array,
      default: [],
    },
  },
  /*
   * The component's data.
   */
  data() {
    return {
      loading: false,
      cameraEnabled: false,
      dragging: false,
      files: [],
      items: [],
      itemsAdded: "",
      itemsNames: [],
      itemsPreviews: [],
      itemsSizes: [],
      itemsTotalSize: "",
      formData: "",
      successMsg: "",
      errorMsg: "",
      isLoaderVisible: false,
      imageTypes: ["jpeg", "png"],

      // Loading
      loading: false,
      uplodingSuccessMessage: "",

      photo: "",
    };
  },
  mounted: function() {
    this.GetImage();
  },
  created() {
    // if (this.externalFiles.length != 0) {
    //     this.itemsPreviews = this.externalFiles;
    //   } else if (this.externalFiles.length == 0) {
    //     this.itemsPreviews = [];
    //   }
  },
  methods: {
    GetImage() {
      debugger
      setTimeout(() => {
        if (this.externalFiles.length != 0) {
          this.itemsPreviews = this.externalFiles;
        } else if (this.externalFiles.length == 0) {
          this.itemsPreviews = [];
        }
      }, 500);
    },
    async dataURLtoFile(dataUrl, filename = "image") {
      return new Promise(async (resolve, reject) => {
        const res = await fetch(dataUrl);
        const blob = await res.blob();

        var file = new File([blob], filename, { type: "image/jpeg" });
        // return file;
        resolve(file);
      });
    },
    enableDisableCamera() {
      this.cameraEnabled = !this.cameraEnabled;
      this.itemsPreviews = [];
      if (this.cameraEnabled) this.$refs.webcam.start();
      else this.$refs.webcam.stop();
    },
    takePhoto() {
      // Captured Image - Base64
      var photo = this.$refs.webcam.capture();

      // Captured Image - Converted to File Object
      this.dataURLtoFile(photo).then((file) => {
        if (this.multiple) {
          this.removeAllItems();
        }

        if (this.multiple) {
          this.itemsPreviews.push(photo);
        } else {
          this.itemsPreviews = [];
          this.itemsPreviews.push(photo);
        }

        this.items.push(file);
        this.files.push(file);
        this.itemsNames.push(file.name);
        this.itemsSizes.push(file.size);
        this.itemsTotalSize = this.itemsTotalSize + this.bytesToSize(file.size);
        this.itemsAdded = this.files.length;
        this.emit();
        this.$emit("isImageUpdated", true);
      });
    },
    refreshDocumentView() {
      this.$refs.documentView.fetchDocuments();
    },
    UploadFiles() {
      var self = this;

      this.loading = true;
      let formData = new FormData();
      for (let x = 0; x < this.files.length; x++) {
        formData.append("image", this.files[x]);
      }
      axios
        .post(this.url, formData)
        .then((res) => {
          setTimeout(function() {
            self.loading = false;
          }, 500);

          this.files = [];
          this.refreshDocumentView();
        })
        .catch((err) => {
          this.loading = false;
          this.refreshDocumentView();
        });
    },
    bytesToSize(bytes) {
      const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      if (bytes === 0) return "n/a";
      let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      if (i === 0) return bytes + " " + sizes[i];
      return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
    },
    encodeImageToBase64(file, views) {
      var base64;
      this.readBase64(file, function(value) {
        base64 = value;
        // console.log(base64);
        views.push(base64);
      });
    },
    readBase64(file, callBack) {
      // var file = element.files[0];

      // var setValue=function(value){
      //   base64=value
      // }
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        // console.log(reader.result);
        callBack(reader.result);
        // base64 = reader.result;
      };
      reader.onerror = function(error) {
        console.log("Error: ", error);
      };

      // return base64;
    },
    isAlreadyHave(file) {
      return (
        this.files.filter(
          (item) => item.name == file.name && item.size == file.size
        ).length > 0
      );
    },
    sortFileType(filetype) {
      var sorted;
      switch (filetype) {
        case "image/jpeg":
          sorted = "jpeg";
          break;
        case "image/png":
          sorted = "png";
          break;
        case "application/pdf":
          sorted = "pdf";
          break;
        case "application/msword":
          sorted = "docx";
          break;
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          sorted = "docx";
          break;
      }
      return sorted;
    },
    onChange(e) {
      this.successMsg = "";
      this.errorMsg = "";
      this.formData = new FormData();
      let files = e.target.files || e.dataTransfer.files;

      if (files.length == 0) return;
      if (!this.multiple) {
        this.removeAllItems();
      }

      this.itemsAdded = files.length;
      let fileSizes = 0;

      for (let x in files) {
        if (!isNaN(x)) {
          this.items = e.target.files[x] || e.dataTransfer.files[x];
          if (
            this.types.includes(this.sortFileType(files[x].type)) ||
            this.types.length == 0
          ) {
            // Checking file which is already added
            if (this.isAlreadyHave(files[x]) && this.multiple) {
              this.errorMsg = this.fileAlreadyAddedMessaage;
              return;
            }

            if (files[x].size / 1024 <= this.size || this.size == 0) {
              // Base64 Conversion - if file type is related with IMAGE
              if (this.imageTypes.includes(this.sortFileType(files[x].type))) {
                this.encodeImageToBase64(files[x], this.itemsPreviews);
                // setTimeout(() => {
                //   this.itemsPreviews.push(base64);
                // }, 2000);
              }
              this.itemsNames.push(files[x].name);
              this.itemsSizes.push(this.bytesToSize(files[x].size));
              fileSizes += files[x].size;
              this.formData.append("items[]", this.items);
              this.files.push(this.items);
            } else {
              this.errorMsg = this.fileSizeExceededMessage;
            }
          } else {
            this.errorMsg = this.fileTypeNotAcceptableMessage;
          }
        }
      }
      this.$emit("isImageUpdated", true);

      this.itemsTotalSize = this.bytesToSize(fileSizes);
      this.emit();
    },
    removeItem(index) {
      console.log('removedd',index)
      if (this.items) this.items = "";
      if (this.files.length != 0) this.files.splice(index, 1);
      if (this.itemsNames.length != 0) this.itemsNames.splice(index, 1);
      if (this.itemsPreviews.length != 0) this.itemsPreviews.splice(index, 1);
      if (this.itemsSizes.length != 0) this.itemsSizes.splice(index, 1);
      if (this.itemsTotalSize.length != 0) this.itemsTotalSize--;
      this.$emit("isRemoved", true);
      this.$emit("isImageUpdated", false);

      this.emit();
    },
    removeAllItems() {
      this.items = [];
      this.files = [];
      this.itemsAdded = "";
      this.itemsNames = [];
      this.itemsPreviews = [];
      this.itemsSizes = [];
      this.itemsTotalSize = "";
      this.dragging = false;
      this.emit();
    },
    emit() {
      if (this.multiple) {
        if (this.autoupload) {
          this.UploadFiles();
        } else {
          this.$emit("input", this.files);
        }
      } else if (this.files.length == 1) {
        if (this.autoupload) {
          this.UploadFiles();
        } else {
          this.$emit("input", this.files[0]);
        }
      } else {
        this.$emit("input", []);
      }
    },
  },
  components: {
    DocumentView,
  },
};
</script>

<style>
.uploadBox {
  position: relative;
  /* background: #eee; */
  /* padding: 0 1em 1em 1em; */
  /* margin: 1em; */
  width: 100%;
}
.uploadBox h5 {
  padding-top: 1em;
  text-align: left;
  font-size: 13px;
  margin-bottom: 8px;
}
.uploadBox .uploadBoxMain {
  position: relative;
  /* margin-bottom: 1em; */
  /* margin-right: 1em;
  margin-left: 1em; */
  border: 2px dashed #cfd0d4;
  background-color: #ebf0ff5e;
  border-radius: 10px;
}
/* .uploadBox .uploadBoxMain:hover {
} */
.dropAreaDragging {
  background: #ebf0ff;
}
.uploadBox hr {
  border-top: 1px solid #e4e4e499;
  margin: 0 47px;
}
/* Drag and drop */
.uploadBox .dropArea {
  position: relative;
  width: 100%;
  height: 150px;
  /* border: 2px dashed #cfd0d4; */
  text-align: center;
  font-size: 0.9em;
  padding-top: 30px;
}
.uploadBox .dropArea input {
  position: absolute;
  cursor: pointer;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
/* End drag and drop */
/* Loader */
.uploadBox .loader {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  opacity: 0.9;
}
.uploadBox .loaderImg {
  border: 9px solid #eee;
  border-top: 9px solid #00adce;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
/* End Loader */
.errorMsg {
  font-size: 0.9em;
  color: #a94442;
}

.uploadBox .successMsg {
  font-size: 2em;
  color: #3c763d;
}
.FileList {
  max-height: 232px;
  overflow: scroll;
  /* padding: 12px; */
  overflow-x: hidden;
}
.itemDetails .item_image {
  height: 20px;
  filter: contrast(2);
}
.preview_wrap {
  display: flex;
}
.preview_wrap img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}
.img_preview img {
  width: 100%;
  height: auto;
}
.img_details_chip {
  top: -45px;
}
.img_pre {
  border-radius: 10px;
  background-size: cover;
  height: 65px;
  width: 100px;
  margin: 2px;
}
.btn_take_photo {
  top: -45px !important;
}
</style>

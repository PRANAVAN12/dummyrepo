<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="600px">
      <custom-modal
        title="Create Brand"
        @onSubmit="saveBrand"
        @onClose="show = false"
        :isLoading="isLoading"
      >
        <ValidationObserver ref="observer" v-slot="{ validate, reset }">
          <v-row>
            <v-col cols="12" sm="12" md="12" lg="12">
              <ValidationProvider
                v-slot="{ errors }"
                name="Name"
                vid="name"
                :bails="false"
                rules="required|min:3"
              >
                <v-text-field
                hide-details="auto"
                  :error-messages="errors"
                  required
                  v-model="newbrand"
                  label="Name"
                  auto-grow
                  outlined
                  dense
                ></v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12 p-0">
              <FileUpload
                v-if="show"
                ref="fileUpload"
                title="Image"
                :multiple="false"
                v-model="selectedImages"
                size="2048"
                :types="['jpeg', 'png', 'jpg']"
                :showPreview="true"
                :camera="true"
              />
            </v-col>
          </v-row>
        </ValidationObserver>
      </custom-modal>
    </v-dialog>
  </v-row>
</template>
<script>
import FileUpload from "@/components/base/FileUpload";

import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

extend("min", (value) => {
  if (value.length >= 3) {
    return true;
  }
  return "Please enter above three characters";
});

export default {
  data: () => ({
    selectedImages: "",
    show: false,
    newbrand: null,
    brand: {
      brandname: "",
    },

    ParentProductCategories: [],
    value: [],
    options: [],
    isLoading: false,
  }),

  name: "AddCategory",
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
    productcategory: {
      type: Object,
      default: {},
    },
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    FileUpload,
  },

  methods: {
    async saveBrand() {
      const isValid = await this.$refs.observer.validate();

      if (isValid) {
        this.isLoading = true;
        this.CreateBrand();
      }
    },
    openModal() {
      this.show = true;
    },
    CreateBrand() {
      let brandname = this.newbrand;
      this.$store
        .dispatch("brand/CreateBrand", { name: brandname })
        .then(async (res) => {
          this.$toast.success("Brand created  succesfully");
          await this.UploadImage(res.data.id)
            .then((res) => {
              this.succeeed = true;
            })
            .catch((err) => {
              this.$toast.error("Brand image upload failed");
              this.isLoading = false;
            });
          this.newbrand = null;
          this.selectedImages = null;
          this.show = false;
          this.$emit("afterSave");
          this.isLoading = false;
     
          this.$refs.observer.reset();
        })
        .catch((err) => {
          this.$refs.observer.setErrors(err.data.error);
          this.$toast.error("Brand created  failed");
          this.messages = err.data.title;
          this.isLoading = false;
        });
    },

    async UploadImage(id) {
      let formData = new FormData();
      formData.append("image", this.selectedImages);
      formData.append("id", id);
      console.log(this.selectedImages);
      return await this.$store.dispatch(
        "product/UploadProductBrandImage",
        formData
      );
    },
  },
};
</script>

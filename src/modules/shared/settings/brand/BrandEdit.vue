<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="600px">
      <custom-modal
        title="Edit Brand"
        @onSubmit="saveBrand"
        @onClose="show = false"
        :isLoading="isLoading"
      >
        <ValidationObserver ref="observer" v-slot="{ validate, reset }">
          <v-row>
            <v-container fluid>
            <v-col cols="12 pb-0">
              <ValidationProvider
                v-slot="{ errors }"
                vid="name"
                name="Name"
                :bails="false"
                rules="required|min:3"
              >
                <v-text-field
                hide-details="auto"
                  :error-messages="errors"
                  required
                  v-model="productBrand.name"
                  label="Name"
                  auto-grow
                  outlined
                  dense
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            </v-container>
          </v-row>

          <v-row>
            <v-col cols="12 pb-0">
              <v-flex class="pt-0 pa-3">
                <FileUpload
              
                  title="Image"
                  :multiple="false"
                  v-model="selectedImages"
                  :externalFiles="
                    productBrand.image ? [productBrand.image] : []
                  "
                  @isImageUpdated="onChangeImageUpload"
                  size="2048"
                  :types="['jpeg', 'png']"
                   ref="imageInput"
                  :showPreview="true"
                />
              </v-flex>
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
    brand: {
      brandname: "",
    },
    ParentProductCategories: [],
    value: [],
    productBrand: new Object(),
    options: [],
    isLoading: false,
       imageUpdated: null,
  }),

  name: "AddCategory",
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
    productBrand: {
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
     onChangeImageUpload(value) {
      this.imageUpdated = value;
    },
    async saveBrand() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.EditProductBrand();
      }
    },

    EditProductBrand() {
      this.isLoading = true;
      const credential = this.productBrand;
      this.$store
        .dispatch("product/EditProductBrand", credential)
        .then(async (res) => {
          this.show = false;
          await this.UploadImage(credential.id)
            .then((res) => {
              this.succeeed = true;
            })
            .catch((err) => {
              this.messages = err.data.title;
              this.isLoading = false;
              this.$toast.error("Brand image upload failed");
            });

          this.succeeed = true;
          this.$emit("afterSave");
          this.$toast.success("Brand edited  successfully");
         
          this.show = false;
          this.isLoading = false;
        })
        .catch((err) => {
          this.$refs.observer.setErrors(err.data.error);
          this.messages = err.data.title;
          this.$toast.error("Brand edited  failed");
          this.isLoading = false;
        });
    },
    openModal() {
      this.show = true;
      this.$refs.imageInput.GetImage();
    },

    async UploadImage(id) {

      let formData = new FormData();
      if (this.selectedImages && this.imageUpdated) {
        formData.append("image", this.selectedImages);
          formData.append("id", this.productBrand.id);
        return await this.$store.dispatch(
          "product/UploadProductBrandImage",
          formData
        ).then((res) => {
         console.log("dsgyfcdsgyfc");
        })
        .catch((err) => {
          
         console.log("dsgyfcdsgyfc");

        });
      } else if (this.imageUpdated == false) {
        formData.append("image", null);
        formData.append("id", this.productBrand.id);
        return await this.$store.dispatch(
          "product/UploadProductBrandImage",
          formData
        );
      } else {
        return true;
      }
      
    },
  },
};
</script>

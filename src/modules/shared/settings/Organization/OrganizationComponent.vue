<template>
  <div>
    <PageTitle title="Organization" />
    <v-container fluid class="lighten-12 pt-0">
      <ValidationObserver ref="observer">
        <v-row>
          <v-col cols="12" lg="8" md="8" sm="12">
            <v-row>
              <v-col cols="12">
                <v-card class="lighten-12">
                  <v-container fluid>
                    <v-row>
                      <v-col cols="12" lg="6" md="12" sm="12">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Name"
                          rules="required"
                        >
                          <v-text-field
                            v-model="organization.name"
                            dense
                            :error-messages="errors"
                            outlined
                            required
                            hide-details="auto"
                            label="Name"
                          ></v-text-field> </ValidationProvider
                      ></v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" lg="6" md="12" sm="12">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Phone Number"
                          rules="required"
                        >
                          <v-text-field
                            v-model="organization.phone_number"
                            dense
                            :error-messages="errors"
                            outlined
                            required
                            hide-details="auto"
                            label="Phone Number"
                          ></v-text-field> </ValidationProvider
                      ></v-col>

                      <v-col cols="12" lg="6" md="12" sm="12">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Tele Phone"
                          rules="required"
                        >
                          <v-text-field
                            v-model="organization.Tel_phone_number"
                            label="Tele Phone"
                            hide-details="auto"
                            dense
                            outlined
                            :error-messages="errors"
                            required
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" lg="6" md="12" sm="12">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Website"
                          rules="required"
                        >
                          <v-text-field
                            v-model="organization.website"
                            label="Website"
                            hide-details="auto"
                            dense
                            outlined
                            :error-messages="errors"
                            required
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" lg="6" md="12" sm="12">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Email"
                          rules="required|email"
                        >
                          <v-text-field
                            v-model="organization.email"
                            dense
                            outlined
                            :error-messages="errors"
                            required
                            hide-details="auto"
                            label="Email"
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" lg="12" md="12" sm="12">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Address"
                          rules="required"
                        >
                          <v-textarea
                            rows="3"
                            outlined
                            v-model="organization.address"
                            hide-details
                            label="Address"
                            :error-messages="errors"
                            required
                          ></v-textarea>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" lg="4" md="4" sm="12">
            <v-row>
              <v-col cols="12">
                <v-card class="lighten-12">
                  <v-container fluid>
                    <v-flex class="pt-0 pa-3">
                      <FileUpload
                        title="Site logo"
                        ref="fileUpload"
                        :multiple="false"
                        v-model="selectedImages"
                        @isImageUpdated="onChangeImageUpload"
                        :externalFiles="
                          organization.image ? [organization.image] : []
                        "
                        size="2048"
                        :types="['jpeg', 'png', 'jpg']"
                        :showPreview="true"
                        :camera="true"
                      />
                    </v-flex>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="content-flex-end" cols="12">
            <btn-cancel></btn-cancel>
            <v-btn
              depressed
              small
              class="text-white btn_blue btn_medium w-100"
              @click="submit()"
              >Update</v-btn
            >
          </v-col>
        </v-row>
      </ValidationObserver>
    </v-container>
  </div>
</template>

<script>
import FileUpload from "@/components/base/FileUpload";

import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

export default {
  data: () => ({
    updatedImage: null,
    selectedImages: "",
    organization: {
      id: "",
      name: "",
      phone_number: "",
      email: "",
      Tel_phone_number: "",
      address: "",
      website: "",
    },
  }),
  components: {
    ValidationProvider,
    ValidationObserver,
    FileUpload,
  },
  methods: {
    onChangeImageUpload(value) {
      this.updatedImage = value;
    },
    submit() {
      const isValid = this.$refs.observer.validate();
      if (isValid) {
        this.OrganizationSettings();
      }
    },
    OrganizationSettings() {
      debugger;
      this.isLoading = true;
      const credentials = this.organization;
      delete credentials.image;
      this.$store
        .dispatch("sitesetting/EditOrganization", credentials)
        .then(async (res) => {
          await this.uploadImage(1);
          this.succeeed = true;
          this.em;
          this.$router.push({ path: "/" });
          this.$toast.success("Organization edited successfully");
          this.isLoading = false;
          this.$store.dispatch("sitesetting/OrganizationView", 1);
        })
        .catch((err) => {
          this.messages.push(err.data.title);
          this.$toast.error(" Site setting edit failed");
          this.isLoading = false;
        });
    },

    OrganizationView() {
      var id = 1;
      this.$store
        .dispatch("sitesetting/OrganizationView", id)
        .then((res) => {
          debugger;
          this.organization = res.data;
        })
        .catch((err) => {
          this.messages = err.data.title;
          this.isLoading = false;
        });
    },

    async uploadImage(id) {
      let formData = new FormData();
      formData.append("image", this.selectedImages);
      formData.append("id", id);
      console.log(this.selectedImages);
      return await this.$store.dispatch(
        "sitesetting/UploadOrganizationImage",
        formData
      );
    },

    uploadImage() {
      debugger;
      let fromData = new FormData();
      if (this.selectedImages && this.updatedImage) {
        fromData.append("id", 1);
        fromData.append("image", this.selectedImages);

        return this.$store.dispatch(
          `sitesetting/UploadOrganizationImage`,
          fromData
        );
      } else if (this.updatedImage == false) {
        fromData.append("id", 1);
        fromData.append("image", null);
        return this.$store.dispatch(
          `sitesetting/UploadOrganizationImage`,
          fromData
        );
      } else {
        return true;
      }
    },
  },
  created() {
    this.OrganizationView();
  },
};
</script>

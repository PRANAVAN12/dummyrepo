<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="480px">
      <v-card>
        <v-card-title>
          <span>Conformation</span>
          <v-spacer></v-spacer>
          <!-- <v-btn icon @click="show = false">
            <v-icon>mdi-close</v-icon>
          </v-btn> -->
        </v-card-title>
        <v-card-text>
          <v-flex style="color:#5a5a5a">
            Do you want to assign <strong> {{ product.name }} </strong> to
            Supplier <strong> {{ supplier.name }} </strong>
          </v-flex>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="darken-1"
            class="pl-6 pr-6"
            text
            @click.stop="show = false"
            >Close</v-btn
          >
          <v-btn
            color=""
            class="btn_blue pl-6 pr-6"
            text
            @click="AssignSupplierToProduct()"
            >Assign</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import {Payment} from "@/models/Payment";
export default {
  data: () => ({
    dialog: false,
    show: false,
    errors: [],
  }),

  name: "AddBatch",
  updated: function() {
    console.log(this.visible);
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    supplier: {
      type: Object,
    },
    product: {
      type: Object,
    },
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  computed: {
  },
  methods: {
    openModal() {
      this.show = true;
    },
    async AssignSupplierToProduct() {
      const credentials = new Object();
      credentials.productId = this.product.id;
      credentials.suppliers = [];
      this.product.suppliers.forEach((supplier) => {
        credentials.suppliers.push(supplier.id);
      });
      credentials.suppliers.push(this.supplier.id);
      this.AssignProduct(credentials);
    },
    AssignProduct(credentials) {
      this.$store
        .dispatch(`product/AssignSupplierToProducts`, credentials)
        .then((res) => {
          this.isLoading = false;
          this.$toast.success("Product assigned successfully");
          this.$emit("conform", this.product);
          this.show = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$toast.error("Product assigned failed");
          this.show = false;
          this.payment = new Payment();
        });
    },
  },
  created() {
    // this.payment.amount = this.PayableBalance;
    // this.payment = new Payment();
  },
};
</script>

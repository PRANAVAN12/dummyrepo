import { mapState } from "vuex";

var Suppliers = {
  created: function() {
    this.fetchAllBrands();
  },
  methods: {
    fetchAllBrands() {
      this.$store.dispatch("supplier/FetchAllSuppliers");
    },
  },
  computed: {
    ...mapState("supplier", ["suppliers"]),
  },
};

export default Suppliers;

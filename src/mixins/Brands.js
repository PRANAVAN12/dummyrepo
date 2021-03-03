import { mapState } from "vuex";

var Brands = {
  created: function() {
    this.fetchAllBrands();
  },
  methods: {
    fetchAllBrands() {
      this.$store.dispatch("product/FetchAllBrands");
    },
  },
  computed: {
    ...mapState("product", ["brands"]),
  },
};

export default Brands;

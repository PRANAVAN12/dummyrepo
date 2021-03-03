import { mapState } from "vuex";

var Categories = {
  created: function() {
    this.fetchAllCategories();
  },
  methods: {
    fetchAllCategories() {
      this.$store.dispatch("product/FetchAllCategories");
    },
  },
  computed: {
    ...mapState("product", ["categories"]),
  },
};

export default Categories;

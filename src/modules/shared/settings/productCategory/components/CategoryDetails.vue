<!-- *************************************************************************
	TEMPLATE
	************************************************************************* -->
<template>
  <div>
    <PageTitle title="Category View" :backBtn="true" />

    <v-container fluid>
      <v-row
        ><v-col cols="12" sm="12" md="12" lg="12"
          ><v-card class="lighten-12">
            <v-card-title>General </v-card-title>
            <v-container fluid>
              <v-row>
                <v-col cols="6"  sm="6" md="3" lg="3"> <h4>Name </h4></v-col>
                <v-col cols="6"  sm="6" md="3" lg="3"><v-chip label>{{ category.name }}</v-chip></v-col>
                <v-col cols="6"  sm="6" md="3" lg="3"><h4>Code </h4></v-col>
                <v-col cols="6"  sm="6" md="3" lg="3"><v-chip label>{{ category.code }} </v-chip></v-col>
              </v-row>
              <v-row>
                <v-col><h4>Parent category </h4></v-col>
                 <v-col v-if="category.parent"
                      cols="6"
                      sm="6"
                      md="3"
                      lg="3"><v-chip label>{{ category.parent.name }} </v-chip></v-col>
                  <v-col v-else cols="6" sm="12" md="3" lg="3"> <v-chip label>{{ category.name }} </v-chip></v-col>
                   <v-col cols="6" sm="12" md="3" lg="3" ><h4>Description </h4></v-col>
                    <v-col  cols="6" sm="12" md="3" lg="3"><v-chip label>{{ category.description }}</v-chip></v-col>
              </v-row>






           
            </v-container>
          </v-card></v-col
        ></v-row
      >
      <v-row>
        <v-col></v-col>
      </v-row>
      <v-tabs horizontal background-color="primary" dark>
        <v-tab> Products </v-tab>
        <!-- <v-tab> Sales </v-tab> -->

        <v-tab-item>
          <ProductList :CategoryId="$route.params.id" />
        </v-tab-item>

        <v-tab-item> </v-tab-item>
      </v-tabs>
    </v-container>
  </div>
</template>

<!-- *************************************************************************
	SCRIPT
	************************************************************************* -->
<script>
import ProductList from "./CategoryProductComponent";
//COMPONENTS

export default {
  data() {
    return {
      category: {
        type: Object,
        default: {},
      },
    };
  },

  components: {
    ProductList,
  },
  methods: {
    GetCategory() {
      let categoryId = this.$route.params.id;
      this.$store
        .dispatch("product/GetProductCategory", { id: categoryId })
        .then((res) => {
          this.category = res.data;
        })
        .catch((err) => {
          this.messages = err.data.title;
        });
    },
  },
  created() {
    this.GetCategory();
  },
};
</script>


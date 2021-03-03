<template>
    <v-autocomplete
        hide-details="auto"
    :items="warehouses"
    :loading="loading"
    v-model="selectedWarehouse"
    item-text="name"
    item-value="id"
    label="Warehouse"
    outlined
    clearable
    dense
    @change="emitInput"
    :search-input.sync="searchWarehouses"
></v-autocomplete>
</template>
<script>
    export default {
    props: {
    clear: {
    type: Boolean,
    default: false,
},
},
    data: () => ({
    warehouses: [],
    selectedWarehouse: null,
    searchWarehouses:null,
    loading:false
}),
    methods: {
    emitInput() {
    this.$emit("input", this.selectedWarehouse);
},
    getWarehouseByQuery(query = "") {
    this.loading = true;
    this.$store
    .dispatch("warehouse/GetWarehouse", {
    query: query,
    status: "active",
})
    .then((res) => {
    this.loading = false;
    this.warehouses = res;
})
    .catch((err) => {
    this.loading = false;
});
},
},
    watch: {
    clear: {
    handler(val) {
    this.selectedWarehouse = null;
},
    deep: true,
},
    searchSupplier: {
    handler(val) {
    this.getWarehouseByQuery(val);
},
    deep: true,
},
},
    created(){
    this.getWarehouseByQuery()
}
};
</script>
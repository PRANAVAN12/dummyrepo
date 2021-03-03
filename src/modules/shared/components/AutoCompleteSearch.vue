<template>
  <v-row>
    <v-col cols="12">
      <v-autocomplete
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        hide-no-data
        hide-selected
        item-text="name"
        item-value="id"
        :label="label"
        outlined
        @input="onSelectItem"
      ></v-autocomplete>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data: () => ({
    isLoading: false,
  }),
  props: {
    // Request URL
    url: {
      type: String,
      default: "",
    },
    selectedItems: [],
    label: "",

    search: null,
  },
  watch: {
    search(val) {
      console.log("TTTTTTTTTTTTTTTTTTTTTTT", val);
      if (!val) {
        return;
      }
      this.fetchData(val);
    },
    deep: true,
  },
  methods: {
    onSelectItem(value) {
        console.log('TEETY',this.items.find((i) => i.id == value));
      if (value != null && this.items.find((i) => i.id == value) !=null) {
        this.$emit(
          "input",
          this.items.find((i) => i.id == value)
        );
      }
    },
    fetchData(val) {
      console.log(val);
      console.log(this.selectedItems);
      this.isLoading = true;
      this.$store
        .dispatch("GetAutoCompleteData", {
          url: this.url,
          data: this.options,
          params: {
            query: val,
            except: this.selectedItems,
          },
        })
        .then((res) => {
          this.items = res.data.data;
          this.$emit("items", this.items);
          this.isLoading = false;
        })
        .catch((err) => {
          this.$emit("input", []);
          this.isLoading = false;
        });
    },
  },
};
</script>
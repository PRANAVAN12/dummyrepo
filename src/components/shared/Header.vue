<template>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
     editRoute: {
      type: String,
      default: "",
    },
    backBtn: {
      type: String,
      default: false,
    },
    isSubTiltle: {
      type: Boolean,
      default: false,
    },
    hasBreadcrumbs: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

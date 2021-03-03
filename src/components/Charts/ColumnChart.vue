<template>
  <column-chart height="200px" :data="data" :colors="colors"></column-chart>
</template>

<script>
export default {
  name: "Column Chart",
  data: () => ({
    props: {
      // data: {
      //   type: Object,
      //   default: {},
      // },
      colors: {
        type: Array,
        defaul: ["#d00000", "#ffba08", "#3f88c5", "#032b43", "#136f63"],
      },
    },
    data: [
      ["Sun", 25],
      ["Mon", 46],
      ["Tue", 28],
      ["Thur", 28],
      ["Fri", 56],
      ["Sat", 68],
      ["Sun", 85],
    ],
    
  }),
};
</script>

<template>
  <line-chart height="200px" :data="data" :colors="colors"></line-chart>
</template>

<script>
export default {
  name: "Line Chart",
  data: () => ({
    colors: ["#d00000", "#ffba08", "#3f88c5", "#032b43", "#136f63 "],
    data: [
      {
        name: "Main Warehouse",
        data: {
          "2017-01-01": 60,
          "2017-02-02": 4,
          "2017-03-03": 55,
          "2017-04-04": 1,
          "2017-05-05": 80,
          "2017-06-06": 5,
        },
      },
      {
        name: "Sub Warehouse1",
        data: {
          "2017-01-01": 18,
          "2017-02-02": 35,
          "2017-03-03": 25,
          "2017-04-04": 85,
          "2017-05-05": 24,
          "2017-06-06": 65,
        },
      },
      {
        name: "Sub Warehouse2",
        data: {
          "2017-01-01": 22,
          "2017-02-02": 55,
          "2017-03-03": 77,
          "2017-04-04": 66,
          "2017-05-05": 5,
          "2017-06-06": 90,
        },
      },
    ],
  }),
};
</script>

<template>
  <pie-chart height="200px" :data="data" :colors="colors" ></pie-chart>
</template>

<script>
export default {
  name: "Pie Chart",
  data: () => ({
    colors: ["#13928e", "#c8ffff", "#3f88c5", "#032b43", "#136f63 "],
    options: {
    legend: {
        display: false
    },
    tooltips: {
        callbacks: {
           label: function(tooltipItem) {
                  return tooltipItem.yLabel;
           }
        }
    }
}
  }),
  props:{
    data:{
      type:Array,
      default:[]}
  }
};
</script>

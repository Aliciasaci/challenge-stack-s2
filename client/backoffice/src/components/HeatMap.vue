<template lang="">
  <div></div>
</template>
<script setup>
import plotly from "plotly.js-dist";
import { ref, onMounted } from "vue";

const { heatmap } = defineProps(["heatmap"]);

const setHeatMapData = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--text-color-secondary"
  );
  const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

  const data = [
    {
      x: heatmap.data.x,
      y: heatmap.data.y,
      z: heatmap.data.z,
      type: "heatmap",
      colorscale: [
        [0, "#F72C25DB"],
        [1, "#216869"],
      ],
      hoverongaps: false,
    },
  ];
  return data;
};
</script>
<style lang=""></style>

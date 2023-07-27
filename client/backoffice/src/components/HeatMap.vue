<template lang="">
  <div class="container">
    <canvas ref="canvas" id="canvas" style="width: 300px"></canvas>
  </div>
</template>
<script setup>
import { ref, onMounted, watch, defineProps } from "vue";
import Screenshot from "../assets/Screenshot_1.png";
import Image from "primevue/image";
const props = defineProps(["heatmap"]);

const canvasRef = ref(null);
const result = ref(null);

onMounted(() => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const img = new window.Image();
  img.src = Screenshot;
  img.onload = () => {
    canvas.width = 1920;
    canvas.height = 1080;
    ctx.drawImage(img, 0, 0);
    drawHeatmap(ctx, props.heatmap.data.arrayData, img.src);
  };
});

watch(
  () => props.heatmap.data,
  (data) => {
    const canvas = canvasRef.value;
    const ctx = canvas.value.getContext("2d");
    const img = new Image();
    img.src = Screenshot;
    img.onload = () => {
      canvas.value.width = img.width;
      canvas.value.height = img.height;
      ctx.drawImage(img, 0, 0);
      drawHeatmap(context, props.heatmap.data.arrayData, img.src);
    };
  }
);

function drawHeatmap(context, data, image) {
  const maxClicks = Math.max(...data.map((d) => d.totalClicks));
  const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, "green");
  gradient.addColorStop(0.5, "yellow");
  gradient.addColorStop(1, "red");
  const img = new window.Image();
  img.crossOrigin = "anonymous";
  img.src = image;
  img.onload = () => {
    context.drawImage(img, 0, 0);
    data.forEach((d) => {
      const radius = (d.totalClicks / maxClicks) * 50;
      const colorValue = Math.floor((d.totalClicks / maxClicks) * 255);
      const color = `rgb(${colorValue}, 0, ${255 - colorValue})`;
      context.filter = "blur(30px)";
      context.fillStyle = color;
      context.beginPath();
      context.arc(d.x, d.y, radius, 0, 2 * Math.PI);
      context.fill();
    });
  };
}
</script>
<style lang="scss">
.container {
  transition: transform 0.5s;
  background-color: #fff;
  padding: 1.5rem;
}
.container:hover {
  transform: scale(2);
  cursor: pointer;
}
</style>

<template lang="">
  <div>
    <div v-for="heatmap in heatmaps" :key="heatmap._id">
      <HeatMap :heatmap="heatmap"></HeatMap>
    </div>
  </div>
</template>
<script setup>
import plotly from "plotly.js-dist";
import { ref, onMounted } from "vue";

const heatmaps = ref([]);
const user = JSON.parse(localStorage.getItem("user"));

onMounted(async () => {
  heatmaps.value = await getHeatmaps();
  console.log(heatmaps.value);
});

const convertDateToDayOfTheWeek = (date) => {
  const days = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  return days[date.getDay()];
};

const converDateToMonth = (date) => {
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Aout",
    "Septembre",
    "Novembre",
    "Décembre",
  ];
  return months[date.getMonth()];
};

const convertDateToYear = (date) => {
  return date.getFullYear();
};

//convert string date "2021-05-01" to day of the week
const convertStringDateToDayOfTheWeek = (date) => {
  const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
  const dateObj = new Date(date);
  return days[dateObj.getDay()];
};

let data = [];

async function getHeatmaps() {
  try {
    const response = await fetch(
      `http://localhost:3000/widgets/?type=heatmap&appId=${user.appId}&orderDesc=true`
    );
    if (!response.ok) {
      throw new Error(
        `erreur serveur (${response.status} ${response.statusText})`
      );
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
</script>
<style lang=""></style>

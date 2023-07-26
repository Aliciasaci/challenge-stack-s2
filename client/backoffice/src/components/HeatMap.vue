<template lang="">
  <div id="plot"></div>
</template>
<script setup>
import plotly from "plotly.js-dist";

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
</script>
<style lang=""></style>

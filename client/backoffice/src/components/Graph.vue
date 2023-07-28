<template>
  <div class="card graphcard">
    <Chart
      :type="typeGraph"
      :data="chartData"
      :options="chartOptions"
      class="h-20rem"
    />
  </div>
</template>
<style>
.graphcard {
  -webkit-box-shadow: 7px 6px 23px 1px rgba(0, 0, 0, 0.22);
  box-shadow: 7px 6px 23px 1px rgba(0, 0, 0, 0.041);
}
</style>

<script setup>
import { ref, onMounted, defineProps } from "vue";
import "chartjs-adapter-date-fns";
const chartData = ref();
const chartOptions = ref();
let typeGraph = "";
const { graph } = defineProps(["graph"]);

onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const setChartData = () => {
  let data = graph.data.arrayData.map(function (row) {
    row["x"] = row["periode"];
    delete row["periode"];
    row["y"] = row["count"];
    delete row["count"];
    return row;
  });

  return {
    datasets: [
      {
        label: graph.data.label,
        fill: false,
        borderColor: "#b87da4",
        backgroundColor: "#f3c2e3",
        yAxisID: "y",
        tension: 0.4,
        data: data,
      },
    ],
  };
};

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--text-color-secondary"
  );
  const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

  let grapheTypeDict = {};

  if (graph.type == "multiaxis") {
    typeGraph = "line";
    grapheTypeDict = {
      x: {
        type: "time",
        time: {
          unit: graph.data.periode,
        },
      },
      y: {
        type: "linear",
        display: true,
        position: "left",
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    };
  } else if (graph.type == "verticalbar") {
    typeGraph = "bar";
    grapheTypeDict = {
      x: {
        type: "time",
        time: {
          unit: graph.data.periode,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
          drawBorder: false,
        },
      },
    };
  }
  return {
    stacked: false,
    maintainAspectRatio: true,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: grapheTypeDict,
  };
};
</script>

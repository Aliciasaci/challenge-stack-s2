
<template>
    <div class="card">
        <Chart :type="typeGraph" :data="chartData" :options="chartOptions" class="h-25rem" />
    </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";
import {de} from 'date-fns/locale';
import 'chartjs-adapter-date-fns';

onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();
let typeGraph = '';

const { graph } = defineProps(['graph']);

const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    let data =  graph.data.arrayData.map(function(row) {
        row["x"] = row["periode"];
        delete(row["periode"]);
        row["y"] = row["count"];
        delete(row["count"]);
        return row;
    });
    return {
        // labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        datasets: [
            {
                label: 'Label',
                fill: false,
                borderColor: "#216869",
                backgroundColor: "#F72C25DB",
                yAxisID: 'y',
                tension: 0.4,
                data:data
              
            },
        ]
    };
};


const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    let grapheTypeDict = {}
    
    if (graph.type == "multiaxis")
    {
        typeGraph = 'line';
        grapheTypeDict = {
            x: {
                type:'time',
                time:{
                    unit:graph.data.periode
                }
               
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
        }
    }


    else if(graph.type == "verticalbar")
    {
        typeGraph = 'bar';
        grapheTypeDict = {
            x: {
                type:'time',
                time:{
                    unit:graph.data.periode
                }
               
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    }
    console.log(grapheTypeDict)
    return {
        stacked: false,
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: grapheTypeDict,
        
        
    };
}
</script>

<template>
    <div class="card">
        <table class="table full is-fullwidth is-hoverable">
            <thead>
                <tr>
                    <th>Pos</th>
                    <th>Tag</th>
                    <th>Lien</th>
                    <th>Date création</th>
                    <th>Dernière Modification</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="event in events" :key="event._id">
                    <th>{{ event.type }}</th>
                    <td>{{ event.data.tag }}</td>
                    <td><a>{{ getPageName(event.data.page) }}</a></td>
                    <td>{{ convertDate(event.createdAt) }}</td>
                    <td>{{ convertDate(event.updatedAt) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';

const { events } = defineProps(['events']);

function convertDate(dateStr) {
    const date = new Date(dateStr);

    const jour = date.getDate();
    const mois = date.getMonth() + 1
    const annee = date.getFullYear();

    const heures = date.getHours();
    const minutes = date.getMinutes();
    const secondes = date.getSeconds();

    const dateFrancaise = `${jour}/${mois}/${annee}`;
    const heureFrancaise = `${heures}:${minutes}:${secondes}`;


    return dateFrancaise + heureFrancaise;
}

function getPageName(url) {
    if (url) {
        const parts = url.split("/");
        let lastPart = parts[parts.length - 1];

        if (lastPart == "") {
            lastPart = "/";
        };

        return lastPart;
    }
}
</script> 
<style></style>
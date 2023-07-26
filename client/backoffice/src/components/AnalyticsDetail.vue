<script setup>
import { ref, onMounted } from 'vue';

let appEvents = ref([]);
const user = JSON.parse(localStorage.getItem('user'));
const currentPage = ref(1);
const pageSize = 10; // Number of events per page
let nbPages = 1; // Initialize the variable

onMounted(async () => {
    try {
        appEvents.value = await getEvents(currentPage.value);
        const countEvents = await getEventsCount();
        // nbPages = Math.ceil(countEvents[0].count / pageSize); // Assign the value to nbPages
    } catch (error) {
        console.error(error);
    }
});

function convertDate(dateStr) {
    const date = new Date(dateStr);

    const jour = date.getDate();
    const mois = date.getMonth() + 1;
    const annee = date.getFullYear();

    const heures = date.getHours();
    const minutes = date.getMinutes();
    const secondes = date.getSeconds();

    const dateFrancaise = `${jour}/${mois}/${annee}`;
    const heureFrancaise = `${heures}:${minutes}:${secondes}`;
    return dateFrancaise + " " + heureFrancaise; // Add a space between date and time
}

function getPageName(url) {
    if (url) {
        const parts = url.split("/");
        let lastPart = parts[parts.length - 1];

        if (lastPart === "") {
            lastPart = "/accueil";
        }

        return lastPart;
    }
}

async function getEvents(pageNumber) {
    try {
        const response = await fetch(`http://localhost:3000/events/?appId=${user.appId}&orderDesc=true&page_size=${pageSize}&page_number=${pageNumber}`);
        if (!response.ok) {
            throw new Error(`erreur serveur (${response.status} ${response.statusText})`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getEventsCount() {
    try {
        const response = await fetch(`http://localhost:3000/events/count/?appId=${user.appId}&orderDesc=true&periode=year`);
        if (!response.ok) {
            throw new Error(`erreur serveur (${response.status} ${response.statusText})`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

</script>
<template>
    <div class="card mb-5">
        <table class="table full is-fullwidth is-hoverable">
            <thead>
                <tr>
                    <th>Type d'évènement</th>
                    <th>Tag</th>
                    <th>Lien</th>
                    <th>Date création</th>
                    <th>Dernière Modification</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="event in appEvents" :key="event._id">
                    <td>{{ event.type }}</td>
                    <td>{{ event.data.tag }}</td>
                    <td><a :href="getPageName(event.data.page)">{{ getPageName(event.data.page) }}</a></td>
                    <td>{{ convertDate(event.createdAt) }}</td>
                    <td>{{ convertDate(event.updatedAt) }}</td>
                </tr>
            </tbody>
        </table>
        <div>
            <span>{{ currentPage }}</span>
        </div>
    </div>
</template>
  

<style lang="scss">
.table th:not([align]) {
    text-align: center;
}
</style>

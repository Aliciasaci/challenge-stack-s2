<template >
    <div class="stat-cards">

        <div class="box">
            <!-- <Button icon="pi pi-times" severity="danger" text rounded aria-label="Cancel" class="cancel" /> -->
            <span class="card-title">Sessions actives <Badge severity="success"></Badge></span><br />
            <span class="icon-style"><i class="pi pi-database text-blue-500"></i></span>
            <br />
            <span class="text-900 font-medium text-xl">{{ activeSessions }}</span>
        </div>


        <div class="box" v-for="kpi in kpis" :key="kpi._id">
            <!-- <Button icon="pi pi-times" severity="danger" text rounded aria-label="Cancel" class="cancel" /> -->
            <span class="card-title">Donnée : {{ kpi.data.label }}</span><br />
            <span class="icon-style"><i class="pi pi-database text-blue-500"></i></span>
            <span v-if="kpi.data.tag != ''" class="font-medium">Tag : {{ kpi.data.tag.commentaire }}</span>
            <span v-if="kpi.data.page != ''" class="font-medium">Page : {{ kpi.data.page }}
            </span><br />
            <span v-if="kpi.data.date_interval != 'null - null'" class="font-medium date">{{ kpi.data.date_interval
            }}</span><br />
            <span class="text-900 font-medium text-xl">{{ kpi.data.count }}</span>
        </div>
    </div>

    <div>
        <Dialog v-model:visible="isModalVisible" modal header="Détails" :style="{ width: '30vw' }">
        </Dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isModalVisible = ref(false);
const kpis = ref([]);
const activeSessions = ref({});
const user = JSON.parse(localStorage.getItem('user'));

onMounted(async () => {
    kpis.value = await getUsersKpis();
    activeSessions.value = await getActiveSessions();
    console.log(activeSessions.value);
    checkEventChange();
});

async function getUsersKpis() {
    try {
        const accessToken = localStorage.getItem('token');

        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        };
        const response = await fetch(import.meta.env.VITE_SERVER_URL + `/widgets/?type=kpi&appId=${user.appId}&orderDesc=true`,
            requestOptions);
        if (!response.ok) {
            throw new Error(`erreur serveur (${response.status} ${response.statusText})`);
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function dateToString(dateObj){
    let year = dateObj.getFullYear();

    let month = dateObj.getMonth();
    month = ('0' + (month + 1)).slice(-2);

    let date = dateObj.getDate();
    date = ('0' + date).slice(-2);

    let hour = dateObj.getHours();
    hour = ('0' + hour).slice(-2);

    let minute = dateObj.getMinutes();
    minute = ('0' + minute).slice(-2);

    let second = dateObj.getSeconds();
    second = ('0' + second).slice(-2);

    return `${year}-${month}-${date}%20${hour}:${minute}:${second}`;
}

async function getActiveSessions() {
    var MS_PER_MINUTE = 60000;

    const dateFinObj = new Date();
    const dateFin = dateToString(dateFinObj)
    const dateDebutObj = new Date(dateFinObj - 15 * MS_PER_MINUTE);
    const dateDebut = dateToString(dateDebutObj)

    try {
        const accessToken = localStorage.getItem('token');
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        };
        console.log(import.meta.env.VITE_SERVER_URL + `/events/?dateDebut=${dateDebut}&dateFin=${dateFin}&appId=${user.appId}&orderDesc=true`);
        const response = await fetch(import.meta.env.VITE_SERVER_URL + `/events/?dateDebut=${dateDebut}&dateFin=${dateFin}&appId=${user.appId}&orderDesc=true`,
            requestOptions
        );
        if (!response.ok) {
            throw new Error(`erreur serveur (${response.status} ${response.statusText})`);
        }
        const data = await response.json();

        console.log(data.length);
        console.log(Array.from(new Set(data.map(function(element){ return element.data.visitor_id }))).length);
        
        if (data.length >= 0) {
            return Array.from(new Set(data.map(function(element){ return element.data.visitor_id }))).length;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function checkEventChange() {
    const eventSource = new EventSource(import.meta.env.VITE_SERVER_URL + '/watch/events');

    eventSource.onopen = function () {
        console.log('Connexion établie.');
    };

    eventSource.onerror = function (event) {
        console.error('Erreur de connexion :', event);
        eventSource.close();
    };

    eventSource.onmessage = async function (event) {
        if (event) {
            activeSessions.value = await getActiveSessions()
        }
    };
}
</script>

<style lang="scss">
:root {
    --box-width: calc(100% / var(--nb-cards, 1));
}

.box {
    background: var(--surface-card);
    border: white;
    padding: 2rem;
    margin: 0rem 1rem 2rem 1rem;
    box-shadow: var(--card-shadow);
    border-radius: 12px;
    flex-basis: var(--box-width);
    height: 150px;
    position: relative;
    max-width: 20rem;
    line-height: 1.8;
    padding-top: 15px;
    font-family: 'Roboto', sans-serif;
}

.box:last-child {
    margin-bottom: 29px;
    font-family: 'Roboto', sans-serif;
}

.stat-cards {
    width: 82%;
    display: flex;
    margin: 2rem auto;
    justify-content: start;
    text-align: start;
    flex-wrap: wrap;
}

.card-title {
    color: #707070;
    display: inline-block;
    font-size: 1.2em;
}

.title-wrapper {
    display: flex;
    align-items: top;
    justify-content: space-between;
}

.icon-style {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 5px;
    background-color: #fff4fc;
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    right: 15px;
    top: 100px;
}

.voir-plus {
    position: absolute;
    right: 21px;
}

.card {
    border: white;
}

.text-blue-500 {
    color: #f63bbe !important;
}

.cancel {
    position: absolute;
    top: 1%;
    right: 9px;
}

.date {
    color: var(--green-500) !important
}

@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:wght@300;400;600&family=Roboto:ital,wght@0,400;0,500;1,700&display=swap');
</style>

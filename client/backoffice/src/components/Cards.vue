<template >
    <div class="stat-cards" >
        <div class="box" v-for="kpi in kpis" :key="kpi._id">
            <!-- <Button icon="pi pi-times" severity="danger" text rounded aria-label="Cancel" class="cancel" /> -->
            <span class="card-title">Donnée : {{ kpi.data.label }}</span><br />
            <span class="icon-style"><i class="pi pi-database text-blue-500"></i></span>
            <span v-if="kpi.data.tag != ''" class="font-medium">Tag : {{ kpi.data.tag.commentaire }}</span>
            <span v-if="kpi.data.page != ''" class="font-medium">Page : {{ kpi.data.page.name }}
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
const user = JSON.parse(localStorage.getItem('user'));

onMounted(async () => {
    kpis.value = await getUsersKpis();
});

async function getUsersKpis() {
    try {
        const response = await fetch(import.meta.env.VITE_SERVER_URL + `/widgets/?type=kpi&appId=${user.appId}&orderDesc=true`);
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
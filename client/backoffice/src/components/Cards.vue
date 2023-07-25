<template>
    <div class="stat-cards">
        <div class="box" v-for="kpi in kpis" :key="kpi._id">
            <Button icon="pi pi-times" severity="danger" text rounded aria-label="Cancel" class="cancel" />
            {{ kpi.data.label }}<br />
            {{ kpi.data.count }}
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
    console.log(kpis.value);
});

async function getUsersKpis() {
    try {
        const response = await fetch(`http://localhost:3000/widgets/?type=kpi&appId=${user.appId}&orderDesc=true`);
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
}

.box:last-child {
    margin-bottom: 29px;
}

.stat-cards {
    width: 82%;
    display: flex;
    margin: 2rem auto;
    justify-content: space-around;
    text-align: start;
}

.card-title {
    color: #9e9e9e;
    display: inline-block;
    width: 70%;
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
</style>
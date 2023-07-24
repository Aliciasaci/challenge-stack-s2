<template>
    <div class="stat-cards">
        <div v-for="d,index in data" :key="d.title" class="box test" :id="'carte-'+index">
            <div class="title-wrapper">
                <span class="card-title">{{ d.title }}</span><span class="icon-style"><i :class="d.icon"></i></span>
            </div>
            <span class="text-900 font-medium text-xl">{{ d.nb }}</span><br />

            <Button label="Voir détails" outlined class="p-button-sm voir-plus" rounded @click="voirDetail(d)" />
        </div>
    </div>

    <div>
        <Dialog v-model:visible="isModalVisible" modal header="Détails" :style="{ width: '30vw' }">
            <div v-if="modalData.id == 2">
                <h4>Nombre de visite par page</h4>
                <div v-for="([pageName, visitCount]) in modalData.otherData" :key="pageName">
                    {{ pageName }}: {{ visitCount }}
                </div>
            </div>
            <div v-else-if="modalData.id == 3">
                <h4>Nombre de cliques par tag</h4>
                <div v-for="([tag, clickCount]) in modalData.otherData" :key="tag">
                    {{ tag }}: {{ clickCount }}
                </div>
            </div>
            <div v-else-if="modalData.id == 4">
                <h4>Nombre de soumission de form par tag</h4>
                <div v-for="([tag, submitCount]) in modalData.otherData" :key="tag">
                    {{ tag }}: {{ submitCount }}
                </div>
            </div>
        </Dialog>
    </div>
</template>
  
<script setup>
import { ref, watch, onMounted, nextTick } from "vue";
import { defineProps } from 'vue';

let nbClickTotal = ref(0);
let nbSubmitTotal = ref(0);
let nbVisiteTotal = ref(0);
let { events } = defineProps(['events']);
let visitCountsArray = [];
let clickCountsArray = [];
let submitCountsArray = [];
let data = ref([]);
const isModalVisible = ref(false);
const modalData = ref({ title: "", otherData: [] });


onMounted(() => {
    let visitCounts = {};
    let clickCounts = {};
    let submitCounts = {};

    events.forEach(event => {
        if (event.type === "click") {
            let tag = event.data.tag;

            nbClickTotal.value++;

            if (!clickCounts[tag]) {
                clickCounts[tag] = 1;
            } else {
                clickCounts[tag]++;
            }
        } else if (event.type === "submit") {
            let tag = event.data.tag;
            nbSubmitTotal.value++;

            if (!submitCounts[tag]) {
                submitCounts[tag] = 1;
            } else {
                submitCounts[tag]++;
            }
        } else if (event.type === "visited") {
            let pageName = getPageName(event.data.page);
            nbVisiteTotal.value++;

            if (pageName === "") {
                pageName = "accueil";
            }

            if (!visitCounts[pageName]) {
                visitCounts[pageName] = 1;
            } else {
                visitCounts[pageName]++;
            }
        }
    });

    visitCountsArray = Object.entries(visitCounts);
    clickCountsArray = Object.entries(clickCounts);
    submitCountsArray = Object.entries(submitCounts);

    data.value = [
        { id: 1, title: 'Nombre de sessions actives', nb: '26', icon: 'pi pi-fw pi-users text-blue-500 text-xl',},
        { id: 2,title: 'Nombre de vues par Page', nb: nbVisiteTotal, icon: 'pi pi-fw pi-eye text-blue-500 text-xl', otherData: visitCountsArray,},
        { id: 3,title: 'Nombre de cliques', nb: nbClickTotal, icon: 'pi pi-fw pi-pencil text-blue-500 text-xl', otherData: clickCountsArray },
        { id: 4,title: 'Nombre de submit', nb: nbSubmitTotal, icon: 'pi pi-fw pi-pencil text-blue-500 text-xl', otherData: submitCountsArray }
    ];


});

function getPageName(url) {
    if (url) {
        const parts = url.split("/");
        const lastPart = parts[parts.length - 1];

        return lastPart;
    }
}

const nbCards = ref(data.length);

watch(nbCards, (newVal) => {
    document.documentElement.style.setProperty('--nb-cards', newVal);
});

function voirDetail(d) {
    isModalVisible.value = true;
    modalData.value = d;
}
</script>
  
<style lang="scss">
:root {
    --box-width: calc(100% / var(--nb-cards, 1));
}

.box {
    background: var(--surface-card);
    border: 1px solid var(--surface-border);
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
    background-color: #d0e1fd;
    display: flex;
    align-items: center;
    justify-content: center;
}

.voir-plus {
    position: absolute;
    right: 21px;
}
</style>
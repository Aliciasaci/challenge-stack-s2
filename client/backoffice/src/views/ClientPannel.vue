<script setup>
import { ref, onMounted } from 'vue';
import Header from '@/components/ClientHeader.vue';
import VerticalBar from '@/components/VerticalBar.vue';
import MultiAxis from '@/components/MultiAxis.vue';
import AnalyticsDetail from '@/components/AnalyticsDetail.vue';
import Cards from '@/components/Cards.vue';
import AppIDModal from '@/components/AppIDModal.vue';
import PreferencesModal from '@/components/PreferencesModal.vue';
import TagsModal from '@/components/TagsModal.vue';
import ParamModal from "../components/ParamModal.vue"


const isAppIDModalVisible = ref(false);
const isPreferencesModalVisible = ref(false);
const isTagsModalVisible = ref(false);
const isParamModalVisible = ref(false);
const user = JSON.parse(localStorage.getItem('user'));
const appEvents = ref(false);
import { useStore } from 'vuex';
const store = useStore();
let nbVisitsPerMonthArray = [];
let displayCards = [];


onMounted(async () => {
    if (user.appId) {
        appEvents.value = await getEventsByAppId(user.appId);
    }

    nbVisitsPerMonthArray = getNbVisitesPerMonth(appEvents.value);
    togglePreferencesCards();
});

const generateAppIDModal = () => {
    isAppIDModalVisible.value = true;
}

const generatePreferencesModal = () => {
    isPreferencesModalVisible.value = true;
}

const generateTagModal = () => {
    isTagsModalVisible.value = true;
}

const generateParamModal = () => {
    isParamModalVisible.value = true;
}




async function getEventsByAppId(appId) {
    try {
        const response = await fetch(`http://localhost:3000/events/${appId}/events`);
        if (!response.ok) {
            throw new Error(`erreur serveur (${response.status} ${response.statusText})`);
        }
        return response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

//*nombre de visite par mois
function getNbVisitesPerMonth(appEvents) {
    const nbVisitsPerMonthObject = {};
    const nbVisitsPerMonthArray = [];

    function getKey(month, year) {
        return `${month}-${year}`;
    }

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    for (let month = 1; month <= 12; month++) {
        const key = getKey(month, currentYear);
        nbVisitsPerMonthObject[key] = 0;
    }

    appEvents.forEach((event) => {
        if (event.type == 'visited') {
            const eventDate = new Date(event.createdAt);
            const month = eventDate.getMonth() + 1;
            const year = eventDate.getFullYear();
            const key = getKey(month, year);

            nbVisitsPerMonthObject[key]++;
        }
    });

    for (const key in nbVisitsPerMonthObject) {
        nbVisitsPerMonthArray.push(nbVisitsPerMonthObject[key]);
    }

    return nbVisitsPerMonthArray;
}

function diplayElement(id, classe, status) {
    if (classe) {
        let classeElement = document.querySelector("." + classe);
        if (classeElement) {
            classeElement.style.display = status;
        }
    }
    if (id) {
        let idElement = document.querySelector("#" + id);
        if (idElement) {
            idElement.style.display = status;
        }
    }
}

function togglePreferencesCards() {
    //recup les préférences de l'utilisateur 
    const checkedBtnsPreferences = store.state.checkedBtns;
    for (var index = 0; index < 4; index++) {
        if (checkedBtnsPreferences[index]) {
            displayCards.push("block")
        }
        else {
            displayCards.push("None")
        }
    }

}


</script>

<template v-if="user">
    <Header />
    <span class="p-buttonset">
        <Button @click="generatePreferencesModal" label="Préférences" icon="pi pi-heart" severity="secondary" outlined />
        <Button @click="generateAppIDModal" label="APP ID" icon="pi pi-key" severity="secondary" outlined />
        <Button @click="generateTagModal" label="TAGS" icon="pi pi-tags" severity="secondary" outlined />
        <Button @click="generateParamModal" label="Widgets" icon="pi pi-plus" severity="secondary" outlined />
    </span>

    <!--Cards-->
    <Cards v-if="appEvents" :events="appEvents" />
    <!--Cards-->

    <!--Les modals-->
    <AppIDModal :visible="isAppIDModalVisible" />
    <PreferencesModal :visible="isPreferencesModalVisible" />
    <TagsModal :visible="isTagsModalVisible" />
    <ParamModal :visible="isParamModalVisible" />
    <!--Les modals-->


    <div class="analytics" v-if="appEvents">
        <div class="graph">
            <div id="graph1">
                <VerticalBar v-if="nbVisitsPerMonthArray" :events="nbVisitsPerMonthArray"></VerticalBar>
            </div>
            <div id="graph2">
                <MultiAxis v-if="nbVisitsPerMonthArray" :events="nbVisitsPerMonthArray"></MultiAxis>
            </div>
        </div>

        <div class="detail">
            <AnalyticsDetail :events="appEvents"></AnalyticsDetail>
        </div>


    </div>
</template>
<style>
.top-btns {
    display: flex;
    align-items: end;
    justify-content: end;
}


.p-buttonset {
    display: flex;
    margin-right: 26px;
    justify-content: end;
}

.analytics {
    width: 80%;
    margin: auto;
}

.graph {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 4rem;
}

#graph1,
#graph2 {
    flex-basis: 49%;
    height: 100%;
}
</style>
  


  
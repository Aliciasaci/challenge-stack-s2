<template v-if="user">
    <Header />
    <span class="p-buttonset">
        <Button @click="generateAppIDModal" label="APP ID" icon="pi pi-key" severity="secondary" outlined />
        <Button @click="generateTagModal" label="TAGS" icon="pi pi-tags" severity="secondary" outlined />
        <Button @click="generateParamModal" label="Widgets" icon="pi pi-plus" severity="secondary" outlined />
    </span>

    <!-- Cards-->
    <Cards />
    <!--Cards -->

    <!--Les modals-->
    <AppIDModal :visible="isAppIDModalVisible" />
    <TagsModal :visible="isTagsModalVisible" />
    <ParamModal :visible="isParamModalVisible" />
    <!--Les modals -->

    <div class="analytics" v-if="userVerticalBars || userMultiAxes">
        <h1>Graphes</h1>
        <div class="graph" v-if="userVerticalBars">
            <h3 style="flex-basis: 100%;">Barre Vericales</h3>
            <div v-for="graph in userVerticalBars" :key="graph.id" class="graph-div">
                <Graph :graph="graph"></Graph>
            </div>
        </div>

        <div class="graph" v-if="userMultiAxes">
            <h3 style="flex-basis: 100%;">Mutli axes</h3>
            <div v-for="graph in userMultiAxes" :key="graph.id" class="graph-div">
                <Graph :graph="graph"></Graph>
            </div>
        </div>

        <div class="detail">
            <h1>Dernière activité</h1>
            <AnalyticsDetail :events="appEvents"></AnalyticsDetail>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Header from '@/components/ClientHeader.vue';
import AnalyticsDetail from '@/components/AnalyticsDetail.vue';
import Cards from '@/components/Cards.vue';
import AppIDModal from '@/components/AppIDModal.vue';
// import PreferencesModal from '@/components/PreferencesModal.vue';
import TagsModal from '@/components/TagsModal.vue';
import ParamModal from "../components/ParamModal.vue";
import Graph from '@/components/Graph.vue';
import { mapGetters, mapActions } from '../store/map-state';


const isAppIDModalVisible = ref(false);
const isTagsModalVisible = ref(false);
const isParamModalVisible = ref(false);
const user = JSON.parse(localStorage.getItem('user'));
import { useStore } from 'vuex';
const store = useStore();
let userMultiAxes = ref([]);
let userVerticalBars = ref([]);
let appEvents = ref();
const { isLoggedInAsUser, currentUser } = mapGetters('loginAsUser');
const { logoutAsUser } = mapActions('loginAsUser');

onMounted(async () => {
    try {
        if (user) {
            userMultiAxes.value = await getUsersMultiAxes();
            userVerticalBars.value = await getUsersVerticalBars();
        }
    } catch (error) {
        console.error(error);
    }
});

const generateAppIDModal = () => {
    isAppIDModalVisible.value = true;
}

const generateTagModal = () => {
    isTagsModalVisible.value = true;
}

const generateParamModal = () => {
    isParamModalVisible.value = true;
}

async function getUsersMultiAxes() {
    try {
        const response = await fetch(import.meta.env.VITE_SERVER_URL + `/widgets/?type=multiaxis&appId=${user.appId}&orderDesc=true`);
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

async function getUsersVerticalBars() {
    try {
        const response = await fetch(import.meta.env.VITE_SERVER_URL + `/widgets/?type=verticalbar&appId=${user.appId}&orderDesc=true`);
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
    margin-bottom: 2rem;
    flex-wrap: wrap;
}

.graph-div {
    flex-basis: 49%;
    margin-bottom: 2rem;
}

.card {
    border: white;
}
</style>
  


  
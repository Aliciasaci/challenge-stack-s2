<template v-if="user">
    <Header />
    <span class="p-buttonset">
        <!-- <Button @click="generatePreferencesModal" label="Préférences" icon="pi pi-heart" severity="secondary" outlined /> -->
        <Button @click="generateAppIDModal" label="APP ID" icon="pi pi-key" severity="secondary" outlined />
        <Button @click="generateTagModal" label="TAGS" icon="pi pi-tags" severity="secondary" outlined />
        <Button @click="generateParamModal" label="Widgets" icon="pi pi-plus" severity="secondary" outlined />
        <Button @click="" label="Mon site" icon="pi pi-plus" severity="secondary" outlined />

    </span>

    <!-- Cards-->
    <Cards />
    <!--Cards -->

    <!--Les modals-->
    <AppIDModal :visible="isAppIDModalVisible" />
    <!-- <PreferencesModal :visible="isPreferencesModalVisible" /> -->
    <TagsModal :visible="isTagsModalVisible" />
    <ParamModal :visible="isParamModalVisible" />
    <!--Les modals -->

    <div class="analytics">
        <div class="graph" v-if="userMultiAxes">
            <div v-for="graph in userMultiAxes" :key="graph.id" class="graph-div">
                <Graph :graph="graph"></Graph>
            </div>
        </div>

        <div class="graph" v-if="userVerticalBars">
            <div v-for="graph in userVerticalBars" :key="graph.id" class="graph-div">
                <Graph :graph="graph"></Graph>
            </div>
        </div>

        <div class="detail">
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
const isPreferencesModalVisible = ref(false);
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
            appEvents.value = await getEvents();
            userMultiAxes.value = await getUsersMultiAxes();
            userVerticalBars.value = await getUsersVerticalBars();

            console.log(userMultiAxes.value);
            console.log(userVerticalBars.value);
        }
    } catch (error) {
        console.error(error);
    }
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

async function getEvents() {
    try {
        const response = await fetch(`http://localhost:3000/events/?appId=${user.appId}&orderDesc=true&page_size=10&page_number=1`)
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

async function getUsersMultiAxes() {
    try {
        const response = await fetch(`http://localhost:3000/widgets/?type=multiaxis&appId=${user.appId}&orderDesc=true`);
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
        const response = await fetch(`http://localhost:3000/widgets/?type=verticalbar&appId=${user.appId}&orderDesc=true`);
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
<template v-if="user">
    <Header />
    <span class="p-buttonset">
        <Button @click="generatePreferencesModal" label="Préférences" icon="pi pi-heart" severity="secondary" outlined />
        <Button @click="generateAppIDModal" label="APP ID" icon="pi pi-key" severity="secondary" outlined />
        <Button @click="generateTagModal" label="TAGS" icon="pi pi-tags" severity="secondary" outlined />
        <Button @click="generateParamModal" label="Widgets" icon="pi pi-plus" severity="secondary" outlined />
    </span>
    <div v-if="isLoggedInAsUser">
        <p>Vous êtes connecté en tant que {{ currentUser.firstname }} ({{ currentUser.role }})</p>
        <Button @click="logoutAsUser">Se déconnecter</Button> <!-- fix using only one button -->
    </div>

    <!-- Cards-->
    <Cards />
    <!--Cards -->

    <!--Les modals-->
    <AppIDModal :visible="isAppIDModalVisible" />
    <PreferencesModal :visible="isPreferencesModalVisible" />
    <TagsModal :visible="isTagsModalVisible" />
    <ParamModal :visible="isParamModalVisible" />
    <!--Les modals -->


    <div class="analytics">
        <div class="graph">
            <div id="graph1">
                <VerticalBar></VerticalBar>
            </div>
            <div id="graph2">
                <MultiAxis></MultiAxis>
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

.graph-div {
    flex-basis: 48%;
}

.card {
    border: white;
}
</style>
  


  
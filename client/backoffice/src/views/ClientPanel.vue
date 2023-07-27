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
import { mapGetters, mapActions } from '../store/map-state';
import ParamModal from "../components/ParamModal.vue";

const isAppIDModalVisible = ref(false);
const isPreferencesModalVisible = ref(false);
const isTagsModalVisible = ref(false);
const isParamModalVisible = ref(false);
const user = JSON.parse(localStorage.getItem('user'));
import { useStore } from 'vuex';
const store = useStore();
let appEvents = ref();
let nbVisitsPerMonthArray = [];
let displayCards = [];
const { isLoggedInAsUser, currentUser } = mapGetters('loginAsUser');
const { logoutAsUser } = mapActions('loginAsUser');

onMounted(async () => {
    appEvents = await getEvents();
    console.log(appEvents);
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
        const response = await fetch(`http://localhost:3000/events/?appId=${user.appId}&orderDesc=true`)
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

async function getTags() {
    try {
        const response = await fetch(`http://localhost:3000/tags/?appId=${user.appId}`)
        if (!response.ok) {
            throw new Error(`erreur serveur (${response.status} ${response.statusText})`);
        }

        const data = await response.json();
        console.log(data);
        return data;

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
        <router-link to="/tunnel">
            <Button label="Tunnel" icon="pi pi-arrow-right-arrow-left" severity="secondary" outlined />
        </router-link>
        
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
    <Dialog v-model:visible="tunnelDialog" :style="{ width: '450px' }" header="Créer des tunnels de conversions" :modal="true" class="p-fluid">
        <!-- <label for="tag" class="mb-3">Inventory Status</label>
        <Dropdown id="tag" v-model="" :options="statuses" optionLabel="label" placeholder="Select a Status">
            <template #value="slotProps">
                <div v-if="slotProps.value && slotProps.value.value">
                    <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
                </div>
                <div v-else-if="slotProps.value && !slotProps.value.value">
                    <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
                </div>
                <span v-else>
                    {{ slotProps.placeholder }}
                </span>
            </template>
        </Dropdown> -->


        <template #footer>
            <Button label="Annuler" icon="pi pi-times" class="p-button-text" @click="tunnelDialog = false" />
            <Button label="Confirmer" icon="pi pi-check" class="p-button-text" @click="" />
        </template>
    </Dialog>
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

#graph1,
#graph2 {
    flex-basis: 49%;
    height: 100%;
}

.card {
    border: white;
}
</style>
  


  
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


const isAppIDModalVisible = ref(false);
const isPreferencesModalVisible = ref(false);
const isTagsModalVisible = ref(false);
const user = JSON.parse(localStorage.getItem('user'));
const appEvents = ref(false);


onMounted(async () => {
    if (user.appId) {
        appEvents.value = await getEventsByAppId(user.appId);
        console.log(appEvents.value)
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
</script>

<template v-if="user">
    <Header />
    <span class="p-buttonset">
        <Button @click="generatePreferencesModal" label="Préférences" icon="pi pi-heart" severity="secondary" outlined />
        <Button @click="generateAppIDModal" label="APP ID" icon="pi pi-key" severity="secondary" outlined />
        <Button @click="generateTagModal" label="TAGS" icon="pi pi-tags" severity="secondary" outlined />
    </span>

    <!--Cards-->
    <Cards  v-if="appEvents" :events="appEvents"/>
    <!--Cards-->

    <!--Les modals-->
    <AppIDModal :visible="isAppIDModalVisible" />
    <PreferencesModal :visible="isPreferencesModalVisible" />
    <TagsModal :visible="isTagsModalVisible" />
    <!--Les modals-->


    <div class="analytics" v-if="appEvents">
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
</style>
  


  
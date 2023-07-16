<script setup>
import { ref } from 'vue';
import Header from '../components/ClientHeader.vue';
import VerticalBar from '../components/VerticalBar.vue';
import MultiAxis from '../components/MultiAxis.vue';
import AnalyticsDetail from '../components/AnalyticsDetail.vue';
import Cards from '../components/Cards.vue';
import ApiKeyModal from '@/components/ApiKeyModal.vue';
import PreferencesModal from '@/components/PreferencesModal.vue';

const isApiKeyModalVisible = ref(false);
const isPreferebcesModalVisible = ref(false);


const generateApiKey = () => {
    isApiKeyModalVisible.value = true;
}

const generatePreferences = () => {
    isPreferebcesModalVisible.value = true;
}

</script>

<template>
    <Header />
    <span class="p-buttonset">
        <Button @click="generatePreferences" label="Préférences" icon="pi pi-check" severity="secondary" outlined />
        <Button @click="generateApiKey" label="API KEY" icon="pi pi-trash" severity="secondary" outlined />
    </span>
    <Cards />
    <ApiKeyModal id="api-key-modal"  :visible="isApiKeyModalVisible"/>
    <PreferencesModal id="api-key-modal"  :visible="isPreferebcesModalVisible"/>

    <div class="analytics">
        <div class="detail">
            <AnalyticsDetail></AnalyticsDetail>
        </div>
        <div class="graph">
            <VerticalBar></VerticalBar>
            <MultiAxis></MultiAxis>
        </div>
    </div>
</template>
<style>
body {
    /* background-color: #fdf7ef; */
    background-image: linear-gradient(to top, #fdcbf114 0%, #fdcbf163 1%, #e6dee95c 100%);
}

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
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: auto;
}

.graph {
    flex-basis: 49%;
}

.detail {
    flex-basis: 49%;
}
</style>
  


  
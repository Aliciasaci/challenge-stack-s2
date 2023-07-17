<script setup>
import { ref } from 'vue';
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
const user =  JSON.parse(localStorage.getItem('user'));


const generateAppIDModal = () => {
    isAppIDModalVisible.value = true;
}

const generatePreferencesModal = () => {
    isPreferencesModalVisible.value = true;
}

const generateTagModal = () => {
    isTagsModalVisible.value = true;
}

</script>

<template v-if="user">
    <Header/>
    <span class="p-buttonset">
        <Button @click="generatePreferencesModal" label="Préférences" icon="pi pi-heart" severity="secondary" outlined />
        <Button @click="generateAppIDModal" label="APP ID" icon="pi pi-key" severity="secondary" outlined />
        <Button @click="generateTagModal" label="TAGS" icon="pi pi-tags" severity="secondary" outlined />
    </span>

    <!--Cards-->
    <Cards />
    <!--Cards-->

    <!--Les modals-->
    <AppIDModal :visible="isAppIDModalVisible" />
    <PreferencesModal :visible="isPreferencesModalVisible" />
    <TagsModal  :visible="isTagsModalVisible" />
    <!--Les modals-->


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
  


  
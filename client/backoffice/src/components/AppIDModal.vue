<script setup>
import { ref } from "vue";
import { defineProps } from 'vue';

const visible = defineProps(['visible']);
const value = ref(null);
const urlSite = ref(null);

const generateAppID = () => {
    //check if its a valid URl 
    
    alert(urlSite.value);
}


</script>

<template>
    <div class="flex justify-content-center">
        <Dialog v-model:visible="visible.visible" modal header="Générer APP ID" :style="{ width: '600px' }">
            <p>
            <div class="card-modal mb-5">
                <span>Saisir Url site</span>
                <InputText type="text" v-model="urlSite" placeholder="HVGUYRJBDFIJEPFJZOJEFIB" :style="{ width: '380px' }"/>
                <Button type="submit" label="Générer" outlined @click="generateAppID"/>
            </div>
            <div class="card-modal">
                <span>APP ID :</span>
                <InputText type="text" v-model="value" placeholder="HVGUYRJBDFIJEPFJZOJEFIB" :style="{ width: '380px' }" disabled/>
                <Button label="Copier" outlined />
            </div>
            </p>
        </Dialog>
    </div>
</template>

<style>
.card-modal {
    display: flex;
    align-items: center;
    justify-content: space-between;
}


</style>
<template>
    <div class="flex justify-content-center">
        <Dialog v-model:visible="visible.visible" modal header="Générer APP ID" :style="{ width: '40vw' }">
            <p>
            <div class="card-modal">
                APP ID :
                <InputText type="text" v-model="value" placeholder="HVGUYRJBDFIJEPFJZOJEFIB" :style="{ width: '24vw' }" />
                <Button label="Copier" outlined />
            </div>
            </p>
        </Dialog>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { defineProps } from 'vue';

const visible = defineProps(['visible']);
const value = ref(null);

</script>
<style>
.card-modal {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
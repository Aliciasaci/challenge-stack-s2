<template>
    <div class="flex justify-content-center">
        <Dialog v-model:visible="visible.visible" modal header="Préférences" :style="{ width: '40vw' }">
            <p>
          
            </p>
        </Dialog>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { defineProps } from 'vue';

const visible = defineProps(['visible']);

</script>
<style>

</style>
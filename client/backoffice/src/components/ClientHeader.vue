
<template>
    <div class="card relative z-2">
        <Menubar :model="items">
            <template #start>
            </template>
        </Menubar>
    </div>
</template>

<script setup>
import { ref } from "vue";

const items = ref([
    {
        label: 'Accueil',
        icon: 'pi pi-fw pi-home',
        url: '/client-pannel'
    },
    {
        label: 'Profil',
        icon: 'pi pi-fw pi-user',
    },
    {
        label: 'Se déconnecter',
        icon: 'pi pi-fw pi-sign-out'
    }

]);
</script>
<style>
.p-menubar {
    justify-content: end;
    background: white;
}
</style>
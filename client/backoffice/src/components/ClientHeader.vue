
<template v-if="user">
    <div class="card relative z-2">
        <Menubar :model="items">
            <template #start>
                <div style="color: rgb(179, 34, 208);">Bonjour {{user.firstname }} {{ user.lastname }} ! </div>
            </template>
        </Menubar>
    </div>
</template>

<script setup>
import { ref } from "vue";
const user =  JSON.parse(localStorage.getItem('user'));

const items = ref([
    {
        label: 'Accueil',
        icon: 'pi pi-fw pi-home',
        url: '/client-pannel'
    },
    {
        label: 'Profil',
        icon: 'pi pi-fw pi-user',
        url: '/profil-user'
    },
    {
        label: 'Se déconnecter',
        icon: 'pi pi-fw pi-sign-out'
    },

]);




</script>
<style>
.p-menubar {
    justify-content: end;
    background: white;
}
</style>
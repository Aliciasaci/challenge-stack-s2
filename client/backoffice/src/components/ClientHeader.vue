
<template v-if="user">
    <div class="card relative z-2 card-header">
        <Menubar :model="items">
            <template #start>
                <div id="hello-message">Bonjour {{ user.firstname }} ! </div>
            </template>
        </Menubar>
    </div>
</template>

<script setup>
import { ref } from "vue";
const user = JSON.parse(localStorage.getItem('user'));

const items = ref([
    {
        label: 'Accueil',
        icon: 'pi pi-fw pi-home',
        url: '/client-panel'
    },
    {
        label: 'Profil',
        icon: 'pi pi-fw pi-user',
        url: '/profil-user'
    },
    {
        label: 'Se déconnecter',
        icon: 'pi pi-fw pi-sign-out',
        url: '/logout',
    },

]);




</script>
<style>
.p-menubar {
    justify-content: end;
    background: white;
    border: none;
}

.card-header {
    padding: 10px;
    border-radius: 0;
    display: flex;
    justify-content: end;
}

#hello-message {
    font-family: 'Noto Serif', serif;
    color: #F72C25DB;
    font-size: initial;
}

@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:wght@300;400;600&display=swap');
</style>
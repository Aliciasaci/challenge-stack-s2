
<template v-if="user">
    <div class="card relative z-2 card-header">
        <div v-if="isLoggedInAsUser">
            <p>Vous êtes connecté en tant que {{ currentUser.firstname }} ({{ currentUser.role }})</p>
            <Button @click="logoutAsUser" severity="secondary">Arrêtez cette session</Button> <!-- fix using only one button -->
        </div>
        <Menubar :model="items">
            <template #start>
                <div id="hello-message">Bonjour {{ user.firstname }} ! </div>
            </template>
        </Menubar>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { mapGetters, mapActions } from '../store/map-state';

const { isLoggedInAsUser, currentUser } = mapGetters('loginAsUser');
const { logoutAsUser } = mapActions('loginAsUser');
const user = ref({});
if (isLoggedInAsUser.value) {
    user.value = currentUser.value;
} else {
    user.value = JSON.parse(localStorage.getItem('user'));
}

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
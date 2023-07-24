<script setup>
import Header from '@/components/ClientHeader.vue';
import Password from 'primevue/password';
const user = JSON.parse(localStorage.getItem('user'));
</script>

<template v-if="user">
    <Header />
    <div class="card picture">
        <div class="avatar-wrapper">
            <Avatar label="P" class="mr-2" size="xlarge" shape="circle" :class="avatar" />
        </div><br />
        <div class="mt-2">
            {{ user.firstname }} {{ user.lastname }}
        </div>
    </div>
    <div class="card wrapper">
        <div class="mb-3">
            <label class="mb-3">Nom</label>
            <InputText v-model="user.firstname" width="100%" class="mt-1" />
        </div>
        <div class="mb-3">
            <label class="mb-3">Prénom</label>
            <InputText v-model="user.lastname" width="100%" class="mt-1" />
        </div>
        <div class="mb-3">
            <label class="mb-3">Email</label>
            <InputText v-model="user.email"  width="100%" class="mt-1" />
        </div>
        <div class="mb-3">
            <label class="mb-3">Mot de passe</label>
            <InputText v-model="user.password"  width="100%" class="mt-1" />
        </div>
        <div class="mb-3">
            <label class="mb-3">Societe</label>
            <InputText v-model="user.societe"  width="100%" class="mt-1" />
        </div>
        <div class="mb-3">
            <label class="mb-3">Kbis</label>
            <InputText v-model="user.kbis"  width="100%" class="mt-1" />
        </div>
        <div class="mb-3">
            <label class="mb-3">Téléphone</label>
            <InputText v-model="user.telephone"  width="100%" class="mt-1" />
        </div>
        <div class="mb-3">
            <label class="mb-3">Url site</label>
            <InputText v-model="user.urlsite"  width="100%" class="mt-1" />
        </div>
    </div>
</template>


<style>
.wrapper {
    width: 50rem;
    margin: auto;
    text-align: start;
}

.picture {
    width: 50rem;
    margin: auto;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}


.p-avatar.p-avatar-xl {
    width: 8rem;
    height: 8rem;
}

.p-inputtext {
    width: 100%;
}

.card {
    padding-top: 1rem;
}

.avatar {
    flex-basis: 100%;
}

.avatar-wrapper {
    flex-basis: 100%;
}
</style>
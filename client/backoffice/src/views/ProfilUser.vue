<script setup>
import Header from '@/components/ClientHeader.vue';
const user = JSON.parse(localStorage.getItem('user'));



</script>

<template>
    <Header />
    <div class="card picture">
        <Avatar label="P" class="mr-2" size="xlarge" shape="circle" />
    </div>
    <div class="card wrapper">
        <div class="card">
            <label>Nom</label>
            <InputText v-model="value" disabled  width="100%"/>
        </div>
        <div class="card">
            <label>Prénom</label>
            <InputText v-model="value" disabled width="100%"/>
        </div>
        <div class="card">
            <label>Email</label>
            <InputText v-model="value" disabled width="100%"/>
        </div>
        <div class="card">
            <label>Mot de passe</label>
            <InputText v-model="value" disabled width="100%"/>
        </div>
    </div>
</template>


<style>
.wrapper {
    width: 50rem;
    margin: auto;
}

.picture {
    width: 50rem;
    margin: auto;
    margin-bottom: 2rem;
}


.p-avatar.p-avatar-xl{
    width: 8rem;
    height: 8rem;
}

.p-inputtext{
    width : 100%;
}

.card{
    padding-top: 1rem;
}
</style>
<script setup>
import Header from '@/components/ClientHeader.vue';
const user =  JSON.parse(localStorage.getItem('user'));



</script>

<template>
    <Header />
    <div>
        <h1>Profil user</h1>

        data : {{ user }}
    </div>
</template>


<style>
</style>
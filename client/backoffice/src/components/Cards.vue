<script setup>
import { ref, watch } from "vue";
import { defineProps } from 'vue';

const data = ref([
    { title: 'Nombre de sessions actives', nb: '26', icon: 'pi pi-fw pi-users text-blue-500 text-xl' },
    { title: 'Nombre de vues par Page', nb: '65', icon: 'pi pi-fw pi-eye text-blue-500 text-xl' },
    { title: 'Nombre de cliques', nb: '97', icon: 'pi pi-fw pi-pencil text-blue-500 text-xl' },
    { title: 'Autre stat', nb: '76', icon: 'pi pi-fw pi-hashtag text-blue-500 text-xl' },
    { title: 'Autre stat', nb: '09', icon: 'pi pi-fw pi-hashtag text-blue-500 text-xl' },
]);

const nbCards = ref(data.length);

watch(nbCards, (newVal) => {
  document.documentElement.style.setProperty('--nb-cards', newVal);
});
</script>

<template>
    <div class="stat-cards">
        <div v-for="d in data" :key="d.title" class="box">
            <div class="title-wrapper">
                <span class="card-title">{{ d.title }}</span><span class="icon-style"><i :class="d.icon"></i></span>
            </div><br/>
                <span class="text-900 font-medium text-xl">{{ d.nb }}</span>
        </div>
    </div>
</template>


<style lang="scss">
:root {
  --box-width: calc(100% / var(--nb-cards, 1));
}

.box {
    background: var(--surface-card);
    border: 1px solid var(--surface-border);
    padding: 2rem;
    margin: 0rem 1rem 2rem 1rem;
    box-shadow: var(--card-shadow);
    border-radius: 12px;
    flex-basis: var(--box-width);
    height: 150px;
}

.box:last-child {
    margin-bottom: 29px;
}

.stat-cards {
    width: 82%;
    display: flex;
    margin: 2rem auto;
    justify-content: space-around;
    text-align: start;
}

.card-title{
    color: #9e9e9e;
    display: inline-block;
    width: 70%;
}

.title-wrapper{
    display: flex;
    align-items: top;
    justify-content: space-between;
}

.icon-style{
    width:2.5rem;
    height:2.5rem;
    border-radius: 5px;
    background-color: #d0e1fd;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
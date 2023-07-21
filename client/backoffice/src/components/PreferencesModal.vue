<template>
    <div class="flex justify-content-center">
        <Dialog v-model:visible="visible.visible" modal header="Préférences" :style="{ width: '40vw' }">
            <div class="card">
                <div v-for="(setting, settingIndex) in settings" :key="settingIndex">
                    <span class="category-title">{{ setting.title }} <i class="pi pi-angle-down"></i></span>
                    <div class="settings" v-for="(option, optionIndex) in setting.options" :key="optionIndex">
                        {{ option.text }}
                        <InputSwitch v-model="checkedBtns[calculateIndex(settingIndex, optionIndex)]" />
                    </div>
                </div>
                <Button @click="setCheckedBtns" label="Valider" />
            </div>
        </Dialog>
    </div>
</template>
  
<script setup>
import { ref, onMounted, computed, nextTick } from 'vue';
import { defineProps } from 'vue';
import { useStore } from 'vuex';

const visible = defineProps(['visible']);
const store = useStore();
const settings = ref([
    {
        title: 'Statistiques',
        options: [
            { text: 'Nombre de sessions actives' },
            { text: 'nombre de vues par page' },
            { text: 'nombres de cliques par tague' },
            { text: 'nombres de submit par tague' },
        ],
    },
    {
        title: 'Représentation graphique du nombres de vues par mois',
        options: [
            { text: 'Représentation par barre vertical' },
            { text: 'Représentation Multiaxes' },
            { text: 'Représentation par Heatmap' },
        ],
    },
    {
        title: 'Représentation graphique du nombres de visiteur par mois',
        options: [
            { text: 'Représentation par barre vertical' },
            { text: 'Représentation Multiaxes' },
            { text: 'Représentation par Heatmap' },
        ],
    },
]);

const checkedBtns = computed(() => store.state.checkedBtns);

onMounted(() => {
    const numButtons = settings.value.reduce((total, setting) => total + setting.options.length, 0);

    const checkedBtnsPreferences = store.state;
    console.log("here",store.state.checkedBtns);
    if(checkedBtnsPreferences == null){
        store.dispatch('initializeCheckedBtns', numButtons);
    }


});

const setCheckedBtns = () => {
    for (let i = 0; i < checkedBtns.length; i++) {
        if (i % 2 === 0) {
            store.commit('setCheckedBtn', { index: i, value: true });
        }
    }
};

const calculateIndex = (settingIndex, optionIndex) => {
    let cumulativeIndex = 0;
    for (let i = 0; i < settingIndex; i++) {
        cumulativeIndex += settings.value[i].options.length;
    }
    cumulativeIndex += optionIndex;
    return cumulativeIndex;
};

</script>
  
<style>
.settings {
    display: flex;
    justify-content: space-between;
    margin: 1rem 0 1rem 0;
}

.category-title {
    font-size: 1.2em;
    color: rgb(135, 135, 135);
}
</style>
  
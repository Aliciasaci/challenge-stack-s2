
<template>
    <div class="flex justify-content-center">
        <Dialog v-model:visible="visible.visible" modal header="Header" :style="{ width: '45vw' }">
            <h5>Type de donnée *</h5>
            <div class="card flex justify-content-center">
                <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a City"
                    class="w-full md:w-14rem" required/>
            </div>
            <h5>Date</h5>
            <div class="wrapper">
                <div class="card flex justify-content-center">
                    <Calendar v-model="date1" showIcon />
                </div>
                <div class="card flex justify-content-center">
                    <Calendar v-model="date2" showIcon />
                </div>
            </div>

            <h5>Taux ou valeur *</h5>
            <div class="card flex flex-wrap gap-3 mt-5 flex align-items-center justify-content-center">
                <div class="flex align-items-center">
                    <RadioButton v-model="choix" name="Taux" value="Taux" />
                    <label for="ingredient3" class="ml-2">Taux</label>
                </div>
                <div class="flex align-items-center">
                    <RadioButton v-model="choix" name="Valeur absolue" value="Valeur absolue" />
                    <label for="ingredient4" class="ml-2">Valeure absolue</label>
                </div>
            </div>


            <h5>Comparer à </h5>
            <div class="card flex justify-content-center">
                <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a City"
                    class="w-full md:w-14rem" required/>
            </div>

            <h5>Représentation graphique *</h5>
            <div class="card flex justify-content-center">
                <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a City"
                    class="w-full md:w-14rem" required/>
            </div>

            <Button label="Générer" />
        </Dialog>
    </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
const visible = defineProps(['visible']);

const selectedCity = ref();
const date1 = ref();
const date2 = ref();
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);



</script>
<style lang="scss">
.wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
        margin-bottom: 0;
    }
}
</style>
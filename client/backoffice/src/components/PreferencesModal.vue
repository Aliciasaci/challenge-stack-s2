<template>
    <div class="flex justify-content-center">
        <Dialog v-model:visible="visible.visible" modal header="Préférences" :style="{ width: '40vw' }">
            <div class="card ">
                <div>
                    <span class="category-title">Statistiques <i class="pi pi-angle-down"></i></span>
                    <div class="settings">
                        Nombre de sessions actives
                        <InputSwitch v-model="checked" />
                    </div>
                    <div class="settings">
                        nombre de vues par page
                        <InputSwitch v-model="checked" />
                    </div>
                    <div class="settings">
                        nombres de cliques par tague
                        <InputSwitch v-model="checked" />
                    </div>
                    <div class="settings">
                        nombres de submit par tague
                        <InputSwitch v-model="checked" />
                    </div>
                </div>
                <div>
                    <span class="category-title">Représentation graphique du nombres de vues par mois <i class="pi pi-angle-down"></i></span>
                    <div class="settings">
                        Représentation par barre vertical
                        <InputSwitch v-model="checked" />
                    </div>
                    <div class="settings">
                        Représentation Multiaxes
                        <InputSwitch v-model="checked" />
                    </div>
                    <div class="settings">
                        Représentation par Heatmap
                        <InputSwitch v-model="checked" />
                    </div>
                </div>
                <div>
                    <span class="category-title">Représentation graphique du nombres de visiteur par mois <i class="pi pi-angle-down"></i></span>
                    <div class="settings">
                        Représentation par barre vertical
                        <InputSwitch v-model="checked" />
                    </div>
                    <div class="settings">
                        Représentation Multiaxes
                        <InputSwitch v-model="checked" />
                    </div>
                    <div class="settings">
                        Représentation par Heatmap
                        <InputSwitch v-model="checked" />
                    </div>
                </div>
            </div>
        </Dialog>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { defineProps } from 'vue';

const visible = defineProps(['visible']);
const checked = ref(true);

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
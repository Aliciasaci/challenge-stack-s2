<template>
    <div class="flex justify-content-center">
        <Dialog v-model:visible="visible.visible" modal header="TAGS" :style="{ width: '40vw' }">
            <div>
                <div class="card-modal">
                    <InputText type="text" v-model="value" placeholder="HVGUYR" :style="{ width: '31vw' }" />
                    <Button label="Ajouter" outlined />
                </div>
                <div class="tags-list">
                    <ul>
                        <li class="tag-element" v-for="tag in tags" :key="tag.code">{{ tag.name }}
                            <div class="actions">
                                <Button icon="pi pi-heart" severity="help" text raised rounded aria-label="Favorite" class="mr-2"/>
                                <Button icon="pi pi-times" severity="danger" text raised rounded aria-label="Cancel" />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </Dialog>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { defineProps } from 'vue';

const visible = defineProps(['visible']);
const value = ref(null);
const selectedCity = ref();


const tags = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);

</script>
<style>
.card-modal {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.tags-list {
    margin-top: 1rem;
    text-align: start;
}

.tag-element{
    border: 1px solid rgb(239, 239, 239);
    margin: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    border-radius: 6px;
}
</style>
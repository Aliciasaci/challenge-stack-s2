<template>
    <div class="flex justify-content-center wrapper" >
        <Dialog v-model:visible="visible.visible" modal header="TAGS" :style="{ width: '40vw' }">
            <Button icon="pi pi-times" severity="danger" text rounded aria-label="Cancel" @click="closeModal"/>
            <div>
                <div class="card-modal">
                    <InputText type="text" v-model="generatedTag" placeholder="Cliquer sur générer"
                        :style="{ width: '' }" />
                    <Button type="submit" label="Générer" outlined @click="generateRandomTag" />
                    <InputText type="text" v-model="description" placeholder="Description" :style="{ width: '' }" />
                    <Button type="submit" label="Ajouter" outlined @click="createTag" />

                </div>
                <div class="tags-list">
                    <ul>
                        <li class="tag-element" v-for="tag in tags" :key="tag.code">
                            <span class="comm">Tag : {{ tag.commentaire }}</span> |
                            <span class="desc">Description: {{ tag.description }}</span>
                            <div class="actions">
                                <Button icon="pi pi-times" severity="danger" text raised rounded aria-label="Cancel"
                                    @click="deleteTag(tag.id)" />
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
import { onMounted } from 'vue';

const visible = defineProps(['visible']);
const generatedTag = ref(null);
const description = ref(null);
const user = JSON.parse(localStorage.getItem('user'));
const tags = ref(null);
let display = true;


onMounted(() => {
    getUsersTags(user.id);
});


async function getUsersTags(userId) {
    try {
        const response = await fetch(import.meta.env.VITE_SERVER_URL+`/users/${userId}/tags`);
        if (!response.ok) {
            throw new Error(`erreur serveur (${response.status} ${response.statusText})`);
        }
        tags.value = await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function generateRandomTag() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const tagLength = 6;

    let randomTag = '';
    for (let i = 0; i < tagLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomTag += characters[randomIndex];
    }
    generatedTag.value = randomTag;
}


async function createTag() {
    if (!generatedTag.value) {
        alert("Merci de générer un tag avant de cliquer sur Ajouter");
    } else {
        try {
            const response = await fetch(import.meta.env.VITE_SERVER_URL+`/tags/`,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ commentaire: generatedTag.value, id_user: user.id, description: description.value })
                }
            );
            if (!response.ok) {
                throw new Error(`erreur serveur (${response.status} ${response.statusText})`);
            } else {
                const data = await response.json();
                if (data) {
                    alert(`Tag ${generatedTag.value} crée avec success`);
                    tags.value.push(data);
                }
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}


async function deleteTag(tagId) {
    try {
        const response = await fetch(import.meta.env.VITE_SERVER_URL+`/tags/${tagId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        if (!response.ok) {
            throw new Error(`erreur serveur (${response.status} ${response.statusText})`);
        }

        if (response.status == 204) {
            alert("Tag supprimé avec success");
            getUsersTags(user.id);
        }

    } catch (error) {
        console.error(error);
        throw error;
    }
}

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

.tag-element {
    border: 1px solid rgb(239, 239, 239);
    margin: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    border-radius: 6px;
}

.comm, .desc{
    width: 10rem;
}
</style>
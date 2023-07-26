<script setup>
import { ref } from "vue";
import { defineProps } from 'vue';
import { extractIdentifiers } from "vue/compiler-sfc";

const visible = defineProps(['visible']);
const urlSite = ref(null);
const user = JSON.parse(localStorage.getItem('user'));
const generatedAppId = ref(user.appId);

async function getUserState(userId) {
    try {
        const response = await fetch(import.meta.env.VITE_SERVER_URL+`/users/${userId}`);
        if (!response.ok) {
            throw new Error(`erreur serveur (${response.status} ${response.statusText})`);
        }
        const userData = await response.json();
        localStorage.setItem("user", JSON.stringify(user));
        return userData;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function isURLValid(url) {
  const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(:[0-9]+)?(\/[^\s]*)?$/;
  return urlPattern.test(url);
}


async function generateAppID() {
    //1. Vérifier que l'url copié est valide
    if(!isURLValid(urlSite.value)){
        alert("Url de site non valide");
        return;
    }

    //2.Génerer le token
    let hasError = false;
    try {
        const response = await fetch(import.meta.env.VITE_SERVER_URL+'/users/' + user.id + '/appid/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        });
        if (response.status === 422) {
            hasError = true;
        }
        const data = await response.json();
        if (hasError) {
            return Promise.reject(data);
        } else {
            //update l'état du user
            let userData = await getUserState(user.id);
            if (userData) {
                generatedAppId.value = userData.appId;
                return Promise.resolve(data);
            }
        }
    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
    <div class="flex justify-content-center">
        <Dialog v-model:visible="visible.visible" modal header="Générer APP ID" :style="{ width: '600px' }">
            <div class="card-modal mb-5" v-if="!user.appId">
                <span>Saisir Url site</span>
                <InputText type="text" v-model="urlSite" placeholder="https://example.fr"
                    :style="{ width: '380px' }" />
                <Button type="submit" label="Générer" outlined @click="generateAppID" />
            </div>
            <div class="card-modal">
                <span>APP ID :</span>
                <InputText type="text" placeholder="" :style="{ width: '380px' }" disabled v-model="generatedAppId" />
                <Button label="Copier" outlined />
            </div>
        </Dialog>
    </div>
</template>

<style>
.card-modal {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
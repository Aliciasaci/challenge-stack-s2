<template>
  <div
    class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
    <div class="flex flex-column align-items-center justify-content-center">
      <img
        :src="logoUrl"
        alt="FlutterEase logo"
        class="mb-5 w-6rem flex-shrink-0"
      />
      <div
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(
            180deg,
            var(--primary-color) 10%,
            rgba(33, 150, 243, 0) 30%
          );
        "
      >
        <div
          class="w-full surface-card py-4 px-5 sm:px-8"
          style="border-radius: 53px"
        >
          <form @submit.prevent="createAccount">
            <div v-if="response_message" class="notification is-info is-light">
              {{ response_message }}
            </div>
            <div class="text-center mb-5">
              <div class="text-900 text-3xl font-medium mb-3">Bienvenue</div>
              <span class="text-600 font-medium"
                >Entrez vos identifiants pour vous inscrire</span
              >
            </div>
            <div>
              <div class="formgrid grid">
                <div class="field col">
                  <label for="nom" class="block text-900 text font-medium mb-2"
                    >Nom</label
                  >
                  <InputText
                    id="nom"
                    type="text"
                    placeholder="Nom"
                    class="w-full md:w-30rem mb-2"
                    style="padding: 1rem"
                    v-model="nom"
                    required
                  />
                </div>
                <div class="field col">
                  <label
                    for="prenom"
                    class="block text-900 text font-medium mb-2"
                    >Prénom</label
                  >
                  <InputText
                    id="prenom"
                    type="text"
                    placeholder="Prenom"
                    class="w-full md:w-30rem mb-2"
                    style="padding: 1rem"
                    v-model="prenom"
                    required
                  />
                </div>
              </div>
              <div class="formgrid grid">
                <div class="field col">
                  <label
                    for="email"
                    class="block text-900 text font-medium mb-2"
                    >Email</label
                  >
                  <InputText
                    id="email"
                    type="text"
                    placeholder="Email"
                    class="w-full md:w-30rem mb-2"
                    style="padding: 1rem"
                    v-model="email"
                    required
                  />
                </div>
                <div class="field col">
                  <label
                    for="password"
                    class="block text-900 font-medium text mb-2"
                    >Mot de passe</label
                  >
                  <InputText
                    type="password"
                    id="password"
                    placeholder="Mot de passe"
                    class="w-full md:w-30rem mb-2"
                    style="padding: 1rem"
                    v-model="password"
                    :feedback="false"
                    required
                  />
                </div>
              </div>
              <div class="formgrid grid">
                <div class="field col">
                  <label
                    for="societe"
                    class="block text-900 font-medium text mb-2"
                    >Société</label
                  >
                  <InputText
                    id="societe"
                    type="text"
                    placeholder="Société"
                    class="w-full md:w-30rem mb-2"
                    style="padding: 1rem"
                    v-model="societe"
                    required
                  />
                </div>
                <div class="field col">
                  <label
                    for="telephone"
                    class="block text-900 font-medium text mb-2"
                    >Téléphone</label
                  >
                  <InputText
                    id="telephone"
                    type="Number"
                    placeholder="Téléphone"
                    class="w-full md:w-30rem mb-2"
                    style="padding: 1rem"
                    v-model="telephone"
                    required
                  />
                </div>
              </div>
              <div class="formgrid grid">
                <div class="field col">
                  <label for="kbis" class="block text-900 font-medium text mb-2"
                    >Url Kbis</label
                  >
                  <InputText
                    id="kbis"
                    type="text"
                    placeholder="Lien vers Kbis"
                    class="w-full md:w-30rem mb-2"
                    style="padding: 1rem"
                    v-model="kbis"
                    required
                  />
                </div>
              </div>

              <div
                class="flex align-items-center justify-content-between mb-5 gap-5"
              >
                <a
                  class="font-medium no-underline ml-2 text-right cursor-pointer"
                  style="color: var(--primary-color)"
                >
                  <router-link to="/login"
                    >Vous avez déjà un compte ? Se connecter.</router-link
                  >
                </a>
              </div>
              <Button
                type="submit"
                label="S'inscrire"
                class="w-full p-3 text-xl"
              ></Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useLayout } from "@/layout/composables/layout";

const nom = ref(null);
const prenom = ref(null);
const email = ref(null);
const password = ref(null);
const societe = ref(null);
const kbis = ref(null);
const telephone = ref(null);
const response_message = ref(null);
const compteIsVerified = ref(false);
const router = useRouter();
const { contextPath } = useLayout();

const logoUrl = computed(() => {
  return `${contextPath}layout/images/flutter-ease-logo.png`;
});

async function accountAlreadyExists(email) {
  try {
    const response = await fetch("users/exists?email=" + email);
    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function createAccount() {
  if (nom.value && prenom.value && email.value && password.value) {
    if (telephone.value.length > 10) {
      response_message.value = "Numéro de téléphone trop long.";
    } else {
      if (!(await accountAlreadyExists(email.value))) {
        try {
          const response = await fetch(
            import.meta.env.VITE_SERVER_URL + "/register/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                firstname: nom.value,
                lastname: prenom.value,
                email: email.value,
                password: password.value,
                societe: societe.value,
                kbis: kbis.value,
                telephone: telephone.value,
                compteIsVerified: compteIsVerified.value,
              }),
            }
          );

          if (response.status === 422) {
            const data = await response.json();
            throw data;
          } else {
            const data = await response.json();
            console.log(data);
            response_message.value = "Compte crée avec success.";
          }
        } catch (error) {
          console.error(error);
          response_message.value = error.message;
        }
      } else {
        response_message.value = "Utilisateur existe déjà";
      }
    }
  }
}
</script>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}

.surface-ground {
  background-color: none !important;
}
</style>

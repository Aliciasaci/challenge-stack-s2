<template>
  <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
  <Toast />
    <div class="flex flex-column align-items-center justify-content-center">
      <img :src="logoUrl" alt="FlutterEase logo" class="mb-5 w-6rem flex-shrink-0" />
      <div style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(
            180deg,
            var(--primary-color) 10%,
            rgba(33, 150, 243, 0) 30%
          );
        ">
        <div class="w-full surface-card py-4 px-5 sm:px-8" style="border-radius: 53px">
          <form @submit.prevent="login()">
            <div v-if="response_message" class="notification is-danger is-light">
              {{ response_message }}
            </div>
            <div class="text-center mb-5">
              <div class="text-900 text-3xl font-medium mb-3">Bienvenue</div>
              <span class="text-600 font-medium">Entrer vos identifiants pour vous connecter</span>
            </div>

            <div>
              <label for="email" class="block text-900 text-xl font-medium mb-2">Email</label>
              <InputText v-model="email" id="email" type="text" placeholder="Email" class="w-full md:w-30rem mb-5"
                style="padding: 1rem" required />

              <label for="password" class="block text-900 font-medium text-xl mb-2">Mot de passe</label>
              <InputText v-model="password" id="password" type="password" placeholder="Mot de passe"
                class="w-full md:w-30rem mb-5" style="padding: 1rem" required />

              <div class="flex align-items-center justify-content-between mb-5 gap-5">
                <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Mot
                  de passe oublié ?</a>
              </div>
              <div
                class="flex align-items-center justify-content-between mb-5 gap-5"
              >
                <a
                  class="font-medium no-underline ml-2 text-right cursor-pointer"
                  style="color: var(--primary-color)"
                >
                  <router-link to="/register"
                    >Pas de compte ? Inscrivez vous.</router-link
                  >
                </a>
              </div>
              <Button type="submit" label="Se connecter" class="w-full p-3 text-xl" />
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
import { useToast } from 'primevue/usetoast';

const email = ref(null);
const password = ref(null);
const response_message = ref(null);
const router = useRouter();
const { contextPath } = useLayout();
const toast = useToast();

const logoUrl = computed(() => {
  return `${contextPath}layout/images/flutter-ease-logo.png`;
});

async function login() {

  let hasError = false;
  try {
    const response = await fetch(import.meta.env.VITE_SERVER_URL+"/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });

    if (response.status === 422) {
      hasError = true;
    }

    const data = await response.json();
    if (hasError) {
      response_message.value = data.erreur[0];
      return Promise.reject(data);
    } else {
      const token = data.token;
      const user = data.user;

      //stocker le token et le user dans le store.
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      if(user.compteIsVerified === false) {
        toast.add({ severity: 'success', summary: 'Attention', detail: 'Attendez que votre compte soit validé pour pouvoir vous connecter.', life: 4000 });
      } else {
        if(user.role === "USER_ADMIN") {
          router.push("/admin-panel");
        } else {
          router.push("/client-panel");
        }
      }
      return Promise.resolve(data);
    }
  } catch (error) {
    console.error(error);
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

.surface-ground{
  background-color: none !important;
}
</style>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
      <div class="flex flex-column align-items-center justify-content-center">
        <!-- <img :src="logoUrl" alt="FlutterEase logo" class="mb-5 w-6rem flex-shrink-0" /> -->
        <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
          <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
            <form @submit.prevent="createAccount">
              <div v-if="response_message" class="notification is-info is-light">
                {{ response_message }}
              </div>
              <div class="text-center mb-5">
                <div class="text-900 text-3xl font-medium mb-3">Bienvenue</div>
                <span class="text-600 font-medium">Entrer vos identifiants pour s'inscrire</span>
              </div>
  
              <div>
                <label for="nom" class="block text-900 text-xl font-medium mb-2">Nom</label>
                <InputText id="nom" type="text" placeholder="Nom" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="nom" required />
  
                <label for="prenom" class="block text-900 text-xl font-medium mb-2">Prenom</label>
                <InputText id="prenom" type="text" placeholder="Prenom" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="prenom" required />
  
                <label for="email" class="block text-900 text-xl font-medium mb-2">Email</label>
                <InputText id="email" type="text" placeholder="Email" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="email" required />
  
                <label for="password" class="block text-900 font-medium text-xl mb-2">Mot de passe</label>
                <InputText id="password" type="text" placeholder="Mot de passe" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="password" required />
  
                <div class="flex align-items-center justify-content-between mb-5 gap-5">
                  <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">
                    <router-link to="/login">Vous avez déjà un compte ? Se connecter.</router-link>
                  </a>
                </div>
                <Button label="S'inscrire" class="w-full p-3 text-xl"></Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const nom = ref(null);
      const prenom = ref(null);
      const email = ref(null);
      const password = ref(null);
      const response_message = ref(null);
      const compteIsVerified = ref("false");
  
      const accountAlreadyExists = async (email) => {
        try {
          const response = await this.$api.get('users/exists?email=' + email);
          return response.data;
        } catch (error) {
          console.error(error);
          return false;
        }
      };
  
      const createAccount = async () => {
        if (nom.value && prenom.value && email.value && password.value) {
          if (!(await accountAlreadyExists(email.value))) {
            try {
              const response = await this.$api.post('/auth/signin', {
                nom: nom.value,
                prenom: prenom.value,
                email: email.value,
                password: password.value,
                compteIsVerified: compteIsVerified.value,
              });
              console.log(response.data);
              response_message.value = response.data.message;
            } catch (error) {
              console.error(error);
            }
          } else {
            response_message.value = "Utilisateur existe déjà";
          }
        }
      };
  
      return {
        nom,
        prenom,
        email,
        password,
        response_message,
        createAccount,
      };
    },
  };
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
  </style>
  
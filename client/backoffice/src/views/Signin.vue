<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <!-- <img :src="logoUrl" alt="FlutterEase logo" class="mb-5 w-6rem flex-shrink-0" /> -->
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <form @submit.prevent="createAccount">
                        <div v-if=this.response_message class="notification is-info is-light">
                            {{ this.response_message }}
                        </div>
                        <div class="text-center mb-5">
                            <div class="text-900 text-3xl font-medium mb-3">Bienvenue</div>
                            <span class="text-600 font-medium">Entrer vos identifiants pour s'inscrire</span>
                        </div>
    
                        <div>
                            <label for="nom" class="block text-900 text-xl font-medium mb-2">Nom</label>
                            <InputText id="nom" type="text" placeholder="Nom" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="this.nom" required/>
    
                            <label for="prenom" class="block text-900 text-xl font-medium mb-2">Prenom</label>
                            <InputText id="prenom" type="text" placeholder="Prenom" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="this.prenom" required/>
    
                            <label for="email" class="block text-900 text-xl font-medium mb-2">Email</label>
                            <InputText id="email" type="text" placeholder="Email" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="this.email" required/>
    
                            <label for="password" class="block text-900 font-medium text-xl mb-2">Mot de passe</label>
                            <InputText id="password" type="text" placeholder="Mot de passe" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="this.password" required/>
    
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
export default {
    data() {
        return {
            nom: null,
            prenom: null,
            email: null,
            password: null,
            response_message: null,
            compteIsVerified : "false",
        }
    },

    methods: {
        accountAlreadyExists(email) {
            this.$api.get('users/exists?email=' + email)
                .then(response => {
                    if (response.data) {
                        return true;
                    }else{
                        return false;
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        },
        createAccount() {
            if (this.nom && this.prenom && this.email && this.password) {
                if (!this.accountAlreadyExists(this.email)) {
                    this.$api.post('/auth/signin', {
                        nom: this.nom,
                        prenom: this.prenom,
                        email: this.email,
                        password: this.password,
                        compteIsVerified : this.compteIsVerified
                    }).then(response => {
                        console.log(response.data);
                        this.response_message = response.data.message;
                    }).catch(error => {
                        console.error(error);
                    });
                } else {
                    this.response_message = "Utilisateur existe déjà"
                }
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
</style>
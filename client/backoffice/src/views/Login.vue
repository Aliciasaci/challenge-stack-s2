<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <!-- <img :src="logoUrl" alt="FlutterEase logo" class="mb-5 w-6rem flex-shrink-0" /> -->
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <form>
                        <div v-if="this.response_message" class="notification is-danger is-light">
                            {{ this.response_message }}
                        </div>
                        <div class="text-center mb-5">
                            <div class="text-900 text-3xl font-medium mb-3">Bienvenue</div>
                            <span class="text-600 font-medium">Entrer vos identifiants pour se connecter</span>
                        </div>
    
                        <div>
                            <label for="email" class="block text-900 text-xl font-medium mb-2">Email</label>
                            <InputText id="email" type="text" placeholder="Email" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="this.email" />
    
                            <label for="password" class="block text-900 font-medium text-xl mb-2">Mot de passe</label>
                            <InputText id="password" type="text" placeholder="Mot de passe" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="this.password" />
    
                            <div class="flex align-items-center justify-content-between mb-5 gap-5">
                                <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Mot de passe oublié ?</a>
                            </div>
                            <Button @click="loginAccount" label="Se connecter" class="w-full p-3 text-xl"></Button>
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
            email: null,
            password: null,
            token: null,
            response_message: null,
            response : null,
        }
    },
    methods: {
        loginAccount() {
            if (this.email && this.password) {
                this.$api.post('/auth/login', {
                    email: this.email,
                    password: this.password,
                }).then(response => {
                    this.token = response.data.token;
                }).catch(error => {
                    console.error(error);
                });
            }

            if(this.token){
                this.$router.push('/client-pannel');
            }else{
                this.response_message = "Mot de passe ou email incorrect";
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
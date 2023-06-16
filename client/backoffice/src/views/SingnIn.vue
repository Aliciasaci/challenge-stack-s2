<template>
    <Header />
    <div class="box login-wrapper">
        <form @submit.prevent="createAccount">
            <div v-if=this.response_message class="notification is-info is-light">
                <button class="delete"></button>
                {{ this.response_message }}
            </div>
            <h1 class="title">S'inscrire</h1>
            <div class="field">
                <label class="label">Nom</label>
                <div class="control">
                    <input class="input " type="text" placeholder="Nom" v-model="this.nom" required>
                </div>
            </div>

            <div class="field">
                <label class="label">Prénom</label>
                <div class="control">
                    <input class="input " type="text" placeholder="Prenom" v-model="this.prenom" required>
                </div>
            </div>

            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input class="input" type="email" placeholder="Email input" v-model="this.email" required>
                </div>
            </div>

            <div class="field">
                <label class="label">Mot de passe</label>
                <div class="control">
                    <input class="input" type="password" placeholder="********" v-model="this.password" required>
                </div>
            </div>
            <div class="field is-grouped">
                <div class="control">
                    <button class="button is-link valider-btn">Valider</button>
                </div>
                <div class="control">
                    <button class="button is-link is-light">Cancel</button>
                </div>
            </div>
        </form>
    </div>
    <div class="box mt-3 wrapper-2">
        <div>
            Vous avez déjà un compte ?
            <router-link to="/login">Se connecter</router-link>
        </div>
    </div>
</template>
<script>
import Header from "../components/Header.vue";
export default {
    components: {
        Header,
    },
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
<style lang="scss">
.login-wrapper {
    width: 30rem;
    margin: 7% auto;
    text-align: start;
}

.valider-btn {
    background-color: #fb513f !important;
}

.wrapper-2 {
    width: 30rem;
    margin: auto;
}
</style>
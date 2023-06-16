<template>
    <Header />
    <form class="box login-wrapper">
        <div v-if="this.response_message" class="notification is-danger is-light">
            {{ this.response_message }}
        </div>
        <h1 class="title">Se connecter</h1>
        <div class="field">
            <label class="label">Email</label>
            <div class="control">
                <input class="input " type="email" placeholder="Text input" v-model="this.email">
            </div>
        </div>

        <div class="field">
            <label class="label">Mot de passe</label>
            <div class="control">
                <input class="input" type="password" placeholder="*******" v-model="this.password">
            </div>
        </div>

        <div class="field is-grouped">
            <div class="control">
                <button @click="loginAccount" type="submit" class="button is-link valider-btn">Valider</button>
            </div>
        </div>
    </form>
</template>
<script>
import Header from "../components/Header.vue";
export default {
    components: {
        Header,
    },
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
                this.response_message = "Mot de passe ou email incorrecte";
            }
        }
    }
}
</script>
<style lang="scss">
.login-wrapper {
    width: 30rem;
    margin: 10% auto;
}

.valider-btn {
    background-color: #fb513f !important;
}
</style>
<template>
    <Header/>
    <div class="box login-wrapper">
        <h1 class="title">Se connecter</h1>
        <div class="field">
            <label class="label">Username</label>
            <div class="control">
                <input class="input " type="text" placeholder="Text input">
            </div>
        </div>

        <div class="field">
            <label class="label">Mot de passe</label>
            <div class="control">
                <input class="input" type="password" placeholder="*******">
            </div>
        </div>

        <div class="field is-grouped">
            <div class="control">
                <button class="button is-link">Valider</button>
            </div>
            <div class="control">
                <button class="button is-link is-light">Cancel</button>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "../components/Header.vue";
export default {
    components: {
    Header,
  }
}
</script>
<style lang="scss">
html {
    background-color: rgb(246, 168, 122);
}

.login-wrapper {
    width: 35rem;
    margin: 10% auto;
}
</style>
<script setup>
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('vuex');
}

logout();
</script>
<template>
    <div class="wrapper">
        <img src="https://www.memecreator.org/static/images/memes/4410221.jpg" />
    </div>
    <router-link tag="li" to="/login">Se connecter</router-link>
</template>
<style lang="scss">
.wrapper {
    img{
        margin-top: 20vh;
    }
}
</style>

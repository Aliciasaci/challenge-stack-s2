<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

onMounted(() => {
  const token = localStorage.getItem("token");
  // if (!token) {
  //   router.push('/login');
  // }
});
</script>

<template>
  <router-view />
</template>

<style lang="scss">
html,
body {
  background-color: rgba(255, 230, 245, 0.89);
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(255, 244, 251);
  padding-bottom: 5rem;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

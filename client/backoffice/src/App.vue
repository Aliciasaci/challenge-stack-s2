<template>
  <router-view />
</template>

<style lang="scss">
html {
  background: rgb(251, 187, 63);
  // background: radial-gradient(circle, rgba(251, 187, 63, 0.248972831320028) 0%, rgba(252, 70, 140, 0.2265638677345938) 100%);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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

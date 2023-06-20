<template lang="">
   <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <router-link class="navbar-item" to="/">Accueil</router-link>

      <router-link class="navbar-item" to="/documentation">Documentation</router-link>

      <router-link class="navbar-item" to="/contact">Contacts</router-link>

      <router-link class="navbar-item" to="mention-legale">Mentions légales</router-link>

    </div>
  </div>
</nav>
</template>
<script>
export default {

}
</script>
<style lang="scss">
.navbar {
  border-bottom: 2px solid orangered;
}
</style>
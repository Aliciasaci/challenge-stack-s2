<template lang="">
   <nav class="navbar" role="navigation" aria-label="main navigation">

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item">
        Home
      </a>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <router-link class="button is-primary" to="/signin"><strong>S'inscrire</strong></router-link>
          <router-link class="button" to="/login"><strong>Se connecter</strong></router-link>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>
<script>
export default {

}
</script>
<style lang="scss">
.navbar{
  padding : 1rem;
}
</style>
<template>
  <div class="home">
    <Header />
    <h1 class="title">Site client</h1>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
  name: 'HomeView',
  components: {
    Header,
  }
}
</script>
<style lang="scss">
.navbar{
  margin: 0;
  padding: 0;
}
</style>

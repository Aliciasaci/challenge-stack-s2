<template>
  <div class="home">
    <Header />
    <div class="first-row">
      <div class="columns">
        <div class="column">
          <div class="card">
            <div class="card-content">
              <p class="title">
                “There are two hard things in computer science: cache invalidation, naming things, and off-by-one errors.”
              </p>
              <p class="subtitle">
                Jeff Atwood
              </p>
            </div>
            <footer class="card-footer">
              <p class="card-footer-item">
                <span>
                  View on <a href="https://twitter.com/codinghorror/status/506010907021828096">Twitter</a>
                </span>
              </p>
              <p class="card-footer-item">
                <span>
                  Share on <a href="#">Facebook</a>
                </span>
              </p>
            </footer>
          </div>
        </div>
        <div class="column">
          <article class="message is-danger">
            <div class="message-header">
              <p>Hello World</p>
              <button class="delete" aria-label="delete"></button>
            </div>
            <div class="message-body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>, tempus quis
              placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et
              dictum <a>felis venenatis</a> efficitur. Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales,
              arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna,
              vehicula et sem eget, facilisis sodales sem.
            </div>
          </article>
        </div>
        <div class="column">
          <div class="box">
            <button class="button is-danger is-outlined">Click me</button>
          </div>
          <div class="modal">
            <div class="modal-background"></div>
            <div class="modal-content">
              <!-- Any other Bulma elements you want -->
            </div>
            <button class="modal-close is-large" aria-label="close"></button>
          </div>
        </div>
      </div>
    </div>
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
.navbar {
  margin: 0;
  padding: 0;
}

.first-row {
  width: 90%;
  margin: auto;
  margin-top: 5rem;
}

</style>

<template>
  <div class="home" v-tracker:1YDQ52.visited>
    <Header />
    <HeroSection />
    <div class="first-row">
      <Carousel :value="articles" :numVisible="3" :numScroll="3">
        <template #item="slotProps">
          <div class="border rounded-lg m-2 text-center py-5 px-3">
            <div class="mb-3">
              <h3 class="mb-1 font-bold">{{ slotProps.data.title }}</h3>
            </div>
            <div>
              <h4 class="mb-1">{{ slotProps.data.summary }}</h4>
              <div class="mt-5">
                <Button
                  icon="pi pi-check"
                  label="Voir plus"
                  @click="onClick(slotProps.data.id)"
                  raised
                />
              </div>
            </div>
          </div>
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Carousel from "primevue/carousel";
import Button from "primevue/button";
import HeroSection from "../components/HeroSection.vue";
import { getArticles } from "../service/ArticleService";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "HomeView",
  components: {
    Header,
    Carousel,
    Button,
    HeroSection,
    useRoute,
  },
  methods: {
    onClick(id) {
      this.$router.push("/article/" + id);
    },
  },
  setup() {
    const articles = ref();

    onMounted(() => {
      getArticles().then((data) => {
        articles.value = data;
      });
    });

    return {
      articles,
    };
  },
};
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

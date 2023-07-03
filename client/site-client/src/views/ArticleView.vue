<template lang="">
  <div>
    <Header />
    <div class="flex justify-center mt-8">
      <Fieldset class="w-[80%]" :toggleable="true" :legend="article.title">
        <div class="p-grid">
          <div class="p-col-12 p-md-6">
            <p>{{ article.content }}</p>
          </div>
        </div>
        <div class="p-grid">
          <div class="p-col-12 p-md-6">
            <Button
              label="Contactez-nous"
              type="button"
              class="my-3 p-button-raised"
              @click="visible = true"
            />
            <ContactForm v-model="visible" />
          </div>
        </div>
      </Fieldset>
    </div>
  </div>
</template>
<script>
import Header from "../components/Header.vue";
import Fieldset from "primevue/fieldset";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import { getArticle } from "../service/ArticleService";
import { ref, onMounted } from "vue";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import { useRoute } from "vue-router";
import ContactForm from "../components/ContactForm.vue";
export default {
  name: "",
  components: {
    Header,
    Fieldset,
    Button,
    Dialog,
    InputText,
    Textarea,
    ContactForm,
  },
  data() {
    return {
      visible: true,
      firstname: null,
      lastname: null,
      email: null,
      message: null,
    };
  },
  methods: {
    saveContactForm() {
      this.visible = false;
      this.$toast.add({
        severity: "success",
        summary: "Succès",
        detail: "Votre message a bien été envoyé",
        life: 3000,
      });
    },
  },
  setup() {
    const article = ref({});
    const route = useRoute();

    onMounted(() => {
      const number = Number(route.params.id);
      getArticle(number).then((data) => (article.value = data));
    });

    return {
      article,
    };
  },
};
</script>
<style lang=""></style>

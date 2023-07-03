<template lang="">
  <div>
    <Dialog v-model="visible" header="Contactez-nous" :modal="true">
      <div class="p-fluid">
        <div class="p-field">
          <label for="firstname">Prénom</label>
          <InputText id="firstname" v-model="firstname" />
        </div>
        <div class="p-field">
          <label for="lastname">Nom</label>
          <InputText id="lastname" v-model="lastname" />
        </div>
        <div class="p-field">
          <label for="email">Email</label>
          <InputText id="email" v-model="email" />
        </div>
        <div class="p-field">
          <label for="message">Message</label>
          <Textarea id="message" v-model="message" />
        </div>
      </div>
      <template #footer>
        <Button
          label="Envoyer"
          type="button"
          class="mr-3 p-button-raised"
          @click="saveContactForm"
        />
        <Button
          label="Annuler"
          type="button"
          class="p-button-outlined"
          @click="visible = false"
        />
      </template>
    </Dialog>
  </div>
</template>
<script>
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
export default {
  name: "ContactForm",
  components: {
    Dialog,
    InputText,
    Textarea,
    Button,
  },
  data() {
    return {
      visible: false,
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
};
</script>
<style lang=""></style>

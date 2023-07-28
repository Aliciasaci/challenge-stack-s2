<template lang="">
  <Dialog
    v-model:visible="visible"
    :style="{ width: '50vw' }"
    header="Contactez-nous"
    :modal="true"
  >
  <form @prevent.submit  v-tracker:FY12YP.submit >
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
    <div>
      <Button
        label="Envoyer"
        type="submit"
        class="mr-3 p-button-raised"
       />
      <Button
        label="Annuler"
        type="submit"
        class="p-button-outlined"
        @click="this.visible = false"
      />
    </div>
  </form>
  </Dialog>
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
        severity: "info",
        summary: "Succès",
        detail: "Votre message a bien été envoyé",
        life: 3000,
      });
    },
  },
};
</script>
<style lang=""></style>

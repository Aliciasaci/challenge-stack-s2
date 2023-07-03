<template lang="">
  <div class="grid grid-nogutter surface-section text-800">
    <div
      class="col-12 md:col-6 text-center md:text-left flex align-items-center"
    >
      <section class="p-6">
        <span class="block text-6xl font-bold mb-1">Create the screens</span>
        <div class="text-6xl text-primary font-bold mb-3">
          visitors deserve to see
        </div>
        <p class="mt-0 mb-4 text-700 line-height-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <Button
          label="Contactez-nous"
          type="button"
          class="mr-3 p-button-raised"
          @click="visible = true"
        />
        <ContactForm v-model:visible="visible" />
        <Button
          label="En savoir plus"
          type="button"
          class="p-button-outlined"
        />
      </section>
      <div class="col-12 md:col-6 overflow-hidden">
        <img
          src="https://static.vecteezy.com/system/resources/previews/017/033/095/original/abstract-purple-and-pink-bokeh-background-soft-blur-light-effect-wallpaper-dreamy-backdrop-with-copy-space-for-text-party-pastel-lovely-bubble-bokeh-background-vector.jpg"
          alt="Image"
          class="md:ml-auto block md:h-full"
          style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Button from "primevue/button";
import ContactForm from "./ContactForm.vue";
export default {
  name: "HeroSection",
  components: {
    Button,
    ContactForm,
  },
  data() {
    return {
      visible: false,
    };
  },
};
</script>
<style lang=""></style>

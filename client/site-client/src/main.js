import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Header from "../src/components/Header.vue";
import PrimeVue from "primevue/config";
import "../src/assets/index.css";
import "primeicons/primeicons.css";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
const app = createApp(App);

app.component("Header", Header);

app.use(store).use(router).mount("#app");
app.use(PrimeVue);

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Header from "../src/components/Header.vue";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import "../src/assets/index.css";
import "primeicons/primeicons.css";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import SDK from "./sdk.js";
const app = createApp(App);

app.component("Header", Header);

app.use(store).use(router).mount("#app");
app.use(PrimeVue);

//passer le APPID en options.

//compte alicia
app.use(SDK, { APPID: "3fb28de7-25c1-4eca-a526-9bef25ecdd19" });
app.use(ToastService);

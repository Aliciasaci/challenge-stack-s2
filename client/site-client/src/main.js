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
import SDK from "../../../SDK/main.js";
const app = createApp(App);

app.component("Header", Header);

app.use(store).use(router).mount("#app");
app.use(PrimeVue);

//passer le APPID en options.

//APP ID du site kenzo kenzo
app.use(SDK, { APPID: "8ef37f72-c075-41ca-b838-8b531c685219" });
app.use(ToastService);

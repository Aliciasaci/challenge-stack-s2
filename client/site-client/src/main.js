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
app.use(SDK, { APPID: "4c4f2811-157f-4a55-880a-48fkutkftk6c5935ad0" });

app.component("Header", Header);
app.use(store).use(router).mount("#app");
app.use(PrimeVue);

app.use(ToastService);

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Toast from 'primevue/toast';
import Toolbar from 'primevue/toolbar';
import Dialog from 'primevue/dialog';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import Dropdown from 'primevue/dropdown';
import RadioButton from 'primevue/radiobutton';
import Menubar from 'primevue/menubar';
import Card from 'primevue/card';
import Listbox from 'primevue/listbox';
import SplitButton from 'primevue/splitbutton';
import Chart from 'primevue/chart';
import InputSwitch from 'primevue/inputswitch';
import FileUpload from 'primevue/fileupload';
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup'; 
import TreeSelect from 'primevue/treeselect';
import Calendar from 'primevue/calendar';

import Badge from 'primevue/badge';
import Tag from 'primevue/tag';
import ToastService from 'primevue/toastservice';



//theme
import "primevue/resources/themes/lara-light-indigo/theme.css";
//core
import "primevue/resources/primevue.min.css";
//icons
import "primeicons/primeicons.css";
//app css
import "@/assets/app.scss";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(PrimeVue);
app.use(ToastService);

app.component("Button", Button);
app.component("InputText", InputText);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("Toast", Toast);
app.component("Toolbar", Toolbar);
app.component("Dialog", Dialog);
app.component("InputNumber", InputNumber);
app.component("Textarea", Textarea);
app.component("Dropdown", Dropdown);
app.component("RadioButton", RadioButton);
app.component("Menubar", Menubar);
app.component("Card", Card);
app.component("Listbox", Listbox);
app.component("SplitButton", SplitButton);
app.component("Chart", Chart);
app.component("InputSwitch", InputSwitch);
app.component("FileUpload", FileUpload);

app.component("Avatar", Avatar);
app.component("AvatarGroup", AvatarGroup);
app.component("TreeSelect", TreeSelect);
app.component("Calendar", Calendar);


app.component("Badge", Badge);
app.component("Tag", Tag);



app.config.globalProperties.$api = axios.create({
    baseURL: 'http://localhost:5000/',
    params: {}
});

app.mount('#app');


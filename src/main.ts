import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import SvgIcon from '@jamescoyle/vue-icon';
import router from './router';
import store from './store';
import axios from './common/axios';
import VueAxios from 'vue-axios';
import locale from 'element-plus/lib/locale/lang/pt-br';
import '@vert-capital/design-system/dist/style.css';
import filters from './common/filters';
import OneSignalVuePlugin from '@onesignal/onesignal-vue3'


const app = createApp(App);

app.component('SvgIcon', SvgIcon);

app.use(ElementPlus, { locale });
app.use(router);
app.use(store);
app.use(VueAxios, axios);
app.use(OneSignalVuePlugin, {
    appId: "34734818-1fe3-4495-8289-26fa2e9a2d2e",
});

app.provide('$filters', filters);

app.mount('#app');

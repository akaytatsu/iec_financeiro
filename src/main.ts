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

const app = createApp(App);

app.component('SvgIcon', SvgIcon);

app.use(ElementPlus, { locale });
app.use(router);
app.use(store);
app.use(VueAxios, axios);

app.provide('$filters', filters);

app.mount('#app');

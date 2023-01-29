import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import config from '@/common/config';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        requiresAuth: false
      },
      component: () => import('../pages/Login/Login.vue'),
    },
    {
      path: '/',
      component: () => import('../pages/Base/BasePage.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('../pages/Home/Home.vue')
        }
      ]
    },
    {
      path: '/nova-despesa',
      component: () => import('../pages/Base/BasePage.vue'),
      children: [
        {
          path: '',
          name: 'NovaDespesa',
          component: () => import('../pages/Despesa/Despesa.vue')
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth == false) {
    next();
  } else {
    if (store.getters['user/isLogged']) next();
    else {
      router.replace('/login');
    }
  }
});

export default router;

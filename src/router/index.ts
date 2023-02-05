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
      path: '/cadastrar',
      name: 'cadastrar',
      meta: {
        requiresAuth: false
      },
      component: () => import('../pages/Cadastrar/Cadastrar.vue'),
    },
    {
      path: '/recuperar-senha',
      name: 'recuperar-senha',
      meta: {
        requiresAuth: false
      },
      component: () => import('../pages/RecuperarSenha/RecuperarSenha.vue'),
    },
    {
      path: '/logout',
      name: 'logout',
      meta: {
        requiresAuth: false
      },
      component: () => import('../pages/Logout/Logout.vue'),
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
    },
    {
      path: '/despesa/:id/',
      component: () => import('../pages/Base/BasePage.vue'),
      children: [
        {
          path: '',
          name: 'ViewDespesa',
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

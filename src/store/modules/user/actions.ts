import router from '@/router';
import type { ActionContext } from 'vuex';
import { getUserInfo, validToken, logoutApplication, authUser } from './services';
import { ILoginForm } from './types';

export default {
  async login({ commit }, data: ILoginForm) {

    commit('setIsLoading', true);

    const response = await authUser(data);

    if (response.status == 'success') {
      console.log(response.data.token)
      console.log(response.data)
      commit('setTokens', response.data.token);
      commit('setIsLogged', true);
      await router.push('/');
    } else {
      commit('setClearTokens');
      commit('setIsLogged', false);
      commit('setErroLogin', response.data)
    }

    commit('setIsLoading', false);

  },
  async fetchUserInfo({ commit }: ActionContext<any, any>) {
    return await getUserInfo()
      .then((response: any) => {
        commit('setUserInfo', response.data);
      })
      .catch((error: any) => {
        throw error;
      });
  },
  async logout({ commit }: ActionContext<any, any>) {
    return await logoutApplication()
      .then(() => {
        commit('setClearTokens');
      })
      .catch((error: any) => {
        throw error;
      });
  }
};

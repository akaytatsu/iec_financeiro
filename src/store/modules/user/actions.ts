import router from '@/router';
import { getMeInfo, authUser } from './services';
import { ILoginForm } from './types';

export default {
  async login({ commit }, data: ILoginForm) {

    commit('setIsLoading', true);

    const response = await authUser(data);

    if (response.status == 'success') {
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
  async fetchMeInfo({ commit }) {
    return await getMeInfo()
      .then((response: any) => {
        commit('setMeInfo', response.data);
      })
      .catch((error: any) => {
        throw error;
      });
  },
  async logout({ commit }) {
    commit('setClearTokens');
  }
};

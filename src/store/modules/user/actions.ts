import router from '@/router';
import { getMeInfo, authUser, updateOneSignalID, createUser, recoverPassword } from './services';
import { ICreateUserForm, ILoginForm, IRecoverError } from './types';

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
  },
  async updateOneSignalID({ commit }, id: string) {
    return await updateOneSignalID(id)
      .then((response: any) => {
      })
      .catch((error: any) => {
        throw error;
      });
  },
  async createUser({ commit, dispatch }, data: ICreateUserForm) {
    commit('setIsLoading', true);

    const response = await createUser(data);

    if (response.status == 'success') {

      const formDataLogin: ILoginForm = {
        email: data.email,
        password: data.password
      }

      dispatch("login", formDataLogin);
    } else {
      commit('setErrosCreateUser', response.data);
      commit('setIsLoading', false);
    }
  },
  async recoverPassword({ commit }, email: string) {
    commit('setIsLoading', true);

    const response = await recoverPassword(email);

    if (response.status == 'success') {
      const resp: IRecoverError = {
        error: false,
        message: response.data.error
      }
      commit('setRecoverError', resp);
      commit('setRecoverSuccess', true);
    } else {
      const resp: IRecoverError = {
        error: true,
        message: response.data.error
      }
      commit('setRecoverError', resp);
      commit('setRecoverSuccess', false);
    }

    commit('setIsLoading', false);
  }
};

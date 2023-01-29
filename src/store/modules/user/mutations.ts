import type { IUserState, IUserInfo, ILoginResponse } from './types';

export default {
  setIsLogged(state: IUserState, isLogged: boolean): void {
    state.isLogged = isLogged;
    isLogged ? localStorage.setItem('isLogged', 'logado') : localStorage.removeItem('isLogged');
  },
  setIsLoading(state: IUserState, isLoading: boolean): void {
    state.isLoading = isLoading;
  },
  setTokens(state: IUserState, token: string): void {
    localStorage.setItem('token', token);
    state.token = String(localStorage.getItem('token'));
    state.refresh_token = String(localStorage.getItem('refresh_token'));
  },
  setClearTokens(state: IUserState): void {
    state.token = null;
    state.refresh_token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('isLogged');
  },
  setUserInfo(state: IUserState, info: IUserInfo): void {
    state.info = info;
  },
  setInvalidToken(state: IUserState, invalidToken: boolean): void {
    state.invalidToken = invalidToken;
  },
  setErroLogin(state: IUserState, loginErros: ILoginResponse): void {
    state.loginErros = loginErros;
  }
};

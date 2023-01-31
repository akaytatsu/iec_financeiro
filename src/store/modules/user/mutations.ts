import type { IUserState, IUserInfo, ILoginResponse, IAccountInfo } from './types';

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
  setMeInfo(state: IUserState, payload: IAccountInfo): void {
    state.accountInfo = payload;
  },
  setInvalidToken(state: IUserState, invalidToken: boolean): void {
    state.invalidToken = invalidToken;
  },
  setErroLogin(state: IUserState, loginErros: ILoginResponse): void {
    state.loginErros = loginErros;
  }
};

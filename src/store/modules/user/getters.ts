import type { ILoginError, IUserInfo, IUserState } from './types';

export default {
  isLogged: (): boolean => localStorage.getItem('isLogged') === 'logado',
  getInfo: (state: IUserState): IUserInfo => state.info,
  isInvalidToken: (state: IUserState): boolean => state.invalidToken,
  isLoading: (state: IUserState): boolean => state.isLoading,
  getLoginErrors: (state: IUserState): ILoginError => state.loginErros
};

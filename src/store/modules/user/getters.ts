import type { IAccountInfo, ICreateUserErrors, ILoginError, IRecoverError, IUserState } from './types';

export default {
  isLogged: (): boolean => localStorage.getItem('isLogged') === 'logado',
  getMeInfo: (state: IUserState): IAccountInfo => state.accountInfo,
  isInvalidToken: (state: IUserState): boolean => state.invalidToken,
  isLoading: (state: IUserState): boolean => state.isLoading,
  getLoginErrors: (state: IUserState): ILoginError => state.loginErros,
  getCreateUserErrors: (state: IUserState): ICreateUserErrors => state.createUserErros,
  getRecoverError: (state: IUserState): IRecoverError => state.recoverError,
  getRecoverSuccess: (state: IUserState): boolean => state.recoverSuccess,
};

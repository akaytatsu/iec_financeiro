import type { IAccountInfo, ICreateUserErrors, ILoginResponse, IRecoverError, IUserInfo } from './types';

export default {
  isLogged: false,
  isLoading: false,
  token: null,
  refresh_token: null,
  info: {} as IUserInfo,
  invalidToken: false,
  loginErros: {} as ILoginResponse,
  accountInfo: {} as IAccountInfo,
  createUserErros: {} as ICreateUserErrors,
  recoverError: {} as IRecoverError,
  recoverSuccess: false,
};

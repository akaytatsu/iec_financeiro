import type { IAccountInfo, ILoginResponse, IUserInfo } from './types';

export default {
  isLogged: false,
  isLoading: false,
  token: null,
  refresh_token: null,
  info: {} as IUserInfo,
  invalidToken: false,
  loginErros: {} as ILoginResponse,
  accountInfo: {} as IAccountInfo
};

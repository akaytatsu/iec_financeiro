export interface IUserState {
  isLogged: boolean;
  isLoading: boolean;
  canAddObrigation: boolean;
  canAddTemplateObrigation: boolean;
  canCreateMassObrigation: boolean;
  token: string | null;
  refresh_token: string | null;
  info: IUserInfo;
  invalidToken: boolean;
  loginErros: ILoginResponse;
  createUserErros: ICreateUserErrors;
  accountInfo: IAccountInfo;
  recoverError: IRecoverError;
  recoverSuccess: boolean;
}

export interface IUserInfo {
  email: string;
  name: string;
  profile_image: null;
  groups: string[];
  is_superuser: boolean;
}

export interface ILoginResponse {
  non_field_errors: string[];
  email: string[];
  password: string[];
  name: string[];
  telefone: string[];
}

export interface ICreateUserErrors {
  non_field_errors: string[];
  email: string[];
  password: string[];
  name: string[];
  telefone: string[];
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface ICreateUserForm {
  email: string;
  name: string;
  telefone: string;
  password: string;
  password_confirm: string;
}

export interface IAccountInfo {
  id: number;
  name: string;
  email: string;
  telefone?: any;
  can_request: boolean;
  can_aprove: boolean;
  can_pay: boolean;
  tp_user_financeiro: number;
  name_letter: string;
}

export interface IRecoverError {
  error: boolean;
  message: string;
}
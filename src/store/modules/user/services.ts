import api from '@/common/axios';
import { ISimpleReponseData } from '../utils/types';
import { IAccountInfo, ICreateUserErrors, ICreateUserForm, ILoginForm, ILoginResponse, IRecoverError } from './types';

export const getMeInfo = (): Promise<ISimpleReponseData<IAccountInfo>> => api.get('/accounts/me/');

export const authUser = (loginData: ILoginForm): Promise<ISimpleReponseData<ILoginResponse>> => api.post('/token/auth', { email: loginData.email, password: loginData.password });

export const validToken = (token: string) => api.post('/token/verify/', { token: token });

export const updateOneSignalID = (id: string) => api.put('/accounts/update-onesignal-id/', { one_signal_id: id });

export const createUser = (data: ICreateUserForm): Promise<ISimpleReponseData<ICreateUserErrors>> => api.post('/accounts/create-account/', data);

export const recoverPassword = (email: string): Promise<ISimpleReponseData<IRecoverError>> => api.post('/accounts/recover/', { email: email });
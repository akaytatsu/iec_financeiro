import api from '@/common/axios';
import { ISimpleReponseData } from '../utils/types';
import { ILoginForm, ILoginResponse } from './types';

export const getUserInfo = () => api.get('/accounts/me/');

export const authUser = (loginData: ILoginForm): Promise<ISimpleReponseData<ILoginResponse>> => api.post('/token/auth', { email: loginData.email, password: loginData.password });

export const validToken = (token: string) => api.post('/token/verify/', { token: token });

export const logoutApplication = () => api.get(`/cas/logout/`);

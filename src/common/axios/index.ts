import axios from 'axios';
import handleResponse from './handleResponse';
import config from '../config';

const instance: any = axios.create({
  baseURL: config.apiUrl + '/'
});

instance.interceptors.request.use(
  (config: any) => {
    if (localStorage.getItem('token') != null && localStorage.getItem('token') != undefined) {
      config.headers.Authorization = `JWT ${localStorage.getItem('token')}`;
    }
    return config;
  },
  function (error: any) {
    const err = error.response ? error.response.data : '';
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (res: any) => handleResponse(res),
  (err: any) => handleResponse(err.response)
);

export default instance;

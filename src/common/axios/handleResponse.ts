import config from '@/common/config';
import type { AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';

export default function handleResponse(response: AxiosResponse): any {
  const statusCode = response ? response.status : 500;
  const data = response ? response.data : [];
  const status = statusCode >= 200 && statusCode < 300 ? 'success' : 'error';

  if (statusCode === 401) {
    window.location.href = String(config.ssoUrl);
  }

  const ERRORS = {
    400: 'Falha ao enviar',
    403: 'Você não tem permissão para executar essa ação',
    404: 'Endereço não encontrado',
    409: 'Conflito de valores',
    500: 'Falha ao enviar'
  } as { [key: number]: string };

  let text = '';
  if (statusCode === 500) {
    ElMessage({
      showClose: true,
      message: 'Houve um interno interno ao comunicar com o servidor. Tente novamente mais tarde.',
      type: 'error'
    });
    return;
  }

  if (status === 'error') {
    if (data.error) {
      text = data.error;
    } else if (data[0]) {
      text = data[0].non_field_errors ? data[0].non_field_errors : ERRORS[statusCode];
    } else {
      text = data.non_field_errors ? data.non_field_errors : ERRORS[statusCode];
    }
  } else {
    text = 'Enviado com sucesso';
  }

  return {
    status,
    text,
    data
  };
}

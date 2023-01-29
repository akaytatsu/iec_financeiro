import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { formatDistance } from 'date-fns/esm';

export default {
  dateFormat(
    date: Date | string | number | null,
    dateFormat = 'dd/MM/yyyy',
    dateActualFormat = 'yyyy-MM-dd'
  ): string {
    let fDate;
    if (date === null || date === undefined) return 'N/A';
    if (typeof date === 'string') {
      if (date.includes('T')) date = date.substring(0, 10);
      const tempDate = parse(date, dateActualFormat, new Date());
      fDate = new Date(tempDate);
    } else {
      fDate = date;
    }

    return format(fDate, dateFormat, { locale: ptBR });
  },

  currencyFormat(value: string, options = {}): string | number {
    if (value === null || Number.isNaN(Number(value))) return value;

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      ...options
    }).format(Number(parseFloat(value).toFixed(2)));
  },

  decimalFormat(value: string, options = {}): string | number {
    if (value === null || Number.isNaN(Number(value))) return value;

    return new Intl.NumberFormat('pt-BR', { ...options }).format(Number(parseFloat(value)));
  },

  cpfCnpj(value: string): string {
    if (Number.isInteger(Number(value))) {
      let cpfCnpj = value;

      if (value.length > 11) {
        cpfCnpj = cpfCnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
      } else {
        cpfCnpj = cpfCnpj.replace(/(\d{3})(\d)/, '$1.$2');
        cpfCnpj = cpfCnpj.replace(/(\d{3})(\d)/, '$1.$2');
        cpfCnpj = cpfCnpj.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      }

      return cpfCnpj;
    }
    return '';
  },

  getDistanceFromDate(
    date: Date,
    currentDate = new Date(),
    options: { addSuffix?: boolean } = { addSuffix: true }
  ): string {
    return formatDistance(date, currentDate, { locale: ptBR, ...options });
  }
};

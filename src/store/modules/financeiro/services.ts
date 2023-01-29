import api from '@/common/axios';
import { IReponseData, ISimpleReponseData } from '../utils/types';
import { ICategoriaDespesa, IConferencia, IDespesa, IDespesaFilterForm, IDespesaStatus, ISimpleUser } from './types';

export const getDespesas = async (param: IDespesaFilterForm): Promise<IReponseData<IDespesa>> =>
    api.get('/financeiro/despesas/', { params: param });

export const getCategorias = async (): Promise<ISimpleReponseData<ICategoriaDespesa[]>> =>
    api.get('/financeiro/categorias/');

export const getConferencias = async (): Promise<ISimpleReponseData<IConferencia[]>> =>
    api.get('/inscricao/conferencias');

export const getDespesaStatus = async (): Promise<ISimpleReponseData<IDespesaStatus[]>> =>
    api.get('/financeiro/despesas/status/');

export const getUsuarios = async (): Promise<ISimpleReponseData<ISimpleUser[]>> =>
    api.get('/financeiro/despesas/usuarios/');

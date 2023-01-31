import api from '@/common/axios';
import { IReponseData, ISimpleReponseData } from '../utils/types';
import { ICategoriaDespesa, IComprovante, IConferencia, ICreateDespesaForm, IDespesa, IDespesaFilterForm, IDespesaStatus, ISimpleUser } from './types';

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

export const createDespesa = async (data: ICreateDespesaForm): Promise<ISimpleReponseData<{}>> =>
    api.post('/financeiro/despesas/create/', data);

export const getDespesa = async (id: number): Promise<ISimpleReponseData<IDespesa>> =>
    api.get(`/financeiro/despesas/${id}/`);

export const updateDespesa = async (id: number, data: ICreateDespesaForm): Promise<ISimpleReponseData<{}>> =>
    api.put(`/financeiro/despesas/${id}/update/`, data);

export const aprovaDespesa = async (id: number): Promise<ISimpleReponseData<{}>> =>
    api.put(`/financeiro/despesas/${id}/aprovar/`);

export const reprovaDespesa = async (id: number, justificativa: string): Promise<ISimpleReponseData<{}>> =>
    api.put(`/financeiro/despesas/${id}/reprovar/`, { params: { justificativa_reprovacao: justificativa } });

export const confirmarRepasse = async (id: number): Promise<ISimpleReponseData<{}>> =>
    api.put(`/financeiro/despesas/${id}/confirma-repasse/`);

export const confirmaAprovacao = async (id: number): Promise<ISimpleReponseData<{}>> =>
    api.put(`/financeiro/despesas/${id}/confirma-aprovacao/`);

export const reprovaAprovacao = async (id: number, justificativa: string): Promise<ISimpleReponseData<{}>> =>
    api.put(`/financeiro/despesas/${id}/reprova-aprovacao/`, { params: { justificativa_reprovacao: justificativa } });

export const getComprovantes = async (id: number): Promise<ISimpleReponseData<IComprovante>> =>
    api.get(`/financeiro/despesas/${id}/comprovantes/`);

export const deletaComprovante = async (despesa: number, id: number): Promise<ISimpleReponseData<{}>> =>
    api.delete(`/financeiro/despesas/${despesa}/comprovantes/${id}/`);

export const uploadComprovante = async (despesa: number, file: File): Promise<ISimpleReponseData<{}>> => {
    return api.post(`/financeiro/despesas/${despesa}/comprovantes/`, {
        despesa: despesa,
        comprovante: file
    }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
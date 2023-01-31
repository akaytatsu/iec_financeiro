import { IPageResult } from "../utils/types";

export interface IDespesaState {
  pageResult: IPageResult<IDespesa>;
  despesa: IDespesa;
  loading: boolean;
  categorias: ICategoriaDespesa[];
  conferencias: IConferencia[];
  usuarios: ISimpleUser[];
  status: IDespesaStatus[];
  comprovantes: IComprovante[];
}

export interface IDespesa {
  id: number;
  usuario_solicitacao: ISimpleUser;
  usuario_aprovacao?: ISimpleUser;
  usuario_comprovacao?: ISimpleUser;
  categoria: ICategoriaDespesa;
  conferencia: IConferencia;
  status: number;
  valor: number;
  justificativa: string;
  justificativa_reprovacao?: any;
  aprovado: boolean;
  comprovado: boolean;
  reprovado: boolean;
  data_solicitacao: string;
  status_description: string;
}

export interface IConferencia {
  id: number;
  titulo: string;
}

export interface IDespesaStatus {
  id: number;
  nome: string;
}

export interface ICategoriaDespesa {
  id: number;
  nome: string;
  ativo: boolean;
}

export interface ISimpleUser {
  id: number;
  name: string;
  email: string;
  telefone?: any;
  can_request: boolean;
  can_aprove: boolean;
  can_pay: boolean;
  tp_user_financeiro: number;
}

export interface IDespesaFilterForm {
  page?: number | undefined;
  page_size?: number | undefined;
  classification?: number | undefined;
  status?: number | undefined;
}

export interface ICreateDespesaForm {
  id: number;
  conferencia: number;
  categoria: number;
  valor: number;
  justificativa: string;
}

export interface IDespesaStatusForm {
  id: number;
  justificativa_reprovacao: string;
}

export interface IComprovante {
  id: number;
  comprovante: string;
  extension: string;
  is_image: boolean;
  data_comprovacao: string;
  despesa: number;
}

export interface IComprovanteForm {
  despesa: number;
  comprovante: any;
}

export interface IComprovanteDeleteForm {
  id: number;
  despesa: number;
}
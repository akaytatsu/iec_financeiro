import { ICategoriaDespesa, IConferencia, IDespesa, IDespesaStatus, ISimpleUser } from './types';

export default {
    pageResult: {
        count: 0,
        page: 1,
        num_pages: 0,
        next: null,
        previous: null,
        results: []
    },
    despesa: {} as IDespesa,
    loading: false,
    categorias: [] as ICategoriaDespesa[],
    conferencias: [] as IConferencia[],
    usuarios: [] as ISimpleUser[],
    status: [] as IDespesaStatus[]
};
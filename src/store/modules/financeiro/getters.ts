import { IPageResult } from "../utils/types";
import { ICategoriaDespesa, IConferencia, IDespesa, IDespesaState, IDespesaStatus, ISimpleUser } from "./types";

export default {
    getDespesas(state: IDespesaState): IPageResult<IDespesa> {
        return state.pageResult;
    },
    getCategorias(state: IDespesaState): ICategoriaDespesa[] {
        return state.categorias;
    },
    getConferencias(state: IDespesaState): IConferencia[] {
        return state.conferencias;
    },
    getDespesaStatus(state: IDespesaState): IDespesaStatus[] {
        return state.status;
    },
    getUsuarios(state: IDespesaState): ISimpleUser[] {
        return state.usuarios;
    }
}
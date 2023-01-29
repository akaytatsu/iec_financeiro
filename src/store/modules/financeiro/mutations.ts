import { IPageResult } from "../utils/types";
import { ICategoriaDespesa, IConferencia, IDespesa, IDespesaState, IDespesaStatus, ISimpleUser } from "./types";

export default {
    setLoading(state: IDespesaState, payload: boolean) {
        state.loading = payload;
    },
    setDespesas(state: IDespesaState, payload: IPageResult<IDespesa>) {
        state.pageResult = payload;
    },
    setCategorias(state: IDespesaState, payload: ICategoriaDespesa[]) {
        state.categorias = payload;
    },
    setConferencias(state: IDespesaState, payload: IConferencia[]) {
        state.conferencias = payload;
    },
    setDespesaStatus(state: IDespesaState, payload: IDespesaStatus[]) {
        state.status = payload;
    },
    setUsuarios(state: IDespesaState, payload: ISimpleUser[]) {
        state.usuarios = payload;
    },
    setDespesa(state: IDespesaState, payload: IDespesa) {
        state.despesa = payload;
    },
}
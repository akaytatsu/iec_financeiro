import * as service from "./services";
import { IDespesaFilterForm } from "./types";

export default {
    async fetchDespesas({ commit }, params: IDespesaFilterForm) {
        const response = await service.getDespesas(params);
        commit("setDespesas", response.data);
    },
    async fetchCategorias({ commit }) {
        const response = await service.getCategorias();
        commit("setCategorias", response.data);
    },
    async fetchConferencias({ commit }) {
        const response = await service.getConferencias();
        commit("setConferencias", response.data);
    },
    async fetchDespesaStatus({ commit }) {
        const response = await service.getDespesaStatus();
        commit("setDespesaStatus", response.data);
    },
    async fetchUsuarios({ commit }) {
        const response = await service.getUsuarios();
        commit("setUsuarios", response.data);
    }
}
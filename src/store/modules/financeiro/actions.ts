import router from "@/router";
import * as service from "./services";
import { ICreateDespesaForm, IDespesaFilterForm } from "./types";

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
    },
    async createDespesa({ commit }, data: ICreateDespesaForm) {
        commit("setLoading", true);
        const response = await service.createDespesa(data);

        if (response.status === "success") {
            commit("setLoading", false);
            await router.push('/');
        }

        commit("setLoading", false);
    },
    async updateDespesa({ commit }, data: ICreateDespesaForm) {
        commit("setLoading", true);
        const response = await service.updateDespesa(data.id, data);

        if (response.status === "success") {
            commit("setLoading", false);
            await router.push('/');
        }

        commit("setLoading", false);
    },
    async fetchDespesa({ commit }, id: number) {
        commit("setLoading", true);

        const response = await service.getDespesa(id);
        commit("setDespesa", response.data);

        commit("setLoading", false);
    }
}
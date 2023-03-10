import router from "@/router";
import * as service from "./services";
import { IComprovanteDeleteForm, IComprovanteForm, ICreateDespesaForm, IDespesaFilterForm, IDespesaStatusForm } from "./types";

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
    },
    async aprovaDespesa({ commit }, params: IDespesaStatusForm) {
        commit("setLoading", true);

        await service.aprovaDespesa(params.id);
        const response = await service.getDespesa(params.id);

        router.go(0);

        commit("setDespesa", response.data);
        commit("setLoading", false);

        return response;
    },
    async reprovaDespesa({ commit }, params: IDespesaStatusForm) {
        commit("setLoading", true);

        await service.reprovaDespesa(params.id, params.justificativa_reprovacao);
        const response = await service.getDespesa(params.id);
        router.go(0);
        commit("setLoading", false);

        return response;
    },
    async confirmaRepasse({ commit }, params: IDespesaStatusForm) {
        commit("setLoading", true);

        await service.confirmarRepasse(params.id);
        const response = await service.getDespesa(params.id);
        router.go(0);
        commit("setLoading", false);

        return response;
    },
    async confirmaAprovacao({ commit }, params: IDespesaStatusForm) {
        commit("setLoading", true);

        await service.confirmaAprovacao(params.id);
        const response = await service.getDespesa(params.id);
        router.go(0);

        commit("setLoading", false);

        return response;
    },
    async reprovaAprovacao({ commit }, params: IDespesaStatusForm) {
        commit("setLoading", true);

        await service.reprovaAprovacao(params.id, params.justificativa_reprovacao);
        const response = await service.getDespesa(params.id);
        commit("setLoading", false);

        return response;
    },
    async fetchComprovantes({ commit }, id: number) {
        commit("setLoading", true);

        const response = await service.getComprovantes(id);

        commit("setComprovantes", response.data);

        commit("setLoading", false);
    },
    async uploadComprovante({ commit }, data: IComprovanteForm) {
        commit("setLoading", true);

        const response = await service.uploadComprovante(data.despesa, data.comprovante);
        router.go(0);

        commit("setLoading", false);

        return response;
    },
    async deleteComprovante({ commit }, params: IComprovanteDeleteForm) {
        commit("setLoading", true);

        const response = await service.deletaComprovante(params.despesa, params.id);
        router.go(0);

        commit("setLoading", false);

        return response;
    }
}
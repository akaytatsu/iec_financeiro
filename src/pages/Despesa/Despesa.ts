import { computed, defineComponent, onMounted, ref } from 'vue';

import { useStore } from 'vuex';
import VdsButton from '@/components/Button/Button.vue';
import VContent from '@/components/Content/VContent.vue';

import { FormInstance } from 'element-plus';
import router from '@/router';
import { IAbsenceType, IRequestAdd } from '@/store/modules/requests/types';
import { useRoute } from 'vue-router'
import { IDespesaStatusForm } from '@/store/modules/financeiro/types';
import { toNumber } from '@vue/shared';


export default defineComponent({
    components: {
        VdsButton,
        VContent
    },
    setup() {
        const route = useRoute();
        const store = useStore();
        const ruleFormRef = ref<FormInstance>();

        const requestID = route.params.id;

        const fetchCategorias = () => store.dispatch('financeiro/fetchCategorias');
        const fetchConferencias = () => store.dispatch('financeiro/fetchConferencias');
        const fetchDespesa = (id: number) => store.dispatch('financeiro/fetchDespesa', id);
        const fetchMeInfo = () => store.dispatch('user/fetchMeInfo');

        const conferencias = computed(() => store.getters['financeiro/getConferencias']);
        const categorias = computed(() => store.getters['financeiro/getCategorias']);
        const despesa = computed(() => store.getters['financeiro/getDespesa']);
        const accountInfo = computed(() => store.getters['user/getMeInfo']);

        const approveDespesa = () => { store.dispatch('financeiro/aprovaDespesa', { id: requestID }) };
        const reprovaDespesa = () => { store.dispatch('financeiro/reprovaDespesa', { id: requestID }) };
        const confirmaRepasse = () => { store.dispatch('financeiro/confirmaRepasse', { id: requestID }) };
        const aprovaComprovacao = () => { store.dispatch('financeiro/confirmaAprovacao', { id: requestID }) };
        const reprovaComprovacao = () => { store.dispatch('financeiro/reprovaAprovacao', { id: requestID }) };

        const canSave = computed(() => {
            if (requestID && requestID != "") return false;

            if (accountInfo.value.can_request) return true;

            return false;
        });
        const canApproveDespesa = computed(() => {
            if (!requestID) return false;

            if (accountInfo.value.can_aprove && despesa.value.status == 1) return true;

            return false;
        });

        const canReprovaDespesa = computed(() => {
            if (!requestID) return false;

            if (accountInfo.value.can_aprove && despesa.value.status == 1) return true;

            return false;
        });

        const canConfirmRepasse = computed(() => {
            if (!requestID) return false;

            if (accountInfo.value.can_request && despesa.value.status == 2 && accountInfo.value.id == despesa.value.usuario_solicitacao.id) return true;

            return false;
        });

        const canApproveComprovacao = computed(() => {
            if (!requestID) return false;

            if (accountInfo.value.can_aprove && despesa.value.status == 5) return true;

            return false;
        });

        const canReproveComprovacao = computed(() => {
            if (!requestID) return false;

            if (accountInfo.value.can_aprove && despesa.value.status == 5) return true;

            return false;
        });

        const canShowMotivoRecusaField = computed(() => {

            if (canReprovaDespesa.value || despesa.value.status == 3 || despesa.value.status == 8) return true;

            return false;
        });

        const isLoading = computed(() => store.getters['requests/getLoading']);

        const formData = ref<IRequestAdd>({
            id: null,
            conferencia: null,
            categoria: null,
            valor: null,
            justificativa: null,
            justificativa_reprovacao: null,
        });

        const add = () => {
            // store.commit('add');
        };

        const canShowFileInput = computed(() => {
            if (!requestID) return false;

            if (accountInfo.value.can_request && despesa.value.status == 4) return true;

            return false;

        });

        onMounted(async () => {
            fetchCategorias();
            fetchConferencias();
            fetchMeInfo();
            if (requestID) {
                await fetchDespesa(toNumber(requestID));
                formData.value.conferencia = despesa.value.conferencia.id;
                formData.value.categoria = despesa.value.categoria.id;
                formData.value.valor = despesa.value.valor;
                formData.value.justificativa = despesa.value.justificativa;
                formData.value.id = requestID;
            }
        });

        const submitForm = (formEl: FormInstance | undefined) => {
            if (!formEl) return;
            formEl.validate(async (valid) => {
                if (valid) {
                    if (requestID) {
                        await store.dispatch('financeiro/updateDespesa', formData.value);
                    } else {
                        store.dispatch('financeiro/createDespesa', formData.value);
                    }
                } else {
                    return false;
                }
            });
        };

        const toHomeClick = () => {
            router.push({ name: 'Home' });
        };

        const readOnly = computed(() => {
            if (isLoading.value) return true;

            if (requestID && requestID != "") {
                // if (despesa.value?.usuario_solicitacao?.id != accountInfo.value?.id) return true;
                return true;
            }

            return false;
        });

        const readOnlyMotivoRecusa = computed(() => {
            if (isLoading.value) return true;

            if (!accountInfo.value.can_aprove) return true;

            if (despesa.value.status == 1 || despesa.value.status == 5) return false;

            return true;
        });

        const isEdit = computed(() => {
            if (requestID && requestID != "") return true;

            return false;
        });

        return {
            add,
            ruleFormRef,
            toHomeClick,
            isLoading,
            submitForm,
            formData,
            conferencias,
            categorias,
            readOnly,
            accountInfo,
            canShowFileInput,
            approveDespesa,
            canApproveDespesa,
            canReprovaDespesa,
            reprovaDespesa,
            canConfirmRepasse,
            confirmaRepasse,
            canApproveComprovacao,
            aprovaComprovacao,
            canReproveComprovacao,
            reprovaComprovacao,
            canSave,
            canShowMotivoRecusaField,
            readOnlyMotivoRecusa,
            despesa,
            isEdit
        };
    }
});

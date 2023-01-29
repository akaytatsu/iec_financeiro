import { computed, defineComponent, onMounted, ref } from 'vue';

import { useStore } from 'vuex';
import VdsButton from '@/components/Button/Button.vue';
import VContent from '@/components/Content/VContent.vue';

import { FormInstance } from 'element-plus';
import router from '@/router';
import { IAbsenceType, IRequestAdd } from '@/store/modules/requests/types';
import { useRoute } from 'vue-router'


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

        const isLoading = computed(() => store.getters['requests/getLoading']);
        // const userData = computed(() => store.getters['user/getInfo']);

        const fetchUserInfo = () => store.dispatch('user/fetchUserInfo');
        // const approveRequest = () => {
        //     if (confirm('Confirma aprovação?') && requestID) {
        //         store.dispatch('requests/approveRequest', requestID);
        //     }

        const conferencias = computed(() => store.getters['financeiro/getConferencias']);
        const categorias = computed(() => store.getters['financeiro/getCategorias']);
        const despesa = computed(() => store.getters['financeiro/getDespesa']);

        const formData = ref<IRequestAdd>({
            id: null,
            conferencia: null,
            categoria: null,
            valor: null,
            justificativa: null,
        });

        const add = () => {
            // store.commit('add');
        };

        onMounted(async () => {
            fetchCategorias();
            fetchConferencias();
            if (requestID) {
                await fetchDespesa(requestID);
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

        const readOnly = computed(() => false);

        return {
            add,
            ruleFormRef,
            toHomeClick,
            isLoading,
            submitForm,
            formData,
            conferencias,
            categorias,
            readOnly
        };
    }
});

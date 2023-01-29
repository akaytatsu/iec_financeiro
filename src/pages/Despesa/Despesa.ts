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

        const selectedAbsenceType = ref<IAbsenceType>({
            id: 0,
            name: '',
            description: '',
            date_type: 'date'
        });

        const fetchCategorias = (() => store.dispatch('financeiro/fetchCategorias'));
        const fetchConferencias = (() => store.dispatch('financeiro/fetchConferencias'));

        const absenceTypes = computed(() => store.getters['requests/getAbsenceTypes']);
        const isLoading = computed(() => store.getters['requests/getLoading']);
        const request = computed(() => store.getters['requests/getRequest']);
        const userData = computed(() => store.getters['user/getInfo']);

        const fetchAbsenceTypes = () => store.dispatch('requests/fetchAbsenceTypes');
        const fetchRequest = (id: number) => store.dispatch('requests/fetchRequest', id);
        const fetchUserInfo = () => store.dispatch('user/fetchUserInfo');
        const approveRequest = () => {
            if (confirm('Confirma aprovação?') && requestID) {
                store.dispatch('requests/approveRequest', requestID);
            }
        };
        const rejectRequest = () => {
            if (confirm('Confirma reprovação do pedido?') && requestID) {
                store.dispatch('requests/rejectRequest', requestID)
            }
        };

        const readOnly = computed(() => {
            if (request.value && userData.value && requestID) {
                return request.value.status != 'pending' || request.value.user.id != userData.value.id;
            }
            return false;
        });

        const canApprove = computed(() => {
            if (request.value && userData.value && requestID) {
                return request.value.status == 'pending' && request.value.team.gestor.user.id == userData.value.id;
            }
            return false;
        });

        const formData = ref<IRequestAdd>({
            start_date: '',
            end_date: '',
            comment: null,
            type_absence: null
        });

        const add = () => {
            // store.commit('add');
        };

        const onAbsenceTypeChange = (value: number) => {
            selectedAbsenceType.value = absenceTypes.value.find(
                (c: IAbsenceType) => c.id === value
            );
        };

        onMounted(async () => {
            fetchUserInfo();
            fetchAbsenceTypes();
            if (requestID) {
                await fetchRequest(requestID);
                console.log("start_date", request.value.start_date);
                console.log("end_date", request.value.end_date);
                formData.value.start_date = request.value.start_date;
                formData.value.end_date = request.value.end_date;
                formData.value.comment = request.value.comment;
                formData.value.type_absence = request.value.type_absence.id;
                formData.value.id = request.value.id;
            }
        });

        const submitForm = (formEl: FormInstance | undefined) => {
            if (!formEl) return;
            formEl.validate(async (valid) => {
                if (valid) {
                    if (requestID) {
                        await store.dispatch('requests/updateRequest', formData.value);
                    } else {
                        store.dispatch('requests/addRequest', formData.value);
                    }
                } else {
                    return false;
                }
            });
        };

        const toHomeClick = () => {
            router.push({ name: 'Home' });
        };

        return {
            add,
            ruleFormRef,
            toHomeClick,
            isLoading,
            submitForm,
            absenceTypes,
            selectedAbsenceType,
            onAbsenceTypeChange,
            formData,
            request,
            userData,
            readOnly,
            canApprove,
            approveRequest,
            rejectRequest
        };
    }
});

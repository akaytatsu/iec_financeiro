import { computed, defineComponent, ref, reactive } from 'vue';
import { useStore } from 'vuex';
import type { FormInstance, FormRules } from 'element-plus';
import { UserFilled } from '@element-plus/icons-vue';
import VdsButton from '@/components/Button/Button.vue';
import { ILoginForm } from '@/store/modules/user/types';
import router from '@/router';

export default defineComponent({
    components: {
        VdsButton,
    },
    setup() {
        const store = useStore();
        const isLoading: any = computed(() => store.getters['user/isLoading']);
        const ruleFormRef = ref<FormInstance>();
        const ruleForm = ref<ILoginForm>({
            email: '',
            password: ''
        });
        const rules = reactive<FormRules>({
            email: [{ required: true, message: "Campo obrigatório", trigger: 'change' }]
        });

        const recoverErrors = computed(() => store.getters['user/getRecoverError']);
        const recoverSucess = computed(() => store.getters['user/getRecoverSuccess']);

        const submitForm = (formEl: FormInstance | undefined) => {
            if (!formEl) return;
            formEl.validate(async (valid) => {
                if (valid) {
                    store.dispatch('user/recoverPassword', ruleForm.value.email);
                } else {
                    return false;
                }
            });
        };

        const resetForm = () => {
            const formEl: FormInstance | undefined = ruleFormRef.value;
            if (!formEl) return;
            formEl.resetFields();
        };

        const toLoginHome = () => {
            router.push('/');
        };


        return {
            recoverErrors,
            isLoading,
            UserFilled,
            ruleFormRef,
            ruleForm,
            rules,
            submitForm,
            resetForm,
            recoverSucess,
            toLoginHome
        };
    }
});

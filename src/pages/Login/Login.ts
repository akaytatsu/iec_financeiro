import { computed, defineComponent, ref, reactive } from 'vue';
import { useStore } from 'vuex';
import type { FormInstance, FormRules } from 'element-plus';
import { UserFilled } from '@element-plus/icons-vue';
import VdsButton from '@/components/Button/Button.vue';
import { ILoginForm } from '@/store/modules/user/types';

export default defineComponent({
    components: {
        VdsButton,
    },
    setup() {
        const store = useStore();
        const isLoading: any = computed(() => store.getters['user/isLoading']);
        const visiblePass: any = ref(false);
        const ruleFormRef = ref<FormInstance>();
        const ruleForm = ref<ILoginForm>({
            email: '',
            password: ''
        });
        const rules = reactive<FormRules>({
            email: [{ required: true, message: "Campo obrigatório", trigger: 'change' }],
            password: [{ required: true, message: 'Campo obrigatório', trigger: 'change' }]
        });

        const loginErrors = computed(() => store.getters['user/getLoginErrors']);

        const submitForm = (formEl: FormInstance | undefined) => {
            if (!formEl) return;
            formEl.validate(async (valid) => {
                if (valid) {
                    store.dispatch('user/login', ruleForm.value);
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

        return {
            loginErrors,
            isLoading,
            UserFilled,
            ruleFormRef,
            ruleForm,
            rules,
            submitForm,
            resetForm
        };
    }
});

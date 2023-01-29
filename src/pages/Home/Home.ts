import { onMounted, defineComponent, computed, reactive, ref } from 'vue';
import VdsButton from '@/components/Button/Button.vue';
import { mdiPlus } from '@mdi/js';
import VdsPagination from '@/components/Pagination/Pagination.vue';
import VContent from '@/components/Content/VContent.vue';
import { Search } from '@element-plus/icons-vue';
import { useStore } from 'vuex';
import VFormFilter from '@/pages/Home/form/VFormFilter.vue';
import router from '@/router';

export default defineComponent({
  components: {
    VdsButton,
    VdsPagination,
    VContent,
    VFormFilter
  },
  setup() {
    const store = useStore();
    const pagination = ref({ page: 1, page_size: 5 });
    const isLoading = ref(false);
    const paginationCount = ref(1);

    const formDataFilters = reactive({
      conferencia: null,
      categoria: null,
      status: null,
      usuario_solicitacao: null,
    });

    const fetchDespesas = (() => store.dispatch('financeiro/fetchDespesas', formDataFilters));
    const fetchCategorias = (() => store.dispatch('financeiro/fetchCategorias'));
    const fetchConferencias = (() => store.dispatch('financeiro/fetchConferencias'));
    const fetchDespesaStatus = (() => store.dispatch('financeiro/fetchDespesaStatus'));
    const fetchUsuarios = (() => store.dispatch('financeiro/fetchUsuarios'));

    const despesasData = computed(() => store.getters['financeiro/getDespesas']);

    const formatAmount = (row, col, value, index) => "R$ " + value.toFixed(2);
    const formatDate = (row, col, value, index) => {
      const date = new Date(value);
      return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    };

    const onChangePagination = async (data: any) => {
      pagination.value.page = data.page;
      pagination.value.page_size = data.page_size;
    };

    const newRequestTableClick = (event) => {
      router.push({ name: 'NovaDespesa' });
    }

    const handleApplyFilters = () => {
      fetchDespesas();
    }

    onMounted(() => {
      fetchDespesas();
      fetchCategorias();
      fetchConferencias();
      fetchDespesaStatus();
      fetchUsuarios();
    });

    return {
      pagination,
      mdiPlus,
      Search,
      onChangePagination,
      isLoading,
      paginationCount,
      formDataFilters,
      despesasData,
      formatAmount,
      formatDate,
      newRequestTableClick,
      handleApplyFilters
    };
  }
});

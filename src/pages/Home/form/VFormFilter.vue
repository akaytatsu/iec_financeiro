<template>
  <el-form id="formRef" ref="formRef" :model="formData" label-position="top" class="v-filter__body">
    <el-row :gutter="20">

      <el-col :sm="8" :lg="8" :xl="8">
        <el-form-item label="Conferencia">
          <el-select v-model="formValue.conferencia" placeholder="Selecione Conferencia" :fit-input-width="true"
            :filterable="true">
            <el-option label="Todas" :value="null" />
            <el-option v-for="conferencia in conferencias" :label="conferencia.titulo" :value="conferencia.id" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :sm="8" :lg="8" :xl="8">
        <el-form-item label="Status">
          <el-select v-model="formValue.status" placeholder="Selecione o Status" :fit-input-width="true"
            :filterable="true">
            <el-option label="Todos" :value="null" />
            <el-option v-for="status in statusList" :label="status.nome" :value="status.id" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :sm="8" :lg="8" :xl="8">
        <el-form-item label="Categorias">
          <el-select v-model="formValue.categoria" placeholder="Selecione o Categoria" :fit-input-width="true"
            :filterable="true">
            <el-option label="Todas" :value="null" />
            <el-option v-for="categoria in categorias" :label="categoria.nome" :value="categoria.id" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :sm="8" :lg="8" :xl="8">
        <el-form-item label="Requisitante">
          <el-select v-model="formValue.usuario_solicitacao" placeholder="Selecione Requisitante"
            :fit-input-width="true" :filterable="true">
            <el-option label="Todos" :value="null" />
            <el-option v-for="user in usuarios" :label="user.name" :value="user.id" />
          </el-select>
        </el-form-item>
      </el-col>

    </el-row>

    <div class="v-filter--btns">
      <vds-button style_type="shadow" @click="resetForm(formRef)"> Limpar filtros </vds-button>
      <vds-button @click="$emit('apply-filters')"> Aplicar filtros </vds-button>
    </div>
  </el-form>
</template>
<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import { VSelect, VdsButton } from '@/components';
import { ElForm } from 'element-plus';
import { useStore } from 'vuex';

const props = defineProps({
  formValue: {
    type: Object,
    default: () => ({})
  },
  showFilter: { type: Boolean, default: false },
  isEdit: { type: Boolean, default: false }
});

const store = useStore();

const usuarios = computed(() => store.getters['financeiro/getUsuarios']);
const categorias = computed(() => store.getters['financeiro/getCategorias']);
const statusList = computed(() => store.getters['financeiro/getDespesaStatus']);
const conferencias = computed(() => store.getters['financeiro/getConferencias']);

const formData = computed({
  get: () => props.formValue,
  set: (value) => emit('update:formValue', value)
});

const emit = defineEmits<{
  (event: 'update:formValue', formValue: any): void;
  (event: 'apply-filters'): void;
}>();

type FormInstance = InstanceType<typeof ElForm>;
const formRef = ref<FormInstance>();
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  formData.value.renegotiation = false;
};
</script>

<style lang="scss" scoped>
.v-filter--btns {
  display: flex;
  justify-content: end;
  flex-wrap: wrap;
}
</style>

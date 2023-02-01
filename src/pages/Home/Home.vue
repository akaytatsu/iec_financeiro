<template>
  <div class="home">
    <one-signal></one-signal>
    <section class="v-title-home">
      <h1>Lastro de Solicitações</h1>
      <vds-button @click="newRequestTableClick">
        <slot>
          <SvgIcon type="mdi" :path="mdiPlus" :size="18"></SvgIcon>
          Adicionar
        </slot>
      </vds-button>
    </section>
    <v-content filter :event-search="handleApplyFilters">
      <template #filter>
        <v-form-filter :form-value="formDataFilters" @apply-filters="handleApplyFilters" />
      </template>
      <el-row justify="end">
        <el-col :span="24">
          <el-table v-loading="isLoading" :data="despesasData.results" @sort-change="handleSortChange"
            @row-click="RequestTableClick">
            <el-table-column prop="usuario_solicitacao.name" label="Requisitante" min-width="110" />
            <el-table-column prop="valor" label="Valor" :formatter="formatAmount" min-width="80" />
            <el-table-column prop="status_description" label="Status" min-width="110" />
            <el-table-column prop="categoria.nome" label="Categoria" min-width="110" />
            <el-table-column prop="usuario_aprovacao.name" label="Aprovador" min-width="110" />
            <el-table-column prop="data_solicitacao" label="Data Solicitação" min-width="110" :formatter="formatDate" />
          </el-table>
        </el-col>
      </el-row>
      <template #footer>
        <vds-pagination :count="paginationCount" :on-handle-change="onChangePagination"></vds-pagination>
      </template>
    </v-content>
  </div>
</template>
<script lang="ts" src="./Home.ts"></script>
<style lang="scss" scoped>
.v-title-home {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
</style>

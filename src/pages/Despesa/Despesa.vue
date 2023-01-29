<template>
    <div class="add">
        <section class="v-title-home">
            <h1>Solicitação Ausencia</h1>
        </section>
        <v-content>
            <el-row justify="start">
                <h3>Dados da Requisição</h3>
            </el-row>
            <el-form ref="ruleFormRef" :model="formData" label-position="top">
                <el-row :gutter="70">
                    <!-- Conferencia -->
                    <el-col :sm="24" :lg="24" :xl="24">
                        <el-form-item label="Conferencia" prop="conferencia" :required="true">
                            <el-select v-model="formData.conferencia" placeholder="Selecione a Conferencia"
                                :fit-input-width="true" :disabled="readOnly" :readonly="readOnly">
                                <el-option v-for="(item, index) in conferencias" :key="index" :label="item.titulo"
                                    :value="item.id" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!-- Categoria -->
                    <el-col :sm="24" :lg="24" :xl="24">
                        <el-form-item label="Categoria" prop="categoria" :required="true">
                            <el-select v-model="formData.categoria" placeholder="Selecione a Categoria"
                                :fit-input-width="true" :disabled="readOnly" :readonly="readOnly">
                                <el-option v-for="(item, index) in categorias" :key="index" :label="item.nome"
                                    :value="item.id" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!-- Valor -->
                    <el-col :sm="24" :lg="24" :xl="24">
                        <el-form-item label="Valor" prop="valor" :required="true">
                            <el-input-number v-model="formData.valor" placeholder="Valor" :disabled="readOnly"
                                :readonly="readOnly" controls-position="right" :precision="2" :step="10" />
                        </el-form-item>
                    </el-col>
                    <!-- Justificativa -->
                    <el-col :sm="24" :lg="24" :xl="24">
                        <el-form-item label="Justificativa" prop="justificativa" :required="true">
                            <el-input v-model="formData.justificativa" type="textarea" placeholder="Justificativa"
                                :rows="5" :disabled="readOnly" :readonly="readOnly" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <template #footer>
                <el-row justify="end">
                    <template v-if="!readOnly">
                        <el-button v-if="!isLoading" type="info" round @click="toHomeClick()">
                            Cancelar
                        </el-button>
                        <el-button type="primary" round :loading="isLoading" @click="submitForm(ruleFormRef)">
                            Salvar
                        </el-button>
                    </template>
                    <template v-else>
                        <el-button type="info" round @click="toHomeClick()"> Voltar </el-button>
                    </template>
                    <template v-if="canApprove">
                        <el-button type="danger" round @click="rejectRequest()"> Reprovar </el-button>
                        <el-button type="primary" round @click="approveRequest()"> Aprovar </el-button>
                    </template>
                </el-row>
            </template>
        </v-content>
    </div>
</template>

<script lang="ts" src="./Despesa.ts"></script>

<style lang="scss" scoped>
.el-select {
    display: block;
    width: 100%;
}

.v-title-home {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}
</style>

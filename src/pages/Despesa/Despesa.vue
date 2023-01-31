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
                    <!-- Nome -->
                    <el-col :sm="24" :lg="24" :xl="24" v-if="isEdit">
                        <el-form-item label="Solicitante" :required="false">
                            <el-input :disabled="true" :readonly="true" :value="despesa?.usuario_solicitacao?.name" />
                        </el-form-item>
                    </el-col>
                    <!-- Situação -->
                    <el-col :sm="24" :lg="24" :xl="24" v-if="isEdit">
                        <el-form-item label="Status" :required="false">
                            <el-input :disabled="true" :readonly="true" :value="despesa?.status_description" />
                        </el-form-item>
                    </el-col>
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
                    <!-- Justificativa Reprovação -->
                    <el-col :sm="24" :lg="24" :xl="24" v-if="canShowMotivoRecusaField">
                        <el-form-item label="Justificativa Reprovação" prop="justificativa_reprovacao"
                            :required="false">
                            <el-input v-model="formData.justificativa_reprovacao" type="textarea"
                                placeholder="Justificativa Reprovação" :rows="5" :disabled="readOnlyMotivoRecusa"
                                :readonly="readOnlyMotivoRecusa" />
                        </el-form-item>
                    </el-col>
                    <!-- Comprovante -->
                    <el-col v-if="canShowFileInput">
                        <el-upload v-model:file-list="fileList" drag :auto-upload="false" :multiple="false" :limit="1">
                            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                            <div class="el-upload__text">Arraste arquivos aqui ou <em style="font-size: larger;">clique
                                    aqui
                                    para upload</em></div>
                        </el-upload>
                    </el-col>
                </el-row>
            </el-form>

            <template #footer>
                <el-row justify="end">
                    <el-button v-if="!isLoading" type="info" round @click="toHomeClick()">Voltar</el-button>
                    <el-button type="primary" round :loading="isLoading" @click="submitForm(ruleFormRef)"
                        v-if="canSave">Salvar</el-button>
                    <el-button type="primary" round :loading="isLoading" @click="approveDespesa()"
                        v-if="canApproveDespesa">Aprovar Solicitação</el-button>
                    <el-button type="danger" round :loading="isLoading" @click="reprovaDespesa()"
                        v-if="canReprovaDespesa">Reprovar Solicitação</el-button>
                    <el-button type="primary" round :loading="isLoading" @click="confirmaRepasse()"
                        v-if="canConfirmRepasse">Confirmar Repasse</el-button>
                    <el-button type="primary" round :loading="isLoading" @click="aprovaComprovacao()"
                        v-if="canApproveComprovacao">Aprovar Comprovação</el-button>
                    <el-button type="danger" round :loading="isLoading" @click="reprovaComprovacao()"
                        v-if="canReproveComprovacao">Reprovar Comprovação</el-button>
                    <el-button type="primary" round :loading="isLoading" @click="comproveAction()"
                        v-if="canComprove">Comprovar</el-button>
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

<template>
  <div id="app">
    <div class="v-base-login v-login">

      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-position="top"
        class="v-base-login__box v-content p-4 pt-5">

        <el-row justify="center">
          <h3>Igreja em Contagem</h3>
        </el-row>

        <el-row>
          <el-col :sm="18" :lg="24" :xl="24">
            <el-form-item prop="name" label="Nome" :required="true">
              <el-input v-model="ruleForm.name" placeholder="Nome" name="name" :disabled="isLoading" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :sm="18" :lg="24" :xl="24">
            <el-form-item prop="email" label="E-mail" :required="true">
              <el-input v-model="ruleForm.email" placeholder="E-mail" name="email" :disabled="isLoading" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :sm="18" :lg="24" :xl="24">
            <el-form-item prop="telefone" label="Telefone" :required="true">
              <el-input v-model="ruleForm.telefone" placeholder="Telefone" name="telefone" :disabled="isLoading" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :sm="18" :lg="24" :xl="24">
            <el-form-item prop="password_confirm" label="Confirme a Senha" :required="true">
              <el-input v-model="ruleForm.password_confirm" placeholder="Confirme a Senha" name="password_confirm"
                show-password :disabled="isLoading" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :sm="18" :lg="24" :xl="24">
            <el-form-item prop="password" label="Senha" :required="true">
              <el-input v-model="ruleForm.password" placeholder="Senha" name="password" show-password
                :disabled="isLoading" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row
          v-if="createUserErrors != undefined && createUserErrors.non_field_errors && createUserErrors.non_field_errors.length > 0"
          class="center">
          <el-col :sm="18" :lg="24" :xl="24">
            <p><span class="error-message">{{ createUserErrors.non_field_errors[0] }}</span></p>
          </el-col>
        </el-row>

        <!-- <div class="row justify-content-between align-items-center mb-4">
          <div class="col-auto">
            <div class="v-input-checkbox v-input-checkbox--inline center">
              adasds
            </div>
          </div>
        </div> -->

        <el-button type="success" round @click="submitForm(ruleFormRef)" class="v-btn--full-width"
          :disabled="isLoading"> CADASTRAR
        </el-button>

        <hr>

        <el-button type="warning" round @click="toLoginHome()" class="v-btn--full-width" :disabled="isLoading">
          VOLTAR LOGIN
        </el-button>

        <hr>
        <p class="text-center small">Sistema de gestão financeiro de gastos</p>
      </el-form>
    </div>
  </div>

</template>












<style lang="scss" src="./Cadastrar.scss" />
<script lang="ts" src="./Cadastrar.ts" />
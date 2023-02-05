<template>
  <div id="app">
    <div class="v-base-login v-login">

      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-position="top"
        class="v-base-login__box v-content p-4 pt-5">

        <el-row justify="center">
          <h3>Igreja em Contagem</h3>
        </el-row>


        <template v-if="!recoverSucess">
          <el-row>
            <el-col :sm="18" :lg="24" :xl="24">
              <el-form-item prop="email" label="E-mail" :required="true">
                <el-input v-model="ruleForm.email" placeholder="E-mail" name="email" :disabled="isLoading" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row v-if="recoverErrors != undefined && recoverErrors.error" class="center">
            <el-col :sm="18" :lg="24" :xl="24">
              <p><span class="error-message">{{ recoverErrors.message }}</span></p>
            </el-col>
          </el-row>

          <el-button type="success" round @click="submitForm(ruleFormRef)" class="v-btn--full-width"
            :disabled="isLoading"> RECUPERAR SENHA
          </el-button>

          <hr>
        </template>
        <template v-else>
          <el-row>
            <el-col :sm="18" :lg="24" :xl="24" class="center">
              <p><span class="success-message">Sua nova senha foi enviada para seu email.</span></p>
            </el-col>
          </el-row>
        </template>
        <el-button type="warning" round @click="toLoginHome()" class="v-btn--full-width" :disabled="isLoading">
          VOLTAR
        </el-button>

        <hr>
        <p class="text-center small">Sistema de gestão financeiro de gastos</p>
      </el-form>
    </div>
  </div>

</template>



















<style lang="scss" src="./RecuperarSenha.scss" />
<script lang="ts" src="./RecuperarSenha.ts" />
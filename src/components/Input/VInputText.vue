<template>
  <el-skeleton class="v-skeleton-input" :loading="loading" animated>
    <template #template>
      <el-skeleton-item variant="text" />
      <el-skeleton-item variant="text" />
    </template>
    <template #default>
      <el-form-item
        :label="label"
        class="v-form-item"
        :class="{ 'v-form-opcional': opcional }"
        :prop="idName"
      >
        <el-input v-bind="$attrs" :size="size" :name="idName" />
      </el-form-item>
    </template>
  </el-skeleton>
</template>

<script lang="ts">
export default {
  name: 'VInputText',
  props: {
    label: { type: String, default: '' },
    size: { type: String, default: 'default' },
    idName: { type: String, default: '' },
    opcional: { type: Boolean, default: false },
    loading: { type: Boolean, default: false }
  }
};
</script>

<style lang="scss">
.el-form-item.v-form-item {
  --el-form-label-font-size: 0.8125rem;
  display: block;
  &.is-required:not(.is-no-asterisk) > .el-form-item__label {
    &::before {
      content: '';
    }
    &::after {
      content: '*';
      color: var(--el-color-danger);
      margin-left: 4px;
    }
  }
  .el-form-item__label {
    height: auto;
    line-height: 13px;
    margin-bottom: 0.25rem;
  }
  .el-input__wrapper.is-focus,
  .el-textarea__inner:focus {
    @extend %input-focus;
  }
  &.is-required .el-form-item__label::before {
    display: none;
  }
  &:not(.is-required).v-form-opcional .el-form-item__label {
    @extend %input-opcional;
  }
}
.v-form-opcional .el-form-item.v-form-item:not(.is-required) .el-form-item__label {
  @extend %input-opcional;
}
@include skeleton-input;
</style>

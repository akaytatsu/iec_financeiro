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
        <el-date-picker
          :name="idName"
          type="date"
          :size="size"
          :format="format"
          :value-format="valueFormat"
          v-bind="$attrs"
        />
      </el-form-item>
    </template>
  </el-skeleton>
</template>

<script lang="ts">
export default {
  name: 'VInputDate',
  props: {
    label: { type: String, default: '' },
    size: { type: String, default: 'default' },
    format: { type: String, default: 'DD/MM/YYYY' },
    valueFormat: { type: String, default: 'YYYY-MM-DD' },
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
  .el-date-editor--daterange,
  .el-date-editor--timerange {
    --el-date-editor-width: 100%;
  }
  .el-input {
    width: 100%;
  }
  .el-form-item__label {
    justify-content: flex-start;
    height: auto;
    line-height: 13px;
    margin-bottom: 0.25rem;
  }
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
  &:not(.is-required).v-form-opcional .el-form-item__label {
    @extend %input-opcional;
  }
  .el-input__wrapper.is-focus {
    @extend %input-focus;
  }
  .el-range-editor.is-active {
    @extend %input-focus;
  }
}
.v-form-opcional .el-form-item.v-form-item:not(.is-required) .el-form-item__label {
  @extend %input-opcional;
}
@include skeleton-input;
</style>

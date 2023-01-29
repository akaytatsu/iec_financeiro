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
        :prop="idName"
        :class="{ 'v-form-opcional': opcional }"
      >
        <el-select
          loading-text="Aguarde..."
          placeholder="Selecione"
          filterable
          clearable
          :multiple="multi"
          :collapse-tags="multi"
          v-bind="$attrs"
          :size="size"
          :name="idName"
          :loading="loading"
        >
          <slot name="vselectoption"></slot>
          <slot name="default">
            <el-option
              v-for="(item, index_options) in (options as any)"
              :key="index_options"
              :label="item[optionLabel]"
              :value="item[optionValue]"
            >
            </el-option>
          </slot>
        </el-select>
      </el-form-item>
    </template>
  </el-skeleton>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VSelect',
  props: {
    label: { type: String, required: true, default: '' },
    multi: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    options: { type: Array, default: (): any => [] },
    optionValue: { type: String, default: 'id' },
    optionLabel: { type: String, default: 'name' },
    size: { type: String, default: '' },
    idName: { type: String, default: '' },
    opcional: { type: Boolean, default: false }
  }
});
</script>

<style lang="scss">
.el-form-item.v-form-item {
  --el-form-label-font-size: 0.8125rem;
  display: block;
  .el-select {
    width: 100%;
    &__tags .el-icon {
      color: $feedback-color-default-pure;
      &:hover {
        background-color: $neutral-color-low-extra-light;
      }
    }
    .el-select__tags ~ .el-input .el-input__wrapper {
      padding-top: 5px;
      padding-bottom: 5px;
    }
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
  .el-input.is-focus {
    border-radius: 4px;
    @extend %input-focus;
  }
  .el-form-item__label {
    height: auto;
    line-height: 13px;
    margin-bottom: 0.25rem;
  }
}
.v-form-opcional .el-form-item.v-form-item:not(.is-required) .el-form-item__label {
  @extend %input-opcional;
}
@include skeleton-input;
</style>

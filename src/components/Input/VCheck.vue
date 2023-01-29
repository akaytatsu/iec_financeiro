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
        :class="[{ 'v-form-opcional': opcional }, `v-check-${size}`]"
      >
        <slot></slot>
      </el-form-item>
    </template>
  </el-skeleton>
</template>

<script lang="ts">
export default {
  name: 'VCheck',
  props: {
    label: { type: String, default: '' },
    size: { type: String, default: 'md' },
    opcional: { type: Boolean, default: false },
    idName: { type: String, default: '' },
    loading: { type: Boolean, default: false }
  }
};
</script>

<style lang="scss">
.el-form-item.v-form-item {
  --el-form-label-font-size: 0.8125rem;
  display: block;
  @mixin makeCheck($sizeOut: 0.875rem, $sizeIn, $topIn: 1px) {
    width: $sizeOut;
    height: $sizeOut;
    &::after {
      height: calc(7px + $sizeIn);
      width: calc(3px + $sizeIn);
      left: calc(4px + $sizeIn);
      top: $topIn;
    }
  }
  .el-checkbox__inner::after {
    border: solid 2px $neutral-color-hight-extra-light;
    border-top: 0;
    border-left: 0;
  }
  &.v-check-lg .el-checkbox__inner {
    @include makeCheck($form-box-lg, 2px, 2px);
  }
  &.v-check-md .el-checkbox__inner {
    @include makeCheck($form-box-md, 1px);
  }
  &.v-check-sm .el-checkbox__inner {
    @include makeCheck($form-box-sm, 0px, 0px);
  }
  &.v-check-sm,
  &.v-check-md,
  &.v-check-lg {
    &.is-error {
      .el-checkbox__input:not(.is-checked) .el-checkbox__inner {
        border: solid 1px var(--el-color-danger);
      }
      .el-form-item__error {
        padding: 0;
        font-weight: normal;
        color: var(--el-color-danger);
        background-color: transparent;
      }
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
  .el-checkbox input:focus-visible + .el-checkbox__inner {
    @extend %input-focus;
  }
}
.v-form-opcional .el-form-item.v-form-item:not(.is-required) .el-form-item__label {
  @extend %input-opcional;
}
@include skeleton-input;
</style>

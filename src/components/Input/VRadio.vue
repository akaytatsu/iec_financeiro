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
        :class="[{ 'v-form-opcional': opcional }, `v-radio-${size}`]"
      >
        <el-radio-group v-bind="$attrs">
          <el-radio
            v-for="(item, index_options) in options"
            :key="index_options"
            :name="idName"
            :label="item[optionValue]"
            >{{ item[optionLabel] }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
    </template>
  </el-skeleton>
</template>

<script lang="ts">
export default {
  name: 'VRadio',
  props: {
    label: { type: String, required: false, default: '' },
    options: { type: Array, default: (): any => [] },
    optionValue: { type: String, default: 'id' },
    optionLabel: { type: String, default: 'name' },
    size: { type: String, default: 'lg' },
    idName: { type: String, required: false, default: '' },
    opcional: { type: Boolean, default: false },
    loading: { type: Boolean, default: false }
  }
};
</script>

<style lang="scss">
.el-form-item.v-form-item {
  --el-form-label-font-size: 0.8125rem;
  display: block;

  @mixin makeRaio($sizeOut, $sizeIn) {
    width: $sizeOut;
    height: $sizeOut;

    &::after {
      width: $sizeIn;
      height: $sizeIn;
    }
  }

  &.v-radio-lg .el-radio__inner {
    @include makeRaio($form-box-lg, 0.5rem);
  }

  &.v-radio-md .el-radio__inner {
    @include makeRaio($form-box-md, 0.375rem);
  }

  &.v-radio-sm .el-radio__inner {
    @include makeRaio($form-box-sm, 0.25rem);
  }

  &.v-radio-sm,
  &.v-radio-md,
  &.v-radio-lg {
    &.is-error {
      .el-radio__input:not(.is-checked) .el-radio__inner {
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

  .el-radio input:focus-visible + .el-radio__inner {
    @extend %input-focus;
  }
}

.v-form-opcional .el-form-item.v-form-item:not(.is-required) .el-form-item__label {
  @extend %input-opcional;
}

@include skeleton-input;
</style>

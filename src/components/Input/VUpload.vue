<template>
  <el-skeleton class="v-skeleton-input" :loading="loading" animated>
    <template #template>
      <el-skeleton-item variant="text" />
      <el-skeleton-item variant="image" />
    </template>
    <template #default>
      <el-form-item
        :label="label"
        class="v-form-item"
        :prop="idName"
        :class="{ 'v-form-opcional': opcional }"
      >
        <el-upload :name="idName" :class="['v-upload', `v-upload--${size}`]" v-bind="$attrs">
          <div class="v-upload__content">
            <div class="v-upload__content--icon">
              <SvgIcon type="mdi" :path="mdiCloudUpload" :size="setSizeIcon"></SvgIcon>
            </div>
            <div class="v-upload__content--text">
              Clique ou arraste o(s) arquivo(s) para fazer o upload
            </div>
          </div>
        </el-upload>
      </el-form-item>
    </template>
  </el-skeleton>
</template>

<script lang="ts">
import { mdiCloudUpload } from '@mdi/js';

export enum ESizeIcon {
  small = 24,
  medium = 40,
  large = 45
}

export default {
  name: 'VUpload',
  props: {
    label: { type: String, required: true, default: '' },
    size: { type: String, default: 'medium' },
    idName: { type: String, required: false },
    opcional: { type: Boolean, default: false },
    loading: { type: Boolean, default: false }
  },
  setup() {
    return {
      mdiCloudUpload
    };
  },
  computed: {
    setSizeIcon(): number {
      return ESizeIcon[this.size];
    }
  }
};
</script>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.v-upload {
  width: 100%;
  .el-upload {
    border: 2px dashed var(--el-border-color);
    border-radius: 6px;
    transition: var(--el-transition-duration-fast);
    width: 100%;
    box-sizing: border-box;
    &:hover {
      border-color: var(--el-color-primary);
    }
  }
  .el-upload-list {
    &__item {
      margin-bottom: 0;
      border-radius: 0;
      border: 1px solid $neutral-color-hight-medium;
      box-sizing: border-box;
      &:first-child {
        border-radius: 4px 4px 0 0;
        border-bottom: none;
      }
      &:last-child {
        border-radius: 0 0 4px 4px;
      }
      &:only-child {
        border-radius: 4px;
        border: 1px solid $neutral-color-hight-medium;
      }
      &:hover {
        background-color: transparent;
      }
      .el-icon--close {
        display: flex;
        color: var(--el-color-danger);
      }
    }
  }
  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: var(--el-color-primary);
    width: 100%;
    height: 100%;
    text-align: center;
  }
  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    &--icon {
      font-size: 28px;
      color: var(--el-color-primary);
      margin-right: 0.5rem;
    }
    &--text {
      font-weight: bold;
      color: var(--el-text-color-primary);
    }
  }
  &--small .el-upload {
    min-height: 40px;
  }
  &--medium .el-upload {
    min-height: 80px;
  }
  &--large .el-upload {
    min-height: 94px;
  }
}
.el-form-item.v-form-item {
  --el-form-label-font-size: 0.8125rem;
  display: block;
  &.is-error {
    .v-upload .el-upload {
      border-color: var(--el-color-danger);
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
  .el-form-item__label {
    justify-content: flex-start;
    height: auto;
    line-height: 13px;
    margin-bottom: 0.25rem;
  }
}
.v-form-opcional .el-form-item.v-form-item:not(.is-required) .el-form-item__label {
  @extend %input-opcional;
}
@include skeleton-input;
.v-skeleton-input {
  .el-skeleton__item.el-skeleton__image {
    width: 100%;
    height: 80px;
    svg {
      height: 40px;
      width: 40px;
    }
  }
}
</style>

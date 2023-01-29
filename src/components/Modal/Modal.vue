<template>
  <teleport to="#app">
    <div :class="`v-modal-component v-modal-component--${size}`">
      <div class="v-modal-component__content">
        <div class="v-modal-component__btn-close" @click="$emit('closeModal')">
          <span class="v-icon">
            <SvgIcon type="mdi" :path="mdiClose" :size="25" />
          </span>
        </div>
        <div class="v-modal-component__header">
          <slot name="s_title">
            <h3 class="v-modal-component__title">{{ title }}</h3>
          </slot>

          <slot name="s_append_title"></slot>
        </div>
        <div class="v-modal-component__body">
          <slot name="s_body"></slot>
        </div>
        <div class="v-modal-component__footer v-flex-end">
          <slot name="s_footer">
            <vds-button outline @click="$emit('closeModal')"> Cancelar </vds-button>
            <vds-button status="success" @click="$emit('onHandleConfirm')"> Confirmar </vds-button>
          </slot>
        </div>
      </div>
      <div class="v-modal-component__bg" @click="$emit('closeModal')"></div>
    </div>
  </teleport>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { mdiClose } from '@mdi/js';
import VdsButton from '@/components/Button/Button.vue';

export enum EModalSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  FULL_SCREEN = 'full-screen'
}

export default defineComponent({
  name: 'Modal',
  components: { VdsButton },
  props: {
    title: { type: String, default: 'Título Modal' },
    loading: Boolean,
    size: {
      validator: (v: any) => Object.values(EModalSize).includes(v),
      type: String,
      default: EModalSize.MEDIUM
    }
  },
  emits: ['closeModal', 'onHandleConfirm'],
  setup() {
    return { mdiClose };
  }
});
</script>
<style lang="scss" src="./Modal.scss">
</style>

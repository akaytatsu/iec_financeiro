<template>
  <main class="v-content">
    <div class="v-content__header">
      <slot name="header"></slot>
      <v-filter v-if="filter" :data-search="dataSearch" @apply-search="eventSearch">
        <slot name="filter"></slot>
      </v-filter>
    </div>
    <div class="v-content__body">
      <slot></slot>
    </div>
    <div class="v-content__footer">
      <slot name="footer"></slot>
    </div>
  </main>
</template>

<script lang="ts">
import VFilter from '@/components/VFilter/VFilter.vue';

export default {
  name: 'VContent',
  components: {
    VFilter
  },
  props: {
    filter: { type: Boolean, default: false },
    form: { type: Boolean, default: false },
    eventSearch: { type: String, default: '' },
    dataSearch: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style lang="scss">
.v-content {
  @extend %shadow-level-3;
  border: 1px solid $neutral-color-hight-extra-light;
  border-radius: 0.25rem;
  background-color: $neutral-color-hight-pure;
  margin-bottom: 1.5rem;
  &__header {
    padding-top: 1.5rem;
    max-width: 90vw;
  }
  &__footer {
    padding: 1.5rem;
    max-width: calc(90vw - 1.5rem);
  }
  &__body {
    padding: 1.5rem;
    max-width: calc(90vw - 1.5rem);
  }
}
</style>

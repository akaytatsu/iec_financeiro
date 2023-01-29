<template>
  <div class="v-filter">
    <div class="v-filter__head">
      <vds-button style_type="shadow" @click="showFilter = !showFilter">
        <SvgIcon type="mdi" :path="mdiFilter" :size="18"></SvgIcon>
        {{ textFilterBtn }}
      </vds-button>
    </div>
    <section v-if="showFilter" class="v-filter__body">
      <hr />
      <div class="v-filter__body--form">
        <h3>Filtrar por</h3>
        <slot></slot>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { mdiFilter, mdiFileTable } from '@mdi/js';
import { Search } from '@element-plus/icons-vue';

import VdsButton from '@/components/Button/Button.vue';

const props = defineProps({
  dataSearch: {
    type: Object,
    default: () => ({})
  }
});

const formData = computed({
  get: () => props.dataSearch,
  set: (value) => emit('update:dataSearch', value)
});

const emit = defineEmits<{
  (event: 'update:dataSearch', dataSearch: any): void;
  (event: 'apply-search'): void;
}>();

const showFilter = ref(false);

const textFilterBtn = computed(() => (showFilter.value ? 'Ocultar filtros' : 'Mostrar filtros'));
</script>

<style lang="scss" scoped>
.v-filter {
  &__head {
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    align-items: center;

    button {
      margin-left: 1.5rem;
    }

    &--search {
      max-width: 17rem;
      margin-left: 1.5rem;
      width: 100%;
    }

    .mdi-mr-1 {
      margin-right: 0.5rem;
    }
  }

  &__body {
    &--form {
      margin: 0 2rem 1.5rem;
    }

    h3 {
      font-size: 1.3125rem;
      font-weight: 700;
    }
  }

  &--btns {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;

    button {
      margin: 0 10px;
    }
  }

  hr {
    border: solid 1px $neutral-color-hight-medium;
    border-bottom: none;
    margin: 1.5rem 0;
  }
}
</style>

<template>
  <v-button :status="status" :size="size" :outline="outline" @click="$emit('click')">
    <el-icon v-if="loading" class="is-loading"> <Loading /> </el-icon> <slot></slot>
  </v-button>
</template>
<script lang="ts">
import { VButton } from '@vert-capital/design-system';
import { defineComponent } from 'vue';
import { Loading } from '@element-plus/icons-vue';

export default defineComponent({
  name: 'VdsButton',
  components: {
    VButton,
    Loading
  },
  props: {
    status: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'md'
    },
    outline: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click']
});
</script>

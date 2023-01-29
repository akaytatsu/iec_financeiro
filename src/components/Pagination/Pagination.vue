<template>
  <v-pagination
    :count="count"
    :size-default="sizeDefault"
    @on-change-pagination="onHandleChange"
  ></v-pagination>
</template>
<script lang="ts">
import { VPagination } from '@vert-capital/design-system';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VdsPagination',
  components: {
    VPagination
  },
  props: {
    count: {
      type: Number,
      required: true
    },
    sizeDefault: {
      type: Number,
      default: 5
    },
    onHandleChange: {
      type: Function,
      default: (): any => {
        return;
      }
    }
  }
});
</script>

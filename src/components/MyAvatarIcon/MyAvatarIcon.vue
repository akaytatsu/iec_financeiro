<template>
  <AvatarIcon :size="size" :full-name="fullName" :image-url="avatarUrl" />
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import AvatarIcon from '@/components/AvatarIcon/AvatarIcon.vue';

export default defineComponent({
  name: 'MyAvatarIcon',
  components: { AvatarIcon },
  props: {
    size: { type: String, default: 'medium' },
    fullName: { type: String, default: '' },
    avatarUrl: { type: String, default: '' }
  },
  setup() {
    const avatar = ref('');

    return { avatar };
  }
});
</script>

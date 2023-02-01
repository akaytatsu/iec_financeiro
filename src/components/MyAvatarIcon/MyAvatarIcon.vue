<template>
  <AvatarIcon :size="size" :full-name="accountInfo.name" :name-letters="accountInfo.name_letter" />
</template>

<script lang="ts">
import { ref, defineComponent, computed, onMounted } from 'vue';
import AvatarIcon from '@/components/AvatarIcon/AvatarIcon.vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'MyAvatarIcon',
  components: { AvatarIcon },
  props: {
    size: { type: String, default: 'medium' },
    fullName: { type: String, default: '' }
  },
  setup() {
    const store = useStore();
    const accountInfo = computed(() => store.getters['user/getMeInfo']);

    const avatar = ref('');

    onMounted(async () => {
      store.dispatch('user/fetchMeInfo');
    });

    return {
      avatar,
      accountInfo
    };
  }
});
</script>

<template>
    <div></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import store from '@/store';
import router from '@/router';

export default defineComponent({
    name: 'Logout',
    created() {
        store.dispatch('user/logout');
        router.push('/');
    }
});
</script>

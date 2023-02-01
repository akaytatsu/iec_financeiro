<template>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
import { useOneSignal } from '@onesignal/onesignal-vue3';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'OneSignal',
    setup() {
        const store = useStore();
        onBeforeMount(async () => {
            const oneSignalEvents = useOneSignal();

            oneSignalEvents.getUserId((userID: any) => {
                store.dispatch('user/updateOneSignalID', userID);
            });
        })
    }
});
</script>
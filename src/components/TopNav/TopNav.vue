<template>
  <div class="v-topbar" :class="{ 'v-topbar--closed': isCollapse }">
    <el-tooltip content="Menu" :show-after="500">
      <SvgIcon
        class="v-topbar--icon"
        type="mdi"
        :path="mdiMenu"
        :size="24"
        @click="openSidebar"
      ></SvgIcon>
    </el-tooltip>
    <el-menu mode="horizontal" class="v-topbar--items" :router="true" :ellipsis="false">
      <el-sub-menu index="#iconSidebar">
        <template #title>
          <SvgIcon class="v-topbar--icon" type="mdi" :path="mdiApps" :size="24"></SvgIcon>
        </template>
        <div class="v-topbar--apps">
          <el-tooltip content="App 1" :show-after="500">
            <el-menu-item index="/" @click="handleApplications('app1')">
              <img src="@/assets/images/logo-vert.svg" width="50" />
            </el-menu-item>
          </el-tooltip>
          <el-tooltip content="App 2" :show-after="500">
            <el-menu-item index="/" @click="handleApplications('app2')">
              <img src="@/assets/images/logo-vert.svg" width="50" />
            </el-menu-item>
          </el-tooltip>
          <el-tooltip content="App 3" :show-after="500">
            <el-menu-item index="/" @click="handleApplications('app3')">
              <img src="@/assets/images/logo-vert.svg" height="50" />
            </el-menu-item>
          </el-tooltip>
        </div>
      </el-sub-menu>
      <el-menu-item index="#myAccount">
        <my-avatar-icon size="small" :full-name="userInfo?.name"></my-avatar-icon>
      </el-menu-item>
      <el-menu-item index="logout">
        <el-tooltip content="Deslogar" :show-after="500">
          <SvgIcon class="v-topbar--icon" type="mdi" :path="mdiLogoutVariant" :size="24"></SvgIcon>
        </el-tooltip>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { mdiApps, mdiHelp, mdiMenu, mdiLogoutVariant } from '@mdi/js';
import MyAvatarIcon from '@/components/MyAvatarIcon/MyAvatarIcon.vue';
import { useStore } from 'vuex';

export enum EAppsUrl {
  app1 = 'app1',
  app2 = 'app2',
  app3 = 'app3'
}

export default defineComponent({
  name: 'TopNavComponent',
  components: { MyAvatarIcon },
  props: {
    size: { type: String, default: 'medium' },
    modelValue: { type: Boolean }
  },
  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const isCollapse = ref(true);
    const apps = ref({
      app1: '/app1',
      app2: '/app2',
      app3: '/app3'
    });
    const store = useStore();
    const userInfo = computed(() => store.state.user.info);

    function openSidebar(): any {
      isCollapse.value = !isCollapse.value;
      emit('update:modelValue', isCollapse.value);
    }

    function handleApplications(rota: string): any {
      window.location.href = apps.value[EAppsUrl[rota as keyof typeof EAppsUrl]];
    }

    return {
      isCollapse,
      openSidebar,
      mdiMenu,
      mdiHelp,
      mdiApps,
      mdiLogoutVariant,
      apps,
      handleApplications,
      userInfo
    };
  },
  data() {
    return {
      textTooltip: 'teste',
      boxAppsVisible: false
    };
  },

  methods: {
    handleActionsApps() {
      this.boxAppsVisible = !this.boxAppsVisible;
    }
  }
});
</script>
<style lang="scss">
.v-topbar {
  --el-menu-hover-bg-color: #fff;
  --el-menu-active-color: #fff;
  --el-menu-horizontal-sub-item-height: 80px;
  z-index: 600;
  height: 60px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%);
  background-color: #fff;
  width: 100%;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
  box-sizing: border-box;
  position: fixed;
  right: 0;
  transition: all 0.3s ease;
  width: calc(100% - 209px);
  &--closed {
    width: calc(
      100% - 1px - calc(var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2)
    );
  }
  &--icon {
    @extend %transition-link;
    color: $neutral-color-low-light;
    cursor: pointer;
  }

  &--items {
    align-items: center;

    .el-icon.el-sub-menu__icon-arrow {
      display: none;
    }
  }

  &--apps {
    --el-menu-hover-bg-color: #fff;
    display: flex;

    li > img {
      margin: 0.5rem 0;
      padding: 0.25rem;
      border-radius: 0.25rem;
      border: solid 1px $neutral-color-low-light;
      box-sizing: border-box;
      @extend %transition-link;
    }
  }
}
</style>

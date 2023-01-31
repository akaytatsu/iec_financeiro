<template>
  <el-aside class="v-sidenav" :class="isCollapse ? 'v-sidenav--collapse' : 'v-sidenav--default'">
    <el-scrollbar class="v-scrollbar-side-nav">
      <div class="v-sidenav--logo">
        <a href="/">
        </a>
      </div>

      <el-menu class="el-menu-vertical v-sidenav--items" :router="true" :collapse="isCollapse">
        <el-menu-item index="/" :route="{ name: 'Home', params: {} }">
          <el-icon>
            <SvgIcon type="mdi" :path="mdiHome" :size="15"></SvgIcon>
          </el-icon>
          <span v-if="isCollapse"></span>
          <span v-else>Home</span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import {
  mdiCashMultiple,
  mdiHome,
  mdiCog,
  mdiViewDashboardOutline,
  mdiFileUploadOutline,
  mdiFileTableOutline,
  mdiCreditCardPlus,
  mdiFormatListBulleted,
  mdiAccountGroup,
  mdiCreditCardCheckOutline,
  mdiCreditCardClockOutline
} from '@mdi/js';

export default defineComponent({
  name: 'SideNav',
  props: {
    isCollapse: { type: Boolean }
  },
  setup() {
    return {
      mdiCog,
      mdiHome,
      mdiAccountGroup,
      mdiCashMultiple,
      mdiCreditCardPlus,
      mdiFileTableOutline,
      mdiFileUploadOutline,
      mdiFormatListBulleted,
      mdiViewDashboardOutline,
      mdiCreditCardClockOutline,
      mdiCreditCardCheckOutline
    };
  }
});
</script>
<style lang="scss">
.v-sidenav {
  z-index: 3;
  position: fixed;
  top: 0;
  bottom: 0;
  transition: all 0.3s ease;
  box-shadow: 1px 0 3px 0 #0000001a;
  background-color: $neutral-color-hight-pure;
  transition: all 0.3s ease;

  &--collapse {
    max-width: calc(var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2);
  }

  &--default {
    max-width: 13rem;
  }

  &--logo {
    height: 3.75rem;
    box-sizing: border-box;
    width: auto;
    transition: all 0.3s ease-in-out;
    align-items: center;
    display: flex;
    justify-content: center;
    padding: 0.5rem;

    >a>img {
      vertical-align: middle;
      max-height: 2.25rem;
      width: 100%;
      transition: all 0.3s ease-in-out;
      max-width: 13rem;
    }
  }

  & &--items {
    border-right: solid 0px transparent;

    >li {
      &:hover {
        color: var(--el-menu-active-color);
      }

      &.is-active {
        background-color: var(--el-menu-hover-bg-color);
      }

      &:hover::before,
      &.is-active::before {
        background-color: var(--el-menu-active-color);
        position: absolute;
        height: 100%;
        width: 4px;
        display: block;
        left: 0;
        content: '';
      }

      >i {
        margin-right: 0.75rem;
      }
    }
  }
}
</style>

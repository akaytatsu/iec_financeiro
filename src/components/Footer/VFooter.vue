<template>
  <div class="v-footer">
    <div class="v-footer__copyright">
      Igreja em Contagem
    </div>
    <div class="v-footer__links">
      <a href="https://www.igrejaemcontagem.com.br/" target="_blank">IEC</a>
    </div>
  </div>
</template>

<style lang="scss">
.v-footer {
  background-color: $bg-color-gray;
  bottom: 0;
  width: 100%;
  height: 3.5rem;
  display: flex;
  align-items: center;
  z-index: 9;
  justify-content: space-between;

  * {
    color: $neutral-color-low-medium;
  }

  a {
    color: $neutral-color-low-medium;
    text-decoration: none;

    &:hover {
      color: #00747a;
    }
  }

  &__links {
    margin-right: 3rem;
  }

  &__copyright {
    margin-left: 3rem;
  }
}
</style>

<script lang="ts" setup>
import { onMounted } from 'vue'
const { isAuthenticated } = useSanctumAuth()
</script>

<template>
  <div>
    <HeaderDesktop class="header-desktop" />
    <HeaderMobile class="header-mobile" />
    <slot />
  </div>
</template>

<style scoped>
.header-desktop {
  display: none;
}

.header-mobile {
  display: block;
}

@media (min-width: 768px) {
  .header-desktop {
    display: block;
  }

  .header-mobile {
    display: none;
  }
}
</style>

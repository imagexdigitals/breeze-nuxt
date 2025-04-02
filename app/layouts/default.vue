<script lang="ts" setup>
import { useMobileDetection } from '~/composables/useMobileDetection'
const { isAuthenticated } = useSanctumAuth()

// Use the composable to get the isMobile state
const { isMobile } = useMobileDetection()
</script>

<template>
  <div>
    <HeaderDesktop v-if="!isMobile" />
    <HeaderMobile v-if="isMobile" />


      <slot />

  </div>
</template>

<style scoped></style>

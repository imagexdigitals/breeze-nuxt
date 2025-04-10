<script lang="ts" setup>
import { useMobileDetection } from '~/composables/useMobileDetection'
import { onMounted } from 'vue'

const { isAuthenticated } = useSanctumAuth()

// Use the composable to get the isMobile state
const { isMobile } = useMobileDetection()

// Log the initial state
onMounted(() => {
  console.log('Initial isMobile state:', isMobile.value)
})
</script>

<template>
  <div>
    <HeaderDesktop v-if="!isMobile" />
    <HeaderMobile v-else />
    <slot />
  </div>
</template>

<style scoped></style>
<template>
    <!-- Desktop banner -->
    <div v-if="!isMobile" class="md:w-4/5 w-full py-4 flex items-center justify-center">
      <img src="https://placehold.co/800x323" alt="Main Banner" class="w-full h-auto max-w-full" />
    </div>

    <!-- Mobile banner -->
    <div v-if="isMobile" class="md:w-4/5 w-full pb-4 flex items-center justify-center">
      <img src="https://placehold.co/800x600" alt="Main Banner" class="w-full h-auto max-w-full" />
    </div>
</template>

<script lang="ts" setup>
import { useMobileDetection } from '~/composables/useMobileDetection'
const { isMobile } = useMobileDetection()
</script>

<style>

</style>
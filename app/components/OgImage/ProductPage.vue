<script lang="ts" setup>
defineProps<{
  title: string;
}>();
</script>
<template>
  <div class="w-full h-full">
    <div class="flex flex-col relative">
      <div class="flex flex-row h-full items-center justify-center text-center">
        <h1 class="leading-relaxed text-black text-5xl font-semibold">
          {{ title }}
        </h1>
        <img
          src="https://cdn.nxtkart.com/images/gallery/2024/12/cy8ckitpsoc024lp-psoc-family-processor-modules-with-lcd-display-development-kit-38901-nxtkart.webp"
          width="80"
          height="80"
          class="rounded-full mr-5"
        />
      </div>
    </div>
  </div>
</template>

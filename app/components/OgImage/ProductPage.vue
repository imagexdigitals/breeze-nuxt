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
      </div>
    </div>
  </div>
</template>

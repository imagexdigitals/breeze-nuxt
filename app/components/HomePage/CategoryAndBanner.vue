<template>
    <div class="flex justify-center">
      <div class="w-[90%] flex flex-col">
        <!-- Use the CategoryAndBanner component -->
        <sectionOne />

        <!-- Use the ThreeColumnBanner component -->
        <ThreeColumnBanner />
      </div>
    </div>
</template>

<script lang="ts" setup>
import sectionOne from '@/components/HomePage/sectionOne.vue';
import ThreeColumnBanner from '@/components/HomePage/ThreeColumnBanner.vue';
</script>

<style>

</style>
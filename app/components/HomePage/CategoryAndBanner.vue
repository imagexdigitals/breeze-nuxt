<template>
    <div class="flex md:justify-center">
      <div class="md:w-[90%] w-full flex flex-col">
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
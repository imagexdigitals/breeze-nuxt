<template>
  <div v-html="description"></div>
</template>

<script lang="ts" setup>
interface Props {
  description: string;
}

const props = defineProps<Props>();
</script>
